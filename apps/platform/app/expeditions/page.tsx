import Link from 'next/link'
import { listActiveExpeditions } from '@/lib/expeditions'
import { formatPrice } from '@/lib/format'

export const dynamic = 'force-dynamic'

export const metadata = { title: 'Learning Expeditions — Rusker' }

export default async function ExpeditionsPage() {
  let expeditions
  try {
    expeditions = await listActiveExpeditions()
  } catch (err) {
    console.error(err)
    return (
      <p className="text-gray-600">
        We couldn&apos;t load the expeditions right now. Please try again in a moment.
      </p>
    )
  }

  if (expeditions.length === 0) {
    return <p className="text-gray-600">No expeditions are available right now — check back soon.</p>
  }

  return (
    <div>
      <h1 className="mb-2 text-4xl font-bold">Learning Expeditions</h1>
      <p className="mb-10 max-w-2xl text-gray-600">
        Immersive Barcelona experiences for schools and companies. Pick an expedition, choose your
        group size, and book online.
      </p>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {expeditions.map((expedition) => (
          <Link
            key={expedition.id}
            href={`/expeditions/${expedition.slug}`}
            className="block overflow-hidden rounded-card bg-white shadow-soft transition-shadow hover:shadow-soft-hover"
          >
            {expedition.image_url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={expedition.image_url}
                alt={expedition.title}
                className="h-44 w-full object-cover"
              />
            )}
            <div className="p-6">
              <h2 className="mb-2 text-xl font-semibold">{expedition.title}</h2>
              {expedition.description && (
                <p className="mb-4 line-clamp-3 text-sm text-gray-600">{expedition.description}</p>
              )}
              <p className="font-semibold text-rusker-blue">
                {formatPrice(expedition.price_per_person_cents, expedition.currency)}
                <span className="font-normal text-gray-500"> / person</span>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
