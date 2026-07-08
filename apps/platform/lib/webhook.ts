import type Stripe from 'stripe'
import { insertOrder as defaultInsertOrder, type NewOrder } from '@/lib/orders'
import { getExpeditionById } from '@/lib/expeditions'
import {
  sendBuyerConfirmation as defaultSendBuyerConfirmation,
  sendTeamNotification as defaultSendTeamNotification,
} from '@/lib/emails'

export type WebhookDeps = {
  insertOrder: (order: NewOrder) => Promise<boolean>
  getExpeditionTitle: (id: string) => Promise<string>
  sendBuyerConfirmation: (order: NewOrder, expeditionTitle: string) => Promise<void>
  sendTeamNotification: (order: NewOrder, expeditionTitle: string) => Promise<void>
}

const defaultDeps: WebhookDeps = {
  insertOrder: defaultInsertOrder,
  getExpeditionTitle: async (id) => (await getExpeditionById(id))?.title ?? 'Learning Expedition',
  sendBuyerConfirmation: defaultSendBuyerConfirmation,
  sendTeamNotification: defaultSendTeamNotification,
}

export async function handleCheckoutCompleted(
  session: Stripe.Checkout.Session,
  deps: WebhookDeps = defaultDeps
): Promise<void> {
  if (session.payment_status !== 'paid') return

  const expeditionId = session.metadata?.expedition_id
  const quantity = Number(session.metadata?.quantity)
  if (!expeditionId || !Number.isInteger(quantity) || quantity < 1) {
    throw new Error(
      `checkout.session.completed is missing expedition metadata (session ${session.id})`
    )
  }

  const order: NewOrder = {
    expedition_id: expeditionId,
    quantity,
    buyer_email: session.customer_details?.email ?? '',
    buyer_name: session.customer_details?.name ?? null,
    amount_total_cents: session.amount_total ?? 0,
    currency: session.currency ?? 'eur',
    stripe_checkout_session_id: session.id,
    stripe_payment_intent_id:
      typeof session.payment_intent === 'string' ? session.payment_intent : null,
  }

  const inserted = await deps.insertOrder(order)
  if (!inserted) return // duplicate webhook delivery — emails were already sent

  // Best-effort from here: the order is stored; email failures are logged, never thrown.
  let title = 'Learning Expedition'
  try {
    title = await deps.getExpeditionTitle(expeditionId)
  } catch (err) {
    console.error('failed to fetch expedition title for emails', err)
  }
  const results = await Promise.allSettled([
    deps.sendBuyerConfirmation(order, title),
    deps.sendTeamNotification(order, title),
  ])
  for (const result of results) {
    if (result.status === 'rejected') {
      console.error('post-payment email failed', result.reason)
    }
  }
}
