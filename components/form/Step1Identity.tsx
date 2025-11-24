'use client'

import { motion } from 'framer-motion'
import Block from '@/components/ui/Block'
import { FormData } from '@/lib/formUtils'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import { SchoolIcon, CompanyIcon } from '@/components/ui/Icons'

interface Step1IdentityProps {
  formData: FormData
  updateFormData: (updates: Partial<FormData>) => void
  onNext: (skipValidation?: boolean) => void
}

export default function Step1Identity({ formData, updateFormData, onNext }: Step1IdentityProps) {
  const handleSelect = (identity: 'school' | 'company') => {
    // Update form data
    updateFormData({ identity })
    // Auto-advance to next step after a short delay to show selection animation
    // Pass true to skip validation since we know identity is being set
    setTimeout(() => {
      onNext(true)
    }, 300)
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className="w-full"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center text-text-dark">
        Qui êtes-vous ?
      </h2>
      <p className="text-base text-gray-600 text-center mb-6">
        Sélectionnez votre profil pour commencer
      </p>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
      >
        <motion.div variants={fadeInUp} className="h-full">
          <Block
            selected={formData.identity === 'school'}
            onClick={() => handleSelect('school')}
            icon={<div className="w-[88px] h-[88px]"><SchoolIcon /></div>}
            className="text-center p-10 min-h-[280px] flex flex-col justify-center"
            role="button"
            aria-label="Sélectionner École/Université"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                handleSelect('school')
              }
            }}
          >
            <h3 className={`text-3xl font-bold mb-5 ${formData.identity === 'school' ? 'text-white' : 'text-text-dark'}`}>École/Université</h3>
            <p className={`text-lg opacity-90 ${formData.identity === 'school' ? 'text-white' : 'text-gray-600'}`}>
              Vous organisez un séjour pour vos étudiants
            </p>
          </Block>
        </motion.div>

        <motion.div variants={fadeInUp} className="h-full">
          <Block
            selected={formData.identity === 'company'}
            onClick={() => handleSelect('company')}
            icon={<div className="w-[88px] h-[88px]"><CompanyIcon /></div>}
            className="text-center p-10 min-h-[280px] flex flex-col justify-center"
            role="button"
            aria-label="Sélectionner Entreprise/Organisation"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                handleSelect('company')
              }
            }}
          >
            <h3 className={`text-3xl font-bold mb-5 ${formData.identity === 'company' ? 'text-white' : 'text-text-dark'}`}>Entreprise/Organisation</h3>
            <p className={`text-lg opacity-90 ${formData.identity === 'company' ? 'text-white' : 'text-gray-600'}`}>
              Vous planifiez un événement ou un séminaire
            </p>
          </Block>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

