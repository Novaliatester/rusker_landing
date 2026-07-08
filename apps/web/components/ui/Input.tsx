'use client'

import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export default function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-medium text-text-dark mb-1.5">
          {label}
        </label>
      )}
      <input
        className={`
          w-full rounded-2xl bg-white px-4 py-3 text-sm sm:text-base
          border-2 border-gray-200 focus:border-rusker-blue focus:outline-none focus:ring-2 focus:ring-rusker-blue/20
          text-text-dark placeholder-gray-400
          transition-all duration-200 hover:border-gray-300
          min-h-[44px] touch-manipulation
          ${error ? 'border-red-500' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  )
}

