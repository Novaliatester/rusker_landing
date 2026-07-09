import { setRequestLocale } from 'next-intl/server'
import LegalDocument from '@/components/LegalDocument'
import { CGV } from '@/lib/legal/cgv'

export const metadata = { title: 'Conditions générales de vente — Rusker Travel' }

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  return <LegalDocument doc={CGV[locale === 'en' ? 'en' : 'fr']} />
}
