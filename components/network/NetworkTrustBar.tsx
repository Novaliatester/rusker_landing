'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { getAssetPath } from '@/lib/utils'

const metrics = [
  { value: 200, label: 'Startups French Tech', suffix: '+' },
  { value: 50, label: 'Événements / an', suffix: '+' },
  { value: 1000, label: 'Talents connectés', suffix: '+' },
  { value: 30, label: 'Grandes entreprises', suffix: '+' },
]

const logos = [
  { name: 'French Tech', image: getAssetPath('/images/logos/french-tech.png') },
  { name: 'Station F', image: getAssetPath('/images/logos/station-f.png') },
  { name: 'Norrsken', image: getAssetPath('/images/logos/norrsken.png') },
  { name: 'TravelPerk', image: getAssetPath('/images/logos/travelperk.png') },
  { name: 'Papernest', image: getAssetPath('/images/logos/papernest-new.png') },
  { name: 'ESSEC', image: getAssetPath('/images/logos/essec-new.png') },
  { name: 'HEC', image: getAssetPath('/images/logos/hec.svg') },
  { name: 'INSEAD', image: getAssetPath('/images/logos/insead.png') },
]

export default function NetworkTrustBar() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [animatedValues, setAnimatedValues] = useState(metrics.map(() => 0))

  useEffect(() => {
    if (isInView) {
      metrics.forEach((metric, index) => {
        const duration = 1500
        const steps = 40
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
    <section ref={ref} className="relative bg-white py-12 md:py-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-6">
        {/* Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-12"
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-rusker-network">
                {animatedValues[index]}{metric.suffix}
              </div>
              <p className="mt-1 text-sm md:text-base text-gray-600">{metric.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Logos marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs uppercase tracking-[0.2em] text-gray-400 font-medium">Notre écosystème</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>
          
          <div className="relative overflow-hidden py-4">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />
            
            <div className="animate-marquee flex items-center gap-16 whitespace-nowrap">
              {[...logos, ...logos].map((logo, index) => (
                <div
                  key={`${logo.name}-${index}`}
                  className="flex-shrink-0 h-10 md:h-12 w-auto flex items-center justify-center"
                >
                  <img
                    src={logo.image}
                    alt={logo.name}
                    className="h-full w-auto max-w-[120px] object-contain opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

