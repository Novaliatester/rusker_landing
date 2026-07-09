import { describe, it, expect } from 'vitest'
import { participantsCsv } from '@/lib/csv'

describe('participantsCsv', () => {
  it('produces a header row and one line per participant', () => {
    const csv = participantsCsv([
      {
        first_name: 'Jeanne', last_name: 'Martin', birthdate: '1980-04-12', nationality: 'Française',
        email: 'j@acme.fr', phone: '+33612345678', company_name: 'ACME', company_position: 'CTO',
        id_document_number: '12AB34567', id_document_expiry: '2030-01-01', departure_station: 'Lyon',
        dietary_restrictions: null, emergency_contact_name: 'Paul', emergency_contact_phone: '+33698765432',
      },
    ])
    const lines = csv.trim().split('\n')
    expect(lines).toHaveLength(2)
    expect(lines[0]).toContain('first_name')
    expect(lines[1]).toContain('Jeanne')
  })

  it('escapes quotes, commas, and newlines', () => {
    const csv = participantsCsv([
      {
        first_name: 'Jean "JB"', last_name: 'B, jr.', birthdate: '1980-01-01', nationality: 'FR',
        email: 'j@x.fr', phone: '1', company_name: 'A\nB', company_position: 'C', id_document_number: '1',
        id_document_expiry: '2030-01-01', departure_station: 'Lyon', dietary_restrictions: null,
        emergency_contact_name: 'P', emergency_contact_phone: '2',
      },
    ])
    expect(csv).toContain('"Jean ""JB"""')
    expect(csv).toContain('"B, jr."')
    expect(csv).toContain('"A\nB"')
  })
})
