import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getExpeditionBySlug } from '@/lib/expeditions'
import BookingPanel from '@/components/BookingPanel'

export const dynamic = 'force-dynamic'

export default async function ExpeditionPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const expedition = await getExpeditionBySlug(slug)
  if (!expedition || !expedition.is_active) notFound()

  return (
    <div>
      <Link href="/expeditions" className="text-sm text-rusker-blue hover:underline">
        ← All expeditions
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
          <BookingPanel
            slug={expedition.slug}
            pricePerPersonCents={expedition.price_per_person_cents}
            currency={expedition.currency}
            min={expedition.min_participants}
            max={expedition.max_participants}
          />
        </div>
      </div>
    </div>
  )
}
