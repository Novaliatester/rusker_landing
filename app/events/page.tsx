'use client'

import EventsHero from '@/components/events/EventsHero'
import EventsTrustBar from '@/components/events/EventsTrustBar'
import EventsTypes from '@/components/events/EventsTypes'
import EventsServices from '@/components/events/EventsServices'
import EventsTestimonial from '@/components/events/EventsTestimonial'
import EventsCTA from '@/components/events/EventsCTA'
import EventsFooter from '@/components/events/EventsFooter'

export default function EventsPage() {
  return (
    <main className="min-h-screen">
      <EventsHero />
      <EventsTrustBar />
      <EventsTypes />
      <EventsServices />
      <EventsTestimonial />
      <EventsCTA />
      <EventsFooter />
    </main>
  )
}

