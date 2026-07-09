import { describe, it, expect, vi } from 'vitest'
import type Stripe from 'stripe'
import {
  handleCheckoutCompleted,
  handleCheckoutExpired,
  handleInvoicePaid,
  type WebhookDeps,
} from '@/lib/webhook'

const SESSION = {
  id: 'cs_test_123',
  payment_status: 'paid',
  payment_intent: 'pi_test_123',
  invoice: 'in_test_123',
  metadata: { order_id: 'order-1' },
} as unknown as Stripe.Checkout.Session

const INVOICE = {
  id: 'in_test_777',
  payment_intent: 'pi_test_777',
  hosted_invoice_url: 'https://invoice.stripe.com/i/abc',
} as unknown as Stripe.Invoice

const ORDER = {
  id: 'order-1',
  locale: 'fr',
  quantity: 2,
  buyer_email: 'buyer@acme.fr',
  buyer_name: 'Jeanne Martin',
  company_legal_name: 'ACME SA',
  amount_subtotal_cents: 420000,
  amount_tax_cents: 0,
  amount_total_cents: 420000,
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
    markInvoicePaid: vi.fn().mockResolvedValue('order-1'),
    promoteDocuments: vi.fn().mockResolvedValue(undefined),
    discardOrder: vi.fn().mockResolvedValue(undefined),
    getPaymentMethodType: vi.fn().mockResolvedValue('card'),
    getOrderWithDetails: vi.fn().mockResolvedValue(ORDER),
    getInvoiceUrl: vi.fn().mockResolvedValue('https://invoice.stripe.com/i/xyz'),
    sendBuyerConfirmation: vi.fn().mockResolvedValue(undefined),
    sendAdminNotification: vi.fn().mockResolvedValue(undefined),
    ...overrides,
  }
}

describe('handleCheckoutCompleted', () => {
  it('transitions a card payment to paid, promotes scans, and sends both emails', async () => {
    const deps = makeDeps()
    await handleCheckoutCompleted(SESSION, deps)
    expect(deps.markOrderPaid).toHaveBeenCalledWith('cs_test_123', 'pi_test_123', 'card')
    expect(deps.promoteDocuments).toHaveBeenCalledWith('order-1')
    expect(deps.sendBuyerConfirmation).toHaveBeenCalledWith(ORDER, 'https://invoice.stripe.com/i/xyz')
    expect(deps.sendAdminNotification).toHaveBeenCalledWith(ORDER)
  })

  it('ignores non-paid sessions (card checkout is always paid or nothing)', async () => {
    const deps = makeDeps()
    await handleCheckoutCompleted({ ...SESSION, payment_status: 'unpaid' } as Stripe.Checkout.Session, deps)
    expect(deps.markOrderPaid).not.toHaveBeenCalled()
    expect(deps.sendBuyerConfirmation).not.toHaveBeenCalled()
  })

  it('skips promotion and emails on duplicate delivery', async () => {
    const deps = makeDeps({ markOrderPaid: vi.fn().mockResolvedValue(null) })
    await handleCheckoutCompleted(SESSION, deps)
    expect(deps.promoteDocuments).not.toHaveBeenCalled()
    expect(deps.sendBuyerConfirmation).not.toHaveBeenCalled()
  })

  it('still marks paid when the payment-method lookup fails', async () => {
    const deps = makeDeps({ getPaymentMethodType: vi.fn().mockRejectedValue(new Error('stripe down')) })
    await handleCheckoutCompleted(SESSION, deps)
    expect(deps.markOrderPaid).toHaveBeenCalledWith('cs_test_123', 'pi_test_123', null)
  })

  it('propagates transition failures so the webhook 500s and Stripe retries', async () => {
    const deps = makeDeps({ markOrderPaid: vi.fn().mockRejectedValue(new Error('db down')) })
    await expect(handleCheckoutCompleted(SESSION, deps)).rejects.toThrow('db down')
  })

  it('does NOT throw when promotion or emails fail after the transition', async () => {
    const deps = makeDeps({
      promoteDocuments: vi.fn().mockRejectedValue(new Error('storage down')),
      sendBuyerConfirmation: vi.fn().mockRejectedValue(new Error('resend down')),
      sendAdminNotification: vi.fn().mockRejectedValue(new Error('resend down')),
    })
    await expect(handleCheckoutCompleted(SESSION, deps)).resolves.toBeUndefined()
  })
})

describe('handleCheckoutExpired', () => {
  it('discards the abandoned order named in the session metadata', async () => {
    const deps = makeDeps()
    await handleCheckoutExpired(SESSION, deps)
    expect(deps.discardOrder).toHaveBeenCalledWith('order-1')
  })

  it('does nothing when the session carries no order id', async () => {
    const deps = makeDeps()
    await handleCheckoutExpired({ ...SESSION, metadata: {} } as Stripe.Checkout.Session, deps)
    expect(deps.discardOrder).not.toHaveBeenCalled()
  })
})

describe('handleInvoicePaid', () => {
  it('transitions a transfer order to paid keyed on the invoice id and emails', async () => {
    const deps = makeDeps()
    await handleInvoicePaid(INVOICE, deps)
    expect(deps.markInvoicePaid).toHaveBeenCalledWith('in_test_777', null)
    expect(deps.promoteDocuments).not.toHaveBeenCalled() // already promoted at creation
    expect(deps.sendBuyerConfirmation).toHaveBeenCalledWith(ORDER, 'https://invoice.stripe.com/i/abc')
    expect(deps.sendAdminNotification).toHaveBeenCalledWith(ORDER)
  })

  it('skips emails on duplicate delivery', async () => {
    const deps = makeDeps({ markInvoicePaid: vi.fn().mockResolvedValue(null) })
    await handleInvoicePaid(INVOICE, deps)
    expect(deps.sendBuyerConfirmation).not.toHaveBeenCalled()
  })
})
