/**
 * Renders the plain-text expedition description with real typography:
 * blank-line-separated blocks; a block whose first line ends with ':' becomes
 * a section heading; lines starting with '•' become list items.
 */
export default function ExpeditionDescription({ text }: { text: string }) {
  const blocks = text.split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean)

  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        const lines = block.split('\n').map((l) => l.trim()).filter(Boolean)
        const heading = lines[0].endsWith(':') ? lines[0].replace(/\s*:$/, '') : null
        const rest = heading ? lines.slice(1) : lines
        const bullets = rest.filter((l) => l.startsWith('•'))
        const prose = rest.filter((l) => !l.startsWith('•'))

        return (
          <section key={i}>
            {heading && <h2 className="mb-3 text-xl font-semibold">{heading}</h2>}
            {prose.length > 0 && (
              <p className="leading-relaxed text-gray-700">{prose.join(' ')}</p>
            )}
            {bullets.length > 0 && (
              <ul className="mt-2 space-y-2">
                {bullets.map((line, j) => (
                  <li key={j} className="flex gap-3 leading-relaxed text-gray-700">
                    <span className="mt-1 h-2 w-2 flex-none rounded-full bg-rusker-blue" aria-hidden />
                    <span>{line.replace(/^•\s*/, '')}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )
      })}
    </div>
  )
}
