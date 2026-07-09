/** Booking-wizard fallback — title, step chips, and a participant form card. */
export default function Loading() {
  return (
    <div className="animate-fade-in">
      <div className="skeleton mb-6 h-9 w-80 max-w-full rounded-md" />
      <div className="mb-8 flex gap-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="skeleton h-7 w-28 rounded-full" />
        ))}
      </div>
      <div className="rounded-card bg-white p-6 shadow-soft">
        <div className="skeleton mb-4 h-5 w-40 rounded-md" />
        <div className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i}>
              <div className="skeleton mb-1 h-3 w-24 rounded-md" />
              <div className="skeleton h-10 w-full rounded-button" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
