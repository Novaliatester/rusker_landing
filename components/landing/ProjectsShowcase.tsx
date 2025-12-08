'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useMemo } from 'react'
import Link from 'next/link'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import { getAssetPath } from '@/lib/utils'
import { useI18n } from '@/lib/i18n'
import { getBlogPost } from '@/lib/blogData'

export default function ProjectsShowcase() {
  const { t } = useI18n()
  
  const projects = useMemo(() => {
    const essecPost = getBlogPost('case-study-essec')
    const aiSummitPost = getBlogPost('ai-summit-barcelona-story')
    const shoptalkPost = getBlogPost('case-study-wesharetrust-shoptalk')
    
    return [
      {
        title: t('projects.essec.title'),
        client: t('projects.essec.client'),
        description: t('projects.essec.description'),
        image: essecPost?.image ? getAssetPath(essecPost.image) : getAssetPath('/images/project-essec.jpg'),
        stats: { students: 22, companies: 5, events: 2 },
        blogSlug: 'case-study-essec',
      },
      {
        title: t('projects.aiSummit.title'),
        client: t('projects.aiSummit.client'),
        description: t('projects.aiSummit.description'),
        image: aiSummitPost?.image ? getAssetPath(aiSummitPost.image) : getAssetPath('/images/ai-summit-0201.jpg'),
        stats: { participants: '1 200', speakers: 80, days: 3 },
        blogSlug: 'ai-summit-barcelona-story',
      },
      {
        title: t('projects.shoptalk.title'),
        client: t('projects.shoptalk.client'),
        description: t('projects.shoptalk.description'),
        image: shoptalkPost?.image ? getAssetPath(shoptalkPost.image) : getAssetPath('/images/shoptalk-0201.jpg'),
        stats: { attendees: '100+', format: 'High-level' },
        blogSlug: 'case-study-wesharetrust-shoptalk',
      },
    ]
  }, [t])
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="projects" ref={ref} className="relative overflow-hidden bg-bg-light py-16 md:py-20 lg:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(47,52,51,0.08),_transparent_60%)]" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeInUp}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1 text-sm font-semibold uppercase tracking-widest text-neutral-dark">
            {t('projects.badge')}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text-dark leading-[1.15]">
            {t('projects.title')}{' '}
            <motion.span
              className="relative inline-block text-neutral-dark"
              whileHover={{ scale: 1.05, rotate: -3 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              {t('projects.transform')}
            </motion.span>{' '}
            et{' '}
            <motion.span
              className="relative inline-block text-neutral-dark"
              whileHover={{ scale: 1.05, rotate: 3 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              {t('projects.inspire')}
            </motion.span>
          </h2>
          <p className="mt-4 text-base md:text-lg text-gray-600 leading-relaxed">
            {t('projects.subtitle')}
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-1 gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project, index) => {
            return (
              <motion.div key={index} variants={fadeInUp} className="p-2 md:p-4">
                <Link href={`/blog/${project.blogSlug}`} className="block h-full">
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ type: 'tween', duration: 0.15 }}
                    className="group relative cursor-pointer h-full min-h-[360px] md:min-h-[440px] rounded-card bg-white shadow-soft overflow-hidden transition-all duration-300 border-2 border-transparent hover:border-neutral-dark flex flex-col"
                  >
                    {/* Image */}
                    <div className="relative h-40 md:h-48 overflow-hidden">
                      <div
                        className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                        style={{
                          backgroundImage: `url(${project.image})`,
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur">
                          {project.client}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative p-4 md:p-6 flex-1 flex flex-col">
                      <div className="flex-1 mb-4 md:mb-8">
                        <h3 className="text-lg md:text-xl font-bold text-text-dark leading-[1.2] break-words group-hover:text-neutral-dark transition-colors">
                          {project.title}
                        </h3>
                        <p className="mt-2 md:mt-3 text-sm md:text-base text-gray-600">{project.description}</p>
                      </div>
                
                      {/* Stats - aligned at bottom */}
                      <div className="mt-auto pt-4 border-t border-gray-100">
                        <div className="flex flex-wrap gap-4">
                          {Object.entries(project.stats).map(([key, value]) => (
                            <div key={key} className="text-center">
                              <div className="text-lg font-bold text-neutral-dark">{value}</div>
                              <div className="text-xs uppercase tracking-wide text-gray-500">
                                {key === 'students' && t('projects.stats.students')}
                                {key === 'companies' && t('projects.stats.companies')}
                                {key === 'events' && t('projects.stats.events')}
                                {key === 'participants' && t('projects.stats.participants')}
                                {key === 'speakers' && t('projects.stats.speakers')}
                                {key === 'days' && t('projects.stats.days')}
                                {key === 'attendees' && t('projects.stats.attendees')}
                                {key === 'format' && t('projects.stats.format')}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Arrow hint - bottom right */}
                      <div className="absolute bottom-6 right-6 md:opacity-0 opacity-100 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-neutral-dark font-medium md:hidden">{t('common.learnMore')}</span>
                          <motion.span
                            animate={{ x: [0, 4, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            className="text-2xl text-neutral-dark"
                          >
                            →
                          </motion.span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

