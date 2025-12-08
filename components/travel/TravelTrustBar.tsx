'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

const metrics = [
  { value: 50, label: 'Écoles partenaires', suffix: '+' },
  { value: 500, label: 'Étudiants / an', suffix: '+' },
  { value: 30, label: 'Entreprises visitées', suffix: '+' },
  { value: 100, label: 'Intervenants experts', suffix: '+' },
]

export default function TravelTrustBar() {
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
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-6">
        {/* Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-rusker-travel">
                {animatedValues[index]}{metric.suffix}
              </div>
              <p className="mt-1 text-sm md:text-base text-gray-600">{metric.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

