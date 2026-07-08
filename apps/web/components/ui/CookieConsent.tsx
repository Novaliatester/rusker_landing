'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useI18n } from '@/lib/i18n'

const CONSENT_KEY = 'rusker-cookie-consent'
const CONSENT_EXPIRY_DAYS = 365

export type CookieConsentStatus = 'accepted' | 'rejected' | null

export function getCookieConsent(): CookieConsentStatus {
  if (typeof window === 'undefined') return null
  
  const stored = localStorage.getItem(CONSENT_KEY)
  if (!stored) return null
  
  try {
    const { status, expiry } = JSON.parse(stored)
    // Check if consent has expired
    if (expiry && Date.now() > expiry) {
      localStorage.removeItem(CONSENT_KEY)
      return null
    }
    return status as CookieConsentStatus
  } catch {
    return null
  }
}

export function setCookieConsent(status: 'accepted' | 'rejected'): void {
  if (typeof window === 'undefined') return
  
  const expiry = Date.now() + (CONSENT_EXPIRY_DAYS * 24 * 60 * 60 * 1000)
  localStorage.setItem(CONSENT_KEY, JSON.stringify({ status, expiry }))
}

export default function CookieConsent() {
  const { t } = useI18n()
  const [showBanner, setShowBanner] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if consent has been given
    const consent = getCookieConsent()
    if (consent === null) {
      // Small delay to avoid flash of banner on page load
      const timer = setTimeout(() => {
        setShowBanner(true)
        setIsVisible(true)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    setCookieConsent('accepted')
    setIsVisible(false)
    // Small delay before hiding to allow animation
    setTimeout(() => setShowBanner(false), 300)
    // Dispatch event to notify ConditionalAnalytics
    window.dispatchEvent(new Event('cookieConsentChanged'))
  }

  const handleReject = () => {
    setCookieConsent('rejected')
    setIsVisible(false)
    // Small delay before hiding to allow animation
    setTimeout(() => setShowBanner(false), 300)
    // Dispatch event to notify ConditionalAnalytics
    window.dispatchEvent(new Event('cookieConsentChanged'))
  }

  if (!showBanner) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 left-0 right-0 z-50 p-3 sm:p-4"
        >
          <div className="mx-auto max-w-4xl">
            <div className="bg-white/98 backdrop-blur-md rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-gray-200/60 p-4 sm:p-5">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex-1">
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    {t('cookieConsent.description')}
                  </p>
                </div>
                <div className="flex gap-3 flex-shrink-0">
                  <motion.button
                    onClick={handleReject}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 rounded-lg transition-all duration-200 min-w-[90px]"
                    aria-label={t('cookieConsent.reject')}
                  >
                    {t('cookieConsent.reject')}
                  </motion.button>
                  <motion.button
                    onClick={handleAccept}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-5 py-2.5 text-sm font-semibold text-white bg-neutral-dark hover:bg-neutral-dark/90 rounded-lg transition-all duration-200 min-w-[90px] shadow-sm hover:shadow-md"
                    aria-label={t('cookieConsent.accept')}
                  >
                    {t('cookieConsent.accept')}
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

