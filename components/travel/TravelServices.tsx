'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useMemo } from 'react'
import { useI18n } from '@/lib/i18n'

export default function TravelServices() {
  const { t } = useI18n()
  
  const services = useMemo(() => [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    title: t('travel.services.items.0.title'),
    description: t('travel.services.items.0.description'),
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: t('travel.services.items.1.title'),
    description: t('travel.services.items.1.description'),
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
      </svg>
    ),
    title: t('travel.services.items.2.title'),
    description: t('travel.services.items.2.description'),
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
      </svg>
    ),
    title: t('travel.services.items.3.title'),
    description: t('travel.services.items.3.description'),
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
      </svg>
    ),
    title: t('travel.services.items.4.title'),
    description: t('travel.services.items.4.description'),
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    title: t('travel.services.items.5.title'),
    description: t('travel.services.items.5.description'),
  },
  ], [t])
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="relative py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block text-rusker-travel text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            {t('travel.services.badge')}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-dark mb-4 leading-[1.1] px-2">
            {t('travel.services.headline1')}
            <span className="text-rusker-travel">{t('travel.services.headline2')}</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {t('travel.services.description')}
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group p-6 md:p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:border-rusker-travel/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-rusker-travel/10 text-rusker-travel flex items-center justify-center mb-4 group-hover:bg-rusker-travel group-hover:text-white transition-colors duration-300">
                {service.icon}
              </div>
              <h3 className="text-lg md:text-xl font-bold text-text-dark mb-2 group-hover:text-rusker-travel transition-colors leading-[1.2] break-words">
                {service.title}
              </h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-gray-500 text-sm mb-4">
            + accompagnement personnalisé par un chef de projet dédié
          </p>
        </motion.div>
      </div>
    </section>
  )
}

