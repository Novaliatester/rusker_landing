'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { getAssetPath } from '@/lib/utils'

const eventTypes = [
  {
    id: 'corporate',
    title: 'Événements Corporate',
    subtitle: 'Séminaires & Lancements',
    description: 'Anniversaires d\'entreprise, lancements de produit, inaugurations : créez des moments forts pour votre marque.',
    features: [
      'Lieux d\'exception à Barcelone',
      'Scénographie sur mesure',
      'Production technique complète',
      'Couverture média & photo/vidéo',
    ],
    image: getAssetPath('/images/rusker-travel-events-network-0201.jpg'),
    cta: 'Créer mon événement corporate',
    stats: { value: '50+', label: 'événements réalisés' },
  },
  {
    id: 'public',
    title: 'Événements Publics',
    subtitle: 'Conférences & Summits',
    description: 'AI Summit, French Tech Nights, Retail Tech Talks : des événements qui rassemblent et inspirent.',
    features: [
      'Format conférence ou summit',
      'Speakers internationaux',
      'Networking facilité',
      'Amplification digitale',
    ],
    image: getAssetPath('/images/ai-summit-0201.jpg'),
    cta: 'Organiser une conférence',
    stats: { value: '1200+', label: 'participants au dernier Summit' },
  },
]

export default function EventsTypes() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const scrollToForm = () => {
    const formSection = document.getElementById('events-cta')
    if (formSection) formSection.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section ref={ref} className="relative py-16 md:py-24 bg-gray-50 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle, #0b5d56 1px, transparent 1px)`,
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
          <span className="inline-block text-rusker-events text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            Votre événement
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-dark mb-4">
            Quel format
            <span className="text-rusker-events"> vous correspond ?</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Corporate ou public, nous créons des expériences à fort impact.
          </p>
        </motion.div>

        {/* Event type cards */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {eventTypes.map((eventType, index) => (
            <motion.div
              key={eventType.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              {/* Image header */}
              <div className="relative h-48 md:h-56 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${eventType.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium border border-white/30">
                    {eventType.subtitle}
                  </span>
                </div>

                {/* Stats badge */}
                <div className="absolute bottom-4 right-4 text-right">
                  <div className="text-2xl font-bold text-white">{eventType.stats.value}</div>
                  <div className="text-xs text-white/80">{eventType.stats.label}</div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <h3 className="text-2xl font-bold text-text-dark mb-3">{eventType.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{eventType.description}</p>

                {/* Features list */}
                <ul className="space-y-3 mb-8">
                  {eventType.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-rusker-events/10 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-rusker-events" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <motion.button
                  onClick={scrollToForm}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 px-6 bg-rusker-events text-white font-semibold rounded-xl flex items-center justify-center gap-2 group/btn hover:bg-[#094a44] transition-colors"
                >
                  {eventType.cta}
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

