import { describe, it, expect, vi } from 'vitest'
import type Stripe from 'stripe'
import { handleCheckoutCompleted, type WebhookDeps } from '@/lib/webhook'

const SESSION = {
  id: 'cs_test_123',
  payment_status: 'paid',
  payment_intent: 'pi_test_123',
  invoice: 'in_test_123',
  metadata: { order_id: 'order-1' },
} as unknown as Stripe.Checkout.Session

const ORDER = {
  id: 'order-1',
  locale: 'fr',
  quantity: 2,
  buyer_email: 'buyer@acme.fr',
  buyer_name: 'Jeanne Martin',
  company_legal_name: 'ACME SA',
  amount_subtotal_cents: 420000,
  amount_tax_cents: 88200,
  amount_total_cents: 508200,
  currency: 'eur',
  expedition: { title: 'Délégation AURA', starts_on: '2026-09-21', ends_on: '2026-09-23' },
  participants: [
    { first_name: 'Jeanne', last_name: 'Martin', email: 'buyer@acme.fr', departure_station: 'Lyon' },
    { first_name: 'Luc', last_name: 'Durand', email: 'luc@acme.fr', departure_station: 'Grenoble' },
  ],
}

function makeDeps(overrides: Partial<WebhookDeps> = {}): WebhookDeps {
  return {
    markOrderPaid: vi.fn().mockResolvedValue('order-1'),
    getOrderWithDetails: vi.fn().mockResolvedValue(ORDER),
    getInvoiceUrl: vi.fn().mockResolvedValue('https://invoice.stripe.com/i/xyz'),
    sendBuyerConfirmation: vi.fn().mockResolvedValue(undefined),
    sendAdminNotification: vi.fn().mockResolvedValue(undefined),
    ...overrides,
  }
}

describe('handleCheckoutCompleted', () => {
  it('transitions the order and sends both emails with the invoice link', async () => {
    const deps = makeDeps()
    await handleCheckoutCompleted(SESSION, deps)
    expect(deps.markOrderPaid).toHaveBeenCalledWith('cs_test_123', 'pi_test_123')
    expect(deps.sendBuyerConfirmation).toHaveBeenCalledWith(ORDER, 'https://invoice.stripe.com/i/xyz')
    expect(deps.sendAdminNotification).toHaveBeenCalledWith(ORDER)
  })

  it('skips emails on duplicate delivery', async () => {
    const deps = makeDeps({ markOrderPaid: vi.fn().mockResolvedValue(null) })
    await handleCheckoutCompleted(SESSION, deps)
    expect(deps.sendBuyerConfirmation).not.toHaveBeenCalled()
    expect(deps.sendAdminNotification).not.toHaveBeenCalled()
  })

  it('does nothing when the session is not paid', async () => {
    const deps = makeDeps()
    await handleCheckoutCompleted({ ...SESSION, payment_status: 'unpaid' } as Stripe.Checkout.Session, deps)
    expect(deps.markOrderPaid).not.toHaveBeenCalled()
  })

  it('propagates transition failures so the webhook 500s and Stripe retries', async () => {
    const deps = makeDeps({ markOrderPaid: vi.fn().mockRejectedValue(new Error('db down')) })
    await expect(handleCheckoutCompleted(SESSION, deps)).rejects.toThrow('db down')
  })

  it('does NOT throw when emails or invoice lookup fail after the transition', async () => {
    const deps = makeDeps({
      getInvoiceUrl: vi.fn().mockRejectedValue(new Error('stripe down')),
      sendBuyerConfirmation: vi.fn().mockRejectedValue(new Error('resend down')),
      sendAdminNotification: vi.fn().mockRejectedValue(new Error('resend down')),
    })
    await expect(handleCheckoutCompleted(SESSION, deps)).resolves.toBeUndefined()
  })
})
