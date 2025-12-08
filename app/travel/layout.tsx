import type { Metadata } from 'next'

const baseUrl = 'https://rusker-travel.com'

export const metadata: Metadata = {
  title: 'Travel - Learning Expeditions à Barcelone',
  description: 'Organisez des Learning Expeditions uniques à Barcelone. Découvrez l\'écosystème startup, tech et innovation avec des programmes sur mesure pour vos équipes.',
  keywords: ['Learning Expedition', 'Barcelona', 'voyage professionnel', 'team building', 'innovation trip', 'startup tour'],
  openGraph: {
    title: 'Rusker Travel - Learning Expeditions à Barcelone',
    description: 'Organisez des Learning Expeditions uniques à Barcelone. Découvrez l\'écosystème startup, tech et innovation.',
    url: `${baseUrl}/travel`,
    images: [
      {
        url: `${baseUrl}/images/travel-hero.jpg`,
        width: 1200,
        height: 630,
        alt: 'Rusker Travel - Learning Expeditions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rusker Travel - Learning Expeditions à Barcelone',
    description: 'Organisez des Learning Expeditions uniques à Barcelone.',
    images: [`${baseUrl}/images/travel-hero.jpg`],
  },
  alternates: {
    canonical: `${baseUrl}/travel`,
  },
}

export default function TravelLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

