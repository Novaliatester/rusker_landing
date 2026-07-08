'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { cardHover } from '@/lib/animations'

interface BlockProps {
  children: ReactNode
  selected?: boolean
  onClick?: () => void
  className?: string
  icon?: string | ReactNode
  role?: string
  'aria-label'?: string
  tabIndex?: number
  onKeyDown?: (e: React.KeyboardEvent) => void
}

export default function Block({ 
  children, 
  selected = false, 
  onClick,
  className = '',
  icon,
  role,
  'aria-label': ariaLabel,
  tabIndex,
  onKeyDown,
}: BlockProps) {
  return (
    <motion.div
      whileHover={onClick ? cardHover : undefined}
      onClick={onClick}
      onKeyDown={onKeyDown}
      role={role}
      aria-label={ariaLabel}
      tabIndex={tabIndex}
      className={`
        relative rounded-card p-6 shadow-soft
        transition-all duration-300
        ${selected ? 'bg-rusker-blue shadow-soft-hover [&_*]:text-white' : 'bg-white'}
        ${onClick ? 'cursor-pointer focus:outline-none focus:ring-2 focus:ring-rusker-blue focus:ring-offset-2 hover:shadow-soft-hover' : ''}
        ${className}
      `}
    >
      {icon && (
        <div className={`mb-4 flex items-center justify-center ${typeof icon === 'string' ? 'text-4xl' : ''}`}>
          {typeof icon === 'string' ? (
            <span>{icon}</span>
          ) : (
            <div className={`${selected ? 'text-white' : 'text-rusker-blue'}`}>
              {icon}
            </div>
          )}
        </div>
      )}
      {children}
      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-4 right-4 w-6 h-6 bg-white rounded-full flex items-center justify-center"
        >
          <svg className="w-4 h-4 text-rusker-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
      )}
    </motion.div>
  )
}

