import { Variants } from 'framer-motion'

export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
}

export const slideIn: Variants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
}

export const heroAnimation: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
}

export const buttonHover = {
  scale: 1.02,
  transition: { duration: 0.2 },
}

export const cardHover = {
  scale: 1.02,
  y: -4,
  transition: { duration: 0.25 },
}

export const buttonPulse = {
  scale: [1, 1.05, 1],
  boxShadow: [
    '0 0 0 0 rgba(39, 115, 150, 0.7)',
    '0 0 0 10px rgba(39, 115, 150, 0)',
    '0 0 0 0 rgba(39, 115, 150, 0)',
  ],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: 'easeInOut',
  },
}

export const buttonGlow = {
  boxShadow: [
    '0 0 20px rgba(39, 115, 150, 0.5)',
    '0 0 40px rgba(39, 115, 150, 0.8)',
    '0 0 20px rgba(39, 115, 150, 0.5)',
  ],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: 'easeInOut',
  },
}

