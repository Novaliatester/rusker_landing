import type Stripe from 'stripe'
import { getStripe } from '@/lib/stripe'
import {
  markOrderPaid as defaultMarkOrderPaid,
  markOrderAwaitingTransfer as defaultMarkOrderAwaitingTransfer,
  markPaymentFailed as defaultMarkPaymentFailed,
  getOrderWithDetails as defaultGetOrderWithDetails,
  type OrderWithDetails,
} from '@/lib/orders'
import {
  sendBuyerConfirmation as defaultSendBuyerConfirmation,
  sendAdminNotification as defaultSendAdminNotification,
} from '@/lib/emails'

export type WebhookDeps = {
  markOrderPaid: (sessionId: string, paymentIntentId: string | null, paymentMethod: string | null) => Promise<string | null>
  markOrderAwaitingTransfer: (sessionId: string) => Promise<string | null>
  markPaymentFailed: (sessionId: string) => Promise<string | null>
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
  markOrderAwaitingTransfer: defaultMarkOrderAwaitingTransfer,
  markPaymentFailed: defaultMarkPaymentFailed,
  getPaymentMethodType: defaultGetPaymentMethodType,
  getOrderWithDetails: defaultGetOrderWithDetails,
  getInvoiceUrl: defaultGetInvoiceUrl,
  sendBuyerConfirmation: defaultSendBuyerConfirmation,
  sendAdminNotification: defaultSendAdminNotification,
}

/** Shared paid path: transition, then best-effort emails (order stays paid if they fail). */
async function completePaidOrder(session: Stripe.Checkout.Session, deps: WebhookDeps): Promise<void> {
  const paymentIntentId = typeof session.payment_intent === 'string' ? session.payment_intent : null
  const paymentMethod = await deps.getPaymentMethodType(paymentIntentId).catch((err) => {
    console.error('payment method lookup failed', err)
    return null
  })
  const orderId = await deps.markOrderPaid(session.id, paymentIntentId, paymentMethod)
  if (!orderId) return // duplicate delivery — already handled

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

/** checkout.session.completed — paid (card) or unpaid (bank transfer: funds on the way). */
export async function handleCheckoutCompleted(
  session: Stripe.Checkout.Session,
  deps: WebhookDeps = defaultDeps
): Promise<void> {
  if (session.payment_status === 'paid') {
    await completePaidOrder(session, deps)
  } else if (session.payment_status === 'unpaid') {
    await deps.markOrderAwaitingTransfer(session.id)
  }
}

/** checkout.session.async_payment_succeeded — the transfer arrived. */
export async function handleAsyncPaymentSucceeded(
  session: Stripe.Checkout.Session,
  deps: WebhookDeps = defaultDeps
): Promise<void> {
  await completePaidOrder(session, deps)
}

/** checkout.session.async_payment_failed — flagged for manual handling. */
export async function handleAsyncPaymentFailed(
  session: Stripe.Checkout.Session,
  deps: WebhookDeps = defaultDeps
): Promise<void> {
  await deps.markPaymentFailed(session.id)
}
