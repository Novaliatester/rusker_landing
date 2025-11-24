'use client'

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import Button from '@/components/ui/Button'
import { heroAnimation } from '@/lib/animations'

const heroStats = [
  { label: 'Learning Expeditions', value: '120+' },
  { label: 'Partenaires à Barcelone', value: '80+' },
  { label: 'Étudiants accompagnés', value: '2 500+' },
]

const dynamicPhrases = [
  "l'écosystème le plus inspirant d'Europe",
  "l'innovation à portée de main",
  "Barcelone comme vous ne l'avez jamais vécu",
  "la créativité et l'entrepreneuriat",
  "l'avenir de l'apprentissage",
  "la French Tech Barcelona",
  "la transformation digitale",
  "la rencontre entre talents et opportunités",
  "l'inspiration et la découverte",
  "un réseau international de leaders",
]

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [useVideo, setUseVideo] = useState(true)
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.5, 0.9])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Separate effect for video loading and playing
  useEffect(() => {
    if (!useVideo) return
    
    let retryTimeout: ReturnType<typeof setTimeout> | null = null
    let cleanupFn: (() => void) | null = null
    const timeouts: ReturnType<typeof setTimeout>[] = []
    
    // Use a small delay to ensure video element is in DOM
    const initVideo = () => {
      const video = videoRef.current
      if (!video) {
        // Retry if video ref is not ready
        retryTimeout = setTimeout(initVideo, 50)
        return
      }

      // Set video properties
      video.muted = true
      video.playsInline = true
      video.loop = true
      video.preload = 'auto'

      const attemptPlay = async () => {
        try {
          if (video.paused) {
            await video.play()
            setVideoLoaded(true)
            console.log('Video is playing successfully')
          } else {
            // Video is already playing
            setVideoLoaded(true)
          }
        } catch (error) {
          console.log('Video play failed:', error)
          // Don't disable video on first error, might be a timing issue
          if (video.readyState === 0) {
            // Video hasn't loaded at all, might be a real error
            console.log('Video not loaded, will retry')
          }
        }
      }

      // Try to play immediately if video is already loaded (cached scenario on reload)
      if (video.readyState >= 3) {
        attemptPlay()
      } else {
        // Only call load() if video hasn't started loading yet
        if (video.readyState === 0) {
          video.load()
        }
      }

      // Also try on various video events
      const handleCanPlay = () => {
        attemptPlay()
      }
      const handleCanPlayThrough = () => {
        attemptPlay()
      }
      const handleLoadedData = () => {
        attemptPlay()
      }
      const handleLoadedMetadata = () => {
        attemptPlay()
      }
      const handlePlay = () => {
        setVideoLoaded(true)
      }

      video.addEventListener('canplay', handleCanPlay)
      video.addEventListener('canplaythrough', handleCanPlayThrough)
      video.addEventListener('loadeddata', handleLoadedData)
      video.addEventListener('loadedmetadata', handleLoadedMetadata)
      video.addEventListener('play', handlePlay)
      
      // Multiple fallback attempts to handle reload scenarios
      timeouts.push(
        setTimeout(() => attemptPlay(), 100),
        setTimeout(() => attemptPlay(), 300),
        setTimeout(() => attemptPlay(), 500),
        setTimeout(() => attemptPlay(), 1000)
      )

      cleanupFn = () => {
        timeouts.forEach(clearTimeout)
        video.removeEventListener('canplay', handleCanPlay)
        video.removeEventListener('canplaythrough', handleCanPlayThrough)
        video.removeEventListener('loadeddata', handleLoadedData)
        video.removeEventListener('loadedmetadata', handleLoadedMetadata)
        video.removeEventListener('play', handlePlay)
      }
    }

    initVideo()
    
    return () => {
      if (retryTimeout) clearTimeout(retryTimeout)
      if (cleanupFn) cleanupFn()
    }
  }, [useVideo])

  // Rotate through dynamic phrases
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhraseIndex((prev) => (prev + 1) % dynamicPhrases.length)
    }, 4000) // Change every 4 seconds

    return () => clearInterval(interval)
  }, [])

  const scrollToForm = () => {
    const formSection = document.getElementById('form-section')
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-black pt-20 pb-12"
    >
      {/* Video Background */}
      {useVideo && (
        <motion.div
          className="absolute inset-0 z-0"
          style={{ scale: backgroundScale }}
        >
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onError={(e) => {
              console.log('Video error:', e)
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
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
              videoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <source src="/images/hero-video.mp4" type="video/mp4" />
          </video>
          {/* Fallback image if video doesn't load */}
          <div
            className={`absolute inset-0 h-full w-full bg-cover bg-center transition-opacity duration-1000 ${
              videoLoaded ? 'opacity-0' : 'opacity-100'
            }`}
            style={{
              backgroundImage: 'url(/images/hero-barcelona.jpg)',
            }}
          />
        </motion.div>
      )}

      {/* Image Background (fallback or primary) */}
      {!useVideo && (
        <motion.div
          className="absolute inset-0 z-0"
          style={{ scale: backgroundScale }}
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: 'url(/images/hero-barcelona.jpg)',
            }}
          />
        </motion.div>
      )}

      {/* Stronger, cleaner overlay for better text readability */}
      <motion.div
        className="absolute inset-0 z-[1] bg-black/90"
        style={{ opacity: overlayOpacity }}
      />
      
      {/* Additional dark layer for extra darkness */}
      <div className="absolute inset-0 z-[1] bg-black/70" />

      {/* Content with proper padding and spacing */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white py-12"
      >
        <motion.h1
          initial="hidden"
          animate={isLoaded ? 'visible' : 'hidden'}
          variants={heroAnimation}
          className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
        >
          <span className="block mb-3 text-2xl md:text-4xl">Learning Expeditions, événements et rencontres professionnelles</span>
          <span className="block mb-8 mt-2 text-xl md:text-3xl">au cœur de</span>
          <span className="relative inline-block h-[1.4em] md:h-[1.3em] mt-2">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentPhraseIndex}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.95 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                className="absolute left-0 right-0 top-0 bottom-0 flex items-center justify-center text-rusker-blue drop-shadow-[0_0_20px_rgba(39,115,150,0.6)]"
              >
                {dynamicPhrases[currentPhraseIndex]}
              </motion.span>
            </AnimatePresence>
            {/* Invisible placeholder to maintain width - using the longest phrase */}
            <span className="invisible inline-block" aria-hidden="true">
              {dynamicPhrases.reduce((longest, phrase) => 
                phrase.length > longest.length ? phrase : longest, ''
              )}
            </span>
          </span>
        </motion.h1>
        
        <motion.p
          initial="hidden"
          animate={isLoaded ? 'visible' : 'hidden'}
          variants={heroAnimation}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl mb-8 text-white/95 max-w-3xl mx-auto leading-relaxed font-medium"
        >
          On crée pour vous des expériences sur-mesure entre culture, innovation, et rencontres professionnelles.
        </motion.p>

        <motion.div
          initial="hidden"
          animate={isLoaded ? 'visible' : 'hidden'}
          variants={heroAnimation}
          transition={{ delay: 0.4 }}
          className="mb-10"
        >
          <Button
            onClick={scrollToForm}
            variant="primary"
            size="large"
            className="bg-rusker-blue hover:bg-[#1f5a75] shadow-2xl text-lg px-10 py-5"
          >
            Construire mon projet
          </Button>
        </motion.div>

        {/* Simplified Stats - moved up and cleaner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.6 }}
          className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3 max-w-3xl mx-auto"
        >
          {heroStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="rounded-lg border border-white/30 bg-white/15 backdrop-blur-md px-6 py-4 shadow-lg"
            >
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <p className="text-xs uppercase tracking-wide text-white/90">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Simplified Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-3 bg-white rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
