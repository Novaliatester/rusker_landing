export type Amounts = { subtotalCents: number; taxCents: number; totalCents: number }

/**
 * Rusker Travel bills under the travel-agency margin scheme (régimen especial de
 * las agencias de viajes, LIVA arts. 141–147). The advertised price is the final,
 * all-in amount the customer pays: VAT is included in the margin and is neither
 * added on top nor itemised on the invoice. So subtotal == total and tax == 0.
 */
export function computeAmounts(unitPriceCents: number, quantity: number): Amounts {
  const totalCents = unitPriceCents * quantity
  return { subtotalCents: totalCents, taxCents: 0, totalCents }
}
