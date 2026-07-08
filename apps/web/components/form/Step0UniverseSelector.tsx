'use client'

import { motion } from 'framer-motion'
import { Universe } from '@/lib/formUtils'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import { useI18n } from '@/lib/i18n'

interface Step0UniverseSelectorProps {
  onSelect: (universe: Universe) => void
}

export default function Step0UniverseSelector({ onSelect }: Step0UniverseSelectorProps) {
  const { t } = useI18n()
  
  const universes = [
    {
      id: 'travel' as Universe,
      title: t('newForm.universeSelector.travel.title'),
      subtitle: t('newForm.universeSelector.travel.subtitle'),
      description: t('newForm.universeSelector.travel.description'),
      cta: t('newForm.universeSelector.travel.cta'),
      color: '#287497',
      lightColor: '#bfeff4',
      icon: (
        <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
          <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M24 4C24 4 24 20 24 24M24 24C24 28 24 44 24 44M4 24H44M8 12C8 12 16 16 24 16C32 16 40 12 40 12M8 36C8 36 16 32 24 32C32 32 40 36 40 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="24" cy="24" r="4" fill="currentColor" />
        </svg>
      ),
    },
    {
      id: 'events' as Universe,
      title: t('newForm.universeSelector.events.title'),
      subtitle: t('newForm.universeSelector.events.subtitle'),
      description: t('newForm.universeSelector.events.description'),
      cta: t('newForm.universeSelector.events.cta'),
      color: '#0b5d56',
      lightColor: '#6ee3a8',
      icon: (
        <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
          <rect x="6" y="10" width="36" height="32" rx="4" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M6 18H42" stroke="currentColor" strokeWidth="2" />
          <path d="M14 6V14M34 6V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="16" cy="26" r="3" fill="currentColor" />
          <circle cx="24" cy="26" r="3" fill="currentColor" />
          <circle cx="32" cy="26" r="3" fill="currentColor" />
          <circle cx="16" cy="34" r="3" fill="currentColor" />
          <circle cx="24" cy="34" r="3" fill="currentColor" />
        </svg>
      ),
    },
  ]

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className="w-full max-w-4xl mx-auto px-4"
    >
      <div className="text-center mb-8 md:mb-12">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text-dark mb-3 md:mb-4"
        >
          {t('newForm.universeSelector.title')} <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-travel to-events bg-clip-text text-transparent">
            {t('newForm.universeSelector.titleHighlight')}
          </span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto"
        >
          {t('newForm.universeSelector.subtitle')}
        </motion.p>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
      >
        {universes.map((universe, index) => (
          <motion.button
            key={universe.id}
            variants={fadeInUp}
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(universe.id)}
            className="group relative overflow-hidden rounded-2xl md:rounded-3xl p-6 md:p-8 text-left transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-offset-2"
            style={{ 
              backgroundColor: 'white',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = `0 8px 32px ${universe.color}30`
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)'
            }}
          >
            {/* Gradient overlay on hover */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: `linear-gradient(135deg, ${universe.color}08 0%, ${universe.color}15 100%)`,
              }}
            />

            {/* Animated corner accent */}
            <motion.div
              className="absolute top-0 right-0 w-32 h-32 -translate-y-16 translate-x-16 rounded-full"
              style={{ backgroundColor: universe.lightColor }}
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1, opacity: 0.5 }}
              transition={{ duration: 0.4 }}
            />

            <div className="relative z-10">
              {/* Icon */}
              <motion.div
                className="w-16 h-16 md:w-20 md:h-20 mb-4 md:mb-6"
                style={{ color: universe.color }}
                whileHover={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.5 }}
              >
                {universe.icon}
              </motion.div>

              {/* Content */}
              <h2 
                className="text-2xl md:text-3xl font-bold mb-1 md:mb-2 transition-colors duration-300"
                style={{ color: universe.color }}
              >
                {universe.title}
              </h2>
              <p className="text-base md:text-lg font-medium text-gray-700 mb-2 md:mb-3">
                {universe.subtitle}
              </p>
              <p className="text-sm md:text-base text-gray-500 leading-relaxed">
                {universe.description}
              </p>

              {/* Arrow indicator */}
              <motion.div
                className="mt-4 md:mt-6 flex items-center gap-2 font-medium transition-colors duration-300"
                style={{ color: universe.color }}
              >
                <span className="text-sm md:text-base">{universe.cta}</span>
                <motion.svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </motion.svg>
              </motion.div>
            </div>
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  )
}

