'use client'

import { motion } from 'framer-motion'
import FormContainer from '@/components/form/FormContainer'
import { getAssetPath } from '@/lib/utils'
import { fadeInUp } from '@/lib/animations'

export default function FormPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header Section with Logo */}
      <motion.header
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="relative bg-gradient-to-br from-rusker-blue via-[#1f5a75] to-rusker-blue overflow-hidden"
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
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
                alt="Rusker Travel" 
                className="h-8 sm:h-10 md:h-12 w-auto mx-auto"
              />
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="max-w-2xl w-full"
            >
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-[1.2] px-2 break-words">
                Créez votre expérience sur mesure à Barcelone
              </h1>
            </motion.div>
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

