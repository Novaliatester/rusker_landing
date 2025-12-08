'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Footer from '@/components/landing/Footer'
import BlogArticleContent from '@/components/blog/BlogArticleContent'
import { useI18n } from '@/lib/i18n'
import { getBlogPost, blogPosts } from '@/lib/blogData'
import { getAssetPath } from '@/lib/utils'

interface BlogPostClientProps {
  slug: string;
}

export default function BlogPostClient({ slug }: BlogPostClientProps) {
  const { t } = useI18n()
  const post = getBlogPost(slug)

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || !post) {
    return null
  }

  const categoryColors = {
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
            <img
              src={getAssetPath(post.image)}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="relative mx-auto max-w-4xl px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Back Button */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors group"
            >
              <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              {t('blog.backToBlog')}
            </Link>

            {/* Category & Date */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${categoryColors[post.category]}`}>
                {t(`blog.categories.${post.category}`)}
              </span>
              <span className="text-white/70">
                {new Date(post.date).toLocaleDateString('fr-FR', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <BlogArticleContent postId={post.id} />
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
              {relatedPosts.map((relatedPost, index) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                  className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  {relatedPost.image && (
                    <div className="relative h-48 overflow-hidden bg-gray-100">
                      <img
                        src={getAssetPath(relatedPost.image)}
                        alt={t(`blog.posts.${relatedPost.id}.title`)}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-3 ${categoryColors[relatedPost.category]}`}>
                      {t(`blog.categories.${relatedPost.category}`)}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-neutral-dark transition-colors line-clamp-2">
                      {t(`blog.posts.${relatedPost.id}.title`)}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  )
}

