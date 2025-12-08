'use client'

import { motion } from 'framer-motion'
import { EventsFormData } from '@/lib/formUtils'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import { useI18n } from '@/lib/i18n'

interface EventsStep3DetailsProps {
  formData: EventsFormData
  updateFormData: (updates: Partial<EventsFormData>) => void
  accentColor: string
}

export default function EventsStep3Details({ 
  formData, 
  updateFormData,
  accentColor 
}: EventsStep3DetailsProps) {
  const { t } = useI18n()
  
  const durationOptions = [
    { id: 'half-day', label: t('newForm.events.details.durations.half-day') },
    { id: 'full-day', label: t('newForm.events.details.durations.full-day') },
    { id: '2-days', label: t('newForm.events.details.durations.2-days') },
    { id: '3-days', label: t('newForm.events.details.durations.3-days') },
    { id: 'week', label: t('newForm.events.details.durations.week') },
    { id: 'custom', label: t('newForm.events.details.durations.custom') },
  ]
  const handleParticipantsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData({ participants: parseInt(e.target.value) || 0 })
  }

  const participantsLabel = formData.participants >= 500 ? '500+' : formData.participants.toString()

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-text-dark mb-2 md:mb-3">
          {t('newForm.events.details.title')}
        </h2>
        <p className="text-sm md:text-base text-gray-600">
          {t('newForm.events.details.subtitle')}
        </p>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="space-y-4 md:space-y-5"
      >
        {/* Date Selection */}
        <motion.div 
          variants={fadeInUp}
          className="bg-white rounded-2xl p-5 md:p-6 shadow-soft"
        >
          <label className="block text-base md:text-lg font-semibold mb-3 text-text-dark">
            {t('newForm.events.details.date')}
          </label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => updateFormData({ date: e.target.value })}
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none transition-colors text-text-dark"
            style={{
              borderColor: formData.date ? accentColor : undefined,
            }}
          />
        </motion.div>

        {/* Duration Selection */}
        <motion.div 
          variants={fadeInUp}
          className="bg-white rounded-2xl p-5 md:p-6 shadow-soft"
        >
          <label className="block text-base md:text-lg font-semibold mb-4 text-text-dark">
            {t('newForm.events.details.duration')}
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {durationOptions.map((option) => {
              const isSelected = formData.duration === option.id
              return (
                <button
                  key={option.id}
                  onClick={() => updateFormData({ duration: option.id })}
                  className={`
                    px-4 py-3 rounded-xl font-medium text-sm md:text-base transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-offset-2
                  `}
                  style={{
                    backgroundColor: isSelected ? accentColor : 'transparent',
                    color: isSelected ? 'white' : '#374151',
                    border: isSelected ? 'none' : '2px solid #e5e7eb',
                    boxShadow: isSelected ? `0 4px 12px ${accentColor}40` : 'none',
                  }}
                >
                  {option.label}
                </button>
              )
            })}
          </div>
        </motion.div>

        {/* Participants */}
        <motion.div 
          variants={fadeInUp}
          className="bg-white rounded-2xl p-5 md:p-6 shadow-soft"
        >
          <label className="block text-base md:text-lg font-semibold mb-4 text-text-dark">
            {t('newForm.events.details.participants')} : <span style={{ color: accentColor }}>{participantsLabel}</span>
          </label>
          <div className="relative">
            <input
              type="range"
              min="10"
              max="500"
              step="10"
              value={formData.participants}
              onChange={handleParticipantsChange}
              className="w-full h-2 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, ${accentColor} 0%, ${accentColor} ${((formData.participants - 10) / 490) * 100}%, #e5e7eb ${((formData.participants - 10) / 490) * 100}%, #e5e7eb 100%)`,
              }}
            />
            <style jsx>{`
              input[type='range']::-webkit-slider-thumb {
                -webkit-appearance: none;
                width: 24px;
                height: 24px;
                border-radius: 50%;
                background: ${accentColor};
                cursor: pointer;
                border: 4px solid white;
                box-shadow: 0 2px 8px rgba(0,0,0,0.2);
              }
              input[type='range']::-moz-range-thumb {
                width: 24px;
                height: 24px;
                border-radius: 50%;
                background: ${accentColor};
                cursor: pointer;
                border: 4px solid white;
                box-shadow: 0 2px 8px rgba(0,0,0,0.2);
              }
            `}</style>
          </div>
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>10</span>
            <span>500+</span>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

