'use client'

import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import { getAssetPath } from '@/lib/utils'
import { useI18n } from '@/lib/i18n'

export default function ServicesPreview() {
  const { t } = useI18n()
  const router = useRouter()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [bubblePosition, setBubblePosition] = useState({ x: 0, y: 0 })
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [transitionColor, setTransitionColor] = useState<string | null>(null)
  const [transitionOrigin, setTransitionOrigin] = useState({ x: '50%', y: '50%' })
  
  const services = [
    {
      iconPath: getAssetPath('/images/2026 Rusker/Icons/Travel.png'),
      title: t('services.travel.title'),
      description: t('services.travel.description'),
      image: getAssetPath('/images/service-travel.jpg'),
      href: '/travel',
      color: '#236a89',
      colorLight: '#bfeff4',
    },
    {
      iconPath: getAssetPath('/images/2026 Rusker/Icons/Events.png'),
      title: t('services.events.title'),
      description: t('services.events.description'),
      image: getAssetPath('/images/events-hero.jpg'),
      href: '/events',
      color: '#0d5c4a',
      colorLight: '#6ee3a8',
    },
    {
      iconPath: getAssetPath('/images/2026 Rusker/Icons/Network.png'),
      title: t('services.network.title'),
      description: t('services.network.description'),
      image: getAssetPath('/images/barcelona-feature.jpg'),
      href: '/network',
      color: '#a61e40',
      colorLight: '#ffdfeb',
    },
  ]
  const sectionRef = useRef<HTMLElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  // Calculate bubble position relative to section from the actual card element
  const handleMouseEnter = (index: number) => {
    const card = cardRefs.current[index]
    const section = sectionRef.current
    
    if (card && section) {
      const cardRect = card.getBoundingClientRect()
      const sectionRect = section.getBoundingClientRect()
      
      // Calculate center of card relative to section
      const x = cardRect.left - sectionRect.left + cardRect.width / 2
      const y = cardRect.top - sectionRect.top + cardRect.height / 2
      
      setBubblePosition({ x, y })
    }
    
    setHoveredIndex(index)
  }

  const hoveredService = hoveredIndex !== null ? services[hoveredIndex] : null

  return (
    <section ref={sectionRef} className="relative bg-neutral-light py-16 md:py-28 lg:py-36 overflow-hidden">
      {/* Subtle decorative pattern for beige background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle, #2f3433 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }} />
      
      {/* Animated bubble background on hover */}
      <AnimatePresence>
        {hoveredService && !isTransitioning && (
          <motion.div
            key={hoveredIndex}
            initial={{ 
              scale: 0,
              opacity: 0,
            }}
            animate={{ 
              scale: 3,
              opacity: 1,
            }}
            exit={{ 
              scale: 0,
              opacity: 0,
            }}
            transition={{ 
              duration: 0.8,
              ease: [0.25, 0.1, 0.25, 1]
            }}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: '100vw',
              height: '100vw',
              left: bubblePosition.x,
              top: bubblePosition.y,
              transform: 'translate(-50%, -50%)',
              background: `radial-gradient(circle, ${hoveredService.colorLight} 0%, ${hoveredService.colorLight}90 40%, ${hoveredService.colorLight}50 70%, transparent 100%)`,
              zIndex: 0,
            }}
          />
        )}
      </AnimatePresence>
      
      {/* Page transition overlay */}
      <AnimatePresence>
        {isTransitioning && transitionColor && (
          <motion.div
            initial={{ 
              scale: 0,
              opacity: 0,
            }}
            animate={{ 
              scale: 8,
              opacity: 1,
            }}
            transition={{ 
              duration: 0.7,
              ease: [0.4, 0, 0.2, 1]
            }}
            className="fixed rounded-full pointer-events-none"
            style={{
              width: '100vw',
              height: '100vw',
              left: transitionOrigin.x,
              top: transitionOrigin.y,
              transform: 'translate(-50%, -50%)',
              backgroundColor: transitionColor,
              zIndex: 9999,
            }}
          />
        )}
      </AnimatePresence>
      
      <div className="relative mx-auto max-w-7xl px-4 md:px-6 z-10">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeInUp}
          className="mb-12 md:mb-16 lg:mb-24 text-center"
        >
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.1 }}
            className="mb-5 text-sm uppercase tracking-[0.4em] text-text-dark/60 font-semibold"
          >
            {t('services.title')}
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text-dark mb-4 md:mb-6 leading-[1.15]"
          >
            {t('services.headline')}{' '}
            <motion.span 
              className="relative inline-block cursor-pointer group/emphasis"
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.3, ease: 'easeOut' }
              }}
            >
              <motion.span 
                className="relative z-10 inline-block"
                style={{ color: hoveredService?.color || 'inherit' }}
              >
                {t('services.headlineEmphasis')}
              </motion.span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ delay: 0.6, duration: 0.6, ease: 'easeOut' }}
                className="absolute bottom-2 left-0 right-0 h-3 bg-text-dark/15 -z-0 origin-left"
                style={{ backgroundColor: hoveredService ? `${hoveredService.color}30` : undefined }}
              />
              {/* Pulsing dot indicators */}
              <motion.div
                className="absolute -left-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-text-dark/40 opacity-0 group-hover/emphasis:opacity-100"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <motion.div
                className="absolute -right-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-text-dark/40 opacity-0 group-hover/emphasis:opacity-100"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.5,
                }}
              />
            </motion.span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.3 }}
            className="mt-4 md:mt-6 text-base md:text-lg lg:text-xl text-text-dark/70 max-w-3xl mx-auto leading-relaxed"
          >
            {t('services.subtitle')}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-1 gap-6 md:gap-10 md:grid-cols-3"
        >
          {services.map((service, index) => {
            const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
              e.preventDefault()
              
              // Get click position for transition origin
              const rect = e.currentTarget.getBoundingClientRect()
              const x = rect.left + rect.width / 2
              const y = rect.top + rect.height / 2
              
              setTransitionOrigin({ x: `${x}px`, y: `${y}px` })
              setTransitionColor(service.color)
              setIsTransitioning(true)
              
              // Navigate after animation
              setTimeout(() => {
                router.push(service.href)
              }, 500)
            }
            
            return (
              <a
                key={index}
                href={service.href}
                onClick={handleClick}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <motion.div
                  ref={(el) => { cardRefs.current[index] = el }}
                variants={fadeInUp}
                whileHover={{ 
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.3, ease: 'easeOut' }
                }}
                  className="group relative overflow-hidden rounded-[20px] md:rounded-[24px] border border-gray-200/60 bg-white p-6 md:p-8 lg:p-10 shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] transition-all duration-500 cursor-pointer h-full"
                  style={{
                    ['--service-color' as string]: service.color,
                    ['--service-color-light' as string]: service.colorLight,
                  }}
              >
                  {/* Animated gradient overlay on hover */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(135deg, ${service.colorLight}50 0%, transparent 60%)`,
                    }}
                />
                
                {/* Subtle shine effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                </div>
                
                {/* Background Image with elegant overlay */}
                <div 
                    className="absolute inset-0 opacity-[0.02] group-hover:opacity-[0.06] transition-opacity duration-700"
                  style={{
                    backgroundImage: `url(${service.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'grayscale(100%)',
                  }}
                />
              
                {/* Animated border glow on hover */}
                  <div 
                    className="absolute inset-0 rounded-[20px] md:rounded-[24px] border-2 opacity-0 group-hover:opacity-100 transition-all duration-500"
                  style={{
                      borderColor: service.color,
                  }}
                />

                <div className="relative flex flex-col gap-7 h-full z-10">
                  {/* Enhanced Icon Container */}
                  <motion.div 
                      className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-xl md:rounded-2xl transition-all duration-500 relative overflow-hidden"
                      style={{
                        backgroundColor: `${service.colorLight}`,
                        color: service.color,
                      }}
                    whileHover={{ 
                      scale: 1.1,
                      rotate: [0, -5, 5, -5, 0],
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Icon background pattern */}
                      <div className="absolute inset-0 opacity-20" style={{
                        backgroundImage: `radial-gradient(circle, ${service.color}40 1px, transparent 1px)`,
                      backgroundSize: '8px 8px',
                    }} />
                      <div className="relative z-10 flex items-center justify-center">
                        <img 
                          src={service.iconPath} 
                          alt={service.title}
                          className="w-10 h-10 md:w-12 md:h-12 object-contain"
                        />
                    </div>
                  </motion.div>
                  
                  <div className="flex-1 space-y-3 md:space-y-4">
                      <h3 
                        className="text-xl md:text-2xl font-bold text-text-dark mb-2 transition-colors duration-500 leading-[1.2] group-hover:text-[var(--service-color)]"
                      >
                      {service.title}
                    </h3>
                      <p className="text-sm md:text-base text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                      {service.description}
                    </p>
                  </div>
                  
                  {/* Enhanced CTA */}
                  <motion.div 
                      className="mt-auto flex items-center gap-2 text-xs sm:text-sm font-semibold group-hover:gap-3 transition-all duration-500"
                      style={{ color: service.color }}
                    whileHover={{ x: 4 }}
                  >
                    <span className="relative">
                      <span className="hidden sm:inline">{t('common.explore')}</span>
                      <span className="sm:hidden">{t('common.learnMore')}</span>
                    </span>
                    <motion.svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      viewBox="0 0 24 24"
                      whileHover={{ x: 4 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </motion.svg>
                  </motion.div>
                </div>
              </motion.div>
              </a>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

