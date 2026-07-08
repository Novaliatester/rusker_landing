'use client'

import { useState, memo } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { getAssetPath } from '@/lib/utils'
import { BlogPost } from '@/lib/blogData'
import { useI18n } from '@/lib/i18n'

interface BlogCardProps {
  post: BlogPost;
  index: number;
  priority?: boolean; // For above-the-fold images
}

function BlogCard({ post, index, priority = false }: BlogCardProps) {
  const { t } = useI18n()
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  
  const categoryColors = {
    'insight': 'bg-purple-100 text-purple-700',
    'case-study': 'bg-blue-100 text-blue-700',
    'ecosystem': 'bg-green-100 text-green-700',
    'event': 'bg-orange-100 text-orange-700',
  }

  // Limit animation delay to first 6 cards for faster perceived load
  const animationDelay = index < 6 ? index * 0.05 : 0.3

  return (
    <motion.article
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: animationDelay }}
      layout
    >
      <Link 
        href={`/blog/${post.slug}`}
        className="group block h-full"
        prefetch={index < 3} // Prefetch only first 3 posts
      >
        <div className="h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
          {/* Image with loading state */}
          {post.image && (
            <div className="relative h-56 overflow-hidden bg-gray-100">
              {/* Skeleton loader */}
              {!imageLoaded && !imageError && (
                <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-shimmer" />
              )}
              
              {/* Optimized Image */}
              <Image
                src={getAssetPath(post.image)}
                alt={t(`blog.posts.${post.id}.title`)}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className={`object-cover transition-all duration-500 group-hover:scale-105 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
                priority={priority || index < 3} // Prioritize first 3 images
                loading={priority || index < 3 ? 'eager' : 'lazy'}
              />
              
              {/* Featured badge */}
              {post.featured && (
                <div className="absolute top-4 right-4 bg-neutral-dark text-white px-3 py-1 rounded-full text-xs font-medium z-10">
                  Featured
                </div>
              )}
            </div>
          )}
          
          {/* Content */}
          <div className="p-6">
            {/* Category & Date */}
            <div className="flex items-center gap-3 mb-3">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${categoryColors[post.category]}`}>
                {t(`blog.categories.${post.category}`)}
              </span>
              <time 
                dateTime={post.date}
                className="text-sm text-gray-500"
              >
                {new Date(post.date).toLocaleDateString('fr-FR', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </time>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-neutral-dark transition-colors line-clamp-2">
              {t(`blog.posts.${post.id}.title`)}
            </h3>

            {/* Excerpt */}
            <p className="text-gray-600 mb-4 line-clamp-3">
              {t(`blog.posts.${post.id}.excerpt`)}
            </p>

            {/* Read More & Time */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <span className="text-sm font-semibold text-neutral-dark group-hover:gap-3 inline-flex items-center gap-2 transition-all">
                {t('blog.readMore')}
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              <span className="text-xs text-gray-500">
                {t('blog.readTime', { time: post.readTime })}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

// Memoize to prevent unnecessary re-renders
export default memo(BlogCard)

