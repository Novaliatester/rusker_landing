/**
 * Photo gallery shown on expedition detail pages. Both current delegations are
 * the same trip (AI Summit Barcelona 2026), so they share one image pool.
 */
import SmartImage from '@/components/SmartImage'

export const GALLERY_IMAGES: { src: string; alt: string }[] = [
  { src: '/images/gallery/wtc-skyview.jpg', alt: 'World Trade Center Barcelona — AI Summit venue' },
  { src: '/images/delegation-aura.jpg', alt: 'Summit floor — AI in action' },
  { src: '/images/delegation-occitanie.jpg', alt: 'Networking face à la mer' },
  { src: '/images/gallery/summit-keynote-stage.jpg', alt: 'Keynote — AI Summit Barcelona' },
  { src: '/images/gallery/summit-garden-networking.jpg', alt: 'AI Summit Garden — networking' },
  { src: '/images/gallery/summit-audience-applause.jpg', alt: 'Audience du summit' },
  { src: '/images/gallery/summit-panel-floor.jpg', alt: 'Panel — AI Summit Barcelona' },
]

export default function ExpeditionGallery({ heroUrl }: { heroUrl: string | null }) {
  const images = GALLERY_IMAGES.filter((img) => img.src !== heroUrl)

  return (
    <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
      {images.map((img) => (
        <SmartImage key={img.src} src={img.src} alt={img.alt} className="h-36 w-full rounded-card sm:h-40" />
      ))}
    </div>
  )
}
