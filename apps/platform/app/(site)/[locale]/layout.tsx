import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import LocaleSwitcher from '@/components/LocaleSwitcher'
import '../../globals.css'

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'], display: 'swap' })

export const metadata: Metadata = {
  title: 'Rusker Expeditions',
  description: 'Réservez une learning expedition Rusker à Barcelone.',
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)
  const t = await getTranslations('footer')

  return (
    <html lang={locale}>
      <body className={`${poppins.className} bg-bg-light text-text-dark antialiased`}>
        <NextIntlClientProvider>
        <header className="bg-white shadow-soft">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <a href="https://rusker-travel.com" className="text-xl font-bold tracking-wide text-rusker-blue">
              RUSKER
            </a>
            <div className="flex items-center gap-6">
              <span className="text-sm text-gray-500">{t('tagline')}</span>
              <LocaleSwitcher />
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-6 py-12">{children}</main>
        <footer className="mt-16 border-t border-neutral-mid/40 bg-white">
          <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-gray-500">
            © {new Date().getFullYear()} Rusker Travel ·{' '}
            <a href="https://rusker-travel.com" className="underline">rusker-travel.com</a>
          </div>
        </footer>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
