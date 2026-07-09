import { notFound } from 'next/navigation'
import { getAdminOrder, signedDocumentUrl } from '@/lib/admin-queries'
import { formatPrice } from '@/lib/format'

export const dynamic = 'force-dynamic'

type ParticipantRow = Record<string, string | null> & { id: string; id_document_path: string | null }

export default async function AdminOrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const order = await getAdminOrder(id)
  if (!order) notFound()

  const participants: ParticipantRow[] = order.participants ?? []
  const documents = await Promise.all(
    participants.map(async (p) => ({
      participantId: p.id,
      url: p.id_document_path ? await signedDocumentUrl(p.id_document_path) : null,
    }))
  )
  const urlFor = (participantId: string) => documents.find((d) => d.participantId === participantId)?.url ?? null

  return (
    <div className="space-y-8">
      <a href="/admin" className="text-sm text-rusker-blue hover:underline">← Back</a>
      <section className="rounded-card bg-white p-6 shadow-soft">
        <h1 className="mb-2 text-2xl font-bold">{order.expedition?.title}</h1>
        <dl className="grid gap-x-8 gap-y-1 text-sm sm:grid-cols-2">
          <div><dt className="inline font-medium">Status: </dt><dd className="inline">{order.status}</dd></div>
          <div><dt className="inline font-medium">Payment method: </dt><dd className="inline">{order.payment_method ?? '—'}</dd></div>
          <div><dt className="inline font-medium">Seats: </dt><dd className="inline">{order.quantity}</dd></div>
          <div><dt className="inline font-medium">Company: </dt><dd className="inline">{order.company_legal_name ?? '—'}</dd></div>
          <div><dt className="inline font-medium">VAT no.: </dt><dd className="inline">{order.vat_number ?? '—'}</dd></div>
          <div><dt className="inline font-medium">Billing address: </dt><dd className="inline">{order.billing_address ?? '—'}</dd></div>
          <div><dt className="inline font-medium">Buyer: </dt><dd className="inline">{order.buyer_name} &lt;{order.buyer_email}&gt;</dd></div>
          <div><dt className="inline font-medium">Subtotal HT: </dt><dd className="inline">{order.amount_subtotal_cents ? formatPrice(order.amount_subtotal_cents, order.currency) : '—'}</dd></div>
          <div><dt className="inline font-medium">VAT 21%: </dt><dd className="inline">{order.amount_tax_cents ? formatPrice(order.amount_tax_cents, order.currency) : '—'}</dd></div>
          <div><dt className="inline font-medium">Total TTC: </dt><dd className="inline">{formatPrice(order.amount_total_cents, order.currency)}</dd></div>
          <div><dt className="inline font-medium">Locale: </dt><dd className="inline">{order.locale}</dd></div>
          <div><dt className="inline font-medium">Terms accepted: </dt><dd className="inline">{order.terms_accepted_at ?? '—'}</dd></div>
          <div><dt className="inline font-medium">Privacy accepted: </dt><dd className="inline">{order.privacy_accepted_at ?? '—'} (IP {order.consent_ip ?? '—'})</dd></div>
          <div><dt className="inline font-medium">Stripe session: </dt><dd className="inline">{order.stripe_checkout_session_id ?? '—'}</dd></div>
          <div><dt className="inline font-medium">Payment intent: </dt><dd className="inline">{order.stripe_payment_intent_id ?? '—'}</dd></div>
        </dl>
        {(order.consents ?? []).length > 0 && (
          <div className="mt-4 border-t border-neutral-mid/30 pt-3">
            <h3 className="mb-2 text-sm font-semibold">Consent log</h3>
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-gray-500">
                  <th className="py-1">Document</th><th>Version</th><th>Accepted by</th><th>At</th><th>IP</th>
                </tr>
              </thead>
              <tbody>
                {order.consents.map((c: Record<string, string>) => (
                  <tr key={c.id} className="border-t border-neutral-mid/20">
                    <td className="py-1">{c.consent_type}</td>
                    <td>{c.document_version}</td>
                    <td>{c.identity_name} &lt;{c.identity_email}&gt;</td>
                    <td>{c.accepted_at}</td>
                    <td>{c.ip ?? '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
      {participants.map((p, i) => (
        <section key={p.id} className="rounded-card bg-white p-6 shadow-soft">
          <h2 className="mb-2 text-lg font-semibold">Participant {i + 1}: {p.first_name} {p.last_name}</h2>
          <dl className="grid gap-x-8 gap-y-1 text-sm sm:grid-cols-2">
            <div><dt className="inline font-medium">Birthdate: </dt><dd className="inline">{p.birthdate}</dd></div>
            <div><dt className="inline font-medium">Nationality: </dt><dd className="inline">{p.nationality}</dd></div>
            <div><dt className="inline font-medium">Email: </dt><dd className="inline">{p.email}</dd></div>
            <div><dt className="inline font-medium">Phone: </dt><dd className="inline">{p.phone}</dd></div>
            <div><dt className="inline font-medium">Company: </dt><dd className="inline">{p.company_name} — {p.company_position}</dd></div>
            <div><dt className="inline font-medium">ID number: </dt><dd className="inline">{p.id_document_number} (exp. {p.id_document_expiry})</dd></div>
            <div><dt className="inline font-medium">Departure: </dt><dd className="inline">{p.departure_station}</dd></div>
            <div><dt className="inline font-medium">Dietary: </dt><dd className="inline">{p.dietary_restrictions ?? '—'}</dd></div>
            <div><dt className="inline font-medium">Emergency: </dt><dd className="inline">{p.emergency_contact_name} ({p.emergency_contact_phone})</dd></div>
          </dl>
          {urlFor(p.id) ? (
            <a
              href={urlFor(p.id)!}
              target="_blank"
              className="mt-3 inline-block rounded-button border border-neutral-mid px-4 py-2 text-sm hover:bg-bg-light"
            >
              View ID document (10-min link)
            </a>
          ) : (
            <p className="mt-3 text-sm text-gray-400">ID document purged or missing</p>
          )}
        </section>
      ))}
    </div>
  )
}
