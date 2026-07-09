import { NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'
import { isAbandoned, retentionCutoff } from '@/lib/cleanup'
import { ID_DOCUMENTS_BUCKET } from '@/lib/upload'

export async function GET(request: Request) {
  const auth = request.headers.get('authorization')
  if (!process.env.CRON_SECRET || auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const client = getSupabase()
  const storage = client.storage.from(ID_DOCUMENTS_BUCKET)
  const nowIso = new Date().toISOString()
  let abandonedPurged = 0
  let docsPurged = 0

  // Pass 1 — abandoned pending bookings: delete files + participants, mark expired.
  const { data: pending, error: pendingError } = await client
    .from('orders')
    .select('id, status, expires_at')
    .eq('status', 'pending')
  if (pendingError) return NextResponse.json({ error: pendingError.message }, { status: 500 })
  for (const order of pending ?? []) {
    if (!isAbandoned(order, nowIso)) continue
    const { data: files } = await storage.list(`orders/${order.id}`)
    if (files?.length) await storage.remove(files.map((f) => `orders/${order.id}/${f.name}`))
    await client.from('expedition_participants').delete().eq('order_id', order.id)
    await client.from('orders').update({ status: 'expired' }).eq('id', order.id).eq('status', 'pending')
    abandonedPurged++
  }

  // Pass 2 — 30-day retention: null paths + delete files for past expeditions.
  const { data: pastExpeditions, error: pastError } = await client
    .from('expeditions')
    .select('id')
    .lt('ends_on', retentionCutoff(nowIso))
  if (pastError) return NextResponse.json({ error: pastError.message }, { status: 500 })
  for (const expedition of pastExpeditions ?? []) {
    const { data: orders } = await client.from('orders').select('id').eq('expedition_id', expedition.id)
    for (const order of orders ?? []) {
      const { data: rows } = await client
        .from('expedition_participants')
        .select('id, id_document_path')
        .eq('order_id', order.id)
        .not('id_document_path', 'is', null)
      if (!rows?.length) continue
      await storage.remove(rows.map((r) => r.id_document_path as string))
      await client.from('expedition_participants').update({ id_document_path: null }).eq('order_id', order.id)
      docsPurged += rows.length
    }
  }

  return NextResponse.json({ abandonedPurged, docsPurged })
}
