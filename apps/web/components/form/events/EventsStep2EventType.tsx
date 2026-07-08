'use client'

import { motion } from 'framer-motion'
import { EventsFormData, EventType, EventScope, EVENT_TYPES } from '@/lib/formUtils'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import { useI18n } from '@/lib/i18n'

interface EventsStep2EventTypeProps {
  formData: EventsFormData
  updateFormData: (updates: Partial<EventsFormData>) => void
  accentColor: string
}

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

export default function EventsStep2EventType({ 
  formData, 
  updateFormData,
  accentColor 
}: EventsStep2EventTypeProps) {
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
  const toggleEventType = (type: EventType) => {
    const current = formData.eventTypes
    if (current.includes(type)) {
      updateFormData({ eventTypes: current.filter(t => t !== type) })
    } else if (current.length < 2) {
      updateFormData({ eventTypes: [...current, type] })
    }
  }

  const handleScopeChange = (scope: EventScope) => {
    updateFormData({ eventScope: scope })
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
          {t('newForm.events.eventType.title')}
        </h2>
        <p className="text-sm md:text-base text-gray-600">
          {t('newForm.events.eventType.subtitle')}
        </p>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Event Types Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
          {EVENT_TYPES.map((eventType) => {
            const isSelected = formData.eventTypes.includes(eventType.id)
            const isDisabled = !isSelected && formData.eventTypes.length >= 2
            const IconComponent = icons[eventType.icon]
            
            return (
              <motion.button
                key={eventType.id}
                variants={fadeInUp}
                whileHover={!isDisabled ? { scale: 1.02, y: -2 } : undefined}
                whileTap={!isDisabled ? { scale: 0.98 } : undefined}
                onClick={() => !isDisabled && toggleEventType(eventType.id)}
                disabled={isDisabled}
                className={`
                  relative rounded-xl md:rounded-2xl p-4 md:p-5 text-center transition-all duration-300
                  focus:outline-none focus:ring-4 focus:ring-offset-2
                  ${isSelected ? 'text-white' : 'bg-white text-text-dark'}
                  ${isDisabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
                `}
                style={{
                  backgroundColor: isSelected ? accentColor : 'white',
                  boxShadow: isSelected 
                    ? `0 6px 24px ${accentColor}40` 
                    : '0 2px 12px rgba(0, 0, 0, 0.06)',
                }}
              >
                {/* Selection indicator */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-2 right-2 w-5 h-5 bg-white rounded-full flex items-center justify-center"
                  >
                    <svg className="w-3 h-3" style={{ color: accentColor }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                )}

                {/* Icon */}
                <div 
                  className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-2 md:mb-3"
                  style={{ color: isSelected ? 'white' : accentColor }}
                >
                  {IconComponent}
                </div>

                {/* Title */}
                <span className={`text-xs md:text-sm font-semibold ${isSelected ? 'text-white' : 'text-text-dark'}`}>
                  {titles[eventType.id]}
                </span>
              </motion.button>
            )
          })}
        </div>

        {/* Event Scope Selection */}
        <motion.div 
          variants={fadeInUp}
          className="bg-white rounded-2xl p-5 md:p-6 shadow-soft"
        >
          <h3 className="text-lg font-bold text-text-dark mb-4">
            {t('newForm.events.eventType.scope')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { id: 'internal' as EventScope, label: t('newForm.events.eventType.internal.label'), description: t('newForm.events.eventType.internal.description') },
              { id: 'external' as EventScope, label: t('newForm.events.eventType.external.label'), description: t('newForm.events.eventType.external.description') },
            ].map((scope) => {
              const isSelected = formData.eventScope === scope.id
              return (
                <motion.button
                  key={scope.id}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleScopeChange(scope.id)}
                  className={`
                    p-4 rounded-xl text-left transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-offset-1
                  `}
                  style={{
                    backgroundColor: isSelected ? accentColor : 'transparent',
                    color: isSelected ? 'white' : '#374151',
                    border: isSelected ? 'none' : '2px solid #e5e7eb',
                    boxShadow: isSelected ? `0 4px 12px ${accentColor}30` : 'none',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className={`
                        w-5 h-5 rounded-full border-2 flex items-center justify-center
                        ${isSelected ? 'border-white' : 'border-gray-400'}
                      `}
                    >
                      {isSelected && (
                        <div className="w-2.5 h-2.5 rounded-full bg-white" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-sm md:text-base">{scope.label}</p>
                      <p className={`text-xs mt-0.5 ${isSelected ? 'text-white/80' : 'text-gray-500'}`}>
                        {scope.description}
                      </p>
                    </div>
                  </div>
                </motion.button>
              )
            })}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

