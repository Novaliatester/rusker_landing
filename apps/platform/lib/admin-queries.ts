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
      .select('id, expedition_id, quantity, status, expires_at, buyer_email, company_legal_name, amount_total_cents, currency, payment_method, created_at')
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
    .select('*, expedition:expeditions (*), participants:expedition_participants (*), consents:consent_records (*)')
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

/** Remove every stored ID scan tied to an order (tmp/ paths + orders/{id}/ folder). */
async function purgeOrderFiles(client: ReturnType<typeof getSupabase>, orderId: string): Promise<void> {
  const storage = client.storage.from(ID_DOCUMENTS_BUCKET)
  const { data: rows } = await client
    .from('expedition_participants')
    .select('id_document_path')
    .eq('order_id', orderId)
    .not('id_document_path', 'is', null)
  const paths = (rows ?? []).map((r) => r.id_document_path as string).filter(Boolean)
  if (paths.length) await storage.remove(paths)
  const { data: files } = await storage.list(`orders/${orderId}`)
  if (files?.length) await storage.remove(files.map((f) => `orders/${orderId}/${f.name}`))
}

/**
 * Hard-delete an order regardless of status (admin cleanup of test data). Removes
 * its ID scans, then the row — participants + consent records cascade.
 */
export async function adminDeleteOrder(orderId: string): Promise<void> {
  const client = getSupabase()
  await purgeOrderFiles(client, orderId)
  const { error } = await client.from('orders').delete().eq('id', orderId)
  if (error) throw new Error(`order delete failed: ${error.message}`)
}

/**
 * Hard-delete an expedition and everything under it (admin cleanup). Orders don't
 * cascade from expeditions, so purge each order's files + rows first, then the
 * expedition itself.
 */
export async function adminDeleteExpedition(expeditionId: string): Promise<void> {
  const client = getSupabase()
  const { data: orders, error: e1 } = await client.from('orders').select('id').eq('expedition_id', expeditionId)
  if (e1) throw new Error(`expedition orders load failed: ${e1.message}`)
  for (const order of orders ?? []) {
    await purgeOrderFiles(client, order.id)
  }
  const { error: e2 } = await client.from('orders').delete().eq('expedition_id', expeditionId)
  if (e2) throw new Error(`expedition orders delete failed: ${e2.message}`)
  const { error: e3 } = await client.from('expeditions').delete().eq('id', expeditionId)
  if (e3) throw new Error(`expedition delete failed: ${e3.message}`)
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
