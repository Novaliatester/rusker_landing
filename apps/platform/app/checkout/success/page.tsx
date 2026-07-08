import Link from 'next/link'
import { getStripe } from '@/lib/stripe'

export const metadata = { title: 'Booking confirmed — Rusker' }

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>
}) {
  const { session_id: sessionId } = await searchParams
  if (!sessionId) {
    return <Invalid />
  }

  let session
  try {
    session = await getStripe().checkout.sessions.retrieve(sessionId)
  } catch {
    return <Invalid />
  }

  if (session.payment_status !== 'paid') {
    return (
      <div className="mx-auto max-w-xl text-center">
        <h1 className="mb-4 text-3xl font-bold">Payment processing…</h1>
        <p className="text-gray-600">
          Your payment hasn&apos;t been confirmed yet. You&apos;ll receive a confirmation email as
          soon as it goes through — no need to pay again.
        </p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-xl text-center">
      <h1 className="mb-4 text-3xl font-bold text-rusker-blue">Your expedition is booked! 🎉</h1>
      <p className="mb-2 text-gray-700">
        Thank you{session.customer_details?.name ? `, ${session.customer_details.name}` : ''}. A
        confirmation has been sent to{' '}
        <strong>{session.customer_details?.email ?? 'your email address'}</strong>.
      </p>
      <p className="mb-8 text-gray-600">
        The Rusker team will contact you shortly to start organizing your learning expedition.
      </p>
      <Link
        href="/expeditions"
        className="inline-block rounded-button bg-rusker-blue px-6 py-3 font-semibold text-white hover:opacity-90"
      >
        Back to expeditions
      </Link>
    </div>
  )
}

function Invalid() {
  return (
    <div className="mx-auto max-w-xl text-center">
      <h1 className="mb-4 text-3xl font-bold">We couldn&apos;t find that payment</h1>
      <p className="text-gray-600">
        If you completed a payment, you&apos;ll still receive a confirmation email.{' '}
        <Link href="/expeditions" className="text-rusker-blue underline">
          Back to expeditions
        </Link>
      </p>
    </div>
  )
}
