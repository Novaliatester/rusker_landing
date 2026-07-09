'use client'

import { useState } from 'react'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function send(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
    if (res.ok) setSent(true)
    else setError('Sign-in link could not be sent.')
  }

  return (
    <div className="mx-auto mt-24 max-w-sm rounded-card bg-white p-8 shadow-soft">
      <h1 className="mb-6 text-2xl font-bold">Rusker Admin</h1>
      {sent ? (
        <p className="text-gray-700">Check your inbox — the sign-in link is on its way.</p>
      ) : (
        <form onSubmit={send} className="space-y-4">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@rusker-travel.com"
            className="w-full rounded-button border border-neutral-mid px-3 py-2"
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button type="submit" className="w-full rounded-button bg-rusker-blue px-6 py-3 font-semibold text-white">
            Send magic link
          </button>
        </form>
      )}
    </div>
  )
}
