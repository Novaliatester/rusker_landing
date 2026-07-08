'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

interface PageTransitionProps {
  color: string
  children: React.ReactNode
}

export default function PageTransition({ color, children }: PageTransitionProps) {
  const [showOverlay, setShowOverlay] = useState(true)

  useEffect(() => {
    // Start fading out the overlay after a brief moment
    const timer = setTimeout(() => {
      setShowOverlay(false)
    }, 100)
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {/* Page transition overlay that reveals the page */}
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              transition: { 
                duration: 0.6,
                ease: [0.4, 0, 0.2, 1]
              }
            }}
            className="fixed inset-0 pointer-events-none"
            style={{
              backgroundColor: color,
              zIndex: 9999,
            }}
          />
        )}
      </AnimatePresence>
      
      {/* Page content with staggered reveal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
          transition: { 
            duration: 0.4,
            delay: 0.2,
            ease: 'easeOut'
          }
        }}
      >
        {children}
      </motion.div>
    </>
  )
}

