'use client'

import PageTransition from '@/components/ui/PageTransition'
import EventsHero from '@/components/events/EventsHero'
import EventsTrustBar from '@/components/events/EventsTrustBar'
import EventsTypes from '@/components/events/EventsTypes'
import EventsServices from '@/components/events/EventsServices'
import EventsTestimonial from '@/components/events/EventsTestimonial'
import EventsCTA from '@/components/events/EventsCTA'
import EventsFooter from '@/components/events/EventsFooter'

export default function EventsPage() {
  return (
    <PageTransition color="#0b5d56">
    <main className="min-h-screen">
      <EventsHero />
      <EventsTrustBar />
      <EventsTypes />
      <EventsServices />
      <EventsTestimonial />
      <EventsCTA />
      <EventsFooter />
    </main>
    </PageTransition>
  )
}

