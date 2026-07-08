'use client'

import { useI18n } from '@/lib/i18n'
import Link from 'next/link'

export default function BarcelonaTechEcosystemArticle() {
  const { locale } = useI18n()

  if (locale === 'en') {
    return <BarcelonaTechEcosystemArticleEn />
  } else if (locale === 'es') {
    return <BarcelonaTechEcosystemArticleEs />
  }
  
  return <BarcelonaTechEcosystemArticleFr />
}

function BarcelonaTechEcosystemArticleFr() {
  return (
    <div className="space-y-8">
      <p className="text-lg text-gray-700 leading-relaxed">
        Quand on pense à Barcelone depuis Paris, on imagine souvent la plage, Gaudí, la gastronomie, une qualité de vie enviée. Mais derrière cette image 
        de carte postale se cache l'un des écosystèmes technologiques les plus performants d'Europe — et surtout l'un des plus cohérents.
      </p>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl my-8 border-l-4 border-blue-600">
        <p className="text-lg text-gray-900 font-semibold mb-4">
          Barcelone n'est pas "une ville cool avec des startups". C'est une machine structurée, nourrie par :
        </p>
        <ul className="space-y-2 text-gray-800">
          <li>• plus de 2 200 startups,</li>
          <li>• un volume d'investissement en très forte croissance,</li>
          <li>• l'un des meilleurs taux d'attraction de talents d'Europe,</li>
          <li>• des infrastructures lourdes comme le 22@ et le Barcelona Supercomputing Center,</li>
          <li>• des événements mondiaux comme le Mobile World Congress,</li>
          <li>• un tissu universitaire qui alimente les entreprises en continu.</li>
        </ul>
        <p className="text-gray-800 mt-4">
          Pour les écoles, les universités, les COMEX et les entreprises en transformation, la ville est devenue un laboratoire à ciel ouvert, idéal pour 
          comprendre la technologie, les nouveaux modèles organisationnels et les stratégies de croissance.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">1. Un hub technologique majeur à l'échelle européenne</h2>
      
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-8 rounded-2xl my-8 border-l-4 border-green-600">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Les chiffres clés de l'écosystème</h3>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-5xl font-bold text-green-600 mb-2">2,285</div>
            <div className="text-sm text-gray-700">Startups actives</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-green-600 mb-2">400+</div>
            <div className="text-sm text-gray-700">Scale-ups<br />(&gt;1M€ levé)</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-green-600 mb-2">65%</div>
            <div className="text-sm text-gray-700">Croissance annuelle<br />des investissements</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-green-600 mb-2">1,1B€</div>
            <div className="text-sm text-gray-700">Levés en 2024</div>
          </div>
        </div>
      </div>

      <p className="text-lg text-gray-700 leading-relaxed">
        En 2024, l'écosystème catalan rassemble plus de 2 285 startups, en croissance continue. Les scaleups — entreprises ayant dépassé le million levé — 
        sont désormais plus de 400. L'investissement a bondi de 65 % en un an, atteignant plus de 1,1 milliard d'euros, et Barcelone figure aujourd'hui parmi 
        les 5 meilleurs écosystèmes technologiques de l'Union européenne.
      </p>

      <div className="bg-neutral-dark text-white p-8 rounded-2xl my-8">
        <p className="text-xl font-semibold mb-4">Cette dynamique place la ville :</p>
        <ul className="space-y-2 text-lg">
          <li>• <strong>1ère d'Europe du Sud</strong>,</li>
          <li>• <strong>2e hub préféré des fondateurs internationaux</strong>,</li>
          <li>• <strong>5e écosystème le plus attractif de l'UE</strong>.</li>
        </ul>
        <p className="text-lg mt-6 italic">
          Et surtout : un taux de croissance régulier, pas un pic isolé ou conjoncturel.
        </p>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-8 rounded-r-xl">
        <p className="text-gray-900 italic">
          « Ce qui frappe à Barcelone, c'est la stabilité de la croissance. Ce n'est pas un feu de paille : c'est un écosystème qui avance, année après année. »
        </p>
        <p className="text-gray-700 text-sm mt-2">— Guillaume Rostand, président de la French Tech Barcelona</p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">2. Des secteurs puissants : intelligence artificielle, santé, mobilité, fintech, traveltech</h2>

      <p className="text-lg text-gray-700 leading-relaxed">
        Barcelone n'est pas un hub monocentrique. Elle est organisée autour de piliers sectoriels solides, ce qui lui donne une profondeur rare en Europe.
      </p>

      <div className="space-y-6 my-8">
        <div className="bg-white p-6 rounded-xl border-2 border-purple-200">
          <h3 className="text-xl font-bold text-gray-900 mb-3">• Intelligence artificielle & Deep Tech</h3>
          <p className="text-gray-700 text-sm mb-2">
            La Catalogne compte plus de <strong>340 startups deep tech</strong> — un chiffre énorme à l'échelle d'un territoire régional. La ville héberge :
          </p>
          <ul className="space-y-1 text-gray-700 text-sm ml-6">
            <li>• une AI Factory européenne,</li>
            <li>• le supercalculateur MareNostrum 5,</li>
            <li>• un programme national de recherche quantique.</li>
          </ul>
          <p className="text-gray-800 mt-3 text-sm font-semibold">
            Résultat : Barcelone est classée 3e au monde pour l'attraction de projets en intelligence artificielle internationaux.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border-2 border-green-200">
          <h3 className="text-xl font-bold text-gray-900 mb-3">• HealthTech & biotechnologies</h3>
          <p className="text-gray-700 text-sm">
            Le secteur pèse près de <strong>8 % du PIB catalan</strong>. Le Parc Científic de Barcelona cultive une densité exceptionnelle de startups et 
            laboratoires spécialisés. La ville attire des talents de très haut niveau dans la bioinformatique, la médicalisation assistée par intelligence 
            artificielle et la recherche clinique.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border-2 border-blue-200">
          <h3 className="text-xl font-bold text-gray-900 mb-3">• Mobilité & smart cities</h3>
          <p className="text-gray-700 text-sm">
            YEGO, Wallbox, Cooltra ou encore les projets urbains autour de la superilla montrent que Barcelone est un territoire d'expérimentation urbaine.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border-2 border-indigo-200">
          <h3 className="text-xl font-bold text-gray-900 mb-3">• Fintech, Traveltech & SaaS</h3>
          <p className="text-gray-700 text-sm">
            TravelPerk, Kantox, Amenitiz, Factorial, Typeform… Des entreprises qui scalent à l'échelle européenne depuis Barcelone, avec une forte capacité d'internationalisation.
          </p>
        </div>
      </div>

      <div className="bg-amber-50 border-l-4 border-amber-600 p-6 my-8 rounded-r-xl">
        <p className="text-gray-900 italic">
          « Barcelone cumule trois raretés : de la technologie, de la science, et des industries très opérationnelles. Pour une Learning Expedition, c'est un terrain inégalé. »
        </p>
        <p className="text-gray-700 text-sm mt-2">— Tanguy Wincker, cofondateur de Rusker</p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">3. Une infrastructure pensée pour l'innovation : le 22@, BSC, hubs et clusters</h2>

      <p className="text-lg text-gray-700 leading-relaxed">
        L'écosystème barcelonais ne repose pas uniquement sur des startups : il repose sur des infrastructures conçues pour les accueillir, les faire collaborer et les faire grandir.
      </p>

      <div className="grid md:grid-cols-3 gap-6 my-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h4 className="font-bold text-gray-900 mb-3">• Le district 22@</h4>
          <p className="text-gray-700 text-sm">
            200 hectares d'anciennes friches industrielles reconverties en quartier de l'innovation. On y trouve : des incubateurs, des sièges de scaleups, 
            des hubs internationaux, des écoles de design, des centres de R&D. Tout est pensé pour favoriser la collaboration entre entreprises, recherche, 
            institutions et enseignement.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h4 className="font-bold text-gray-900 mb-3">• Barcelona Supercomputing Center (BSC)</h4>
          <p className="text-gray-700 text-sm">
            Avec MareNostrum 5 et l'AI Factory européenne, Barcelone héberge l'une des infrastructures en intelligence artificielle les plus avancées du continent.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h4 className="font-bold text-gray-900 mb-3">• Tech hubs & parcs scientifiques</h4>
          <p className="text-gray-700 text-sm">
            Plus de 160 hubs technologiques opèrent aujourd'hui en Catalogne. Ils concentrent talents, entreprises, programmes de mentoring, formations, et 
            technologies émergentes.
          </p>
        </div>
      </div>

      <div className="bg-purple-50 p-6 rounded-xl my-8">
        <p className="text-gray-800 text-sm">
          C'est ce qui permet une densité d'expériences unique pour les Learning Expeditions : en 15 minutes de taxi, on passe d'un laboratoire biotech à 
          une scaleup SaaS, puis à un centre de recherche en technologies avancées.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">4. Une ville qui attire et retient les talents</h2>

      <p className="text-lg text-gray-700 leading-relaxed">
        Barcelone n'est pas seulement un lieu où l'on crée des startups : c'est un lieu où des centaines de milliers de talents digitaux viennent vivre.
      </p>

      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-8 rounded-2xl my-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Quelques faits structurants :</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="text-4xl font-bold text-indigo-600 mb-2">&gt; 129,000</div>
            <div className="text-gray-700">professionnels digitaux dans la métropole</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-purple-600 mb-2">62,000</div>
            <div className="text-gray-700">nouveaux profils IT créés depuis 2018</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-indigo-600 mb-2">#1</div>
            <div className="text-gray-700">hub européen avec le plus fort pourcentage de fondateurs internationaux</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-purple-600 mb-2">7</div>
            <div className="text-gray-700">universités majeures (UPF, UAB, UB, UPC, ESADE, IESE, TBS)</div>
          </div>
        </div>
        <p className="text-gray-800 mt-6">
          Ce mélange crée une réalité simple : les entreprises qui viennent à Barcelone trouvent très vite des équipes internationales performantes.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">5. Les événements mondiaux comme catalyseurs de connexions</h2>

      <p className="text-lg text-gray-700 leading-relaxed">
        MWC, ISE, Shoptalk Europe, BNEW, Smart City Expo, AI Summit Barcelona… Chaque année, Barcelone accueille :
      </p>

      <div className="bg-blue-50 p-6 rounded-xl my-8 border-l-4 border-blue-600">
        <ul className="space-y-2 text-gray-800">
          <li>• des milliers de décideurs C-level,</li>
          <li>• des centaines de grandes entreprises,</li>
          <li>• des leaders technologiques mondiaux,</li>
          <li>• des milliers de professionnels en mobilité, intelligence artificielle, retail, santé et cybersécurité.</li>
        </ul>
        <p className="text-gray-800 mt-4">
          Pour les écoles et les entreprises en Learning Expedition, cela signifie : un accès direct à des intervenants qui influencent le futur de leurs industries.
        </p>
      </div>

      <div className="bg-neutral-dark text-white p-6 rounded-xl my-8">
        <p className="text-lg italic">
          « En trois jours ici, une équipe dirigeante capte plus de signaux faibles qu'en six mois de benchmarks. Barcelone est une ville qui vous met devant la réalité du marché. »
        </p>
        <p className="text-sm mt-2 opacity-90">— Adam Hruska, cofondateur de Rusker</p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">6. Pourquoi Barcelone est idéale pour les Learning Expeditions</h2>

      <div className="grid md:grid-cols-2 gap-6 my-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h4 className="font-bold text-gray-900 mb-3">1. L'écosystème est dense, lisible, compact</h4>
          <p className="text-gray-700 text-sm">
            Tout est accessible en quelques minutes : scaleups, hubs, supercalculateur, universités, VC, espaces d'innovation…
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h4 className="font-bold text-gray-900 mb-3">2. La ville mélange technologie, créativité et business</h4>
          <p className="text-gray-700 text-sm">
            Rares sont les villes qui réunissent autant de culture produit, de design et de technologie dans un même espace social.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h4 className="font-bold text-gray-900 mb-3">3. Les entreprises locales sont ouvertes et habituées à recevoir des groupes</h4>
          <p className="text-gray-700 text-sm">
            Barcelone accueille constamment des délégations internationales. Les scaleups sont disponibles, pédagogiques et aiment transmettre.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h4 className="font-bold text-gray-900 mb-3">4. Les thématiques d'apprentissage sont transverses</h4>
          <p className="text-gray-700 text-sm">
            Leadership, Innovation, IA, Scaling, Internationalisation, Smart cities, Mobilité, Fintech, Santé, Design & UX…
          </p>
        </div>
      </div>

      <div className="bg-green-50 p-6 rounded-xl my-8 border-l-4 border-green-600">
        <h4 className="font-bold text-gray-900 mb-3">5. Le contexte urbain renforce l'expérience humaine</h4>
        <p className="text-gray-800">
          Barcelone n'est pas seulement un hub : elle est inspirante, vivante, surprenante. Et une Learning Expedition est autant humaine que professionnelle.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Conclusion : Barcelone, la salle de classe vivante de l'Europe technologique</h2>

      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-2xl my-8 border-l-4 border-neutral-dark">
        <p className="text-lg text-gray-900 leading-relaxed">
          Barcelone n'est pas un décor : c'est un écosystème vivant, en croissance continue, où se côtoient intelligence artificielle, deep tech, santé, 
          mobilité, SaaS, fintech et design.
        </p>
        <p className="text-lg text-gray-800 mt-4">
          Pour les écoles, les étudiants, les COMEX, les entrepreneurs, Barcelone est devenue le terrain idéal pour comprendre ce qui transforme nos industries — 
          aujourd'hui, pas dans cinq ans.
        </p>
        <p className="text-lg text-gray-800 mt-4">
          Et c'est précisément dans cette dynamique que Rusker conçoit ses Learning Expeditions : au plus près des leaders, des entreprises, des labs et des 
          signaux faibles qui façonnent l'avenir.
        </p>
      </div>

      <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-200">
        <p className="text-sm font-semibold text-blue-900 mb-2">📚 Articles connexes</p>
        <ul className="space-y-2 text-sm">
          <li>
            <Link href="/blog/learning-expedition-definition" className="text-blue-700 hover:text-blue-900 underline">
              → Découvrez pourquoi les Learning Expeditions sont si efficaces à Barcelone
            </Link>
          </li>
          <li>
            <Link href="/blog/case-study-essec" className="text-blue-700 hover:text-blue-900 underline">
              → Voir comment l'ESSEC a utilisé Barcelone pour comprendre le scaling
            </Link>
          </li>
          <li>
            <Link href="/blog/french-tech-barcelona-ecosystem" className="text-blue-700 hover:text-blue-900 underline">
              → Comment French Tech Barcelona structure l'écosystème
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

function BarcelonaTechEcosystemArticleEn() {
  return (
    <div className="space-y-8">
      <p className="text-lg text-gray-700 leading-relaxed">
        When we think of Barcelona from abroad, we often imagine the beach, Gaudí, gastronomy, an envied quality of life. But behind this postcard image 
        lies one of the most successful technology ecosystems in Europe — and above all one of the most coherent.
      </p>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl my-8 border-l-4 border-blue-600">
        <p className="text-lg text-gray-900 font-semibold mb-4">
          Barcelona is not "a cool city with startups". It is a structured machine, fueled by:
        </p>
        <ul className="space-y-2 text-gray-800">
          <li>• more than 2,200 startups,</li>
          <li>• a very strong growth in investment volume,</li>
          <li>• one of the best talent attraction rates in Europe,</li>
          <li>• heavy infrastructure like 22@ and the Barcelona Supercomputing Center,</li>
          <li>• global events like the Mobile World Congress,</li>
          <li>• a university fabric that continuously feeds companies.</li>
        </ul>
        <p className="text-gray-800 mt-4">
          For schools, universities, executive committees and companies in transformation, the city has become an open-air laboratory, ideal for 
          understanding technology, new organizational models and growth strategies.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">1. A Major Technological Hub on a European Scale</h2>
      
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-8 rounded-2xl my-8 border-l-4 border-green-600">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Ecosystem Figures</h3>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-5xl font-bold text-green-600 mb-2">2,285</div>
            <div className="text-sm text-gray-700">Active Startups</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-green-600 mb-2">400+</div>
            <div className="text-sm text-gray-700">Scale-ups<br />(&gt;1M€ raised)</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-green-600 mb-2">65%</div>
            <div className="text-sm text-gray-700">Annual growth<br />in investments</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-green-600 mb-2">1.1B€</div>
            <div className="text-sm text-gray-700">Raised in 2024</div>
          </div>
        </div>
      </div>

      <p className="text-lg text-gray-700 leading-relaxed">
        In 2024, the Catalan ecosystem brings together more than 2,285 startups, continuously growing. Scaleups — companies having exceeded one million raised — 
        are now more than 400. Investment jumped by 65% in one year, reaching more than 1.1 billion euros, and Barcelona is now among 
        the top 5 technology ecosystems in the European Union.
      </p>

      <div className="bg-neutral-dark text-white p-8 rounded-2xl my-8">
        <p className="text-xl font-semibold mb-4">This dynamic places the city:</p>
        <ul className="space-y-2 text-lg">
          <li>• <strong>1st in Southern Europe</strong>,</li>
          <li>• <strong>2nd preferred hub for international founders</strong>,</li>
          <li>• <strong>5th most attractive ecosystem in the EU</strong>.</li>
        </ul>
        <p className="text-lg mt-6 italic">
          And above all: a steady growth rate, not an isolated or cyclical peak.
        </p>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-8 rounded-r-xl">
        <p className="text-gray-900 italic">
          "What strikes you in Barcelona is the stability of growth. It's not a flash in the pan: it's an ecosystem that moves forward, year after year."
        </p>
        <p className="text-gray-700 text-sm mt-2">— Guillaume Rostand, President of French Tech Barcelona</p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">2. Powerful Sectors: Artificial Intelligence, Health, Mobility, Fintech, Traveltech</h2>

      <p className="text-lg text-gray-700 leading-relaxed">
        Barcelona is not a monocentric hub. It is organized around solid sectoral pillars, which gives it a depth rare in Europe.
      </p>

      <div className="space-y-6 my-8">
        <div className="bg-white p-6 rounded-xl border-2 border-purple-200">
          <h3 className="text-xl font-bold text-gray-900 mb-3">• Artificial Intelligence & Deep Tech</h3>
          <p className="text-gray-700 text-sm mb-2">
            Catalonia has more than <strong>340 deep tech startups</strong> — a huge figure on a regional scale. The city hosts:
          </p>
          <ul className="space-y-1 text-gray-700 text-sm ml-6">
            <li>• a European AI Factory,</li>
            <li>• the MareNostrum 5 supercomputer,</li>
            <li>• a national quantum research program.</li>
          </ul>
          <p className="text-gray-800 mt-3 text-sm font-semibold">
            Result: Barcelona is ranked 3rd in the world for attracting international artificial intelligence projects.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border-2 border-green-200">
          <h3 className="text-xl font-bold text-gray-900 mb-3">• HealthTech & Biotechnologies</h3>
          <p className="text-gray-700 text-sm">
            The sector weighs nearly <strong>8% of Catalan GDP</strong>. The Parc Científic de Barcelona cultivates an exceptional density of startups and 
            specialized laboratories. The city attracts very high-level talents in bioinformatics, AI-assisted medicalization 
            and clinical research.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border-2 border-blue-200">
          <h3 className="text-xl font-bold text-gray-900 mb-3">• Mobility & Smart Cities</h3>
          <p className="text-gray-700 text-sm">
            YEGO, Wallbox, Cooltra or urban projects around the superilla show that Barcelona is a territory of urban experimentation.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border-2 border-indigo-200">
          <h3 className="text-xl font-bold text-gray-900 mb-3">• Fintech, Traveltech & SaaS</h3>
          <p className="text-gray-700 text-sm">
            TravelPerk, Kantox, Amenitiz, Factorial, Typeform... Companies scaling across Europe from Barcelona, with strong internationalization capacity.
          </p>
        </div>
      </div>

      <div className="bg-amber-50 border-l-4 border-amber-600 p-6 my-8 rounded-r-xl">
        <p className="text-gray-900 italic">
          "Barcelona combines three rarities: technology, science, and highly operational industries. For a Learning Expedition, it is an unparalleled terrain."
        </p>
        <p className="text-gray-700 text-sm mt-2">— Tanguy Wincker, co-founder of Rusker</p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">3. Infrastructure Designed for Innovation: 22@, BSC, Hubs and Clusters</h2>

      <p className="text-lg text-gray-700 leading-relaxed">
        The Barcelona ecosystem does not rely solely on startups: it relies on infrastructure designed to welcome them, make them collaborate and help them grow.
      </p>

      <div className="grid md:grid-cols-3 gap-6 my-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h4 className="font-bold text-gray-900 mb-3">• The 22@ District</h4>
          <p className="text-gray-700 text-sm">
            200 hectares of former industrial wastelands converted into an innovation district. There are: incubators, scaleup headquarters, 
            international hubs, design schools, R&D centers. Everything is designed to foster collaboration between companies, research, 
            institutions and education.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h4 className="font-bold text-gray-900 mb-3">• Barcelona Supercomputing Center (BSC)</h4>
          <p className="text-gray-700 text-sm">
            With MareNostrum 5 and the European AI Factory, Barcelona hosts one of the most advanced artificial intelligence infrastructures on the continent.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h4 className="font-bold text-gray-900 mb-3">• Tech Hubs & Science Parks</h4>
          <p className="text-gray-700 text-sm">
            More than 160 technology hubs operate in Catalonia today. They concentrate talents, companies, mentoring programs, training, and 
            emerging technologies.
          </p>
        </div>
      </div>

      <div className="bg-purple-50 p-6 rounded-xl my-8">
        <p className="text-gray-800 text-sm">
          This is what allows a unique density of experiences for Learning Expeditions: in a 15-minute taxi ride, you go from a biotech lab to 
          a SaaS scaleup, then to an advanced technology research center.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">4. A City That Attracts and Retains Talents</h2>

      <p className="text-lg text-gray-700 leading-relaxed">
        Barcelona is not just a place where startups are created: it is a place where hundreds of thousands of digital talents come to live.
      </p>

      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-8 rounded-2xl my-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Some Structuring Facts:</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="text-4xl font-bold text-indigo-600 mb-2">&gt; 129,000</div>
            <div className="text-gray-700">digital professionals in the metropolis</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-purple-600 mb-2">62,000</div>
            <div className="text-gray-700">new IT profiles created since 2018</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-indigo-600 mb-2">#1</div>
            <div className="text-gray-700">European hub with the highest percentage of international founders</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-purple-600 mb-2">7</div>
            <div className="text-gray-700">major universities (UPF, UAB, UB, UPC, ESADE, IESE, TBS)</div>
          </div>
        </div>
        <p className="text-gray-800 mt-6">
          This mix creates a simple reality: companies coming to Barcelona very quickly find high-performing international teams.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">5. Global Events as Catalysts for Connections</h2>

      <p className="text-lg text-gray-700 leading-relaxed">
        MWC, ISE, Shoptalk Europe, BNEW, Smart City Expo, AI Summit Barcelona… Every year, Barcelona welcomes:
      </p>

      <div className="bg-blue-50 p-6 rounded-xl my-8 border-l-4 border-blue-600">
        <ul className="space-y-2 text-gray-800">
          <li>• thousands of C-level decision-makers,</li>
          <li>• hundreds of large companies,</li>
          <li>• global technology leaders,</li>
          <li>• thousands of professionals in mobility, artificial intelligence, retail, health and cybersecurity.</li>
        </ul>
        <p className="text-gray-800 mt-4">
          For schools and companies on Learning Expedition, this means: direct access to speakers who influence the future of their industries.
        </p>
      </div>

      <div className="bg-neutral-dark text-white p-6 rounded-xl my-8">
        <p className="text-lg italic">
          "In three days here, an executive team picks up more weak signals than in six months of benchmarks. Barcelona is a city that puts you in front of market reality."
        </p>
        <p className="text-sm mt-2 opacity-90">— Adam Hruska, co-founder of Rusker</p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">6. Why Barcelona is Ideal for Learning Expeditions</h2>

      <div className="grid md:grid-cols-2 gap-6 my-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h4 className="font-bold text-gray-900 mb-3">1. The ecosystem is dense, readable, compact</h4>
          <p className="text-gray-700 text-sm">
            Everything is accessible in a few minutes: scaleups, hubs, supercomputer, universities, VCs, innovation spaces...
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h4 className="font-bold text-gray-900 mb-3">2. The city mixes technology, creativity and business</h4>
          <p className="text-gray-700 text-sm">
            Few cities bring together so much product culture, design and technology in the same social space.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h4 className="font-bold text-gray-900 mb-3">3. Local companies are open and used to receiving groups</h4>
          <p className="text-gray-700 text-sm">
            Barcelona constantly welcomes international delegations. Scaleups are available, pedagogical and love to transmit.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h4 className="font-bold text-gray-900 mb-3">4. Learning themes are transverse</h4>
          <p className="text-gray-700 text-sm">
            Leadership, Innovation, AI, Scaling, Internationalization, Smart cities, Mobility, Fintech, Health, Design & UX...
          </p>
        </div>
      </div>

      <div className="bg-green-50 p-6 rounded-xl my-8 border-l-4 border-green-600">
        <h4 className="font-bold text-gray-900 mb-3">5. The urban context reinforces the human experience</h4>
        <p className="text-gray-800">
          Barcelona is not just a hub: it is inspiring, lively, surprising. And a Learning Expedition is as much human as professional.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Conclusion: Barcelona, the Living Classroom of Technological Europe</h2>

      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-2xl my-8 border-l-4 border-neutral-dark">
        <p className="text-lg text-gray-900 leading-relaxed">
          Barcelona is not a backdrop: it is a living ecosystem, continuously growing, where artificial intelligence, deep tech, health, 
          mobility, SaaS, fintech and design rub shoulders.
        </p>
        <p className="text-lg text-gray-800 mt-4">
          For schools, students, executive committees, entrepreneurs, Barcelona has become the ideal ground to understand what transforms our industries — 
          today, not in five years.
        </p>
        <p className="text-lg text-gray-800 mt-4">
          And it is precisely in this dynamic that Rusker designs its Learning Expeditions: close to leaders, companies, labs and 
          weak signals that shape the future.
        </p>
      </div>

      <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-200">
        <p className="text-sm font-semibold text-blue-900 mb-2">📚 Related Articles</p>
        <ul className="space-y-2 text-sm">
          <li>
            <Link href="/blog/learning-expedition-definition" className="text-blue-700 hover:text-blue-900 underline">
              → Discover why Learning Expeditions are so effective in Barcelona
            </Link>
          </li>
          <li>
            <Link href="/blog/case-study-essec" className="text-blue-700 hover:text-blue-900 underline">
              → See how ESSEC used Barcelona to understand scaling
            </Link>
          </li>
          <li>
            <Link href="/blog/french-tech-barcelona-ecosystem" className="text-blue-700 hover:text-blue-900 underline">
              → How French Tech Barcelona structures the ecosystem
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

function BarcelonaTechEcosystemArticleEs() {
  return (
    <div className="space-y-8">
      <p className="text-lg text-gray-700 leading-relaxed">
        Cuando pensamos en Barcelona desde el extranjero, a menudo imaginamos la playa, Gaudí, la gastronomía, una calidad de vida envidiada. Pero detrás de esta imagen 
        de postal se esconde uno de los ecosistemas tecnológicos más exitosos de Europa — y sobre todo uno de los más coherentes.
      </p>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl my-8 border-l-4 border-blue-600">
        <p className="text-lg text-gray-900 font-semibold mb-4">
          Barcelona no es "una ciudad genial con startups". Es una máquina estructurada, alimentada por:
        </p>
        <ul className="space-y-2 text-gray-800">
          <li>• más de 2.200 startups,</li>
          <li>• un volumen de inversión en muy fuerte crecimiento,</li>
          <li>• una de las mejores tasas de atracción de talento de Europa,</li>
          <li>• infraestructuras pesadas como el 22@ y el Barcelona Supercomputing Center,</li>
          <li>• eventos mundiales como el Mobile World Congress,</li>
          <li>• un tejido universitario que alimenta a las empresas continuamente.</li>
        </ul>
        <p className="text-gray-800 mt-4">
          Para las escuelas, universidades, comités ejecutivos y empresas en transformación, la ciudad se ha convertido en un laboratorio al aire libre, ideal para 
          comprender la tecnología, los nuevos modelos organizativos y las estrategias de crecimiento.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">1. Un hub tecnológico importante a escala europea</h2>
      
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-8 rounded-2xl my-8 border-l-4 border-green-600">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Cifras clave del ecosistema</h3>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-5xl font-bold text-green-600 mb-2">2.285</div>
            <div className="text-sm text-gray-700">Startups activas</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-green-600 mb-2">400+</div>
            <div className="text-sm text-gray-700">Scale-ups<br />(&gt;1M€ recaudado)</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-green-600 mb-2">65%</div>
            <div className="text-sm text-gray-700">Crecimiento anual<br />de las inversiones</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-green-600 mb-2">1,1B€</div>
            <div className="text-sm text-gray-700">Recaudados en 2024</div>
          </div>
        </div>
      </div>

      <p className="text-lg text-gray-700 leading-relaxed">
        En 2024, el ecosistema catalán reúne a más de 2.285 startups, en continuo crecimiento. Las scaleups — empresas que han superado el millón recaudado — 
        son ya más de 400. La inversión se disparó un 65% en un año, alcanzando más de 1.100 millones de euros, y Barcelona figura hoy entre 
        los 5 mejores ecosistemas tecnológicos de la Unión Europea.
      </p>

      <div className="bg-neutral-dark text-white p-8 rounded-2xl my-8">
        <p className="text-xl font-semibold mb-4">Esta dinámica sitúa a la ciudad:</p>
        <ul className="space-y-2 text-lg">
          <li>• <strong>1ª del sur de Europa</strong>,</li>
          <li>• <strong>2º hub preferido por los fundadores internacionales</strong>,</li>
          <li>• <strong>5º ecosistema más atractivo de la UE</strong>.</li>
        </ul>
        <p className="text-lg mt-6 italic">
          Y sobre todo: una tasa de crecimiento regular, no un pico aislado o coyuntural.
        </p>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-8 rounded-r-xl">
        <p className="text-gray-900 italic">
          «Lo que llama la atención en Barcelona es la estabilidad del crecimiento. No es flor de un día: es un ecosistema que avanza, año tras año.»
        </p>
        <p className="text-gray-700 text-sm mt-2">— Guillaume Rostand, presidente de la French Tech Barcelona</p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">2. Sectores potentes: inteligencia artificial, salud, movilidad, fintech, traveltech</h2>

      <p className="text-lg text-gray-700 leading-relaxed">
        Barcelona no es un hub monocéntrico. Está organizada en torno a pilares sectoriales sólidos, lo que le confiere una profundidad poco común en Europa.
      </p>

      <div className="space-y-6 my-8">
        <div className="bg-white p-6 rounded-xl border-2 border-purple-200">
          <h3 className="text-xl font-bold text-gray-900 mb-3">• Inteligencia Artificial y Deep Tech</h3>
          <p className="text-gray-700 text-sm mb-2">
            Cataluña cuenta con más de <strong>340 startups deep tech</strong> — una cifra enorme a escala regional. La ciudad alberga:
          </p>
          <ul className="space-y-1 text-gray-700 text-sm ml-6">
            <li>• una AI Factory europea,</li>
            <li>• el superordenador MareNostrum 5,</li>
            <li>• un programa nacional de investigación cuántica.</li>
          </ul>
          <p className="text-gray-800 mt-3 text-sm font-semibold">
            Resultado: Barcelona ocupa el 3er lugar en el mundo en atracción de proyectos internacionales de inteligencia artificial.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border-2 border-green-200">
          <h3 className="text-xl font-bold text-gray-900 mb-3">• HealthTech y biotecnología</h3>
          <p className="text-gray-700 text-sm">
            El sector representa casi el <strong>8% del PIB catalán</strong>. El Parc Científic de Barcelona cultiva una densidad excepcional de startups y 
            laboratorios especializados. La ciudad atrae a talentos de muy alto nivel en bioinformática, medicalización asistida por inteligencia 
            artificial e investigación clínica.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border-2 border-blue-200">
          <h3 className="text-xl font-bold text-gray-900 mb-3">• Movilidad y smart cities</h3>
          <p className="text-gray-700 text-sm">
            YEGO, Wallbox, Cooltra o los proyectos urbanos en torno a la superilla muestran que Barcelona es un territorio de experimentación urbana.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border-2 border-indigo-200">
          <h3 className="text-xl font-bold text-gray-900 mb-3">• Fintech, Traveltech y SaaS</h3>
          <p className="text-gray-700 text-sm">
            TravelPerk, Kantox, Amenitiz, Factorial, Typeform... Empresas que escalan a nivel europeo desde Barcelona, con una fuerte capacidad de internacionalización.
          </p>
        </div>
      </div>

      <div className="bg-amber-50 border-l-4 border-amber-600 p-6 my-8 rounded-r-xl">
        <p className="text-gray-900 italic">
          «Barcelona combina tres rarezas: tecnología, ciencia e industrias muy operativas. Para una Learning Expedition, es un terreno inigualable.»
        </p>
        <p className="text-gray-700 text-sm mt-2">— Tanguy Wincker, cofundador de Rusker</p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">3. Una infraestructura pensada para la innovación: el 22@, BSC, hubs y clústeres</h2>

      <p className="text-lg text-gray-700 leading-relaxed">
        El ecosistema barcelonés no se basa únicamente en startups: se basa en infraestructuras diseñadas para acogerlas, hacerlas colaborar y hacerlas crecer.
      </p>

      <div className="grid md:grid-cols-3 gap-6 my-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h4 className="font-bold text-gray-900 mb-3">• El distrito 22@</h4>
          <p className="text-gray-700 text-sm">
            200 hectáreas de antiguos terrenos industriales reconvertidos en barrio de innovación. Allí se encuentran: incubadoras, sedes de scaleups, 
            hubs internacionales, escuelas de diseño, centros de I+D. Todo está pensado para favorecer la colaboración entre empresas, investigación, 
            instituciones y enseñanza.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h4 className="font-bold text-gray-900 mb-3">• Barcelona Supercomputing Center (BSC)</h4>
          <p className="text-gray-700 text-sm">
            Con MareNostrum 5 y la AI Factory europea, Barcelona alberga una de las infraestructuras de inteligencia artificial más avanzadas del continente.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h4 className="font-bold text-gray-900 mb-3">• Tech hubs y parques científicos</h4>
          <p className="text-gray-700 text-sm">
            Más de 160 hubs tecnológicos operan hoy en Cataluña. Concentran talentos, empresas, programas de mentoring, formación y 
            tecnologías emergentes.
          </p>
        </div>
      </div>

      <div className="bg-purple-50 p-6 rounded-xl my-8">
        <p className="text-gray-800 text-sm">
          Esto es lo que permite una densidad de experiencias única para las Learning Expeditions: en 15 minutos de taxi, se pasa de un laboratorio biotecnológico a 
          una scaleup SaaS, y luego a un centro de investigación en tecnologías avanzadas.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">4. Una ciudad que atrae y retiene talento</h2>

      <p className="text-lg text-gray-700 leading-relaxed">
        Barcelona no es solo un lugar donde se crean startups: es un lugar donde cientos de miles de talentos digitales vienen a vivir.
      </p>

      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-8 rounded-2xl my-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Algunos hechos estructurantes:</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="text-4xl font-bold text-indigo-600 mb-2">&gt; 129.000</div>
            <div className="text-gray-700">profesionales digitales en la metrópolis</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-purple-600 mb-2">62.000</div>
            <div className="text-gray-700">nuevos perfiles TI creados desde 2018</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-indigo-600 mb-2">#1</div>
            <div className="text-gray-700">hub europeo con el mayor porcentaje de fundadores internacionales</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-purple-600 mb-2">7</div>
            <div className="text-gray-700">universidades importantes (UPF, UAB, UB, UPC, ESADE, IESE, TBS)</div>
          </div>
        </div>
        <p className="text-gray-800 mt-6">
          Esta mezcla crea una realidad simple: las empresas que vienen a Barcelona encuentran muy rápidamente equipos internacionales de alto rendimiento.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">5. Los eventos mundiales como catalizadores de conexiones</h2>

      <p className="text-lg text-gray-700 leading-relaxed">
        MWC, ISE, Shoptalk Europe, BNEW, Smart City Expo, AI Summit Barcelona… Cada año, Barcelona acoge:
      </p>

      <div className="bg-blue-50 p-6 rounded-xl my-8 border-l-4 border-blue-600">
        <ul className="space-y-2 text-gray-800">
          <li>• miles de tomadores de decisiones C-level,</li>
          <li>• cientos de grandes empresas,</li>
          <li>• líderes tecnológicos mundiales,</li>
          <li>• miles de profesionales en movilidad, inteligencia artificial, retail, salud y ciberseguridad.</li>
        </ul>
        <p className="text-gray-800 mt-4">
          Para las escuelas y las empresas en Learning Expedition, esto significa: un acceso directo a ponentes que influyen en el futuro de sus industrias.
        </p>
      </div>

      <div className="bg-neutral-dark text-white p-6 rounded-xl my-8">
        <p className="text-lg italic">
          «En tres días aquí, un equipo directivo capta más señales débiles que en seis meses de benchmarks. Barcelona es una ciudad que te pone frente a la realidad del mercado.»
        </p>
        <p className="text-sm mt-2 opacity-90">— Adam Hruska, cofundador de Rusker</p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">6. Por qué Barcelona es ideal para las Learning Expeditions</h2>

      <div className="grid md:grid-cols-2 gap-6 my-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h4 className="font-bold text-gray-900 mb-3">1. El ecosistema es denso, legible, compacto</h4>
          <p className="text-gray-700 text-sm">
            Todo es accesible en unos minutos: scaleups, hubs, superordenador, universidades, VC, espacios de innovación…
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h4 className="font-bold text-gray-900 mb-3">2. La ciudad mezcla tecnología, creatividad y negocios</h4>
          <p className="text-gray-700 text-sm">
            Pocas ciudades reúnen tanta cultura de producto, diseño y tecnología en un mismo espacio social.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h4 className="font-bold text-gray-900 mb-3">3. Las empresas locales son abiertas y están acostumbradas a recibir grupos</h4>
          <p className="text-gray-700 text-sm">
            Barcelona acoge constantemente delegaciones internacionales. Las scaleups están disponibles, son pedagógicas y les gusta transmitir.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h4 className="font-bold text-gray-900 mb-3">4. Las temáticas de aprendizaje son transversales</h4>
          <p className="text-gray-700 text-sm">
            Liderazgo, Innovación, IA, Escalado, Internacionalización, Smart cities, Movilidad, Fintech, Salud, Diseño y UX…
          </p>
        </div>
      </div>

      <div className="bg-green-50 p-6 rounded-xl my-8 border-l-4 border-green-600">
        <h4 className="font-bold text-gray-900 mb-3">5. El contexto urbano refuerza la experiencia humana</h4>
        <p className="text-gray-800">
          Barcelona no es solo un hub: es inspiradora, viva, sorprendente. Y una Learning Expedition es tanto humana como profesional.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Conclusión: Barcelona, el aula viva de la Europa tecnológica</h2>

      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-2xl my-8 border-l-4 border-neutral-dark">
        <p className="text-lg text-gray-900 leading-relaxed">
          Barcelona no es un decorado: es un ecosistema vivo, en continuo crecimiento, donde conviven inteligencia artificial, deep tech, salud, 
          movilidad, SaaS, fintech y diseño.
        </p>
        <p className="text-lg text-gray-800 mt-4">
          Para las escuelas, los estudiantes, los comités ejecutivos, los emprendedores, Barcelona se ha convertido en el terreno ideal para comprender lo que transforma nuestras industrias — 
          hoy, no dentro de cinco años.
        </p>
        <p className="text-lg text-gray-800 mt-4">
          Y es precisamente en esta dinámica en la que Rusker diseña sus Learning Expeditions: lo más cerca posible de los líderes, las empresas, los laboratorios y las 
          señales débiles que dan forma al futuro.
        </p>
      </div>

      <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-200">
        <p className="text-sm font-semibold text-blue-900 mb-2">📚 Artículos relacionados</p>
        <ul className="space-y-2 text-sm">
          <li>
            <Link href="/blog/learning-expedition-definition" className="text-blue-700 hover:text-blue-900 underline">
              → Descubre por qué las Learning Expeditions son tan eficaces en Barcelona
            </Link>
          </li>
          <li>
            <Link href="/blog/case-study-essec" className="text-blue-700 hover:text-blue-900 underline">
              → Ver cómo ESSEC utilizó Barcelona para comprender el escalado
            </Link>
          </li>
          <li>
            <Link href="/blog/french-tech-barcelona-ecosystem" className="text-blue-700 hover:text-blue-900 underline">
              → Cómo French Tech Barcelona estructura el ecosistema
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

