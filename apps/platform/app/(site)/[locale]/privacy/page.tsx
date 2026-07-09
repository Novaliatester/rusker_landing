import { setRequestLocale } from 'next-intl/server'

export const metadata = { title: 'Politique de confidentialité — Rusker' }

const CONTENT = {
  fr: {
    title: 'Politique de confidentialité (RGPD)',
    draft: 'DOCUMENT PROVISOIRE — à faire valider par un conseil juridique avant toute vente réelle.',
    sections: [
      ['Responsable de traitement', 'Rusker Travel S.L., NIF B44897510, Barcelone, Espagne. Contact : bookings@rusker-travel.com.'],
      ['Données collectées', "Identité (nom, prénom, date de naissance, nationalité), coordonnées (email, téléphone), données professionnelles (entreprise, fonction), copie et numéro de pièce d'identité (passeport ou CNI) avec sa date d'expiration, gare de départ, restrictions alimentaires, contact d'urgence, et données de facturation (raison sociale, adresse, numéro de TVA)."],
      ['Finalités', "Organisation du voyage (réservation des billets de train, de l'hôtel et de la restauration), facturation, et respect des obligations légales et comptables."],
      ['Base légale', "Exécution du contrat (article 6.1.b du RGPD) pour l'organisation du voyage et la facturation ; obligation légale (article 6.1.c) pour la conservation comptable."],
      ['Destinataires', "L'équipe Rusker Travel (Adam et Tanguy) et les prestataires strictement nécessaires : transporteurs et hôtels pour les réservations, Stripe pour le paiement, Supabase pour l'hébergement des données, Resend pour l'envoi d'emails."],
      ['Hébergement', 'Les données sont hébergées par Supabase dans l\'Union européenne (région Paris).'],
      ['Durées de conservation', "Les copies de pièces d'identité sont supprimées automatiquement 30 jours après la fin de l'expédition, et immédiatement pour les réservations non finalisées. Les données de commande sont conservées pendant la durée des obligations comptables."],
      ['Vos droits', "Vous disposez de droits d'accès, de rectification, d'effacement, de limitation et de portabilité. Écrivez à bookings@rusker-travel.com."],
      ['Réclamation', "Vous pouvez saisir l'autorité de contrôle : AEPD (Espagne, aepd.es) ou CNIL (France, cnil.fr)."],
    ],
  },
  en: {
    title: 'Privacy Policy (GDPR)',
    draft: 'DRAFT DOCUMENT — must be reviewed by legal counsel before real sales.',
    sections: [
      ['Data controller', 'Rusker Travel S.L., NIF B44897510, Barcelona, Spain. Contact: bookings@rusker-travel.com.'],
      ['Data collected', 'Identity (name, date of birth, nationality), contact details (email, phone), professional data (company, position), copy and number of the ID document (passport or ID card) with its expiry date, departure station, dietary restrictions, emergency contact, and billing data (legal name, address, VAT number).'],
      ['Purposes', 'Organization of the trip (booking train tickets, hotel, and catering), invoicing, and compliance with legal and accounting obligations.'],
      ['Legal basis', 'Performance of the contract (article 6.1.b GDPR) for trip organization and invoicing; legal obligation (article 6.1.c) for accounting retention.'],
      ['Recipients', 'The Rusker Travel team (Adam and Tanguy) and strictly necessary processors: carriers and hotels for reservations, Stripe for payment, Supabase for data hosting, Resend for email delivery.'],
      ['Hosting', 'Data is hosted by Supabase in the European Union (Paris region).'],
      ['Retention', 'ID document copies are deleted automatically 30 days after the end of the expedition, and immediately for uncompleted bookings. Order data is kept for the duration of accounting obligations.'],
      ['Your rights', 'You have rights of access, rectification, erasure, restriction, and portability. Write to bookings@rusker-travel.com.'],
      ['Complaints', 'You may contact the supervisory authority: AEPD (Spain, aepd.es) or CNIL (France, cnil.fr).'],
    ],
  },
} as const

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
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
