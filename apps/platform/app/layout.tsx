import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Rusker Expeditions',
  description: 'Book a Rusker learning expedition in Barcelona.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-bg-light text-text-dark antialiased`}>
        <header className="bg-white shadow-soft">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <a href="https://rusker-travel.com" className="text-xl font-bold tracking-wide text-rusker-blue">
              RUSKER
            </a>
            <span className="text-sm text-gray-500">Learning Expeditions</span>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-6 py-12">{children}</main>
        <footer className="mt-16 border-t border-neutral-mid/40 bg-white">
          <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-gray-500">
            © {new Date().getFullYear()} Rusker Travel ·{' '}
            <a href="https://rusker-travel.com" className="underline">rusker-travel.com</a>
          </div>
        </footer>
      </body>
    </html>
  )
}
