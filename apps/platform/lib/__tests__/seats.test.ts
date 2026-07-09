import { describe, it, expect } from 'vitest'
import { seatsTaken, remainingSeats } from '@/lib/seats'

const NOW = '2026-07-09T10:00:00.000Z'

describe('seatsTaken', () => {
  it('counts paid orders and live pending holds, ignores expired ones', () => {
    expect(
      seatsTaken(
        [
          { quantity: 2, status: 'paid', expires_at: null },
          { quantity: 3, status: 'pending', expires_at: '2026-07-09T10:30:00.000Z' },
          { quantity: 5, status: 'pending', expires_at: '2026-07-09T09:00:00.000Z' },
          { quantity: 4, status: 'expired', expires_at: '2026-07-09T09:00:00.000Z' },
        ],
        NOW
      )
    ).toBe(5)
  })
})

describe('remainingSeats', () => {
  it('subtracts from capacity and never goes negative', () => {
    expect(remainingSeats(20, [{ quantity: 19, status: 'paid', expires_at: null }], NOW)).toBe(1)
    expect(remainingSeats(20, [{ quantity: 25, status: 'paid', expires_at: null }], NOW)).toBe(0)
  })

  it('treats null capacity as unlimited', () => {
    expect(remainingSeats(null, [{ quantity: 500, status: 'paid', expires_at: null }], NOW)).toBe(Infinity)
  })
})
