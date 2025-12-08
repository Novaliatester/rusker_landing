'use client'

import { motion } from 'framer-motion'
import { TravelFormData, TRAVEL_THEMES, TRAVEL_OBJECTIVES } from '@/lib/formUtils'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import { useI18n } from '@/lib/i18n'

interface TravelStep4ThemesObjectivesProps {
  formData: TravelFormData
  updateFormData: (updates: Partial<TravelFormData>) => void
  accentColor: string
}

export default function TravelStep4ThemesObjectives({ 
  formData, 
  updateFormData,
  accentColor 
}: TravelStep4ThemesObjectivesProps) {
  const { t } = useI18n()
  
  const themeLabels: Record<string, string> = {
    'innovation': t('newForm.travel.themesObjectives.themeLabels.innovation'),
    'sustainability': t('newForm.travel.themesObjectives.themeLabels.sustainability'),
    'entrepreneurship': t('newForm.travel.themesObjectives.themeLabels.entrepreneurship'),
    'smart-city': t('newForm.travel.themesObjectives.themeLabels.smart-city'),
    'culture': t('newForm.travel.themesObjectives.themeLabels.culture'),
    'gastronomy': t('newForm.travel.themesObjectives.themeLabels.gastronomy'),
    'mobility': t('newForm.travel.themesObjectives.themeLabels.mobility'),
    'tourism': t('newForm.travel.themesObjectives.themeLabels.tourism'),
  }

  const objectiveLabels: Record<string, string> = {
    'learning': t('newForm.travel.themesObjectives.objectiveLabels.learning'),
    'networking': t('newForm.travel.themesObjectives.objectiveLabels.networking'),
    'team-building': t('newForm.travel.themesObjectives.objectiveLabels.team-building'),
    'inspiration': t('newForm.travel.themesObjectives.objectiveLabels.inspiration'),
    'partnerships': t('newForm.travel.themesObjectives.objectiveLabels.partnerships'),
    'discovery': t('newForm.travel.themesObjectives.objectiveLabels.discovery'),
  }
  const toggleTheme = (id: string) => {
    const current = formData.themes
    if (current.includes(id)) {
      updateFormData({ themes: current.filter(t => t !== id) })
    } else if (current.length < 3) {
      updateFormData({ themes: [...current, id] })
    }
  }

  const toggleObjective = (id: string) => {
    const current = formData.objectives
    if (current.includes(id)) {
      updateFormData({ objectives: current.filter(o => o !== id) })
    } else if (current.length < 3) {
      updateFormData({ objectives: [...current, id] })
    }
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
          {t('newForm.travel.themesObjectives.title')}
        </h2>
        <p className="text-sm md:text-base text-gray-600">
          {t('newForm.travel.themesObjectives.subtitle')}
        </p>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
      >
        {/* Themes */}
        <motion.div 
          variants={fadeInUp}
          className="bg-white rounded-2xl p-5 md:p-6 shadow-soft"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg md:text-xl font-bold text-text-dark">
              {t('newForm.travel.themesObjectives.themes')}
            </h3>
            <span 
              className="text-sm font-medium px-2 py-1 rounded-full"
              style={{ 
                backgroundColor: `${accentColor}15`,
                color: accentColor,
              }}
            >
              {formData.themes.length}/3
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {TRAVEL_THEMES.map((theme) => {
              const isSelected = formData.themes.includes(theme.id)
              const isDisabled = !isSelected && formData.themes.length >= 3
              
              return (
                <motion.button
                  key={theme.id}
                  whileHover={!isDisabled ? { scale: 1.02 } : undefined}
                  whileTap={!isDisabled ? { scale: 0.98 } : undefined}
                  onClick={() => !isDisabled && toggleTheme(theme.id)}
                  disabled={isDisabled}
                  className={`
                    px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-offset-1
                    ${isDisabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
                  `}
                  style={{
                    backgroundColor: isSelected ? accentColor : 'transparent',
                    color: isSelected ? 'white' : '#374151',
                    border: isSelected ? 'none' : '2px solid #e5e7eb',
                    boxShadow: isSelected ? `0 2px 8px ${accentColor}30` : 'none',
                  }}
                >
                  {themeLabels[theme.id]}
                </motion.button>
              )
            })}
          </div>
        </motion.div>

        {/* Objectives */}
        <motion.div 
          variants={fadeInUp}
          className="bg-white rounded-2xl p-5 md:p-6 shadow-soft"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg md:text-xl font-bold text-text-dark">
              {t('newForm.travel.themesObjectives.objectives')}
            </h3>
            <span 
              className="text-sm font-medium px-2 py-1 rounded-full"
              style={{ 
                backgroundColor: `${accentColor}15`,
                color: accentColor,
              }}
            >
              {formData.objectives.length}/3
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {TRAVEL_OBJECTIVES.map((objective) => {
              const isSelected = formData.objectives.includes(objective.id)
              const isDisabled = !isSelected && formData.objectives.length >= 3
              
              return (
                <motion.button
                  key={objective.id}
                  whileHover={!isDisabled ? { scale: 1.02 } : undefined}
                  whileTap={!isDisabled ? { scale: 0.98 } : undefined}
                  onClick={() => !isDisabled && toggleObjective(objective.id)}
                  disabled={isDisabled}
                  className={`
                    px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-offset-1
                    ${isDisabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
                  `}
                  style={{
                    backgroundColor: isSelected ? accentColor : 'transparent',
                    color: isSelected ? 'white' : '#374151',
                    border: isSelected ? 'none' : '2px solid #e5e7eb',
                    boxShadow: isSelected ? `0 2px 8px ${accentColor}30` : 'none',
                  }}
                >
                  {objectiveLabels[objective.id]}
                </motion.button>
              )
            })}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

