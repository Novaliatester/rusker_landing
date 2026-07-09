import type { SupabaseClient } from '@supabase/supabase-js'
import type { BookingRequest } from '@/lib/booking'

/**
 * Version tags pinning the exact wording each consent refers to.
 * BUMP the relevant tag whenever the corresponding legal text changes —
 * consent_records stores it so we can prove what was accepted.
 */
export const CONSENT_VERSIONS = {
  terms_of_sale: 'cgv-v1.0-2026-07-09',
  privacy: 'privacy-v1.0-2026-07-09',
} as const

export type ConsentType = keyof typeof CONSENT_VERSIONS

export type ConsentMeta = { ip: string | null; userAgent: string | null }

/** One row per accepted document, identity = buyer (participant 1). */
export async function recordConsents(
  client: SupabaseClient,
  orderId: string,
  booking: BookingRequest,
  meta: ConsentMeta,
  acceptedAt: Date
): Promise<void> {
  const buyer = booking.participants[0]
  const rows = (Object.keys(CONSENT_VERSIONS) as ConsentType[]).map((type) => ({
    order_id: orderId,
    consent_type: type,
    document_version: CONSENT_VERSIONS[type],
    identity_name: `${buyer.firstName} ${buyer.lastName}`,
    identity_email: buyer.email,
    accepted_at: acceptedAt.toISOString(),
    ip: meta.ip,
    user_agent: meta.userAgent,
  }))
  const { error } = await client.from('consent_records').insert(rows)
  if (error) throw new Error(`consent recording failed: ${error.message}`)
}
