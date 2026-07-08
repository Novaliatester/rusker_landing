'use client'

import { motion } from 'framer-motion'
import { TravelFormData, TravelExperienceType, TRAVEL_EXPERIENCE_TYPES } from '@/lib/formUtils'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import { useI18n } from '@/lib/i18n'

interface TravelStep2ExperienceProps {
  formData: TravelFormData
  updateFormData: (updates: Partial<TravelFormData>) => void
  onNext: () => void
  accentColor: string
}

const icons: Record<string, JSX.Element> = {
  compass: (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <circle cx="32" cy="32" r="26" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <polygon points="32,12 38,28 32,32 26,28" fill="currentColor" />
      <polygon points="32,52 26,36 32,32 38,36" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="32" cy="32" r="4" fill="currentColor" />
      <path d="M32 4V10M32 54V60M4 32H10M54 32H60" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  users: (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <circle cx="24" cy="20" r="8" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <circle cx="44" cy="20" r="6" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M8 52C8 40 16 34 24 34C32 34 40 40 40 52" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M40 52C40 44 44 38 50 38C54 38 58 42 58 48" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  ),
  palette: (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <path d="M32 8C18 8 6 20 6 32C6 44 18 52 30 52C34 52 36 50 36 48C36 46 34 44 36 42C38 40 42 42 46 40C54 36 58 28 54 18C50 10 42 8 32 8Z" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <circle cx="20" cy="24" r="4" fill="currentColor" />
      <circle cx="32" cy="18" r="4" fill="currentColor" />
      <circle cx="42" cy="26" r="4" fill="currentColor" />
      <circle cx="24" cy="38" r="4" fill="currentColor" />
    </svg>
  ),
}

export default function TravelStep2Experience({ 
  formData, 
  updateFormData, 
  onNext,
  accentColor 
}: TravelStep2ExperienceProps) {
  const { t } = useI18n()
  
  const titles: Record<string, string> = {
    'learning-expedition': t('newForm.travel.experience.learningExpedition.title'),
    'seminar-offsite': t('newForm.travel.experience.seminarOffsite.title'),
    'cultural-stay': t('newForm.travel.experience.culturalStay.title'),
  }

  const descriptions: Record<string, string> = {
    'learning-expedition': t('newForm.travel.experience.learningExpedition.description'),
    'seminar-offsite': t('newForm.travel.experience.seminarOffsite.description'),
    'cultural-stay': t('newForm.travel.experience.culturalStay.description'),
  }

  const handleSelect = (type: TravelExperienceType) => {
    updateFormData({ experienceType: type })
    setTimeout(() => onNext(), 300)
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className="w-full max-w-4xl mx-auto"
    >
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-text-dark mb-2 md:mb-3">
          {t('newForm.travel.experience.title')}
        </h2>
        <p className="text-sm md:text-base text-gray-600">
          {t('newForm.travel.experience.subtitle')}
        </p>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5"
      >
        {TRAVEL_EXPERIENCE_TYPES.map((experience) => {
          const isSelected = formData.experienceType === experience.id
          const IconComponent = icons[experience.icon]
          
          return (
            <motion.button
              key={experience.id}
              variants={fadeInUp}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect(experience.id)}
              className={`
                relative rounded-2xl md:rounded-3xl p-5 md:p-6 text-left transition-all duration-300
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
                  className="absolute top-3 right-3 w-6 h-6 bg-white rounded-full flex items-center justify-center"
                >
                  <svg className="w-3.5 h-3.5" style={{ color: accentColor }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
              )}

              {/* Icon */}
              <div 
                className="w-12 h-12 md:w-14 md:h-14 mb-3 md:mb-4"
                style={{ color: isSelected ? 'white' : accentColor }}
              >
                {IconComponent}
              </div>

              {/* Content */}
              <h3 className={`text-lg md:text-xl font-bold mb-1.5 md:mb-2 ${isSelected ? 'text-white' : 'text-text-dark'}`}>
                {titles[experience.id]}
              </h3>
              <p className={`text-xs md:text-sm leading-relaxed ${isSelected ? 'text-white/90' : 'text-gray-600'}`}>
                {descriptions[experience.id]}
              </p>
            </motion.button>
          )
        })}
      </motion.div>
    </motion.div>
  )
}

