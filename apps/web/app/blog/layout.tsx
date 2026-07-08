import type { Metadata } from 'next'

const baseUrl = 'https://rusker-travel.com'

export const metadata: Metadata = {
  title: 'Blog - Actualités & Insights',
  description: 'Découvrez nos articles sur l\'écosystème startup de Barcelone, les tendances innovation et les conseils pour vos Learning Expeditions.',
  keywords: ['blog', 'Barcelona', 'startup news', 'innovation', 'Learning Expedition tips', 'travel insights'],
  openGraph: {
    title: 'Rusker Blog - Actualités & Insights',
    description: 'Découvrez nos articles sur l\'écosystème startup de Barcelone.',
    url: `${baseUrl}/blog`,
    images: [
      {
        url: `${baseUrl}/images/hero-barcelona-hd.jpg`,
        width: 1200,
        height: 630,
        alt: 'Rusker Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rusker Blog - Actualités & Insights',
    description: 'Découvrez nos articles sur l\'écosystème startup de Barcelone.',
    images: [`${baseUrl}/images/hero-barcelona-hd.jpg`],
  },
  alternates: {
    canonical: `${baseUrl}/blog`,
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

