'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { buttonHover } from '@/lib/animations'

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'outline'
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
  const baseStyles = 'rounded-button font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variantStyles = {
    primary: 'bg-rusker-blue text-white hover:bg-[#1f5a75]',
    secondary: 'bg-white text-rusker-blue border-2 border-rusker-blue hover:bg-rusker-blue hover:text-white',
    outline: 'bg-transparent text-rusker-blue border-2 border-rusker-blue hover:bg-rusker-blue hover:text-white',
  }
  
  const sizeStyles = {
    large: 'px-8 py-4 text-lg',
    medium: 'px-6 py-3 text-base',
    small: 'px-4 py-2 text-sm',
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

