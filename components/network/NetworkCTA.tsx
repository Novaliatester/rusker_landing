'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { useI18n } from '@/lib/i18n'

export default function NetworkCTA() {
  const { t } = useI18n()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [isHoveredTalent, setIsHoveredTalent] = useState(false)
  const [isHoveredFrench, setIsHoveredFrench] = useState(false)

  return (
    <section id="network-cta" ref={ref} className="relative py-20 md:py-32 bg-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-rusker-network/20 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(166,30,63,0.08),_transparent_50%)]" />
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rusker-network/10 text-rusker-network text-sm font-semibold mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-rusker-network animate-pulse" />
            {t('network.ctaSection.badge')}
          </motion.div>

          {/* Headline */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-text-dark mb-6 leading-[1.1] px-2">
            {t('network.ctaSection.headline1')}
            <span className="block text-rusker-network">{t('network.ctaSection.headline2')}</span>
          </h2>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            {t('network.ctaSection.description')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            {/* Talent Board Button */}
            <motion.a
              href="https://www.talentboardbarcelona.com"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setIsHoveredTalent(true)}
              onMouseLeave={() => setIsHoveredTalent(false)}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-10 py-5 bg-rusker-network text-white font-bold text-lg rounded-full overflow-hidden shadow-xl shadow-rusker-network/30 w-full sm:w-auto"
            >
              {/* Animated background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#8a1935] via-rusker-network to-[#8a1935]"
                animate={{
                  x: isHoveredTalent ? ['0%', '100%'] : '0%',
                }}
                transition={{ duration: 0.6 }}
              />
              
              <span className="relative z-10 flex items-center justify-center gap-3">
                Talent Board
                <motion.svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ x: isHoveredTalent ? 4 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </motion.svg>
              </span>
            </motion.a>

            {/* French Tech Network Button */}
            <motion.a
              href="https://www.frenchtechbarcelona.com/adherer"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setIsHoveredFrench(true)}
              onMouseLeave={() => setIsHoveredFrench(false)}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-10 py-5 bg-rusker-network text-white font-bold text-lg rounded-full overflow-hidden shadow-xl shadow-rusker-network/30 w-full sm:w-auto"
            >
              {/* Animated background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#8a1935] via-rusker-network to-[#8a1935]"
                animate={{
                  x: isHoveredFrench ? ['0%', '100%'] : '0%',
                }}
                transition={{ duration: 0.6 }}
              />
              
              <span className="relative z-10 flex items-center justify-center gap-3">
                French Tech Network
                <motion.svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ x: isHoveredFrench ? 4 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </motion.svg>
              </span>
            </motion.a>
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
              {t('network.ctaSection.trustIndicators.free')}
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {t('network.ctaSection.trustIndicators.immediate')}
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {t('network.ctaSection.trustIndicators.official')}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

