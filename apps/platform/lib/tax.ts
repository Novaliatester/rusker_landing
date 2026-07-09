import type Stripe from 'stripe'

let cached: string | null = null

export function resetTaxRateCache() {
  cached = null
}

/** Spanish IVA 21%, tax-exclusive — created once in the Stripe account, then reused. */
export async function getOrCreateIva21(stripe: Stripe): Promise<string> {
  if (cached) return cached
  const { data } = await stripe.taxRates.list({ active: true, limit: 100 })
  const found = data.find((r) => r.percentage === 21 && !r.inclusive && r.display_name === 'IVA')
  if (found) return (cached = found.id)
  const created = await stripe.taxRates.create({
    display_name: 'IVA',
    percentage: 21,
    inclusive: false,
    country: 'ES',
    description: 'Spanish VAT 21%',
  })
  return (cached = created.id)
}
