'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { getAssetPath } from '@/lib/utils'

export default function NetworkHero() {
  const [isLoaded, setIsLoaded] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const textParallax = useTransform(scrollYProgress, [0, 1], [0, -80])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const scrollToForm = () => {
    const formSection = document.getElementById('network-cta')
    if (formSection) formSection.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden bg-[#4a0d1c]"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <motion.div
          style={{ 
            scale: backgroundScale,
            backgroundImage: `url(${getAssetPath('/images/network-meeting.jpg')})`
          }}
          className="h-full w-full bg-cover bg-center"
        />
      </div>

      {/* Gradient Overlays - Network themed (burgundy/red) */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#a61e3f]/95 via-[#a61e3f]/70 to-transparent" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#4a0d1c]/95 via-transparent to-[#a61e3f]/30" />

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="absolute top-6 left-6 md:top-10 md:left-10 z-20"
      >
        <div className="flex items-center gap-3">
          <img 
            src={getAssetPath('/images/logos/Logo 2025 (long) (white).png')} 
            alt="Rusker" 
            className="h-8 md:h-10 w-auto"
          />
          <div className="h-6 w-px bg-white/40" />
          <span className="text-white/90 font-semibold text-sm md:text-base tracking-wider">NETWORK</span>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div 
        style={{ y: textParallax, opacity }}
        className="absolute inset-0 z-10 flex items-center"
      >
        <div className="w-full px-6 md:px-16 lg:px-24">
          <div className="max-w-3xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isLoaded ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-4 py-2 border border-white/20"
            >
              <span className="h-2 w-2 rounded-full bg-rose-400 animate-pulse" />
              <span className="text-xs md:text-sm font-medium tracking-wide text-white/90">
                French Tech Barcelona & écosystème tech
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-6"
            >
              Connectez-vous
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-rose-200 to-white">
                à l'écosystème
              </span>
              <br />
              <span className="text-white/80">barcelonais</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg md:text-xl lg:text-2xl text-white/85 max-w-xl mb-10 leading-relaxed"
            >
              Talents, startups, entreprises : rejoignez la communauté francophone la plus dynamique d'Europe du Sud.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 items-start"
            >
              <motion.button
                onClick={scrollToForm}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-8 py-4 bg-white text-[#a61e3f] font-bold text-lg rounded-full overflow-hidden shadow-2xl shadow-black/20"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Rejoindre le réseau
                  <motion.svg 
                    className="w-5 h-5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </motion.svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-rose-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>

              {/* Quick stat */}
              <div className="flex items-center gap-3 text-white/70 text-sm md:text-base">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-white/20 border-2 border-white/30 backdrop-blur-sm" />
                  ))}
                </div>
                <span>200+ startups dans le réseau French Tech</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : {}}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-white/50"
        >
          <span className="text-xs tracking-widest uppercase">Découvrir</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}

