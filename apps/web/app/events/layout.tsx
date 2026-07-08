import type { Metadata } from 'next'

const baseUrl = 'https://rusker-travel.com'

export const metadata: Metadata = {
  title: 'Events - Événements Corporate à Barcelone',
  description: 'Organisez vos événements corporate à Barcelone : séminaires, team buildings, conférences et soirées d\'entreprise dans des lieux exceptionnels.',
  keywords: ['événement corporate', 'Barcelona', 'séminaire', 'team building', 'conférence', 'soirée entreprise', 'MICE'],
  openGraph: {
    title: 'Rusker Events - Événements Corporate à Barcelone',
    description: 'Organisez vos événements corporate à Barcelone : séminaires, team buildings, conférences.',
    url: `${baseUrl}/events`,
    images: [
      {
        url: `${baseUrl}/images/events-hero.jpg`,
        width: 1200,
        height: 630,
        alt: 'Rusker Events - Événements Corporate',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rusker Events - Événements Corporate à Barcelone',
    description: 'Organisez vos événements corporate à Barcelone.',
    images: [`${baseUrl}/images/events-hero.jpg`],
  },
  alternates: {
    canonical: `${baseUrl}/events`,
  },
}

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

