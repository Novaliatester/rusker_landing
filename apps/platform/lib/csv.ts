export type CsvParticipant = {
  first_name: string
  last_name: string
  birthdate: string
  nationality: string
  email: string
  phone: string
  company_name: string
  company_position: string
  id_document_number: string
  id_document_expiry: string
  departure_station: string
  dietary_restrictions: string | null
  emergency_contact_name: string
  emergency_contact_phone: string
}

const COLUMNS: (keyof CsvParticipant)[] = [
  'first_name', 'last_name', 'birthdate', 'nationality', 'email', 'phone', 'company_name',
  'company_position', 'id_document_number', 'id_document_expiry', 'departure_station',
  'dietary_restrictions', 'emergency_contact_name', 'emergency_contact_phone',
]

function cell(value: string | null): string {
  const v = value ?? ''
  return /[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v
}

export function participantsCsv(rows: CsvParticipant[]): string {
  const header = COLUMNS.join(',')
  const lines = rows.map((row) => COLUMNS.map((c) => cell(row[c])).join(','))
  return [header, ...lines].join('\n') + '\n'
}
