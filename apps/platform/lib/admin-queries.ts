import { getSupabase } from '@/lib/supabase'
import { seatsTaken, type SeatRow } from '@/lib/seats'
import { ID_DOCUMENTS_BUCKET } from '@/lib/upload'
import type { CsvParticipant } from '@/lib/csv'

export async function getAdminOverview() {
  const client = getSupabase()
  const [{ data: expeditions, error: e1 }, { data: orders, error: e2 }] = await Promise.all([
    client.from('expeditions').select('id, slug, title, capacity, starts_on, ends_on, is_active').order('starts_on'),
    client
      .from('orders')
      .select('id, expedition_id, quantity, status, expires_at, buyer_email, company_legal_name, amount_total_cents, currency, created_at')
      .order('created_at', { ascending: false }),
  ])
  if (e1 || e2) throw new Error(`admin overview failed: ${e1?.message ?? e2?.message}`)
  const nowIso = new Date().toISOString()
  return (expeditions ?? []).map((expedition) => {
    const expeditionOrders = (orders ?? []).filter((o) => o.expedition_id === expedition.id)
    const taken = seatsTaken(expeditionOrders as SeatRow[], nowIso)
    const revenueCents = expeditionOrders
      .filter((o) => o.status === 'paid')
      .reduce((sum, o) => sum + (o.amount_total_cents ?? 0), 0)
    return { ...expedition, taken, revenueCents, orders: expeditionOrders }
  })
}

export async function getAdminOrder(orderId: string) {
  const { data, error } = await getSupabase()
    .from('orders')
    .select('*, expedition:expeditions (*), participants:expedition_participants (*)')
    .eq('id', orderId)
    .maybeSingle()
  if (error) throw new Error(`admin order load failed: ${error.message}`)
  return data
}

export async function signedDocumentUrl(path: string): Promise<string | null> {
  const { data, error } = await getSupabase().storage.from(ID_DOCUMENTS_BUCKET).createSignedUrl(path, 600)
  if (error) return null
  return data.signedUrl
}

export async function getExpeditionManifest(expeditionId: string): Promise<{ title: string; rows: CsvParticipant[] }> {
  const client = getSupabase()
  const { data: expedition, error: e1 } = await client
    .from('expeditions').select('title').eq('id', expeditionId).maybeSingle()
  if (e1 || !expedition) throw new Error(`expedition not found: ${e1?.message}`)
  const { data: orders, error: e2 } = await client
    .from('orders').select('id').eq('expedition_id', expeditionId).eq('status', 'paid')
  if (e2) throw new Error(e2.message)
  const orderIds = (orders ?? []).map((o) => o.id)
  if (orderIds.length === 0) return { title: expedition.title, rows: [] }
  const { data: participants, error: e3 } = await client
    .from('expedition_participants')
    .select('first_name, last_name, birthdate, nationality, email, phone, company_name, company_position, id_document_number, id_document_expiry, departure_station, dietary_restrictions, emergency_contact_name, emergency_contact_phone')
    .in('order_id', orderIds)
    .order('last_name')
  if (e3) throw new Error(e3.message)
  return { title: expedition.title, rows: (participants ?? []) as CsvParticipant[] }
}
