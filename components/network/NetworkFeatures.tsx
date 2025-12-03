'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { getAssetPath } from '@/lib/utils'

const features = [
  {
    id: 'talentboard',
    title: 'Talentboard Barcelona',
    subtitle: 'Plateforme de recrutement',
    description: 'Connectez talents francophones et entreprises innovantes de Barcelone. Stages, VIE, CDI : trouvez votre opportunité.',
    highlights: [
      'Profils francophones qualifiés',
      'Startups & scale-ups partenaires',
      'Matching intelligent',
      'Accompagnement personnalisé',
    ],
    image: getAssetPath('/images/barcelona-feature.jpg'),
    cta: 'Accéder au Talentboard',
    stats: { value: '1000+', label: 'talents inscrits' },
    forTalents: true,
  },
  {
    id: 'events',
    title: 'French Tech Events',
    subtitle: 'Networking & inspiration',
    description: 'Afterworks, conférences, French Tech Nights : des événements mensuels pour connecter et inspirer la communauté.',
    highlights: [
      'Événements mensuels',
      'Speakers de qualité',
      'Networking ciblé',
      'Communauté engagée',
    ],
    image: getAssetPath('/images/events-hero.jpg'),
    cta: 'Voir les prochains événements',
    stats: { value: '50+', label: 'événements / an' },
    forTalents: false,
  },
]

export default function NetworkFeatures() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const scrollToForm = () => {
    const formSection = document.getElementById('network-cta')
    if (formSection) formSection.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section ref={ref} className="relative py-16 md:py-24 bg-gray-50 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle, #a61e3f 1px, transparent 1px)`,
        backgroundSize: '30px 30px'
      }} />

      <div className="relative max-w-7xl mx-auto px-4 md:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block text-rusker-network text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            Notre offre
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-dark mb-4">
            Deux façons de
            <span className="text-rusker-network"> se connecter</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Que vous soyez talent ou entreprise, rejoignez l'écosystème le plus dynamique d'Europe du Sud.
          </p>
        </motion.div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              {/* Image header */}
              <div className="relative h-48 md:h-56 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${feature.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium border border-white/30">
                    {feature.subtitle}
                  </span>
                </div>

                {/* Stats badge */}
                <div className="absolute bottom-4 right-4 text-right">
                  <div className="text-2xl font-bold text-white">{feature.stats.value}</div>
                  <div className="text-xs text-white/80">{feature.stats.label}</div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <h3 className="text-2xl font-bold text-text-dark mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>

                {/* Highlights list */}
                <ul className="space-y-3 mb-8">
                  {feature.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-rusker-network/10 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-rusker-network" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700">{highlight}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <motion.button
                  onClick={scrollToForm}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 px-6 bg-rusker-network text-white font-semibold rounded-xl flex items-center justify-center gap-2 group/btn hover:bg-[#8a1935] transition-colors"
                >
                  {feature.cta}
                  <svg className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

