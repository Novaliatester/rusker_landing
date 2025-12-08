'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { getAssetPath } from '@/lib/utils'
import { useI18n } from '@/lib/i18n'

export default function TravelHero() {
  const { t } = useI18n()
  const [isLoaded, setIsLoaded] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [useVideo, setUseVideo] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const playAttempted = useRef(false)

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

  useEffect(() => {
    if (!useVideo) return
    
    const video = videoRef.current
    if (!video) return

    video.muted = true
    video.playsInline = true
    video.loop = true
    video.preload = 'auto'

    const attemptPlay = async () => {
      if (playAttempted.current) return
      try {
        if (video.paused) {
          playAttempted.current = true
          await video.play()
          setVideoLoaded(true)
        }
      } catch (error) {
        console.log('Video play failed:', error)
        setUseVideo(false)
      }
    }

    video.addEventListener('loadeddata', attemptPlay, { once: true })
    video.addEventListener('canplay', attemptPlay, { once: true })
    attemptPlay()

    return () => {
      video.removeEventListener('loadeddata', attemptPlay)
      video.removeEventListener('canplay', attemptPlay)
    }
  }, [useVideo])

  const scrollToForm = () => {
    const formSection = document.getElementById('travel-cta')
    if (formSection) formSection.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden bg-travel"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        {useVideo ? (
          <motion.div style={{ scale: backgroundScale }} className="relative h-full w-full">
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              poster={getAssetPath('/images/travel-entreprises-0201.jpg')}
              className="h-full w-full object-cover"
            >
              <source src={getAssetPath('/images/hero-video.mp4')} type="video/mp4" />
            </video>
            <div className={`absolute inset-0 bg-travel transition-opacity duration-500 ${videoLoaded ? 'opacity-0' : 'opacity-100'}`} />
          </motion.div>
        ) : (
          <motion.div
            style={{ 
              scale: backgroundScale,
              backgroundImage: `url(${getAssetPath('/images/travel-entreprises-0201.jpg')})`
            }}
            className="h-full w-full bg-cover bg-center"
          />
        )}
      </div>

      {/* Gradient Overlays - Travel themed */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-travel/95 via-travel/60 to-transparent" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-travel/90 via-transparent to-travel/20" />


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
              <span className="h-2 w-2 rounded-full bg-travel-light animate-pulse" />
              <span className="text-xs md:text-sm font-medium tracking-wide text-white/90">
                {t('travel.badge')}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-6 px-2"
            >
              {t('travel.headline1')}
              <br />
              <span className="text-travel-light">
                {t('travel.headline2')}
              </span>
              <br />
              <span className="text-white/80">{t('travel.headline3')}</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg md:text-xl lg:text-2xl text-white/85 max-w-xl mb-10 leading-relaxed px-2"
            >
              {t('travel.description')}
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
                className="group relative px-8 py-4 bg-travel-light text-travel font-bold text-lg rounded-full overflow-hidden shadow-2xl shadow-black/20"
              >
                <span className="relative z-10 flex items-center gap-3">
                  {t('travel.cta')}
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
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>

              {/* Quick stat */}
              <div className="flex items-center gap-3 text-white/70 text-sm md:text-base">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-white/20 border-2 border-white/30 backdrop-blur-sm" />
                  ))}
                </div>
                <span>{t('travel.stat')}</span>
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
          <span className="text-xs tracking-widest uppercase">{t('travel.discover')}</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}

