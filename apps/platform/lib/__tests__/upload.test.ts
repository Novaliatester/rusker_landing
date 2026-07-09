import { describe, it, expect } from 'vitest'
import { validateIdUpload, tmpKeyFor } from '@/lib/upload'

describe('validateIdUpload', () => {
  it('accepts jpg, png, and pdf under 10MB', () => {
    expect(validateIdUpload('passport.jpg', 'image/jpeg', 5_000_000)).toBeNull()
    expect(validateIdUpload('id.PNG', 'image/png', 1000)).toBeNull()
    expect(validateIdUpload('scan.pdf', 'application/pdf', 9_999_999)).toBeNull()
  })

  it.each([
    ['oversized file', 'passport.jpg', 'image/jpeg', 10_000_001],
    ['wrong extension', 'malware.exe', 'application/octet-stream', 100],
    ['mime/extension mismatch', 'photo.jpg', 'application/pdf', 100],
    ['no extension', 'passport', 'image/jpeg', 100],
  ])('rejects %s', (_name, filename, mime, size) => {
    expect(validateIdUpload(filename, mime, size)).toBeTypeOf('string')
  })
})

describe('tmpKeyFor', () => {
  it('builds a tmp/ key with a uuid and the normalized extension', () => {
    const key = tmpKeyFor('Passport.JPEG')
    expect(key).toMatch(/^tmp\/[0-9a-f-]{36}\.jpeg$/)
  })
})
