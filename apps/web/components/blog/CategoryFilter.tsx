'use client'

import { motion } from 'framer-motion'
import { BlogPost } from '@/lib/blogData'
import { useI18n } from '@/lib/i18n'

interface CategoryFilterProps {
  selectedCategory: BlogPost['category'] | 'all';
  onSelectCategory: (category: BlogPost['category'] | 'all') => void;
}

export default function CategoryFilter({ selectedCategory, onSelectCategory }: CategoryFilterProps) {
  const { t } = useI18n()
  
  const categories: (BlogPost['category'] | 'all')[] = ['all', 'insight', 'case-study', 'ecosystem', 'event']

  return (
    <div className="flex flex-wrap gap-3 justify-center mb-12">
      {categories.map((category) => (
        <motion.button
          key={category}
          onClick={() => onSelectCategory(category)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
            selectedCategory === category
              ? 'bg-neutral-dark text-white shadow-lg'
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          {t(`blog.categories.${category}`)}
        </motion.button>
      ))}
    </div>
  )
}

