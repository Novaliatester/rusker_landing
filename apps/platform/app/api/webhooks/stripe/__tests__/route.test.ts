import { describe, it, expect, vi, beforeEach } from 'vitest'
import Stripe from 'stripe'

vi.mock('@/lib/webhook', () => ({
  handleCheckoutCompleted: vi.fn().mockResolvedValue(undefined),
}))

const SECRET = 'whsec_test_secret'
process.env.STRIPE_WEBHOOK_SECRET = SECRET
process.env.STRIPE_SECRET_KEY = 'sk_test_dummy'

import { POST } from '../route'
import { handleCheckoutCompleted } from '@/lib/webhook'

const stripe = new Stripe('sk_test_dummy')

function signedRequest(payload: string, secret = SECRET): Request {
  const signature = stripe.webhooks.generateTestHeaderString({ payload, secret })
  return new Request('http://localhost/api/webhooks/stripe', {
    method: 'POST',
    headers: { 'stripe-signature': signature },
    body: payload,
  })
}

const EVENT = JSON.stringify({
  id: 'evt_test_1',
  object: 'event',
  type: 'checkout.session.completed',
  data: { object: { id: 'cs_test_123', object: 'checkout.session', payment_status: 'paid' } },
})

describe('POST /api/webhooks/stripe', () => {
  beforeEach(() => vi.clearAllMocks())

  it('rejects requests without a signature', async () => {
    const res = await POST(new Request('http://localhost', { method: 'POST', body: EVENT }))
    expect(res.status).toBe(400)
  })

  it('rejects requests with an invalid signature', async () => {
    const res = await POST(signedRequest(EVENT, 'whsec_wrong_secret'))
    expect(res.status).toBe(400)
    expect(handleCheckoutCompleted).not.toHaveBeenCalled()
  })

  it('processes a correctly signed checkout.session.completed event', async () => {
    const res = await POST(signedRequest(EVENT))
    expect(res.status).toBe(200)
    expect(handleCheckoutCompleted).toHaveBeenCalledOnce()
  })

  it('returns 500 when order recording fails so Stripe retries', async () => {
    vi.mocked(handleCheckoutCompleted).mockRejectedValueOnce(new Error('db down'))
    const res = await POST(signedRequest(EVENT))
    expect(res.status).toBe(500)
  })

  it('acknowledges unhandled event types without processing', async () => {
    const other = JSON.stringify({
      id: 'evt_test_2',
      object: 'event',
      type: 'payment_intent.created',
      data: { object: { id: 'pi_1', object: 'payment_intent' } },
    })
    const res = await POST(signedRequest(other))
    expect(res.status).toBe(200)
    expect(handleCheckoutCompleted).not.toHaveBeenCalled()
  })
})
