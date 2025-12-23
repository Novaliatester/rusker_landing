/**
 * Cloudinary Video Configuration
 * 
 * Pour obtenir l'URL directe d'une vidéo Cloudinary :
 * Format: https://res.cloudinary.com/{cloud_name}/video/upload/{public_id}.mp4
 * 
 * Vous pouvez aussi ajouter des transformations pour optimiser :
 * https://res.cloudinary.com/{cloud_name}/video/upload/q_auto,f_auto/{public_id}.mp4
 */

const CLOUDINARY_CLOUD_NAME = 'dubdg6qf6'

// Helper pour construire l'URL Cloudinary
function getCloudinaryVideoUrl(publicId: string, options?: {
  quality?: 'auto' | number
  format?: 'auto' | 'mp4' | 'webm'
  width?: number
  height?: number
}): string {
  const baseUrl = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/upload`
  
  // Construire les transformations
  const transformations: string[] = []
  
  if (options?.quality === 'auto') {
    transformations.push('q_auto')
  } else if (options?.quality) {
    transformations.push(`q_${options.quality}`)
  }
  
  if (options?.format === 'auto') {
    transformations.push('f_auto')
  } else if (options?.format) {
    transformations.push(`f_${options.format}`)
  }
  
  if (options?.width) {
    transformations.push(`w_${options.width}`)
  }
  
  if (options?.height) {
    transformations.push(`h_${options.height}`)
  }
  
  const transformString = transformations.length > 0 
    ? `${transformations.join(',')}/` 
    : ''
  
  const extension = options?.format && options.format !== 'auto' 
    ? `.${options.format}` 
    : '.mp4'
  
  return `${baseUrl}/${transformString}${publicId}${extension}`
}

export const VIDEO_CONFIG = {
  landing: {
    // À remplacer par votre public_id Cloudinary
    url: process.env.NEXT_PUBLIC_CLOUDINARY_LANDING_VIDEO || 
         getCloudinaryVideoUrl('hero-barcelona-video', { quality: 'auto', format: 'auto' }),
    fallback: '/images/Hero Barcelona Video 1 4K (1).mp4',
    poster: '/images/hero-barcelona-hd.jpg'
  },
  travel: {
    // URL Cloudinary pour travel hero video - Optimisé pour chargement rapide
    url: process.env.NEXT_PUBLIC_CLOUDINARY_TRAVEL_VIDEO || 
         getCloudinaryVideoUrl('hero-video_l8nhaz', { 
           quality: 'auto', 
           format: 'auto',
           width: 1920  // Limite à Full HD pour réduire la taille du fichier
         }),
    fallback: '/images/hero-video.mp4',
    poster: '/images/travel-entreprises-0201.jpg'
  },
  events: {
    // URL Cloudinary pour events hero video - Optimisé pour chargement rapide
    url: process.env.NEXT_PUBLIC_CLOUDINARY_EVENTS_VIDEO || 
         getCloudinaryVideoUrl('events-hero-video_r2mhkm', { 
           quality: 'auto', 
           format: 'auto',
           width: 1920  // Limite à Full HD pour réduire la taille du fichier
         }),
    fallback: '/images/events-hero-video.mp4',
    poster: '/images/ai-summit-0201.jpg'
  },
  network: {
    // URL Cloudinary pour network hero video - Optimisé pour chargement rapide
    // w_1920 limite la largeur à 1920px (Full HD), réduisant significativement la taille
    url: process.env.NEXT_PUBLIC_CLOUDINARY_NETWORK_VIDEO || 
         getCloudinaryVideoUrl('network-hero-video_dtowsx', { 
           quality: 'auto', 
           format: 'auto',
           width: 1920  // Limite à Full HD pour réduire la taille du fichier
         }),
    fallback: '/images/network-hero-video.mp4',
    poster: '/images/network-talentboard-barcelona-0201.jpg'
  }
} as const

