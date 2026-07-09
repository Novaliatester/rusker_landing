import type { SupabaseClient } from '@supabase/supabase-js'
import type { BookingRequest } from '@/lib/booking'
import type { Amounts } from '@/lib/pricing'
import { ID_DOCUMENTS_BUCKET } from '@/lib/upload'
import { recordConsents, type ConsentMeta } from '@/lib/consent'

const HOLD_MINUTES = 35 // slightly longer than the 30-minute Stripe session

export type CreatedOrder = { orderId: string; participantIds: string[] }

export async function createPendingOrder(
  client: SupabaseClient,
  booking: BookingRequest,
  expeditionId: string,
  amounts: Amounts,
  consent: ConsentMeta
): Promise<CreatedOrder> {
  const now = new Date()
  const { data: order, error: orderError } = await client
    .from('orders')
    .insert({
      expedition_id: expeditionId,
      quantity: booking.participants.length,
      status: 'pending',
      locale: booking.locale,
      buyer_email: booking.participants[0].email,
      buyer_name: `${booking.participants[0].firstName} ${booking.participants[0].lastName}`,
      company_legal_name: booking.billing.companyLegalName,
      billing_address: booking.billing.billingAddress,
      vat_number: booking.billing.vatNumber || null,
      amount_subtotal_cents: amounts.subtotalCents,
      amount_tax_cents: amounts.taxCents,
      amount_total_cents: amounts.totalCents,
      currency: 'eur',
      terms_accepted_at: now.toISOString(),
      privacy_accepted_at: now.toISOString(),
      consent_ip: consent.ip,
      expires_at: new Date(now.getTime() + HOLD_MINUTES * 60_000).toISOString(),
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
      }))
    )
    .select('id')
  if (participantsError || !participants) throw new Error(`participants insert failed: ${participantsError?.message}`)

  await recordConsents(client, order.id, booking, consent, now)

  return { orderId: order.id, participantIds: participants.map((row) => row.id) }
}

/** Move each tmp upload under the order and record the final path on the participant row. */
export async function attachDocuments(
  client: SupabaseClient,
  created: CreatedOrder,
  booking: BookingRequest
): Promise<void> {
  const storage = client.storage.from(ID_DOCUMENTS_BUCKET)
  for (let i = 0; i < created.participantIds.length; i++) {
    const tmpKey = booking.participants[i].idDocumentKey
    const ext = tmpKey.slice(tmpKey.lastIndexOf('.') + 1)
    const finalKey = `orders/${created.orderId}/${created.participantIds[i]}.${ext}`
    const { error: moveError } = await storage.move(tmpKey, finalKey)
    if (moveError) throw new Error(`document move failed: ${moveError.message}`)
    const { error: updateError } = await client
      .from('expedition_participants')
      .update({ id_document_path: finalKey })
      .eq('id', created.participantIds[i])
    if (updateError) throw new Error(`document path update failed: ${updateError.message}`)
  }
}

/** Best-effort rollback if Stripe session creation fails: files + rows go away. */
export async function discardPendingOrder(client: SupabaseClient, orderId: string): Promise<void> {
  const storage = client.storage.from(ID_DOCUMENTS_BUCKET)
  const { data: files } = await storage.list(`orders/${orderId}`)
  if (files?.length) await storage.remove(files.map((f) => `orders/${orderId}/${f.name}`))
  await client.from('orders').delete().eq('id', orderId) // participants cascade
}
