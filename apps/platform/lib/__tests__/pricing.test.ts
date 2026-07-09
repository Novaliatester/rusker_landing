import { describe, it, expect } from 'vitest'
import { computeAmounts } from '@/lib/pricing'

describe('computeAmounts (travel-agency margin scheme)', () => {
  it('charges the all-in price with no VAT added on one seat', () => {
    expect(computeAmounts(210000, 1)).toEqual({
      subtotalCents: 210000,
      taxCents: 0,
      totalCents: 210000,
    })
  })

  it('multiplies the all-in price across seats without adding tax', () => {
    expect(computeAmounts(210000, 3)).toEqual({
      subtotalCents: 630000,
      taxCents: 0,
      totalCents: 630000,
    })
  })
})
