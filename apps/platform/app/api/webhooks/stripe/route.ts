import { NextResponse } from 'next/server'
import type Stripe from 'stripe'
import { getStripe } from '@/lib/stripe'
import { handleCheckoutCompleted, handleAsyncPaymentSucceeded, handleAsyncPaymentFailed } from '@/lib/webhook'

const HANDLERS: Record<string, (session: Stripe.Checkout.Session) => Promise<void>> = {
  'checkout.session.completed': (session) => handleCheckoutCompleted(session),
  'checkout.session.async_payment_succeeded': (session) => handleAsyncPaymentSucceeded(session),
  'checkout.session.async_payment_failed': (session) => handleAsyncPaymentFailed(session),
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
    const session = event.data.object as Stripe.Checkout.Session
    try {
      await handler(session)
    } catch (err) {
      console.error('webhook order recording failed', err)
      return NextResponse.json({ error: 'Order recording failed' }, { status: 500 })
    }
  }

  return NextResponse.json({ received: true })
}
