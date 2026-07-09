import { NextResponse } from 'next/server'
import type Stripe from 'stripe'
import { getStripe } from '@/lib/stripe'
import { getSupabase } from '@/lib/supabase'
import { getExpeditionBySlug, getSeatsTaken } from '@/lib/expeditions'
import { parseBookingRequest, EU_VAT_RE, type BookingRequest } from '@/lib/booking'
import { computeAmounts } from '@/lib/pricing'
import { regimeMention } from '@/lib/regime'
import { getOrCreateSellerTaxId } from '@/lib/seller-tax'
import { issueTransferInvoice, TRANSFER_DUE_DAYS } from '@/lib/invoice'
import { createOrder, promoteDocuments, discardOrder } from '@/lib/orders-create'
import { getOrderWithDetails } from '@/lib/orders'
import { sendTransferInstructions } from '@/lib/emails'

const CARD_HOLD_MINUTES = 35 // slightly longer than the 30-minute Stripe session

/** Stripe customer carrying the (optional) structured billing address + EU VAT id. */
async function createCustomer(stripe: Stripe, booking: BookingRequest): Promise<Stripe.Customer> {
  const address = {
    ...(booking.billing.addressLine1 ? { line1: booking.billing.addressLine1 } : {}),
    ...(booking.billing.postalCode ? { postal_code: booking.billing.postalCode } : {}),
    ...(booking.billing.city ? { city: booking.billing.city } : {}),
    ...(booking.billing.country ? { country: booking.billing.country } : {}),
  }
  const customer = await stripe.customers.create({
    name: booking.billing.companyLegalName,
    email: booking.participants[0].email,
    ...(Object.keys(address).length > 0 ? { address } : {}),
  })
  if (EU_VAT_RE.test(booking.billing.vatNumber)) {
    // Buyer's intracommunity VAT → shown on the invoice. Log rejections instead of
    // silently dropping them, so a bad value is diagnosable rather than invisible.
    try {
      await stripe.customers.createTaxId(customer.id, { type: 'eu_vat', value: booking.billing.vatNumber })
    } catch (err) {
      console.error(`Stripe rejected buyer VAT "${booking.billing.vatNumber}"`, err)
    }
  }
  return customer
}

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
  const booking = parseBookingRequest(body)
  if (!booking) return NextResponse.json({ error: 'Invalid request' }, { status: 400 })

  const expedition = await getExpeditionBySlug(booking.slug)
  if (!expedition || !expedition.is_active) {
    return NextResponse.json({ error: 'Expedition not found' }, { status: 400 })
  }

  const taken = await getSeatsTaken(expedition.id)
  const remaining = expedition.capacity === null ? Infinity : expedition.capacity - taken
  if (booking.participants.length > remaining) {
    return NextResponse.json({ error: 'not_enough_seats', remaining: Math.max(0, remaining) }, { status: 409 })
  }

  const amounts = computeAmounts(expedition.price_per_person_cents, booking.participants.length)
  const consent = {
    ip: request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null,
    userAgent: request.headers.get('user-agent'),
  }
  const client = getSupabase()
  const now = Date.now()
  const origin = request.headers.get('origin') ?? process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3001'

  if (booking.paymentMethod === 'transfer') {
    return handleTransfer(client, booking, expedition, amounts, consent, now)
  }
  return handleCard(client, booking, expedition, amounts, consent, now, origin)
}

/** Card: ephemeral pending order, ID scans stay in tmp/ until the payment succeeds. */
async function handleCard(
  client: ReturnType<typeof getSupabase>,
  booking: BookingRequest,
  expedition: NonNullable<Awaited<ReturnType<typeof getExpeditionBySlug>>>,
  amounts: ReturnType<typeof computeAmounts>,
  consent: { ip: string | null; userAgent: string | null },
  now: number,
  origin: string
) {
  const created = await createOrder(client, booking, expedition.id, amounts, consent, {
    status: 'pending',
    expiresAt: new Date(now + CARD_HOLD_MINUTES * 60_000),
  })
  try {
    const stripe = getStripe()
    const customer = await createCustomer(stripe, booking)
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer: customer.id,
      payment_method_types: ['card'],
      line_items: [
        {
          quantity: booking.participants.length,
          price_data: {
            currency: expedition.currency,
            // All-in price under the travel-agency margin scheme — no tax added on top.
            unit_amount: expedition.price_per_person_cents,
            product_data: { name: expedition.title },
          },
        },
      ],
      invoice_creation: {
        enabled: true,
        invoice_data: {
          footer: regimeMention(booking.locale),
          account_tax_ids: [await getOrCreateSellerTaxId(stripe)],
        },
      },
      metadata: { order_id: created.orderId, expedition_id: expedition.id, quantity: String(booking.participants.length) },
      expires_at: Math.floor(now / 1000) + 30 * 60,
      success_url: `${origin}/${booking.locale}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/${booking.locale}/expeditions/${expedition.slug}`,
    })
    const { error } = await client.from('orders').update({ stripe_checkout_session_id: session.id }).eq('id', created.orderId)
    if (error) throw new Error(`session id update failed: ${error.message}`)
    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('card booking failed, rolling back', err)
    await discardOrder(client, created.orderId).catch((e) => console.error('rollback failed', e))
    return NextResponse.json({ error: 'Payment provider error — please try again' }, { status: 502 })
  }
}

/** Transfer: committed order, scans promoted now, Stripe invoice issued with a 14-day deadline. */
async function handleTransfer(
  client: ReturnType<typeof getSupabase>,
  booking: BookingRequest,
  expedition: NonNullable<Awaited<ReturnType<typeof getExpeditionBySlug>>>,
  amounts: ReturnType<typeof computeAmounts>,
  consent: { ip: string | null; userAgent: string | null },
  now: number
) {
  const dueAt = new Date(now + TRANSFER_DUE_DAYS * 24 * 60 * 60 * 1000)
  const created = await createOrder(client, booking, expedition.id, amounts, consent, {
    status: 'awaiting_transfer',
    expiresAt: dueAt,
  })
  try {
    await promoteDocuments(client, created.orderId)
    const stripe = getStripe()
    const customer = await createCustomer(stripe, booking)
    const invoice = await issueTransferInvoice(stripe, {
      customerId: customer.id,
      currency: expedition.currency,
      unitAmount: expedition.price_per_person_cents,
      quantity: booking.participants.length,
      description: expedition.title,
      locale: booking.locale,
      orderId: created.orderId,
      expeditionId: expedition.id,
    })
    const { error } = await client
      .from('orders')
      .update({ stripe_invoice_id: invoice.invoiceId })
      .eq('id', created.orderId)
    if (error) throw new Error(`invoice id update failed: ${error.message}`)

    const order = await getOrderWithDetails(created.orderId)
    if (order) {
      await sendTransferInstructions(order, invoice.hostedUrl, dueAt).catch((e) =>
        console.error('transfer instructions email failed (order stands)', e)
      )
    }
    return NextResponse.json({ mode: 'transfer', invoiceUrl: invoice.hostedUrl })
  } catch (err) {
    console.error('transfer booking failed, rolling back', err)
    await discardOrder(client, created.orderId).catch((e) => console.error('rollback failed', e))
    return NextResponse.json({ error: 'Payment provider error — please try again' }, { status: 502 })
  }
}
