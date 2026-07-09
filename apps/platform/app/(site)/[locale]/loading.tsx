/** Instant feedback while server pages fetch from Supabase. */
export default function Loading() {
  return (
    <div className="animate-fade-in">
      <div className="skeleton mb-3 h-8 w-72" />
      <div className="skeleton mb-10 h-4 w-96 max-w-full" />
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div className="skeleton h-72" />
        <div className="skeleton h-72" />
        <div className="skeleton hidden h-72 lg:block" />
      </div>
    </div>
  )
}
