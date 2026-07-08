import { describe, it, expect, vi } from 'vitest'
import type Stripe from 'stripe'
import { handleCheckoutCompleted, type WebhookDeps } from '@/lib/webhook'

const SESSION = {
  id: 'cs_test_123',
  payment_status: 'paid',
  amount_total: 1068000,
  currency: 'eur',
  payment_intent: 'pi_test_123',
  customer_details: { email: 'buyer@example.com', name: 'Jane Doe' },
  metadata: { expedition_id: 'exp-1', quantity: '12' },
} as unknown as Stripe.Checkout.Session

function makeDeps(overrides: Partial<WebhookDeps> = {}): WebhookDeps {
  return {
    insertOrder: vi.fn().mockResolvedValue(true),
    getExpeditionTitle: vi.fn().mockResolvedValue('Barcelona Tech Immersion'),
    sendBuyerConfirmation: vi.fn().mockResolvedValue(undefined),
    sendTeamNotification: vi.fn().mockResolvedValue(undefined),
    ...overrides,
  }
}

describe('handleCheckoutCompleted', () => {
  it('inserts the order and sends both emails', async () => {
    const deps = makeDeps()
    await handleCheckoutCompleted(SESSION, deps)
    expect(deps.insertOrder).toHaveBeenCalledWith({
      expedition_id: 'exp-1',
      quantity: 12,
      buyer_email: 'buyer@example.com',
      buyer_name: 'Jane Doe',
      amount_total_cents: 1068000,
      currency: 'eur',
      stripe_checkout_session_id: 'cs_test_123',
      stripe_payment_intent_id: 'pi_test_123',
    })
    expect(deps.sendBuyerConfirmation).toHaveBeenCalled()
    expect(deps.sendTeamNotification).toHaveBeenCalled()
  })

  it('skips emails on duplicate delivery (order already recorded)', async () => {
    const deps = makeDeps({ insertOrder: vi.fn().mockResolvedValue(false) })
    await handleCheckoutCompleted(SESSION, deps)
    expect(deps.sendBuyerConfirmation).not.toHaveBeenCalled()
    expect(deps.sendTeamNotification).not.toHaveBeenCalled()
  })

  it('does nothing when the session is not paid', async () => {
    const deps = makeDeps()
    await handleCheckoutCompleted(
      { ...SESSION, payment_status: 'unpaid' } as Stripe.Checkout.Session,
      deps
    )
    expect(deps.insertOrder).not.toHaveBeenCalled()
  })

  it('throws when metadata is missing so the webhook returns 500', async () => {
    const deps = makeDeps()
    await expect(
      handleCheckoutCompleted({ ...SESSION, metadata: {} } as Stripe.Checkout.Session, deps)
    ).rejects.toThrow(/missing.*metadata/i)
  })

  it('propagates insert failures (webhook must 500 so Stripe retries)', async () => {
    const deps = makeDeps({ insertOrder: vi.fn().mockRejectedValue(new Error('db down')) })
    await expect(handleCheckoutCompleted(SESSION, deps)).rejects.toThrow('db down')
  })

  it('does NOT throw when emails fail after a successful insert', async () => {
    const deps = makeDeps({
      sendBuyerConfirmation: vi.fn().mockRejectedValue(new Error('resend down')),
      sendTeamNotification: vi.fn().mockRejectedValue(new Error('resend down')),
    })
    await expect(handleCheckoutCompleted(SESSION, deps)).resolves.toBeUndefined()
  })
})
