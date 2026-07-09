import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { getStripe } from '@/lib/stripe'

export const metadata = { title: 'Rusker Expeditions' }

export default async function SuccessPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ session_id?: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('success')
  const { session_id: sessionId } = await searchParams
  if (!sessionId) return <Invalid />

  let session
  try {
    session = await getStripe().checkout.sessions.retrieve(sessionId)
  } catch {
    return <Invalid />
  }

  if (session.payment_status !== 'paid') {
    return (
      <div className="mx-auto max-w-xl text-center">
        <h1 className="mb-4 text-3xl font-bold">{t('processing')}</h1>
        <p className="text-gray-600">{t('processingBody')}</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-xl text-center">
      <h1 className="mb-4 text-3xl font-bold text-rusker-blue">{t('title')}</h1>
      <p className="mb-2 text-gray-700">
        {t('body', { email: session.customer_details?.email ?? '—' })}
      </p>
      {session.metadata?.quantity && (
        <p className="mb-8 text-gray-700">
          {t('seatCount', { count: Number(session.metadata.quantity) })}
        </p>
      )}
      <Link
        href="/expeditions"
        className="inline-block rounded-button bg-rusker-blue px-6 py-3 font-semibold text-white hover:opacity-90"
      >
        {t('backToCatalog')}
      </Link>
    </div>
  )
}

async function Invalid() {
  const t = await getTranslations('success')
  return (
    <div className="mx-auto max-w-xl text-center">
      <h1 className="mb-4 text-3xl font-bold">{t('invalid')}</h1>
      <p className="text-gray-600">
        {t('invalidBody')}{' '}
        <Link href="/expeditions" className="text-rusker-blue underline">
          {t('backToCatalog')}
        </Link>
      </p>
    </div>
  )
}
