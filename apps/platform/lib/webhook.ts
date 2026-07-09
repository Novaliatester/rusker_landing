import type Stripe from 'stripe'
import { getStripe } from '@/lib/stripe'
import { getSupabase } from '@/lib/supabase'
import {
  markOrderPaid as defaultMarkOrderPaid,
  markInvoicePaid as defaultMarkInvoicePaid,
  getOrderWithDetails as defaultGetOrderWithDetails,
  type OrderWithDetails,
} from '@/lib/orders'
import { promoteDocuments as promoteDocumentsWith, discardOrder as discardOrderWith } from '@/lib/orders-create'
import {
  sendBuyerConfirmation as defaultSendBuyerConfirmation,
  sendAdminNotification as defaultSendAdminNotification,
} from '@/lib/emails'

export type WebhookDeps = {
  markOrderPaid: (sessionId: string, paymentIntentId: string | null, paymentMethod: string | null) => Promise<string | null>
  markInvoicePaid: (invoiceId: string, paymentIntentId: string | null) => Promise<string | null>
  promoteDocuments: (orderId: string) => Promise<void>
  discardOrder: (orderId: string) => Promise<void>
  getPaymentMethodType: (paymentIntentId: string | null) => Promise<string | null>
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

async function defaultGetPaymentMethodType(paymentIntentId: string | null): Promise<string | null> {
  if (!paymentIntentId) return null
  const intent = await getStripe().paymentIntents.retrieve(paymentIntentId, { expand: ['latest_charge'] })
  const charge = intent.latest_charge
  if (charge && typeof charge !== 'string') return charge.payment_method_details?.type ?? null
  return null
}

const defaultDeps: WebhookDeps = {
  markOrderPaid: defaultMarkOrderPaid,
  markInvoicePaid: defaultMarkInvoicePaid,
  promoteDocuments: (orderId) => promoteDocumentsWith(getSupabase(), orderId),
  discardOrder: (orderId) => discardOrderWith(getSupabase(), orderId),
  getPaymentMethodType: defaultGetPaymentMethodType,
  getOrderWithDetails: defaultGetOrderWithDetails,
  getInvoiceUrl: defaultGetInvoiceUrl,
  sendBuyerConfirmation: defaultSendBuyerConfirmation,
  sendAdminNotification: defaultSendAdminNotification,
}

/** After a successful payment: (optionally) promote ID scans, then best-effort emails. */
async function afterPaid(orderId: string, invoiceUrl: string | null, deps: WebhookDeps, promote: boolean): Promise<void> {
  if (promote) {
    await deps.promoteDocuments(orderId).catch((err) => console.error('document promotion failed (order is paid)', err))
  }
  try {
    const order = await deps.getOrderWithDetails(orderId)
    if (!order) throw new Error(`paid order ${orderId} not found for emails`)
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

/** checkout.session.completed — a card order was paid. Promote scans, then email. */
export async function handleCheckoutCompleted(
  session: Stripe.Checkout.Session,
  deps: WebhookDeps = defaultDeps
): Promise<void> {
  if (session.payment_status !== 'paid') return
  const paymentIntentId = typeof session.payment_intent === 'string' ? session.payment_intent : null
  const paymentMethod = await deps.getPaymentMethodType(paymentIntentId).catch((err) => {
    console.error('payment method lookup failed', err)
    return null
  })
  const orderId = await deps.markOrderPaid(session.id, paymentIntentId, paymentMethod)
  if (!orderId) return // duplicate delivery — already handled
  const invoiceUrl = await deps
    .getInvoiceUrl(typeof session.invoice === 'string' ? session.invoice : null)
    .catch((err) => {
      console.error('invoice url lookup failed', err)
      return null
    })
  await afterPaid(orderId, invoiceUrl, deps, true)
}

/** checkout.session.expired — an abandoned card order. Hard-delete it and its tmp uploads. */
export async function handleCheckoutExpired(
  session: Stripe.Checkout.Session,
  deps: WebhookDeps = defaultDeps
): Promise<void> {
  const orderId = typeof session.metadata?.order_id === 'string' ? session.metadata.order_id : null
  if (!orderId) return
  await deps.discardOrder(orderId)
}

/** invoice.paid — a bank-transfer order settled. Scans were promoted at creation. */
export async function handleInvoicePaid(invoice: Stripe.Invoice, deps: WebhookDeps = defaultDeps): Promise<void> {
  if (!invoice.id) return
  const orderId = await deps.markInvoicePaid(invoice.id, null)
  if (!orderId) return // duplicate delivery — already handled
  await afterPaid(orderId, invoice.hosted_invoice_url ?? null, deps, false)
}
