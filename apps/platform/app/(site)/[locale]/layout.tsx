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
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
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
        <header className="sticky top-0 z-40 bg-white/95 shadow-soft backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
            <a href="https://rusker-travel.com" className="transition-opacity duration-300 hover:opacity-80">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/rusker-travel-logo.png" alt="Rusker Travel" className="h-10 w-auto md:h-12" />
            </a>
            <div className="flex items-center gap-6">
              <span className="hidden text-sm font-medium text-gray-500 sm:inline">{t('tagline')}</span>
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
