'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { buttonHover } from '@/lib/animations'

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'outline' | 'custom'
  size?: 'large' | 'medium' | 'small'
  className?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

export default function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'large',
  className = '',
  type = 'button',
  disabled = false,
}: ButtonProps) {
  const baseStyles = 'rounded-button font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] touch-manipulation active:scale-95'
  
  const variantStyles = {
    primary: 'bg-rusker-blue text-white hover:bg-[#1f5a75] active:bg-[#1a4d66]',
    secondary: 'bg-white text-rusker-blue border-2 border-rusker-blue hover:bg-rusker-blue hover:text-white active:bg-[#1f5a75] active:text-white',
    outline: 'bg-transparent text-rusker-blue border-2 border-rusker-blue hover:bg-rusker-blue hover:text-white active:bg-[#1f5a75] active:text-white',
    custom: '', // No default styles, let className handle everything
  }
  
  const sizeStyles = {
    large: 'px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg',
    medium: 'px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base',
    small: 'px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm',
  }

  return (
    <motion.button
      whileHover={!disabled ? buttonHover : undefined}
      whileTap={!disabled ? { scale: 0.98 } : undefined}
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </motion.button>
  )
}

