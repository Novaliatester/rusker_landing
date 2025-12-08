'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { getAssetPath } from '@/lib/utils'
import { BlogPost } from '@/lib/blogData'
import { useI18n } from '@/lib/i18n'

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export default function BlogCard({ post, index }: BlogCardProps) {
  const { t } = useI18n()
  
  const categoryColors = {
    'insight': 'bg-purple-100 text-purple-700',
    'case-study': 'bg-blue-100 text-blue-700',
    'ecosystem': 'bg-green-100 text-green-700',
    'event': 'bg-orange-100 text-orange-700',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link 
        href={`/blog/${post.slug}`}
        className="group block h-full"
      >
        <div className="h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
          {/* Image */}
          {post.image && (
            <div className="relative h-56 overflow-hidden bg-gray-100">
              <img
                src={getAssetPath(post.image)}
                alt={t(`blog.posts.${post.id}.title`)}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {post.featured && (
                <div className="absolute top-4 right-4 bg-neutral-dark text-white px-3 py-1 rounded-full text-xs font-medium">
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
              <span className="text-sm text-gray-500">
                {new Date(post.date).toLocaleDateString('fr-FR', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
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
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
    </motion.div>
  )
}

