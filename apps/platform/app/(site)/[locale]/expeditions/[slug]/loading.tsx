/** Detail-page fallback — mirrors the 2-column layout (content + sticky booking card). */
export default function Loading() {
  return (
    <div className="animate-fade-in">
      <div className="skeleton mb-4 h-4 w-32 rounded-md" />
      <div className="mt-4 grid items-start gap-10 lg:grid-cols-[1fr_380px]">
        <div>
          <div className="skeleton mb-4 h-80 w-full rounded-card" />
          <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="skeleton h-36 rounded-card sm:h-40" />
            ))}
          </div>
          <div className="skeleton mb-6 h-9 w-2/3 rounded-md" />
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className={`skeleton h-3 rounded-md ${i % 3 === 2 ? 'w-4/6' : 'w-full'}`} />
            ))}
          </div>
        </div>
        <div className="lg:sticky lg:top-6">
          <div className="rounded-card bg-white p-6 shadow-soft">
            <div className="skeleton mb-2 h-4 w-40 rounded-md" />
            <div className="skeleton mb-1 h-6 w-32 rounded-md" />
            <div className="skeleton mb-4 h-3 w-full rounded-md" />
            <div className="skeleton mb-4 h-4 w-24 rounded-md" />
            <div className="skeleton h-12 w-full rounded-button" />
          </div>
        </div>
      </div>
    </div>
  )
}
