'use client'

import { useEffect, useState } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { getCookieConsent } from './CookieConsent'

export default function ConditionalAnalytics() {
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    // Check consent status on mount
    const consent = getCookieConsent()
    if (consent === 'accepted') {
      setShouldLoad(true)
    }

    // Listen for storage changes (when consent is given/rejected)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'rusker-cookie-consent') {
        const consent = getCookieConsent()
        if (consent === 'accepted') {
          setShouldLoad(true)
        } else {
          setShouldLoad(false)
        }
      }
    }

    // Listen for custom event (when consent is set in same tab)
    const handleConsentChange = () => {
      const consent = getCookieConsent()
      if (consent === 'accepted') {
        setShouldLoad(true)
      } else {
        setShouldLoad(false)
      }
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('cookieConsentChanged', handleConsentChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('cookieConsentChanged', handleConsentChange)
    }
  }, [])

  // Only render Analytics if consent has been given
  if (!shouldLoad) return null

  return <Analytics />
}

