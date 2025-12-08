'use client'

import { Suspense } from 'react'
import { motion } from 'framer-motion'
import FormContainer from '@/components/form/FormContainer'
import { getAssetPath } from '@/lib/utils'
import { fadeInUp } from '@/lib/animations'

function FormContent() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header Section with Logo */}
      <motion.header
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="relative bg-gradient-to-br from-neutral-dark via-neutral-dark/95 to-neutral-dark overflow-hidden"
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-travel rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-events rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 md:pt-12 pb-16 sm:pb-20 md:pb-24">
          <div className="flex flex-col items-center text-center space-y-4 sm:space-y-5">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img 
                src={getAssetPath('/images/2026 Rusker/Logos/Rusker (white).png')} 
                alt="Rusker" 
                className="h-8 sm:h-10 md:h-12 w-auto mx-auto"
              />
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="max-w-3xl w-full"
            >
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight px-2">
                Créez votre expérience
                <span className="block mt-1 bg-gradient-to-r from-travel-light via-white to-events-light bg-clip-text text-transparent">
                  sur mesure à Barcelone
                </span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-white/80 text-sm sm:text-base max-w-xl"
            >
              Voyages, séminaires ou événements : nous créons des expériences uniques adaptées à vos objectifs
            </motion.p>
          </div>
        </div>

        {/* Decorative wave transition */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg
            viewBox="0 0 1440 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
            preserveAspectRatio="none"
          >
            <path
              d="M0 80L60 70C120 60 240 40 360 30C480 20 600 20 720 25C840 30 960 40 1080 45C1200 50 1320 50 1380 50L1440 50V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z"
              fill="white"
            />
          </svg>
        </div>
      </motion.header>

      {/* Form Section */}
      <div className="relative -mt-1 bg-white">
        <FormContainer />
      </div>
    </main>
  )
}

export default function FormPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-travel border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <FormContent />
    </Suspense>
  )
}
