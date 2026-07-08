export type CheckoutRequest = {
  slug: string
  quantity: number
}

export function parseCheckoutRequest(body: unknown): CheckoutRequest | null {
  if (typeof body !== 'object' || body === null) return null
  const { slug, quantity } = body as Record<string, unknown>
  if (typeof slug !== 'string' || slug.length === 0) return null
  if (typeof quantity !== 'number' || !Number.isInteger(quantity) || quantity < 1) return null
  return { slug, quantity }
}

type QuantityBounds = {
  min_participants: number
  max_participants: number | null
}

/** Returns a user-facing error message, or null if the quantity is valid. */
export function validateQuantity(bounds: QuantityBounds, quantity: number): string | null {
  if (quantity < bounds.min_participants) {
    return `This expedition requires at least ${bounds.min_participants} participants`
  }
  if (bounds.max_participants !== null && quantity > bounds.max_participants) {
    return `This expedition allows at most ${bounds.max_participants} participants`
  }
  return null
}
