import { NextResponse } from 'next/server'
import type Stripe from 'stripe'
import { getStripe } from '@/lib/stripe'
import { handleCheckoutCompleted, handleCheckoutExpired, handleInvoicePaid } from '@/lib/webhook'

const HANDLERS: Record<string, (event: Stripe.Event) => Promise<void>> = {
  'checkout.session.completed': (e) => handleCheckoutCompleted(e.data.object as Stripe.Checkout.Session),
  'checkout.session.expired': (e) => handleCheckoutExpired(e.data.object as Stripe.Checkout.Session),
  'invoice.paid': (e) => handleInvoicePaid(e.data.object as Stripe.Invoice),
}

export async function POST(request: Request) {
  const payload = await request.text()
  const signature = request.headers.get('stripe-signature')
  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = getStripe().webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET ?? ''
    )
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const handler = HANDLERS[event.type]
  if (handler) {
    try {
      await handler(event)
    } catch (err) {
      console.error('webhook order recording failed', err)
      return NextResponse.json({ error: 'Order recording failed' }, { status: 500 })
    }
  }

  return NextResponse.json({ received: true })
}
