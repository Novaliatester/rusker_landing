'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { EMAIL_RE, isValidPhone, type ParticipantInput } from '@/lib/booking'

/** emailConfirm is client-side only — stripped before the API call. */
export type ParticipantDraft = Omit<ParticipantInput, 'idDocumentKey'> & {
  idDocumentKey: string | null
  emailConfirm: string
}

export const EMPTY_PARTICIPANT: ParticipantDraft = {
  firstName: '', lastName: '', birthdate: '', nationality: '', email: '', emailConfirm: '', phone: '',
  companyName: '', companyPosition: '', idDocumentNumber: '', idDocumentExpiry: '',
  idDocumentKey: null, departureStation: '', dietaryRestrictions: '',
  emergencyContactName: '', emergencyContactPhone: '',
}

type ErrorKey =
  | 'required' | 'invalidEmail' | 'emailMismatch' | 'invalidPhone'
  | 'invalidBirthdate' | 'expiredDocument' | 'missingUpload'

const REQUIRED: (keyof ParticipantDraft)[] = [
  'firstName', 'lastName', 'birthdate', 'nationality', 'email', 'emailConfirm', 'phone', 'companyName',
  'companyPosition', 'idDocumentNumber', 'idDocumentExpiry', 'departureStation',
  'emergencyContactName', 'emergencyContactPhone',
]

function todayIso(): string {
  return new Date().toISOString().slice(0, 10)
}

/** Field-level error, or null. Mirrors the server-side rules in lib/booking.ts. */
export function participantFieldError(p: ParticipantDraft, field: keyof ParticipantDraft): ErrorKey | null {
  const value = field === 'idDocumentKey' ? p.idDocumentKey : (p[field] as string)
  if (field === 'idDocumentKey') return p.idDocumentKey ? null : 'missingUpload'
  if (REQUIRED.includes(field) && (!value || (value as string).trim() === '')) return 'required'
  if (!value) return null
  switch (field) {
    case 'email':
      return EMAIL_RE.test(value as string) ? null : 'invalidEmail'
    case 'emailConfirm':
      return (value as string).trim().toLowerCase() === p.email.trim().toLowerCase() ? null : 'emailMismatch'
    case 'phone':
    case 'emergencyContactPhone':
      return isValidPhone(value as string) ? null : 'invalidPhone'
    case 'birthdate':
      return (value as string) <= todayIso() ? null : 'invalidBirthdate'
    case 'idDocumentExpiry':
      return (value as string) > todayIso() ? null : 'expiredDocument'
    default:
      return null
  }
}

export function isParticipantValid(p: ParticipantDraft): boolean {
  const fields: (keyof ParticipantDraft)[] = [...REQUIRED, 'idDocumentKey']
  return fields.every((f) => participantFieldError(p, f) === null)
}

type Props = {
  index: number
  value: ParticipantDraft
  stations: string[]
  showErrors: boolean
  onChange: (value: ParticipantDraft) => void
  onRemove: (() => void) | null
}

export default function ParticipantFields({ index, value, stations, showErrors, onChange, onRemove }: Props) {
  const t = useTranslations('wizard')
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)

  const set = (field: keyof ParticipantDraft) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    onChange({ ...value, [field]: e.target.value })

  async function upload(file: File) {
    setUploading(true)
    setUploadError(null)
    try {
      const form = new FormData()
      form.append('file', file)
      const res = await fetch('/api/bookings/upload', { method: 'POST', body: form })
      const data = await res.json()
      if (!res.ok || !data.key) {
        setUploadError(data.error ?? t('uploadFailed'))
        return
      }
      setFileName(file.name)
      onChange({ ...value, idDocumentKey: data.key })
    } catch {
      setUploadError(t('uploadFailed'))
    } finally {
      setUploading(false)
    }
  }

  const errorFor = (name: keyof ParticipantDraft): string | null => {
    if (!showErrors) return null
    const key = participantFieldError(value, name)
    return key ? t(`errors.${key}`) : null
  }

  const field = (
    name: keyof ParticipantDraft,
    label: string,
    opts: { type?: string; placeholder?: string; hint?: string; min?: string; max?: string; optional?: boolean } = {}
  ) => {
    const error = errorFor(name)
    return (
      <label className="block text-sm">
        <span className="mb-1 block font-medium">
          {label}
          {opts.optional && <span className="ml-1 font-normal text-gray-400">({t('optional')})</span>}
        </span>
        <input
          type={opts.type ?? 'text'}
          value={(value[name] as string) ?? ''}
          onChange={set(name)}
          placeholder={opts.placeholder}
          min={opts.min}
          max={opts.max}
          className={`w-full rounded-button border px-3 py-2 ${error ? 'border-red-400 bg-red-50/40' : 'border-neutral-mid'}`}
        />
        {opts.hint && !error && <span className="mt-1 block text-xs text-gray-400">{opts.hint}</span>}
        {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
      </label>
    )
  }

  const stationError = errorFor('departureStation')
  const uploadMissing = showErrors && participantFieldError(value, 'idDocumentKey') !== null

  return (
    <div className="rounded-card bg-white p-6 shadow-soft">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">{t('participant', { number: index + 1 })}</h3>
        {onRemove && (
          <button type="button" onClick={onRemove} className="text-sm text-red-600 hover:underline">
            {t('removeParticipant')}
          </button>
        )}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {field('firstName', t('firstName'))}
        {field('lastName', t('lastName'))}
        {field('birthdate', t('birthdate'), { type: 'date', max: todayIso() })}
        {field('nationality', t('nationality'))}
        {field('email', t('email'), { type: 'email', placeholder: 'prenom.nom@entreprise.com' })}
        {field('emailConfirm', t('emailConfirm'), { type: 'email' })}
        {field('phone', t('phone'), { type: 'tel', placeholder: '+33 6 12 34 56 78', hint: t('phoneHint') })}
        {field('companyName', t('companyName'))}
        {field('companyPosition', t('companyPosition'))}
        {field('idDocumentNumber', t('idNumber'))}
        {field('idDocumentExpiry', t('idExpiry'), { type: 'date', min: todayIso() })}
        <label className="block text-sm">
          <span className="mb-1 block font-medium">{t('departureStation')}</span>
          <select
            value={value.departureStation}
            onChange={set('departureStation')}
            className={`w-full rounded-button border px-3 py-2 ${stationError ? 'border-red-400 bg-red-50/40' : 'border-neutral-mid'}`}
          >
            <option value="">{t('chooseStation')}</option>
            {stations.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {stationError && <span className="mt-1 block text-xs text-red-600">{stationError}</span>}
        </label>
        {field('dietaryRestrictions', t('dietary'), { optional: true })}
        {field('emergencyContactName', t('emergencyName'))}
        {field('emergencyContactPhone', t('emergencyPhone'), { type: 'tel', placeholder: '+33 6 98 76 54 32' })}
      </div>
      <div className="mt-4">
        <span className="mb-1 block text-sm font-medium">{t('idUpload')}</span>
        <input
          type="file"
          accept=".jpg,.jpeg,.png,.pdf"
          onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])}
          className="text-sm"
        />
        {uploading && <p className="mt-1 text-xs text-gray-500">…</p>}
        {value.idDocumentKey && !uploading && (
          <p className="mt-1 text-xs text-green-700">
            {t('idUploaded')}{fileName ? ` — ${fileName}` : ''}
          </p>
        )}
        {uploadError && <p className="mt-1 text-xs text-red-600">{uploadError}</p>}
        {uploadMissing && !uploadError && !value.idDocumentKey && (
          <p className="mt-1 text-xs text-red-600">{t('errors.missingUpload')}</p>
        )}
      </div>
    </div>
  )
}
