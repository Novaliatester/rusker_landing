import { NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { getSupabase } from '@/lib/supabase'
import { getExpeditionBySlug, getSeatsTaken } from '@/lib/expeditions'
import { parseBookingRequest, EU_VAT_RE } from '@/lib/booking'
import { computeAmounts } from '@/lib/pricing'
import { regimeMention } from '@/lib/regime'
import { createPendingOrder, attachDocuments, discardPendingOrder } from '@/lib/orders-create'

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
  const created = await createPendingOrder(client, booking, expedition.id, amounts, consent)

  try {
    await attachDocuments(client, created, booking)

    const stripe = getStripe()
    // Structured billing address (all optional) flows onto the Stripe checkout + invoice.
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
      // EU VAT number shows on the Stripe invoice; SIRET or free-form values are skipped.
      await stripe.customers.createTaxId(customer.id, { type: 'eu_vat', value: booking.billing.vatNumber }).catch(() => {})
    }

    const origin = request.headers.get('origin') ?? process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3001'
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer: customer.id,
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
        invoice_data: { footer: regimeMention(booking.locale) },
      },
      metadata: { order_id: created.orderId, expedition_id: expedition.id, quantity: String(booking.participants.length) },
      expires_at: Math.floor(Date.now() / 1000) + 30 * 60,
      success_url: `${origin}/${booking.locale}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/${booking.locale}/expeditions/${expedition.slug}`,
    })

    const { error } = await client
      .from('orders')
      .update({ stripe_checkout_session_id: session.id })
      .eq('id', created.orderId)
    if (error) throw new Error(`session id update failed: ${error.message}`)

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('booking creation failed, rolling back', err)
    await discardPendingOrder(client, created.orderId).catch((rollbackErr) =>
      console.error('rollback failed', rollbackErr)
    )
    return NextResponse.json({ error: 'Payment provider error — please try again' }, { status: 502 })
  }
}
