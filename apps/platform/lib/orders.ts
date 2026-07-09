import type { SupabaseClient } from '@supabase/supabase-js'
import { getSupabase } from '@/lib/supabase'

/**
 * Flip an order to paid, keyed on the checkout session id. Cards arrive from
 * 'pending'; bank transfers arrive from 'awaiting_transfer'. Returns the order
 * id when THIS call performed the transition, null when it already happened
 * (duplicate webhook delivery) or the session is unknown. Idempotency comes
 * from the status filter: a 'paid' order never matches again.
 */
export async function markOrderPaidWith(
  client: SupabaseClient,
  sessionId: string,
  paymentIntentId: string | null,
  paymentMethod: string | null = null
): Promise<string | null> {
  const { data, error } = await client
    .from('orders')
    .update({
      status: 'paid',
      stripe_payment_intent_id: paymentIntentId,
      expires_at: null,
      ...(paymentMethod ? { payment_method: paymentMethod } : {}),
    })
    .eq('stripe_checkout_session_id', sessionId)
    .in('status', ['pending', 'awaiting_transfer'])
    .select('id')
  if (error) throw new Error(`order transition failed: ${error.message}`)
  return data?.[0]?.id ?? null
}

export async function markOrderPaid(
  sessionId: string,
  paymentIntentId: string | null,
  paymentMethod: string | null = null
): Promise<string | null> {
  return markOrderPaidWith(getSupabase(), sessionId, paymentIntentId, paymentMethod)
}

/** Checkout completed with payment_status 'unpaid' = bank transfer chosen; funds pending. Seats stay held. */
export async function markOrderAwaitingTransferWith(client: SupabaseClient, sessionId: string): Promise<string | null> {
  const { data, error } = await client
    .from('orders')
    .update({ status: 'awaiting_transfer', payment_method: 'bank_transfer', expires_at: null })
    .eq('stripe_checkout_session_id', sessionId)
    .eq('status', 'pending')
    .select('id')
  if (error) throw new Error(`awaiting-transfer transition failed: ${error.message}`)
  return data?.[0]?.id ?? null
}

export async function markOrderAwaitingTransfer(sessionId: string): Promise<string | null> {
  return markOrderAwaitingTransferWith(getSupabase(), sessionId)
}

/** Stripe reported the async payment failed — surfaced in /admin for manual handling. */
export async function markPaymentFailedWith(client: SupabaseClient, sessionId: string): Promise<string | null> {
  const { data, error } = await client
    .from('orders')
    .update({ status: 'payment_failed' })
    .eq('stripe_checkout_session_id', sessionId)
    .eq('status', 'awaiting_transfer')
    .select('id')
  if (error) throw new Error(`payment-failed transition failed: ${error.message}`)
  return data?.[0]?.id ?? null
}

export async function markPaymentFailed(sessionId: string): Promise<string | null> {
  return markPaymentFailedWith(getSupabase(), sessionId)
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
