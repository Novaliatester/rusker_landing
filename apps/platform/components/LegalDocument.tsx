/** Structured legal-document model shared by the terms and privacy pages. */
export type LegalBlock =
  | { type: 'p'; text: string; label?: string }
  | { type: 'list'; items: string[] }
  | { type: 'table'; head?: string[]; rows: string[][] }
  | { type: 'note'; text: string }

export type LegalSection = { heading?: string; blocks: LegalBlock[] }

export type LegalDoc = {
  title: string
  subtitle?: string
  version?: string
  intro?: LegalBlock[]
  sections: LegalSection[]
}

function Block({ block }: { block: LegalBlock }) {
  switch (block.type) {
    case 'p':
      return (
        <p className="mb-3 leading-relaxed text-gray-700">
          {block.label && <span className="font-semibold text-text-dark">{block.label} </span>}
          {block.text}
        </p>
      )
    case 'list':
      return (
        <ul className="mb-3 list-disc space-y-1 pl-6 text-gray-700">
          {block.items.map((item, i) => (
            <li key={i} className="leading-relaxed">{item}</li>
          ))}
        </ul>
      )
    case 'note':
      return <p className="mb-3 rounded-card bg-bg-light p-3 text-sm leading-relaxed text-gray-600">{block.text}</p>
    case 'table':
      return (
        <div className="mb-4 overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            {block.head && (
              <thead>
                <tr className="border-b border-neutral-mid">
                  {block.head.map((h, i) => (
                    <th key={i} className="py-2 pr-4 font-semibold text-text-dark">{h}</th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i} className="border-b border-neutral-mid/40 align-top">
                  {row.map((cell, j) => (
                    <td key={j} className="py-2 pr-4 text-gray-700">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
  }
}

export default function LegalDocument({ doc }: { doc: LegalDoc }) {
  return (
    <article className="mx-auto max-w-3xl">
      <h1 className="mb-1 text-3xl font-bold">{doc.title}</h1>
      {doc.subtitle && <p className="mb-1 text-gray-600">{doc.subtitle}</p>}
      {doc.version && <p className="mb-8 text-sm text-gray-400">{doc.version}</p>}
      {doc.intro && (
        <div className="mb-8">
          {doc.intro.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </div>
      )}
      {doc.sections.map((section, i) => (
        <section key={i} className="mb-8">
          {section.heading && <h2 className="mb-3 text-xl font-semibold">{section.heading}</h2>}
          {section.blocks.map((block, j) => (
            <Block key={j} block={block} />
          ))}
        </section>
      ))}
    </article>
  )
}
