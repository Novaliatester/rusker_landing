import { notFound } from 'next/navigation'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { getExpeditionBySlug, getSeatsTaken } from '@/lib/expeditions'
import BookingWizard from '@/components/BookingWizard'

export const dynamic = 'force-dynamic'

export default async function BookPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const expedition = await getExpeditionBySlug(slug)
  if (!expedition || !expedition.is_active) notFound()

  const taken = await getSeatsTaken(expedition.id)
  const remaining = expedition.capacity === null ? 20 : Math.max(0, expedition.capacity - taken)
  if (remaining === 0) {
    const t = await getTranslations('catalog')
    return <p className="text-gray-600">{t('soldOut')}</p>
  }

  return (
    <BookingWizard
      slug={expedition.slug}
      expeditionTitle={expedition.title}
      unitPriceCents={expedition.price_per_person_cents}
      currency={expedition.currency}
      stations={expedition.departure_stations}
      maxSeats={remaining}
    />
  )
}
