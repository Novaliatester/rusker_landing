'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getAssetPath } from '@/lib/utils'
import { useI18n } from '@/lib/i18n'
import LanguageSwitcher from './LanguageSwitcher'

const universes = [
  { name: 'Travel', href: '/travel', descriptionKey: 'services.universes.travel.description', color: '#236a89', colorLight: '#bfeff4' },
  { name: 'Events', href: '/events', descriptionKey: 'services.universes.events.description', color: '#0d5c4a', colorLight: '#6ee3a8' },
  { name: 'Network', href: '/network', descriptionKey: 'services.universes.network.description', color: '#a61e40', colorLight: '#ffdfeb' },
]

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUniversesOpen, setIsUniversesOpen] = useState(false)
  const pathname = usePathname()
  const { t } = useI18n()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
    setIsUniversesOpen(false)
  }, [pathname])

  // Hide navigation on form page
  if (pathname === '/form') {
    return null
  }

  const isHomePage = pathname === '/'
  const showBubble = isScrolled || !isHomePage

  return (
    <>
      {/* Full-width header for non-scrolled home page */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ 
          y: 0,
          opacity: showBubble ? 0 : 1,
          pointerEvents: showBubble ? 'none' : 'auto'
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-[100] bg-transparent"
      >
        <nav className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="flex h-16 md:h-20 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <img
                src={getAssetPath('/images/2026 Rusker/Logos/Rusker (white).png')}
                alt="Rusker"
                className="h-8 md:h-10 w-auto transition-opacity duration-300 hover:opacity-80"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <Link
                href="/"
                className={`text-sm font-medium transition-colors duration-300 text-white/90 hover:text-white ${pathname === '/' ? 'font-semibold' : ''}`}
              >
                {t('common.home')}
              </Link>

              {/* Nos Univers Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsUniversesOpen(true)}
                onMouseLeave={() => setIsUniversesOpen(false)}
              >
                <button
                  className={`flex items-center gap-1.5 text-sm font-medium transition-colors duration-300 text-white/90 hover:text-white ${['/travel', '/events', '/network'].includes(pathname) ? 'font-semibold' : ''}`}
                >
                  {t('common.ourUniverses')}
                  <motion.svg
                    animate={{ rotate: isUniversesOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </button>

                <AnimatePresence>
                  {isUniversesOpen && !showBubble && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-4"
                    >
                      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-2 min-w-[280px]">
                        {universes.map((universe) => (
                          <Link
                            key={universe.href}
                            href={universe.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group`}
                            style={{
                              backgroundColor: pathname === universe.href ? `${universe.colorLight}40` : 'transparent',
                            }}
                            onMouseEnter={(e) => {
                              if (pathname !== universe.href) {
                                e.currentTarget.style.backgroundColor = `${universe.colorLight}30`
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (pathname !== universe.href) {
                                e.currentTarget.style.backgroundColor = 'transparent'
                              }
                            }}
                          >
                            <div 
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: universe.color }}
                            />
                            <div className="flex flex-col gap-0.5">
                              <span 
                                className="text-sm font-semibold text-gray-900 transition-colors leading-[1.3]"
                                style={{ color: pathname === universe.href ? universe.color : undefined }}
                              >
                                Rusker {universe.name}
                              </span>
                              <span className="text-xs text-gray-500">
                                {t(universe.descriptionKey)}
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href="/blog"
                className={`text-sm font-medium transition-colors duration-300 text-white/90 hover:text-white ${pathname === '/blog' ? 'font-semibold' : ''}`}
              >
                {t('common.blog')}
              </Link>

              {/* Language Switcher */}
              <LanguageSwitcher />

              {/* CTA Button */}
              <Link
                href="/#form-section"
                className="ml-4 px-5 py-2.5 bg-neutral-dark text-white text-sm font-semibold rounded-full hover:bg-neutral-dark/90 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                {t('common.contactUs')}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg transition-colors text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Floating bubble navigation when scrolled */}
      <AnimatePresence>
        {showBubble && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ 
              duration: 0.4, 
              ease: [0.16, 1, 0.3, 1]
            }}
            className="fixed top-4 left-0 right-0 z-[100] px-4 md:px-6 lg:px-8"
          >
            <nav className="mx-auto max-w-7xl bg-white/95 backdrop-blur-xl shadow-lg shadow-black/5 border border-gray-200/50 rounded-[50px] px-5 py-2.5 md:px-8 md:py-3">
              <div className="flex items-center justify-between">
                 {/* Logo */}
                 <Link href="/" className="flex-shrink-0">
                   <img
                     src={getAssetPath('/images/2026 Rusker/Logos/Rusker.png')}
                     alt="Rusker"
                     className="h-9 md:h-10 w-auto transition-all duration-300 hover:scale-105"
                   />
                 </Link>

                {/* Desktop Navigation - Right aligned like original */}
                <div className="hidden md:flex items-center gap-8">
                  <Link
                    href="/"
                    className={`text-sm font-medium transition-colors duration-300 ${
                      pathname === '/' 
                        ? 'text-neutral-dark font-semibold' 
                        : 'text-gray-700 hover:text-neutral-dark'
                    }`}
                  >
                    {t('common.home')}
                  </Link>

                  {/* Nos Univers Dropdown */}
                  <div
                    className="relative"
                    onMouseEnter={() => setIsUniversesOpen(true)}
                    onMouseLeave={() => setIsUniversesOpen(false)}
                  >
                    <button
                      className={`flex items-center gap-1.5 text-sm font-medium transition-colors duration-300 ${
                        ['/travel', '/events', '/network'].includes(pathname)
                          ? 'text-neutral-dark font-semibold'
                          : 'text-gray-700 hover:text-neutral-dark'
                      }`}
                    >
                      {t('common.ourUniverses')}
                      <motion.svg
                        animate={{ rotate: isUniversesOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </motion.svg>
                    </button>

                    <AnimatePresence>
                      {isUniversesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 pt-3"
                        >
                          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-2 min-w-[280px]">
                            {universes.map((universe) => (
                              <Link
                                key={universe.href}
                                href={universe.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group`}
                                style={{
                                  backgroundColor: pathname === universe.href ? `${universe.colorLight}40` : 'transparent',
                                }}
                                onMouseEnter={(e) => {
                                  if (pathname !== universe.href) {
                                    e.currentTarget.style.backgroundColor = `${universe.colorLight}30`
                                  }
                                }}
                                onMouseLeave={(e) => {
                                  if (pathname !== universe.href) {
                                    e.currentTarget.style.backgroundColor = 'transparent'
                                  }
                                }}
                              >
                                <div 
                                  className="w-2 h-2 rounded-full"
                                  style={{ backgroundColor: universe.color }}
                                />
                                <div className="flex flex-col gap-0.5">
                                  <span 
                                    className="text-sm font-semibold text-gray-900 transition-colors"
                                    style={{ color: pathname === universe.href ? universe.color : undefined }}
                                  >
                                    Rusker {universe.name}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    {t(universe.descriptionKey)}
                                  </span>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <Link
                    href="/blog"
                    className={`text-sm font-medium transition-colors duration-300 ${
                      pathname === '/blog' 
                        ? 'text-neutral-dark font-semibold' 
                        : 'text-gray-700 hover:text-neutral-dark'
                    }`}
                  >
                    {t('common.blog')}
                  </Link>

                  {/* Language Switcher */}
                  <LanguageSwitcher variant="compact" />

                  {/* CTA Button */}
                  <Link
                    href="/#form-section"
                    className="ml-4 px-5 py-2.5 bg-neutral-dark text-white text-sm font-semibold rounded-full hover:bg-neutral-dark/90 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    {t('common.contactUs')}
                  </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="md:hidden p-2 rounded-full transition-colors text-gray-700 hover:bg-gray-100"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isMobileMenuOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] md:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-[280px] bg-white shadow-2xl"
            >
              <div className="p-6 pt-20">
                <div className="flex flex-col gap-2">
                  <Link
                    href="/"
                    className={`px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                      pathname === '/' ? 'bg-neutral-light text-neutral-dark' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {t('common.home')}
                  </Link>

                  {/* Mobile Universes */}
                  <div className="px-4 py-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2 block">
                      {t('common.ourUniverses')}
                    </span>
                    <div className="flex flex-col gap-1 mt-2">
                      {universes.map((universe) => (
                        <Link
                          key={universe.href}
                          href={universe.href}
                          className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
                          style={{
                            backgroundColor: pathname === universe.href ? `${universe.colorLight}40` : 'transparent',
                            color: pathname === universe.href ? universe.color : '#4b5563',
                          }}
                        >
                          <div 
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: universe.color }}
                          />
                          Rusker {universe.name}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <Link
                    href="/blog"
                    className={`px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                      pathname === '/blog' ? 'bg-neutral-light text-neutral-dark' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {t('common.blog')}
                  </Link>

                  {/* Language Switcher - Mobile */}
                  <div className="px-4 py-2">
                    <LanguageSwitcher variant="compact" />
                  </div>

                  <Link
                    href="/#form-section"
                    className="mt-4 px-4 py-3 bg-neutral-dark text-white text-center font-semibold rounded-xl"
                  >
                    {t('common.contactUs')}
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

