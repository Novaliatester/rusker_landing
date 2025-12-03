'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { getAssetPath } from '@/lib/utils'

export default function EventsTestimonial() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const scrollToForm = () => {
    const formSection = document.getElementById('events-cta')
    if (formSection) formSection.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section ref={ref} className="relative py-16 md:py-24 bg-gradient-to-br from-[#0b5d56] via-[#094a44] to-[#042a27] overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,_rgba(255,255,255,0.08),_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,_rgba(255,255,255,0.05),_transparent_50%)]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={getAssetPath('/images/events-hero.jpg')}
                alt="AI Summit Barcelona"
                className="w-full h-64 md:h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              
              {/* Stats overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                <div className="text-white">
                  <div className="text-3xl font-bold">1200+</div>
                  <div className="text-sm text-white/80">participants</div>
                </div>
                <div className="text-white text-right">
                  <div className="text-3xl font-bold">80+</div>
                  <div className="text-sm text-white/80">speakers</div>
                </div>
                <div className="text-white text-right">
                  <div className="text-3xl font-bold">3</div>
                  <div className="text-sm text-white/80">jours</div>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute -top-4 -right-4 bg-white rounded-xl px-4 py-3 shadow-xl"
            >
              <img
                src={getAssetPath('/images/logos/ai-summit.svg')}
                alt="AI Summit"
                className="h-8 w-auto"
              />
            </motion.div>
          </motion.div>

          {/* Content side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <span className="inline-block text-emerald-300 text-sm font-semibold tracking-[0.2em] uppercase mb-4">
              Événement signature
            </span>
            
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">
              AI Summit Barcelona
              <span className="block text-white/70 text-xl md:text-2xl mt-2">L'événement IA de référence en Europe du Sud</span>
            </h2>

            <blockquote className="text-lg md:text-xl text-white/90 italic mb-6 leading-relaxed border-l-4 border-emerald-400 pl-4">
              "Un événement qui a positionné Barcelone comme hub majeur de l'IA en Europe. Networking exceptionnel et contenu de haute qualité."
            </blockquote>

            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-white font-bold">JL</span>
              </div>
              <div>
                <div className="text-white font-semibold">Jean-Luc Martinez</div>
                <div className="text-white/60 text-sm">CTO, Participant AI Summit 2024</div>
              </div>
            </div>

            {/* Key results */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { label: 'NPS Score', value: '72' },
                { label: 'Couverture média', value: '50+' },
                { label: 'Partenariats créés', value: '200+' },
              ].map((stat, index) => (
                <div key={index} className="text-center p-3 rounded-lg bg-white/10 backdrop-blur-sm">
                  <div className="text-xl md:text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-white/60">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <motion.button
              onClick={scrollToForm}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#0b5d56] font-semibold rounded-full hover:bg-emerald-50 transition-colors"
            >
              Créer un événement similaire
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

