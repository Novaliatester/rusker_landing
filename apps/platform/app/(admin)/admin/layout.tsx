import '../../globals.css'

export const metadata = {
  title: 'Rusker Admin',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-bg-light font-sans text-text-dark antialiased">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <div className="mb-8 flex items-center justify-between border-b border-neutral-mid/40 pb-4">
            <a href="/admin" className="font-bold text-rusker-blue">Rusker Admin</a>
            <form action="/api/admin/logout" method="post">
              <button type="submit" className="text-sm text-gray-500 hover:underline">Sign out</button>
            </form>
          </div>
          {children}
        </div>
      </body>
    </html>
  )
}
