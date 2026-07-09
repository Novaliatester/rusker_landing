const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const TMP_KEY = /^tmp\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.(jpg|jpeg|png|pdf)$/
const LOCALES = ['fr', 'en'] as const

export type ParticipantInput = {
  firstName: string
  lastName: string
  birthdate: string
  nationality: string
  email: string
  phone: string
  companyName: string
  companyPosition: string
  idDocumentNumber: string
  idDocumentExpiry: string
  idDocumentKey: string
  departureStation: string
  dietaryRestrictions: string
  emergencyContactName: string
  emergencyContactPhone: string
}

export type BookingRequest = {
  slug: string
  locale: (typeof LOCALES)[number]
  participants: ParticipantInput[]
  billing: { companyLegalName: string; billingAddress: string; vatNumber: string }
  termsAccepted: true
  privacyAccepted: true
}

const REQUIRED_PARTICIPANT_FIELDS: (keyof ParticipantInput)[] = [
  'firstName', 'lastName', 'birthdate', 'nationality', 'email', 'phone',
  'companyName', 'companyPosition', 'idDocumentNumber', 'idDocumentExpiry',
  'idDocumentKey', 'departureStation', 'emergencyContactName', 'emergencyContactPhone',
]

function isNonEmptyString(v: unknown): v is string {
  return typeof v === 'string' && v.trim().length > 0
}

function parseParticipant(raw: unknown): ParticipantInput | null {
  if (typeof raw !== 'object' || raw === null) return null
  const p = raw as Record<string, unknown>
  for (const field of REQUIRED_PARTICIPANT_FIELDS) {
    if (!isNonEmptyString(p[field])) return null
  }
  if (!ISO_DATE.test(p.birthdate as string) || !ISO_DATE.test(p.idDocumentExpiry as string)) return null
  if (!EMAIL.test(p.email as string)) return null
  if (!TMP_KEY.test(p.idDocumentKey as string)) return null
  const dietary = typeof p.dietaryRestrictions === 'string' ? p.dietaryRestrictions : ''
  return {
    firstName: (p.firstName as string).trim(),
    lastName: (p.lastName as string).trim(),
    birthdate: p.birthdate as string,
    nationality: (p.nationality as string).trim(),
    email: (p.email as string).trim(),
    phone: (p.phone as string).trim(),
    companyName: (p.companyName as string).trim(),
    companyPosition: (p.companyPosition as string).trim(),
    idDocumentNumber: (p.idDocumentNumber as string).trim(),
    idDocumentExpiry: p.idDocumentExpiry as string,
    idDocumentKey: p.idDocumentKey as string,
    departureStation: (p.departureStation as string).trim(),
    dietaryRestrictions: dietary.trim(),
    emergencyContactName: (p.emergencyContactName as string).trim(),
    emergencyContactPhone: (p.emergencyContactPhone as string).trim(),
  }
}

export function parseBookingRequest(body: unknown): BookingRequest | null {
  if (typeof body !== 'object' || body === null) return null
  const b = body as Record<string, unknown>
  if (!isNonEmptyString(b.slug)) return null
  if (!LOCALES.includes(b.locale as never)) return null
  if (b.termsAccepted !== true || b.privacyAccepted !== true) return null
  if (!Array.isArray(b.participants) || b.participants.length < 1 || b.participants.length > 20) return null
  const participants: ParticipantInput[] = []
  for (const raw of b.participants) {
    const p = parseParticipant(raw)
    if (!p) return null
    participants.push(p)
  }
  const billing = b.billing as Record<string, unknown> | null
  if (typeof billing !== 'object' || billing === null) return null
  if (!isNonEmptyString(billing.companyLegalName) || !isNonEmptyString(billing.billingAddress)) return null
  const vatNumber = typeof billing.vatNumber === 'string' ? billing.vatNumber.trim() : ''
  return {
    slug: b.slug as string,
    locale: b.locale as BookingRequest['locale'],
    participants,
    billing: {
      companyLegalName: (billing.companyLegalName as string).trim(),
      billingAddress: (billing.billingAddress as string).trim(),
      vatNumber,
    },
    termsAccepted: true,
    privacyAccepted: true,
  }
}
