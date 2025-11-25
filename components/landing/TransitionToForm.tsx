'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Button from '@/components/ui/Button'
import { fadeInUp, staggerContainer } from '@/lib/animations'

const stepHighlights = [
  { title: 'Profil & objectifs', detail: 'Écoles, universités, entreprises' },
  { title: 'Format idéal', detail: 'Learning expedition, séminaire, events' },
  { title: 'Logistique premium', detail: 'Groupes, dates, durée, budget' },
]

export default function TransitionToForm() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const scrollToForm = () => {
    const formSection = document.getElementById('form-section')
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section ref={ref} className="relative overflow-hidden bg-rusker-blue py-16 md:py-20 lg:py-32">
      {/* Animated background with subtle white cloud blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(255,255,255,0.1)_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_rgba(255,255,255,0.08)_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.06)_0%,_transparent_50%)]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 md:px-6 text-center">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          <motion.h2
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                },
              },
            }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight px-2"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent"
        >
              PRÊTS À VIVRE{' '}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.9 }}
              transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="bg-gradient-to-r from-white via-yellow-200/90 to-white bg-clip-text text-transparent"
            >
              BARCELONE
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="bg-gradient-to-r from-white/80 via-white to-white bg-clip-text text-transparent"
            >
              {' '}AUTREMENT ?
            </motion.span>
        </motion.h2>
        
        <motion.p
          variants={fadeInUp}
            transition={{ delay: 0.5 }}
            className="text-base md:text-xl lg:text-2xl mb-6 md:mb-10 text-white/95 px-2"
        >
          Nos équipes conçoivent des expériences sur mesure pour chaque objectif et chaque groupe.
        </motion.p>

        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
            variants={{
              hidden: { opacity: 0, scale: 0.8, y: 20 },
              visible: {
                opacity: 1,
                scale: 1,
                y: 0,
                transition: {
                  delay: 0.7,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                },
              },
            }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 0 0 rgba(255, 255, 255, 0.4)',
                  '0 0 0 10px rgba(255, 255, 255, 0)',
                  '0 0 0 0 rgba(255, 255, 255, 0)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="inline-block rounded-full"
        >
          <Button
            onClick={scrollToForm}
            variant="secondary"
            size="large"
                className="!bg-white !text-[#1a4d66] hover:!bg-yellow-50 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold !border-2 !border-[#1a4d66]/20 text-base sm:text-lg"
          >
            <span className="hidden sm:inline">Construire votre expérience</span>
            <span className="sm:hidden">Créer votre projet</span>
          </Button>
            </motion.div>
        </motion.div>

        <motion.div
            variants={staggerContainer}
          transition={{ delay: 0.3 }}
          className="mt-8 md:mt-12 grid gap-4 md:gap-6 md:grid-cols-3"
        >
          {stepHighlights.map((item, index) => (
              <motion.div
              key={item.title}
                variants={fadeInUp}
                whileHover={{ y: -6, scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="rounded-card border-2 border-white/40 bg-white/95 backdrop-blur-md p-4 md:p-6 text-left shadow-lg hover:shadow-xl hover:bg-white transition-all duration-300 hover:border-white/60"
            >
                <div className="mb-2 md:mb-3 text-xs md:text-sm font-semibold uppercase tracking-[0.2em] md:tracking-[0.3em] text-rusker-blue">
                Étape {index + 1}
              </div>
              <h3 className="text-lg md:text-xl font-bold text-text-dark">{item.title}</h3>
                <p className="mt-2 text-sm md:text-base text-gray-700">{item.detail}</p>
              </motion.div>
          ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

