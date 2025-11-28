import type { Metadata, Viewport } from 'next'
import './globals.css'

// For Vercel: No basePath needed (empty by default)
// For GitHub Pages: Set NEXT_PUBLIC_BASE_PATH='/rusker_landing' if needed
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

export const metadata: Metadata = {
  title: 'Rusker Travel | Voyages à Barcelone',
  description: 'Learning Expeditions, événements et rencontres professionnelles au cœur de l\'écosystème le plus inspirant d\'Europe',
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
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Rusker Travel',
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
      <head>
        <link rel="preload" href={`${basePath}/images/hero-video.mp4`} as="video" type="video/mp4" fetchPriority="high" />
        <link rel="preload" href={`${basePath}/images/logos/Logo 2025 (long) (white).png`} as="image" />
        <link rel="icon" href={`${basePath}/favicon.ico`} sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href={`${basePath}/favicon-32x32.png`} />
        <link rel="icon" type="image/png" sizes="192x192" href={`${basePath}/favicon-192x192.png`} />
        <link rel="apple-touch-icon" sizes="180x180" href={`${basePath}/apple-touch-icon.png`} />
      </head>
      <body>{children}</body>
    </html>
  )
}

