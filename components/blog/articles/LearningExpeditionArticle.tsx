'use client'

import { useI18n } from '@/lib/i18n'
import Link from 'next/link'

export default function LearningExpeditionArticle() {
  const { locale } = useI18n()

  if (locale === 'en') {
    return <LearningExpeditionArticleEn />
  } else if (locale === 'es') {
    return <LearningExpeditionArticleEs />
  }
  
  return <LearningExpeditionArticleFr />
}

function LearningExpeditionArticleFr() {
  return (
    <div className="space-y-8">
      <p className="text-lg text-gray-700 leading-relaxed">
        La Learning Expedition est devenue un format clé dans les écoles comme dans les organisations. 
        On parle aussi de <em>learning trip</em>, <em>learning experience</em>, <em>learning tour</em>, 
        voyage d'étude, voyage immersif ou voyage d'entreprise. Toutes ces expressions renvoient à une 
        idée centrale : se déplacer dans un autre écosystème pour apprendre plus vite, comprendre autrement 
        et repartir transformé.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        Contrairement à un séminaire classique, une Learning Expedition n'a pas pour objectif de divertir 
        ou simplement "montrer" des entreprises. C'est une immersion structurée, pensée pour déclencher un 
        changement cognitif, exposer à des pratiques différentes et offrir des rencontres qu'aucun cours ou 
        workshop interne ne peut reproduire.
      </p>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">1. Définition d'une Learning Expedition</h2>
      
      <p className="text-lg text-gray-700 leading-relaxed">
        Une Learning Expedition est un programme immersif, généralement dans une autre ville ou un autre pays. 
        Son objectif est de confronter un groupe à un nouvel environnement, lui permettant de voir des 
        modèles alternatifs, de dialoguer avec des acteurs clés et de comprendre les dynamiques d'un écosystème.
      </p>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-neutral-dark p-8 my-8 rounded-r-xl">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Elle repose sur trois piliers :</h3>
        <ul className="space-y-4">
          <li className="flex items-start gap-3">
            <span className="text-neutral-dark mt-1 text-xl">•</span>
            <span className="text-lg text-gray-800">la découverte d'organisations locales et de leurs pratiques,</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-neutral-dark mt-1 text-xl">•</span>
            <span className="text-lg text-gray-800">l'interaction avec des experts, dirigeants et leaders d'opinion,</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-neutral-dark mt-1 text-xl">•</span>
            <span className="text-lg text-gray-800">l'immersion culturelle, nécessaire pour saisir la logique du territoire.</span>
          </li>
        </ul>
      </div>

      <p className="text-lg text-gray-700 leading-relaxed">
        C'est la combinaison de ces éléments qui crée une expérience d'apprentissage rapide, profonde et 
        mémorable. Le déplacement n'est pas un décor, mais un accélérateur.
      </p>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">2. Une histoire qui commence dans la Silicon Valley</h2>
      
      <p className="text-lg text-gray-700 leading-relaxed">
        La première génération de Learning Expeditions apparaît dans les années 1980 et 1990. Des dirigeants 
        du monde entier cherchent alors à comprendre ce qui distingue la Silicon Valley du reste de la planète. 
        L'agence WDHB structure les premiers programmes de découverte immersive : rencontres avec des entrepreneurs, 
        observation des méthodes de travail, compréhension de la culture locale.
      </p>

      <div className="bg-amber-50 border-l-4 border-amber-600 p-6 my-8 rounded-r-xl">
        <p className="text-lg text-gray-900 italic">
          Ces expéditions reposent sur une conviction simple : sortir de son cadre quotidien permet de réfléchir 
          autrement, de casser les routines mentales et d'identifier des opportunités invisibles depuis son bureau.
        </p>
      </div>

      <p className="text-lg text-gray-700 leading-relaxed">Le concept se répand ensuite dans :</p>

      <ul className="space-y-3 ml-6 my-6">
        <li className="text-lg text-gray-700">
          • les écoles de commerce et MBA, qui veulent offrir une dimension internationale et expérientielle à leurs étudiants ;
        </li>
        <li className="text-lg text-gray-700">
          • les entreprises, qui utilisent ces immersions pour catalyser la transformation digitale, la réflexion 
          stratégique ou le renouvellement culturel ;
        </li>
        <li className="text-lg text-gray-700">
          • les COMEX, qui y voient un outil d'alignement et de prise de hauteur.
        </li>
      </ul>

      <p className="text-lg text-gray-700 leading-relaxed">
        Aujourd'hui, le learning tour est devenu un format global, adapté à tous les secteurs et à toutes les géographies.
      </p>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">3. Le format typique d'une Learning Expedition</h2>

      <p className="text-lg text-gray-700 leading-relaxed mb-6">
        Bien qu'elles soient toujours personnalisées, les Learning Expeditions suivent souvent une structure efficace sur trois jours.
      </p>

      <div className="space-y-6 my-8">
        <div className="bg-white p-8 rounded-2xl border-2 border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">1</div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Jour 1 : immersion dans l'écosystème</h3>
              <p className="text-gray-700 leading-relaxed">
                Le groupe découvre les acteurs locaux, les hubs d'innovation, les startups emblématiques et les 
                institutions qui structurent la ville. L'objectif est de comprendre le terrain avant d'en analyser les mécanismes.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl border-2 border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-xl">2</div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Jour 2 : interaction et approfondissement</h3>
              <p className="text-gray-700 leading-relaxed">
                Des keynotes, workshops, visites ciblées ou participations à des salons permettent au groupe de dialoguer 
                directement avec des experts. On passe alors de "voir" à "comprendre".
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl border-2 border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xl">3</div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Jour 3 : ouverture et synthèse</h3>
              <p className="text-gray-700 leading-relaxed">
                Le troisième jour est dédié à la mise en perspective. Le groupe échange avec des leaders d'opinion, 
                participe à un moment de networking, explore la ville d'un point de vue culturel puis construit une 
                synthèse exploitable au retour.
              </p>
            </div>
          </div>
        </div>
      </div>

      <p className="text-lg text-gray-700 leading-relaxed">
        Ce format fonctionne aussi bien pour des étudiants que pour un comité exécutif. Il concentre inspiration, analyse et appropriation.
      </p>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">4. L'impact réel d'une Learning Expedition</h2>

      <p className="text-lg text-gray-700 leading-relaxed mb-6">
        Une Learning Expedition crée trois types d'impact qui se renforcent mutuellement.
      </p>

      <div className="grid md:grid-cols-3 gap-6 my-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
          <h3 className="text-xl font-bold text-gray-900 mb-3">Impact cognitif</h3>
          <p className="text-gray-700">
            Être plongé dans un environnement inconnu permet d'adopter un nouveau regard. Les participants identifient 
            leurs biais, comparent leurs pratiques à celles d'organisations plus innovantes et découvrent des modèles 
            auxquels ils n'auraient pas été exposés autrement.
          </p>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-xl border border-indigo-200">
          <h3 className="text-xl font-bold text-gray-900 mb-3">Impact stratégique</h3>
          <p className="text-gray-700 mb-3">Les insights récoltés éclairent directement les décisions de l'organisation :</p>
          <ul className="space-y-1 text-sm text-gray-700">
            <li>• Identifier des tendances émergentes</li>
            <li>• Observer des solutions appliquées</li>
            <li>• Challenger une stratégie existante</li>
            <li>• Imaginer de nouvelles pistes</li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
          <h3 className="text-xl font-bold text-gray-900 mb-3">Impact relationnel</h3>
          <p className="text-gray-700">
            Une Learning Expedition est aussi un outil de construction de réseau. Les participants rencontrent des 
            dirigeants, des entrepreneurs, des experts, et développent une cohésion interne précieuse. Le groupe revient 
            souvent avec des contacts, des idées de collaboration et une dynamique collective renforcée.
          </p>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
        5. Pourquoi Barcelone est devenue un hotspot mondial pour les Learning Expeditions
      </h2>

      <p className="text-lg text-gray-700 leading-relaxed">
        Barcelone réunit des caractéristiques rares. C'est un écosystème où la technologie, l'innovation, la mobilité, 
        la santé, le tourisme, l'IA et le design cohabitent dans un espace compact et accessible.
      </p>

      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-8 rounded-2xl my-8 border-l-4 border-green-600">
        <p className="text-lg text-gray-800 mb-4">
          La ville compte plus de <strong>1 600 startups</strong>, une concentration exceptionnelle de scale-ups européennes, 
          des hubs majeurs comme le 22@ ou le Barcelona Health Hub, et des infrastructures de rang mondial. Elle accueille 
          également les plus grands salons européens, dont le Mobile World Congress ou l'ISE, qui attirent chaque année 
          dirigeants, investisseurs et experts internationaux.
        </p>
        <p className="text-gray-700">
          Plusieurs facteurs renforcent encore son attractivité : une densité d'innovation unique en Europe, un environnement 
          international et anglophone, une forte qualité de vie qui attire les talents, une économie équilibrée entre tech, 
          service, industrie et mobilité.
        </p>
      </div>

      <p className="text-lg text-gray-700 leading-relaxed">
        Un voyage immersif à Barcelone n'est donc pas un simple déplacement agréable. C'est une entrée directe dans un 
        laboratoire européen où se dessinent de nouvelles manières de travailler, d'entreprendre et d'innover.
      </p>

      <div className="bg-neutral-dark text-white p-8 rounded-2xl my-8">
        <p className="text-lg mb-2">
          <Link href="/blog/barcelona-tech-ecosystem" className="underline hover:text-gray-300">
            → Découvrez pourquoi Barcelone est l'un des écosystèmes technologiques les plus dynamiques d'Europe
          </Link>
        </p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
        6. Pourquoi écoles et COMEX adoptent massivement ce format
      </h2>

      <p className="text-lg text-gray-700 leading-relaxed">
        Les écoles utilisent désormais les Learning Expeditions comme composante essentielle de leurs programmes. Elles 
        permettent de compléter l'enseignement théorique par une exposition concrète aux métiers, aux cultures d'entreprise 
        et aux tendances internationales.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        Du côté des organisations, le format répond à plusieurs besoins : prise de hauteur, alignement stratégique, 
        acculturation digitale, inspiration produit, exploration de nouveaux marchés, développement du leadership ou 
        transformation culturelle. Les COMEX y trouvent un outil capable de générer de la clarté, de la cohésion et des 
        décisions plus rapides.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        Dans un monde où les cycles d'innovation se raccourcissent, les Learning Expeditions jouent un rôle décisif. 
        Elles permettent de comprendre ce qui change, pourquoi cela change, et comment s'y adapter.
      </p>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Conclusion</h2>

      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-2xl my-8 border-l-4 border-neutral-dark">
        <p className="text-lg text-gray-900 leading-relaxed">
          La Learning Expedition est un investissement stratégique, pas un "voyage premium". Elle combine immersion, 
          rencontres, analyse et culture pour offrir une compréhension accélérée de secteurs en mouvement. Dans un 
          contexte où les organisations doivent évoluer vite, regarder ailleurs devient indispensable pour penser différemment.
        </p>
        <p className="text-lg text-gray-800 mt-4">
          À Barcelone, Rusker conçoit des Learning Expeditions en s'appuyant sur un réseau profondément ancré dans l'écosystème 
          local, allant des startups aux scale-ups, des institutions aux hubs d'innovation, afin d'aider écoles et entreprises 
          à capter le meilleur de la ville et à transformer leurs idées en actions.
        </p>
      </div>

      <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-200">
        <p className="text-sm font-semibold text-blue-900 mb-2">📚 Articles connexes</p>
        <ul className="space-y-2 text-sm">
          <li>
            <Link href="/blog/case-study-essec" className="text-blue-700 hover:text-blue-900 underline">
              → CASE STUDY : Comment l'ESSEC a utilisé une Learning Expedition pour comprendre le scaling
            </Link>
          </li>
          <li>
            <Link href="/blog/rusker-360-agency" className="text-blue-700 hover:text-blue-900 underline">
              → Découvrez comment Rusker structure ses Learning Expeditions avec Travel, Events & Network
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

function LearningExpeditionArticleEn() {
  return (
    <div className="space-y-8">
      <p className="text-lg text-gray-700 leading-relaxed">
        The Learning Expedition has become a key format in schools and organizations alike. 
        Also known as a <em>learning trip</em>, <em>learning experience</em>, <em>learning tour</em>, 
        study trip, immersive trip, or corporate trip, all these terms refer to a 
        central idea: traveling to another ecosystem to learn faster, understand differently, 
        and return transformed.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        Unlike a classic seminar, a Learning Expedition does not aim to entertain 
        or simply "show" companies. It is a structured immersion, designed to trigger a 
        cognitive shift, expose participants to different practices, and offer encounters that no internal course or 
        workshop can reproduce.
      </p>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">1. Definition of a Learning Expedition</h2>
      
      <p className="text-lg text-gray-700 leading-relaxed">
        A Learning Expedition is an immersive program, usually in another city or country. 
        Its objective is to confront a group with a new environment, allowing them to see 
        alternative models, dialogue with key players, and understand the dynamics of an ecosystem.
      </p>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-neutral-dark p-8 my-8 rounded-r-xl">
        <h3 className="text-xl font-bold text-gray-900 mb-4">It is based on three pillars:</h3>
        <ul className="space-y-4">
          <li className="flex items-start gap-3">
            <span className="text-neutral-dark mt-1 text-xl">•</span>
            <span className="text-lg text-gray-800">discovering local organizations and their practices,</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-neutral-dark mt-1 text-xl">•</span>
            <span className="text-lg text-gray-800">interacting with experts, executives, and thought leaders,</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-neutral-dark mt-1 text-xl">•</span>
            <span className="text-lg text-gray-800">cultural immersion, necessary to grasp the logic of the territory.</span>
          </li>
        </ul>
      </div>

      <p className="text-lg text-gray-700 leading-relaxed">
        It is the combination of these elements that creates a rapid, profound, and 
        memorable learning experience. The travel is not a backdrop, but an accelerator.
      </p>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">2. A History Starting in Silicon Valley</h2>
      
      <p className="text-lg text-gray-700 leading-relaxed">
        The first generation of Learning Expeditions appeared in the 1980s and 1990s. Executives 
        from all over the world sought to understand what distinguished Silicon Valley from the rest of the planet. 
        The agency WDHB structured the first immersive discovery programs: meetings with entrepreneurs, 
        observation of work methods, understanding of local culture.
      </p>

      <div className="bg-amber-50 border-l-4 border-amber-600 p-6 my-8 rounded-r-xl">
        <p className="text-lg text-gray-900 italic">
          These expeditions are based on a simple conviction: getting out of your daily setting allows you to think 
          differently, break mental routines, and identify opportunities invisible from your office.
        </p>
      </div>

      <p className="text-lg text-gray-700 leading-relaxed">The concept then spread to:</p>

      <ul className="space-y-3 ml-6 my-6">
        <li className="text-lg text-gray-700">
          • business schools and MBAs, wanting to offer an international and experiential dimension to their students;
        </li>
        <li className="text-lg text-gray-700">
          • companies, using these immersions to catalyze digital transformation, strategic 
          reflection, or cultural renewal;
        </li>
        <li className="text-lg text-gray-700">
          • Executive Committees (COMEX), seeing it as a tool for alignment and gaining perspective.
        </li>
      </ul>

      <p className="text-lg text-gray-700 leading-relaxed">
        Today, the learning tour has become a global format, adapted to all sectors and geographies.
      </p>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">3. The Typical Format of a Learning Expedition</h2>

      <p className="text-lg text-gray-700 leading-relaxed mb-6">
        Although always customized, Learning Expeditions often follow an effective three-day structure.
      </p>

      <div className="space-y-6 my-8">
        <div className="bg-white p-8 rounded-2xl border-2 border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">1</div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Day 1: Immersion in the Ecosystem</h3>
              <p className="text-gray-700 leading-relaxed">
                The group discovers local players, innovation hubs, iconic startups, and 
                institutions structuring the city. The goal is to understand the terrain before analyzing the mechanisms.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl border-2 border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-xl">2</div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Day 2: Interaction and Deep Dive</h3>
              <p className="text-gray-700 leading-relaxed">
                Keynotes, workshops, targeted visits, or participation in trade shows allow the group to dialogue 
                directly with experts. We move from "seeing" to "understanding".
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl border-2 border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xl">3</div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Day 3: Opening Up and Synthesis</h3>
              <p className="text-gray-700 leading-relaxed">
                The third day is dedicated to perspective. The group exchanges with thought leaders, 
                participates in networking, explores the city from a cultural standpoint, then builds an 
                actionable synthesis for the return.
              </p>
            </div>
          </div>
        </div>
      </div>

      <p className="text-lg text-gray-700 leading-relaxed">
        This format works equally well for students and executive committees. It concentrates inspiration, analysis, and appropriation.
      </p>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">4. The Real Impact of a Learning Expedition</h2>

      <p className="text-lg text-gray-700 leading-relaxed mb-6">
        A Learning Expedition creates three types of impact that reinforce each other.
      </p>

      <div className="grid md:grid-cols-3 gap-6 my-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
          <h3 className="text-xl font-bold text-gray-900 mb-3">Cognitive Impact</h3>
          <p className="text-gray-700">
            Being plunged into an unknown environment allows adopting a new perspective. Participants identify 
            their biases, compare their practices to those of more innovative organizations, and discover models 
            they wouldn't have been exposed to otherwise.
          </p>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-xl border border-indigo-200">
          <h3 className="text-xl font-bold text-gray-900 mb-3">Strategic Impact</h3>
          <p className="text-gray-700 mb-3">Harvested insights directly inform the organization's decisions:</p>
          <ul className="space-y-1 text-sm text-gray-700">
            <li>• Identify emerging trends</li>
            <li>• Observe applied solutions</li>
            <li>• Challenge an existing strategy</li>
            <li>• Imagine new paths</li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
          <h3 className="text-xl font-bold text-gray-900 mb-3">Relational Impact</h3>
          <p className="text-gray-700">
            A Learning Expedition is also a network-building tool. Participants meet 
            executives, entrepreneurs, experts, and develop valuable internal cohesion. The group often returns 
            with contacts, collaboration ideas, and reinforced collective dynamics.
          </p>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
        5. Why Barcelona Has Become a Global Hotspot for Learning Expeditions
      </h2>

      <p className="text-lg text-gray-700 leading-relaxed">
        Barcelona brings together rare characteristics. It is an ecosystem where technology, innovation, mobility, 
        health, tourism, AI, and design coexist in a compact and accessible space.
      </p>

      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-8 rounded-2xl my-8 border-l-4 border-green-600">
        <p className="text-lg text-gray-800 mb-4">
          The city counts over <strong>1,600 startups</strong>, an exceptional concentration of European scale-ups, 
          major hubs like 22@ or Barcelona Health Hub, and world-class infrastructure. It also hosts 
          Europe's largest trade shows, including Mobile World Congress or ISE, attracting executives, 
          investors, and international experts every year.
        </p>
        <p className="text-gray-700">
          Several factors further reinforce its attractiveness: a unique innovation density in Europe, an international 
          and English-speaking environment, a high quality of life attracting talent, and a balanced economy between tech, 
          service, industry, and mobility.
        </p>
      </div>

      <p className="text-lg text-gray-700 leading-relaxed">
        An immersive trip to Barcelona is therefore not just a pleasant journey. It is a direct entry into a 
        European laboratory where new ways of working, undertaking, and innovating are being designed.
      </p>

      <div className="bg-neutral-dark text-white p-8 rounded-2xl my-8">
        <p className="text-lg mb-2">
          <Link href="/blog/barcelona-tech-ecosystem" className="underline hover:text-gray-300">
            → Discover why Barcelona is one of Europe's most dynamic tech ecosystems
          </Link>
        </p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
        6. Why Schools and Executive Committees Massively Adopt This Format
      </h2>

      <p className="text-lg text-gray-700 leading-relaxed">
        Schools now use Learning Expeditions as an essential component of their programs. They 
        allow completing theoretical teaching with concrete exposure to professions, corporate cultures, 
        and international trends.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        On the organizations' side, the format meets several needs: gaining perspective, strategic alignment, 
        digital acculturation, product inspiration, exploring new markets, leadership development, or 
        cultural transformation. Executive Committees find it a tool capable of generating clarity, cohesion, and 
        faster decisions.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        In a world where innovation cycles are shortening, Learning Expeditions play a decisive role. 
        They allow understanding what is changing, why it is changing, and how to adapt.
      </p>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Conclusion</h2>

      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-2xl my-8 border-l-4 border-neutral-dark">
        <p className="text-lg text-gray-900 leading-relaxed">
          The Learning Expedition is a strategic investment, not a "premium trip". It combines immersion, 
          encounters, analysis, and culture to offer accelerated understanding of moving sectors. In a 
          context where organizations must evolve quickly, looking elsewhere becomes indispensable to think differently.
        </p>
        <p className="text-lg text-gray-800 mt-4">
          In Barcelona, Rusker designs Learning Expeditions relying on a network deeply rooted in the local ecosystem, 
          ranging from startups to scale-ups, institutions to innovation hubs, to help schools and companies 
          capture the best of the city and transform their ideas into actions.
        </p>
      </div>

      <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-200">
        <p className="text-sm font-semibold text-blue-900 mb-2">📚 Related Articles</p>
        <ul className="space-y-2 text-sm">
          <li>
            <Link href="/blog/case-study-essec" className="text-blue-700 hover:text-blue-900 underline">
              → CASE STUDY: How ESSEC used a Learning Expedition to understand scaling
            </Link>
          </li>
          <li>
            <Link href="/blog/rusker-360-agency" className="text-blue-700 hover:text-blue-900 underline">
              → Discover how Rusker structures its Learning Expeditions with Travel, Events & Network
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

function LearningExpeditionArticleEs() {
  return (
    <div className="space-y-8">
      <p className="text-lg text-gray-700 leading-relaxed">
        La Learning Expedition se ha convertido en un formato clave tanto en escuelas como en organizaciones. 
        También se habla de <em>learning trip</em>, <em>learning experience</em>, <em>learning tour</em>, 
        viaje de estudio, viaje inmersivo o viaje corporativo. Todas estas expresiones remiten a una 
        idea central: desplazarse a otro ecosistema para aprender más rápido, comprender de otra manera 
        y regresar transformado.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        A diferencia de un seminario clásico, una Learning Expedition no tiene como objetivo entretener 
        o simplemente "mostrar" empresas. Es una inmersión estructurada, pensada para desencadenar un 
        cambio cognitivo, exponer a prácticas diferentes y ofrecer encuentros que ningún curso o 
        taller interno puede reproducir.
      </p>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">1. Definición de una Learning Expedition</h2>
      
      <p className="text-lg text-gray-700 leading-relaxed">
        Una Learning Expedition es un programa inmersivo, generalmente en otra ciudad u otro país. 
        Su objetivo es confrontar a un grupo con un nuevo entorno, permitiéndole ver 
        modelos alternativos, dialogar con actores clave y comprender las dinámicas de un ecosistema.
      </p>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-neutral-dark p-8 my-8 rounded-r-xl">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Se basa en tres pilares:</h3>
        <ul className="space-y-4">
          <li className="flex items-start gap-3">
            <span className="text-neutral-dark mt-1 text-xl">•</span>
            <span className="text-lg text-gray-800">el descubrimiento de organizaciones locales y sus prácticas,</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-neutral-dark mt-1 text-xl">•</span>
            <span className="text-lg text-gray-800">la interacción con expertos, directivos y líderes de opinión,</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-neutral-dark mt-1 text-xl">•</span>
            <span className="text-lg text-gray-800">la inmersión cultural, necesaria para captar la lógica del territorio.</span>
          </li>
        </ul>
      </div>

      <p className="text-lg text-gray-700 leading-relaxed">
        Es la combinación de estos elementos la que crea una experiencia de aprendizaje rápida, profunda y 
        memorable. El desplazamiento no es un decorado, sino un acelerador.
      </p>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">2. Una historia que comienza en Silicon Valley</h2>
      
      <p className="text-lg text-gray-700 leading-relaxed">
        La primera generación de Learning Expeditions aparece en los años 1980 y 1990. Directivos 
        de todo el mundo buscan entonces comprender qué distingue a Silicon Valley del resto del planeta. 
        La agencia WDHB estructura los primeros programas de descubrimiento inmersivo: encuentros con emprendedores, 
        observación de métodos de trabajo, comprensión de la cultura local.
      </p>

      <div className="bg-amber-50 border-l-4 border-amber-600 p-6 my-8 rounded-r-xl">
        <p className="text-lg text-gray-900 italic">
          Estas expediciones se basan en una convicción simple: salir de tu entorno cotidiano permite reflexionar 
          de otra manera, romper rutinas mentales e identificar oportunidades invisibles desde tu oficina.
        </p>
      </div>

      <p className="text-lg text-gray-700 leading-relaxed">El concepto se expande luego a:</p>

      <ul className="space-y-3 ml-6 my-6">
        <li className="text-lg text-gray-700">
          • las escuelas de negocios y MBA, que quieren ofrecer una dimensión internacional y experiencial a sus estudiantes;
        </li>
        <li className="text-lg text-gray-700">
          • las empresas, que utilizan estas inmersiones para catalizar la transformación digital, la reflexión 
          estratégica o la renovación cultural;
        </li>
        <li className="text-lg text-gray-700">
          • los Comités Ejecutivos (COMEX), que ven en ello una herramienta de alineación y toma de perspectiva.
        </li>
      </ul>

      <p className="text-lg text-gray-700 leading-relaxed">
        Hoy, el learning tour se ha convertido en un formato global, adaptado a todos los sectores y todas las geografías.
      </p>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">3. El formato típico de una Learning Expedition</h2>

      <p className="text-lg text-gray-700 leading-relaxed mb-6">
        Aunque siempre son personalizadas, las Learning Expeditions siguen a menudo una estructura eficaz de tres días.
      </p>

      <div className="space-y-6 my-8">
        <div className="bg-white p-8 rounded-2xl border-2 border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">1</div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Día 1: inmersión en el ecosistema</h3>
              <p className="text-gray-700 leading-relaxed">
                El grupo descubre a los actores locales, los hubs de innovación, las startups emblemáticas y las 
                instituciones que estructuran la ciudad. El objetivo es comprender el terreno antes de analizar los mecanismos.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl border-2 border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-xl">2</div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Día 2: interacción y profundización</h3>
              <p className="text-gray-700 leading-relaxed">
                Keynotes, talleres, visitas guiadas o participación en ferias permiten al grupo dialogar 
                directamente con expertos. Se pasa entonces de "ver" a "comprender".
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl border-2 border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xl">3</div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Día 3: apertura y síntesis</h3>
              <p className="text-gray-700 leading-relaxed">
                El tercer día se dedica a la perspectiva. El grupo intercambia con líderes de opinión, 
                participa en un momento de networking, explora la ciudad desde un punto de vista cultural y luego construye una 
                síntesis procesable al regreso.
              </p>
            </div>
          </div>
        </div>
      </div>

      <p className="text-lg text-gray-700 leading-relaxed">
        Este formato funciona igual de bien para estudiantes que para un comité ejecutivo. Concentra inspiración, análisis y apropiación.
      </p>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">4. El impacto real de una Learning Expedition</h2>

      <p className="text-lg text-gray-700 leading-relaxed mb-6">
        Una Learning Expedition crea tres tipos de impacto que se refuerzan mutuamente.
      </p>

      <div className="grid md:grid-cols-3 gap-6 my-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
          <h3 className="text-xl font-bold text-gray-900 mb-3">Impacto cognitivo</h3>
          <p className="text-gray-700">
            Estar inmerso en un entorno desconocido permite adoptar una nueva mirada. Los participantes identifican 
            sus sesgos, comparan sus prácticas con las de organizaciones más innovadoras y descubren modelos 
            a los que no habrían estado expuestos de otra manera.
          </p>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-xl border border-indigo-200">
          <h3 className="text-xl font-bold text-gray-900 mb-3">Impacto estratégico</h3>
          <p className="text-gray-700 mb-3">Los insights recolectados iluminan directamente las decisiones de la organización:</p>
          <ul className="space-y-1 text-sm text-gray-700">
            <li>• Identificar tendencias emergentes</li>
            <li>• Observar soluciones aplicadas</li>
            <li>• Desafiar una estrategia existente</li>
            <li>• Imaginar nuevas vías</li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
          <h3 className="text-xl font-bold text-gray-900 mb-3">Impacto relacional</h3>
          <p className="text-gray-700">
            Una Learning Expedition es también una herramienta de construcción de red. Los participantes conocen a 
            directivos, emprendedores, expertos y desarrollan una cohesión interna valiosa. El grupo regresa 
            a menudo con contactos, ideas de colaboración y una dinámica colectiva reforzada.
          </p>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
        5. Por qué Barcelona se ha convertido en un hotspot mundial para las Learning Expeditions
      </h2>

      <p className="text-lg text-gray-700 leading-relaxed">
        Barcelona reúne características raras. Es un ecosistema donde la tecnología, la innovación, la movilidad, 
        la salud, el turismo, la IA y el diseño conviven en un espacio compacto y accesible.
      </p>

      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-8 rounded-2xl my-8 border-l-4 border-green-600">
        <p className="text-lg text-gray-800 mb-4">
          La ciudad cuenta con más de <strong>1.600 startups</strong>, una concentración excepcional de scale-ups europeas, 
          hubs importantes como el 22@ o el Barcelona Health Hub, e infraestructuras de nivel mundial. Acoge 
          también las ferias europeas más grandes, incluyendo el Mobile World Congress o el ISE, que atraen cada año a 
          directivos, inversores y expertos internacionales.
        </p>
        <p className="text-gray-700">
          Varios factores refuerzan aún más su atractivo: una densidad de innovación única en Europa, un entorno 
          internacional y anglófono, una alta calidad de vida que atrae talentos, una economía equilibrada entre tecnología, 
          servicios, industria y movilidad.
        </p>
      </div>

      <p className="text-lg text-gray-700 leading-relaxed">
        Un viaje inmersivo a Barcelona no es, por tanto, un simple desplazamiento agradable. Es una entrada directa a un 
        laboratorio europeo donde se diseñan nuevas formas de trabajar, emprender e innovar.
      </p>

      <div className="bg-neutral-dark text-white p-8 rounded-2xl my-8">
        <p className="text-lg mb-2">
          <Link href="/blog/barcelona-tech-ecosystem" className="underline hover:text-gray-300">
            → Descubre por qué Barcelona es uno de los ecosistemas tecnológicos más dinámicos de Europa
          </Link>
        </p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
        6. Por qué las escuelas y los COMEX adoptan masivamente este formato
      </h2>

      <p className="text-lg text-gray-700 leading-relaxed">
        Las escuelas utilizan ahora las Learning Expeditions como componente esencial de sus programas. Ellas 
        permiten completar la enseñanza teórica con una exposición concreta a los oficios, culturas empresariales 
        y tendencias internacionales.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        Del lado de las organizaciones, el formato responde a varias necesidades: toma de perspectiva, alineación estratégica, 
        aculturación digital, inspiración de producto, exploración de nuevos mercados, desarrollo de liderazgo o 
        transformación cultural. Los COMEX encuentran en ello una herramienta capaz de generar claridad, cohesión y 
        decisiones más rápidas.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        En un mundo donde los ciclos de innovación se acortan, las Learning Expeditions juegan un papel decisivo. 
        Permiten comprender qué cambia, por qué cambia y cómo adaptarse.
      </p>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Conclusión</h2>

      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-2xl my-8 border-l-4 border-neutral-dark">
        <p className="text-lg text-gray-900 leading-relaxed">
          La Learning Expedition es una inversión estratégica, no un "viaje premium". Combina inmersión, 
          encuentros, análisis y cultura para ofrecer una comprensión acelerada de sectores en movimiento. En un 
          contexto donde las organizaciones deben evolucionar rápido, mirar a otro lado se vuelve indispensable para pensar de manera diferente.
        </p>
        <p className="text-lg text-gray-800 mt-4">
          En Barcelona, Rusker diseña Learning Expeditions apoyándose en una red profundamente arraigada en el ecosistema 
          local, yendo desde startups a scale-ups, de instituciones a hubs de innovación, para ayudar a escuelas y empresas 
          a captar lo mejor de la ciudad y transformar sus ideas en acciones.
        </p>
      </div>

      <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-200">
        <p className="text-sm font-semibold text-blue-900 mb-2">📚 Artículos relacionados</p>
        <ul className="space-y-2 text-sm">
          <li>
            <Link href="/blog/case-study-essec" className="text-blue-700 hover:text-blue-900 underline">
              → CASO DE ESTUDIO: Cómo ESSEC utilizó una Learning Expedition para comprender el escalado
            </Link>
          </li>
          <li>
            <Link href="/blog/rusker-360-agency" className="text-blue-700 hover:text-blue-900 underline">
              → Descubre cómo Rusker estructura sus Learning Expeditions con Travel, Events & Network
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

