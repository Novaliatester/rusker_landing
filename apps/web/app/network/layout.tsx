import type { Metadata } from 'next'

const baseUrl = 'https://rusker-travel.com'

export const metadata: Metadata = {
  title: 'Network - Networking Professionnel à Barcelone',
  description: 'Connectez-vous avec l\'écosystème startup et tech de Barcelone. Rencontres business, networking events et connexions stratégiques.',
  keywords: ['networking', 'Barcelona', 'startup ecosystem', 'business connections', 'professional network', 'tech community'],
  openGraph: {
    title: 'Rusker Network - Networking Professionnel à Barcelone',
    description: 'Connectez-vous avec l\'écosystème startup et tech de Barcelone.',
    url: `${baseUrl}/network`,
    images: [
      {
        url: `${baseUrl}/images/network-meeting.jpg`,
        width: 1200,
        height: 630,
        alt: 'Rusker Network - Networking Professionnel',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rusker Network - Networking Professionnel à Barcelone',
    description: 'Connectez-vous avec l\'écosystème startup et tech de Barcelone.',
    images: [`${baseUrl}/images/network-meeting.jpg`],
  },
  alternates: {
    canonical: `${baseUrl}/network`,
  },
}

export default function NetworkLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

