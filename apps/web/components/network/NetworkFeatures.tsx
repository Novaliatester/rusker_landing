'use client'

import { motion } from 'framer-motion'
import { getAssetPath } from '@/lib/utils'
import { useI18n } from '@/lib/i18n'

const viewport = { once: true, margin: '-100px' }

export default function NetworkFeatures() {
  const { t } = useI18n()

  const features = [
    {
      id: 'talentboard' as const,
      titleKey: 'network.featuresSection.talentboard.title',
      subtitleKey: 'network.featuresSection.talentboard.subtitle',
      descriptionKey: 'network.featuresSection.talentboard.description',
      highlightsKeys: ['network.featuresSection.talentboard.highlights.0', 'network.featuresSection.talentboard.highlights.1', 'network.featuresSection.talentboard.highlights.2', 'network.featuresSection.talentboard.highlights.3'],
      image: getAssetPath('/images/network-talentboard-barcelona-0201.jpg'),
      ctaKey: 'network.featuresSection.talentboard.cta',
      stats: { value: '1000+', labelKey: 'network.featuresSection.talentboard.statsLabel' },
    },
    {
      id: 'events' as const,
      titleKey: 'network.featuresSection.events.title',
      subtitleKey: 'network.featuresSection.events.subtitle',
      descriptionKey: 'network.featuresSection.events.description',
      highlightsKeys: ['network.featuresSection.events.highlights.0', 'network.featuresSection.events.highlights.1', 'network.featuresSection.events.highlights.2', 'network.featuresSection.events.highlights.3'],
      image: getAssetPath('/images/network-french-tech-events-0201.jpg'),
      ctaKey: 'network.featuresSection.events.cta',
      stats: { value: '50+', labelKey: 'network.featuresSection.events.statsLabel' },
    },
  ]

  const scrollToForm = () => {
    const formSection = document.getElementById('network-cta')
    if (formSection) formSection.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative py-16 md:py-24 bg-gray-50 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle, #a61e3f 1px, transparent 1px)`,
        backgroundSize: '30px 30px'
      }} />

      <div className="relative max-w-7xl mx-auto px-4 md:px-6">
        {/* Section header */}
        <motion.div
          data-scroll-reveal
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0, visibility: 'visible' }}
          viewport={viewport}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block text-rusker-network text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            {t('network.featuresSection.badge')}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-dark mb-4">
            {t('network.featuresSection.headline')}
            <span className="text-rusker-network"> {t('network.featuresSection.headlineHighlight')}</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {t('network.featuresSection.subtitle')}
          </p>
        </motion.div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              data-scroll-reveal
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0, visibility: 'visible' }}
              viewport={viewport}
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
                    {t(feature.subtitleKey)}
                  </span>
                </div>

                {/* Stats badge */}
                <div className="absolute bottom-4 right-4 text-right">
                  <div className="text-2xl font-bold text-white">{feature.stats.value}</div>
                  <div className="text-xs text-white/80">{t(feature.stats.labelKey)}</div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <h3 className="text-2xl font-bold text-text-dark mb-3">{t(feature.titleKey)}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{t(feature.descriptionKey)}</p>

                {/* Highlights list */}
                <ul className="space-y-3 mb-8">
                  {feature.highlightsKeys.map((highlightKey, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-rusker-network/10 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-rusker-network" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700">{t(highlightKey)}</span>
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
                  {t(feature.ctaKey)}
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

