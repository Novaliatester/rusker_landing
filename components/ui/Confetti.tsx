'use client'

import { useEffect, useRef } from 'react'

interface ConfettiParticle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  rotation: number
  rotationSpeed: number
}

const colors = ['#277396', '#2a8bb0', '#1a6b8a', '#34a3c4', '#4db8d4']

export default function Confetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<ConfettiParticle[]>([])
  const animationFrameRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Create particles
    const particleCount = 150
    const particles: ConfettiParticle[] = []

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: -10 - Math.random() * 100,
        vx: (Math.random() - 0.5) * 4,
        vy: 2 + Math.random() * 4,
        size: 6 + Math.random() * 8,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.2,
      })
    }

    particlesRef.current = particles

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      let activeParticles = 0

      particles.forEach((particle, index) => {
        // Only update if particle is still on screen
        if (particle.y < canvas.height + 20) {
          activeParticles++
          
          // Update position
          particle.x += particle.vx
          particle.y += particle.vy
          particle.rotation += particle.rotationSpeed

          // Add gravity
          particle.vy += 0.15

          // Draw particle
          ctx.save()
          ctx.translate(particle.x, particle.y)
          ctx.rotate(particle.rotation)
          ctx.fillStyle = particle.color
          ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size)
          ctx.restore()
        }
      })

      // Stop animation when all particles are off screen
      if (activeParticles > 0) {
        animationFrameRef.current = requestAnimationFrame(animate)
      } else {
        // Clear canvas after all particles are gone
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ mixBlendMode: 'normal' }}
    />
  )
}

