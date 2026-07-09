import { describe, it, expect } from 'vitest'
import { parseBookingRequest, normalizePhone, isValidPhone, type BookingRequest } from '@/lib/booking'

const NOW = new Date('2026-07-09T12:00:00Z')

const PARTICIPANT = {
  firstName: 'Jeanne',
  lastName: 'Martin',
  birthdate: '1980-04-12',
  nationality: 'Française',
  email: 'jeanne@acme.fr',
  phone: '+33 6 12 34 56 78',
  companyName: 'ACME SA',
  companyPosition: 'CTO',
  idDocumentNumber: '12AB34567',
  idDocumentExpiry: '2030-01-01',
  idDocumentKey: 'tmp/0f9c2c1e-1111-4222-8333-444455556666.pdf',
  departureStation: 'Lyon',
  dietaryRestrictions: '',
  emergencyContactName: 'Paul Martin',
  emergencyContactPhone: '+33 6 98 76 54 32',
}

const VALID = {
  slug: 'aura-ai-summit-2026',
  locale: 'fr',
  paymentMethod: 'card',
  participants: [PARTICIPANT],
  billing: {
    companyLegalName: 'ACME SA',
    addressLine1: '1 rue de la Paix',
    postalCode: '69001',
    city: 'Lyon',
    country: 'FR',
    vatNumber: 'FR12345678901',
  },
  termsAccepted: true,
  privacyAccepted: true,
}

describe('phone helpers', () => {
  it('normalizes spaces, dots, dashes, parentheses', () => {
    expect(normalizePhone('+33 6 12.34-56(78)')).toBe('+33612345678')
  })
  it('requires international format', () => {
    expect(isValidPhone('+33612345678')).toBe(true)
    expect(isValidPhone('0612345678')).toBe(false)
    expect(isValidPhone('+12')).toBe(false)
  })
})

describe('parseBookingRequest', () => {
  it('accepts a valid booking and normalizes phones + VAT', () => {
    const parsed = parseBookingRequest(VALID, NOW) as BookingRequest
    expect(parsed).not.toBeNull()
    expect(parsed.participants[0].phone).toBe('+33612345678')
    expect(parsed.billing.vatNumber).toBe('FR12345678901')
    expect(parsed.billing.country).toBe('FR')
    expect(parsed.paymentMethod).toBe('card')
  })

  it('accepts the transfer payment method', () => {
    const parsed = parseBookingRequest({ ...VALID, paymentMethod: 'transfer' }, NOW)
    expect(parsed?.paymentMethod).toBe('transfer')
  })

  it('accepts an empty billing address (only company name is required)', () => {
    const parsed = parseBookingRequest(
      { ...VALID, billing: { companyLegalName: 'ACME SA', addressLine1: '', postalCode: '', city: '', country: '', vatNumber: '' } },
      NOW
    )
    expect(parsed).not.toBeNull()
    expect(parsed?.billing.addressLine1).toBe('')
  })

  it('lowercases-in country codes are normalized to uppercase', () => {
    const parsed = parseBookingRequest({ ...VALID, billing: { ...VALID.billing, country: 'fr' } }, NOW)
    expect(parsed?.billing.country).toBe('FR')
  })

  it.each([
    ['null body', null],
    ['no participants', { ...VALID, participants: [] }],
    ['too many participants', { ...VALID, participants: Array(21).fill(PARTICIPANT) }],
    ['missing consent (terms)', { ...VALID, termsAccepted: false }],
    ['missing consent (privacy)', { ...VALID, privacyAccepted: false }],
    ['missing required participant field', { ...VALID, participants: [{ ...PARTICIPANT, lastName: '' }] }],
    ['bad birthdate format', { ...VALID, participants: [{ ...PARTICIPANT, birthdate: '12/04/1980' }] }],
    ['future birthdate', { ...VALID, participants: [{ ...PARTICIPANT, birthdate: '2027-01-01' }] }],
    ['expired ID document', { ...VALID, participants: [{ ...PARTICIPANT, idDocumentExpiry: '2026-07-09' }] }],
    ['bad email', { ...VALID, participants: [{ ...PARTICIPANT, email: 'not-an-email' }] }],
    ['national-format phone', { ...VALID, participants: [{ ...PARTICIPANT, phone: '0612345678' }] }],
    ['bad emergency phone', { ...VALID, participants: [{ ...PARTICIPANT, emergencyContactPhone: '12' }] }],
    ['upload key outside tmp/', { ...VALID, participants: [{ ...PARTICIPANT, idDocumentKey: 'orders/x/evil.pdf' }] }],
    ['upload key with traversal', { ...VALID, participants: [{ ...PARTICIPANT, idDocumentKey: 'tmp/../secrets.pdf' }] }],
    ['missing billing name', { ...VALID, billing: { ...VALID.billing, companyLegalName: '' } }],
    ['bad country code', { ...VALID, billing: { ...VALID.billing, country: 'France' } }],
    ['unknown locale', { ...VALID, locale: 'de' }],
    ['missing payment method', { ...VALID, paymentMethod: undefined }],
    ['unknown payment method', { ...VALID, paymentMethod: 'crypto' }],
  ])('rejects %s', (_name, body) => {
    expect(parseBookingRequest(body, NOW)).toBeNull()
  })
})
