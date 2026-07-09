import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

export const metadata = { title: 'Rusker Expeditions' }

export default async function CancelledPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('cancelled')

  return (
    <div className="mx-auto max-w-xl text-center">
      <h1 className="mb-4 text-3xl font-bold">{t('title')}</h1>
      <p className="mb-8 text-gray-600">{t('body')}</p>
      <Link
        href="/expeditions"
        className="inline-block rounded-button bg-rusker-blue px-6 py-3 font-semibold text-white hover:opacity-90"
      >
        {t('back')}
      </Link>
    </div>
  )
}
