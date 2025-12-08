import { blogPosts } from '@/lib/blogData'
import BlogPostClient from '@/components/blog/BlogPostClient'

// Generate static params for all blog posts
export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return <BlogPostClient slug={params.slug} />
}
