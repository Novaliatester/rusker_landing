'use client'

import { motion } from 'framer-motion'
import Block from '@/components/ui/Block'
import { EventsFormData, EventType, EVENT_TYPES } from '@/lib/formUtils'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import { useI18n } from '@/lib/i18n'

// Icon components matching EventsStep2EventType
const icons: Record<string, JSX.Element> = {
  cake: (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <rect x="6" y="24" width="36" height="18" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M6 30H42" stroke="currentColor" strokeWidth="2" />
      <path d="M14 24V18M24 24V18M34 24V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="14" cy="14" rx="2" ry="3" fill="currentColor" />
      <ellipse cx="24" cy="14" rx="2" ry="3" fill="currentColor" />
      <ellipse cx="34" cy="14" rx="2" ry="3" fill="currentColor" />
    </svg>
  ),
  scissors: (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <path d="M18 18L30 30M30 18L18 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="14" cy="34" r="6" stroke="currentColor" strokeWidth="2" fill="none" />
      <circle cx="34" cy="34" r="6" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M18 30L24 24L30 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  rocket: (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <path d="M24 6C24 6 12 14 12 28C12 36 16 42 24 42C32 42 36 36 36 28C36 14 24 6 24 6Z" stroke="currentColor" strokeWidth="2" fill="none" />
      <circle cx="24" cy="24" r="4" fill="currentColor" />
      <path d="M18 38L12 44M30 38L36 44" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M8 24C8 24 12 20 12 28M40 24C40 24 36 20 36 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  mic: (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <rect x="16" y="6" width="16" height="24" rx="8" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M10 22C10 30 16 36 24 36C32 36 38 30 38 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M24 36V44M16 44H32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  tools: (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <path d="M14 34L34 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M8 28L20 40L14 46L2 34L8 28Z" stroke="currentColor" strokeWidth="2" fill="none" />
      <circle cx="36" cy="12" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M42 18L46 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  heart: (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <path d="M24 42L8 26C4 22 4 14 10 10C16 6 22 10 24 14C26 10 32 6 38 10C44 14 44 22 40 26L24 42Z" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M24 22V30M20 26H28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  code: (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <rect x="6" y="8" width="36" height="32" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M6 16H42" stroke="currentColor" strokeWidth="2" />
      <path d="M18 28L12 32L18 36M30 28L36 32L30 36M22 40L26 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
}

interface Step2ExperienceTypeProps {
  formData: EventsFormData
  updateFormData: (updates: Partial<EventsFormData>) => void
  onNext: () => void
  onPrev: () => void
}

export default function Step2ExperienceType({
  formData,
  updateFormData,
  onNext,
  onPrev,
}: Step2ExperienceTypeProps) {
  const { t } = useI18n()
  
  const titles: Record<EventType, string> = {
    'anniversary': t('newForm.events.eventType.types.anniversary'),
    'inauguration': t('newForm.events.eventType.types.inauguration'),
    'product-launch': t('newForm.events.eventType.types.product-launch'),
    'conference': t('newForm.events.eventType.types.conference'),
    'workshop': t('newForm.events.eventType.types.workshop'),
    'teambuilding': t('newForm.events.eventType.types.teambuilding'),
    'hackathon': t('newForm.events.eventType.types.hackathon'),
  }
  
  const toggleExperienceType = (id: EventType) => {
    const current = formData.eventTypes
    if (current.includes(id)) {
      // Remove if already selected
      updateFormData({ eventTypes: current.filter(t => t !== id) })
    } else if (current.length < 2) {
      // Only add if less than 2 are selected
      updateFormData({ eventTypes: [...current, id] })
    }
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className="w-full"
    >
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 text-center text-text-dark px-2">
        Type d&apos;expérience
      </h2>
      <p className="text-sm md:text-base text-gray-600 text-center mb-4 md:mb-6 px-2">
        Sélectionnez jusqu&apos;à 2 types d&apos;expérience
      </p>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4"
      >
        {EVENT_TYPES.map((eventType) => {
          const iconElement = icons[eventType.icon] || icons.mic
          const isSelected = formData.eventTypes.includes(eventType.id)
          const isDisabled = !isSelected && formData.eventTypes.length >= 2
          return (
            <motion.div key={eventType.id} variants={fadeInUp}>
              <Block
                selected={isSelected}
                onClick={() => !isDisabled && toggleExperienceType(eventType.id)}
                icon={iconElement}
                className={`h-full ${isDisabled ? 'opacity-60 cursor-not-allowed' : ''}`}
              >
              <div className="flex items-start justify-between mb-1">
                <h3 className={`text-base md:text-lg font-bold ${formData.eventTypes.includes(eventType.id) ? 'text-white' : 'text-text-dark'}`}>{titles[eventType.id]}</h3>
              </div>
            </Block>
          </motion.div>
          )
        })}
      </motion.div>

    </motion.div>
  )
}

