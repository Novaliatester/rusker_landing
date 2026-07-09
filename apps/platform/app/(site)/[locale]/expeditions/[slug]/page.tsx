import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { getExpeditionBySlug, getSeatsTaken } from '@/lib/expeditions'
import { formatPrice } from '@/lib/format'
import ExpeditionDescription from '@/components/ExpeditionDescription'
import ExpeditionGallery from '@/components/ExpeditionGallery'

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

  return (
    <div>
      <Link href="/expeditions" className="text-sm text-rusker-blue hover:underline">
        {t('back')}
      </Link>
      <div className="mt-4 grid items-start gap-10 lg:grid-cols-[1fr_380px]">
        <div>
          {expedition.image_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={expedition.image_url}
              alt={expedition.title}
              className="mb-4 h-80 w-full rounded-card object-cover"
            />
          )}
          <ExpeditionGallery heroUrl={expedition.image_url} />
          <h1 className="mb-6 text-4xl font-bold">{expedition.title}</h1>
          {expedition.description && <ExpeditionDescription text={expedition.description} />}
        </div>
        <div className="lg:sticky lg:top-6">
          <div className="rounded-card bg-white p-6 shadow-soft">
            {expedition.starts_on && expedition.ends_on && (
              <p className="mb-2 text-sm font-medium text-gray-700">
                {tc('dates', { start: expedition.starts_on, end: expedition.ends_on })}
              </p>
            )}
            <p className="mb-1 text-lg font-semibold text-rusker-blue">
              {t('price', { price: formatPrice(expedition.price_per_person_cents, expedition.currency) })}
            </p>
            <p className="mb-4 text-xs text-gray-500">{t('vatNote')}</p>
            {remaining !== null && (
              <p className={`mb-4 text-sm font-medium ${remaining === 0 ? 'text-red-600' : 'text-gray-700'}`}>
                {remaining === 0 ? tc('soldOut') : tc('seatsLeft', { count: remaining })}
              </p>
            )}
            {remaining !== 0 && (
              <Link
                href={`/expeditions/${expedition.slug}/book`}
                className="block w-full rounded-button bg-rusker-blue px-6 py-3 text-center font-semibold text-white shadow-soft transition-all duration-200 hover:scale-[1.02] hover:shadow-soft-hover active:scale-[0.98]"
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
