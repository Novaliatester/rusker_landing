import type { Metadata, Viewport } from 'next'
import './globals.css'
import Navigation from '@/components/ui/Navigation'
import Providers from '@/components/ui/Providers'

const baseUrl = 'https://rusker-travel.com'
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Rusker | Explorez. Connectez. Transformez.',
    template: '%s | Rusker'
  },
  description: 'Learning Expeditions, événements et rencontres professionnelles au cœur de l\'écosystème le plus inspirant d\'Europe. Découvrez Barcelone avec Rusker.',
  keywords: ['Learning Expedition', 'Barcelona', 'Barcelone', 'événements professionnels', 'networking', 'travel', 'innovation', 'startup ecosystem', 'corporate events'],
  authors: [{ name: 'Rusker' }],
  creator: 'Rusker',
  publisher: 'Rusker',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: `${basePath}/favicon.ico`, sizes: 'any' },
      { url: `${basePath}/favicon-32x32.png`, sizes: '32x32', type: 'image/png' },
      { url: `${basePath}/favicon-192x192.png`, sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: `${basePath}/apple-touch-icon.png`, sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: `${basePath}/manifest.json`,
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    alternateLocale: ['en_US', 'es_ES'],
    url: baseUrl,
    siteName: 'Rusker',
    title: 'Rusker | Explorez. Connectez. Transformez.',
    description: 'Learning Expeditions, événements et rencontres professionnelles au cœur de l\'écosystème le plus inspirant d\'Europe.',
    images: [
      {
        url: `${baseUrl}/images/hero-barcelona-hd.jpg`,
        width: 1200,
        height: 630,
        alt: 'Rusker - Learning Expeditions à Barcelone',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rusker | Explorez. Connectez. Transformez.',
    description: 'Learning Expeditions, événements et rencontres professionnelles au cœur de l\'écosystème le plus inspirant d\'Europe.',
    images: [`${baseUrl}/images/hero-barcelona-hd.jpg`],
    creator: '@rusker_travel',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: baseUrl,
    languages: {
      'fr-FR': baseUrl,
      'en-US': `${baseUrl}?lang=en`,
      'es-ES': `${baseUrl}?lang=es`,
    },
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Rusker',
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0a0a0a',
}

// JSON-LD Structured Data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Rusker',
  description: 'Learning Expeditions, événements et rencontres professionnelles au cœur de l\'écosystème le plus inspirant d\'Europe.',
  url: baseUrl,
  logo: `${baseUrl}/images/2026 Rusker/Logos/Rusker.png`,
  sameAs: [
    'https://www.linkedin.com/company/rusker',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    availableLanguage: ['French', 'English', 'Spanish'],
  },
  areaServed: {
    '@type': 'City',
    name: 'Barcelona',
    '@id': 'https://www.wikidata.org/wiki/Q1492',
  },
  serviceType: ['Learning Expeditions', 'Corporate Events', 'Professional Networking', 'Business Travel'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="preload" href={`${basePath}/images/Barcelona Map Rusker.gif`} as="image" fetchPriority="high" />
        <link rel="preload" href={`${basePath}/images/logos/Logo 2025 (long) (white).png`} as="image" />
        <link rel="icon" href={`${basePath}/favicon.ico`} sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href={`${basePath}/favicon-32x32.png`} />
        <link rel="icon" type="image/png" sizes="192x192" href={`${basePath}/favicon-192x192.png`} />
        <link rel="apple-touch-icon" sizes="180x180" href={`${basePath}/apple-touch-icon.png`} />
        <link rel="manifest" href={`${basePath}/manifest.json`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Providers>
          <Navigation />
          {children}
        </Providers>
      </body>
    </html>
  )
}
