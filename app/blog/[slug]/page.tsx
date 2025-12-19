import type { Metadata } from 'next'
import { blogPosts, getBlogPost } from '@/lib/blogData'
import BlogPostClient from '@/components/blog/BlogPostClient'
import frMessages from '@/messages/fr.json'

const baseUrl = 'https://rusker-travel.com'

// Helper function to get blog post metadata
function getBlogPostMetadata(slug: string) {
  const post = getBlogPost(slug)
  if (!post) return null

  const postData = frMessages.blog.posts[post.id as keyof typeof frMessages.blog.posts]
  if (!postData) return null

  return {
    post,
    title: postData.title,
    excerpt: postData.excerpt,
  }
}

// Generate metadata for each blog post
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const metadata = getBlogPostMetadata(params.slug)
  
  if (!metadata) {
    return {
      title: 'Article non trouvé',
      description: 'Cet article n\'existe pas.',
    }
  }

  const { post, title, excerpt } = metadata
  const imageUrl = post.image 
    ? `${baseUrl}${post.image.startsWith('/') ? '' : '/'}${post.image}`
    : `${baseUrl}/images/hero-barcelona-hd.jpg`

  return {
    title,
    description: excerpt,
    keywords: [
      'Learning Expedition',
      'Barcelona',
      'Barcelone',
      'blog',
      post.category === 'case-study' ? 'cas d\'étude' : '',
      post.category === 'insight' ? 'insights' : '',
      post.category === 'ecosystem' ? 'écosystème' : '',
      post.category === 'event' ? 'événement' : '',
    ].filter(Boolean),
    openGraph: {
      title,
      description: excerpt,
      url: `${baseUrl}/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: excerpt,
      images: [imageUrl],
    },
    alternates: {
      canonical: `${baseUrl}/blog/${post.slug}`,
    },
  }
}

// Generate static params for all blog posts
export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return <BlogPostClient slug={params.slug} />
}
