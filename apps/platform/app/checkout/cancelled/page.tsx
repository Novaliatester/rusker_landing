import Link from 'next/link'

export const metadata = { title: 'Checkout cancelled — Rusker' }

export default function CancelledPage() {
  return (
    <div className="mx-auto max-w-xl text-center">
      <h1 className="mb-4 text-3xl font-bold">Checkout cancelled</h1>
      <p className="mb-8 text-gray-600">Nothing was charged. Your expedition is still waiting.</p>
      <Link
        href="/expeditions"
        className="inline-block rounded-button bg-rusker-blue px-6 py-3 font-semibold text-white hover:opacity-90"
      >
        Back to expeditions
      </Link>
    </div>
  )
}
