import type { SupabaseClient } from '@supabase/supabase-js'
import type { BookingRequest } from '@/lib/booking'
import type { Amounts } from '@/lib/pricing'
import { ID_DOCUMENTS_BUCKET } from '@/lib/upload'
import { recordConsents, type ConsentMeta } from '@/lib/consent'

export type CreatedOrder = { orderId: string; participantIds: string[] }

export type OrderStatus = 'pending' | 'awaiting_transfer'

/** "1 rue de la Paix, 69001 Lyon, FR" — or null when no address was given. */
export function composeBillingAddress(billing: BookingRequest['billing']): string | null {
  const cityLine = [billing.postalCode, billing.city].filter(Boolean).join(' ')
  const parts = [billing.addressLine1, cityLine, billing.country].filter(Boolean)
  return parts.length > 0 ? parts.join(', ') : null
}

/**
 * Insert the order + participants + consent rows. ID uploads are recorded by
 * their tmp key on each participant (not yet moved into permanent storage): card
 * orders promote on payment, transfer orders promote immediately at creation.
 */
export async function createOrder(
  client: SupabaseClient,
  booking: BookingRequest,
  expeditionId: string,
  amounts: Amounts,
  consent: ConsentMeta,
  opts: { status: OrderStatus; expiresAt: Date }
): Promise<CreatedOrder> {
  const now = new Date()
  const { data: order, error: orderError } = await client
    .from('orders')
    .insert({
      expedition_id: expeditionId,
      quantity: booking.participants.length,
      status: opts.status,
      payment_method: opts.status === 'awaiting_transfer' ? 'bank_transfer' : null,
      locale: booking.locale,
      buyer_email: booking.participants[0].email,
      buyer_name: `${booking.participants[0].firstName} ${booking.participants[0].lastName}`,
      company_legal_name: booking.billing.companyLegalName,
      billing_address: composeBillingAddress(booking.billing),
      vat_number: booking.billing.vatNumber || null,
      amount_subtotal_cents: amounts.subtotalCents,
      amount_tax_cents: amounts.taxCents,
      amount_total_cents: amounts.totalCents,
      currency: 'eur',
      terms_accepted_at: now.toISOString(),
      privacy_accepted_at: now.toISOString(),
      consent_ip: consent.ip,
      expires_at: opts.expiresAt.toISOString(),
    })
    .select('id')
    .single()
  if (orderError || !order) throw new Error(`order insert failed: ${orderError?.message}`)

  const { data: participants, error: participantsError } = await client
    .from('expedition_participants')
    .insert(
      booking.participants.map((p) => ({
        order_id: order.id,
        first_name: p.firstName,
        last_name: p.lastName,
        birthdate: p.birthdate,
        nationality: p.nationality,
        email: p.email,
        phone: p.phone,
        company_name: p.companyName,
        company_position: p.companyPosition,
        id_document_number: p.idDocumentNumber,
        id_document_expiry: p.idDocumentExpiry,
        departure_station: p.departureStation,
        dietary_restrictions: p.dietaryRestrictions || null,
        emergency_contact_name: p.emergencyContactName,
        emergency_contact_phone: p.emergencyContactPhone,
        // tmp key for now; promoteDocuments moves it into permanent storage
        id_document_path: p.idDocumentKey,
      }))
    )
    .select('id')
  if (participantsError || !participants) throw new Error(`participants insert failed: ${participantsError?.message}`)

  await recordConsents(client, order.id, booking, consent, now)

  return { orderId: order.id, participantIds: participants.map((row) => row.id) }
}

/**
 * Move each participant's tmp upload into permanent per-order storage and update
 * its path. Idempotent: paths already under orders/ are skipped, so a duplicate
 * paid webhook is harmless.
 */
export async function promoteDocuments(client: SupabaseClient, orderId: string): Promise<void> {
  const storage = client.storage.from(ID_DOCUMENTS_BUCKET)
  const { data: rows, error } = await client
    .from('expedition_participants')
    .select('id, id_document_path')
    .eq('order_id', orderId)
  if (error) throw new Error(`participant read failed: ${error.message}`)
  for (const row of rows ?? []) {
    const tmpKey = row.id_document_path as string | null
    if (!tmpKey || !tmpKey.startsWith('tmp/')) continue
    const ext = tmpKey.slice(tmpKey.lastIndexOf('.') + 1)
    const finalKey = `orders/${orderId}/${row.id}.${ext}`
    const { error: moveError } = await storage.move(tmpKey, finalKey)
    if (moveError) throw new Error(`document move failed: ${moveError.message}`)
    const { error: updateError } = await client
      .from('expedition_participants')
      .update({ id_document_path: finalKey })
      .eq('id', row.id)
    if (updateError) throw new Error(`document path update failed: ${updateError.message}`)
  }
}

/**
 * Delete an order and every file it references (tmp uploads not yet promoted, plus
 * anything already under orders/{id}). Used for booking rollback and for discarding
 * an abandoned card order whose Stripe session expired.
 */
export async function discardOrder(client: SupabaseClient, orderId: string): Promise<void> {
  // Never destroy a paid order (guards against a late checkout.session.expired
  // arriving after a successful payment).
  const { data: order } = await client.from('orders').select('status').eq('id', orderId).maybeSingle()
  if (order && order.status === 'paid') return

  const storage = client.storage.from(ID_DOCUMENTS_BUCKET)
  const { data: rows } = await client
    .from('expedition_participants')
    .select('id_document_path')
    .eq('order_id', orderId)
  const tmpPaths = (rows ?? [])
    .map((r) => r.id_document_path as string | null)
    .filter((p): p is string => !!p)
  if (tmpPaths.length) await storage.remove(tmpPaths)
  const { data: files } = await storage.list(`orders/${orderId}`)
  if (files?.length) await storage.remove(files.map((f) => `orders/${orderId}/${f.name}`))
  await client.from('orders').delete().eq('id', orderId) // participants cascade
}
