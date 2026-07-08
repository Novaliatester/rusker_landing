'use client'

import { useI18n } from '@/lib/i18n'
import Link from 'next/link'

export default function EscenCaseStudyArticle() {
  const { locale } = useI18n()

  if (locale === 'en') {
    return <EscenCaseStudyArticleEn />
  } else if (locale === 'es') {
    return <EscenCaseStudyArticleEs />
  }
  
  return <EscenCaseStudyArticleFr />
}

function EscenCaseStudyArticleFr() {
  return (
    <div className="space-y-8">
      <p className="text-lg text-gray-700 leading-relaxed">
        En 2025, <strong>ESCEN</strong> — l'école spécialisée en marketing digital et e-commerce du groupe Next-U — a sollicité Rusker pour 
        concevoir une Learning Expedition d'un mois à Barcelone. Les étudiants, venus de Paris, Lille, Lyon et Bordeaux, étaient accueillis sur 
        le campus de l'Université Pompeu Fabra pour suivre des enseignements académiques… mais l'objectif était aussi de les confronter à la 
        réalité du terrain, dans l'un des écosystèmes marketing les plus dynamiques d'Europe.
      </p>

      <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-8 rounded-r-xl">
        <p className="text-lg text-gray-900 font-semibold mb-2">Leur mission pédagogique :</p>
        <p className="text-gray-800">créer un projet e-commerce de A à Z.</p>
        <p className="text-gray-700 mt-3">
          La Learning Expedition devait donc leur apporter : de l'inspiration concrète, des bonnes pratiques, des exemples réels d'entreprises 
          opérant dans le digital, et une compréhension globale de la manière dont Barcelone structure son marketing et son e-commerce.
        </p>
      </div>

      <p className="text-lg text-gray-700 leading-relaxed">
        Rusker a construit un programme en quatre activations clés, chacune axée sur un angle différent du marketing digital moderne.
      </p>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">1. Comprendre l'écosystème : introduction au marketing barcelonais</h2>
      
      <p className="text-lg text-gray-700 leading-relaxed">
        La Learning Expedition débute par une session avec Guillaume Rostand, président de la French Tech Barcelona, pour comprendre le paysage digital local.
      </p>

      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl my-8">
        <p className="text-gray-800 mb-3"><strong>Objectif :</strong> donner aux étudiants une vision claire de l'écosystème digital local, et en particulier :</p>
        <ul className="space-y-1 text-gray-700 text-sm">
          <li>• les entreprises influentes en marketing digital,</li>
          <li>• le rôle des hubs tech et des communautés,</li>
          <li>• les tendances en acquisition, data & e-commerce,</li>
          <li>• Barcelone comme ville créative, internationale et orientée innovation.</li>
        </ul>
        <p className="text-gray-800 mt-4 text-sm">
          Les étudiants découvrent rapidement que Barcelone n'est pas seulement un "hub tech" : c'est une ville qui attire talents, agences, 
          annonceurs et scale-ups, avec une culture marketing orientée performance, design et agilité.
        </p>
      </div>

      <p className="text-lg text-gray-700 leading-relaxed">
        Cette mise en contexte pose les bases pour la suite : observer le marketing non pas comme un concept, mais comme un moteur réel d'entreprises digitales.
      </p>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">2. ManoMano — E-commerce & acquisition dans un marché espagnol compétitif</h2>

      <div className="bg-white p-8 rounded-2xl border-2 border-blue-200 shadow-sm my-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Première immersion : ManoMano</h3>
        <p className="text-gray-700 mb-4">
          L'un des leaders européens du e-commerce bricolage, implanté à Barcelone depuis plusieurs années.
        </p>
        <p className="text-gray-800 font-semibold mb-3">Pourquoi cette visite est essentielle pour des étudiants en e-commerce :</p>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-bold text-gray-900 mb-2">A. Comprendre l'implantation d'une entreprise française en Espagne</h4>
            <p className="text-gray-700 text-sm">
              ManoMano explique ce qui motive l'implantation barcelonaise (talents, compétitivité, environnement tech), comment adapter une stratégie 
              marketing à un marché étranger, les différences entre acquisition en France et en Espagne.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2">B. Découvrir les stratégies d'acquisition modernes</h4>
            <p className="text-gray-700 text-sm">
              Les intervenants partagent leurs principaux outils marketing, leurs méthodes de tracking et d'optimisation, la manière dont ils 
              structurent leurs funnels, le rôle de la data dans leur prise de décision.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2">C. Un retour d'expérience sur le scaling e-commerce</h4>
            <p className="text-gray-700 text-sm">
              ManoMano illustre comment une entreprise peut évoluer d'un marché national à un modèle européen, en adaptant ses messages, ses leviers 
              d'acquisition, sa structure d'équipe.
            </p>
          </div>
        </div>
        <p className="text-gray-800 mt-4 text-sm italic">
          Les étudiants comprennent à quel point le marketing est stratégique dans le scaling d'un e-commerce — bien plus que "faire des pubs".
        </p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">3. Product HQ (mesplaques.fr & Wellpapers) — Découvrir la chaîne complète d'un e-commerce personnalisé</h2>

      <p className="text-lg text-gray-700 leading-relaxed">
        Deuxième activation : l'univers fascinant de Product HQ, qui regroupe mesplaques.fr et Wellpapers, deux marques opérant dans les mêmes locaux 
        avec un savoir-faire industriel commun.
      </p>

      <div className="grid md:grid-cols-2 gap-6 my-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h4 className="font-bold text-gray-900 mb-3">Mesplaques.fr — un e-commerce très produit, très technique</h4>
          <p className="text-gray-700 text-sm mb-2">Les étudiants découvrent :</p>
          <ul className="space-y-1 text-gray-700 text-xs">
            <li>• comment fonctionne un e-commerce de produits personnalisés,</li>
            <li>• la différence entre plaques homologuées et non homologuées,</li>
            <li>• la relation entre digital, production, logistique et service client.</li>
          </ul>
          <p className="text-gray-700 text-sm mt-3">
            Ils voient, en conditions réelles, comment une commande en ligne déclenche toute une chaîne opérationnelle.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h4 className="font-bold text-gray-900 mb-3">Wellpapers — revaloriser une usine pour créer un second e-commerce</h4>
          <p className="text-gray-700 text-sm">
            Exemple parfait d'innovation interne : la même infrastructure de production est réutilisée pour créer un deuxième e-commerce — papier peint 
            personnalisé. Ce cas montre comment une entreprise optimise ses ressources existantes, crée un nouveau produit basé sur une maîtrise technique 
            déjà présente, scale deux marques en parallèle dans une même usine.
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-2xl my-8 border-l-4 border-purple-600">
        <h3 className="text-xl font-bold text-gray-900 mb-3">C. La chaîne logistique, du clic au colis</h3>
        <p className="text-gray-800 mb-3">C'est l'un des moments pédagogiques les plus forts du programme.</p>
        <p className="text-gray-700 text-sm mb-2">Les étudiants observent :</p>
        <ul className="space-y-1 text-gray-700 text-sm">
          <li>• la prise de commande,</li>
          <li>• la préparation du produit,</li>
          <li>• la découpe, l'impression, l'emballage,</li>
          <li>• les contrôles qualité,</li>
          <li>• la sortie logistique.</li>
        </ul>
        <p className="text-gray-800 mt-4 text-sm italic">
          Une vision rare de l'arrière-boutique du e-commerce : ce que les écoles enseignent rarement, mais que les entreprises vivent chaque jour.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">4. Un après-midi IA & marketing : comprendre les nouveaux leviers digitaux</h2>

      <p className="text-lg text-gray-700 leading-relaxed">
        Dernière activation : une immersion dans l'univers de l'IA appliquée au marketing et à l'e-commerce.
      </p>

      <div className="bg-amber-50 p-6 rounded-xl my-8 border-l-4 border-amber-600">
        <p className="text-gray-800 mb-3">Les étudiants :</p>
        <ul className="space-y-1 text-gray-700 text-sm">
          <li>• explorent des outils utilisés par les entreprises locales,</li>
          <li>• découvrent comment l'IA transforme l'acquisition, le contenu, la production créative,</li>
          <li>• rencontrent des acteurs barcelonais travaillant sur ces sujets,</li>
          <li>• échangent autour des opportunités professionnelles et des tendances émergentes.</li>
        </ul>
        <p className="text-gray-800 mt-4">
          Cette session clôture le programme avec une vision tournée vers l'avenir du marketing, parfaitement alignée avec leurs projets académiques.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">5. Synthèse des apprentissages : ce que les étudiants retiennent vraiment</h2>

      <div className="grid md:grid-cols-2 gap-6 my-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <p className="text-gray-700 text-sm mb-2"><strong>1. Le marketing digital n'est pas un métier isolé</strong></p>
          <p className="text-gray-600 text-xs">
            Il connecte produit, logistique, supply chain, acquisition, data et expérience client.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <p className="text-gray-700 text-sm mb-2"><strong>2. Un e-commerce ne scale jamais si la chaîne opérationnelle n'est pas solide</strong></p>
          <p className="text-gray-600 text-xs">
            La visite de Product HQ l'a montré clairement.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <p className="text-gray-700 text-sm mb-2"><strong>3. Barcelone est un hub où le marketing se pense de façon internationale</strong></p>
          <p className="text-gray-600 text-xs">
            Les stratégies sont pensées pour plusieurs marchés, plusieurs cultures et plusieurs langues.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <p className="text-gray-700 text-sm mb-2"><strong>4. L'IA n'est plus un concept : c'est un outil déjà opérationnel</strong></p>
          <p className="text-gray-600 text-xs">
            Les entreprises locales l'utilisent quotidiennement.
          </p>
        </div>
      </div>

      <div className="bg-green-50 p-6 rounded-xl my-8 border-l-4 border-green-600">
        <p className="text-gray-800 font-semibold mb-2">5. Une Learning Expedition est un accélérateur pour construire un projet e-commerce</p>
        <p className="text-gray-700 text-sm">
          Elle met en lumière : des modèles réels, des erreurs, des bonnes pratiques, et des dynamiques que les étudiants peuvent appliquer directement.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Conclusion : une immersion qui donne du sens au marketing digital</h2>

      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-2xl my-8 border-l-4 border-neutral-dark">
        <p className="text-lg text-gray-900 leading-relaxed">
          À travers ces quatre activations — ManoMano, Product HQ, IA & marketing, et introduction à l'écosystème barcelonais — les étudiants ont 
          découvert des visions différentes du e-commerce moderne : opérationnelle, stratégique, internationale, technique et créative.
        </p>
        <p className="text-lg text-gray-800 mt-4">
          Cette Learning Expedition leur a permis de : s'inspirer pour leur projet final, comprendre les coulisses du digital, rencontrer des 
          professionnels, et appréhender Barcelone comme un véritable terrain d'apprentissage. Une expérience complète, concrète, et alignée avec 
          les attentes d'une école experte dans le marketing digital.
        </p>
      </div>

      <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-200">
        <p className="text-sm font-semibold text-blue-900 mb-2">📚 Articles connexes</p>
        <ul className="space-y-2 text-sm">
          <li>
            <Link href="/blog/learning-expedition-definition" className="text-blue-700 hover:text-blue-900 underline">
              → Comprendre le format Learning Expedition et son impact
            </Link>
          </li>
          <li>
            <Link href="/blog/case-study-essec" className="text-blue-700 hover:text-blue-900 underline">
              → Découvrez un autre cas d'étude : ESSEC et le scaling
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

function EscenCaseStudyArticleEn() {
  return (
    <div className="space-y-8">
      <p className="text-lg text-gray-700 leading-relaxed">
        In 2025, <strong>ESCEN</strong> — the digital marketing and e-commerce school of the Next-U group — asked Rusker to 
        design a one-month Learning Expedition in Barcelona. Students from Paris, Lille, Lyon and Bordeaux were hosted on 
        the Pompeu Fabra University campus to follow academic courses... but the objective was also to confront them with the 
        reality of the field, in one of Europe's most dynamic marketing ecosystems.
      </p>

      <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-8 rounded-r-xl">
        <p className="text-lg text-gray-900 font-semibold mb-2">Their Pedagogical Mission:</p>
        <p className="text-gray-800">Create an e-commerce project from A to Z.</p>
        <p className="text-gray-700 mt-3">
          The Learning Expedition therefore had to bring them: concrete inspiration, best practices, real examples of companies 
          operating in digital, and a global understanding of how Barcelona structures its marketing and e-commerce.
        </p>
      </div>

      <p className="text-lg text-gray-700 leading-relaxed">
        Rusker built a program with four key activations, each focused on a different angle of modern digital marketing.
      </p>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">1. Understanding the Ecosystem: Introduction to Barcelona Marketing</h2>
      
      <p className="text-lg text-gray-700 leading-relaxed">
        The Learning Expedition begins with a session with Guillaume Rostand, President of French Tech Barcelona, to understand the local digital landscape.
      </p>

      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl my-8">
        <p className="text-gray-800 mb-3"><strong>Objective:</strong> Give students a clear vision of the local digital ecosystem, and in particular:</p>
        <ul className="space-y-1 text-gray-700 text-sm">
          <li>• influential digital marketing companies,</li>
          <li>• the role of tech hubs and communities,</li>
          <li>• trends in acquisition, data & e-commerce,</li>
          <li>• Barcelona as a creative, international and innovation-oriented city.</li>
        </ul>
        <p className="text-gray-800 mt-4 text-sm">
          Students quickly discover that Barcelona is not just a "tech hub": it is a city that attracts talents, agencies, 
          advertisers and scale-ups, with a marketing culture oriented towards performance, design and agility.
        </p>
      </div>

      <p className="text-lg text-gray-700 leading-relaxed">
        This context setting lays the foundations for what follows: observing marketing not as a concept, but as a real engine of digital companies.
      </p>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">2. ManoMano — E-commerce & Acquisition in a Competitive Spanish Market</h2>

      <div className="bg-white p-8 rounded-2xl border-2 border-blue-200 shadow-sm my-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">First Immersion: ManoMano</h3>
        <p className="text-gray-700 mb-4">
          One of the European leaders in DIY e-commerce, established in Barcelona for several years.
        </p>
        <p className="text-gray-800 font-semibold mb-3">Why this visit is essential for e-commerce students:</p>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-bold text-gray-900 mb-2">A. Understanding the establishment of a French company in Spain</h4>
            <p className="text-gray-700 text-sm">
              ManoMano explains what motivates the Barcelona establishment (talents, competitiveness, tech environment), how to adapt a 
              marketing strategy to a foreign market, differences between acquisition in France and Spain.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2">B. Discovering modern acquisition strategies</h4>
            <p className="text-gray-700 text-sm">
              Speakers share their main marketing tools, tracking and optimization methods, how they 
              structure their funnels, the role of data in their decision making.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2">C. Feedback on e-commerce scaling</h4>
            <p className="text-gray-700 text-sm">
              ManoMano illustrates how a company can evolve from a national market to a European model, adapting its messages, acquisition 
              levers, team structure.
            </p>
          </div>
        </div>
        <p className="text-gray-800 mt-4 text-sm italic">
          Students understand how strategic marketing is in scaling an e-commerce — much more than "running ads".
        </p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">3. Product HQ (mesplaques.fr & Wellpapers) — Discovering the Complete Chain of a Custom E-commerce</h2>

      <p className="text-lg text-gray-700 leading-relaxed">
        Second activation: the fascinating universe of Product HQ, which groups mesplaques.fr and Wellpapers, two brands operating in the same premises 
        with common industrial know-how.
      </p>

      <div className="grid md:grid-cols-2 gap-6 my-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h4 className="font-bold text-gray-900 mb-3">Mesplaques.fr — a very product-oriented, technical e-commerce</h4>
          <p className="text-gray-700 text-sm mb-2">Students discover:</p>
          <ul className="space-y-1 text-gray-700 text-xs">
            <li>• how a custom product e-commerce works,</li>
            <li>• the difference between approved and non-approved plates,</li>
            <li>• the relationship between digital, production, logistics and customer service.</li>
          </ul>
          <p className="text-gray-700 text-sm mt-3">
            They see, in real conditions, how an online order triggers a whole operational chain.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h4 className="font-bold text-gray-900 mb-3">Wellpapers — revaluing a factory to create a second e-commerce</h4>
          <p className="text-gray-700 text-sm">
            Perfect example of internal innovation: the same production infrastructure is reused to create a second e-commerce — custom 
            wallpaper. This case shows how a company optimizes existing resources, creates a new product based on technical mastery 
            already present, scales two brands in parallel in the same factory.
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-2xl my-8 border-l-4 border-purple-600">
        <h3 className="text-xl font-bold text-gray-900 mb-3">C. The Supply Chain, from Click to Parcel</h3>
        <p className="text-gray-800 mb-3">It is one of the strongest educational moments of the program.</p>
        <p className="text-gray-700 text-sm mb-2">Students observe:</p>
        <ul className="space-y-1 text-gray-700 text-sm">
          <li>• order taking,</li>
          <li>• product preparation,</li>
          <li>• cutting, printing, packaging,</li>
          <li>• quality controls,</li>
          <li>• logistics exit.</li>
        </ul>
        <p className="text-gray-800 mt-4 text-sm italic">
          A rare view of the e-commerce back shop: what schools rarely teach, but what companies live every day.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">4. An AI & Marketing Afternoon: Understanding New Digital Levers</h2>

      <p className="text-lg text-gray-700 leading-relaxed">
        Last activation: an immersion into the world of AI applied to marketing and e-commerce.
      </p>

      <div className="bg-amber-50 p-6 rounded-xl my-8 border-l-4 border-amber-600">
        <p className="text-gray-800 mb-3">Students:</p>
        <ul className="space-y-1 text-gray-700 text-sm">
          <li>• explore tools used by local companies,</li>
          <li>• discover how AI transforms acquisition, content, creative production,</li>
          <li>• meet Barcelona players working on these topics,</li>
          <li>• exchange around professional opportunities and emerging trends.</li>
        </ul>
        <p className="text-gray-800 mt-4">
          This session closes the program with a vision turned towards the future of marketing, perfectly aligned with their academic projects.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">5. Learning Synthesis: What Students Really Retain</h2>

      <div className="grid md:grid-cols-2 gap-6 my-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <p className="text-gray-700 text-sm mb-2"><strong>1. Digital marketing is not an isolated profession</strong></p>
          <p className="text-gray-600 text-xs">
            It connects product, logistics, supply chain, acquisition, data and customer experience.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <p className="text-gray-700 text-sm mb-2"><strong>2. An e-commerce never scales if the operational chain is not solid</strong></p>
          <p className="text-gray-600 text-xs">
            The visit to Product HQ showed it clearly.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <p className="text-gray-700 text-sm mb-2"><strong>3. Barcelona is a hub where marketing is thought internationally</strong></p>
          <p className="text-gray-600 text-xs">
            Strategies are thought for several markets, several cultures and several languages.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <p className="text-gray-700 text-sm mb-2"><strong>4. AI is no longer a concept: it is an already operational tool</strong></p>
          <p className="text-gray-600 text-xs">
            Local companies use it daily.
          </p>
        </div>
      </div>

      <div className="bg-green-50 p-6 rounded-xl my-8 border-l-4 border-green-600">
        <p className="text-gray-800 font-semibold mb-2">5. A Learning Expedition is an accelerator to build an e-commerce project</p>
        <p className="text-gray-700 text-sm">
          It highlights: real models, mistakes, best practices, and dynamics that students can apply directly.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Conclusion: An Immersion That Gives Meaning to Digital Marketing</h2>

      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-2xl my-8 border-l-4 border-neutral-dark">
        <p className="text-lg text-gray-900 leading-relaxed">
          Through these four activations — ManoMano, Product HQ, AI & marketing, and introduction to the Barcelona ecosystem — students 
          discovered different visions of modern e-commerce: operational, strategic, international, technical and creative.
        </p>
        <p className="text-lg text-gray-800 mt-4">
          This Learning Expedition allowed them to: get inspired for their final project, understand the backstage of digital, meet 
          professionals, and grasp Barcelona as a real learning ground. A complete, concrete experience, aligned with 
          the expectations of a school expert in digital marketing.
        </p>
      </div>

      <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-200">
        <p className="text-sm font-semibold text-blue-900 mb-2">📚 Related Articles</p>
        <ul className="space-y-2 text-sm">
          <li>
            <Link href="/blog/learning-expedition-definition" className="text-blue-700 hover:text-blue-900 underline">
              → Understanding the Learning Expedition format and its impact
            </Link>
          </li>
          <li>
            <Link href="/blog/case-study-essec" className="text-blue-700 hover:text-blue-900 underline">
              → Discover another case study: ESSEC and scaling
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

function EscenCaseStudyArticleEs() {
  return (
    <div className="space-y-8">
      <p className="text-lg text-gray-700 leading-relaxed">
        En 2025, <strong>ESCEN</strong> — la escuela especializada en marketing digital y comercio electrónico del grupo Next-U — solicitó a Rusker 
        diseñar una Learning Expedition de un mes en Barcelona. Los estudiantes, procedentes de París, Lille, Lyon y Burdeos, fueron acogidos en 
        el campus de la Universidad Pompeu Fabra para seguir cursos académicos... pero el objetivo era también confrontarlos con la 
        realidad del terreno, en uno de los ecosistemas de marketing más dinámicos de Europa.
      </p>

      <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-8 rounded-r-xl">
        <p className="text-lg text-gray-900 font-semibold mb-2">Su misión pedagógica:</p>
        <p className="text-gray-800">crear un proyecto de comercio electrónico de la A a la Z.</p>
        <p className="text-gray-700 mt-3">
          La Learning Expedition debía, por tanto, aportarles: inspiración concreta, buenas prácticas, ejemplos reales de empresas 
          que operan en el ámbito digital y una comprensión global de cómo Barcelona estructura su marketing y su comercio electrónico.
        </p>
      </div>

      <p className="text-lg text-gray-700 leading-relaxed">
        Rusker construyó un programa con cuatro activaciones clave, cada una centrada en un ángulo diferente del marketing digital moderno.
      </p>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">1. Comprender el ecosistema: introducción al marketing barcelonés</h2>
      
      <p className="text-lg text-gray-700 leading-relaxed">
        La Learning Expedition comienza con una sesión con Guillaume Rostand, presidente de la French Tech Barcelona, para comprender el paisaje digital local.
      </p>

      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl my-8">
        <p className="text-gray-800 mb-3"><strong>Objetivo:</strong> dar a los estudiantes una visión clara del ecosistema digital local, y en particular:</p>
        <ul className="space-y-1 text-gray-700 text-sm">
          <li>• las empresas influyentes en marketing digital,</li>
          <li>• el papel de los hubs tecnológicos y las comunidades,</li>
          <li>• las tendencias en adquisición, datos y comercio electrónico,</li>
          <li>• Barcelona como ciudad creativa, internacional y orientada a la innovación.</li>
        </ul>
        <p className="text-gray-800 mt-4 text-sm">
          Los estudiantes descubren rápidamente que Barcelona no es solo un "hub tecnológico": es una ciudad que atrae talentos, agencias, 
          anunciantes y scale-ups, con una cultura de marketing orientada al rendimiento, el diseño y la agilidad.
        </p>
      </div>

      <p className="text-lg text-gray-700 leading-relaxed">
        Esta puesta en contexto sienta las bases para lo que sigue: observar el marketing no como un concepto, sino como un motor real de empresas digitales.
      </p>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">2. ManoMano — Comercio electrónico y adquisición en un mercado español competitivo</h2>

      <div className="bg-white p-8 rounded-2xl border-2 border-blue-200 shadow-sm my-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Primera inmersión: ManoMano</h3>
        <p className="text-gray-700 mb-4">
          Uno de los líderes europeos del comercio electrónico de bricolaje, implantado en Barcelona desde hace varios años.
        </p>
        <p className="text-gray-800 font-semibold mb-3">Por qué esta visita es esencial para estudiantes de comercio electrónico:</p>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-bold text-gray-900 mb-2">A. Comprender la implantación de una empresa francesa en España</h4>
            <p className="text-gray-700 text-sm">
              ManoMano explica qué motiva la implantación barcelonesa (talentos, competitividad, entorno tecnológico), cómo adaptar una estrategia 
              de marketing a un mercado extranjero, las diferencias entre la adquisición en Francia y en España.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2">B. Descubrir las estrategias de adquisición modernas</h4>
            <p className="text-gray-700 text-sm">
              Los ponentes comparten sus principales herramientas de marketing, sus métodos de seguimiento y optimización, la forma en que 
              estructuran sus embudos, el papel de los datos en su toma de decisiones.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2">C. Un retorno de experiencia sobre el escalado del comercio electrónico</h4>
            <p className="text-gray-700 text-sm">
              ManoMano ilustra cómo una empresa puede evolucionar de un mercado nacional a un modelo europeo, adaptando sus mensajes, sus palancas 
              de adquisición, su estructura de equipo.
            </p>
          </div>
        </div>
        <p className="text-gray-800 mt-4 text-sm italic">
          Los estudiantes comprenden hasta qué punto el marketing es estratégico en el escalado de un comercio electrónico — mucho más que "poner anuncios".
        </p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">3. Product HQ (mesplaques.fr & Wellpapers) — Descubrir la cadena completa de un comercio electrónico personalizado</h2>

      <p className="text-lg text-gray-700 leading-relaxed">
        Segunda activación: el universo fascinante de Product HQ, que agrupa a mesplaques.fr y Wellpapers, dos marcas que operan en las mismas instalaciones 
        con un saber hacer industrial común.
      </p>

      <div className="grid md:grid-cols-2 gap-6 my-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h4 className="font-bold text-gray-900 mb-3">Mesplaques.fr — un comercio electrónico muy producto, muy técnico</h4>
          <p className="text-gray-700 text-sm mb-2">Los estudiantes descubren:</p>
          <ul className="space-y-1 text-gray-700 text-xs">
            <li>• cómo funciona un comercio electrónico de productos personalizados,</li>
            <li>• la diferencia entre placas homologadas y no homologadas,</li>
            <li>• la relación entre digital, producción, logística y servicio al cliente.</li>
          </ul>
          <p className="text-gray-700 text-sm mt-3">
            Ven, en condiciones reales, cómo un pedido en línea desencadena toda una cadena operativa.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h4 className="font-bold text-gray-900 mb-3">Wellpapers — revalorizar una fábrica para crear un segundo comercio electrónico</h4>
          <p className="text-gray-700 text-sm">
            Ejemplo perfecto de innovación interna: la misma infraestructura de producción se reutiliza para crear un segundo comercio electrónico — papel pintado 
            personalizado. Este caso muestra cómo una empresa optimiza sus recursos existentes, crea un nuevo producto basado en un dominio técnico 
            ya presente, escala dos marcas en paralelo en una misma fábrica.
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-2xl my-8 border-l-4 border-purple-600">
        <h3 className="text-xl font-bold text-gray-900 mb-3">C. La cadena logística, del clic al paquete</h3>
        <p className="text-gray-800 mb-3">Es uno de los momentos pedagógicos más fuertes del programa.</p>
        <p className="text-gray-700 text-sm mb-2">Los estudiantes observan:</p>
        <ul className="space-y-1 text-gray-700 text-sm">
          <li>• la toma de pedidos,</li>
          <li>• la preparación del producto,</li>
          <li>• el corte, la impresión, el embalaje,</li>
          <li>• los controles de calidad,</li>
          <li>• la salida logística.</li>
        </ul>
        <p className="text-gray-800 mt-4 text-sm italic">
          Una visión rara de la trastienda del comercio electrónico: lo que las escuelas enseñan raramente, pero que las empresas viven cada día.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">4. Una tarde de IA y marketing: comprender las nuevas palancas digitales</h2>

      <p className="text-lg text-gray-700 leading-relaxed">
        Última activación: una inmersión en el universo de la IA aplicada al marketing y al comercio electrónico.
      </p>

      <div className="bg-amber-50 p-6 rounded-xl my-8 border-l-4 border-amber-600">
        <p className="text-gray-800 mb-3">Los estudiantes:</p>
        <ul className="space-y-1 text-gray-700 text-sm">
          <li>• exploran herramientas utilizadas por las empresas locales,</li>
          <li>• descubren cómo la IA transforma la adquisición, el contenido, la producción creativa,</li>
          <li>• conocen a actores barceloneses que trabajan en estos temas,</li>
          <li>• intercambian sobre las oportunidades profesionales y las tendencias emergentes.</li>
        </ul>
        <p className="text-gray-800 mt-4">
          Esta sesión cierra el programa con una visión orientada hacia el futuro del marketing, perfectamente alineada con sus proyectos académicos.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">5. Síntesis de los aprendizajes: lo que los estudiantes retienen realmente</h2>

      <div className="grid md:grid-cols-2 gap-6 my-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <p className="text-gray-700 text-sm mb-2"><strong>1. El marketing digital no es una profesión aislada</strong></p>
          <p className="text-gray-600 text-xs">
            Conecta producto, logística, cadena de suministro, adquisición, datos y experiencia del cliente.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <p className="text-gray-700 text-sm mb-2"><strong>2. Un comercio electrónico nunca escala si la cadena operativa no es sólida</strong></p>
          <p className="text-gray-600 text-xs">
            La visita a Product HQ lo mostró claramente.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <p className="text-gray-700 text-sm mb-2"><strong>3. Barcelona es un hub donde el marketing se piensa de forma internacional</strong></p>
          <p className="text-gray-600 text-xs">
            Las estrategias están pensadas para varios mercados, varias culturas y varios idiomas.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <p className="text-gray-700 text-sm mb-2"><strong>4. La IA ya no es un concepto: es una herramienta ya operativa</strong></p>
          <p className="text-gray-600 text-xs">
            Las empresas locales la utilizan a diario.
          </p>
        </div>
      </div>

      <div className="bg-green-50 p-6 rounded-xl my-8 border-l-4 border-green-600">
        <p className="text-gray-800 font-semibold mb-2">5. Una Learning Expedition es un acelerador para construir un proyecto de comercio electrónico</p>
        <p className="text-gray-700 text-sm">
          Pone de relieve: modelos reales, errores, buenas prácticas y dinámicas que los estudiantes pueden aplicar directamente.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Conclusión: una inmersión que da sentido al marketing digital</h2>

      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-2xl my-8 border-l-4 border-neutral-dark">
        <p className="text-lg text-gray-900 leading-relaxed">
          A través de estas cuatro activaciones — ManoMano, Product HQ, IA y marketing, e introducción al ecosistema barcelonés — los estudiantes 
          descubrieron visiones diferentes del comercio electrónico moderno: operativa, estratégica, internacional, técnica y creativa.
        </p>
        <p className="text-lg text-gray-800 mt-4">
          Esta Learning Expedition les permitió: inspirarse para su proyecto final, comprender los entresijos del digital, conocer a 
          profesionales y aprehender Barcelona como un verdadero terreno de aprendizaje. Una experiencia completa, concreta y alineada con 
          las expectativas de una escuela experta en marketing digital.
        </p>
      </div>

      <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-200">
        <p className="text-sm font-semibold text-blue-900 mb-2">📚 Artículos relacionados</p>
        <ul className="space-y-2 text-sm">
          <li>
            <Link href="/blog/learning-expedition-definition" className="text-blue-700 hover:text-blue-900 underline">
              → Comprender el formato Learning Expedition y su impacto
            </Link>
          </li>
          <li>
            <Link href="/blog/case-study-essec" className="text-blue-700 hover:text-blue-900 underline">
              → Descubre otro caso de estudio: ESSEC y el escalado
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

