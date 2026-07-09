import { getAdminOverview } from '@/lib/admin-queries'
import { formatPrice } from '@/lib/format'

export const dynamic = 'force-dynamic'

const STATUS_STYLE: Record<string, string> = {
  paid: 'text-green-700',
  pending: 'text-amber-600',
  awaiting_transfer: 'text-blue-700 font-semibold',
  payment_failed: 'text-red-600 font-semibold',
  expired: 'text-gray-400',
}

export default async function AdminHome() {
  const expeditions = await getAdminOverview()
  return (
    <div className="space-y-10">
      {expeditions.map((expedition) => (
        <section key={expedition.id} className="rounded-card bg-white p-6 shadow-soft">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">
                {expedition.title}
                {!expedition.is_active && <span className="ml-2 text-sm font-normal text-gray-400">(inactive)</span>}
              </h2>
              <p className="text-sm text-gray-500">
                {expedition.starts_on} → {expedition.ends_on} · {expedition.taken}/{expedition.capacity ?? '∞'} seats ·
                revenue {formatPrice(expedition.revenueCents, 'eur')}
              </p>
            </div>
            <a
              href={`/admin/expeditions/${expedition.id}/export`}
              className="rounded-button border border-neutral-mid px-4 py-2 text-sm hover:bg-bg-light"
            >
              Export manifest (CSV)
            </a>
          </div>
          {expedition.orders.length === 0 ? (
            <p className="text-sm text-gray-400">No bookings yet.</p>
          ) : (
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-gray-500">
                  <th className="py-1">Date</th><th>Company</th><th>Buyer</th><th>Seats</th><th>Total</th><th>Method</th><th>Status</th><th />
                </tr>
              </thead>
              <tbody>
                {expedition.orders.map((order) => (
                  <tr key={order.id} className="border-t border-neutral-mid/30">
                    <td className="py-2">{new Date(order.created_at).toISOString().slice(0, 10)}</td>
                    <td>{order.company_legal_name ?? '—'}</td>
                    <td>{order.buyer_email}</td>
                    <td>{order.quantity}</td>
                    <td>{order.amount_total_cents ? formatPrice(order.amount_total_cents, order.currency) : '—'}</td>
                    <td>{order.payment_method ?? '—'}</td>
                    <td>
                      <span className={STATUS_STYLE[order.status] ?? 'text-gray-400'}>{order.status}</span>
                    </td>
                    <td><a href={`/admin/orders/${order.id}`} className="text-rusker-blue hover:underline">View</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      ))}
    </div>
  )
}
