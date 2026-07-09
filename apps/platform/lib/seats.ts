export type SeatRow = { quantity: number; status: string; expires_at: string | null }

export function seatsTaken(rows: SeatRow[], nowIso: string): number {
  return rows.reduce((sum, row) => {
    if (row.status === 'paid' || row.status === 'awaiting_transfer') return sum + row.quantity
    if (row.status === 'pending' && row.expires_at && row.expires_at > nowIso) return sum + row.quantity
    return sum
  }, 0)
}

export function remainingSeats(capacity: number | null, rows: SeatRow[], nowIso: string): number {
  if (capacity === null) return Infinity
  return Math.max(0, capacity - seatsTaken(rows, nowIso))
}
