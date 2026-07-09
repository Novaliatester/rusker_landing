'use client'

import { useMemo, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { formatPrice } from '@/lib/format'
import { computeAmounts } from '@/lib/pricing'
import { EU_VAT_RE } from '@/lib/booking'
import { BILLING_COUNTRIES, countryLabel } from '@/lib/countries'
import ParticipantFields, {
  EMPTY_PARTICIPANT,
  isParticipantValid,
  type ParticipantDraft,
} from '@/components/ParticipantFields'

type Props = {
  slug: string
  expeditionTitle: string
  unitHtCents: number
  currency: string
  vatRate: number
  stations: string[]
  maxSeats: number
}

const EMPTY_BILLING = { companyLegalName: '', addressLine1: '', postalCode: '', city: '', country: 'FR', vatNumber: '' }

const PRIMARY_BTN =
  'rounded-button bg-rusker-blue px-6 py-3 font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:shadow-soft-hover active:scale-[0.98]'

export default function BookingWizard({ slug, expeditionTitle, unitHtCents, currency, vatRate, stations, maxSeats }: Props) {
  const t = useTranslations('wizard')
  const locale = useLocale()
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [participants, setParticipants] = useState<ParticipantDraft[]>([{ ...EMPTY_PARTICIPANT }])
  const [billing, setBilling] = useState(EMPTY_BILLING)
  const [showErrors, setShowErrors] = useState(false)
  const [terms, setTerms] = useState(false)
  const [tos, setTos] = useState(false)
  const [privacy, setPrivacy] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const amounts = useMemo(
    () => computeAmounts(unitHtCents, participants.length, vatRate),
    [unitHtCents, participants.length, vatRate]
  )

  const participantsValid = participants.every(isParticipantValid)
  const billingValid = billing.companyLegalName.trim() !== ''
  const vatLooksOff = billing.vatNumber.trim() !== '' && !EU_VAT_RE.test(billing.vatNumber.toUpperCase().replace(/\s/g, ''))

  function goToStep2() {
    if (!participantsValid) {
      setShowErrors(true)
      return
    }
    setShowErrors(false)
    setStep(2)
  }

  function goToStep3() {
    if (!billingValid) {
      setShowErrors(true)
      return
    }
    setShowErrors(false)
    setStep(3)
  }

  async function submit() {
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug,
          locale,
          // emailConfirm is a client-side check only
          participants: participants.map(({ emailConfirm: _emailConfirm, ...p }) => p),
          billing,
          termsAccepted: terms,
          tosAccepted: tos,
          privacyAccepted: privacy,
        }),
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

  const billingField = (
    name: keyof typeof EMPTY_BILLING,
    label: string,
    opts: { optional?: boolean; placeholder?: string; hint?: string; error?: string | null } = {}
  ) => (
    <label className="block text-sm">
      <span className="mb-1 block font-medium">
        {label}
        {opts.optional && <span className="ml-1 font-normal text-gray-400">({t('optional')})</span>}
      </span>
      <input
        value={billing[name]}
        onChange={(e) => setBilling({ ...billing, [name]: e.target.value })}
        placeholder={opts.placeholder}
        className={`w-full rounded-button border px-3 py-2 ${opts.error ? 'border-red-400 bg-red-50/40' : 'border-neutral-mid'}`}
      />
      {opts.hint && !opts.error && <span className="mt-1 block text-xs text-gray-400">{opts.hint}</span>}
      {opts.error && <span className="mt-1 block text-xs text-red-600">{opts.error}</span>}
    </label>
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
              showErrors={showErrors}
              onChange={(next) => setParticipants(participants.map((prev, j) => (j === i ? next : prev)))}
              onRemove={participants.length > 1 ? () => setParticipants(participants.filter((_, j) => j !== i)) : null}
            />
          ))}
          {showErrors && !participantsValid && (
            <p className="rounded-card bg-red-50 p-3 text-sm font-medium text-red-700">{t('errors.fixAbove')}</p>
          )}
          <div className="flex items-center justify-between">
            {participants.length < maxSeats ? (
              <button
                type="button"
                onClick={() => setParticipants([...participants, { ...EMPTY_PARTICIPANT }])}
                className="rounded-button border border-neutral-mid px-4 py-2 text-sm transition-colors hover:bg-white"
              >
                {t('addParticipant')}
              </button>
            ) : <span />}
            <button type="button" onClick={goToStep2} className={PRIMARY_BTN}>
              {t('next')}
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="max-w-xl space-y-4 rounded-card bg-white p-6 shadow-soft">
          {billingField('companyLegalName', t('companyLegalName'), {
            error: showErrors && !billingValid ? t('errors.required') : null,
          })}
          <div>
            <p className="mb-2 mt-2 text-sm font-semibold">{t('billingAddressTitle')}</p>
            <p className="mb-3 text-xs text-gray-500">{t('billingAddressHint')}</p>
            <div className="space-y-3">
              {billingField('addressLine1', t('addressLine1'), { optional: true, placeholder: '12 rue de la République' })}
              <div className="grid grid-cols-[130px_1fr] gap-3">
                {billingField('postalCode', t('postalCode'), { optional: true, placeholder: '69001' })}
                {billingField('city', t('city'), { optional: true, placeholder: 'Lyon' })}
              </div>
              <label className="block text-sm">
                <span className="mb-1 block font-medium">
                  {t('country')} <span className="ml-1 font-normal text-gray-400">({t('optional')})</span>
                </span>
                <select
                  value={billing.country}
                  onChange={(e) => setBilling({ ...billing, country: e.target.value })}
                  className="w-full rounded-button border border-neutral-mid px-3 py-2"
                >
                  <option value="">—</option>
                  {BILLING_COUNTRIES.map((code) => (
                    <option key={code} value={code}>{countryLabel(code, locale)}</option>
                  ))}
                </select>
              </label>
            </div>
          </div>
          {billingField('vatNumber', t('vatNumber'), {
            optional: true,
            placeholder: 'FR12345678901',
            hint: t('vatHint'),
            error: vatLooksOff ? t('errors.vatFormat') : null,
          })}
          <div className="flex justify-between pt-2">
            <button type="button" onClick={() => { setShowErrors(false); setStep(1) }} className="text-sm text-gray-500 hover:underline">
              {t('back')}
            </button>
            <button type="button" onClick={goToStep3} className={PRIMARY_BTN}>
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
              <input type="checkbox" checked={tos} onChange={(e) => setTos(e.target.checked)} className="mt-1" />
              <span>
                {t.rich('acceptTos', {
                  link: (chunks) => (
                    <Link href="/terms-of-service" target="_blank" className="text-rusker-blue underline">{chunks}</Link>
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
              disabled={!terms || !tos || !privacy || submitting}
              onClick={submit}
              className={`${PRIMARY_BTN} px-8 disabled:opacity-40 disabled:hover:scale-100`}
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
