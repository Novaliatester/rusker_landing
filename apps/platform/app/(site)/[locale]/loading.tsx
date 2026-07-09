/** Catalog fallback while the server fetches from Supabase. Mirrors the real card grid. */
function CardSkeleton() {
  return (
    <div className="overflow-hidden rounded-card bg-white shadow-soft">
      <div className="skeleton h-44 w-full" />
      <div className="space-y-3 p-6">
        <div className="skeleton h-5 w-3/4 rounded-md" />
        <div className="skeleton h-3 w-1/2 rounded-md" />
        <div className="skeleton h-3 w-full rounded-md" />
        <div className="skeleton h-3 w-5/6 rounded-md" />
        <div className="skeleton mt-2 h-5 w-1/3 rounded-md" />
      </div>
    </div>
  )
}

export default function Loading() {
  return (
    <div className="animate-fade-in">
      <div className="skeleton mb-3 h-9 w-72 rounded-md" />
      <div className="skeleton mb-10 h-4 w-96 max-w-full rounded-md" />
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <CardSkeleton />
        <CardSkeleton />
        <div className="hidden lg:block">
          <CardSkeleton />
        </div>
      </div>
    </div>
  )
}
