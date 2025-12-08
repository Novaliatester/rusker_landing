'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Confetti from '@/components/ui/Confetti'
import { scaleIn } from '@/lib/animations'
import { useI18n } from '@/lib/i18n'

interface ConfirmationScreenProps {
  accentColor?: string
}

export default function ConfirmationScreen({ accentColor = '#287497' }: ConfirmationScreenProps) {
  const { t } = useI18n()
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true)
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  const goHome = () => {
    window.location.href = '/'
  }

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden"
      style={{
        background: `linear-gradient(135deg, white 0%, ${accentColor}08 50%, white 100%)`,
      }}
    >
      {/* Confetti Animation */}
      <Confetti />

      {/* Animated background elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: accentColor }}
        />
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.08 }}
          transition={{ duration: 1.2, delay: 0.2, ease: 'easeOut' }}
          className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full blur-3xl"
          style={{ backgroundColor: accentColor }}
        />
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.08 }}
          transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
          className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl"
          style={{ backgroundColor: accentColor }}
        />
      </div>

      {/* Content */}
      <motion.div
        initial="hidden"
        animate={showContent ? 'visible' : 'hidden'}
        variants={scaleIn}
        className="relative text-center max-w-2xl z-10"
      >
        {/* Success Icon */}
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
              className="w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center shadow-2xl"
              style={{
                background: `linear-gradient(135deg, ${accentColor} 0%, ${accentColor}dd 100%)`,
              }}
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
              className="absolute inset-0 rounded-full"
              style={{ backgroundColor: accentColor }}
            />
          </div>
        </motion.div>

        {/* Title with animation */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-text-dark"
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
            className="bg-clip-text text-transparent bg-[length:200%_auto]"
            style={{
              backgroundImage: `linear-gradient(90deg, ${accentColor} 0%, ${accentColor}bb 50%, ${accentColor} 100%)`,
            }}
          >
            {t('newForm.confirmation.title')}
          </motion.span>
        </motion.h1>
        
        {/* Messages */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-xl md:text-2xl text-gray-700 mb-4 font-semibold"
        >
          {t('newForm.confirmation.thanks')}
        </motion.p>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="text-lg text-gray-600 mb-10"
        >
          {t('newForm.confirmation.message')}{' '}
          <span className="font-bold" style={{ color: accentColor }}>{t('newForm.confirmation.delay')}</span>{' '}
          {t('newForm.confirmation.messageSuffix')}
        </motion.p>

        {/* What's next section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="bg-white rounded-2xl p-6 shadow-lg mb-8 text-left"
          style={{ borderTop: `4px solid ${accentColor}` }}
        >
          <h3 className="font-bold text-lg mb-4 text-text-dark">{t('newForm.confirmation.nextSteps')}</h3>
          <ul className="space-y-3">
            {[
              t('newForm.confirmation.steps.1'),
              t('newForm.confirmation.steps.2'),
              t('newForm.confirmation.steps.3'),
            ].map((step, idx) => (
              <li key={idx} className="flex items-center gap-3">
                <div 
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm font-bold"
                  style={{ backgroundColor: accentColor }}
                >
                  {idx + 1}
                </div>
                <span className="text-gray-700">{step}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={goHome}
            className="px-8 py-4 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300"
            style={{ 
              backgroundColor: accentColor,
              boxShadow: `0 8px 24px ${accentColor}40`,
            }}
          >
            {t('newForm.confirmation.backHome')}
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  )
}
