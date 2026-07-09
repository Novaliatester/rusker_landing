import { describe, it, expect } from 'vitest'
import { computeAmounts } from '@/lib/pricing'

describe('computeAmounts', () => {
  it('computes 21% VAT on one seat', () => {
    expect(computeAmounts(210000, 1, 21)).toEqual({
      subtotalCents: 210000,
      taxCents: 44100,
      totalCents: 254100,
    })
  })

  it('computes multi-seat totals', () => {
    expect(computeAmounts(210000, 3, 21)).toEqual({
      subtotalCents: 630000,
      taxCents: 132300,
      totalCents: 762300,
    })
  })

  it('rounds tax to the nearest cent', () => {
    // 1234 * 21% = 259.14 -> 259
    expect(computeAmounts(1234, 1, 21)).toEqual({ subtotalCents: 1234, taxCents: 259, totalCents: 1493 })
  })
})
