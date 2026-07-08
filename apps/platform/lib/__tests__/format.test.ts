import { describe, it, expect } from 'vitest'
import { formatPrice } from '@/lib/format'

describe('formatPrice', () => {
  it('formats whole euro amounts without decimals', () => {
    expect(formatPrice(89000, 'eur')).toBe('€890')
  })

  it('formats fractional amounts with two decimals', () => {
    expect(formatPrice(89050, 'eur')).toBe('€890.50')
  })
})
