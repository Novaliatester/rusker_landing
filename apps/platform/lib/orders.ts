import type { SupabaseClient } from '@supabase/supabase-js'
import { getSupabase } from '@/lib/supabase'

/**
 * Flip a CARD order to paid, keyed on the checkout session id. Card orders arrive
 * from 'pending'. Returns the order id when THIS call performed the transition,
 * null when it already happened (duplicate webhook delivery) or the session is
 * unknown. Idempotency comes from the status filter: a 'paid' order never matches.
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
    .in('status', ['pending'])
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

/**
 * Flip a BANK-TRANSFER order to paid, keyed on the Stripe invoice id. Transfer
 * orders arrive from 'awaiting_transfer'. Same idempotency guarantee as cards.
 */
export async function markInvoicePaidWith(
  client: SupabaseClient,
  invoiceId: string,
  paymentIntentId: string | null = null
): Promise<string | null> {
  const { data, error } = await client
    .from('orders')
    .update({
      status: 'paid',
      payment_method: 'bank_transfer',
      expires_at: null,
      ...(paymentIntentId ? { stripe_payment_intent_id: paymentIntentId } : {}),
    })
    .eq('stripe_invoice_id', invoiceId)
    .in('status', ['awaiting_transfer'])
    .select('id')
  if (error) throw new Error(`invoice paid transition failed: ${error.message}`)
  return data?.[0]?.id ?? null
}

export async function markInvoicePaid(invoiceId: string, paymentIntentId: string | null = null): Promise<string | null> {
  return markInvoicePaidWith(getSupabase(), invoiceId, paymentIntentId)
}

/**
 * Manually flip a bank-transfer order to paid by its id — used by the admin action
 * when the money lands in Rusker's account outside Stripe's tracking. Idempotent.
 */
export async function markTransferPaidWith(client: SupabaseClient, orderId: string): Promise<string | null> {
  const { data, error } = await client
    .from('orders')
    .update({ status: 'paid', payment_method: 'bank_transfer', expires_at: null })
    .eq('id', orderId)
    .in('status', ['awaiting_transfer'])
    .select('id')
  if (error) throw new Error(`manual transfer paid transition failed: ${error.message}`)
  return data?.[0]?.id ?? null
}

export async function markTransferPaid(orderId: string): Promise<string | null> {
  return markTransferPaidWith(getSupabase(), orderId)
}

/** Cancel an unpaid bank-transfer order past its invoice due date. Idempotent on status. */
export async function cancelUnpaidTransferWith(client: SupabaseClient, orderId: string): Promise<string | null> {
  const { data, error } = await client
    .from('orders')
    .update({ status: 'cancelled' })
    .eq('id', orderId)
    .in('status', ['awaiting_transfer'])
    .select('id')
  if (error) throw new Error(`cancel transfer failed: ${error.message}`)
  return data?.[0]?.id ?? null
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
