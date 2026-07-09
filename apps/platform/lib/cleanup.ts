export function isAbandoned(order: { status: string; expires_at: string | null }, nowIso: string): boolean {
  return order.status === 'pending' && order.expires_at !== null && order.expires_at <= nowIso
}

/** Expeditions whose ends_on is strictly before this date have passed the 30-day ID retention window. */
export function retentionCutoff(nowIso: string, retentionDays = 30): string {
  const cutoff = new Date(new Date(nowIso).getTime() - retentionDays * 24 * 60 * 60 * 1000)
  return cutoff.toISOString().slice(0, 10)
}
