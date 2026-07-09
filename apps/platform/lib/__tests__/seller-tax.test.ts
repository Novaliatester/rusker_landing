import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getOrCreateSellerTaxId, resetSellerTaxIdCache, SELLER_VAT } from '@/lib/seller-tax'

function fakeStripe(existing: Array<{ id: string; type: string; value: string }>) {
  return {
    taxIds: {
      list: vi.fn().mockResolvedValue({ data: existing }),
      create: vi.fn().mockResolvedValue({ id: 'txi_created' }),
    },
  } as never
}

beforeEach(() => resetSellerTaxIdCache())

describe('getOrCreateSellerTaxId', () => {
  it('reuses an existing account VAT id', async () => {
    const stripe = fakeStripe([{ id: 'txi_existing', type: 'eu_vat', value: SELLER_VAT }])
    expect(await getOrCreateSellerTaxId(stripe)).toBe('txi_existing')
  })

  it('creates the account VAT id when none matches', async () => {
    const stripe = fakeStripe([{ id: 'txi_other', type: 'eu_vat', value: 'FR12345678901' }])
    expect(await getOrCreateSellerTaxId(stripe)).toBe('txi_created')
    expect((stripe as unknown as { taxIds: { create: ReturnType<typeof vi.fn> } }).taxIds.create)
      .toHaveBeenCalledWith({ type: 'eu_vat', value: SELLER_VAT })
  })

  it('caches the id across calls', async () => {
    const stripe = fakeStripe([{ id: 'txi_existing', type: 'eu_vat', value: SELLER_VAT }])
    await getOrCreateSellerTaxId(stripe)
    await getOrCreateSellerTaxId(stripe)
    expect((stripe as unknown as { taxIds: { list: ReturnType<typeof vi.fn> } }).taxIds.list)
      .toHaveBeenCalledTimes(1)
  })
})
