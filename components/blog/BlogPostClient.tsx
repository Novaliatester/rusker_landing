'use client'

import { useEffect, useState, memo, Suspense } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import Footer from '@/components/landing/Footer'
import { useI18n } from '@/lib/i18n'
import { getBlogPost, blogPosts } from '@/lib/blogData'
import { getAssetPath } from '@/lib/utils'

// Lazy load the article content for faster initial page load
const BlogArticleContent = dynamic(() => import('@/components/blog/BlogArticleContent'), {
  loading: () => (
    <div className="space-y-4 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      <div className="h-4 bg-gray-200 rounded w-full"></div>
    </div>
  ),
})

interface BlogPostClientProps {
  slug: string;
}

// Memoized related post card component
const RelatedPostCard = memo(function RelatedPostCard({ 
  post, 
  categoryColors,
  t 
}: { 
  post: typeof blogPosts[0];
  categoryColors: Record<string, string>;
  t: (key: string, params?: Record<string, string | number>) => string;
}) {
  const [imageLoaded, setImageLoaded] = useState(false)
  
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
      prefetch={false}
    >
      {post.image && (
        <div className="relative h-48 overflow-hidden bg-gray-100">
          {/* Skeleton loader */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-shimmer" />
          )}
          <Image
            src={getAssetPath(post.image)}
            alt={t(`blog.posts.${post.id}.title`)}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className={`object-cover transition-all duration-500 group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
        </div>
      )}
      <div className="p-6">
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-3 ${categoryColors[post.category]}`}>
          {t(`blog.categories.${post.category}`)}
        </span>
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-neutral-dark transition-colors line-clamp-2">
          {t(`blog.posts.${post.id}.title`)}
        </h3>
      </div>
    </Link>
  )
})

export default function BlogPostClient({ slug }: BlogPostClientProps) {
  const { t } = useI18n()
  const post = getBlogPost(slug)

  const [mounted, setMounted] = useState(false)
  const [heroImageLoaded, setHeroImageLoaded] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || !post) {
    return (
      <main className="min-h-screen pt-20">
        <div className="animate-pulse">
          <div className="h-96 bg-gray-200"></div>
          <div className="max-w-4xl mx-auto px-4 py-16 space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </main>
    )
  }

  const categoryColors: Record<string, string> = {
    'insight': 'bg-purple-100 text-purple-700',
    'case-study': 'bg-blue-100 text-blue-700',
    'ecosystem': 'bg-green-100 text-green-700',
    'event': 'bg-orange-100 text-orange-700',
  }

  // Get related posts (same category, excluding current post)
  const relatedPosts = blogPosts
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 3)

  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section with Image */}
      <section className="relative py-20 bg-gradient-to-br from-neutral-dark via-neutral-dark/90 to-neutral-dark/80">
        {post.image && (
          <div className="absolute inset-0 opacity-10">
            <Image
              src={getAssetPath(post.image)}
              alt=""
              fill
              sizes="100vw"
              className={`object-cover transition-opacity duration-500 ${
                heroImageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setHeroImageLoaded(true)}
              priority // Hero image should load immediately
            />
          </div>
        )}
        
        <div className="relative mx-auto max-w-4xl px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Back Button */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors group"
            >
              <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              {t('blog.backToBlog')}
            </Link>

            {/* Category & Date */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${categoryColors[post.category]}`}>
                {t(`blog.categories.${post.category}`)}
              </span>
              <time dateTime={post.date} className="text-white/70">
                {new Date(post.date).toLocaleDateString('fr-FR', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </time>
              <span className="text-white/70">
                {t('blog.readTime', { time: post.readTime })}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-[1.1]">
              {t(`blog.posts.${post.id}.title`)}
            </h1>

            {/* Excerpt */}
            <p className="text-lg md:text-xl text-white/80 leading-relaxed">
              {t(`blog.posts.${post.id}.excerpt`)}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Suspense fallback={
              <div className="space-y-4 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            }>
              <BlogArticleContent postId={post.id} />
            </Suspense>
          </motion.div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              {t('blog.relatedArticles')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <RelatedPostCard
                  key={relatedPost.id}
                  post={relatedPost}
                  categoryColors={categoryColors}
                  t={t}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  )
}

