import { setRequestLocale } from 'next-intl/server'
import LegalDocument from '@/components/LegalDocument'
import { PRIVACY } from '@/lib/legal/privacy'

export const metadata = { title: 'Politique de confidentialité — Rusker Travel' }

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  return <LegalDocument doc={PRIVACY[locale === 'en' ? 'en' : 'fr']} />
}
