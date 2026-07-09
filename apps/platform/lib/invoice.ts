import type Stripe from 'stripe'
import { regimeMention } from '@/lib/regime'

/** Bank-transfer orders are invoiced with this payment window. */
export const TRANSFER_DUE_DAYS = 14

export type IssuedInvoice = { invoiceId: string; hostedUrl: string | null }

/**
 * Issue a Stripe invoice for a bank-transfer order: draft → line item → finalize.
 * collection_method 'send_invoice' with a 14-day due date. We FINALIZE (which mints
 * the hosted URL + PDF) rather than send, so Rusker's own branded email is the single
 * message the buyer receives; the hosted URL lets them view/pay the invoice.
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

  const finalized = await stripe.invoices.finalizeInvoice(invoice.id, { auto_advance: false })
  return { invoiceId: invoice.id, hostedUrl: finalized.hosted_invoice_url ?? null }
}

/** Void an unpaid invoice when its deadline passes. Best-effort: already-paid/void is fine. */
export async function voidInvoice(stripe: Stripe, invoiceId: string): Promise<void> {
  await stripe.invoices.voidInvoice(invoiceId).catch((err) => {
    console.error(`voiding invoice ${invoiceId} failed`, err)
  })
}
