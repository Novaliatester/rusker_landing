import Stripe from 'stripe'

let client: Stripe | null = null

/** Lazy so `next build` doesn't require STRIPE_SECRET_KEY at import time. */
export function getStripe(): Stripe {
  if (!client) {
    const key = process.env.STRIPE_SECRET_KEY
    if (!key) throw new Error('STRIPE_SECRET_KEY is not set')
    client = new Stripe(key)
  }
  return client
}
