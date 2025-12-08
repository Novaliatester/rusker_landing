'use client'

import { motion } from 'framer-motion'
import { useMemo } from 'react'
import Block from '@/components/ui/Block'
import { FormData } from '@/lib/formUtils'
import { EXPERIENCE_TYPES } from '@/lib/constants'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import { LearningIcon, SeminarIcon, NetworkingIcon, CustomEventIcon, ConferenceIcon } from '@/components/ui/Icons'
import { useI18n } from '@/lib/i18n'

// Map icon names to actual components
const iconMap = {
  LearningIcon,
  SeminarIcon,
  NetworkingIcon,
  CustomEventIcon,
  ConferenceIcon,
} as const

interface Step2ExperienceTypeProps {
  formData: FormData
  updateFormData: (updates: Partial<FormData>) => void
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
  
  const translatedExperienceTypes = useMemo(() => {
    return EXPERIENCE_TYPES.map(exp => ({
      ...exp,
      title: t(`experienceTypes.${exp.id}.title`),
      description: t(`experienceTypes.${exp.id}.description`),
    }))
  }, [t])
  const toggleExperienceType = (id: string) => {
    const current = formData.experienceTypes
    if (current.includes(id)) {
      // Remove if already selected
      updateFormData({ experienceTypes: current.filter(t => t !== id) })
    } else if (current.length < 2) {
      // Only add if less than 2 are selected
      updateFormData({ experienceTypes: [...current, id] })
    }
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className="w-full"
    >
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 text-center text-text-dark px-2 leading-[1.2] break-words">
        {t('formSteps.step2.title')}
      </h2>
      <p className="text-sm md:text-base text-gray-600 text-center mb-4 md:mb-6 px-2">
        {t('formSteps.step2.subtitle')}
      </p>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4"
      >
        {translatedExperienceTypes.map((experience) => {
          const IconComponent = iconMap[experience.iconName as keyof typeof iconMap]
          const isSelected = formData.experienceTypes.includes(experience.id)
          const isDisabled = !isSelected && formData.experienceTypes.length >= 2
          return (
            <motion.div key={experience.id} variants={fadeInUp}>
              <Block
                selected={isSelected}
                onClick={() => !isDisabled && toggleExperienceType(experience.id)}
                icon={<IconComponent />}
                className={`h-full ${isDisabled ? 'opacity-60 cursor-not-allowed' : ''}`}
              >
              <div className="flex items-start justify-between mb-1">
                <h3 className={`text-base md:text-lg font-bold leading-[1.2] break-words ${formData.experienceTypes.includes(experience.id) ? 'text-white' : 'text-text-dark'}`}>{experience.title}</h3>
                {experience.recommended === 'schools' && formData.identity === 'school' && (
                  <span className={`text-xs px-2 py-1 rounded-full ${formData.experienceTypes.includes(experience.id) ? 'bg-white/20 text-white' : 'bg-rusker-blue/20 text-rusker-blue'}`}>
                    {t('formSteps.step2.recommended')}
                  </span>
                )}
                {experience.recommended === 'companies' && formData.identity === 'company' && (
                  <span className={`text-xs px-2 py-1 rounded-full ${formData.experienceTypes.includes(experience.id) ? 'bg-white/20 text-white' : 'bg-rusker-blue/20 text-rusker-blue'}`}>
                    {t('formSteps.step2.recommended')}
                  </span>
                )}
              </div>
              <p className={`text-sm opacity-90 ${formData.experienceTypes.includes(experience.id) ? 'text-white' : 'text-gray-600'}`}>{experience.description}</p>
            </Block>
          </motion.div>
          )
        })}
      </motion.div>

    </motion.div>
  )
}

