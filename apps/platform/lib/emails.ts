import { Resend } from 'resend'
import { formatPrice } from '@/lib/format'
import { regimeMention } from '@/lib/regime'
import type { OrderWithDetails } from '@/lib/orders'

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

const BUYER_COPY = {
  fr: {
    subject: (title: string) => `Votre réservation est confirmée : ${title}`,
    heading: 'Votre expédition est réservée !',
    hello: (name: string | null) => `Bonjour${name ? ` ${name}` : ''},`,
    body: (title: string, count: number) =>
      `Merci d'avoir réservé <strong>${title}</strong> pour <strong>${count} participant${count > 1 ? 's' : ''}</strong>.`,
    amounts: (total: string) => `Montant total : <strong>${total}</strong> (TVA comprise).`,
    invoice: 'Télécharger votre facture',
    next: "L'équipe Rusker vous contactera sous 2 jours ouvrés pour organiser la logistique (billets de train, hôtel, programme).",
    reply: 'Une question ? Répondez simplement à cet email.',
  },
  en: {
    subject: (title: string) => `Your booking is confirmed: ${title}`,
    heading: 'Your expedition is booked!',
    hello: (name: string | null) => `Hi${name ? ` ${name}` : ''},`,
    body: (title: string, count: number) =>
      `Thank you for booking <strong>${title}</strong> for <strong>${count} participant${count > 1 ? 's' : ''}</strong>.`,
    amounts: (total: string) => `Total amount: <strong>${total}</strong> (VAT included).`,
    invoice: 'Download your invoice',
    next: 'The Rusker team will contact you within 2 business days to organize logistics (train tickets, hotel, program).',
    reply: 'Questions? Just reply to this email.',
  },
} as const

export async function sendBuyerConfirmation(order: OrderWithDetails, invoiceUrl: string | null): Promise<void> {
  const copy = BUYER_COPY[order.locale === 'en' ? 'en' : 'fr']
  const total = formatPrice(order.amount_total_cents, order.currency)
  const participantRows = order.participants
    .map((p) => `<li>${p.first_name} ${p.last_name} — ${p.departure_station}</li>`)
    .join('')
  const { error } = await getResend().emails.send({
    from: FROM,
    to: order.buyer_email,
    subject: copy.subject(order.expedition.title),
    html: `
      <div style="font-family: Poppins, system-ui, sans-serif; color: #2f3433; max-width: 560px; margin: 0 auto;">
        <h1 style="color: #287497;">${copy.heading}</h1>
        <p>${copy.hello(order.buyer_name)}</p>
        <p>${copy.body(order.expedition.title, order.quantity)}</p>
        <ul>${participantRows}</ul>
        <p>${copy.amounts(total)}</p>
        ${invoiceUrl ? `<p><a href="${invoiceUrl}" style="color: #287497;">${copy.invoice}</a></p>` : ''}
        <p>${copy.next}</p>
        <p>${copy.reply}</p>
        <p style="margin-top: 24px; font-size: 12px; color: #8a908f;">${regimeMention(order.locale)}</p>
        <p style="margin-top: 16px;">— Rusker Travel · <a href="https://rusker-travel.com" style="color: #287497;">rusker-travel.com</a></p>
      </div>
    `,
  })
  if (error) throw new Error(`buyer confirmation email failed: ${error.message}`)
}

function formatDate(date: Date, locale: string): string {
  return date.toLocaleDateString(locale === 'en' ? 'en-GB' : 'fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })
}

const TRANSFER_COPY = {
  fr: {
    subject: (title: string) => `Votre facture pour ${title} — à régler sous 14 jours`,
    heading: 'Votre réservation est enregistrée',
    hello: (name: string | null) => `Bonjour${name ? ` ${name}` : ''},`,
    body: (title: string, count: number) =>
      `Nous avons bien enregistré votre réservation pour <strong>${title}</strong> (${count} participant${count > 1 ? 's' : ''}). Vos places sont réservées.`,
    due: (total: string, date: string) =>
      `Merci de régler la facture de <strong>${total}</strong> par virement <strong>avant le ${date}</strong>. Passé ce délai, la réservation sera automatiquement annulée et vos places libérées.`,
    invoice: 'Voir et payer la facture',
    reply: 'Une question ? Répondez simplement à cet email.',
  },
  en: {
    subject: (title: string) => `Your invoice for ${title} — due within 14 days`,
    heading: 'Your booking is registered',
    hello: (name: string | null) => `Hi${name ? ` ${name}` : ''},`,
    body: (title: string, count: number) =>
      `We've registered your booking for <strong>${title}</strong> (${count} participant${count > 1 ? 's' : ''}). Your seats are reserved.`,
    due: (total: string, date: string) =>
      `Please settle the <strong>${total}</strong> invoice by bank transfer <strong>before ${date}</strong>. After that the booking is cancelled automatically and your seats released.`,
    invoice: 'View and pay the invoice',
    reply: 'Questions? Just reply to this email.',
  },
} as const

/** Bank-transfer heads-up: booking held, invoice link, payment deadline. */
export async function sendTransferInstructions(
  order: OrderWithDetails,
  hostedInvoiceUrl: string | null,
  dueAt: Date
): Promise<void> {
  const copy = TRANSFER_COPY[order.locale === 'en' ? 'en' : 'fr']
  const total = formatPrice(order.amount_total_cents, order.currency)
  const { error } = await getResend().emails.send({
    from: FROM,
    to: order.buyer_email,
    subject: copy.subject(order.expedition.title),
    html: `
      <div style="font-family: Poppins, system-ui, sans-serif; color: #2f3433; max-width: 560px; margin: 0 auto;">
        <h1 style="color: #287497;">${copy.heading}</h1>
        <p>${copy.hello(order.buyer_name)}</p>
        <p>${copy.body(order.expedition.title, order.quantity)}</p>
        <p>${copy.due(total, formatDate(dueAt, order.locale))}</p>
        ${hostedInvoiceUrl ? `<p><a href="${hostedInvoiceUrl}" style="color: #287497;">${copy.invoice}</a></p>` : ''}
        <p>${copy.reply}</p>
        <p style="margin-top: 24px; font-size: 12px; color: #8a908f;">${regimeMention(order.locale)}</p>
        <p style="margin-top: 16px;">— Rusker Travel · <a href="https://rusker-travel.com" style="color: #287497;">rusker-travel.com</a></p>
      </div>
    `,
  })
  if (error) throw new Error(`transfer instructions email failed: ${error.message}`)
}

const CANCEL_COPY = {
  fr: {
    subject: (title: string) => `Réservation annulée — ${title}`,
    heading: 'Réservation annulée',
    hello: (name: string | null) => `Bonjour${name ? ` ${name}` : ''},`,
    body: (title: string) =>
      `Faute de paiement dans le délai imparti, votre réservation pour <strong>${title}</strong> a été annulée et vos places ont été libérées.`,
    again: 'Vous souhaitez toujours participer ? Répondez à cet email ou refaites une réservation, nous serons ravis de vous accueillir.',
  },
  en: {
    subject: (title: string) => `Booking cancelled — ${title}`,
    heading: 'Booking cancelled',
    hello: (name: string | null) => `Hi${name ? ` ${name}` : ''},`,
    body: (title: string) =>
      `As payment wasn't received in time, your booking for <strong>${title}</strong> has been cancelled and your seats released.`,
    again: 'Still want to join? Reply to this email or book again — we would be glad to have you.',
  },
} as const

/** Sent when an unpaid bank-transfer order is cancelled at its deadline. */
export async function sendCancellationNotice(order: OrderWithDetails): Promise<void> {
  const copy = CANCEL_COPY[order.locale === 'en' ? 'en' : 'fr']
  const { error } = await getResend().emails.send({
    from: FROM,
    to: order.buyer_email,
    subject: copy.subject(order.expedition.title),
    html: `
      <div style="font-family: Poppins, system-ui, sans-serif; color: #2f3433; max-width: 560px; margin: 0 auto;">
        <h1 style="color: #287497;">${copy.heading}</h1>
        <p>${copy.hello(order.buyer_name)}</p>
        <p>${copy.body(order.expedition.title)}</p>
        <p>${copy.again}</p>
        <p style="margin-top: 24px;">— Rusker Travel · <a href="https://rusker-travel.com" style="color: #287497;">rusker-travel.com</a></p>
      </div>
    `,
  })
  if (error) throw new Error(`cancellation notice email failed: ${error.message}`)
}

export async function sendAdminNotification(order: OrderWithDetails): Promise<void> {
  const to = (process.env.ADMIN_NOTIFICATION_EMAILS ?? '')
    .split(',')
    .map((email) => email.trim())
    .filter(Boolean)
  if (to.length === 0) throw new Error('ADMIN_NOTIFICATION_EMAILS is not set')
  const total = formatPrice(order.amount_total_cents, order.currency)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3001'
  const participantRows = order.participants
    .map((p) => `<li>${p.first_name} ${p.last_name} — ${p.email} — départ ${p.departure_station}</li>`)
    .join('')
  const { error } = await getResend().emails.send({
    from: FROM,
    to,
    subject: `Nouvelle réservation : ${order.expedition.title} × ${order.quantity} (${total})`,
    html: `
      <div style="font-family: system-ui, sans-serif;">
        <h2>Nouvelle réservation</h2>
        <ul>
          <li><strong>Expédition :</strong> ${order.expedition.title} (${order.expedition.starts_on} → ${order.expedition.ends_on})</li>
          <li><strong>Participants :</strong> ${order.quantity}</li>
          <li><strong>Total TTC :</strong> ${total}</li>
          <li><strong>Société :</strong> ${order.company_legal_name ?? '—'}</li>
          <li><strong>Acheteur :</strong> ${order.buyer_name ?? '—'} &lt;${order.buyer_email}&gt;</li>
        </ul>
        <ul>${participantRows}</ul>
        <p><a href="${siteUrl}/admin/orders/${order.id}">Voir la réservation dans l'admin</a></p>
      </div>
    `,
  })
  if (error) throw new Error(`admin notification email failed: ${error.message}`)
}
