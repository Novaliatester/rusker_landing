import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { listActiveExpeditions } from '@/lib/expeditions'
import { formatPrice } from '@/lib/format'
import SmartImage from '@/components/SmartImage'

export const dynamic = 'force-dynamic'

export const metadata = { title: 'Learning Expeditions — Rusker' }

export default async function ExpeditionsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('catalog')

  let expeditions
  try {
    expeditions = await listActiveExpeditions()
  } catch (err) {
    console.error(err)
    return <p className="text-gray-600">{t('loadError')}</p>
  }

  if (expeditions.length === 0) {
    return <p className="text-gray-600">{t('empty')}</p>
  }

  return (
    <div>
      <h1 className="mb-2 text-4xl font-bold">{t('title')}</h1>
      <p className="mb-10 max-w-2xl text-gray-600">{t('intro')}</p>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {expeditions.map((expedition) => (
          <Link
            key={expedition.id}
            href={`/expeditions/${expedition.slug}`}
            className="block overflow-hidden rounded-card bg-white shadow-soft transition-shadow hover:shadow-soft-hover"
          >
            {expedition.image_url && (
              <SmartImage src={expedition.image_url} alt={expedition.title} className="h-44 w-full" />
            )}
            <div className="p-6">
              <h2 className="mb-2 text-xl font-semibold">{expedition.title}</h2>
              {expedition.starts_on && expedition.ends_on && (
                <p className="mb-2 text-sm font-medium text-gray-700">
                  {t('dates', { start: expedition.starts_on, end: expedition.ends_on })}
                </p>
              )}
              {expedition.description && (
                <p className="mb-4 line-clamp-3 text-sm text-gray-600">{expedition.description}</p>
              )}
              <p className="font-semibold text-rusker-blue">
                {formatPrice(expedition.price_per_person_cents, expedition.currency)}
                <span className="font-normal text-gray-500"> {t('perPerson')}</span>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
