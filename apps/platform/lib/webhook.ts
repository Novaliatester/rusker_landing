import type Stripe from 'stripe'
import { getStripe } from '@/lib/stripe'
import {
  markOrderPaid as defaultMarkOrderPaid,
  getOrderWithDetails as defaultGetOrderWithDetails,
  type OrderWithDetails,
} from '@/lib/orders'
import {
  sendBuyerConfirmation as defaultSendBuyerConfirmation,
  sendAdminNotification as defaultSendAdminNotification,
} from '@/lib/emails'

export type WebhookDeps = {
  markOrderPaid: (sessionId: string, paymentIntentId: string | null) => Promise<string | null>
  getOrderWithDetails: (orderId: string) => Promise<OrderWithDetails | null>
  getInvoiceUrl: (invoiceId: string | null) => Promise<string | null>
  sendBuyerConfirmation: (order: OrderWithDetails, invoiceUrl: string | null) => Promise<void>
  sendAdminNotification: (order: OrderWithDetails) => Promise<void>
}

async function defaultGetInvoiceUrl(invoiceId: string | null): Promise<string | null> {
  if (!invoiceId) return null
  const invoice = await getStripe().invoices.retrieve(invoiceId)
  return invoice.hosted_invoice_url ?? null
}

const defaultDeps: WebhookDeps = {
  markOrderPaid: defaultMarkOrderPaid,
  getOrderWithDetails: defaultGetOrderWithDetails,
  getInvoiceUrl: defaultGetInvoiceUrl,
  sendBuyerConfirmation: defaultSendBuyerConfirmation,
  sendAdminNotification: defaultSendAdminNotification,
}

export async function handleCheckoutCompleted(
  session: Stripe.Checkout.Session,
  deps: WebhookDeps = defaultDeps
): Promise<void> {
  if (session.payment_status !== 'paid') return

  const paymentIntentId = typeof session.payment_intent === 'string' ? session.payment_intent : null
  const orderId = await deps.markOrderPaid(session.id, paymentIntentId)
  if (!orderId) return // duplicate delivery — already handled

  // Order is safely recorded; everything below is best-effort.
  try {
    const order = await deps.getOrderWithDetails(orderId)
    if (!order) throw new Error(`paid order ${orderId} not found for emails`)
    const invoiceUrl = await deps
      .getInvoiceUrl(typeof session.invoice === 'string' ? session.invoice : null)
      .catch((err) => {
        console.error('invoice url lookup failed', err)
        return null
      })
    const results = await Promise.allSettled([
      deps.sendBuyerConfirmation(order, invoiceUrl),
      deps.sendAdminNotification(order),
    ])
    for (const result of results) {
      if (result.status === 'rejected') console.error('post-payment email failed', result.reason)
    }
  } catch (err) {
    console.error('post-payment processing failed (order is paid)', err)
  }
}
