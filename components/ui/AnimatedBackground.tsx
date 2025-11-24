'use client'

import { useEffect, useRef, useState } from 'react'

interface Blob {
  x: number
  y: number
  targetX: number
  targetY: number
  radius: number
  targetRadius: number
  baseRadius: number // Fixed base radius for this blob
  opacity: number
  targetOpacity: number
  speed: number
  phase: number
}

interface TrailPoint {
  x: number
  y: number
  timestamp: number
  radius: number
}

interface AnimatedBackgroundProps {
  className?: string
  blobCount?: number
  baseOpacity?: number
}

export default function AnimatedBackground({
  className = '',
  blobCount = 2,
  baseOpacity = 0.3, // Reduced for less pronounced effect
}: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>()
  const mouseRef = useRef({ x: 0, y: 0 })
  const blobsRef = useRef<Blob[]>([])
  const trailRef = useRef<TrailPoint[]>([]) // History buffer for mouse trail
  const isMouseMovingRef = useRef(false)
  const mouseTimeoutRef = useRef<ReturnType<typeof setTimeout>>()
  const isMobileRef = useRef(false)
  const maxTrailLength = 35 // Maximum trail points (20-40 range)
  const trailLifetime = 1100 // Trail fade duration in ms (800-1200ms range)

  // Initialize blobs
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Check if mobile
    isMobileRef.current = window.innerWidth < 768 || 'ontouchstart' in window

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    // Set canvas size to match container
    const resizeCanvas = () => {
      const container = canvas.parentElement
      if (container) {
        const rect = container.getBoundingClientRect()
        canvas.width = rect.width
        canvas.height = rect.height
      } else {
        // Fallback to window size if no parent
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
    }
    resizeCanvas()
    
    // Use ResizeObserver for better performance
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas()
    })
    
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement)
    }
    
    window.addEventListener('resize', resizeCanvas)

    // Initialize blobs with random positions - smaller radius (300-450px)
    const blobs: Blob[] = []
    for (let i = 0; i < blobCount; i++) {
      const baseRadius = 300 + Math.random() * 150 // 300-450px range (smaller)
      blobs.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        targetX: Math.random() * canvas.width,
        targetY: Math.random() * canvas.height,
        radius: baseRadius,
        targetRadius: baseRadius,
        baseRadius: baseRadius, // Store base radius
        opacity: baseOpacity * (0.8 + Math.random() * 0.2),
        targetOpacity: baseOpacity * (0.8 + Math.random() * 0.2),
        speed: 0.02 + Math.random() * 0.03,
        phase: Math.random() * Math.PI * 2,
      })
    }
    blobsRef.current = blobs
    trailRef.current = []

    // Mouse move handler (throttled)
    let lastMouseMoveTime = 0
    const throttleDelay = 16 // ~60fps

    const getRelativeMousePosition = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect()
      return {
        x: clientX - rect.left,
        y: clientY - rect.top,
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now()
      if (now - lastMouseMoveTime < throttleDelay) return
      lastMouseMoveTime = now

      const relativePos = getRelativeMousePosition(e.clientX, e.clientY)
      mouseRef.current = relativePos
      isMouseMovingRef.current = true

      // Add position to trail buffer
      const trailPoint: TrailPoint = {
        x: relativePos.x,
        y: relativePos.y,
        timestamp: now,
        radius: 320 + Math.random() * 80, // 320-400px for trail blobs (smaller)
      }

      trailRef.current.push(trailPoint)

      // Limit trail length
      if (trailRef.current.length > maxTrailLength) {
        trailRef.current.shift()
      }

      // Clear existing timeout
      if (mouseTimeoutRef.current) {
        clearTimeout(mouseTimeoutRef.current)
      }

      // Set timeout to detect when mouse stops moving
      mouseTimeoutRef.current = setTimeout(() => {
        isMouseMovingRef.current = false
      }, 200)
    }

    // Touch move handler for mobile (optional, reduced intensity)
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0]
        const relativePos = getRelativeMousePosition(touch.clientX, touch.clientY)
        mouseRef.current = relativePos
        isMouseMovingRef.current = true

        if (mouseTimeoutRef.current) {
          clearTimeout(mouseTimeoutRef.current)
        }

        mouseTimeoutRef.current = setTimeout(() => {
          isMouseMovingRef.current = false
        }, 150)
      }
    }

    if (!isMobileRef.current) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true })
    } else {
      window.addEventListener('touchmove', handleTouchMove, { passive: true })
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const time = Date.now() * 0.001
      const currentTime = Date.now()

      // Clean up old trail points and draw trail
      if (!isMobileRef.current) {
        // Remove expired trail points
        trailRef.current = trailRef.current.filter(
          (point) => currentTime - point.timestamp < trailLifetime
        )

        // Draw trail blobs with fading opacity - softer trail
        trailRef.current.forEach((point, index) => {
          const age = currentTime - point.timestamp
          const normalizedAge = age / trailLifetime // 0 to 1
          const trailOpacity = baseOpacity * (1 - normalizedAge) * 0.4 // Fade from 40% to 0% (softer)

          // Create gradient for trail blob with smoother transitions
          const gradient = ctx.createRadialGradient(
            point.x,
            point.y,
            0,
            point.x,
            point.y,
            point.radius
          )

          // Softer, more gradual fade for trail
          gradient.addColorStop(0, `rgba(39, 115, 150, ${trailOpacity * 0.5})`)
          gradient.addColorStop(0.2, `rgba(39, 115, 150, ${trailOpacity * 0.35})`)
          gradient.addColorStop(0.4, `rgba(39, 115, 150, ${trailOpacity * 0.2})`)
          gradient.addColorStop(0.6, `rgba(39, 115, 150, ${trailOpacity * 0.1})`)
          gradient.addColorStop(0.8, `rgba(39, 115, 150, ${trailOpacity * 0.04})`)
          gradient.addColorStop(1, 'rgba(39, 115, 150, 0)')

          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2)
          ctx.fill()
        })
      }

      blobsRef.current.forEach((blob, index) => {
        // Update target position based on mouse or idle animation
        if (isMouseMovingRef.current && !isMobileRef.current && index === 0) {
          // Primary blob follows mouse directly (no delay) - instant positioning
          blob.targetX = mouseRef.current.x
          blob.targetY = mouseRef.current.y
          blob.x = mouseRef.current.x
          blob.y = mouseRef.current.y
        } else {
          // Idle animation for all blobs (or secondary blob when mouse is moving)
          const idleSpeed = blob.speed
          const amplitude = isMobileRef.current ? 2.0 : 0.8 // Larger movement on mobile
          const moveX = Math.sin(time * idleSpeed + blob.phase) * amplitude
          const moveY = Math.cos(time * idleSpeed * 0.7 + blob.phase) * amplitude
          
          // Update target position with bounds checking
          blob.targetX = Math.max(
            blob.radius * 0.5,
            Math.min(canvas.width - blob.radius * 0.5, blob.targetX + moveX)
          )
          blob.targetY = Math.max(
            blob.radius * 0.5,
            Math.min(canvas.height - blob.radius * 0.5, blob.targetY + moveY)
          )

          // Smooth interpolation to target position for idle/secondary blobs
          blob.x += (blob.targetX - blob.x) * 0.03
          blob.y += (blob.targetY - blob.y) * 0.03
        }

        // Idle scale oscillation (1.0 → 1.1 → 1.0)
        const scale = 1.0 + Math.sin(time * blob.speed + blob.phase) * 0.1
        blob.targetRadius = blob.baseRadius * scale

        // Smooth radius interpolation
        blob.radius += (blob.targetRadius - blob.radius) * 0.02

        // Idle opacity variation - reduced range
        // On mobile: slightly reduced
        const mobileMultiplier = isMobileRef.current ? 0.7 : 1.0
        const opacityVariation = baseOpacity * mobileMultiplier * (0.85 + Math.sin(time * blob.speed * 0.5 + blob.phase) * 0.15)
        blob.targetOpacity = Math.max(
          baseOpacity * mobileMultiplier * 0.85,
          Math.min(baseOpacity * mobileMultiplier * 1.15, opacityVariation)
        )

        // Smoother opacity interpolation for less jarring transitions
        blob.opacity += (blob.targetOpacity - blob.opacity) * 0.015

        // Create radial gradient with stronger colors
        const gradient = ctx.createRadialGradient(
          blob.x,
          blob.y,
          0,
          blob.x,
          blob.y,
          blob.radius
        )

        // Rusker Blue (#277396) with smoother, softer gradient transitions
        // More color stops for gradual, eye-friendly blending
        gradient.addColorStop(0, `rgba(39, 115, 150, ${blob.opacity * 0.85})`) // Slightly softer center
        gradient.addColorStop(0.15, `rgba(39, 115, 150, ${blob.opacity * 0.7})`)
        gradient.addColorStop(0.3, `rgba(39, 115, 150, ${blob.opacity * 0.5})`)
        gradient.addColorStop(0.5, `rgba(39, 115, 150, ${blob.opacity * 0.3})`)
        gradient.addColorStop(0.7, `rgba(39, 115, 150, ${blob.opacity * 0.15})`)
        gradient.addColorStop(0.85, `rgba(39, 115, 150, ${blob.opacity * 0.06})`)
        gradient.addColorStop(1, 'rgba(39, 115, 150, 0)')

        // Draw blob
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', resizeCanvas)
      if (!isMobileRef.current) {
        window.removeEventListener('mousemove', handleMouseMove)
      } else {
        window.removeEventListener('touchmove', handleTouchMove)
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (mouseTimeoutRef.current) {
        clearTimeout(mouseTimeoutRef.current)
      }
    }
  }, [blobCount, baseOpacity])

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 z-0 ${className}`}
      style={{ mixBlendMode: 'normal' }}
      aria-hidden="true"
    />
  )
}

