'use client'

import NetworkHero from '@/components/network/NetworkHero'
import NetworkTrustBar from '@/components/network/NetworkTrustBar'
import NetworkFeatures from '@/components/network/NetworkFeatures'
import NetworkServices from '@/components/network/NetworkServices'
import NetworkTestimonial from '@/components/network/NetworkTestimonial'
import NetworkCTA from '@/components/network/NetworkCTA'
import NetworkFooter from '@/components/network/NetworkFooter'

export default function NetworkPage() {
  return (
    <main className="min-h-screen">
      <NetworkHero />
      <NetworkTrustBar />
      <NetworkFeatures />
      <NetworkServices />
      <NetworkTestimonial />
      <NetworkCTA />
      <NetworkFooter />
    </main>
  )
}

