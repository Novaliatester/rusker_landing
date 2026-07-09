import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { getExpeditionBySlug, getSeatsTaken } from '@/lib/expeditions'
import { computeAmounts } from '@/lib/pricing'
import { formatPrice } from '@/lib/format'

export const dynamic = 'force-dynamic'

export default async function ExpeditionPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const t = await getTranslations('detail')
  const tc = await getTranslations('catalog')
  const expedition = await getExpeditionBySlug(slug)
  if (!expedition || !expedition.is_active) notFound()

  const taken = await getSeatsTaken(expedition.id)
  const remaining = expedition.capacity === null ? null : Math.max(0, expedition.capacity - taken)
  const perSeat = computeAmounts(expedition.price_per_person_cents, 1, expedition.vat_rate)

  return (
    <div>
      <Link href="/expeditions" className="text-sm text-rusker-blue hover:underline">
        {t('back')}
      </Link>
      <div className="mt-4 grid gap-10 lg:grid-cols-[1fr_380px]">
        <div>
          {expedition.image_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={expedition.image_url}
              alt={expedition.title}
              className="mb-6 h-72 w-full rounded-card object-cover"
            />
          )}
          <h1 className="mb-4 text-4xl font-bold">{expedition.title}</h1>
          {expedition.description && (
            <p className="whitespace-pre-line leading-relaxed text-gray-700">
              {expedition.description}
            </p>
          )}
        </div>
        <div>
          <div className="rounded-card bg-white p-6 shadow-soft">
            {expedition.starts_on && expedition.ends_on && (
              <p className="mb-2 text-sm font-medium text-gray-700">
                {tc('dates', { start: expedition.starts_on, end: expedition.ends_on })}
              </p>
            )}
            <p className="mb-1 text-lg font-semibold text-rusker-blue">
              {t('priceHt', { price: formatPrice(expedition.price_per_person_cents, expedition.currency) })}
            </p>
            <p className="mb-4 text-xs text-gray-500">
              {t('vatNote', { total: formatPrice(perSeat.totalCents, expedition.currency) })}
            </p>
            {remaining !== null && (
              <p className={`mb-4 text-sm font-medium ${remaining === 0 ? 'text-red-600' : 'text-gray-700'}`}>
                {remaining === 0 ? tc('soldOut') : tc('seatsLeft', { count: remaining })}
              </p>
            )}
            {remaining !== 0 && (
              <Link
                href={`/expeditions/${expedition.slug}/book`}
                className="block w-full rounded-button bg-rusker-blue px-6 py-3 text-center font-semibold text-white hover:opacity-90"
              >
                {t('book')}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
