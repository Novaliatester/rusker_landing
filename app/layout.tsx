import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Rusker Travel | Voyages à Barcelone',
  description: 'Learning Expeditions, événements et rencontres professionnelles au cœur de l\'écosystème le plus inspirant d\'Europe',
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

