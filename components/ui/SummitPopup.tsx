'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { getAssetPath } from '@/lib/utils'
import { useI18n } from '@/lib/i18n'

const STORAGE_KEY = 'summit_popup_dismissed'

export default function SummitPopup() {
  const { t } = useI18n()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY)
    if (!dismissed) {
      const timer = setTimeout(() => setIsOpen(true), 10000)
      return () => clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const dismiss = () => {
    setIsOpen(false)
    localStorage.setItem(STORAGE_KEY, 'true')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="summit-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={dismiss}
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            key="summit-modal"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8 pointer-events-none"
          >
            <div
              className="relative w-full max-w-lg rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl pointer-events-auto"
              style={{ backgroundColor: '#111111', border: '1px solid rgba(250,240,230,0.1)' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Grid overlay */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(250,240,230,1) 1px, transparent 1px), linear-gradient(to right, rgba(250,240,230,1) 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              />

              {/* Decorative blob */}
              <div
                className="pointer-events-none absolute"
                style={{
                  top: '-20%',
                  right: '-20%',
                  width: '300px',
                  height: '300px',
                  background: `url(${getAssetPath('/images/summit/cinnabar.png')}) center/cover no-repeat`,
                  opacity: 0.4,
                }}
              />

              {/* Close button */}
              <motion.button
                onClick={dismiss}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-3 right-3 z-20 w-9 h-9 flex items-center justify-center rounded-full transition-colors"
                style={{ backgroundColor: 'rgba(250,240,230,0.1)', color: 'rgba(250,240,230,0.6)' }}
                aria-label="Close"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>

              {/* Image */}
              <div className="relative h-44 md:h-52 overflow-hidden">
                <img
                  src={getAssetPath('/images/summit/hero-visual.jpg')}
                  alt="AI Summit Barcelona 2026"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 flex items-center gap-2">
                  <img
                    src={getAssetPath('/images/summit/summit-icon.svg')}
                    alt=""
                    className="h-6 w-6"
                  />
                  <span
                    className="text-xs font-semibold uppercase tracking-widest"
                    style={{ color: '#E85D3A' }}
                  >
                    {t('summitPopup.badge')}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10 px-5 md:px-6 pb-6 pt-2">
                <h3
                  className="text-xl md:text-2xl font-bold mb-1"
                  style={{ color: '#FAF0E6', fontFamily: "'General Sans', 'Poppins', sans-serif" }}
                >
                  {t('summitPopup.title')}
                </h3>

                <div className="flex items-center gap-2 mb-4">
                  <span
                    className="text-sm font-semibold"
                    style={{ color: '#0098B5' }}
                  >
                    22-23 Sep 2026
                  </span>
                  <span style={{ color: 'rgba(250,240,230,0.3)' }}>|</span>
                  <span
                    className="text-sm"
                    style={{ color: 'rgba(250,240,230,0.6)' }}
                  >
                    Barcelona
                  </span>
                </div>

                <p
                  className="text-sm leading-relaxed mb-6"
                  style={{ color: 'rgba(250,240,230,0.65)' }}
                >
                  {t('summitPopup.description')}
                </p>

                {/* Stats mini */}
                <div className="grid grid-cols-4 gap-2 mb-6">
                  {[
                    { val: '10K+', label: t('aiSummit.stats.attendees'), color: '#E85D3A' },
                    { val: '200+', label: t('aiSummit.stats.speakers'), color: '#0098B5' },
                    { val: '2', label: t('aiSummit.stats.days'), color: '#2D6DF6' },
                    { val: '50+', label: t('aiSummit.stats.sideEvents'), color: '#E85D3A' },
                  ].map((s, i) => (
                    <div
                      key={i}
                      className="text-center p-2 rounded-lg"
                      style={{ backgroundColor: 'rgba(250,240,230,0.04)' }}
                    >
                      <div className="text-lg font-bold" style={{ color: s.color }}>{s.val}</div>
                      <div className="text-[10px] uppercase tracking-wider" style={{ color: 'rgba(250,240,230,0.4)' }}>{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* CTA buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <motion.a
                    href="https://aisummitbarcelona.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all"
                    style={{ backgroundColor: '#E85D3A', color: '#FAF0E6' }}
                    whileHover={{ scale: 1.03, boxShadow: '0 0 25px rgba(232,93,58,0.35)' }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {t('summitPopup.cta')}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </motion.a>
                  <button
                    onClick={dismiss}
                    className="flex-1 px-5 py-3 rounded-xl text-sm font-medium transition-all"
                    style={{
                      color: 'rgba(250,240,230,0.6)',
                      border: '1px solid rgba(250,240,230,0.12)',
                    }}
                  >
                    {t('summitPopup.dismiss')}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
