import { NextResponse } from 'next/server'
import { isRequestFromAdmin } from '@/lib/admin-guard'
import { getSupabase } from '@/lib/supabase'
import { markTransferPaidWith, getOrderWithDetails } from '@/lib/orders'
import { sendBuyerConfirmation, sendAdminNotification } from '@/lib/emails'

/** Admin-only: mark a bank-transfer order paid when the money lands outside Stripe. */
export async function POST(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isRequestFromAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const client = getSupabase()
  const orderId = await markTransferPaidWith(client, id)
  if (!orderId) {
    // Not an awaiting_transfer order (already paid, cancelled, or unknown).
    return NextResponse.redirect(new URL(`/admin/orders/${id}`, process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3001'))
  }

  const order = await getOrderWithDetails(orderId)
  if (order) {
    await Promise.allSettled([sendBuyerConfirmation(order, null), sendAdminNotification(order)])
  }
  return NextResponse.redirect(new URL(`/admin/orders/${id}`, process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3001'))
}
