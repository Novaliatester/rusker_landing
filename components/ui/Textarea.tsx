'use client'

import { TextareaHTMLAttributes } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export default function Textarea({ label, error, className = '', ...props }: TextareaProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-medium text-text-dark mb-1.5">
          {label}
        </label>
      )}
      <textarea
        className={`
          w-full rounded-2xl bg-white px-4 py-2.5 text-sm
          border-2 border-gray-200 focus:border-rusker-blue focus:outline-none focus:ring-2 focus:ring-rusker-blue/20
          text-text-dark placeholder-gray-400
          transition-all duration-200 resize-none hover:border-gray-300
          min-h-[100px]
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

