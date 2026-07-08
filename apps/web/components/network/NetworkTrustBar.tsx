'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { useI18n } from '@/lib/i18n'

export default function NetworkTrustBar() {
  const { t } = useI18n()
  const metrics = [
    { value: 200, labelKey: 'network.trustBar.frenchTechStartups', suffix: '+' },
    { value: 50, labelKey: 'network.trustBar.eventsPerYear', suffix: '+' },
    { value: 1000, labelKey: 'network.trustBar.talentsConnected', suffix: '+' },
    { value: 30, labelKey: 'network.trustBar.largeCompanies', suffix: '+' },
  ]
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
          data-scroll-reveal
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0, visibility: 'visible' }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              data-scroll-reveal
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0, visibility: 'visible' }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-rusker-network">
                {animatedValues[index]}{metric.suffix}
              </div>
              <p className="mt-1 text-sm md:text-base text-gray-600">{t(metric.labelKey)}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

