'use client'

import { useState } from 'react'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [step, setStep] = useState<'email' | 'code'>('email')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function requestCode(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setBusy(true)
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
    setBusy(false)
    if (res.ok) setStep('code')
    else if (res.status === 429) setError('Too many attempts — wait a few minutes, then try again.')
    else setError('Could not send the code. Try again.')
  }

  async function verify(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setBusy(true)
    const res = await fetch('/api/admin/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, token: code.trim() }),
    })
    setBusy(false)
    if (res.ok) {
      window.location.assign('/admin')
    } else {
      setError('Invalid or expired code.')
    }
  }

  return (
    <div className="mx-auto mt-24 max-w-sm rounded-card bg-white p-8 shadow-soft">
      <h1 className="mb-6 text-2xl font-bold">Rusker Admin</h1>
      {step === 'email' ? (
        <form onSubmit={requestCode} className="space-y-4">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@rusker-travel.com"
            className="w-full rounded-button border border-neutral-mid px-3 py-2"
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-button bg-rusker-blue px-6 py-3 font-semibold text-white disabled:opacity-50"
          >
            {busy ? 'Sending…' : 'Send login code'}
          </button>
        </form>
      ) : (
        <form onSubmit={verify} className="space-y-4">
          <p className="text-sm text-gray-600">
            Enter the 6-digit code sent to <strong>{email}</strong>.
          </p>
          <input
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            required
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
            placeholder="123456"
            className="w-full rounded-button border border-neutral-mid px-3 py-2 text-center text-2xl tracking-[0.4em]"
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={busy || code.length !== 6}
            className="w-full rounded-button bg-rusker-blue px-6 py-3 font-semibold text-white disabled:opacity-50"
          >
            {busy ? 'Verifying…' : 'Sign in'}
          </button>
          <button
            type="button"
            onClick={() => { setStep('email'); setCode(''); setError(null) }}
            className="w-full text-sm text-gray-500 hover:underline"
          >
            Use a different email
          </button>
        </form>
      )}
    </div>
  )
}
