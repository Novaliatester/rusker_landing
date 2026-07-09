import { setRequestLocale } from 'next-intl/server'

export const metadata = { title: 'Conditions de service — Rusker' }

const CONTENT = {
  fr: {
    title: 'Conditions de service',
    draft: "DOCUMENT PROVISOIRE — le texte définitif sera fourni par Rusker et validé par un conseil juridique avant toute vente réelle.",
    body: "Les présentes conditions de service encadrent l'utilisation de la plateforme de réservation app.rusker-travel.com et le déroulement des learning expeditions organisées par Rusker Travel S.L. (NIF B44897510, Barcelone). Le texte complet sera publié ici ; il couvrira notamment le déroulement du programme, les obligations des participants, les règles de conduite pendant l'expédition et les responsabilités respectives des parties.",
  },
  en: {
    title: 'Terms of Service',
    draft: 'DRAFT DOCUMENT — the final text will be provided by Rusker and reviewed by legal counsel before real sales.',
    body: 'These terms of service govern the use of the booking platform app.rusker-travel.com and the conduct of learning expeditions organized by Rusker Travel S.L. (NIF B44897510, Barcelona). The full text will be published here; it will notably cover the program itinerary, participant obligations, rules of conduct during the expedition, and the respective responsibilities of the parties.',
  },
} as const

export default async function TermsOfServicePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const c = CONTENT[locale === 'en' ? 'en' : 'fr']
  return (
    <article className="mx-auto max-w-2xl">
      <h1 className="mb-2 text-3xl font-bold">{c.title}</h1>
      <p className="mb-8 rounded-card bg-amber-50 p-4 text-sm font-medium text-amber-800">{c.draft}</p>
      <p className="leading-relaxed text-gray-700">{c.body}</p>
    </article>
  )
}
