import type { SupabaseClient } from '@supabase/supabase-js'
import { getSupabase } from '@/lib/supabase'

export type NewOrder = {
  expedition_id: string
  quantity: number
  buyer_email: string
  buyer_name: string | null
  amount_total_cents: number
  currency: string
  stripe_checkout_session_id: string
  stripe_payment_intent_id: string | null
}

/**
 * Insert an order idempotently, keyed on the unique Stripe checkout session id.
 * Returns true if the row was newly inserted, false if it already existed
 * (duplicate webhook delivery). Throws on any other failure.
 */
export async function insertOrderWith(client: SupabaseClient, order: NewOrder): Promise<boolean> {
  const { data, error } = await client
    .from('orders')
    .upsert(order, { onConflict: 'stripe_checkout_session_id', ignoreDuplicates: true })
    .select('id')
  if (error) throw new Error(`order insert failed: ${error.message}`)
  return (data ?? []).length > 0
}

export async function insertOrder(order: NewOrder): Promise<boolean> {
  return insertOrderWith(getSupabase(), order)
}
