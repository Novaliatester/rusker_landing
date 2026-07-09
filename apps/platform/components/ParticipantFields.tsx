'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import type { ParticipantInput } from '@/lib/booking'

export type ParticipantDraft = Omit<ParticipantInput, 'idDocumentKey'> & { idDocumentKey: string | null }

export const EMPTY_PARTICIPANT: ParticipantDraft = {
  firstName: '', lastName: '', birthdate: '', nationality: '', email: '', phone: '',
  companyName: '', companyPosition: '', idDocumentNumber: '', idDocumentExpiry: '',
  idDocumentKey: null, departureStation: '', dietaryRestrictions: '',
  emergencyContactName: '', emergencyContactPhone: '',
}

type Props = {
  index: number
  value: ParticipantDraft
  stations: string[]
  onChange: (value: ParticipantDraft) => void
  onRemove: (() => void) | null
}

export default function ParticipantFields({ index, value, stations, onChange, onRemove }: Props) {
  const t = useTranslations('wizard')
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)

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
      onChange({ ...value, idDocumentKey: data.key })
    } catch {
      setUploadError(t('uploadFailed'))
    } finally {
      setUploading(false)
    }
  }

  const field = (name: keyof ParticipantDraft, label: string, type = 'text') => (
    <label className="block text-sm">
      <span className="mb-1 block font-medium">{label}</span>
      <input
        type={type}
        value={(value[name] as string) ?? ''}
        onChange={set(name)}
        className="w-full rounded-button border border-neutral-mid px-3 py-2"
      />
    </label>
  )

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
        {field('birthdate', t('birthdate'), 'date')}
        {field('nationality', t('nationality'))}
        {field('email', t('email'), 'email')}
        {field('phone', t('phone'), 'tel')}
        {field('companyName', t('companyName'))}
        {field('companyPosition', t('companyPosition'))}
        {field('idDocumentNumber', t('idNumber'))}
        {field('idDocumentExpiry', t('idExpiry'), 'date')}
        <label className="block text-sm">
          <span className="mb-1 block font-medium">{t('departureStation')}</span>
          <select
            value={value.departureStation}
            onChange={set('departureStation')}
            className="w-full rounded-button border border-neutral-mid px-3 py-2"
          >
            <option value="" />
            {stations.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </label>
        {field('dietaryRestrictions', t('dietary'))}
        {field('emergencyContactName', t('emergencyName'))}
        {field('emergencyContactPhone', t('emergencyPhone'), 'tel')}
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
        {value.idDocumentKey && !uploading && <p className="mt-1 text-xs text-green-700">{t('idUploaded')}</p>}
        {uploadError && <p className="mt-1 text-xs text-red-600">{uploadError}</p>}
      </div>
    </div>
  )
}
