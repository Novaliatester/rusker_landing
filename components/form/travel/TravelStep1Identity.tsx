'use client'

import { motion } from 'framer-motion'
import { TravelFormData, Identity } from '@/lib/formUtils'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import { useI18n } from '@/lib/i18n'

interface TravelStep1IdentityProps {
  formData: TravelFormData
  updateFormData: (updates: Partial<TravelFormData>) => void
  onNext: () => void
  accentColor: string
}

export default function TravelStep1Identity({ 
  formData, 
  updateFormData, 
  onNext,
  accentColor 
}: TravelStep1IdentityProps) {
  const { t } = useI18n()
  
  const handleSelect = (identity: Identity) => {
    updateFormData({ identity })
    setTimeout(() => onNext(), 300)
  }

  const options = [
    {
      id: 'school' as Identity,
      title: t('newForm.identity.school.title'),
      description: t('newForm.identity.school.description'),
      icon: (
        <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
          <path d="M32 8L4 24L32 40L60 24L32 8Z" stroke="currentColor" strokeWidth="2.5" fill="none" />
          <path d="M12 30V46L32 56L52 46V30" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M32 40V56" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="32" cy="24" r="4" fill="currentColor" />
        </svg>
      ),
    },
    {
      id: 'company' as Identity,
      title: t('newForm.identity.company.title'),
      description: t('newForm.identity.company.description'),
      icon: (
        <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
          <rect x="8" y="20" width="48" height="40" rx="2" stroke="currentColor" strokeWidth="2.5" fill="none" />
          <rect x="16" y="28" width="12" height="10" stroke="currentColor" strokeWidth="2" fill="none" />
          <rect x="36" y="28" width="12" height="10" stroke="currentColor" strokeWidth="2" fill="none" />
          <rect x="16" y="44" width="12" height="10" stroke="currentColor" strokeWidth="2" fill="none" />
          <rect x="36" y="44" width="12" height="10" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M24 8L32 4L40 8V20H24V8Z" stroke="currentColor" strokeWidth="2.5" fill="none" />
        </svg>
      ),
    },
  ]

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className="w-full max-w-3xl mx-auto"
    >
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-text-dark mb-2 md:mb-3">
          {t('newForm.identity.title')}
        </h2>
        <p className="text-sm md:text-base text-gray-600">
          {t('newForm.identity.subtitle')}
        </p>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
      >
        {options.map((option) => {
          const isSelected = formData.identity === option.id
          return (
            <motion.button
              key={option.id}
              variants={fadeInUp}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect(option.id)}
              className={`
                relative rounded-2xl md:rounded-3xl p-6 md:p-8 text-left transition-all duration-300
                focus:outline-none focus:ring-4 focus:ring-offset-2
                ${isSelected ? 'text-white' : 'bg-white text-text-dark'}
              `}
              style={{
                backgroundColor: isSelected ? accentColor : 'white',
                boxShadow: isSelected 
                  ? `0 8px 32px ${accentColor}40` 
                  : '0 4px 20px rgba(0, 0, 0, 0.06)',
              }}
            >
              {/* Selection indicator */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-4 right-4 w-7 h-7 bg-white rounded-full flex items-center justify-center"
                >
                  <svg className="w-4 h-4" style={{ color: accentColor }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
              )}

              {/* Icon */}
              <div 
                className="w-16 h-16 md:w-20 md:h-20 mb-4 md:mb-5"
                style={{ color: isSelected ? 'white' : accentColor }}
              >
                {option.icon}
              </div>

              {/* Content */}
              <h3 className={`text-xl md:text-2xl font-bold mb-2 ${isSelected ? 'text-white' : 'text-text-dark'}`}>
                {option.title}
              </h3>
              <p className={`text-sm md:text-base ${isSelected ? 'text-white/90' : 'text-gray-600'}`}>
                {option.description}
              </p>
            </motion.button>
          )
        })}
      </motion.div>
    </motion.div>
  )
}

