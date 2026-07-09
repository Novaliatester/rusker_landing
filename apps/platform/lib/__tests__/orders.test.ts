import { describe, it, expect, vi } from 'vitest'
import { markOrderPaidWith } from '@/lib/orders'

function fakeSupabase(result: { data: unknown; error: { message: string } | null }) {
  const select = vi.fn().mockResolvedValue(result)
  const eq2 = vi.fn().mockReturnValue({ select })
  const eq1 = vi.fn().mockReturnValue({ eq: eq2 })
  const update = vi.fn().mockReturnValue({ eq: eq1 })
  const from = vi.fn().mockReturnValue({ update })
  return { client: { from } as never, from, update }
}

describe('markOrderPaidWith', () => {
  it('returns the order id when the pending order transitions to paid', async () => {
    const { client, from, update } = fakeSupabase({ data: [{ id: 'order-1' }], error: null })
    await expect(markOrderPaidWith(client, 'cs_test_123', 'pi_test_123')).resolves.toBe('order-1')
    expect(from).toHaveBeenCalledWith('orders')
    expect(update).toHaveBeenCalledWith({ status: 'paid', stripe_payment_intent_id: 'pi_test_123', expires_at: null })
  })

  it('returns null when no pending order matches (duplicate delivery or already paid)', async () => {
    const { client } = fakeSupabase({ data: [], error: null })
    await expect(markOrderPaidWith(client, 'cs_test_123', null)).resolves.toBeNull()
  })

  it('throws on database errors so the webhook returns 500', async () => {
    const { client } = fakeSupabase({ data: null, error: { message: 'connection refused' } })
    await expect(markOrderPaidWith(client, 'cs_test_123', null)).rejects.toThrow('connection refused')
  })
})
