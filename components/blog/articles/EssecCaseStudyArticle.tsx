'use client'

import { useI18n } from '@/lib/i18n'
import Link from 'next/link'

export default function EssecCaseStudyArticle() {
  const { locale } = useI18n()

  if (locale === 'en') {
    return <EssecCaseStudyArticleEn />
  } else if (locale === 'es') {
    return <EssecCaseStudyArticleEs />
  }
  
  return <EssecCaseStudyArticleFr />
}

function EssecCaseStudyArticleFr() {
  return (
    <div className="space-y-8">
      <p className="text-lg text-gray-700 leading-relaxed">
        En avril 2025, les étudiants de la <strong>Leading a Scale-Up Chair</strong> de l'ESSEC ont vécu une immersion de quatre jours 
        au cœur de l'écosystème tech barcelonais. L'objectif ? Aller bien au-delà des cours théoriques pour comprendre comment les 
        scale-ups européennes grandissent, s'organisent, se financent et structurent leur leadership en phase d'hypercroissance.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        Cette Learning Expedition, conçue et opérée par Rusker, répondait à un besoin clair de l'école : exposer les étudiants à des 
        entreprises qui vivent réellement le processus de scaling, dans toutes ses dimensions humaines, opérationnelles et stratégiques.
      </p>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">1. Le besoin de l'ESSEC : comprendre le scaling en le vivant</h2>
      
      <p className="text-lg text-gray-700 leading-relaxed">
        Le programme Leading a Scale-Up Chair forme des étudiants qui se destinent :
      </p>

      <ul className="space-y-2 ml-6 my-6">
        <li className="text-lg text-gray-700">• à des rôles de management dans des entreprises en forte croissance,</li>
        <li className="text-lg text-gray-700">• à des fonctions opérationnelles clés,</li>
        <li className="text-lg text-gray-700">• à des projets entrepreneuriaux,</li>
        <li className="text-lg text-gray-700">• ou à des environnements nécessitant une prise de décision rapide et structurée.</li>
      </ul>

      <p className="text-lg text-gray-700 leading-relaxed">
        Ces étudiants étudient les modèles de scaling, mais beaucoup de leurs questions n'ont pas de réponse dans les livres :
      </p>

      <div className="bg-amber-50 border-l-4 border-amber-600 p-6 my-8 rounded-r-xl">
        <ul className="space-y-2 text-gray-800">
          <li>Comment passer de 30 à 300 employés ?</li>
          <li>Comment maintenir la culture à grande échelle ?</li>
          <li>Comment structurer un produit, une équipe ou un marché international ?</li>
          <li>Comment éviter que la croissance s'effondre sous son propre poids ?</li>
        </ul>
      </div>

      <p className="text-lg text-gray-700 leading-relaxed">
        La Learning Expedition devait leur apporter la réalité du terrain.
      </p>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">2. Pourquoi Barcelone ?</h2>
      
      <p className="text-lg text-gray-700 leading-relaxed mb-6">
        Barcelone s'est imposée naturellement pour trois raisons :
      </p>

      <div className="grid md:grid-cols-3 gap-6 my-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-3">Un écosystème dense en scale-ups</h3>
          <p className="text-gray-600 text-sm">
            La ville compte certaines des entreprises en hypercroissance les plus emblématiques d'Europe dans des secteurs très différents : 
            SaaS, mobilité, logistique, hospitality tech, fintech…
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-3">Une culture internationale et agile</h3>
          <p className="text-gray-600 text-sm">
            Les équipes sont multiculturelles, les modes de travail sont modernes, les organisations très plates. Parfait pour observer des 
            modèles de management contemporains.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-3">Un terrain d'expérimentation grandeur nature</h3>
          <p className="text-gray-600 text-sm">
            Barcelone attire talents, fondateurs, investisseurs, events tech… Idéal pour comprendre comment une ville entière contribue au 
            scaling de ses entreprises.
          </p>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">3. Les entreprises visitées : cinq incarnations différentes du scaling</h2>

      <p className="text-lg text-gray-700 leading-relaxed">
        Au lieu de "faire un tour d'entreprises", l'expédition plongeait les étudiants dans cinq réalités très différentes de l'hypercroissance.
      </p>

      <div className="space-y-6 my-8">
        <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-600">
          <h3 className="text-xl font-bold text-gray-900 mb-3">Amenitiz — Scaling SaaS dans l'hospitality</h3>
          <p className="text-gray-700">
            La scale-up a montré comment un produit simple, clair et très ciblé peut transformer une industrie encore très traditionnelle. 
            Les étudiants ont vu l'importance du product-market fit, du design produit et de la structuration progressive des équipes.
          </p>
        </div>

        <div className="bg-indigo-50 p-6 rounded-xl border-l-4 border-indigo-600">
          <h3 className="text-xl font-bold text-gray-900 mb-3">TravelPerk — Un modèle d'hypercroissance maîtrisée</h3>
          <p className="text-gray-700">
            TravelPerk illustre le scaling par excellence : internationalisation rapide, culture d'exécution, structuration d'équipes globales, 
            standardisation des opérations. Un cas d'école pour comprendre comment éviter que la vitesse n'engloutisse l'organisation.
          </p>
        </div>

        <div className="bg-purple-50 p-6 rounded-xl border-l-4 border-purple-600">
          <h3 className="text-xl font-bold text-gray-900 mb-3">Glovo — Quand le scaling implique tech + logistique + opérations terrain</h3>
          <p className="text-gray-700">
            Glovo montre un modèle rare : scaler un produit numérique et une infrastructure opérationnelle massive. Les discussions ont mis en 
            lumière les défis réglementaires, l'importance de la data et le rôle des leaders dans un modèle où tout évolue constamment.
          </p>
        </div>

        <div className="bg-green-50 p-6 rounded-xl border-l-4 border-green-600">
          <h3 className="text-xl font-bold text-gray-900 mb-3">YEGO — La mobilité urbaine comme défi de scale physique</h3>
          <p className="text-gray-700">
            YEGO offre une perspective unique : scaler une flotte physique de scooters électriques, gérer maintenance, disponibilité, régulation, 
            expansion par ville. Un scaling beaucoup plus opérationnel que digital, qui a éclairé les étudiants sur la diversité des modèles.
          </p>
        </div>

        <div className="bg-amber-50 p-6 rounded-xl border-l-4 border-amber-600">
          <h3 className="text-xl font-bold text-gray-900 mb-3">Kantox — Le scaling fintech : précision, maturité et rigueur</h3>
          <p className="text-gray-700">
            Avec une culture très analytique, Kantox a illustré la manière dont une scale-up B2B structure son produit, ses équipes et ses 
            processus pour atteindre une acquisition par un grand groupe. Un cas parfait pour comprendre le scaling sous contraintes réglementaires.
          </p>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">4. Les apprentissages clés : ce que les étudiants retiennent vraiment</h2>

      <div className="space-y-6 my-8">
        <div className="bg-white p-6 rounded-xl border-2 border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-3">1. Le scaling repose sur le leadership, pas sur la croissance</h3>
          <p className="text-gray-700 mb-2">Toutes les scale-ups rencontrées insistent sur :</p>
          <ul className="space-y-1 ml-6 text-gray-700 text-sm">
            <li>• la clarté de la vision,</li>
            <li>• la structure RH,</li>
            <li>• la communication interne,</li>
            <li>• la capacité à arbitrer vite et bien.</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-xl border-2 border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-3">2. "Scaling" n'a pas le même sens selon l'industrie</h3>
          <ul className="space-y-1 ml-6 text-gray-700 text-sm">
            <li>SaaS → prioriser le produit et le design.</li>
            <li>Mobilité → maîtriser les opérations terrain.</li>
            <li>Logistique → automatiser et optimiser en continu.</li>
            <li>Fintech → naviguer dans un cadre réglementaire strict.</li>
            <li>Travel tech → standardiser pour absorber la croissance.</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-xl border-2 border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-3">3. Les entreprises ne scale pas seules : elles scale avec leur écosystème</h3>
          <p className="text-gray-700 text-sm mb-2">Les étudiants ont vu l'importance :</p>
          <ul className="space-y-1 ml-6 text-gray-700 text-sm">
            <li>• des communautés tech,</li>
            <li>• des hubs,</li>
            <li>• des VC,</li>
            <li>• des événements,</li>
            <li>• des talents internationaux.</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-xl border-2 border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-3">4. La culture d'entreprise est le véritable moteur du scaling</h3>
          <p className="text-gray-700 text-sm">
            Les équipes se transforment, les structures changent, les processus s'alourdissent… Sans une culture forte, la croissance devient instable.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border-2 border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-3">5. Une Learning Expedition accélère l'apprentissage comme aucun cours ne peut le faire</h3>
          <p className="text-gray-700 text-sm">
            Le terrain rend les concepts vivants : ils rencontrent des leaders qui racontent les dilemmes réels, les erreurs, les pivots, les tensions 
            internes… Une matière première impossible à reproduire en salle.
          </p>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">5. Une expérience ancrée dans la ville</h2>

      <p className="text-lg text-gray-700 leading-relaxed">
        Entre les visites, les rencontres et les ateliers, les étudiants ont aussi découvert l'identité culturelle de Barcelone : son histoire, 
        son architecture, son énergie créative, sa dimension internationale. Comprendre une scale-up, c'est aussi comprendre la ville dans laquelle elle évolue.
      </p>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Conclusion : une immersion qui transforme la compréhension du scaling</h2>

      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-2xl my-8 border-l-4 border-neutral-dark">
        <p className="text-lg text-gray-900 leading-relaxed mb-4">
          Cette Learning Expedition a permis aux étudiants de l'ESSEC de :
        </p>
        <ul className="space-y-2 text-gray-800">
          <li>• comprendre concrètement le passage de startup à scale-up,</li>
          <li>• analyser différentes stratégies de croissance,</li>
          <li>• voir les défis managériaux à travers des cas réels,</li>
          <li>• saisir le rôle d'un écosystème dans l'hypercroissance,</li>
          <li>• connecter théorie et réalité terrain.</li>
        </ul>
        <p className="text-lg text-gray-900 mt-6">
          Barcelone n'a pas été un décor : elle a été une salle de classe vivante, cohérente avec la thématique Leading at Scale.
        </p>
      </div>

      <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-200">
        <p className="text-sm font-semibold text-blue-900 mb-2">📚 Articles connexes</p>
        <ul className="space-y-2 text-sm">
          <li>
            <Link href="/blog/learning-expedition-definition" className="text-blue-700 hover:text-blue-900 underline">
              → Découvrez ce qu'est une Learning Expedition et son impact réel
            </Link>
          </li>
          <li>
            <Link href="/blog/barcelona-tech-ecosystem" className="text-blue-700 hover:text-blue-900 underline">
              → Pourquoi Barcelone est l'écosystème idéal pour comprendre le scaling
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

function EssecCaseStudyArticleEn() {
  return (
    <div className="space-y-8">
      <p className="text-lg text-gray-700 leading-relaxed">
        In April 2025, students from ESSEC's <strong>Leading a Scale-Up Chair</strong> experienced something unique: four days 
        at the heart of Barcelona's tech ecosystem. The objective? To go beyond theoretical models and understand how European 
        scale-ups grow, organize, finance themselves and structure their leadership during hypergrowth.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        This Learning Expedition, designed and operated by Rusker, met a clear need of the school: to expose students to 
        companies that are truly experiencing the scaling process, in all its human, operational and strategic dimensions.
      </p>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">1. ESSEC's Need: Understanding Scaling by Living It</h2>
      
      <p className="text-lg text-gray-700 leading-relaxed">
        The Leading a Scale-Up Chair program trains students who aim for:
      </p>

      <ul className="space-y-2 ml-6 my-6">
        <li className="text-lg text-gray-700">• management roles in high-growth companies,</li>
        <li className="text-lg text-gray-700">• key operational functions,</li>
        <li className="text-lg text-gray-700">• entrepreneurial projects,</li>
        <li className="text-lg text-gray-700">• or environments requiring rapid and structured decision-making.</li>
      </ul>

      <p className="text-lg text-gray-700 leading-relaxed">
        These students study scaling models, but many of their questions have no answer in books:
      </p>

      <div className="bg-amber-50 border-l-4 border-amber-600 p-6 my-8 rounded-r-xl">
        <ul className="space-y-2 text-gray-800">
          <li>How to go from 30 to 300 employees?</li>
          <li>How to maintain culture at scale?</li>
          <li>How to structure a product, a team or an international market?</li>
          <li>How to avoid growth collapsing under its own weight?</li>
        </ul>
      </div>

      <p className="text-lg text-gray-700 leading-relaxed">
        The Learning Expedition had to bring them the reality of the field.
      </p>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">2. Why Barcelona?</h2>
      
      <p className="text-lg text-gray-700 leading-relaxed mb-6">
        Barcelona naturally imposed itself for three reasons:
      </p>

      <div className="grid md:grid-cols-3 gap-6 my-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-3">An ecosystem dense in scale-ups</h3>
          <p className="text-gray-600 text-sm">
            The city has some of the most iconic high-growth companies in Europe in very different sectors: 
            SaaS, mobility, logistics, hospitality tech, fintech…
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-3">An international and agile culture</h3>
          <p className="text-gray-600 text-sm">
            Teams are multicultural, work modes are modern, organizations very flat. Perfect for observing 
            contemporary management models.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-3">A life-size experimentation ground</h3>
          <p className="text-gray-600 text-sm">
            Barcelona attracts talents, founders, investors, tech events… Ideal for understanding how a whole city contributes to the 
            scaling of its companies.
          </p>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">3. The Companies Visited: Five Different Incarnations of Scaling</h2>

      <p className="text-lg text-gray-700 leading-relaxed">
        Instead of "touring companies", the expedition plunged students into five very different realities of hypergrowth.
      </p>

      <div className="space-y-6 my-8">
        <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-600">
          <h3 className="text-xl font-bold text-gray-900 mb-3">Amenitiz — SaaS Scaling in Hospitality</h3>
          <p className="text-gray-700">
            The scale-up showed how a simple, clear and highly targeted product can transform a still very traditional industry. 
            Students saw the importance of product-market fit, product design and progressive team structuring.
          </p>
        </div>

        <div className="bg-indigo-50 p-6 rounded-xl border-l-4 border-indigo-600">
          <h3 className="text-xl font-bold text-gray-900 mb-3">TravelPerk — A Model of Mastered Hypergrowth</h3>
          <p className="text-gray-700">
            TravelPerk illustrates scaling par excellence: rapid internationalization, execution culture, global team structuring, 
            standardization of operations. A textbook case to understand how to prevent speed from engulfing the organization.
          </p>
        </div>

        <div className="bg-purple-50 p-6 rounded-xl border-l-4 border-purple-600">
          <h3 className="text-xl font-bold text-gray-900 mb-3">Glovo — When Scaling Involves Tech + Logistics + Field Operations</h3>
          <p className="text-gray-700">
            Glovo shows a rare model: scaling a digital product and a massive operational infrastructure. Discussions highlighted 
            regulatory challenges, the importance of data and the role of leaders in a model where everything is constantly evolving.
          </p>
        </div>

        <div className="bg-green-50 p-6 rounded-xl border-l-4 border-green-600">
          <h3 className="text-xl font-bold text-gray-900 mb-3">YEGO — Urban Mobility as a Physical Scale Challenge</h3>
          <p className="text-gray-700">
            YEGO offers a unique perspective: scaling a physical fleet of electric scooters, managing maintenance, availability, regulation, 
            expansion by city. A much more operational scaling than digital, which enlightened students on the diversity of models.
          </p>
        </div>

        <div className="bg-amber-50 p-6 rounded-xl border-l-4 border-amber-600">
          <h3 className="text-xl font-bold text-gray-900 mb-3">Kantox — Fintech Scaling: Precision, Maturity and Rigor</h3>
          <p className="text-gray-700">
            With a very analytical culture, Kantox illustrated how a B2B scale-up structures its product, teams and processes to achieve 
            an acquisition by a large group. A perfect case for understanding scaling under regulatory constraints.
          </p>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">4. Key Learnings: What Students Really Retain</h2>

      <div className="space-y-6 my-8">
        <div className="bg-white p-6 rounded-xl border-2 border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-3">1. Scaling relies on leadership, not growth</h3>
          <p className="text-gray-700 mb-2">All scale-ups met insist on:</p>
          <ul className="space-y-1 ml-6 text-gray-700 text-sm">
            <li>• clarity of vision,</li>
            <li>• HR structure,</li>
            <li>• internal communication,</li>
            <li>• ability to arbitrate quickly and well.</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-xl border-2 border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-3">2. "Scaling" does not mean the same thing depending on the industry</h3>
          <ul className="space-y-1 ml-6 text-gray-700 text-sm">
            <li>SaaS → prioritize product and design.</li>
            <li>Mobility → master field operations.</li>
            <li>Logistics → automate and optimize continuously.</li>
            <li>Fintech → navigate a strict regulatory framework.</li>
            <li>Travel tech → standardize to absorb growth.</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-xl border-2 border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-3">3. Companies do not scale alone: they scale with their ecosystem</h3>
          <p className="text-gray-700 text-sm mb-2">Students saw the importance of:</p>
          <ul className="space-y-1 ml-6 text-gray-700 text-sm">
            <li>• tech communities,</li>
            <li>• hubs,</li>
            <li>• VCs,</li>
            <li>• events,</li>
            <li>• international talents.</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-xl border-2 border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-3">4. Corporate culture is the true engine of scaling</h3>
          <p className="text-gray-700 text-sm">
            Teams transform, structures change, processes become heavier... Without a strong culture, growth becomes unstable.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border-2 border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-3">5. A Learning Expedition accelerates learning like no course can</h3>
          <p className="text-gray-700 text-sm">
            The field makes concepts alive: they meet leaders who tell real dilemmas, mistakes, pivots, internal tensions... 
            Raw material impossible to reproduce in a classroom.
          </p>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">5. An Experience Anchored in the City</h2>

      <p className="text-lg text-gray-700 leading-relaxed">
        Between visits, meetings and workshops, students also discovered Barcelona's cultural identity: its history, 
        architecture, creative energy, international dimension. Understanding a scale-up is also understanding the city in which it evolves.
      </p>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Conclusion: An Immersion that Transforms the Understanding of Scaling</h2>

      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-2xl my-8 border-l-4 border-neutral-dark">
        <p className="text-lg text-gray-900 leading-relaxed mb-4">
          This Learning Expedition allowed ESSEC students to:
        </p>
        <ul className="space-y-2 text-gray-800">
          <li>• concretely understand the passage from startup to scale-up,</li>
          <li>• analyze different growth strategies,</li>
          <li>• see managerial challenges through real cases,</li>
          <li>• grasp the role of an ecosystem in hypergrowth,</li>
          <li>• connect theory and field reality.</li>
        </ul>
        <p className="text-lg text-gray-900 mt-6">
          Barcelona was not a backdrop: it was a living classroom, consistent with the Leading at Scale theme.
        </p>
      </div>

      <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-200">
        <p className="text-sm font-semibold text-blue-900 mb-2">📚 Related Articles</p>
        <ul className="space-y-2 text-sm">
          <li>
            <Link href="/blog/learning-expedition-definition" className="text-blue-700 hover:text-blue-900 underline">
              → Discover what a Learning Expedition is and its real impact
            </Link>
          </li>
          <li>
            <Link href="/blog/barcelona-tech-ecosystem" className="text-blue-700 hover:text-blue-900 underline">
              → Why Barcelona is the ideal ecosystem to understand scaling
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

function EssecCaseStudyArticleEs() {
  return (
    <div className="space-y-8">
      <p className="text-lg text-gray-700 leading-relaxed">
        En abril de 2025, los estudiantes de la <strong>Leading a Scale-Up Chair</strong> de ESSEC experimentaron algo único: cuatro días 
        en el corazón del ecosistema tecnológico de Barcelona. ¿El objetivo? Ir más allá de los modelos teóricos y comprender cómo las 
        scale-ups europeas crecen, se organizan, se financian y estructuran su liderazgo durante el hipercrecimiento.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        Esta Learning Expedition, diseñada y operada por Rusker, respondía a una necesidad clara de la escuela: exponer a los estudiantes a 
        empresas que viven realmente el proceso de escalado, en todas sus dimensiones humanas, operativas y estratégicas.
      </p>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">1. La necesidad de ESSEC: comprender el escalado viviéndolo</h2>
      
      <p className="text-lg text-gray-700 leading-relaxed">
        El programa Leading a Scale-Up Chair forma a estudiantes que se destinan:
      </p>

      <ul className="space-y-2 ml-6 my-6">
        <li className="text-lg text-gray-700">• a roles de gestión en empresas de fuerte crecimiento,</li>
        <li className="text-lg text-gray-700">• a funciones operativas clave,</li>
        <li className="text-lg text-gray-700">• a proyectos empresariales,</li>
        <li className="text-lg text-gray-700">• o a entornos que requieren una toma de decisiones rápida y estructurada.</li>
      </ul>

      <p className="text-lg text-gray-700 leading-relaxed">
        Estos estudiantes estudian los modelos de escalado, pero muchas de sus preguntas no tienen respuesta en los libros:
      </p>

      <div className="bg-amber-50 border-l-4 border-amber-600 p-6 my-8 rounded-r-xl">
        <ul className="space-y-2 text-gray-800">
          <li>¿Cómo pasar de 30 a 300 empleados?</li>
          <li>¿Cómo mantener la cultura a gran escala?</li>
          <li>¿Cómo estructurar un producto, un equipo o un mercado internacional?</li>
          <li>¿Cómo evitar que el crecimiento se derrumbe bajo su propio peso?</li>
        </ul>
      </div>

      <p className="text-lg text-gray-700 leading-relaxed">
        La Learning Expedition debía aportarles la realidad del terreno.
      </p>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">2. ¿Por qué Barcelona?</h2>
      
      <p className="text-lg text-gray-700 leading-relaxed mb-6">
        Barcelona se impuso naturalmente por tres razones:
      </p>

      <div className="grid md:grid-cols-3 gap-6 my-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-3">Un ecosistema denso en scale-ups</h3>
          <p className="text-gray-600 text-sm">
            La ciudad cuenta con algunas de las empresas en hipercrecimiento más emblemáticas de Europa en sectores muy diferentes: 
            SaaS, movilidad, logística, hospitality tech, fintech…
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-3">Una cultura internacional y ágil</h3>
          <p className="text-gray-600 text-sm">
            Los equipos son multiculturales, los modos de trabajo son modernos, las organizaciones muy planas. Perfecto para observar 
            modelos de gestión contemporáneos.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-3">Un terreno de experimentación a tamaño real</h3>
          <p className="text-gray-600 text-sm">
            Barcelona atrae talentos, fundadores, inversores, eventos tech… Ideal para comprender cómo una ciudad entera contribuye al 
            escalado de sus empresas.
          </p>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">3. Las empresas visitadas: cinco encarnaciones diferentes del escalado</h2>

      <p className="text-lg text-gray-700 leading-relaxed">
        En lugar de "hacer un tour de empresas", la expedición sumergía a los estudiantes en cinco realidades muy diferentes del hipercrecimiento.
      </p>

      <div className="space-y-6 my-8">
        <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-600">
          <h3 className="text-xl font-bold text-gray-900 mb-3">Amenitiz — Scaling SaaS en hospitality</h3>
          <p className="text-gray-700">
            La scale-up mostró cómo un producto simple, claro y muy enfocado puede transformar una industria aún muy tradicional. 
            Los estudiantes vieron la importancia del product-market fit, del diseño de producto y de la estructuración progresiva de los equipos.
          </p>
        </div>

        <div className="bg-indigo-50 p-6 rounded-xl border-l-4 border-indigo-600">
          <h3 className="text-xl font-bold text-gray-900 mb-3">TravelPerk — Un modelo de hipercrecimiento controlado</h3>
          <p className="text-gray-700">
            TravelPerk ilustra el escalado por excelencia: internacionalización rápida, cultura de ejecución, estructuración de equipos globales, 
            estandarización de operaciones. Un caso de escuela para comprender cómo evitar que la velocidad se trague a la organización.
          </p>
        </div>

        <div className="bg-purple-50 p-6 rounded-xl border-l-4 border-purple-600">
          <h3 className="text-xl font-bold text-gray-900 mb-3">Glovo — Cuando el escalado implica tecnología + logística + operaciones de campo</h3>
          <p className="text-gray-700">
            Glovo muestra un modelo raro: escalar un producto digital y una infraestructura operativa masiva. Las discusiones destacaron los 
            desafíos regulatorios, la importancia de los datos y el papel de los líderes en un modelo donde todo evoluciona constantemente.
          </p>
        </div>

        <div className="bg-green-50 p-6 rounded-xl border-l-4 border-green-600">
          <h3 className="text-xl font-bold text-gray-900 mb-3">YEGO — La movilidad urbana como desafío de escalado físico</h3>
          <p className="text-gray-700">
            YEGO ofrece una perspectiva única: escalar una flota física de scooters eléctricos, gestionar mantenimiento, disponibilidad, regulación, 
            expansión por ciudad. Un escalado mucho más operativo que digital, que iluminó a los estudiantes sobre la diversidad de modelos.
          </p>
        </div>

        <div className="bg-amber-50 p-6 rounded-xl border-l-4 border-amber-600">
          <h3 className="text-xl font-bold text-gray-900 mb-3">Kantox — Escalado fintech: precisión, madurez y rigor</h3>
          <p className="text-gray-700">
            Con una cultura muy analítica, Kantox ilustró la manera en que una scale-up B2B estructura su producto, sus equipos y sus procesos 
            para lograr una adquisición por un gran grupo. Un caso perfecto para comprender el escalado bajo restricciones regulatorias.
          </p>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">4. Los aprendizajes clave: lo que los estudiantes retienen realmente</h2>

      <div className="space-y-6 my-8">
        <div className="bg-white p-6 rounded-xl border-2 border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-3">1. El escalado se basa en el liderazgo, no en el crecimiento</h3>
          <p className="text-gray-700 mb-2">Todas las scale-ups encontradas insisten en:</p>
          <ul className="space-y-1 ml-6 text-gray-700 text-sm">
            <li>• la claridad de la visión,</li>
            <li>• la estructura de RRHH,</li>
            <li>• la comunicación interna,</li>
            <li>• la capacidad de arbitrar rápido y bien.</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-xl border-2 border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-3">2. "Scaling" no tiene el mismo sentido según la industria</h3>
          <ul className="space-y-1 ml-6 text-gray-700 text-sm">
            <li>SaaS → priorizar producto y diseño.</li>
            <li>Movilidad → dominar operaciones de campo.</li>
            <li>Logística → automatizar y optimizar continuamente.</li>
            <li>Fintech → navegar en un marco regulatorio estricto.</li>
            <li>Travel tech → estandarizar para absorber el crecimiento.</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-xl border-2 border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-3">3. Las empresas no escalan solas: escalan con su ecosistema</h3>
          <p className="text-gray-700 text-sm mb-2">Los estudiantes vieron la importancia de:</p>
          <ul className="space-y-1 ml-6 text-gray-700 text-sm">
            <li>• las comunidades tech,</li>
            <li>• los hubs,</li>
            <li>• los VC,</li>
            <li>• los eventos,</li>
            <li>• los talentos internacionales.</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-xl border-2 border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-3">4. La cultura de empresa es el verdadero motor del escalado</h3>
          <p className="text-gray-700 text-sm">
            Los equipos se transforman, las estructuras cambian, los procesos se vuelven pesados... Sin una cultura fuerte, el crecimiento se vuelve inestable.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border-2 border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-3">5. Una Learning Expedition acelera el aprendizaje como ningún curso puede hacerlo</h3>
          <p className="text-gray-700 text-sm">
            El terreno da vida a los conceptos. Encuentran a líderes que cuentan dilemas reales, errores, pivotes, tensiones internas... 
            Una materia prima imposible de reproducir en el aula.
          </p>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">5. Una experiencia anclada en la ciudad</h2>

      <p className="text-lg text-gray-700 leading-relaxed">
        Entre las visitas, los encuentros y los talleres, los estudiantes también descubrieron la identidad cultural de Barcelona: su historia, 
        su arquitectura, su energía creativa, su dimensión internacional. Comprender una scale-up es también comprender la ciudad en la que evoluciona.
      </p>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Conclusión: una inmersión que transforma la comprensión del escalado</h2>

      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-2xl my-8 border-l-4 border-neutral-dark">
        <p className="text-lg text-gray-900 leading-relaxed mb-4">
          Esta Learning Expedition permitió a los estudiantes de ESSEC:
        </p>
        <ul className="space-y-2 text-gray-800">
          <li>• comprender concretamente el paso de startup a scale-up,</li>
          <li>• analizar diferentes estrategias de crecimiento,</li>
          <li>• ver los desafíos gerenciales a través de casos reales,</li>
          <li>• captar el papel de un ecosistema en el hipercrecimiento,</li>
          <li>• conectar teoría y realidad del terreno.</li>
        </ul>
        <p className="text-lg text-gray-900 mt-6">
          Barcelona no fue un decorado: fue un aula viva, coherente con la temática Leading at Scale.
        </p>
      </div>

      <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-200">
        <p className="text-sm font-semibold text-blue-900 mb-2">📚 Artículos relacionados</p>
        <ul className="space-y-2 text-sm">
          <li>
            <Link href="/blog/learning-expedition-definition" className="text-blue-700 hover:text-blue-900 underline">
              → Descubre qué es una Learning Expedition y su impacto real
            </Link>
          </li>
          <li>
            <Link href="/blog/barcelona-tech-ecosystem" className="text-blue-700 hover:text-blue-900 underline">
              → Por qué Barcelona es el ecosistema ideal para comprender el escalado
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

