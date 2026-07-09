import { describe, it, expect } from 'vitest'
import { isAbandoned, isTransferOverdue, isStaleTmpUpload, retentionCutoff, tmpCutoff } from '@/lib/cleanup'

const NOW = '2026-07-09T10:00:00.000Z'

describe('isAbandoned', () => {
  it('is true for pending orders past their hold', () => {
    expect(isAbandoned({ status: 'pending', expires_at: '2026-07-09T09:59:00.000Z' }, NOW)).toBe(true)
  })
  it('is false for live pending holds, paid, and already-expired orders', () => {
    expect(isAbandoned({ status: 'pending', expires_at: '2026-07-09T10:01:00.000Z' }, NOW)).toBe(false)
    expect(isAbandoned({ status: 'paid', expires_at: null }, NOW)).toBe(false)
    expect(isAbandoned({ status: 'expired', expires_at: '2026-07-09T09:00:00.000Z' }, NOW)).toBe(false)
  })
})

describe('isTransferOverdue', () => {
  it('is true for awaiting_transfer orders past their due date', () => {
    expect(isTransferOverdue({ status: 'awaiting_transfer', expires_at: '2026-07-09T09:59:00.000Z' }, NOW)).toBe(true)
  })
  it('is false before the due date and for other statuses', () => {
    expect(isTransferOverdue({ status: 'awaiting_transfer', expires_at: '2026-07-09T10:01:00.000Z' }, NOW)).toBe(false)
    expect(isTransferOverdue({ status: 'pending', expires_at: '2026-07-09T09:00:00.000Z' }, NOW)).toBe(false)
    expect(isTransferOverdue({ status: 'paid', expires_at: null }, NOW)).toBe(false)
  })
})

describe('isStaleTmpUpload', () => {
  const cutoff = tmpCutoff(NOW) // 6h before now = 2026-07-09T04:00:00
  it('is true for uploads older than the cutoff', () => {
    expect(isStaleTmpUpload({ created_at: '2026-07-09T03:00:00.000Z' }, cutoff)).toBe(true)
  })
  it('is false for recent uploads and those without a timestamp', () => {
    expect(isStaleTmpUpload({ created_at: '2026-07-09T09:00:00.000Z' }, cutoff)).toBe(false)
    expect(isStaleTmpUpload({ created_at: null, updated_at: null }, cutoff)).toBe(false)
  })
})

describe('retentionCutoff', () => {
  it('returns the date 30 days before now (date-only)', () => {
    expect(retentionCutoff('2026-10-24T08:00:00.000Z')).toBe('2026-09-24')
  })
})
