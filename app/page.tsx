'use client'

import Hero from '@/components/landing/Hero'
import AISummitSection from '@/components/landing/AISummitSection'
import WhyBarcelona from '@/components/landing/WhyBarcelona'
import ServicesPreview from '@/components/landing/ServicesPreview'
import SocialProof from '@/components/landing/SocialProof'
import ProjectsShowcase from '@/components/landing/ProjectsShowcase'
import TransitionToForm from '@/components/landing/TransitionToForm'
import FormContainer from '@/components/form/FormContainer'
import Footer from '@/components/landing/Footer'
import SummitPopup from '@/components/ui/SummitPopup'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <AISummitSection />
      <ServicesPreview />
      <WhyBarcelona />
      <SocialProof />
      <ProjectsShowcase />
      <TransitionToForm />
      <FormContainer />
      <Footer />
      <SummitPopup />
    </main>
  )
}
