export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/
const TMP_KEY = /^tmp\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.(jpg|jpeg|png|pdf)$/
const LOCALES = ['fr', 'en'] as const
const PAYMENT_METHODS = ['card', 'transfer'] as const
const COUNTRY_RE = /^[A-Z]{2}$/

/** Strip spaces, dots, dashes, parentheses — keeps a leading + and digits. */
export function normalizePhone(raw: string): string {
  return raw.replace(/[\s().\-]/g, '')
}

/** International format required: + followed by 8-15 digits (E.164). */
export const PHONE_RE = /^\+\d{8,15}$/

export function isValidPhone(raw: string): boolean {
  return PHONE_RE.test(normalizePhone(raw))
}

/** Loose EU-VAT shape (FR12345678901, ESB44897510…). Used as a soft client hint AND a hard server gate for Stripe tax IDs. */
export const EU_VAT_RE = /^[A-Z]{2}[0-9A-Z]{8,12}$/

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

export type BillingInput = {
  companyLegalName: string
  addressLine1: string
  postalCode: string
  city: string
  country: string
  vatNumber: string
}

export type PaymentMethod = (typeof PAYMENT_METHODS)[number]

export type BookingRequest = {
  slug: string
  locale: (typeof LOCALES)[number]
  paymentMethod: PaymentMethod
  participants: ParticipantInput[]
  billing: BillingInput
  termsAccepted: true
  tosAccepted: true
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

function optionalString(v: unknown): string {
  return typeof v === 'string' ? v.trim() : ''
}

function parseParticipant(raw: unknown, todayIso: string): ParticipantInput | null {
  if (typeof raw !== 'object' || raw === null) return null
  const p = raw as Record<string, unknown>
  for (const field of REQUIRED_PARTICIPANT_FIELDS) {
    if (!isNonEmptyString(p[field])) return null
  }
  if (!ISO_DATE.test(p.birthdate as string) || !ISO_DATE.test(p.idDocumentExpiry as string)) return null
  if ((p.birthdate as string) > todayIso) return null // not born yet
  if ((p.idDocumentExpiry as string) <= todayIso) return null // document already expired
  if (!EMAIL_RE.test(p.email as string)) return null
  if (!isValidPhone(p.phone as string) || !isValidPhone(p.emergencyContactPhone as string)) return null
  if (!TMP_KEY.test(p.idDocumentKey as string)) return null
  return {
    firstName: (p.firstName as string).trim(),
    lastName: (p.lastName as string).trim(),
    birthdate: p.birthdate as string,
    nationality: (p.nationality as string).trim(),
    email: (p.email as string).trim(),
    phone: normalizePhone(p.phone as string),
    companyName: (p.companyName as string).trim(),
    companyPosition: (p.companyPosition as string).trim(),
    idDocumentNumber: (p.idDocumentNumber as string).trim(),
    idDocumentExpiry: p.idDocumentExpiry as string,
    idDocumentKey: p.idDocumentKey as string,
    departureStation: (p.departureStation as string).trim(),
    dietaryRestrictions: optionalString(p.dietaryRestrictions),
    emergencyContactName: (p.emergencyContactName as string).trim(),
    emergencyContactPhone: normalizePhone(p.emergencyContactPhone as string),
  }
}

export function parseBookingRequest(body: unknown, now: Date = new Date()): BookingRequest | null {
  if (typeof body !== 'object' || body === null) return null
  const b = body as Record<string, unknown>
  if (!isNonEmptyString(b.slug)) return null
  if (!LOCALES.includes(b.locale as never)) return null
  if (!PAYMENT_METHODS.includes(b.paymentMethod as never)) return null
  if (b.termsAccepted !== true || b.tosAccepted !== true || b.privacyAccepted !== true) return null
  if (!Array.isArray(b.participants) || b.participants.length < 1 || b.participants.length > 20) return null
  const todayIso = now.toISOString().slice(0, 10)
  const participants: ParticipantInput[] = []
  for (const raw of b.participants) {
    const p = parseParticipant(raw, todayIso)
    if (!p) return null
    participants.push(p)
  }
  const billing = b.billing as Record<string, unknown> | null
  if (typeof billing !== 'object' || billing === null) return null
  if (!isNonEmptyString(billing.companyLegalName)) return null
  const country = optionalString(billing.country).toUpperCase()
  if (country && !COUNTRY_RE.test(country)) return null
  return {
    slug: b.slug as string,
    locale: b.locale as BookingRequest['locale'],
    paymentMethod: b.paymentMethod as PaymentMethod,
    participants,
    billing: {
      companyLegalName: (billing.companyLegalName as string).trim(),
      addressLine1: optionalString(billing.addressLine1),
      postalCode: optionalString(billing.postalCode),
      city: optionalString(billing.city),
      country,
      vatNumber: optionalString(billing.vatNumber).toUpperCase().replace(/\s/g, ''),
    },
    termsAccepted: true,
    tosAccepted: true,
    privacyAccepted: true,
  }
}
