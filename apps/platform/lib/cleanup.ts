export function isAbandoned(order: { status: string; expires_at: string | null }, nowIso: string): boolean {
  return order.status === 'pending' && order.expires_at !== null && order.expires_at <= nowIso
}

/** A bank-transfer order whose invoice due date (stored in expires_at) has passed. */
export function isTransferOverdue(order: { status: string; expires_at: string | null }, nowIso: string): boolean {
  return order.status === 'awaiting_transfer' && order.expires_at !== null && order.expires_at <= nowIso
}

/** Storage objects in tmp/ older than this are abandoned uploads never attached to an order. */
export function isStaleTmpUpload(file: { created_at?: string | null; updated_at?: string | null }, cutoffIso: string): boolean {
  const stamp = file.created_at ?? file.updated_at ?? ''
  return stamp !== '' && stamp < cutoffIso
}

/** Uploads to tmp/ get this long to be attached to an order before the cron reclaims them. */
export function tmpCutoff(nowIso: string, hours = 6): string {
  return new Date(new Date(nowIso).getTime() - hours * 60 * 60 * 1000).toISOString()
}

/** Expeditions whose ends_on is strictly before this date have passed the 30-day ID retention window. */
export function retentionCutoff(nowIso: string, retentionDays = 30): string {
  const cutoff = new Date(new Date(nowIso).getTime() - retentionDays * 24 * 60 * 60 * 1000)
  return cutoff.toISOString().slice(0, 10)
}
