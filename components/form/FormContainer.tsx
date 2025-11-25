'use client'

import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import ProgressBar from '@/components/ui/ProgressBar'
import Button from '@/components/ui/Button'
import Step1Identity from './Step1Identity'
import Step2ExperienceType from './Step2ExperienceType'
import Step3GroupDetails from './Step3GroupDetails'
import Step4ThemesObjectives from './Step4ThemesObjectives'
import Step5BudgetContact from './Step5BudgetContact'
import ConfirmationScreen from './ConfirmationScreen'
import { FormData, defaultFormData, validateStep, submitForm } from '@/lib/formUtils'
import { fadeInUp, staggerContainer } from '@/lib/animations'

const stepDescriptions = {
  1: {
    title: 'Identité du porteur de projet',
    detail: 'Écoles, universités, entreprises ou organisations',
  },
  2: {
    title: 'Type d\'expérience',
    detail: 'Learning expeditions, séminaires, événements, networking',
  },
  3: {
    title: 'Logistique & timing',
    detail: 'Taille du groupe, dates, durée idéale',
  },
  4: {
    title: 'Thèmes & objectifs',
    detail: 'Innovation, tech, culture, networking… sélection multiple',
  },
  5: {
    title: 'Budget & contact',
    detail: 'Fourchette budgétaire et coordonnées pour un suivi rapide',
  },
}

export default function FormContainer() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(defaultFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [timeOnStep, setTimeOnStep] = useState(0)
  const stepStartTimeRef = useRef<number>(Date.now())
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }))
  }

  // Clear error when on step 1
  useEffect(() => {
    if (currentStep === 1) {
      setError(null)
    }
  }, [currentStep])

  // Track time spent on current step
  useEffect(() => {
    stepStartTimeRef.current = Date.now()
    setTimeOnStep(0)
    
    const interval = setInterval(() => {
      setTimeOnStep(Math.floor((Date.now() - stepStartTimeRef.current) / 1000))
    }, 1000)

    return () => clearInterval(interval)
  }, [currentStep])

  const nextStep = (skipValidationForStep1 = false) => {
    // For step 1, skip validation since identity is set via card click
    if (currentStep === 1 && skipValidationForStep1) {
      setCurrentStep(2)
      setError(null)
      return
    }
    
    if (validateStep(currentStep, formData)) {
      if (currentStep < 5) {
        setCurrentStep(prev => prev + 1)
        setError(null)
      } else {
        handleFinalSubmit()
      }
    } else {
      setError('Veuillez remplir tous les champs requis')
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
      setError(null)
    }
  }

  const handleFinalSubmit = async () => {
    setIsSubmitting(true)
    setError(null)
    
    const success = await submitForm(formData)
    
    if (success) {
      setIsSubmitted(true)
    } else {
      setError('Une erreur est survenue. Veuillez réessayer.')
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return <ConfirmationScreen />
  }

  const encouragementMessages = {
    1: "C'est parti ! Commençons par vous connaître",
    2: "Excellent ! Définissons votre expérience idéale",
    3: "Parfait ! Passons aux détails pratiques",
    4: "Presque terminé ! Quels sont vos objectifs ?",
    5: "Dernière étape ! Finalisons votre demande",
  }

  return (
    <section
      id="form-section"
      ref={ref}
      className="relative min-h-screen bg-gradient-to-b from-white via-[#f8fbfc] to-white"
    >
      {/* Animated background elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-rusker-blue/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-rusker-blue/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Progress Bar - Enhanced */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200/50 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-2 sm:py-3">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-1.5 sm:space-y-2"
          >
            {/* Encouragement message */}
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ 
                opacity: 1, 
                y: 0, 
                scale: 1,
                ...(timeOnStep > 10 ? {
                  scale: [1, 1.02, 1],
                } : {})
              }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ 
                duration: 0.4,
                ...(timeOnStep > 10 ? {
                  scale: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                } : {})
              }}
              className="text-center"
            >
              <motion.p 
                className="text-sm sm:text-base md:text-lg font-semibold text-rusker-blue"
                animate={timeOnStep > 15 ? {
                  color: ["#1a6b8a", "#2a8bb0", "#1a6b8a"],
                } : {}}
                transition={timeOnStep > 15 ? {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                } : {}}
              >
                {encouragementMessages[currentStep as keyof typeof encouragementMessages]}
                {timeOnStep > 20 && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="ml-2 inline-block"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rusker-blue">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </motion.span>
                )}
              </motion.p>
            </motion.div>
            
            {/* Progress bar */}
            <motion.div
              variants={fadeInUp}
              className="relative"
            >
              <ProgressBar currentStep={currentStep} totalSteps={5} />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Form Content */}
      <div className="relative max-w-5xl mx-auto px-4 md:px-6 py-4 min-h-[calc(100vh-140px)] md:min-h-[calc(100vh-100px)] flex flex-col">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-6 p-4 bg-red-50 border-l-4 border-red-400 rounded-lg text-red-700 shadow-sm"
            role="alert"
          >
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">{error}</span>
            </div>
          </motion.div>
        )}


        <div className="flex-1 flex flex-col relative pb-24 md:pb-20">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 30, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -30, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <Step1Identity
                  formData={formData}
                  updateFormData={updateFormData}
                  onNext={nextStep}
                />
              </motion.div>
            )}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 30, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -30, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <Step2ExperienceType
                  formData={formData}
                  updateFormData={updateFormData}
                  onNext={nextStep}
                  onPrev={prevStep}
                />
              </motion.div>
            )}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 30, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -30, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <Step3GroupDetails
                  formData={formData}
                  updateFormData={updateFormData}
                  onNext={nextStep}
                  onPrev={prevStep}
                />
              </motion.div>
            )}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 30, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -30, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <Step4ThemesObjectives
                  formData={formData}
                  updateFormData={updateFormData}
                  onNext={nextStep}
                  onPrev={prevStep}
                />
              </motion.div>
            )}
            {currentStep === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 30, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -30, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <Step5BudgetContact
                  formData={formData}
                  updateFormData={updateFormData}
                  onNext={nextStep}
                  onPrev={prevStep}
                  isSubmitting={isSubmitting}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Fixed button area at bottom */}
        {currentStep > 1 && (
          <div className="sticky bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200/50 py-2 sm:py-3 md:py-4 mt-auto z-10">
            <div className="max-w-5xl mx-auto px-3 sm:px-4 md:px-6">
              <div className="flex justify-between gap-2 sm:gap-3 max-w-md mx-auto">
                <Button
                  onClick={prevStep}
                  variant="outline"
                  size="large"
                  className="min-h-[44px] text-sm sm:text-base"
                >
                  Retour
                </Button>
                <Button
                  onClick={nextStep}
                  variant="primary"
                  size="large"
                  disabled={
                    (currentStep === 2 && formData.experienceTypes.length === 0) ||
                    (currentStep === 3 && (
                      formData.groupSize === 0 ||
                      !formData.dates.start ||
                      formData.duration === 0
                    )) ||
                    (currentStep === 4 && (formData.themes.length === 0 || formData.objectives.length === 0)) ||
                    (currentStep === 5 && (
                      !formData.budget ||
                      !formData.contact.name ||
                      !formData.contact.email ||
                      isSubmitting
                    ))
                  }
                  className="bg-rusker-blue hover:bg-[#1f5a75] min-h-[44px] text-sm sm:text-base"
                >
                  {currentStep === 5 ? (isSubmitting ? 'Envoi...' : 'Envoyer') : 'Continuer'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
