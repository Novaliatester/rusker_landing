export type Amounts = { subtotalCents: number; taxCents: number; totalCents: number }

export function computeAmounts(unitHtCents: number, quantity: number, vatRatePct: number): Amounts {
  const subtotalCents = unitHtCents * quantity
  const taxCents = Math.round((subtotalCents * vatRatePct) / 100)
  return { subtotalCents, taxCents, totalCents: subtotalCents + taxCents }
}
