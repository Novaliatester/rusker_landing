'use client'

import { motion } from 'framer-motion'
import { EventsFormData } from '@/lib/formUtils'
import { fadeInUp } from '@/lib/animations'
import { useI18n } from '@/lib/i18n'

interface EventsStep4ObjectiveProps {
  formData: EventsFormData
  updateFormData: (updates: Partial<EventsFormData>) => void
  accentColor: string
}

export default function EventsStep4Objective({ 
  formData, 
  updateFormData,
  accentColor 
}: EventsStep4ObjectiveProps) {
  const { t } = useI18n()
  const charCount = formData.objectiveDescription.length
  const minChars = 30
  const isValid = charCount >= minChars

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-text-dark mb-2 md:mb-3">
          {t('newForm.events.objective.title')}
        </h2>
        <p className="text-sm md:text-base text-gray-600">
          {t('newForm.events.objective.subtitle')}
        </p>
      </div>

      <motion.div
        variants={fadeInUp}
        className="bg-white rounded-2xl p-5 md:p-6 shadow-soft"
      >
        <label className="block text-base md:text-lg font-semibold mb-3 text-text-dark">
          {t('newForm.events.objective.label')}
        </label>
        <p className="text-sm text-gray-500 mb-4">
          {t('newForm.events.objective.description')}
        </p>
        
        <div className="relative">
          <textarea
            value={formData.objectiveDescription}
            onChange={(e) => updateFormData({ objectiveDescription: e.target.value })}
            placeholder={t('newForm.events.objective.placeholder')}
            rows={8}
            className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:outline-none transition-colors text-text-dark placeholder-gray-400 resize-none text-sm md:text-base leading-relaxed"
            style={{
              borderColor: isValid ? accentColor : undefined,
            }}
          />
          
          {/* Character counter */}
          <div className="absolute bottom-3 right-3 flex items-center gap-2">
            <span 
              className={`text-xs font-medium px-2 py-1 rounded-full ${
                isValid 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-gray-100 text-gray-500'
              }`}
            >
              {charCount} caractères
            </span>
          </div>
        </div>

        {!isValid && charCount > 0 && (
          <p className="mt-2 text-sm text-amber-600">
            {t('newForm.events.objective.minChars')} ({minChars - charCount} {t('newForm.events.objective.remaining')})
          </p>
        )}

        {/* Suggestion prompts */}
        <div className="mt-6 space-y-3">
          <p className="text-sm font-medium text-gray-700">Points à considérer :</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {[
              t('newForm.events.objective.prompts.context'),
              t('newForm.events.objective.prompts.goals'),
              t('newForm.events.objective.prompts.format'),
              t('newForm.events.objective.prompts.constraints'),
            ].map((prompt, idx) => (
              <div 
                key={idx}
                className="flex items-center gap-2 text-sm text-gray-600"
              >
                <div 
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: accentColor }}
                />
                {prompt}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

