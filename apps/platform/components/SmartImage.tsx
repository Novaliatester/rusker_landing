'use client'

import { useEffect, useRef, useState } from 'react'

type Props = {
  src: string
  alt: string
  /** Sizing + rounding for the box (e.g. "h-44 w-full rounded-card"). */
  className?: string
  /** object-position / extra image classes if needed. */
  imgClassName?: string
}

/**
 * Image with a shimmer skeleton behind it that fades in once decoded — removes
 * the pop-in when photos load. Handles the cached case (onLoad may fire before
 * hydration) by checking `complete` on mount.
 */
export default function SmartImage({ src, alt, className = '', imgClassName = '' }: Props) {
  const [loaded, setLoaded] = useState(false)
  const ref = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (ref.current?.complete) setLoaded(true)
  }, [])

  return (
    <span className={`block overflow-hidden ${loaded ? '' : 'skeleton'} ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={ref}
        src={src}
        alt={alt}
        loading="lazy"
        data-loaded={loaded}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        className={`img-fade h-full w-full object-cover ${imgClassName}`}
      />
    </span>
  )
}
