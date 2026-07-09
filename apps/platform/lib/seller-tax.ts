import type Stripe from 'stripe'

/**
 * Rusker Travel's own intracommunity VAT number (NIF B44897510 → ES + NIF), shown
 * as the seller tax id on every invoice. Registered once as an account tax id in
 * the Stripe account, then reused. This is what makes Rusker's VAT appear on the
 * invoice "from" block; the business name/address come from the Stripe dashboard
 * (Settings → Business).
 */
export const SELLER_VAT = 'ESB44897510'

let cached: string | null = null

export function resetSellerTaxIdCache() {
  cached = null
}

/** Find-or-create Rusker's account tax id; returns the id to pass as account_tax_ids. */
export async function getOrCreateSellerTaxId(stripe: Stripe): Promise<string> {
  if (cached) return cached
  const { data } = await stripe.taxIds.list({ limit: 100 })
  const found = data.find((t) => t.value === SELLER_VAT && t.type === 'eu_vat')
  if (found) return (cached = found.id)
  const created = await stripe.taxIds.create({ type: 'eu_vat', value: SELLER_VAT })
  return (cached = created.id)
}
