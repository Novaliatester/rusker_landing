'use client'

import { motion } from 'framer-motion'
import { EventsFormData, BUDGET_RANGES } from '@/lib/formUtils'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import { useI18n } from '@/lib/i18n'

interface EventsStep5BudgetContactProps {
  formData: EventsFormData
  updateFormData: (updates: Partial<EventsFormData>) => void
  accentColor: string
  isSubmitting: boolean
}

export default function EventsStep5BudgetContact({ 
  formData, 
  updateFormData,
  accentColor,
  isSubmitting 
}: EventsStep5BudgetContactProps) {
  const { t } = useI18n()
  
  const eventsBudgetRanges = [
    { id: 'under-5k', label: t('newForm.budgetContact.eventsBudgetRanges.under-5k') },
    { id: '5k-15k', label: t('newForm.budgetContact.eventsBudgetRanges.5k-15k') },
    { id: '15k-30k', label: t('newForm.budgetContact.eventsBudgetRanges.15k-30k') },
    { id: '30k-60k', label: t('newForm.budgetContact.eventsBudgetRanges.30k-60k') },
    { id: '60k-100k', label: t('newForm.budgetContact.eventsBudgetRanges.60k-100k') },
    { id: 'over-100k', label: t('newForm.budgetContact.eventsBudgetRanges.over-100k') },
  ]
  const handleContactChange = (field: keyof EventsFormData['contact'], value: string) => {
    updateFormData({
      contact: {
        ...formData.contact,
        [field]: value,
      },
    })
  }

  const inputClasses = `
    w-full px-4 py-3 rounded-xl border-2 border-gray-200 
    focus:outline-none transition-all duration-200
    text-text-dark placeholder-gray-400
    text-sm md:text-base
  `

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className="w-full max-w-4xl mx-auto"
    >
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-text-dark mb-2 md:mb-3">
          {t('newForm.budgetContact.title')}
        </h2>
        <p className="text-sm md:text-base text-gray-600">
          {t('newForm.budgetContact.subtitle')}
        </p>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
      >
        {/* Budget Selection */}
        <motion.div 
          variants={fadeInUp}
          className="bg-white rounded-2xl p-5 md:p-6 shadow-soft"
        >
          <h3 className="text-lg md:text-xl font-bold text-text-dark mb-4">
            {t('newForm.budgetContact.budgetEstimated')}
          </h3>
          
          {/* Budget type toggle */}
          <div className="flex rounded-xl bg-gray-100 p-1 mb-4">
            {[
              { id: 'global', label: t('newForm.budgetContact.budgetType.global') },
              { id: 'per-person', label: t('newForm.budgetContact.budgetType.perPerson') },
            ].map((type) => (
              <button
                key={type.id}
                onClick={() => updateFormData({ budgetType: type.id as 'global' | 'per-person' })}
                className={`
                  flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200
                `}
                style={{
                  backgroundColor: formData.budgetType === type.id ? accentColor : 'transparent',
                  color: formData.budgetType === type.id ? 'white' : '#6b7280',
                }}
              >
                {type.label}
              </button>
            ))}
          </div>

          <div className="space-y-2">
            {eventsBudgetRanges.map((range) => {
              const isSelected = formData.budget === range.id
              return (
                <motion.button
                  key={range.id}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => updateFormData({ budget: range.id })}
                  className={`
                    w-full px-4 py-3 rounded-xl text-left text-sm md:text-base font-medium 
                    transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1
                  `}
                  style={{
                    backgroundColor: isSelected ? accentColor : 'transparent',
                    color: isSelected ? 'white' : '#374151',
                    border: isSelected ? 'none' : '2px solid #e5e7eb',
                    boxShadow: isSelected ? `0 4px 12px ${accentColor}30` : 'none',
                  }}
                >
                  {range.label}
                </motion.button>
              )
            })}
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div 
          variants={fadeInUp}
          className="bg-white rounded-2xl p-5 md:p-6 shadow-soft"
        >
          <h3 className="text-lg md:text-xl font-bold text-text-dark mb-4">
            {t('newForm.budgetContact.contact')}
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {t('newForm.budgetContact.name')} *
              </label>
              <input
                type="text"
                value={formData.contact.name}
                onChange={(e) => handleContactChange('name', e.target.value)}
                placeholder="Jean Dupont"
                required
                className={inputClasses}
                style={{
                  borderColor: formData.contact.name ? accentColor : undefined,
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {t('newForm.budgetContact.email')} *
              </label>
              <input
                type="email"
                value={formData.contact.email}
                onChange={(e) => handleContactChange('email', e.target.value)}
                placeholder="jean@entreprise.com"
                required
                className={inputClasses}
                style={{
                  borderColor: formData.contact.email ? accentColor : undefined,
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {t('newForm.budgetContact.role')}
              </label>
              <input
                type="text"
                value={formData.contact.role}
                onChange={(e) => handleContactChange('role', e.target.value)}
                placeholder={t('newForm.budgetContact.rolePlaceholder')}
                className={inputClasses}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {t('newForm.budgetContact.phone')}
              </label>
              <input
                type="tel"
                value={formData.contact.phone}
                onChange={(e) => handleContactChange('phone', e.target.value)}
                placeholder="+33 6 12 34 56 78"
                className={inputClasses}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {t('newForm.budgetContact.message')}
              </label>
              <textarea
                value={formData.contact.message}
                onChange={(e) => handleContactChange('message', e.target.value)}
                placeholder={t('newForm.budgetContact.messagePlaceholder')}
                rows={3}
                className={`${inputClasses} resize-none`}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

