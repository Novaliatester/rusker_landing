import { describe, it, expect, vi } from 'vitest'
import { insertOrderWith, type NewOrder } from '@/lib/orders'

const ORDER: NewOrder = {
  expedition_id: '5c0f1f74-0000-0000-0000-000000000000',
  quantity: 12,
  buyer_email: 'buyer@example.com',
  buyer_name: 'Jane Doe',
  amount_total_cents: 1068000,
  currency: 'eur',
  stripe_checkout_session_id: 'cs_test_123',
  stripe_payment_intent_id: 'pi_test_123',
}

function fakeSupabase(result: { data: unknown; error: { message: string } | null }) {
  const select = vi.fn().mockResolvedValue(result)
  const upsert = vi.fn().mockReturnValue({ select })
  const from = vi.fn().mockReturnValue({ upsert })
  return { client: { from } as never, from, upsert, select }
}

describe('insertOrderWith', () => {
  it('returns true when the order row is newly inserted', async () => {
    const { client, from, upsert } = fakeSupabase({ data: [{ id: 'order-1' }], error: null })
    await expect(insertOrderWith(client, ORDER)).resolves.toBe(true)
    expect(from).toHaveBeenCalledWith('orders')
    expect(upsert).toHaveBeenCalledWith(ORDER, {
      onConflict: 'stripe_checkout_session_id',
      ignoreDuplicates: true,
    })
  })

  it('returns false when the session id already exists (duplicate webhook delivery)', async () => {
    const { client } = fakeSupabase({ data: [], error: null })
    await expect(insertOrderWith(client, ORDER)).resolves.toBe(false)
  })

  it('throws when the insert fails so the webhook can return 500', async () => {
    const { client } = fakeSupabase({ data: null, error: { message: 'connection refused' } })
    await expect(insertOrderWith(client, ORDER)).rejects.toThrow('connection refused')
  })
})
