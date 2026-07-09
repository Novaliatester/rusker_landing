import type Stripe from 'stripe'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { getStripe } from '@/lib/stripe'

export const metadata = { title: 'Rusker Expeditions' }

/** Pull the invoice PDF/hosted link and the card payment receipt from a paid session. */
function documentLinks(session: Stripe.Checkout.Session) {
  const invoice = typeof session.invoice === 'object' ? (session.invoice as Stripe.Invoice | null) : null
  const intent = typeof session.payment_intent === 'object' ? (session.payment_intent as Stripe.PaymentIntent | null) : null
  const charge = intent && typeof intent.latest_charge === 'object' ? (intent.latest_charge as Stripe.Charge | null) : null
  return {
    invoicePdf: invoice?.invoice_pdf ?? null,
    invoiceUrl: invoice?.hosted_invoice_url ?? null,
    receiptUrl: charge?.receipt_url ?? null,
  }
}

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
    session = await getStripe().checkout.sessions.retrieve(sessionId, {
      expand: ['invoice', 'payment_intent.latest_charge'],
    })
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
        <p className="mb-6 text-gray-700">
          {t('seatCount', { count: Number(session.metadata.quantity) })}
        </p>
      )}
      {(() => {
        const { invoicePdf, invoiceUrl, receiptUrl } = documentLinks(session)
        if (!invoicePdf && !invoiceUrl && !receiptUrl) return null
        return (
          <div className="mb-8 space-y-3">
            {(invoicePdf || invoiceUrl) && (
              <a
                href={(invoicePdf ?? invoiceUrl)!}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-button border border-rusker-blue px-6 py-3 font-semibold text-rusker-blue transition-colors hover:bg-rusker-blue hover:text-white"
              >
                {t('downloadInvoice')}
              </a>
            )}
            <div className="flex justify-center gap-4 text-sm">
              {invoiceUrl && (
                <a href={invoiceUrl} target="_blank" rel="noopener noreferrer" className="text-rusker-blue underline">
                  {t('viewInvoice')}
                </a>
              )}
              {receiptUrl && (
                <a href={receiptUrl} target="_blank" rel="noopener noreferrer" className="text-rusker-blue underline">
                  {t('paymentReceipt')}
                </a>
              )}
            </div>
            <p className="text-xs text-gray-400">{t('documentsEmailed')}</p>
          </div>
        )
      })()}
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
