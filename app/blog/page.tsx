'use client'

import { useState, useMemo, useCallback, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import Footer from '@/components/landing/Footer'
import BlogCard from '@/components/blog/BlogCard'
import CategoryFilter from '@/components/blog/CategoryFilter'
import { useI18n } from '@/lib/i18n'
import { blogPosts, BlogPost } from '@/lib/blogData'

// Skeleton loader for blog cards
function BlogCardSkeleton() {
  return (
    <div className="h-full bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
      <div className="h-56 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-shimmer" />
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse" />
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse" />
        <div className="space-y-2">
          <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    </div>
  )
}

export default function BlogPage() {
  const { t } = useI18n()
  const [selectedCategory, setSelectedCategory] = useState<BlogPost['category'] | 'all'>('all')

  // Memoize filtered posts to avoid recalculation on every render
  const filteredPosts = useMemo(() => {
    return selectedCategory === 'all' 
      ? blogPosts 
      : blogPosts.filter(post => post.category === selectedCategory)
  }, [selectedCategory])

  // Memoize callback to prevent unnecessary re-renders
  const handleCategorySelect = useCallback((category: BlogPost['category'] | 'all') => {
    setSelectedCategory(category)
  }, [])

  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section - Reduced animation for faster perceived load */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-neutral-dark via-neutral-dark/90 to-neutral-dark/80 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,_rgba(255,255,255,0.08),_transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,_rgba(255,255,255,0.06),_transparent_50%)]" />
        </div>
        
        <div className="relative mx-auto max-w-7xl px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/80 mb-6">
              {t('blog.badge')}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.1] px-2">
              {t('blog.title')}
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed px-2">
              {t('blog.description')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-white to-gray-50">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          {/* Category Filter */}
          <CategoryFilter 
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategorySelect}
          />

          {/* Blog Grid with AnimatePresence for smooth transitions */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={selectedCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredPosts.map((post, index) => (
                <BlogCard 
                  key={post.id} 
                  post={post} 
                  index={index}
                  priority={index < 3} // Prioritize first 3 images for LCP
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty State */}
          {filteredPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-lg text-gray-600">
                {t('blog.noArticles') || 'Aucun article trouvé dans cette catégorie.'}
              </p>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}

