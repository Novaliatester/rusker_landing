import { describe, it, expect } from 'vitest'
import { parseBookingRequest, type BookingRequest } from '@/lib/booking'

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
  participants: [PARTICIPANT],
  billing: { companyLegalName: 'ACME SA', billingAddress: '1 rue de la Paix, 69001 Lyon, France', vatNumber: 'FR12345678901' },
  termsAccepted: true,
  privacyAccepted: true,
}

describe('parseBookingRequest', () => {
  it('accepts a valid single-participant booking', () => {
    const parsed = parseBookingRequest(VALID) as BookingRequest
    expect(parsed).not.toBeNull()
    expect(parsed.participants).toHaveLength(1)
    expect(parsed.locale).toBe('fr')
  })

  it('accepts multiple participants and empty optional fields', () => {
    const parsed = parseBookingRequest({
      ...VALID,
      participants: [PARTICIPANT, { ...PARTICIPANT, email: 'other@acme.fr' }],
      billing: { ...VALID.billing, vatNumber: '' },
    })
    expect(parsed?.participants).toHaveLength(2)
  })

  it.each([
    ['null body', null],
    ['no participants', { ...VALID, participants: [] }],
    ['too many participants', { ...VALID, participants: Array(21).fill(PARTICIPANT) }],
    ['missing consent (terms)', { ...VALID, termsAccepted: false }],
    ['missing consent (privacy)', { ...VALID, privacyAccepted: false }],
    ['missing required participant field', { ...VALID, participants: [{ ...PARTICIPANT, lastName: '' }] }],
    ['bad birthdate format', { ...VALID, participants: [{ ...PARTICIPANT, birthdate: '12/04/1980' }] }],
    ['bad email', { ...VALID, participants: [{ ...PARTICIPANT, email: 'not-an-email' }] }],
    ['upload key outside tmp/', { ...VALID, participants: [{ ...PARTICIPANT, idDocumentKey: 'orders/x/evil.pdf' }] }],
    ['upload key with traversal', { ...VALID, participants: [{ ...PARTICIPANT, idDocumentKey: 'tmp/../secrets.pdf' }] }],
    ['missing billing name', { ...VALID, billing: { ...VALID.billing, companyLegalName: '' } }],
    ['unknown locale', { ...VALID, locale: 'de' }],
  ])('rejects %s', (_name, body) => {
    expect(parseBookingRequest(body)).toBeNull()
  })
})
