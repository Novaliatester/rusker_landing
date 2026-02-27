'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import { getAssetPath } from '@/lib/utils'
import { useI18n } from '@/lib/i18n'

function SummitMarquee() {
  return (
    <div className="relative overflow-hidden" style={{ backgroundColor: '#0e0e0e' }}>
      <div className="flex items-center gap-14 whitespace-nowrap py-3 animate-marquee-slow">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className="inline-flex items-center gap-3 flex-shrink-0">
            <img
              src={getAssetPath('/images/summit/summit-icon.svg')}
              alt=""
              className="h-4 w-4 opacity-60"
            />
            <span
              className="text-xs font-semibold uppercase tracking-[0.25em]"
              style={{ color: '#E85D3A', opacity: 0.75 }}
            >
              AI Summit Barcelona 2026
            </span>
            <span className="text-xs" style={{ color: 'rgba(232,93,58,0.25)' }}>—</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function SummitContent() {
  const { t } = useI18n()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const stats = [
    { value: '10K+', label: t('aiSummit.stats.attendees'), color: '#E85D3A' },
    { value: '200+', label: t('aiSummit.stats.speakers'), color: '#0098B5' },
    { value: '50+', label: t('aiSummit.stats.sideEvents'), color: '#2D6DF6' },
  ]

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ backgroundColor: '#131313' }}
    >
      {/* Full-bleed background image */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${getAssetPath('/images/summit/hero-visual.jpg')})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center right',
          }}
        />
        <div className="absolute inset-0 bg-[#131313]/55" />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, #131313 10%, rgba(19,19,19,0.95) 25%, rgba(19,19,19,0.75) 45%, rgba(19,19,19,0.35) 65%, transparent 100%)',
          }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #131313, transparent 40%)', opacity: 0.6 }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #131313, transparent 40%)', opacity: 0.6 }} />
      </div>

      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(250,240,230,1) 1px, transparent 1px), linear-gradient(to right, rgba(250,240,230,1) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 md:px-6 py-10 md:py-14 lg:py-16">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8"
        >
          {/* Left — text content */}
          <div className="max-w-lg">
            <motion.h2
              variants={fadeInUp}
              className="text-xl sm:text-2xl md:text-3xl font-bold leading-[1.15] mb-3"
              style={{ color: '#FAF0E6' }}
            >
              {t('aiSummit.title')}
            </motion.h2>

            <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-4">
              <span className="text-sm font-semibold" style={{ color: '#0098B5' }}>
                AI Week Barcelona
              </span>
              <span style={{ color: 'rgba(250,240,230,0.2)' }}>·</span>
              <span className="text-sm" style={{ color: 'rgba(250,240,230,0.55)' }}>
                {t('aiSummit.date')}
              </span>
              <span style={{ color: 'rgba(250,240,230,0.2)' }}>·</span>
              <span className="text-sm" style={{ color: 'rgba(250,240,230,0.55)' }}>
                {t('aiSummit.location')}
              </span>
            </motion.div>

            <motion.p
              variants={fadeInUp}
              className="text-sm leading-relaxed mb-5"
              style={{ color: 'rgba(250,240,230,0.6)' }}
            >
              {t('aiSummit.description')}
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-2.5">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg backdrop-blur-sm"
                  style={{ backgroundColor: 'rgba(250,240,230,0.05)', border: '1px solid rgba(250,240,230,0.07)' }}
                >
                  <span className="text-sm font-bold" style={{ color: stat.color }}>{stat.value}</span>
                  <span className="text-[10px] uppercase tracking-wider" style={{ color: 'rgba(250,240,230,0.35)' }}>{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — CTAs */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-3 flex-shrink-0"
          >
            <motion.a
              href="https://aisummitbarcelona.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all backdrop-blur-sm"
              style={{ backgroundColor: '#E85D3A', color: '#FAF0E6' }}
              whileHover={{ scale: 1.03, boxShadow: '0 0 20px rgba(232,93,58,0.3)' }}
              whileTap={{ scale: 0.97 }}
            >
              {t('aiSummit.cta')}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </motion.a>
            <motion.a
              href="/blog/ai-summit-barcelona-story"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all backdrop-blur-sm"
              style={{ color: 'rgba(250,240,230,0.55)', border: '1px solid rgba(250,240,230,0.12)' }}
              whileHover={{ color: '#FAF0E6', borderColor: 'rgba(250,240,230,0.3)' }}
            >
              {t('aiSummit.readStory')}
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export { SummitMarquee }
export default SummitContent
