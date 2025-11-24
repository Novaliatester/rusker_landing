import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Rusker Travel | Voyages à Barcelone',
  description: 'Learning Expeditions, événements et rencontres professionnelles au cœur de l\'écosystème le plus inspirant d\'Europe',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}

