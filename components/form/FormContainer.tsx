'use client'

import { useState, useMemo, Suspense } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import { useI18n } from '@/lib/i18n'

// Types and utilities
import {
  Universe,
  TravelFormData,
  EventsFormData,
  defaultTravelFormData,
  defaultEventsFormData,
  validateTravelStep,
  validateEventsStep,
  submitForm,
} from '@/lib/formUtils'

// Step components
import Step0UniverseSelector from './Step0UniverseSelector'
import TravelStep1Identity from './travel/TravelStep1Identity'
import TravelStep2Experience from './travel/TravelStep2Experience'
import TravelStep3GroupDetails from './travel/TravelStep3GroupDetails'
import TravelStep4ThemesObjectives from './travel/TravelStep4ThemesObjectives'
import TravelStep5BudgetContact from './travel/TravelStep5BudgetContact'
import EventsStep1Identity from './events/EventsStep1Identity'
import EventsStep2EventType from './events/EventsStep2EventType'
import EventsStep3Details from './events/EventsStep3Details'
import EventsStep4Objective from './events/EventsStep4Objective'
import EventsStep5BudgetContact from './events/EventsStep5BudgetContact'
import ConfirmationScreen from './ConfirmationScreen'

// UI Constants
const UNIVERSE_COLORS = {
  travel: {
    primary: '#287497',
    light: '#bfeff4',
    dark: '#1f6580',
    gradient: 'from-travel via-travel-dark to-travel',
  },
  events: {
    primary: '#0b5d56',
    light: '#6ee3a8',
    dark: '#094a44',
    gradient: 'from-events via-events-dark to-events',
  },
} as const

interface FormContainerProps {
  initialUniverse?: Universe
}

// Inner component that uses useSearchParams
function FormContainerInner({ initialUniverse = null }: FormContainerProps) {
  const searchParams = useSearchParams()
  const { t } = useI18n()
  
  // Determine initial universe from props or URL params
  const getInitialUniverse = (): Universe => {
    if (initialUniverse) return initialUniverse
    const urlUniverse = searchParams.get('universe')
    if (urlUniverse === 'travel' || urlUniverse === 'events') return urlUniverse
    return null
  }

  // State
  const [universe, setUniverse] = useState<Universe>(getInitialUniverse())
  const [currentStep, setCurrentStep] = useState(universe ? 1 : 0)
  const [travelFormData, setTravelFormData] = useState<TravelFormData>(defaultTravelFormData)
  const [eventsFormData, setEventsFormData] = useState<EventsFormData>(defaultEventsFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Get current colors based on universe
  const colors = useMemo(() => {
    if (!universe) return UNIVERSE_COLORS.travel
    return UNIVERSE_COLORS[universe]
  }, [universe])

  // Total steps (5 for both Travel and Events)
  const totalSteps = 5

  // Handle universe selection
  const handleUniverseSelect = (selected: Universe) => {
    setUniverse(selected)
    setCurrentStep(1)
    setError(null)
  }

  // Update form data
  const updateTravelFormData = (updates: Partial<TravelFormData>) => {
    setTravelFormData(prev => ({ ...prev, ...updates }))
  }

  const updateEventsFormData = (updates: Partial<EventsFormData>) => {
    setEventsFormData(prev => ({ ...prev, ...updates }))
  }

  // Navigation
  const nextStep = () => {
    const isValid = universe === 'travel'
      ? validateTravelStep(currentStep, travelFormData)
      : validateEventsStep(currentStep, eventsFormData)

    if (isValid) {
      if (currentStep < totalSteps) {
        setCurrentStep(prev => prev + 1)
        setError(null)
      } else {
        handleSubmit()
      }
    } else {
      setError(t('newForm.errors.fillRequired'))
    }
  }

  // Auto-advance without validation (for steps that auto-advance after selection)
  const autoAdvance = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1)
      setError(null)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
      setError(null)
    } else if (currentStep === 1 && !initialUniverse) {
      // Go back to universe selection only if not pre-selected
      setUniverse(null)
      setCurrentStep(0)
      setError(null)
    }
  }

  // Handle form submission
  const handleSubmit = async () => {
    setIsSubmitting(true)
    setError(null)

    const formData = universe === 'travel' ? travelFormData : eventsFormData
    const success = await submitForm(formData)

    if (success) {
      setIsSubmitted(true)
    } else {
      setError(t('newForm.errors.submitError'))
      setIsSubmitting(false)
    }
  }

  // Check if current step is valid for enabling next button
  const isCurrentStepValid = useMemo(() => {
    if (!universe) return false
    return universe === 'travel'
      ? validateTravelStep(currentStep, travelFormData)
      : validateEventsStep(currentStep, eventsFormData)
  }, [universe, currentStep, travelFormData, eventsFormData])

  // Show confirmation screen
  if (isSubmitted) {
    return <ConfirmationScreen accentColor={colors.primary} />
  }

  // Progress calculation
  const progress = currentStep === 0 ? 0 : (currentStep / totalSteps) * 100

  // Step titles for breadcrumb
  const getStepTitle = () => {
    if (currentStep === 0) return t('newForm.universeSelector.title')
    if (universe === 'travel') {
      return t(`newForm.stepTitles.travel.${currentStep}`)
    } else {
      return t(`newForm.stepTitles.events.${currentStep}`)
    }
  }

  return (
    <section id="form-section" className="relative min-h-screen bg-gradient-to-b from-white via-gray-50/50 to-white">
      {/* Animated background elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.03, 0.06, 0.03],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-3xl"
          style={{ backgroundColor: colors.primary }}
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.03, 0.06, 0.03],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
          className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full blur-3xl"
          style={{ backgroundColor: colors.primary }}
        />
      </div>

      {/* Progress Bar - Only show when universe is selected */}
      {universe && currentStep > 0 && (
        <div 
          className="sticky top-0 z-50 backdrop-blur-md border-b"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderColor: `${colors.primary}20`,
          }}
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
            {/* Step indicator */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span 
                  className="text-sm font-bold px-2.5 py-1 rounded-full text-white"
                  style={{ backgroundColor: colors.primary }}
                >
                  {currentStep}/{totalSteps}
                </span>
                <span className="text-sm font-medium text-gray-600 hidden sm:inline">
                  {getStepTitle()}
                </span>
              </div>
              <span 
                className="text-sm font-semibold"
                style={{ color: colors.primary }}
              >
                {Math.round(progress)}%
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="h-full rounded-full"
                style={{ backgroundColor: colors.primary }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Form Content */}
      <div className="relative max-w-5xl mx-auto px-4 md:px-6 py-6 md:py-10 min-h-[calc(100vh-140px)] flex flex-col">
        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 bg-red-50 border-l-4 border-red-400 rounded-lg text-red-700"
            >
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">{error}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Steps Container */}
        <div className="flex-1 flex flex-col pb-24 md:pb-20">
          <AnimatePresence mode="wait">
            {/* Step 0: Universe Selection */}
            {currentStep === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="flex-1 flex items-center justify-center py-8"
              >
                <Step0UniverseSelector onSelect={handleUniverseSelect} />
              </motion.div>
            )}

            {/* Travel Steps */}
            {universe === 'travel' && currentStep === 1 && (
              <motion.div
                key="travel-step1"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
              >
                <TravelStep1Identity
                  formData={travelFormData}
                  updateFormData={updateTravelFormData}
                  onNext={autoAdvance}
                  accentColor={colors.primary}
                />
              </motion.div>
            )}
            {universe === 'travel' && currentStep === 2 && (
              <motion.div
                key="travel-step2"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
              >
                <TravelStep2Experience
                  formData={travelFormData}
                  updateFormData={updateTravelFormData}
                  onNext={autoAdvance}
                  accentColor={colors.primary}
                />
              </motion.div>
            )}
            {universe === 'travel' && currentStep === 3 && (
              <motion.div
                key="travel-step3"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
              >
                <TravelStep3GroupDetails
                  formData={travelFormData}
                  updateFormData={updateTravelFormData}
                  accentColor={colors.primary}
                />
              </motion.div>
            )}
            {universe === 'travel' && currentStep === 4 && (
              <motion.div
                key="travel-step4"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
              >
                <TravelStep4ThemesObjectives
                  formData={travelFormData}
                  updateFormData={updateTravelFormData}
                  accentColor={colors.primary}
                />
              </motion.div>
            )}
            {universe === 'travel' && currentStep === 5 && (
              <motion.div
                key="travel-step5"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
              >
                <TravelStep5BudgetContact
                  formData={travelFormData}
                  updateFormData={updateTravelFormData}
                  accentColor={colors.primary}
                  isSubmitting={isSubmitting}
                />
              </motion.div>
            )}

            {/* Events Steps */}
            {universe === 'events' && currentStep === 1 && (
              <motion.div
                key="events-step1"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
              >
                <EventsStep1Identity
                  formData={eventsFormData}
                  updateFormData={updateEventsFormData}
                  onNext={autoAdvance}
                  accentColor={colors.primary}
                />
              </motion.div>
            )}
            {universe === 'events' && currentStep === 2 && (
              <motion.div
                key="events-step2"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
              >
                <EventsStep2EventType
                  formData={eventsFormData}
                  updateFormData={updateEventsFormData}
                  accentColor={colors.primary}
                />
              </motion.div>
            )}
            {universe === 'events' && currentStep === 3 && (
              <motion.div
                key="events-step3"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
              >
                <EventsStep3Details
                  formData={eventsFormData}
                  updateFormData={updateEventsFormData}
                  accentColor={colors.primary}
                />
              </motion.div>
            )}
            {universe === 'events' && currentStep === 4 && (
              <motion.div
                key="events-step4"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
              >
                <EventsStep4Objective
                  formData={eventsFormData}
                  updateFormData={updateEventsFormData}
                  accentColor={colors.primary}
                />
              </motion.div>
            )}
            {universe === 'events' && currentStep === 5 && (
              <motion.div
                key="events-step5"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
              >
                <EventsStep5BudgetContact
                  formData={eventsFormData}
                  updateFormData={updateEventsFormData}
                  accentColor={colors.primary}
                  isSubmitting={isSubmitting}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Buttons - Only show when universe is selected and step > 0 */}
        {universe && currentStep > 0 && (
          <div 
            className="sticky bottom-0 left-0 right-0 backdrop-blur-md border-t py-3 sm:py-4 mt-auto z-10"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              borderColor: `${colors.primary}15`,
            }}
          >
            <div className="max-w-5xl mx-auto px-3 sm:px-4 md:px-6">
              <div className="flex justify-between gap-3 max-w-lg mx-auto">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={prevStep}
                  className="flex-1 py-3 px-6 rounded-xl font-semibold border-2 transition-all duration-200"
                  style={{
                    borderColor: colors.primary,
                    color: colors.primary,
                  }}
                >
                  {t('newForm.navigation.back')}
                </motion.button>
                <motion.button
                  whileHover={isCurrentStepValid && !isSubmitting ? { scale: 1.02 } : undefined}
                  whileTap={isCurrentStepValid && !isSubmitting ? { scale: 0.98 } : undefined}
                  onClick={nextStep}
                  disabled={!isCurrentStepValid || isSubmitting}
                  className={`
                    flex-1 py-3 px-6 rounded-xl font-semibold text-white transition-all duration-200
                    ${!isCurrentStepValid || isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                  style={{
                    backgroundColor: colors.primary,
                    boxShadow: isCurrentStepValid && !isSubmitting 
                      ? `0 4px 14px ${colors.primary}40` 
                      : 'none',
                  }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      {t('newForm.navigation.submitting')}
                    </span>
                  ) : currentStep === totalSteps ? (
                    t('newForm.navigation.submit')
                  ) : (
                    t('newForm.navigation.continue')
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

// Main export with Suspense wrapper
export default function FormContainer({ initialUniverse = null }: FormContainerProps) {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-travel border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <FormContainerInner initialUniverse={initialUniverse} />
    </Suspense>
  )
}
