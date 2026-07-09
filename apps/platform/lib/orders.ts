import type { SupabaseClient } from '@supabase/supabase-js'
import { getSupabase } from '@/lib/supabase'

/**
 * Flip a pending order to paid, keyed on the checkout session id.
 * Returns the order id when THIS call performed the transition, null when the
 * order was already paid (duplicate webhook delivery) or unknown. Idempotency
 * comes from the status filter: only one delivery ever matches 'pending'.
 */
export async function markOrderPaidWith(
  client: SupabaseClient,
  sessionId: string,
  paymentIntentId: string | null
): Promise<string | null> {
  const { data, error } = await client
    .from('orders')
    .update({ status: 'paid', stripe_payment_intent_id: paymentIntentId, expires_at: null })
    .eq('stripe_checkout_session_id', sessionId)
    .eq('status', 'pending')
    .select('id')
  if (error) throw new Error(`order transition failed: ${error.message}`)
  return data?.[0]?.id ?? null
}

export async function markOrderPaid(sessionId: string, paymentIntentId: string | null): Promise<string | null> {
  return markOrderPaidWith(getSupabase(), sessionId, paymentIntentId)
}

export type OrderWithDetails = {
  id: string
  locale: string
  quantity: number
  buyer_email: string
  buyer_name: string | null
  company_legal_name: string | null
  amount_subtotal_cents: number
  amount_tax_cents: number
  amount_total_cents: number
  currency: string
  expedition: { title: string; starts_on: string | null; ends_on: string | null }
  participants: Array<{ first_name: string; last_name: string; email: string; departure_station: string }>
}

export async function getOrderWithDetails(orderId: string): Promise<OrderWithDetails | null> {
  const { data, error } = await getSupabase()
    .from('orders')
    .select(
      'id, locale, quantity, buyer_email, buyer_name, company_legal_name, amount_subtotal_cents, amount_tax_cents, amount_total_cents, currency, expedition:expeditions ( title, starts_on, ends_on ), participants:expedition_participants ( first_name, last_name, email, departure_station )'
    )
    .eq('id', orderId)
    .maybeSingle()
  if (error) throw new Error(`failed to load order ${orderId}: ${error.message}`)
  return data as unknown as OrderWithDetails | null
}
