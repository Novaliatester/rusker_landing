import { describe, it, expect } from 'vitest'
import { parseCheckoutRequest, validateQuantity } from '@/lib/checkout'

describe('parseCheckoutRequest', () => {
  it('accepts a valid body', () => {
    expect(parseCheckoutRequest({ slug: 'barcelona-tech-immersion', quantity: 12 })).toEqual({
      slug: 'barcelona-tech-immersion',
      quantity: 12,
    })
  })

  it.each([
    ['null body', null],
    ['missing slug', { quantity: 3 }],
    ['empty slug', { slug: '', quantity: 3 }],
    ['missing quantity', { slug: 'x' }],
    ['non-integer quantity', { slug: 'x', quantity: 2.5 }],
    ['zero quantity', { slug: 'x', quantity: 0 }],
    ['negative quantity', { slug: 'x', quantity: -1 }],
    ['string quantity', { slug: 'x', quantity: '3' }],
  ])('rejects %s', (_name, body) => {
    expect(parseCheckoutRequest(body)).toBeNull()
  })
})

describe('validateQuantity', () => {
  const bounds = { min_participants: 10, max_participants: 40 }

  it('accepts a quantity within bounds', () => {
    expect(validateQuantity(bounds, 10)).toBeNull()
    expect(validateQuantity(bounds, 40)).toBeNull()
  })

  it('rejects below minimum', () => {
    expect(validateQuantity(bounds, 9)).toBe('This expedition requires at least 10 participants')
  })

  it('rejects above maximum', () => {
    expect(validateQuantity(bounds, 41)).toBe('This expedition allows at most 40 participants')
  })

  it('allows any quantity above min when max is null', () => {
    expect(validateQuantity({ min_participants: 1, max_participants: null }, 500)).toBeNull()
  })
})
