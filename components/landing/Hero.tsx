'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import Button from '@/components/ui/Button'
// Animations are defined inline for specific layout needs

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [useVideo, setUseVideo] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.1])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -100])
  const textParallax = useTransform(scrollYProgress, [0, 1], [0, -50])

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
      try {
        if (video.paused) {
          await video.play()
          setVideoLoaded(true)
        }
      } catch (error) {
        console.log('Video play failed:', error)
      }
    }

    const handleCanPlay = () => {
      attemptPlay()
    }
    
    const handleLoadedData = () => {
      attemptPlay()
    }

    const handlePlay = () => {
      setVideoLoaded(true)
    }

    const handleError = () => {
      console.log('Video error, falling back to image')
      setUseVideo(false)
    }

    video.addEventListener('canplay', handleCanPlay)
    video.addEventListener('loadeddata', handleLoadedData)
    video.addEventListener('play', handlePlay)
    video.addEventListener('error', handleError)

    // Try to play immediately if already loaded
    if (video.readyState >= 3) {
      attemptPlay()
    } else {
      video.load()
    }

    // Multiple fallback attempts
    const timeouts = [
      setTimeout(() => attemptPlay(), 100),
      setTimeout(() => attemptPlay(), 500),
      setTimeout(() => attemptPlay(), 1000)
    ]

    return () => {
      timeouts.forEach(clearTimeout)
      video.removeEventListener('canplay', handleCanPlay)
      video.removeEventListener('loadeddata', handleLoadedData)
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('error', handleError)
    }
  }, [useVideo, videoLoaded])

  const scrollToForm = () => {
    const formSection = document.getElementById('form-section')
    if (formSection) formSection.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      {/* Background Layer */}
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
              onError={() => {
                console.log('Video error, using fallback')
                setUseVideo(false)
              }}
              onPlay={() => {
                setVideoLoaded(true)
              }}
              onLoadedMetadata={() => {
                const video = videoRef.current
                if (video && video.paused) {
                  video.play().catch((err) => {
                    console.log('Play error on loadedmetadata:', err)
                  })
                }
              }}
              onCanPlay={() => {
                const video = videoRef.current
                if (video && video.paused && !videoLoaded) {
                  video.play()
                    .then(() => setVideoLoaded(true))
                    .catch((err) => {
                      console.log('Play error on canplay:', err)
                    })
                }
              }}
              className={`h-full w-full object-cover transition-opacity duration-1000 ${
                videoLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <source src="/images/hero-video.mp4" type="video/mp4" />
            </video>
            {/* Fallback while loading */}
            <div
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
                videoLoaded ? 'opacity-0' : 'opacity-100'
              }`}
              style={{ backgroundImage: 'url(/images/hero-barcelona.jpg)' }}
            />
          </motion.div>
        ) : (
          <motion.div
            style={{ 
              scale: backgroundScale,
              backgroundImage: 'url(/images/hero-barcelona.jpg)'
            }}
            className="h-full w-full bg-cover bg-center"
          />
        )}
      </div>

      {/* Modern Gradient Overlays */}
      {/* Left gradient for text readability */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/80 via-black/40 to-transparent md:from-black/90 md:via-black/20" />
      {/* Bottom gradient for depth */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      
      {/* Decorative "Grain" Overlay for texture (optional, subtle modern touch) */}
      <div className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none mix-blend-overlay" 
           style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} 
      />

      {/* Rusker Logo - Top Left */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="absolute top-6 left-6 md:top-10 md:left-10 lg:top-12 lg:left-16 z-20"
      >
        <img 
          src="/images/logos/Logo 2025 (long) (white).png" 
          alt="Rusker Travel" 
          className="h-8 md:h-10 lg:h-12 w-auto opacity-90"
        />
      </motion.div>

      {/* Main Content - Editorial Layout (Bottom Left) */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end pb-24 md:pb-32 px-6 md:px-16 lg:px-24">
        <motion.div 
          style={{ y: textParallax }}
          className="max-w-4xl"
        >
          {/* Badge / Top Label */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isLoaded ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-5 flex items-center gap-3"
          >
            <span className="h-[1px] w-8 bg-rusker-blue/70"></span>
            <span className="text-xs md:text-sm font-medium tracking-[0.25em] text-rusker-blue/90 uppercase">
              Travel • Events • Network
            </span>
          </motion.div>

          {/* Main Headline - Compact & Bold */}
          <div className="overflow-hidden mb-5">
            <motion.h1
              initial={{ y: '100%' }}
              animate={isLoaded ? { y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-white leading-[0.95] tracking-tighter"
            >
              BARCELONE
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/60">
                AUTREMENT
              </span>
            </motion.h1>
          </div>

          {/* Compact Descriptive Line */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-base sm:text-lg md:text-xl text-white/85 max-w-2xl mb-8 leading-snug"
          >
            Immersions sur mesure pour entreprises et grandes écoles dans l'écosystème le plus inspirant d'Europe
          </motion.p>

          {/* Thematic Pills - Compact */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-8"
          >
            <div className="flex flex-wrap gap-2">
              {['Learning Expeditions', 'Séminaires', 'Événements'].map((tag) => (
                <span
                  key={tag}
                  className="text-xs uppercase tracking-wider text-white/60 border border-white/20 rounded-full px-3 py-1.5 backdrop-blur-sm bg-white/5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-6 items-start sm:items-center"
          >
            <Button
              onClick={scrollToForm}
              variant="custom"
              className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-white text-black hover:bg-rusker-blue hover:text-white transition-all duration-500 text-base sm:text-lg font-bold tracking-wide overflow-hidden rounded-full w-full sm:w-auto"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <span className="hidden sm:inline">CONSTRUIRE MON IMMERSION</span>
                <span className="sm:hidden">CRÉER MON PROJET</span>
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Button>
            
            <div className="flex items-center gap-3 md:gap-4 text-white/60 text-xs sm:text-sm">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white border-2 border-black/20 backdrop-blur-sm overflow-hidden flex items-center justify-center p-0.5">
                  <img src="/images/logos/essec-new.png" alt="ESSEC" className="w-full h-full object-contain" />
                </div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white border-2 border-black/20 backdrop-blur-sm overflow-hidden flex items-center justify-center p-0.5">
                  <img src="/images/logos/norrsken.png" alt="Norrsken" className="w-full h-full object-contain" />
                </div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white border-2 border-black/20 backdrop-blur-sm overflow-hidden flex items-center justify-center p-0.5">
                  <img src="/images/logos/papernest-new.png" alt="Papernest" className="w-full h-full object-contain" />
                </div>
              </div>
              <p className="leading-tight">Partenaire de +80 écoles & entreprises</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Side Elements / Indicators */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : {}}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-12 right-12 z-20 hidden md:flex flex-col items-end gap-2 text-white/50 text-xs font-mono tracking-widest uppercase"
      >
        <span>Découvrir</span>
        <div className="h-16 w-[1px] bg-white/30 mt-2 relative overflow-hidden">
          <motion.div 
            animate={{ y: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 w-full bg-white"
          />
        </div>
      </motion.div>
    </section>
  )
}
