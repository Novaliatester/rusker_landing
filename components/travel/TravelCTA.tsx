'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useI18n } from '@/lib/i18n'

export default function TravelCTA() {
  const { t } = useI18n()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [isHovered, setIsHovered] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Navigate to form with email pre-filled
    router.push(`/form?email=${encodeURIComponent(email)}&source=travel`)
  }

  const goToForm = () => {
    router.push('/form?source=travel')
  }

  return (
    <section id="travel-cta" ref={ref} className="relative py-20 md:py-32 bg-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-rusker-travel/20 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(40,116,151,0.08),_transparent_50%)]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rusker-travel/10 text-rusker-travel text-sm font-semibold mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-rusker-travel animate-pulse" />
            {t('travel.ctaSection.badge')}
          </motion.div>

          {/* Headline */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-text-dark mb-6 leading-[1.1] px-2">
            {t('travel.ctaSection.headline1')}
            <span className="block text-rusker-travel">{t('travel.ctaSection.headline2')}</span>
          </h2>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            {t('travel.ctaSection.description')}
          </p>

          {/* Quick email capture or direct CTA */}
          <div className="flex flex-col items-center gap-4">
            <motion.button
              onClick={goToForm}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-10 py-5 bg-rusker-travel text-white font-bold text-lg rounded-full overflow-hidden shadow-xl shadow-rusker-travel/30"
            >
              {/* Animated background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#1f6580] via-rusker-travel to-[#1f6580]"
                animate={{
                  x: isHovered ? ['0%', '100%'] : '0%',
                }}
                transition={{ duration: 0.6 }}
              />
              
              <span className="relative z-10 flex items-center gap-3">
                {t('travel.ctaSection.button')}
                <motion.svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ x: isHovered ? 4 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </motion.svg>
              </span>
            </motion.button>

            {/* OR divider */}
            <div className="flex items-center gap-4 w-full max-w-md">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-gray-400 text-sm">{t('travel.ctaSection.or')}</span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            {/* Email quick capture */}
            <form onSubmit={handleSubmit} className="w-full max-w-md">
              <div className="flex gap-2 p-2 bg-gray-50 rounded-full border border-gray-200 focus-within:border-rusker-travel focus-within:ring-2 focus-within:ring-rusker-travel/20 transition-all">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('travel.ctaSection.emailPlaceholder')}
                  className="flex-1 px-4 py-2 bg-transparent text-text-dark placeholder:text-gray-400 focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  className="px-5 py-2 bg-rusker-travel text-white font-semibold rounded-full hover:bg-[#1f6580] transition-colors flex-shrink-0"
                >
                  {t('travel.ctaSection.start')}
                </button>
              </div>
            </form>
          </div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 text-gray-500 text-sm"
          >
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {t('cta.trustIndicators.free')}
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {t('cta.trustIndicators.personalized')}
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {t('cta.trustIndicators.quote48h')}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

