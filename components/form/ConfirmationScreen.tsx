'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Button from '@/components/ui/Button'
import Confetti from '@/components/ui/Confetti'
import { scaleIn } from '@/lib/animations'
import { useI18n } from '@/lib/i18n'

export default function ConfirmationScreen() {
  const { t } = useI18n()
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Delay content appearance slightly after confetti starts
    const timer = setTimeout(() => {
      setShowContent(true)
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-rusker-blue/5 to-white px-6 overflow-hidden">
      {/* Confetti Animation */}
      <Confetti />

      {/* Animated background elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rusker-blue rounded-full blur-3xl"
        />
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.08 }}
          transition={{ duration: 1.2, delay: 0.2, ease: 'easeOut' }}
          className="absolute top-1/4 right-1/4 w-64 h-64 bg-rusker-blue rounded-full blur-3xl"
        />
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.08 }}
          transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
          className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-rusker-blue rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <motion.div
        initial="hidden"
        animate={showContent ? 'visible' : 'hidden'}
        variants={scaleIn}
        className="relative text-center max-w-2xl z-10"
      >
        {/* Success Icon - Custom SVG instead of emoji */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: 'spring', 
            stiffness: 200, 
            damping: 15,
            delay: 0.3
          }}
          className="mb-8 flex justify-center"
        >
          <div className="relative">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-rusker-blue to-[#2a8bb0] rounded-full flex items-center justify-center shadow-2xl"
            >
              <svg 
                width="48" 
                height="48" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="white" 
                strokeWidth="3" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="md:w-16 md:h-16"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </motion.div>
            {/* Pulsing ring */}
            <motion.div
              initial={{ scale: 0, opacity: 0.8 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: 'easeOut'
              }}
              className="absolute inset-0 bg-rusker-blue rounded-full"
            />
          </div>
        </motion.div>

        {/* Title with animation */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-5xl md:text-6xl font-bold mb-6 text-text-dark"
        >
          <motion.span
            animate={{ 
              backgroundPosition: ['0%', '100%', '0%'],
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: 'linear'
            }}
            className="bg-gradient-to-r from-rusker-blue via-[#2a8bb0] to-rusker-blue bg-clip-text text-transparent bg-[length:200%_auto]"
          >
            {t('form.confirmation.title')}
          </motion.span>
        </motion.h1>
        
        {/* Messages with stagger */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-2xl md:text-3xl text-gray-700 mb-4 font-semibold"
        >
          {t('form.confirmation.message1')}
        </motion.p>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="text-xl text-gray-600 mb-12"
        >
          {t('form.confirmation.message2')}{' '}
          <span className="font-bold text-rusker-blue">{t('form.confirmation.message2Emphasis')}</span> {t('form.confirmation.message2End')}
        </motion.p>

        {/* Button with hover animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={scrollToTop}
              variant="primary"
              size="large"
              className="bg-rusker-blue hover:bg-[#1f5a75] shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {t('common.home')}
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

