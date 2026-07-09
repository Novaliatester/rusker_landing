import { describe, it, expect } from 'vitest'
import { isAdminEmail } from '@/lib/admin'

const ALLOWLIST = 'adam@rusker-travel.com, tanguy@rusker-travel.com'

describe('isAdminEmail', () => {
  it('accepts allowlisted emails case-insensitively', () => {
    expect(isAdminEmail('adam@rusker-travel.com', ALLOWLIST)).toBe(true)
    expect(isAdminEmail('Tanguy@Rusker-Travel.com', ALLOWLIST)).toBe(true)
  })
  it('rejects everyone else, empty allowlists, and null emails', () => {
    expect(isAdminEmail('intruder@evil.com', ALLOWLIST)).toBe(false)
    expect(isAdminEmail('adam@rusker-travel.com', '')).toBe(false)
    expect(isAdminEmail(null, ALLOWLIST)).toBe(false)
  })
})
