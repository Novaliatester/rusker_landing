'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import { scaleIn, fadeInUp } from '@/lib/animations'
import Button from './Button'

interface UniverseModalProps {
  isOpen: boolean
  onClose: () => void
  universe: {
    icon: React.ComponentType
    title: string
    description: string
    image: string
    content: {
      about: {
        title: string
        description: string
      }
      process?: Array<{
        title: string
        description: string
      }>
      services?: Array<{
        title: string
        description: string
      }>
      features?: Array<{
        title: string
        description: string
      }>
    }
  }
}

export default function UniverseModal({ isOpen, onClose, universe }: UniverseModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    if (isOpen) {
      window.addEventListener('keydown', handleEscape)
    }
    return () => {
      window.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  const scrollToForm = () => {
    onClose()
    setTimeout(() => {
      const formSection = document.getElementById('form-section')
      if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth' })
      }
    }, 300)
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      {/* Enhanced Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-gradient-to-br from-black/90 via-black/85 to-black/90 backdrop-blur-md"
      />
      
      {/* Modal */}
      <motion.div
        key="modal"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
            <motion.div 
              className="relative w-full max-w-6xl max-h-[95vh] sm:max-h-[90vh] bg-white rounded-2xl sm:rounded-3xl md:rounded-[32px] shadow-[0_25px_100px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col border border-white/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {/* Enhanced Close Button */}
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-6 z-20 w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/95 hover:bg-white shadow-xl backdrop-blur-sm border border-gray-100 transition-all duration-300 group"
                aria-label="Close modal"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 group-hover:text-rusker-blue transition-colors"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </motion.button>

              {/* Scrollable Content */}
              <div className="overflow-y-auto flex-1 custom-scrollbar min-h-0 overscroll-contain" style={{ WebkitOverflowScrolling: 'touch' }}>
                {/* Enhanced Hero Section with Image */}
                <div className="relative h-48 sm:h-56 md:h-72 lg:h-96 overflow-hidden">
                  {/* Parallax background image */}
                  <motion.div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${universe.image})`,
                    }}
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                  {/* Enhanced gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
                  <div className="absolute inset-0 bg-gradient-to-r from-rusker-blue/20 via-transparent to-transparent" />
                  
                  <div className="absolute inset-0 flex items-center justify-center py-3 sm:py-4 md:py-6">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                      className="text-center text-white px-4 sm:px-6 w-full max-w-full"
                    >
                      <motion.div 
                        className="flex items-center justify-center mb-3 sm:mb-4 md:mb-5"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.4, type: 'spring', stiffness: 200, damping: 15 }}
                      >
                        <div className="relative">
                          <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-xl sm:rounded-2xl md:rounded-3xl bg-white/25 backdrop-blur-md flex items-center justify-center border-2 border-white/40 shadow-2xl">
                            {(() => {
                              const IconComponent = universe.icon
                              return (
                                <motion.div 
                                  className="text-white w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14"
                                  animate={{ 
                                    rotate: [0, 5, -5, 0],
                                  }}
                                  transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                  }}
                                >
                                  <IconComponent />
                                </motion.div>
                              )
                            })()}
                          </div>
                          {/* Glow effect */}
                          <motion.div
                            className="absolute inset-0 rounded-xl sm:rounded-2xl md:rounded-3xl bg-white/20 blur-xl"
                            animate={{
                              opacity: [0.3, 0.6, 0.3],
                              scale: [1, 1.2, 1],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: 'easeInOut',
                            }}
                          />
                        </div>
                      </motion.div>
                      <motion.h2 
                        className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 drop-shadow-2xl px-3 sm:px-4 leading-tight"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        {universe.title}
                      </motion.h2>
                      <motion.p 
                        className="text-sm sm:text-base md:text-lg lg:text-xl text-white/95 max-w-2xl mx-auto leading-snug sm:leading-relaxed px-3 sm:px-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                      >
                        {universe.description}
                      </motion.p>
                    </motion.div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-4 sm:p-6 md:p-8 lg:p-12 space-y-6 sm:space-y-8 md:space-y-12 bg-gradient-to-b from-white to-gray-50/50">
                  {/* About Section */}
                  <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                    className="space-y-6"
                  >
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-text-dark relative inline-block">
                      {universe.content.about.title}
                      <motion.span
                        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-rusker-blue to-transparent"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.9, duration: 0.6 }}
                      />
                    </h3>
                    <p className="text-sm md:text-base lg:text-lg xl:text-xl text-gray-700 leading-relaxed whitespace-pre-line max-w-4xl">
                      {universe.content.about.description}
                    </p>
                  </motion.section>

                  {/* Process Section */}
                  {universe.content.process && universe.content.process.length > 0 && (
                    <motion.section
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8, duration: 0.6 }}
                      className="space-y-8"
                    >
                      <h3 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-text-dark">
                        Un accompagnement complet, de la conception à l&apos;expérience sur place.
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                        {universe.content.process.map((step, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ delay: 0.9 + index * 0.08, duration: 0.5 }}
                            whileHover={{ 
                              y: -4,
                              scale: 1.02,
                              transition: { duration: 0.2 }
                            }}
                            className="group relative p-4 sm:p-5 md:p-6 lg:p-8 rounded-lg sm:rounded-xl md:rounded-2xl bg-gradient-to-br from-white via-white to-gray-50/50 border border-gray-200/80 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                          >
                            {/* Number indicator */}
                            <div className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-rusker-blue/20 to-rusker-blue/10 flex items-center justify-center text-rusker-blue font-bold text-[10px] sm:text-xs md:text-sm border border-rusker-blue/20">
                              {index + 1}
                            </div>
                            <h4 className="text-base sm:text-lg md:text-xl font-bold text-rusker-blue mb-2 md:mb-3 pr-8 sm:pr-10 md:pr-12 group-hover:text-[#1f5a75] transition-colors">
                              {step.title}
                            </h4>
                            <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed">{step.description}</p>
                            {/* Hover accent */}
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-rusker-blue to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </motion.div>
                        ))}
                      </div>
                    </motion.section>
                  )}

                  {/* Services Section */}
                  {universe.content.services && universe.content.services.length > 0 && (
                    <motion.section
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1, duration: 0.6 }}
                      className="space-y-8"
                    >
                      <h3 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-text-dark">
                        Nous nous occupons de tout
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                        {universe.content.services.map((service, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ delay: 1.1 + index * 0.08, duration: 0.5 }}
                            whileHover={{ 
                              y: -4,
                              scale: 1.02,
                              transition: { duration: 0.2 }
                            }}
                            className="group relative p-4 sm:p-5 md:p-6 lg:p-8 rounded-lg sm:rounded-xl md:rounded-2xl bg-gradient-to-br from-white via-white to-gray-50/50 border border-gray-200/80 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                          >
                            <h4 className="text-base sm:text-lg md:text-xl font-bold text-rusker-blue mb-2 md:mb-3 group-hover:text-[#1f5a75] transition-colors">
                              {service.title}
                            </h4>
                            <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed">{service.description}</p>
                            {/* Hover accent */}
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-rusker-blue to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </motion.div>
                        ))}
                      </div>
                    </motion.section>
                  )}

                  {/* Features Section */}
                  {universe.content.features && universe.content.features.length > 0 && (
                    <motion.section
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2, duration: 0.6 }}
                      className="space-y-8"
                    >
                      <h3 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-text-dark">
                        {universe.title === 'RUSKER EVENTS' 
                          ? 'Du teambuilding intime à la conférence internationale.'
                          : universe.title === 'RUSKER NETWORK'
                          ? 'Connectez-vous à l\'écosystème qui fait bouger Barcelone.'
                          : ''}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                        {universe.content.features.map((feature, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ delay: 1.3 + index * 0.08, duration: 0.5 }}
                            whileHover={{ 
                              y: -4,
                              scale: 1.02,
                              transition: { duration: 0.2 }
                            }}
                            className="group relative p-4 sm:p-5 md:p-6 lg:p-8 rounded-lg sm:rounded-xl md:rounded-2xl bg-gradient-to-br from-white via-white to-gray-50/50 border border-gray-200/80 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                          >
                            <h4 className="text-base sm:text-lg md:text-xl font-bold text-rusker-blue mb-2 md:mb-3 group-hover:text-[#1f5a75] transition-colors">
                              {feature.title}
                            </h4>
                            <p className="text-xs sm:text-sm md:text-base text-gray-700 whitespace-pre-line leading-relaxed">{feature.description}</p>
                            {/* Hover accent */}
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-rusker-blue to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </motion.div>
                        ))}
                      </div>
                    </motion.section>
                  )}
                </div>
              </div>

              {/* Enhanced Footer with CTA - Sticky at bottom */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.6 }}
                className="relative overflow-hidden border-t border-white/10 flex-shrink-0"
              >
                {/* Gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-rusker-blue via-[#1f5a75] to-[#1a4d66]" />
                
                {/* Animated gradient overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                  animate={{
                    x: ['-100%', '200%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: 'linear',
                  }}
                />
                
                {/* Decorative pattern */}
                <div className="absolute inset-0 opacity-[0.08]" style={{
                  backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)`,
                  backgroundSize: '24px 24px',
                }} />
                
                {/* Content */}
                <div className="relative z-10 p-4 sm:p-5 md:p-8 lg:p-10">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-5 md:gap-6 max-w-5xl mx-auto">
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.5, duration: 0.6 }}
                      className="flex-1 text-center md:text-left"
                    >
                      <h4 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white mb-1">
                        Prêt à créer votre expérience sur mesure ?
                      </h4>
                      <p className="text-white/80 text-xs sm:text-sm md:text-base lg:text-lg">
                        Discutons de votre projet et créons ensemble quelque chose d&apos;exceptionnel.
                      </p>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, x: 30, scale: 0.9 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      transition={{ delay: 1.6, duration: 0.6, type: 'spring', stiffness: 200 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-shrink-0 w-full md:w-auto"
                    >
                      <Button
                        onClick={scrollToForm}
                        variant="secondary"
                        size="large"
                        className="relative bg-white text-rusker-blue hover:bg-gray-50 shadow-2xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all duration-300 font-bold text-sm sm:text-base md:text-lg px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-xl sm:rounded-2xl overflow-hidden group/btn w-full md:w-auto"
                      >
                        {/* Button shine effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                          initial={{ x: '-100%' }}
                          whileHover={{ x: '200%' }}
                          transition={{ duration: 0.6 }}
                        />
                        <span className="relative z-10 flex items-center gap-2 md:gap-3">
                          Construire mon projet
                          <motion.svg
                            className="w-4 h-4 md:w-5 md:h-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2.5}
                            viewBox="0 0 24 24"
                            initial={{ x: 0 }}
                            whileHover={{ x: 5 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </motion.svg>
                        </span>
                      </Button>
                    </motion.div>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-3xl" />
                  <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
    </AnimatePresence>
  )
}

