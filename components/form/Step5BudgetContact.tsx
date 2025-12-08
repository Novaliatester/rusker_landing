'use client'

import { motion } from 'framer-motion'
import { useMemo } from 'react'
import Block from '@/components/ui/Block'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import { FormData } from '@/lib/formUtils'
import { BUDGET_RANGES } from '@/lib/constants'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import { useI18n } from '@/lib/i18n'

interface Step5BudgetContactProps {
  formData: FormData
  updateFormData: (updates: Partial<FormData>) => void
  onNext: () => void
  onPrev: () => void
  isSubmitting: boolean
}

export default function Step5BudgetContact({
  formData,
  updateFormData,
  onNext,
  onPrev,
  isSubmitting,
}: Step5BudgetContactProps) {
  const { t } = useI18n()
  
  const translatedBudgetRanges = useMemo(() => {
    return BUDGET_RANGES.map(range => ({
      ...range,
      label: t(`budgetRanges.${range.id}`),
    }))
  }, [t])
  const handleContactChange = (field: keyof FormData['contact'], value: string) => {
    updateFormData({
      contact: {
        ...formData.contact,
        [field]: value,
      },
    })
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className="w-full"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center text-text-dark leading-[1.2] px-2 break-words">
        {t('form.steps.5.title')}
      </h2>
      <p className="text-base text-gray-600 text-center mb-4">
        {t('form.steps.5.detail')}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
        {/* Budget Selection */}
        <motion.div variants={staggerContainer} initial="hidden" animate="visible">
          <h3 className="text-lg font-bold mb-3 text-text-dark leading-[1.2]">{t('formSteps.step5.budget')}</h3>
          <div className="space-y-2">
            {translatedBudgetRanges.map((range) => (
              <motion.div key={range.id} variants={fadeInUp}>
                <Block
                  selected={formData.budget === range.id}
                  onClick={() => updateFormData({ budget: range.id })}
                  className="p-4"
                >
                  <h4 className={`text-base font-semibold ${formData.budget === range.id ? 'text-white' : 'text-text-dark'}`}>{range.label}</h4>
                </Block>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div variants={fadeInUp} initial="hidden" animate="visible">
          <h3 className="text-base md:text-lg font-bold mb-3 md:mb-4 text-text-dark leading-[1.2]">{t('formSteps.step5.contact')}</h3>
          <motion.div 
            className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-lg border-2 border-gray-200 space-y-3 md:space-y-4"
            whileHover={{ scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label={`${t('formSteps.step5.name')} *`}
                type="text"
                value={formData.contact.name}
                onChange={(e) => handleContactChange('name', e.target.value)}
                required
                placeholder={t('formSteps.step5.name')}
              />
              <Input
                label={t('formSteps.step5.company')}
                type="text"
                value={formData.contact.companyName}
                onChange={(e) => handleContactChange('companyName', e.target.value)}
                placeholder={t('formSteps.step5.company')}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label={`${t('formSteps.step5.email')} *`}
                type="email"
                value={formData.contact.email}
                onChange={(e) => handleContactChange('email', e.target.value)}
                required
                placeholder="your@email.com"
                pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
              />
              <Input
                label={t('formSteps.step5.phone')}
                type="tel"
                value={formData.contact.phone}
                onChange={(e) => handleContactChange('phone', e.target.value)}
                placeholder="+33 6 12 34 56 78"
              />
            </div>
            <Textarea
              label={t('formSteps.step5.message')}
              value={formData.contact.message}
              onChange={(e) => handleContactChange('message', e.target.value)}
              placeholder={t('formSteps.step5.messagePlaceholder')}
            />
          </motion.div>
        </motion.div>
      </div>

    </motion.div>
  )
}

