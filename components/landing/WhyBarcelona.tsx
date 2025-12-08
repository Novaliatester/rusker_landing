'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useMemo, useEffect, useCallback } from 'react'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import { getAssetPath } from '@/lib/utils'
import { useI18n } from '@/lib/i18n'

export default function WhyBarcelona() {
  const { t } = useI18n()
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [direction, setDirection] = useState(1)
  
  const features = useMemo(() => [
    {
      title: t('whyBarcelona.features.creative.title'),
      description: t('whyBarcelona.features.creative.description'),
      image: getAssetPath('/images/accueil-une-energie-creative-unique-0201.jpg'),
      color: '#6ee3a8',
      highlights: [
        t('whyBarcelona.features.creative.highlights.0'),
        t('whyBarcelona.features.creative.highlights.1'),
        t('whyBarcelona.features.creative.highlights.2'),
        t('whyBarcelona.features.creative.highlights.3'),
      ],
      experience: t('whyBarcelona.features.creative.experience'),
    },
    {
      title: t('whyBarcelona.features.innovation.title'),
      description: t('whyBarcelona.features.innovation.description'),
      image: getAssetPath('/images/innovation-hub.jpg'),
      color: '#bfeff4',
      highlights: [
        t('whyBarcelona.features.innovation.highlights.0'),
        t('whyBarcelona.features.innovation.highlights.1'),
        t('whyBarcelona.features.innovation.highlights.2'),
        t('whyBarcelona.features.innovation.highlights.3'),
      ],
      experience: t('whyBarcelona.features.innovation.experience'),
    },
    {
      title: t('whyBarcelona.features.network.title'),
      description: t('whyBarcelona.features.network.description'),
      image: getAssetPath('/images/Communaute FR.png'),
      color: '#ffdfeb',
      highlights: [
        t('whyBarcelona.features.network.highlights.0'),
        t('whyBarcelona.features.network.highlights.1'),
        t('whyBarcelona.features.network.highlights.2'),
        t('whyBarcelona.features.network.highlights.3'),
      ],
      experience: t('whyBarcelona.features.network.experience'),
    },
    {
      title: t('whyBarcelona.features.lifestyle.title'),
      description: t('whyBarcelona.features.lifestyle.description'),
      image: getAssetPath('/images/Cadre de VIE BCN.png'),
      color: '#ffd699',
      highlights: [
        t('whyBarcelona.features.lifestyle.highlights.0'),
        t('whyBarcelona.features.lifestyle.highlights.1'),
        t('whyBarcelona.features.lifestyle.highlights.2'),
        t('whyBarcelona.features.lifestyle.highlights.3'),
      ],
      experience: t('whyBarcelona.features.lifestyle.experience'),
    },
  ], [t])

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  // Auto-advance timer
  useEffect(() => {
    if (isPaused || !isInView) return
    
    const timer = setInterval(() => {
      setDirection(1)
      setActiveIndex((prev) => (prev + 1) % features.length)
    }, 5000)
    
    return () => clearInterval(timer)
  }, [isPaused, isInView, features.length])

  const goNext = useCallback(() => {
    setDirection(1)
    setActiveIndex((prev) => (prev + 1) % features.length)
  }, [features.length])

  const goPrev = useCallback(() => {
    setDirection(-1)
    setActiveIndex((prev) => (prev - 1 + features.length) % features.length)
  }, [features.length])

  const activeFeature = features[activeIndex]

  return (
    <section 
      id="why-barcelona" 
      ref={ref} 
      className="relative overflow-hidden py-16 md:py-20 lg:py-32 bg-neutral-dark"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }} />

      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        {/* Header Section */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="mb-10 md:mb-14 text-center"
        >
          <motion.div variants={fadeInUp} className="mb-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-sm font-semibold uppercase tracking-widest text-white/80">
              <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
              {t('whyBarcelona.badge')}
            </span>
          </motion.div>
          
          <motion.h2
            variants={fadeInUp}
            className="mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.15]"
          >
            {t('whyBarcelona.headline')}{' '}
            <span style={{ color: '#bfeff4' }}>{t('whyBarcelona.innovation')}</span>
            ,{' '}
            <span style={{ color: '#6ee3a8' }}>{t('whyBarcelona.creativity')}</span>
            {' '}et{' '}
            <span style={{ color: '#ffdfeb' }}>{t('whyBarcelona.internationalCommunities')}</span>
            .
          </motion.h2>
        </motion.div>

        {/* Main Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="relative"
        >
          {/* Main content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-stretch">
            
            {/* Image Section */}
            <div className="relative h-[320px] sm:h-[400px] lg:h-[480px] rounded-2xl overflow-hidden">
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                >
                  <img
                    src={activeFeature.image}
                    alt={activeFeature.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-dark/60 via-transparent to-transparent" />
                </motion.div>
              </AnimatePresence>

              {/* Navigation arrows on image */}
              <div className="absolute bottom-4 right-4 flex gap-2">
                <button
                  onClick={goPrev}
                  className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 text-neutral-dark hover:bg-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={goNext}
                  className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 text-neutral-dark hover:bg-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Progress dots */}
              <div className="absolute bottom-4 left-4 flex gap-2">
                {features.map((feature, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setDirection(index > activeIndex ? 1 : -1)
                      setActiveIndex(index)
                    }}
                    className="relative w-2 h-2 rounded-full overflow-hidden"
                    style={{ 
                      backgroundColor: activeIndex === index ? feature.color : 'rgba(255,255,255,0.4)'
                    }}
                  >
                    {activeIndex === index && !isPaused && (
                      <motion.div
                        className="absolute inset-0 bg-white/50"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 5, ease: 'linear' }}
                        style={{ transformOrigin: 'left' }}
                        key={`dot-${activeIndex}`}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Content Section */}
            <div className="flex flex-col justify-center py-2 lg:py-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-5"
                >
                  {/* Counter and Title */}
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span 
                        className="text-sm font-bold px-3 py-1 rounded-full"
                        style={{ backgroundColor: activeFeature.color, color: '#2f3433' }}
                      >
                        {String(activeIndex + 1).padStart(2, '0')}
                      </span>
                      <div 
                        className="flex-1 h-px"
                        style={{ backgroundColor: `${activeFeature.color}40` }}
                      />
                    </div>
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
                      {activeFeature.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-base md:text-lg text-white/75 leading-relaxed">
                    {activeFeature.description}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-2.5">
                    {activeFeature.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div 
                          className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: activeFeature.color }}
                        />
                        <span className="text-sm md:text-base text-white/65 leading-relaxed">
                          {highlight}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Experience */}
                  <div 
                    className="p-4 rounded-xl"
                    style={{ 
                      backgroundColor: `${activeFeature.color}15`,
                      borderLeft: `3px solid ${activeFeature.color}`,
                    }}
                  >
                    <span className="text-xs font-semibold uppercase tracking-wider text-white/50 block mb-1">
                      {t('whyBarcelona.features.proposedExperience')}
                    </span>
                    <p className="text-sm md:text-base text-white/80 leading-relaxed">
                      {activeFeature.experience}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
