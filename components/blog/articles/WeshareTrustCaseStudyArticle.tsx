'use client'

import { useI18n } from '@/lib/i18n'
import Link from 'next/link'

export default function WeshareTrustCaseStudyArticle() {
  const { locale } = useI18n()

  if (locale === 'en') {
    return <WeshareTrustCaseStudyArticleEn />
  } else if (locale === 'es') {
    return <WeshareTrustCaseStudyArticleEs />
  }
  
  return <WeshareTrustCaseStudyArticleFr />
}

function WeshareTrustCaseStudyArticleFr() {
  return (
    <div className="space-y-8">
      <p className="text-lg text-gray-700 leading-relaxed">
        Début juin 2025, <strong>Shoptalk Europe</strong> — l'un des plus grands événements mondiaux dédiés à l'avenir du retail — s'est tenu à Barcelone. 
        La ville a accueilli des milliers de décideurs internationaux venus explorer les nouvelles tendances : IA, unified commerce, retail media, expérience 
        client, nouveaux business models, et innovations technologiques.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        Dans ce contexte, <strong>WeShareTrust</strong>, solution spécialisée dans l'authentification des avis clients et la transparence e-commerce, a sollicité 
        Rusker pour concevoir un side event premium en marge du salon. Objectif : rassembler les leaders du retail, présenter des innovations concrètes et 
        créer un espace exclusif de networking, loin du bruit du salon, mais au cœur de son énergie.
      </p>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">1. Le besoin de WeShareTrust : un événement ciblé, inspirant et orienté solutions</h2>
      
      <div className="bg-purple-50 border-l-4 border-purple-600 p-6 my-8 rounded-r-xl">
        <p className="text-lg text-gray-900 mb-3">WeShareTrust souhaitait :</p>
        <ul className="space-y-2 text-gray-800">
          <li>• toucher les décideurs présents à Shoptalk Europe,</li>
          <li>• s'intégrer dans les discussions stratégiques autour de la confiance client,</li>
          <li>• mettre en avant son rôle dans la transformation du retail digital,</li>
          <li>• créer un événement intime, qualitatif et haut niveau.</li>
        </ul>
        <p className="text-gray-800 mt-4">
          Leur vision : un rooftop emblématique, des conversations pertinentes, et des démonstrations produit qui parlent aux C-Level, Head of E-commerce, 
          Head of Growth et Retail Media Directors présents à Barcelone.
        </p>
      </div>

      <p className="text-lg text-gray-700 leading-relaxed">
        Rusker a donc conçu un format sur mesure : un panel premium + des démos exclusives + un cocktail networking dans un lieu iconique.
      </p>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">2. Le lieu : Casa de les Punxes, un rooftop au cœur de Barcelone</h2>
      
      <div className="bg-gradient-to-r from-orange-50 to-red-50 p-8 rounded-2xl my-8 border-l-4 border-orange-600">
        <p className="text-lg text-gray-900 mb-4">
          Pour créer un cadre exceptionnel, l'événement s'est tenu à la <strong>Casa de les Punxes</strong>, l'un des rooftops les plus élégants et emblématiques de la ville.
        </p>
        <p className="text-gray-800 mb-2">
          Un lieu chargé d'histoire, idéal pour des échanges stratégiques tout en profitant d'une vue imprenable sur Barcelone.
        </p>
        <p className="text-gray-700 text-sm">
          <strong>L'atmosphère :</strong> intime, haut de gamme, chaleureuse, parfaitement alignée avec l'identité de WeshareTrust.
        </p>
        <p className="text-gray-800 mt-4">
          Une centaine de décideurs du retail, des marques, des plateformes e-commerce et des solutions SaaS étaient présents.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">3. Le contenu de la soirée : trois interventions au cœur des enjeux du retail moderne</h2>

      <div className="space-y-6 my-8">
        <div className="bg-white p-8 rounded-2xl border-2 border-blue-200 shadow-sm">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">1) Kevin Kahn — CEO d'Albatross AI</h3>
          <p className="text-gray-800 font-semibold mb-3">Thématique : Optimiser les pages produits grâce à l'analyse attentionnelle en IA</p>
          <p className="text-gray-700 text-sm mb-3">
            Albatross AI est une entreprise suisse qui révolutionne l'e-commerce grâce à un moteur d'IA capable d'identifier exactement où les utilisateurs 
            regardent sur une page produit.
          </p>
          <p className="text-gray-800 mb-2 text-sm">Leur technologie permet :</p>
          <ul className="space-y-1 text-gray-700 text-sm ml-6">
            <li>• de détecter les zones d'attention réelle,</li>
            <li>• d'identifier les "dead zones" invisibles aux visiteurs,</li>
            <li>• de repositionner visuels, badges, USP ou blocs de réassurance,</li>
            <li>• d'améliorer les taux de conversion jusqu'à +400% dans certains cas.</li>
          </ul>
          <p className="text-gray-700 text-sm mt-3 italic">
            Kevin Kahn a présenté des démonstrations concrètes montrant comment l'IA permet d'optimiser automatiquement la mise en page d'un site — un outil 
            précieux à l'ère où chaque point de conversion compte.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border-2 border-indigo-200 shadow-sm">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">2) Antoine Grimal — Fondateur de Dialog</h3>
          <p className="text-gray-800 font-semibold mb-3">Thématique : Personnalisation conversationnelle & expérience client omnicanale</p>
          <p className="text-gray-700 text-sm mb-3">
            Dialog (askdialog.com) est une solution d'assistants conversationnels IA permettant aux marques de répondre automatiquement aux questions des 
            clients, d'améliorer la conversion via un accompagnement intelligent, d'augmenter la satisfaction et l'autonomie utilisateur, de réduire la charge 
            du support, d'offrir une expérience omnicanale plus fluide.
          </p>
          <p className="text-gray-800 text-sm italic">
            La vision d'Antoine : le futur du retail ne sera pas seulement transactionnel — il sera conversationnel.
          </p>
          <p className="text-gray-700 text-sm mt-3">
            Les décideurs présents ont particulièrement apprécié : la capacité de Dialog à se connecter aux données internes, la précision contextuelle de 
            l'IA, les cas d'usage appliqués à des grandes marques retail & DTC.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border-2 border-purple-200 shadow-sm">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">3) Démo de WeShareTrust — La confiance comme levier de croissance retail</h3>
          <p className="text-gray-700 text-sm mb-3">
            WeShareTrust a conclu la session avec une démonstration de son produit : une solution permettant aux retailers de collecter, authentifier et diffuser 
            des avis clients fiables, vérifiés, contextualisés et impossibles à manipuler.
          </p>
          <p className="text-gray-800 font-semibold mb-2 text-sm">Leur rôle dans le paysage retail :</p>
          <ul className="space-y-1 text-gray-700 text-sm ml-6">
            <li>• sécuriser la transparence,</li>
            <li>• améliorer la crédibilité des pages produits,</li>
            <li>• augmenter la conversion grâce à des preuves sociales réelles,</li>
            <li>• protéger marques et consommateurs face à la montée des faux avis.</li>
          </ul>
          <p className="text-gray-700 text-sm mt-3 italic">
            À l'heure où les marques tentent d'unifier leurs parcours online/offline, la confiance client devient un pilier incontournable du commerce moderne.
          </p>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">4. Le cocktail networking : 100 décideurs, un rooftop, des conversations stratégiques</h2>

      <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-8 rounded-2xl my-8">
        <p className="text-gray-800 mb-4">
          Après les démonstrations, l'événement s'est déplacé sur le rooftop. Tapas catalans, vins locaux, coucher de soleil, vue sur la ville… Un cadre idéal 
          pour créer des connexions de haut niveau.
        </p>
        <p className="text-gray-800 font-semibold mb-2">Les échanges ont tourné autour de :</p>
        <ul className="space-y-1 text-gray-700 text-sm">
          <li>• l'IA appliquée au retail,</li>
          <li>• l'avenir du retail media,</li>
          <li>• la unification online/offline (Unified Commerce),</li>
          <li>• l'automatisation,</li>
          <li>• le rôle des données dans la personnalisation,</li>
          <li>• les défis de la confiance client.</li>
        </ul>
        <p className="text-gray-800 mt-4">
          L'ambiance était à la fois professionnelle et conviviale — exactement ce que recherchent les leaders du retail lorsqu'ils viennent à Shoptalk.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">5. Les enseignements de ce side event : ce que la soirée a vraiment apporté</h2>

      <div className="grid md:grid-cols-2 gap-6 my-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <p className="text-gray-800 font-semibold mb-2 text-sm">1. Le retail entre dans une ère d'optimisation intelligente</p>
          <p className="text-gray-600 text-xs">
            Albatross AI, Dialog et WeshareTrust incarnent trois piliers : voir, comprendre, rassurer.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <p className="text-gray-800 font-semibold mb-2 text-sm">2. Les marques veulent des solutions applicables immédiatement</p>
          <p className="text-gray-600 text-xs">
            Pas des concepts. Des outils concrets. Des résultats mesurables.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <p className="text-gray-800 font-semibold mb-2 text-sm">3. Barcelone confirme son rôle de hub retail-tech</p>
          <p className="text-gray-600 text-xs">
            Avec Shoptalk Europe, la ville devient un point de rencontre privilégié pour les directions e-commerce, les responsables data & IA, 
            les acteurs du retail média, les scale-ups technologiques.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <p className="text-gray-800 font-semibold mb-2 text-sm">4. Un side event réussi est un espace de qualité, pas de quantité</p>
          <p className="text-gray-600 text-xs">
            100 décideurs → 100 conversations utiles.
          </p>
        </div>
      </div>

      <div className="bg-green-50 p-6 rounded-xl my-8 border-l-4 border-green-600">
        <p className="text-gray-800 font-semibold mb-2">5. La collaboration WeShareTrust x French Tech x Rusker crée une valeur unique</p>
        <p className="text-gray-700 text-sm">
          Expertise produit + ancrage local + exécution événementielle.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Conclusion : un événement qui rapproche innovation et retail</h2>

      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-2xl my-8 border-l-4 border-neutral-dark">
        <p className="text-lg text-gray-900 leading-relaxed">
          Le side event WeshareTrust x Shoptalk Europe 2025 a démontré qu'un format intime, bien programmé et pensé pour les décideurs peut avoir autant — 
          voire plus — d'impact que le salon principal.
        </p>
        <p className="text-lg text-gray-800 mt-4">
          Grâce à la qualité des invités, des speakers, du contenu et du cadre, la soirée a positionné WeShareTrust comme un acteur clé de la transformation 
          retail en Europe.
        </p>
      </div>

      <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-200">
        <p className="text-sm font-semibold text-blue-900 mb-2">📚 Articles connexes</p>
        <ul className="space-y-2 text-sm">
          <li>
            <Link href="/blog/ai-summit-barcelona-story" className="text-blue-700 hover:text-blue-900 underline">
              → Découvrez comment Rusker Events produit des événements à impact
            </Link>
          </li>
          <li>
            <Link href="/blog/rusker-360-agency" className="text-blue-700 hover:text-blue-900 underline">
              → En savoir plus sur Rusker Events et la production événementielle
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

function WeshareTrustCaseStudyArticleEn() {
  return (
    <div className="space-y-8">
      <p className="text-lg text-gray-700 leading-relaxed">
        In early June 2025, <strong>Shoptalk Europe</strong> — one of the world's largest events dedicated to the future of retail — was held in Barcelona. 
        The city welcomed thousands of international decision-makers who came to explore new trends: AI, unified commerce, retail media, customer 
        experience, new business models, and technological innovations.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        In this context, <strong>WeShareTrust</strong>, a solution specializing in customer review authentication and e-commerce transparency, asked 
        Rusker to design a premium side event alongside the show. Objective: bring together retail leaders, present concrete innovations and 
        create an exclusive networking space, far from the noise of the show, but at the heart of its energy.
      </p>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">1. WeShareTrust's Need: A Targeted, Inspiring and Solutions-Oriented Event</h2>
      
      <div className="bg-purple-50 border-l-4 border-purple-600 p-6 my-8 rounded-r-xl">
        <p className="text-lg text-gray-900 mb-3">WeShareTrust wanted to:</p>
        <ul className="space-y-2 text-gray-800">
          <li>• reach decision-makers present at Shoptalk Europe,</li>
          <li>• integrate into strategic discussions around customer trust,</li>
          <li>• highlight its role in the transformation of digital retail,</li>
          <li>• create an intimate, qualitative and high-level event.</li>
        </ul>
        <p className="text-gray-800 mt-4">
          Their vision: an iconic rooftop, relevant conversations, and product demonstrations that speak to C-Levels, Head of E-commerce, 
          Head of Growth and Retail Media Directors present in Barcelona.
        </p>
      </div>

      <p className="text-lg text-gray-700 leading-relaxed">
        Rusker therefore designed a tailor-made format: a premium panel + exclusive demos + a networking cocktail in an iconic venue.
      </p>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">2. The Venue: Casa de les Punxes, a Rooftop in the Heart of Barcelona</h2>
      
      <div className="bg-gradient-to-r from-orange-50 to-red-50 p-8 rounded-2xl my-8 border-l-4 border-orange-600">
        <p className="text-lg text-gray-900 mb-4">
          To create an exceptional setting, the event was held at <strong>Casa de les Punxes</strong>, one of the most elegant and iconic rooftops in the city.
        </p>
        <p className="text-gray-800 mb-2">
          A place steeped in history, ideal for strategic exchanges while enjoying a breathtaking view of Barcelona.
        </p>
        <p className="text-gray-700 text-sm">
          <strong>The atmosphere:</strong> intimate, high-end, warm, perfectly aligned with WeshareTrust's identity.
        </p>
        <p className="text-gray-800 mt-4">
          About a hundred retail decision-makers, brands, e-commerce platforms and SaaS solutions were present.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">3. The Evening's Content: Three Interventions at the Heart of Modern Retail Challenges</h2>

      <div className="space-y-6 my-8">
        <div className="bg-white p-8 rounded-2xl border-2 border-blue-200 shadow-sm">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">1) Kevin Kahn — CEO of Albatross AI</h3>
          <p className="text-gray-800 font-semibold mb-3">Topic: Optimizing product pages thanks to AI attentional analysis</p>
          <p className="text-gray-700 text-sm mb-3">
            Albatross AI is a Swiss company revolutionizing e-commerce thanks to an AI engine capable of identifying exactly where users 
            look on a product page.
          </p>
          <p className="text-gray-800 mb-2 text-sm">Their technology allows to:</p>
          <ul className="space-y-1 text-gray-700 text-sm ml-6">
            <li>• detect zones of real attention,</li>
            <li>• identify "dead zones" invisible to visitors,</li>
            <li>• reposition visuals, badges, USPs or reassurance blocks,</li>
            <li>• improve conversion rates up to +400% in some cases.</li>
          </ul>
          <p className="text-gray-700 text-sm mt-3 italic">
            Kevin Kahn presented concrete demonstrations showing how AI allows to automatically optimize site layout — a valuable tool 
            in an era where every conversion point counts.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border-2 border-indigo-200 shadow-sm">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">2) Antoine Grimal — Founder of Dialog</h3>
          <p className="text-gray-800 font-semibold mb-3">Topic: Conversational Personalization & Omnichannel Customer Experience</p>
          <p className="text-gray-700 text-sm mb-3">
            Dialog (askdialog.com) is an AI conversational assistant solution allowing brands to automatically answer customer questions, 
            improve conversion via intelligent support, increase user satisfaction and autonomy, reduce support load, 
            offer a smoother omnichannel experience.
          </p>
          <p className="text-gray-800 text-sm italic">
            Antoine's vision: the future of retail will not only be transactional — it will be conversational.
          </p>
          <p className="text-gray-700 text-sm mt-3">
            Decision-makers present particularly appreciated: Dialog's ability to connect to internal data, the contextual precision of 
            AI, use cases applied to major retail & DTC brands.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border-2 border-purple-200 shadow-sm">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">3) WeShareTrust Demo — Trust as a Retail Growth Lever</h3>
          <p className="text-gray-700 text-sm mb-3">
            WeShareTrust concluded the session with a demonstration of its product: a solution allowing retailers to collect, authenticate and disseminate 
            reliable, verified, contextualized and unmanipulatable customer reviews.
          </p>
          <p className="text-gray-800 font-semibold mb-2 text-sm">Their role in the retail landscape:</p>
          <ul className="space-y-1 text-gray-700 text-sm ml-6">
            <li>• secure transparency,</li>
            <li>• improve product page credibility,</li>
            <li>• increase conversion thanks to real social proof,</li>
            <li>• protect brands and consumers against the rise of fake reviews.</li>
          </ul>
          <p className="text-gray-700 text-sm mt-3 italic">
            At a time when brands are trying to unify their online/offline journeys, customer trust becomes an unavoidable pillar of modern commerce.
          </p>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">4. The Networking Cocktail: 100 Decision-Makers, a Rooftop, Strategic Conversations</h2>

      <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-8 rounded-2xl my-8">
        <p className="text-gray-800 mb-4">
          After the demonstrations, the event moved to the rooftop. Catalan tapas, local wines, sunset, city view... An ideal setting 
          to create high-level connections.
        </p>
        <p className="text-gray-800 font-semibold mb-2">Exchanges revolved around:</p>
        <ul className="space-y-1 text-gray-700 text-sm">
          <li>• AI applied to retail,</li>
          <li>• the future of retail media,</li>
          <li>• online/offline unification (Unified Commerce),</li>
          <li>• automation,</li>
          <li>• the role of data in personalization,</li>
          <li>• customer trust challenges.</li>
        </ul>
        <p className="text-gray-800 mt-4">
          The atmosphere was both professional and friendly — exactly what retail leaders are looking for when they come to Shoptalk.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">5. Lessons from this Side Event: What the Evening Really Brought</h2>

      <div className="grid md:grid-cols-2 gap-6 my-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <p className="text-gray-800 font-semibold mb-2 text-sm">1. Retail is entering an era of intelligent optimization</p>
          <p className="text-gray-600 text-xs">
            Albatross AI, Dialog and WeshareTrust embody three pillars: see, understand, reassure.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <p className="text-gray-800 font-semibold mb-2 text-sm">2. Brands want immediately applicable solutions</p>
          <p className="text-gray-600 text-xs">
            Not concepts. Concrete tools. Measurable results.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <p className="text-gray-800 font-semibold mb-2 text-sm">3. Barcelona confirms its role as a retail-tech hub</p>
          <p className="text-gray-600 text-xs">
            With Shoptalk Europe, the city becomes a privileged meeting point for e-commerce directorates, data & AI managers, 
            retail media players, technology scale-ups.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <p className="text-gray-800 font-semibold mb-2 text-sm">4. A successful side event is a space of quality, not quantity</p>
          <p className="text-gray-600 text-xs">
            100 decision-makers → 100 useful conversations.
          </p>
        </div>
      </div>

      <div className="bg-green-50 p-6 rounded-xl my-8 border-l-4 border-green-600">
        <p className="text-gray-800 font-semibold mb-2">5. The WeShareTrust x French Tech x Rusker collaboration creates unique value</p>
        <p className="text-gray-700 text-sm">
          Product expertise + local anchorage + event execution.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Conclusion: An Event That Bridges Innovation and Retail</h2>

      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-2xl my-8 border-l-4 border-neutral-dark">
        <p className="text-lg text-gray-900 leading-relaxed">
          The WeshareTrust x Shoptalk Europe 2025 side event demonstrated that an intimate, well-programmed format designed for decision-makers can have as much — 
          if not more — impact than the main show.
        </p>
        <p className="text-lg text-gray-800 mt-4">
          Thanks to the quality of guests, speakers, content and setting, the evening positioned WeShareTrust as a key player in retail 
          transformation in Europe.
        </p>
      </div>

      <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-200">
        <p className="text-sm font-semibold text-blue-900 mb-2">📚 Related Articles</p>
        <ul className="space-y-2 text-sm">
          <li>
            <Link href="/blog/ai-summit-barcelona-story" className="text-blue-700 hover:text-blue-900 underline">
              → Discover how Rusker Events produces impactful events
            </Link>
          </li>
          <li>
            <Link href="/blog/rusker-360-agency" className="text-blue-700 hover:text-blue-900 underline">
              → Learn more about Rusker Events and event production
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

function WeshareTrustCaseStudyArticleEs() {
  return (
    <div className="space-y-8">
      <p className="text-lg text-gray-700 leading-relaxed">
        A principios de junio de 2025, <strong>Shoptalk Europe</strong> — uno de los mayores eventos mundiales dedicados al futuro del retail — se celebró en Barcelona. 
        La ciudad acogió a miles de tomadores de decisiones internacionales que vinieron a explorar las nuevas tendencias: IA, comercio unificado, retail media, experiencia 
        del cliente, nuevos modelos de negocio e innovaciones tecnológicas.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        En este contexto, <strong>WeShareTrust</strong>, solución especializada en la autenticación de opiniones de clientes y la transparencia en el comercio electrónico, solicitó a 
        Rusker diseñar un evento paralelo premium al margen de la feria. Objetivo: reunir a los líderes del retail, presentar innovaciones concretas y 
        crear un espacio exclusivo de networking, lejos del ruido de la feria, pero en el corazón de su energía.
      </p>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">1. La necesidad de WeShareTrust: un evento dirigido, inspirador y orientado a soluciones</h2>
      
      <div className="bg-purple-50 border-l-4 border-purple-600 p-6 my-8 rounded-r-xl">
        <p className="text-lg text-gray-900 mb-3">WeShareTrust deseaba:</p>
        <ul className="space-y-2 text-gray-800">
          <li>• llegar a los tomadores de decisiones presentes en Shoptalk Europe,</li>
          <li>• integrarse en las discusiones estratégicas en torno a la confianza del cliente,</li>
          <li>• destacar su papel en la transformación del retail digital,</li>
          <li>• crear un evento íntimo, cualitativo y de alto nivel.</li>
        </ul>
        <p className="text-gray-800 mt-4">
          Su visión: un rooftop emblemático, conversaciones pertinentes y demostraciones de productos que hablen a los C-Level, Head of E-commerce, 
          Head of Growth y Retail Media Directors presentes en Barcelona.
        </p>
      </div>

      <p className="text-lg text-gray-700 leading-relaxed">
        Rusker diseñó, por tanto, un formato a medida: un panel premium + demostraciones exclusivas + un cóctel de networking en un lugar icónico.
      </p>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">2. El lugar: Casa de les Punxes, un rooftop en el corazón de Barcelona</h2>
      
      <div className="bg-gradient-to-r from-orange-50 to-red-50 p-8 rounded-2xl my-8 border-l-4 border-orange-600">
        <p className="text-lg text-gray-900 mb-4">
          Para crear un entorno excepcional, el evento se celebró en la <strong>Casa de les Punxes</strong>, uno de los rooftops más elegantes y emblemáticos de la ciudad.
        </p>
        <p className="text-gray-800 mb-2">
          Un lugar cargado de historia, ideal para intercambios estratégicos mientras se disfruta de una vista inmejorable de Barcelona.
        </p>
        <p className="text-gray-700 text-sm">
          <strong>El ambiente:</strong> íntimo, de alta gama, cálido, perfectamente alineado con la identidad de WeshareTrust.
        </p>
        <p className="text-gray-800 mt-4">
          Unos cien tomadores de decisiones del retail, marcas, plataformas de comercio electrónico y soluciones SaaS estuvieron presentes.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">3. El contenido de la velada: tres intervenciones en el corazón de los desafíos del retail moderno</h2>

      <div className="space-y-6 my-8">
        <div className="bg-white p-8 rounded-2xl border-2 border-blue-200 shadow-sm">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">1) Kevin Kahn — CEO de Albatross AI</h3>
          <p className="text-gray-800 font-semibold mb-3">Temática: Optimizar las páginas de producto gracias al análisis atencional con IA</p>
          <p className="text-gray-700 text-sm mb-3">
            Albatross AI es una empresa suiza que revoluciona el comercio electrónico gracias a un motor de IA capaz de identificar exactamente dónde miran 
            los usuarios en una página de producto.
          </p>
          <p className="text-gray-800 mb-2 text-sm">Su tecnología permite:</p>
          <ul className="space-y-1 text-gray-700 text-sm ml-6">
            <li>• detectar las zonas de atención real,</li>
            <li>• identificar las "zonas muertas" invisibles para los visitantes,</li>
            <li>• reposicionar elementos visuales, insignias, USP o bloques de tranquilidad,</li>
            <li>• mejorar las tasas de conversión hasta un +400% en algunos casos.</li>
          </ul>
          <p className="text-gray-700 text-sm mt-3 italic">
            Kevin Kahn presentó demostraciones concretas que mostraban cómo la IA permite optimizar automáticamente el diseño de un sitio web, una herramienta 
            valiosa en una era en la que cada punto de conversión cuenta.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border-2 border-indigo-200 shadow-sm">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">2) Antoine Grimal — Fundador de Dialog</h3>
          <p className="text-gray-800 font-semibold mb-3">Temática: Personalización conversacional y experiencia del cliente omnicanal</p>
          <p className="text-gray-700 text-sm mb-3">
            Dialog (askdialog.com) es una solución de asistentes conversacionales de IA que permite a las marcas responder automáticamente a las preguntas de los 
            clientes, mejorar la conversión a través de un acompañamiento inteligente, aumentar la satisfacción y la autonomía del usuario, reducir la carga 
            del soporte, ofrecer una experiencia omnicanal más fluida.
          </p>
          <p className="text-gray-800 text-sm italic">
            La visión de Antoine: el futuro del retail no será solo transaccional, será conversacional.
          </p>
          <p className="text-gray-700 text-sm mt-3">
            Los tomadores de decisiones presentes apreciaron particularmente: la capacidad de Dialog para conectarse a datos internos, la precisión contextual de 
            la IA, los casos de uso aplicados a grandes marcas de retail y DTC.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border-2 border-purple-200 shadow-sm">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">3) Demo de WeShareTrust — La confianza como palanca de crecimiento en retail</h3>
          <p className="text-gray-700 text-sm mb-3">
            WeShareTrust concluyó la sesión con una demostración de su producto: una solución que permite a los minoristas recopilar, autenticar y difundir 
            opiniones de clientes fiables, verificadas, contextualizadas e imposibles de manipular.
          </p>
          <p className="text-gray-800 font-semibold mb-2 text-sm">Su papel en el panorama del retail:</p>
          <ul className="space-y-1 text-gray-700 text-sm ml-6">
            <li>• asegurar la transparencia,</li>
            <li>• mejorar la credibilidad de las páginas de productos,</li>
            <li>• aumentar la conversión gracias a pruebas sociales reales,</li>
            <li>• proteger a marcas y consumidores frente al aumento de opiniones falsas.</li>
          </ul>
          <p className="text-gray-700 text-sm mt-3 italic">
            En un momento en que las marcas intentan unificar sus recorridos online/offline, la confianza del cliente se convierte en un pilar ineludible del comercio moderno.
          </p>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">4. El cóctel de networking: 100 tomadores de decisiones, un rooftop, conversaciones estratégicas</h2>

      <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-8 rounded-2xl my-8">
        <p className="text-gray-800 mb-4">
          Tras las demostraciones, el evento se trasladó al rooftop. Tapas catalanas, vinos locales, puesta de sol, vista de la ciudad... Un entorno ideal 
          para crear conexiones de alto nivel.
        </p>
        <p className="text-gray-800 font-semibold mb-2">Los intercambios giraron en torno a:</p>
        <ul className="space-y-1 text-gray-700 text-sm">
          <li>• la IA aplicada al retail,</li>
          <li>• el futuro del retail media,</li>
          <li>• la unificación online/offline (Unified Commerce),</li>
          <li>• la automatización,</li>
          <li>• el papel de los datos en la personalización,</li>
          <li>• los desafíos de la confianza del cliente.</li>
        </ul>
        <p className="text-gray-800 mt-4">
          El ambiente fue a la vez profesional y agradable, exactamente lo que buscan los líderes del retail cuando vienen a Shoptalk.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">5. Las lecciones de este evento paralelo: lo que la velada realmente aportó</h2>

      <div className="grid md:grid-cols-2 gap-6 my-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <p className="text-gray-800 font-semibold mb-2 text-sm">1. El retail entra en una era de optimización inteligente</p>
          <p className="text-gray-600 text-xs">
            Albatross AI, Dialog y WeshareTrust encarnan tres pilares: ver, comprender, tranquilizar.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <p className="text-gray-800 font-semibold mb-2 text-sm">2. Las marcas quieren soluciones aplicables de inmediato</p>
          <p className="text-gray-600 text-xs">
            No conceptos. Herramientas concretas. Resultados medibles.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <p className="text-gray-800 font-semibold mb-2 text-sm">3. Barcelona confirma su papel como hub retail-tech</p>
          <p className="text-gray-600 text-xs">
            Con Shoptalk Europe, la ciudad se convierte en un punto de encuentro privilegiado para las direcciones de comercio electrónico, los responsables de datos e IA, 
            los actores del retail media, las scale-ups tecnológicas.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <p className="text-gray-800 font-semibold mb-2 text-sm">4. Un evento paralelo exitoso es un espacio de calidad, no de cantidad</p>
          <p className="text-gray-600 text-xs">
            100 tomadores de decisiones → 100 conversaciones útiles.
          </p>
        </div>
      </div>

      <div className="bg-green-50 p-6 rounded-xl my-8 border-l-4 border-green-600">
        <p className="text-gray-800 font-semibold mb-2">5. La colaboración WeShareTrust x French Tech x Rusker crea un valor único</p>
        <p className="text-gray-700 text-sm">
          Experiencia de producto + anclaje local + ejecución de eventos.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Conclusión: un evento que une innovación y retail</h2>

      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-2xl my-8 border-l-4 border-neutral-dark">
        <p className="text-lg text-gray-900 leading-relaxed">
          El evento paralelo WeshareTrust x Shoptalk Europe 2025 demostró que un formato íntimo, bien programado y pensado para los tomadores de decisiones puede tener tanto — 
          o incluso más — impacto que la feria principal.
        </p>
        <p className="text-lg text-gray-800 mt-4">
          Gracias a la calidad de los invitados, los ponentes, el contenido y el entorno, la velada posicionó a WeShareTrust como un actor clave de la transformación 
          del retail en Europa.
        </p>
      </div>

      <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-200">
        <p className="text-sm font-semibold text-blue-900 mb-2">📚 Artículos relacionados</p>
        <ul className="space-y-2 text-sm">
          <li>
            <Link href="/blog/ai-summit-barcelona-story" className="text-blue-700 hover:text-blue-900 underline">
              → Descubre cómo Rusker Events produce eventos con impacto
            </Link>
          </li>
          <li>
            <Link href="/blog/rusker-360-agency" className="text-blue-700 hover:text-blue-900 underline">
              → Saber más sobre Rusker Events y la producción de eventos
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

