import { describe, it, expect, vi } from 'vitest'
import { markOrderPaidWith, markInvoicePaidWith, markTransferPaidWith, cancelUnpaidTransferWith } from '@/lib/orders'

/** update().eq().in().select() and update().eq().eq().select() both resolve to `result`. */
function fakeSupabase(result: { data: unknown; error: { message: string } | null }) {
  const select = vi.fn().mockResolvedValue(result)
  const secondFilter = { select }
  const eq1 = vi.fn().mockReturnValue({ eq: vi.fn().mockReturnValue(secondFilter), in: vi.fn().mockReturnValue(secondFilter) })
  const update = vi.fn().mockReturnValue({ eq: eq1 })
  const from = vi.fn().mockReturnValue({ update })
  return { client: { from } as never, from, update }
}

describe('markOrderPaidWith', () => {
  it('returns the order id and records the payment method on transition', async () => {
    const { client, from, update } = fakeSupabase({ data: [{ id: 'order-1' }], error: null })
    await expect(markOrderPaidWith(client, 'cs_test_123', 'pi_test_123', 'card')).resolves.toBe('order-1')
    expect(from).toHaveBeenCalledWith('orders')
    expect(update).toHaveBeenCalledWith({
      status: 'paid',
      stripe_payment_intent_id: 'pi_test_123',
      expires_at: null,
      payment_method: 'card',
    })
  })

  it('omits payment_method when unknown so an earlier value survives', async () => {
    const { client, update } = fakeSupabase({ data: [{ id: 'order-1' }], error: null })
    await markOrderPaidWith(client, 'cs_test_123', 'pi_test_123', null)
    expect(update).toHaveBeenCalledWith({ status: 'paid', stripe_payment_intent_id: 'pi_test_123', expires_at: null })
  })

  it('returns null when no order matches (duplicate delivery)', async () => {
    const { client } = fakeSupabase({ data: [], error: null })
    await expect(markOrderPaidWith(client, 'cs_test_123', null)).resolves.toBeNull()
  })

  it('throws on database errors so the webhook returns 500', async () => {
    const { client } = fakeSupabase({ data: null, error: { message: 'connection refused' } })
    await expect(markOrderPaidWith(client, 'cs_test_123', null)).rejects.toThrow('connection refused')
  })
})

describe('markInvoicePaidWith', () => {
  it('flips a transfer order to paid keyed on the invoice id', async () => {
    const { client, update } = fakeSupabase({ data: [{ id: 'order-1' }], error: null })
    await expect(markInvoicePaidWith(client, 'in_test_123')).resolves.toBe('order-1')
    expect(update).toHaveBeenCalledWith({ status: 'paid', payment_method: 'bank_transfer', expires_at: null })
  })

  it('records the payment intent when Stripe provides one', async () => {
    const { client, update } = fakeSupabase({ data: [{ id: 'order-1' }], error: null })
    await markInvoicePaidWith(client, 'in_test_123', 'pi_test_9')
    expect(update).toHaveBeenCalledWith({
      status: 'paid',
      payment_method: 'bank_transfer',
      expires_at: null,
      stripe_payment_intent_id: 'pi_test_9',
    })
  })

  it('returns null on duplicate delivery', async () => {
    const { client } = fakeSupabase({ data: [], error: null })
    await expect(markInvoicePaidWith(client, 'in_test_123')).resolves.toBeNull()
  })
})

describe('markTransferPaidWith', () => {
  it('flips an awaiting_transfer order to paid by id', async () => {
    const { client, update } = fakeSupabase({ data: [{ id: 'order-1' }], error: null })
    await expect(markTransferPaidWith(client, 'order-1')).resolves.toBe('order-1')
    expect(update).toHaveBeenCalledWith({ status: 'paid', payment_method: 'bank_transfer', expires_at: null })
  })
})

describe('cancelUnpaidTransferWith', () => {
  it('cancels an awaiting_transfer order by id', async () => {
    const { client, update } = fakeSupabase({ data: [{ id: 'order-1' }], error: null })
    await expect(cancelUnpaidTransferWith(client, 'order-1')).resolves.toBe('order-1')
    expect(update).toHaveBeenCalledWith({ status: 'cancelled' })
  })
})
