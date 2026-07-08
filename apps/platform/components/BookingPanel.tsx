'use client'

import { useState } from 'react'
import { formatPrice } from '@/lib/format'

type Props = {
  slug: string
  pricePerPersonCents: number
  currency: string
  min: number
  max: number | null
}

export default function BookingPanel({ slug, pricePerPersonCents, currency, min, max }: Props) {
  const [quantity, setQuantity] = useState(min)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const clamp = (q: number) => Math.max(min, max !== null ? Math.min(max, q) : q)

  async function checkout() {
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, quantity }),
      })
      const data = await res.json()
      if (!res.ok || !data.url) {
        setError(data.error ?? 'Something went wrong — please try again')
        setSubmitting(false)
        return
      }
      window.location.assign(data.url)
    } catch {
      setError('Something went wrong — please try again')
      setSubmitting(false)
    }
  }

  return (
    <div className="rounded-card bg-white p-6 shadow-soft">
      <p className="mb-4 text-lg font-semibold text-rusker-blue">
        {formatPrice(pricePerPersonCents, currency)}
        <span className="font-normal text-gray-500"> / person</span>
      </p>

      <label htmlFor="quantity" className="mb-1 block text-sm font-medium">
        Participants
      </label>
      <div className="mb-1 flex items-center gap-3">
        <button
          type="button"
          aria-label="Decrease participants"
          onClick={() => setQuantity((q) => clamp(q - 1))}
          className="h-10 w-10 rounded-button border border-neutral-mid text-lg hover:bg-bg-light"
        >
          −
        </button>
        <input
          id="quantity"
          type="number"
          value={quantity}
          min={min}
          max={max ?? undefined}
          onChange={(e) => {
            const value = Number(e.target.value)
            if (Number.isInteger(value)) setQuantity(clamp(value))
          }}
          className="h-10 w-20 rounded-button border border-neutral-mid text-center"
        />
        <button
          type="button"
          aria-label="Increase participants"
          onClick={() => setQuantity((q) => clamp(q + 1))}
          className="h-10 w-10 rounded-button border border-neutral-mid text-lg hover:bg-bg-light"
        >
          +
        </button>
      </div>
      <p className="mb-4 text-xs text-gray-500">
        {min > 1 ? `Minimum ${min}` : 'From 1'}
        {max !== null ? ` · maximum ${max}` : ''} participants
      </p>

      <p className="mb-6 text-xl font-bold">
        Total: {formatPrice(pricePerPersonCents * quantity, currency)}
      </p>

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

      <button
        type="button"
        onClick={checkout}
        disabled={submitting}
        className="w-full rounded-button bg-rusker-blue px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {submitting ? 'Redirecting to payment…' : 'Proceed to payment'}
      </button>
      <p className="mt-3 text-center text-xs text-gray-500">
        Secure payment via Stripe · prices include VAT
      </p>
    </div>
  )
}
