'use client'

import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { FormData } from '@/lib/formUtils'
import { THEMES, OBJECTIVES } from '@/lib/constants'
import { fadeInUp } from '@/lib/animations'
import { useI18n } from '@/lib/i18n'

interface Step4ThemesObjectivesProps {
  formData: FormData
  updateFormData: (updates: Partial<FormData>) => void
  onNext: () => void
  onPrev: () => void
}

export default function Step4ThemesObjectives({
  formData,
  updateFormData,
  onNext,
  onPrev,
}: Step4ThemesObjectivesProps) {
  const { t } = useI18n()
  
  const translatedThemes = useMemo(() => {
    return THEMES.map(theme => ({
      ...theme,
      label: t(`themes.${theme.id}`),
    }))
  }, [t])
  
  const translatedObjectives = useMemo(() => {
    return OBJECTIVES.map(obj => ({
      ...obj,
      label: t(`objectives.${obj.id}`),
    }))
  }, [t])
  const toggleTheme = (id: string) => {
    const current = formData.themes
    if (current.includes(id)) {
      // Remove if already selected
      updateFormData({ themes: current.filter(t => t !== id) })
    } else if (current.length < 2) {
      // Only add if less than 2 are selected
      updateFormData({ themes: [...current, id] })
    }
  }

  const toggleObjective = (id: string) => {
    const current = formData.objectives
    if (current.includes(id)) {
      // Remove if already selected
      updateFormData({ objectives: current.filter(o => o !== id) })
    } else if (current.length < 2) {
      // Only add if less than 2 are selected
      updateFormData({ objectives: [...current, id] })
    }
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className="w-full"
    >
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 text-center text-text-dark leading-[1.2] px-2 break-words">
        {t('form.steps.4.title')}
      </h2>
      <p className="text-sm md:text-base text-gray-600 text-center mb-4">
        {t('formSteps.step4.selectMultiple')}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-5xl mx-auto">
        {/* Themes */}
        <div className="bg-white rounded-card p-4 md:p-5 shadow-soft">
          <h3 className="text-base md:text-lg font-bold mb-3 text-text-dark leading-[1.2]">{t('formSteps.step4.themes')}</h3>
          <div className="flex flex-wrap gap-2">
            {translatedThemes.map((theme) => {
              const isSelected = formData.themes.includes(theme.id)
              const isDisabled = !isSelected && formData.themes.length >= 2
              return (
                <button
                  key={theme.id}
                  onClick={() => toggleTheme(theme.id)}
                  disabled={isDisabled}
                  className={`
                    px-2.5 md:px-3 py-1.5 text-xs md:text-sm rounded-lg font-medium transition-all duration-200
                    ${
                      isSelected
                        ? 'bg-rusker-blue text-white shadow-soft'
                        : isDisabled
                        ? 'bg-gray-100 text-gray-400 border-2 border-gray-200 cursor-not-allowed opacity-60'
                        : 'bg-white text-text-dark border-2 border-gray-200 hover:border-rusker-blue'
                    }
                  `}
                >
                  {theme.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Objectives */}
        <div className="bg-white rounded-card p-4 md:p-5 shadow-soft">
          <h3 className="text-base md:text-lg font-bold mb-3 text-text-dark leading-[1.2]">{t('formSteps.step4.objectives')}</h3>
          <div className="flex flex-wrap gap-2">
            {translatedObjectives.map((objective) => {
              const isSelected = formData.objectives.includes(objective.id)
              const isDisabled = !isSelected && formData.objectives.length >= 2
              return (
                <button
                  key={objective.id}
                  onClick={() => toggleObjective(objective.id)}
                  disabled={isDisabled}
                  className={`
                    px-2.5 md:px-3 py-1.5 text-xs md:text-sm rounded-lg font-medium transition-all duration-200
                    ${
                      isSelected
                        ? 'bg-rusker-blue text-white shadow-soft'
                        : isDisabled
                        ? 'bg-gray-100 text-gray-400 border-2 border-gray-200 cursor-not-allowed opacity-60'
                        : 'bg-white text-text-dark border-2 border-gray-200 hover:border-rusker-blue'
                    }
                  `}
                >
                  {objective.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

    </motion.div>
  )
}

