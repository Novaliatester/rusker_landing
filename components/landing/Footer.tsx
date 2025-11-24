'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { fadeInUp } from '@/lib/animations'
import LegalModal from '@/components/ui/LegalModal'
import { TermsContent, PrivacyContent, AccessibilityContent } from '@/components/landing/LegalContent'

export default function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [openModal, setOpenModal] = useState<'terms' | 'privacy' | 'accessibility' | null>(null)

  return (
    <footer ref={ref} className="relative bg-gradient-to-b from-white to-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Brand Section */}
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={fadeInUp}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold text-rusker-blue">Rusker Travel</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Expériences immersives sur mesure à Barcelone pour écoles, universités et entreprises.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>Barcelone, Espagne</span>
            </div>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={fadeInUp}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-text-dark">Contact</h4>
            <div className="space-y-3 text-sm">
              <a
                href="mailto:info@rusker-travel.com"
                className="flex items-center gap-2 text-gray-600 hover:text-rusker-blue transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span>info@rusker-travel.com</span>
              </a>
              <div className="flex items-center gap-2 text-gray-600">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>Réponse rapide</span>
              </div>
            </div>
          </motion.div>

          {/* Links Section */}
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-text-dark">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="#form-section" 
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }}
                  className="text-gray-600 hover:text-rusker-blue transition-colors"
                >
                  Créer votre expérience
                </a>
              </li>
              <li>
                <a 
                  href="#why-barcelona"
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById('why-barcelona')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }}
                  className="text-gray-600 hover:text-rusker-blue transition-colors"
                >
                  Pourquoi Barcelone
                </a>
              </li>
              <li>
                <a 
                  href="#projects"
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }}
                  className="text-gray-600 hover:text-rusker-blue transition-colors"
                >
                  Nos projets
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeInUp}
          transition={{ delay: 0.3 }}
          className="mt-12 pt-8 border-t border-gray-200"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Rusker Travel. Tous droits réservés.
            </p>
            <div className="flex items-center gap-6">
              <button
                onClick={() => setOpenModal('terms')}
                className="text-sm text-gray-500 hover:text-rusker-blue transition-colors"
                aria-label="Conditions d'utilisation"
              >
                Conditions d&apos;utilisation
              </button>
              <button
                onClick={() => setOpenModal('privacy')}
                className="text-sm text-gray-500 hover:text-rusker-blue transition-colors"
                aria-label="Politique de confidentialité"
              >
                Confidentialité
              </button>
              <button
                onClick={() => setOpenModal('accessibility')}
                className="text-sm text-gray-500 hover:text-rusker-blue transition-colors"
                aria-label="Accessibilité"
              >
                Accessibilité
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Legal Modals */}
      <LegalModal
        isOpen={openModal === 'terms'}
        onClose={() => setOpenModal(null)}
        title="Conditions d'utilisation"
        content={<TermsContent />}
      />
      <LegalModal
        isOpen={openModal === 'privacy'}
        onClose={() => setOpenModal(null)}
        title="Politique de confidentialité"
        content={<PrivacyContent />}
      />
      <LegalModal
        isOpen={openModal === 'accessibility'}
        onClose={() => setOpenModal(null)}
        title="Accessibilité"
        content={<AccessibilityContent />}
      />
    </footer>
  )
}

