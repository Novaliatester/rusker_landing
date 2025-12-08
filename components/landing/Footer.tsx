'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { fadeInUp } from '@/lib/animations'
import LegalModal from '@/components/ui/LegalModal'
import { TermsContent, PrivacyContent, AccessibilityContent } from '@/components/landing/LegalContent'
import { useI18n } from '@/lib/i18n'

export default function Footer() {
  const { t } = useI18n()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [openModal, setOpenModal] = useState<'terms' | 'privacy' | 'accessibility' | null>(null)

  return (
    <footer ref={ref} className="relative bg-gradient-to-b from-white to-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
          {/* Brand Section */}
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={fadeInUp}
            className="space-y-4"
          >
            <h3 className="text-xl md:text-2xl font-bold text-neutral-dark leading-[1.2]">{t('footer.brand')}</h3>
            <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
              {t('footer.description')}
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>{t('footer.location')}</span>
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
            <h4 className="text-base md:text-lg font-semibold text-text-dark">{t('footer.contact')}</h4>
            <div className="space-y-3 text-sm">
              <a
                href="mailto:info@rusker-travel.com"
                className="flex items-center gap-2 text-gray-600 hover:text-neutral-dark transition-colors"
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
                <span>{t('common.quickResponse')}</span>
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
            <h4 className="text-base md:text-lg font-semibold text-text-dark">{t('footer.services')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="#form-section" 
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }}
                  className="text-gray-600 hover:text-neutral-dark transition-colors"
                >
                  {t('footer.createExperience')}
                </a>
              </li>
              <li>
                <a 
                  href="#why-barcelona"
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById('why-barcelona')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }}
                  className="text-gray-600 hover:text-neutral-dark transition-colors"
                >
                  {t('footer.whyBarcelona')}
                </a>
              </li>
              <li>
                <a 
                  href="#projects"
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }}
                  className="text-gray-600 hover:text-neutral-dark transition-colors"
                >
                  {t('footer.ourProjects')}
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
          className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-200"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              {t('footer.copyright', { year: new Date().getFullYear() })}
            </p>
            <div className="flex flex-wrap items-center gap-4 md:gap-6">
              <button
                onClick={() => setOpenModal('terms')}
                className="text-sm text-gray-500 hover:text-neutral-dark transition-colors"
                aria-label={t('common.termsOfUse')}
              >
                {t('common.termsOfUse')}
              </button>
              <button
                onClick={() => setOpenModal('privacy')}
                className="text-sm text-gray-500 hover:text-neutral-dark transition-colors"
                aria-label={t('common.privacy')}
              >
                {t('common.privacy')}
              </button>
              <button
                onClick={() => setOpenModal('accessibility')}
                className="text-sm text-gray-500 hover:text-neutral-dark transition-colors"
                aria-label={t('common.accessibility')}
              >
                {t('common.accessibility')}
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Legal Modals */}
      <LegalModal
        isOpen={openModal === 'terms'}
        onClose={() => setOpenModal(null)}
        title={t('common.termsOfUse')}
        content={<TermsContent />}
      />
      <LegalModal
        isOpen={openModal === 'privacy'}
        onClose={() => setOpenModal(null)}
        title={t('common.privacy')}
        content={<PrivacyContent />}
      />
      <LegalModal
        isOpen={openModal === 'accessibility'}
        onClose={() => setOpenModal(null)}
        title={t('common.accessibility')}
        content={<AccessibilityContent />}
      />
    </footer>
  )
}

