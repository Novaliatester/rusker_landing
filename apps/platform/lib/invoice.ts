import type Stripe from 'stripe'
import { regimeMention } from '@/lib/regime'

/** Bank-transfer orders are invoiced with this payment window. */
export const TRANSFER_DUE_DAYS = 14

export type IssuedInvoice = { invoiceId: string; hostedUrl: string | null }

/**
 * Issue a Stripe invoice for a bank-transfer order: draft → line item → send.
 * collection_method 'send_invoice' with a 14-day due date. Stripe emails the hosted
 * invoice (reliable even before Resend is configured); Rusker's own branded email is
 * a complementary heads-up. Returns the hosted URL for that email's "view/pay" link.
 */
export async function issueTransferInvoice(
  stripe: Stripe,
  params: {
    customerId: string
    currency: string
    unitAmount: number
    quantity: number
    description: string
    locale: string
    orderId: string
    expeditionId: string
  }
): Promise<IssuedInvoice> {
  const invoice = await stripe.invoices.create({
    customer: params.customerId,
    collection_method: 'send_invoice',
    days_until_due: TRANSFER_DUE_DAYS,
    currency: params.currency,
    auto_advance: false,
    footer: regimeMention(params.locale),
    metadata: { order_id: params.orderId, expedition_id: params.expeditionId },
  })
  if (!invoice.id) throw new Error('Stripe did not return an invoice id')

  await stripe.invoiceItems.create({
    customer: params.customerId,
    invoice: invoice.id,
    currency: params.currency,
    quantity: params.quantity,
    unit_amount_decimal: String(params.unitAmount),
    description: params.description,
  })

  const sent = await stripe.invoices.sendInvoice(invoice.id)
  return { invoiceId: invoice.id, hostedUrl: sent.hosted_invoice_url ?? null }
}

/** Void an unpaid invoice when its deadline passes. Best-effort: already-paid/void is fine. */
export async function voidInvoice(stripe: Stripe, invoiceId: string): Promise<void> {
  await stripe.invoices.voidInvoice(invoiceId).catch((err) => {
    console.error(`voiding invoice ${invoiceId} failed`, err)
  })
}
