'use client'

import Link from 'next/link'
import { useI18n } from '@/lib/i18n'
import LearningExpeditionArticle from '@/components/blog/articles/LearningExpeditionArticle'
import AISummitArticle from '@/components/blog/articles/AISummitArticle'
import LexintownTransformationArticle from '@/components/blog/articles/LexintownTransformationArticle'
import Rusker360Article from '@/components/blog/articles/Rusker360Article'
import FrenchTechEcosystemArticle from '@/components/blog/articles/FrenchTechEcosystemArticle'
import EssecCaseStudyArticle from '@/components/blog/articles/EssecCaseStudyArticle'
import EscenCaseStudyArticle from '@/components/blog/articles/EscenCaseStudyArticle'
import WeshareTrustCaseStudyArticle from '@/components/blog/articles/WeshareTrustCaseStudyArticle'
import BarcelonaTechEcosystemArticle from '@/components/blog/articles/BarcelonaTechEcosystemArticle'

interface BlogArticleContentProps {
  postId: string;
}

export default function BlogArticleContent({ postId }: BlogArticleContentProps) {
  const { t, locale } = useI18n()

  // Article content components
  const articleComponents: Record<string, JSX.Element> = {
    'learning-expedition-definition': <LearningExpeditionArticle />,
    'ai-summit-barcelona-story': <AISummitArticle />,
    'lexintown-rusker-transformation': <LexintownTransformationArticle />,
    'rusker-360-agency': <Rusker360Article />,
    'french-tech-barcelona-ecosystem': <FrenchTechEcosystemArticle />,
    'case-study-essec': <EssecCaseStudyArticle />,
    'case-study-escen': <EscenCaseStudyArticle />,
    'case-study-wesharetrust-shoptalk': <WeshareTrustCaseStudyArticle />,
    'barcelona-tech-ecosystem': <BarcelonaTechEcosystemArticle />,
  }

  return (
    <article className="prose prose-lg max-w-none">
      {articleComponents[postId] || <DefaultArticle postId={postId} />}
    </article>
  )
}

// Default article component
function DefaultArticle({ postId }: { postId: string }) {
  const { t } = useI18n()
  return (
    <div>
      <p className="text-lg text-gray-700 leading-relaxed mb-6">
        {t(`blog.posts.${postId}.content`)}
      </p>
    </div>
  )
}
