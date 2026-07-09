import { getSupabase } from '@/lib/supabase'
import { seatsTaken, type SeatRow } from '@/lib/seats'

export type Expedition = {
  id: string
  slug: string
  title: string
  description: string | null
  image_url: string | null
  price_per_person_cents: number
  currency: string
  min_participants: number
  max_participants: number | null
  is_active: boolean
  starts_on: string | null
  ends_on: string | null
  capacity: number | null
  vat_rate: number
  departure_stations: string[]
}

const COLUMNS =
  'id, slug, title, description, image_url, price_per_person_cents, currency, min_participants, max_participants, is_active, starts_on, ends_on, capacity, vat_rate, departure_stations'

export async function listActiveExpeditions(): Promise<Expedition[]> {
  const { data, error } = await getSupabase()
    .from('expeditions')
    .select(COLUMNS)
    .eq('is_active', true)
    .order('created_at', { ascending: true })
  if (error) throw new Error(`failed to list expeditions: ${error.message}`)
  return (data ?? []) as Expedition[]
}

export async function getExpeditionBySlug(slug: string): Promise<Expedition | null> {
  const { data, error } = await getSupabase()
    .from('expeditions')
    .select(COLUMNS)
    .eq('slug', slug)
    .maybeSingle()
  if (error) throw new Error(`failed to fetch expedition ${slug}: ${error.message}`)
  return data as Expedition | null
}

export async function getExpeditionById(id: string): Promise<Expedition | null> {
  const { data, error } = await getSupabase()
    .from('expeditions')
    .select(COLUMNS)
    .eq('id', id)
    .maybeSingle()
  if (error) throw new Error(`failed to fetch expedition ${id}: ${error.message}`)
  return data as Expedition | null
}

export async function getSeatsTaken(expeditionId: string): Promise<number> {
  const { data, error } = await getSupabase()
    .from('orders')
    .select('quantity, status, expires_at')
    .eq('expedition_id', expeditionId)
    .in('status', ['paid', 'pending'])
  if (error) throw new Error(`failed to count seats for ${expeditionId}: ${error.message}`)
  return seatsTaken((data ?? []) as SeatRow[], new Date().toISOString())
}
