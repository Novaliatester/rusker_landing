'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { fadeInUp } from '@/lib/animations'

const metrics = [
  { value: 50, label: 'écoles et universités accompagnées', suffix: '+' },
  { value: 30, label: 'Entreprises Partenaires', suffix: '+' },
  { value: 500, label: 'Étudiants déplacés cette année', suffix: '+' },
  { value: 100, label: "Intervenants issus de l'écosystème tech, innovation et durabilité", suffix: '+' },
]

const logos = [
  { name: 'ESSEC', image: '/images/logos/essec.png', alt: 'ESSEC Business School' },
  { name: 'French Tech', image: '/images/logos/french-tech.png', alt: 'French Tech Barcelona' },
  { name: 'Station F', image: '/images/logos/station-f.png', alt: 'Station F' },
  { name: 'Shoptalk', image: '/images/logos/shoptalk.png', alt: 'Shoptalk Europe' },
  { name: 'AI Summit', image: '/images/logos/ai-summit.svg', alt: 'AI Summit Barcelona' },
  { name: 'TravelPerk', image: '/images/logos/travelperk.png', alt: 'TravelPerk' },
  { name: 'Papernest', image: '/images/logos/papernest.png', alt: 'Papernest' },
  { name: 'Norrsken', image: '/images/logos/norrsken.png', alt: 'Norrsken' },
]

export default function SocialProof() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [animatedValues, setAnimatedValues] = useState(metrics.map(() => 0))

  useEffect(() => {
    if (isInView) {
      metrics.forEach((metric, index) => {
        const duration = 2000
        const steps = 60
        const increment = metric.value / steps
        let current = 0
        const timer = setInterval(() => {
          current += increment
          if (current >= metric.value) {
            setAnimatedValues(prev => {
              const newValues = [...prev]
              newValues[index] = metric.value
              return newValues
            })
            clearInterval(timer)
          } else {
            setAnimatedValues(prev => {
              const newValues = [...prev]
              newValues[index] = Math.floor(current)
              return newValues
            })
          }
        }, duration / steps)
      })
    }
  }, [isInView])

  return (
    <section ref={ref} className="bg-white py-16 md:py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeInUp}
          className="text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-bg-light px-4 py-1 text-sm font-semibold uppercase tracking-widest text-rusker-blue">
            Ils nous font confiance
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-text-dark leading-tight px-2">
            Des écoles, startups et grandes entreprises françaises et européennes
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeInUp}
          className="mt-12 md:mt-16 grid grid-cols-1 gap-6 md:gap-8 lg:gap-10 text-center md:grid-cols-2 lg:grid-cols-4"
        >
          {metrics.map((metric, index) => (
            <div key={index}>
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-rusker-blue">
                {animatedValues[index]}
                {metric.suffix}
              </div>
              <p className="mt-2 md:mt-3 text-sm md:text-base lg:text-lg text-gray-600 px-2">{metric.label}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeInUp}
          transition={{ delay: 0.2 }}
          className="mt-12 md:mt-16 overflow-hidden rounded-2xl md:rounded-3xl border border-gray-100 bg-bg-light/60 py-6 md:py-8"
        >
          <div className="flex items-center gap-2 px-4 md:px-8 text-xs md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] text-gray-500">
            Partners
            <div className="h-px flex-1 bg-gradient-to-r from-gray-200 to-transparent" />
          </div>
          <div className="relative mt-6 overflow-hidden">
            <div className="animate-marquee flex min-w-full gap-16 whitespace-nowrap px-8">
              {[...logos, ...logos].map((logo, index) => (
                <div
                  key={`${logo.name}-${index}`}
                  className="inline-flex items-center justify-center h-16 md:h-20 px-4 md:px-6 group"
                >
                  <div className="relative w-full h-full flex items-center justify-center">
                    <img
                      src={logo.image}
                      alt={logo.alt}
                      className="h-full w-auto max-w-[140px] md:max-w-[180px] object-contain opacity-60 hover:opacity-100 transition-all duration-300 group-hover:scale-110 rounded-lg"
                      onError={(e) => {
                        // Fallback to text if image doesn't exist
                        const target = e.target as HTMLImageElement
                        const parent = target.parentElement
                        if (parent && !parent.querySelector('.logo-fallback')) {
                          target.style.display = 'none'
                          const fallback = document.createElement('span')
                          fallback.className = 'logo-fallback text-sm font-semibold text-gray-600 whitespace-nowrap px-4 py-2 rounded-lg bg-white/70 border border-gray-200'
                          fallback.textContent = logo.name
                          parent.appendChild(fallback)
                        }
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

