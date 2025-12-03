'use client'

import TravelHero from '@/components/travel/TravelHero'
import TravelTrustBar from '@/components/travel/TravelTrustBar'
import TravelAudienceSelector from '@/components/travel/TravelAudienceSelector'
import TravelServices from '@/components/travel/TravelServices'
import TravelTestimonial from '@/components/travel/TravelTestimonial'
import TravelCTA from '@/components/travel/TravelCTA'
import TravelFooter from '@/components/travel/TravelFooter'

export default function TravelPage() {
  return (
    <main className="min-h-screen">
      <TravelHero />
      <TravelTrustBar />
      <TravelAudienceSelector />
      <TravelServices />
      <TravelTestimonial />
      <TravelCTA />
      <TravelFooter />
    </main>
  )
}

