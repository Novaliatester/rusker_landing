import { Resend } from 'resend'
import { formatPrice } from '@/lib/format'
import type { NewOrder } from '@/lib/orders'

const FROM = 'Rusker Expeditions <bookings@rusker-travel.com>'

let resend: Resend | null = null
function getResend(): Resend {
  if (!resend) {
    const key = process.env.RESEND_API_KEY
    if (!key) throw new Error('RESEND_API_KEY is not set')
    resend = new Resend(key)
  }
  return resend
}

export async function sendBuyerConfirmation(order: NewOrder, expeditionTitle: string) {
  const total = formatPrice(order.amount_total_cents, order.currency)
  const { error } = await getResend().emails.send({
    from: FROM,
    to: order.buyer_email,
    subject: `Your Rusker expedition is booked: ${expeditionTitle}`,
    html: `
      <div style="font-family: Poppins, system-ui, sans-serif; color: #2f3433; max-width: 560px; margin: 0 auto;">
        <h1 style="color: #287497;">Your expedition is booked!</h1>
        <p>Hi${order.buyer_name ? ` ${order.buyer_name}` : ''},</p>
        <p>Thank you for booking <strong>${expeditionTitle}</strong> for
          <strong>${order.quantity} participants</strong> (total: <strong>${total}</strong>, VAT included).</p>
        <p><strong>What happens next?</strong><br/>
          The Rusker team will contact you within 2 business days to plan the program,
          dates, and logistics of your learning expedition.</p>
        <p>Questions in the meantime? Just reply to this email.</p>
        <p style="margin-top: 32px;">— The Rusker team<br/>
          <a href="https://rusker-travel.com" style="color: #287497;">rusker-travel.com</a></p>
      </div>
    `,
  })
  if (error) throw new Error(`buyer confirmation email failed: ${error.message}`)
}

export async function sendTeamNotification(order: NewOrder, expeditionTitle: string) {
  const to = process.env.TEAM_NOTIFICATION_EMAIL
  if (!to) throw new Error('TEAM_NOTIFICATION_EMAIL is not set')
  const total = formatPrice(order.amount_total_cents, order.currency)
  const { error } = await getResend().emails.send({
    from: FROM,
    to,
    subject: `New expedition sale: ${expeditionTitle} × ${order.quantity} (${total})`,
    html: `
      <div style="font-family: system-ui, sans-serif;">
        <h2>New expedition booking</h2>
        <ul>
          <li><strong>Expedition:</strong> ${expeditionTitle}</li>
          <li><strong>Participants:</strong> ${order.quantity}</li>
          <li><strong>Total paid:</strong> ${total} (VAT incl.)</li>
          <li><strong>Buyer:</strong> ${order.buyer_name ?? '—'} &lt;${order.buyer_email}&gt;</li>
          <li><strong>Stripe session:</strong> ${order.stripe_checkout_session_id}</li>
        </ul>
        <p>Reach out to the buyer to start organizing.</p>
      </div>
    `,
  })
  if (error) throw new Error(`team notification email failed: ${error.message}`)
}
