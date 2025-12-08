export interface BlogPost {
  id: string;
  slug: string;
  category: 'insight' | 'case-study' | 'ecosystem' | 'event';
  date: string;
  readTime: number; // in minutes
  image?: string;
  featured?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: 'learning-expedition-definition',
    slug: 'learning-expedition-definition',
    category: 'insight',
    date: '2024-12-01',
    readTime: 8,
    image: '/images/innovation-hub.jpg',
    featured: true,
  },
  {
    id: 'ai-summit-barcelona-story',
    slug: 'ai-summit-barcelona-story',
    category: 'event',
    date: '2024-11-25',
    readTime: 10,
    image: '/images/events-feature.png',
    featured: true,
  },
  {
    id: 'lexintown-rusker-transformation',
    slug: 'lexintown-rusker-transformation',
    category: 'insight',
    date: '2024-11-20',
    readTime: 7,
    image: '/images/creative-barcelona.jpg',
    featured: false,
  },
  {
    id: 'rusker-360-agency',
    slug: 'rusker-360-agency',
    category: 'insight',
    date: '2024-11-15',
    readTime: 9,
    image: '/images/hero-barcelona.jpg',
    featured: true,
  },
  {
    id: 'french-tech-barcelona-ecosystem',
    slug: 'french-tech-barcelona-ecosystem',
    category: 'ecosystem',
    date: '2024-11-10',
    readTime: 8,
    image: '/images/network-meeting.jpg',
    featured: false,
  },
  {
    id: 'case-study-essec',
    slug: 'case-study-essec',
    category: 'case-study',
    date: '2024-11-05',
    readTime: 6,
    image: '/images/project-essec.jpg',
    featured: false,
  },
  {
    id: 'case-study-escen',
    slug: 'case-study-escen',
    category: 'case-study',
    date: '2024-10-28',
    readTime: 6,
    image: '/images/barcelona-feature.jpg',
    featured: false,
  },
  {
    id: 'case-study-wesharetrust-shoptalk',
    slug: 'case-study-wesharetrust-shoptalk',
    category: 'case-study',
    date: '2024-10-20',
    readTime: 5,
    image: '/images/events-hero.jpg',
    featured: false,
  },
  {
    id: 'barcelona-tech-ecosystem',
    slug: 'barcelona-tech-ecosystem',
    category: 'ecosystem',
    date: '2024-10-15',
    readTime: 12,
    image: '/images/barcelona-beach.jpg',
    featured: true,
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter(post => post.featured);
}

export function getPostsByCategory(category: BlogPost['category']): BlogPost[] {
  return blogPosts.filter(post => post.category === category);
}

