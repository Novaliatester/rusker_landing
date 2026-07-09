import { setRequestLocale } from 'next-intl/server'

export const metadata = { title: 'Conditions de vente — Rusker' }

const CONTENT = {
  fr: {
    title: 'Conditions générales de vente',
    draft: 'DOCUMENT PROVISOIRE — à faire valider par un conseil juridique avant toute vente réelle.',
    sections: [
      ['Vendeur', 'Rusker Travel S.L., NIF B44897510, Barcelone, Espagne.'],
      ['Objet', "Vente de places individuelles pour des « learning expeditions » : voyages professionnels organisés incluant transport, hébergement et programme."],
      ['Prix et paiement', "Les prix sont affichés hors taxes, majorés de la TVA espagnole de 21 %. Le paiement s'effectue en ligne par carte via Stripe. La réservation est confirmée à réception du paiement ; une facture est émise automatiquement."],
      ['Prestations', "Le contenu de chaque expédition (transport, hôtel, programme) est décrit sur la page de l'offre. Rusker Travel organise la logistique et contacte l'acheteur sous 2 jours ouvrés."],
      ['Annulation', "Conditions d'annulation et de remboursement à définir avec le conseil juridique. En l'absence de conditions publiées, contacter bookings@rusker-travel.com."],
      ["Documents d'identité", "La copie de pièce d'identité demandée sert exclusivement à la réservation des transports et de l'hébergement. Voir la politique de confidentialité."],
      ['Droit applicable', 'Droit espagnol. Tout litige relève des tribunaux de Barcelone.'],
    ],
  },
  en: {
    title: 'Terms of Sale',
    draft: 'DRAFT DOCUMENT — must be reviewed by legal counsel before real sales.',
    sections: [
      ['Seller', 'Rusker Travel S.L., NIF B44897510, Barcelona, Spain.'],
      ['Scope', 'Sale of individual seats on organized professional "learning expeditions" including transport, accommodation, and program.'],
      ['Prices and payment', 'Prices are shown excluding tax; Spanish VAT at 21% is added. Payment is made online by card via Stripe. The booking is confirmed on receipt of payment; an invoice is issued automatically.'],
      ['Services', "Each expedition's content (transport, hotel, program) is described on the offer page. Rusker Travel organizes logistics and contacts the buyer within 2 business days."],
      ['Cancellation', 'Cancellation and refund conditions to be defined with legal counsel. Absent published conditions, contact bookings@rusker-travel.com.'],
      ['Identity documents', 'The requested ID copy is used exclusively to book transport and accommodation. See the privacy policy.'],
      ['Governing law', 'Spanish law. Disputes fall under the courts of Barcelona.'],
    ],
  },
} as const

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const c = CONTENT[locale === 'en' ? 'en' : 'fr']
  return (
    <article className="mx-auto max-w-2xl">
      <h1 className="mb-2 text-3xl font-bold">{c.title}</h1>
      <p className="mb-8 rounded-card bg-amber-50 p-4 text-sm font-medium text-amber-800">{c.draft}</p>
      {c.sections.map(([heading, body]) => (
        <section key={heading} className="mb-6">
          <h2 className="mb-1 text-xl font-semibold">{heading}</h2>
          <p className="text-gray-700">{body}</p>
        </section>
      ))}
    </article>
  )
}
