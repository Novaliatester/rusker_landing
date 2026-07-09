'use client'

import { useMemo, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { formatPrice } from '@/lib/format'
import { computeAmounts } from '@/lib/pricing'
import ParticipantFields, { EMPTY_PARTICIPANT, type ParticipantDraft } from '@/components/ParticipantFields'

type Props = {
  slug: string
  expeditionTitle: string
  unitHtCents: number
  currency: string
  vatRate: number
  stations: string[]
  maxSeats: number
}

const REQUIRED: (keyof ParticipantDraft)[] = [
  'firstName', 'lastName', 'birthdate', 'nationality', 'email', 'phone', 'companyName',
  'companyPosition', 'idDocumentNumber', 'idDocumentExpiry', 'departureStation',
  'emergencyContactName', 'emergencyContactPhone',
]

export default function BookingWizard({ slug, expeditionTitle, unitHtCents, currency, vatRate, stations, maxSeats }: Props) {
  const t = useTranslations('wizard')
  const locale = useLocale()
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [participants, setParticipants] = useState<ParticipantDraft[]>([{ ...EMPTY_PARTICIPANT }])
  const [billing, setBilling] = useState({ companyLegalName: '', billingAddress: '', vatNumber: '' })
  const [terms, setTerms] = useState(false)
  const [privacy, setPrivacy] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const amounts = useMemo(
    () => computeAmounts(unitHtCents, participants.length, vatRate),
    [unitHtCents, participants.length, vatRate]
  )

  const participantsComplete = participants.every(
    (p) => REQUIRED.every((f) => (p[f] as string).trim() !== '') && p.idDocumentKey !== null
  )
  const billingComplete = billing.companyLegalName.trim() !== '' && billing.billingAddress.trim() !== ''

  async function submit() {
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, locale, participants, billing, termsAccepted: terms, privacyAccepted: privacy }),
      })
      const data = await res.json()
      if (!res.ok || !data.url) {
        setError(data.error === 'not_enough_seats' ? t('notEnoughSeats') : (data.error ?? t('genericError')))
        setSubmitting(false)
        return
      }
      window.location.assign(data.url)
    } catch {
      setError(t('genericError'))
      setSubmitting(false)
    }
  }

  const stepChip = (n: 1 | 2 | 3, label: string) => (
    <span
      key={n}
      className={`rounded-full px-3 py-1 text-xs font-semibold ${step === n ? 'bg-rusker-blue text-white' : 'bg-white text-gray-500'}`}
    >
      {n} · {label}
    </span>
  )

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">{t('title', { expedition: expeditionTitle })}</h1>
      <div className="mb-8 flex gap-2">{stepChip(1, t('step1'))}{stepChip(2, t('step2'))}{stepChip(3, t('step3'))}</div>

      <div key={step} className="animate-page-enter">
      {step === 1 && (
        <div className="space-y-6">
          {participants.map((p, i) => (
            <ParticipantFields
              key={i}
              index={i}
              value={p}
              stations={stations}
              onChange={(next) => setParticipants(participants.map((prev, j) => (j === i ? next : prev)))}
              onRemove={participants.length > 1 ? () => setParticipants(participants.filter((_, j) => j !== i)) : null}
            />
          ))}
          <div className="flex items-center justify-between">
            {participants.length < maxSeats ? (
              <button
                type="button"
                onClick={() => setParticipants([...participants, { ...EMPTY_PARTICIPANT }])}
                className="rounded-button border border-neutral-mid px-4 py-2 text-sm hover:bg-white"
              >
                {t('addParticipant')}
              </button>
            ) : <span />}
            <button
              type="button"
              disabled={!participantsComplete}
              onClick={() => setStep(2)}
              className="rounded-button bg-rusker-blue px-6 py-3 font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:shadow-soft-hover active:scale-[0.98] disabled:opacity-40 disabled:hover:scale-100"
            >
              {t('next')}
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="max-w-xl space-y-4 rounded-card bg-white p-6 shadow-soft">
          <label className="block text-sm">
            <span className="mb-1 block font-medium">{t('companyLegalName')}</span>
            <input
              value={billing.companyLegalName}
              onChange={(e) => setBilling({ ...billing, companyLegalName: e.target.value })}
              className="w-full rounded-button border border-neutral-mid px-3 py-2"
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block font-medium">{t('billingAddress')}</span>
            <input
              value={billing.billingAddress}
              onChange={(e) => setBilling({ ...billing, billingAddress: e.target.value })}
              className="w-full rounded-button border border-neutral-mid px-3 py-2"
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block font-medium">{t('vatNumber')}</span>
            <input
              value={billing.vatNumber}
              onChange={(e) => setBilling({ ...billing, vatNumber: e.target.value })}
              className="w-full rounded-button border border-neutral-mid px-3 py-2"
            />
          </label>
          <div className="flex justify-between pt-2">
            <button type="button" onClick={() => setStep(1)} className="text-sm text-gray-500 hover:underline">
              {t('back')}
            </button>
            <button
              type="button"
              disabled={!billingComplete}
              onClick={() => setStep(3)}
              className="rounded-button bg-rusker-blue px-6 py-3 font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:shadow-soft-hover active:scale-[0.98] disabled:opacity-40 disabled:hover:scale-100"
            >
              {t('next')}
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="max-w-xl space-y-6">
          <div className="rounded-card bg-white p-6 shadow-soft">
            <h3 className="mb-3 text-lg font-semibold">{t('summary')}</h3>
            <ul className="mb-4 list-disc pl-5 text-sm text-gray-700">
              {participants.map((p, i) => (
                <li key={i}>{p.firstName} {p.lastName} — {p.departureStation}</li>
              ))}
            </ul>
            <dl className="space-y-1 text-sm">
              <div className="flex justify-between"><dt>{t('subtotal')}</dt><dd>{formatPrice(amounts.subtotalCents, currency)}</dd></div>
              <div className="flex justify-between"><dt>{t('vat')}</dt><dd>{formatPrice(amounts.taxCents, currency)}</dd></div>
              <div className="flex justify-between text-base font-bold"><dt>{t('total')}</dt><dd>{formatPrice(amounts.totalCents, currency)}</dd></div>
            </dl>
          </div>
          <div className="space-y-3 text-sm">
            <label className="flex items-start gap-2">
              <input type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)} className="mt-1" />
              <span>
                {t.rich('acceptTerms', {
                  link: (chunks) => (
                    <Link href="/terms" target="_blank" className="text-rusker-blue underline">{chunks}</Link>
                  ),
                })}
              </span>
            </label>
            <label className="flex items-start gap-2">
              <input type="checkbox" checked={privacy} onChange={(e) => setPrivacy(e.target.checked)} className="mt-1" />
              <span>
                {t.rich('acceptPrivacy', {
                  link: (chunks) => (
                    <Link href="/privacy" target="_blank" className="text-rusker-blue underline">{chunks}</Link>
                  ),
                })}
              </span>
            </label>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="flex justify-between">
            <button type="button" onClick={() => setStep(2)} className="text-sm text-gray-500 hover:underline">
              {t('back')}
            </button>
            <button
              type="button"
              disabled={!terms || !privacy || submitting}
              onClick={submit}
              className="rounded-button bg-rusker-blue px-8 py-3 font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:shadow-soft-hover active:scale-[0.98] disabled:opacity-40 disabled:hover:scale-100"
            >
              {submitting ? t('paying') : t('pay')}
            </button>
          </div>
        </div>
      )}
      </div>
    </div>
  )
}
