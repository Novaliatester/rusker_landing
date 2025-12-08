import type { Metadata } from 'next'

const baseUrl = 'https://rusker-travel.com'

export const metadata: Metadata = {
  title: 'Contact - Créez votre expérience sur mesure',
  description: 'Contactez Rusker pour organiser votre Learning Expedition, événement ou networking à Barcelone. Devis gratuit et personnalisé.',
  keywords: ['contact', 'devis', 'Learning Expedition', 'événement Barcelona', 'demande information'],
  openGraph: {
    title: 'Contact Rusker - Créez votre expérience sur mesure',
    description: 'Contactez Rusker pour organiser votre Learning Expedition à Barcelone.',
    url: `${baseUrl}/form`,
    images: [
      {
        url: `${baseUrl}/images/hero-barcelona-hd.jpg`,
        width: 1200,
        height: 630,
        alt: 'Contact Rusker',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Rusker - Créez votre expérience sur mesure',
    description: 'Contactez Rusker pour organiser votre Learning Expedition à Barcelone.',
    images: [`${baseUrl}/images/hero-barcelona-hd.jpg`],
  },
  alternates: {
    canonical: `${baseUrl}/form`,
  },
  robots: {
    index: false, // Form pages typically shouldn't be indexed
    follow: true,
  },
}

export default function FormLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

