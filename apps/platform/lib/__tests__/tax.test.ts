import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getOrCreateIva21, resetTaxRateCache } from '@/lib/tax'

function fakeStripe(existing: Array<{ id: string; percentage: number; inclusive: boolean; active: boolean; display_name: string }>) {
  return {
    taxRates: {
      list: vi.fn().mockResolvedValue({ data: existing }),
      create: vi.fn().mockResolvedValue({ id: 'txr_created' }),
    },
  } as never
}

beforeEach(() => resetTaxRateCache())

describe('getOrCreateIva21', () => {
  it('reuses an existing active exclusive 21% rate', async () => {
    const stripe = fakeStripe([{ id: 'txr_existing', percentage: 21, inclusive: false, active: true, display_name: 'IVA' }])
    expect(await getOrCreateIva21(stripe)).toBe('txr_existing')
  })

  it('creates the rate when none matches', async () => {
    const stripe = fakeStripe([{ id: 'txr_old', percentage: 10, inclusive: false, active: true, display_name: 'IVA' }])
    expect(await getOrCreateIva21(stripe)).toBe('txr_created')
  })

  it('caches the id across calls', async () => {
    const stripe = fakeStripe([{ id: 'txr_existing', percentage: 21, inclusive: false, active: true, display_name: 'IVA' }])
    await getOrCreateIva21(stripe)
    await getOrCreateIva21(stripe)
    expect((stripe as any).taxRates.list).toHaveBeenCalledTimes(1)
  })
})
