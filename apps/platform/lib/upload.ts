import { randomUUID } from 'node:crypto'

export const ID_DOCUMENTS_BUCKET = 'id-documents'
const MAX_BYTES = 10_000_000
const ALLOWED: Record<string, string[]> = {
  jpg: ['image/jpeg'],
  jpeg: ['image/jpeg'],
  png: ['image/png'],
  pdf: ['application/pdf'],
}

function extensionOf(filename: string): string | null {
  const match = /\.([A-Za-z0-9]+)$/.exec(filename)
  return match ? match[1].toLowerCase() : null
}

/** Returns a user-facing error string, or null when the file is acceptable. */
export function validateIdUpload(filename: string, mime: string, sizeBytes: number): string | null {
  if (sizeBytes > MAX_BYTES) return 'File is too large (10 MB max)'
  const ext = extensionOf(filename)
  if (!ext || !(ext in ALLOWED)) return 'Only JPG, PNG, or PDF files are accepted'
  if (!ALLOWED[ext].includes(mime)) return 'File type does not match its extension'
  return null
}

export function tmpKeyFor(filename: string): string {
  return `tmp/${randomUUID()}.${extensionOf(filename)}`
}
