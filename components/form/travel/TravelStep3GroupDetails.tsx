'use client'

import { motion } from 'framer-motion'
import { TravelFormData, TravelDuration, TRAVEL_DURATIONS } from '@/lib/formUtils'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import { useI18n } from '@/lib/i18n'

interface TravelStep3GroupDetailsProps {
  formData: TravelFormData
  updateFormData: (updates: Partial<TravelFormData>) => void
  accentColor: string
}

export default function TravelStep3GroupDetails({ 
  formData, 
  updateFormData,
  accentColor 
}: TravelStep3GroupDetailsProps) {
  const { t } = useI18n()
  const handleGroupSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData({ groupSize: parseInt(e.target.value) })
  }

  const handleDateChange = (value: string) => {
    updateFormData({
      dates: {
        ...formData.dates,
        start: value,
      },
    })
  }

  const handleFlexibleChange = (flexible: boolean) => {
    updateFormData({
      dates: {
        ...formData.dates,
        flexible,
      },
    })
  }

  const handleDurationSelect = (duration: TravelDuration) => {
    updateFormData({ duration })
  }

  const groupSizeLabel = formData.groupSize >= 200 ? '200+' : formData.groupSize.toString()

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-text-dark mb-2 md:mb-3">
          {t('newForm.travel.groupDetails.title')}
        </h2>
        <p className="text-sm md:text-base text-gray-600">
          {t('newForm.travel.groupDetails.subtitle')}
        </p>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="space-y-4 md:space-y-5"
      >
        {/* Group Size */}
        <motion.div 
          variants={fadeInUp}
          className="bg-white rounded-2xl p-5 md:p-6 shadow-soft"
        >
          <label className="block text-base md:text-lg font-semibold mb-4 text-text-dark">
            {t('newForm.travel.groupDetails.groupSize')} : <span style={{ color: accentColor }}>{groupSizeLabel} {t('newForm.travel.groupDetails.persons')}</span>
          </label>
          <div className="relative">
            <input
              type="range"
              min="5"
              max="200"
              step="5"
              value={formData.groupSize}
              onChange={handleGroupSizeChange}
              className="w-full h-2 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, ${accentColor} 0%, ${accentColor} ${((formData.groupSize - 5) / 195) * 100}%, #e5e7eb ${((formData.groupSize - 5) / 195) * 100}%, #e5e7eb 100%)`,
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
            <span>5</span>
            <span>200+</span>
          </div>
        </motion.div>

        {/* Date Selection */}
        <motion.div 
          variants={fadeInUp}
          className="bg-white rounded-2xl p-5 md:p-6 shadow-soft"
        >
          <label className="block text-base md:text-lg font-semibold mb-3 text-text-dark">
            {t('newForm.travel.groupDetails.dates')}
          </label>
          <div className="space-y-4">
            <input
              type="date"
              value={formData.dates.start}
              onChange={(e) => handleDateChange(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none transition-colors text-text-dark"
              style={{
                borderColor: formData.dates.start ? accentColor : undefined,
              }}
            />
            
            {/* Flexible option */}
            <label className="flex items-center gap-3 cursor-pointer group">
              <div 
                className={`
                  w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all
                  ${formData.dates.flexible ? 'border-transparent' : 'border-gray-300 group-hover:border-gray-400'}
                `}
                style={{
                  backgroundColor: formData.dates.flexible ? accentColor : 'transparent',
                }}
              >
                {formData.dates.flexible && (
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <input
                type="checkbox"
                checked={formData.dates.flexible}
                onChange={(e) => handleFlexibleChange(e.target.checked)}
                className="sr-only"
              />
              <span className="text-sm md:text-base text-gray-700">
                {t('newForm.travel.groupDetails.flexible')}
              </span>
            </label>
          </div>
        </motion.div>

        {/* Duration Selection */}
        <motion.div 
          variants={fadeInUp}
          className="bg-white rounded-2xl p-5 md:p-6 shadow-soft"
        >
          <label className="block text-base md:text-lg font-semibold mb-4 text-text-dark">
            {t('newForm.travel.groupDetails.duration')}
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {TRAVEL_DURATIONS.map((duration) => {
              const durationLabels: Record<string, string> = {
                '2-3': t('newForm.travel.groupDetails.durations.2-3'),
                '4': t('newForm.travel.groupDetails.durations.4'),
                '1-week': t('newForm.travel.groupDetails.durations.1-week'),
                'other': t('newForm.travel.groupDetails.durations.other'),
              }
              const isSelected = formData.duration === duration.id
              return (
                <button
                  key={duration.id}
                  onClick={() => handleDurationSelect(duration.id)}
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
                  {durationLabels[duration.id] || duration.label}
                </button>
              )
            })}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

