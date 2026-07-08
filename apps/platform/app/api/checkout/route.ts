import { NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { getExpeditionBySlug } from '@/lib/expeditions'
import { parseCheckoutRequest, validateQuantity } from '@/lib/checkout'

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const parsed = parseCheckoutRequest(body)
  if (!parsed) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const expedition = await getExpeditionBySlug(parsed.slug)
  if (!expedition || !expedition.is_active) {
    return NextResponse.json({ error: 'Expedition not found' }, { status: 400 })
  }

  const quantityError = validateQuantity(expedition, parsed.quantity)
  if (quantityError) {
    return NextResponse.json({ error: quantityError }, { status: 400 })
  }

  const origin =
    request.headers.get('origin') ?? process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3001'

  try {
    // Price always comes from the database — the client only ever sends slug + quantity.
    const session = await getStripe().checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          quantity: parsed.quantity,
          price_data: {
            currency: expedition.currency,
            unit_amount: expedition.price_per_person_cents,
            product_data: {
              name: expedition.title,
              ...(expedition.image_url ? { images: [expedition.image_url] } : {}),
            },
          },
        },
      ],
      metadata: {
        expedition_id: expedition.id,
        quantity: String(parsed.quantity),
      },
      customer_creation: 'always',
      billing_address_collection: 'required',
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/expeditions/${expedition.slug}`,
    })
    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('checkout session creation failed', err)
    return NextResponse.json(
      { error: 'Payment provider error — please try again' },
      { status: 502 }
    )
  }
}
