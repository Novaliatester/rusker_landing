'use client'

import { useI18n } from '@/lib/i18n'
import Link from 'next/link'

export default function Rusker360Article() {
  const { locale } = useI18n()

  if (locale === 'en') {
    return <Rusker360ArticleEn />
  } else if (locale === 'es') {
    return <Rusker360ArticleEs />
  }
  
  return <Rusker360ArticleFr />
}

function Rusker360ArticleFr() {
  return (
    <div className="space-y-8">
      <p className="text-lg text-gray-700 leading-relaxed">
        Barcelone attire chaque année des milliers d'étudiants, de talents, d'entreprises et d'équipes dirigeantes en quête 
        d'inspiration, de formation, d'innovation et de rencontres professionnelles. Pour répondre à ces besoins multiples, 
        Rusker a développé une approche unique en Europe : une agence structurée autour de trois expertises complémentaires, 
        qui transforment la ville en un terrain d'expériences, d'événements et de connexions.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        Ces trois piliers – Rusker Travel, Rusker Events et Rusker Network – forment aujourd'hui un ensemble cohérent et intégré, 
        capable d'accompagner écoles, entreprises et institutions de manière globale.
      </p>

      <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-green-50 p-8 rounded-2xl my-8 border-l-4 border-neutral-dark">
        <p className="text-lg text-gray-900 font-semibold mb-2">Cet article présente cette architecture 360° et la logique qui la porte.</p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">1. Rusker Travel : des Learning Expeditions et voyages immersifs conçus pour apprendre autrement</h2>
      
      <p className="text-lg text-gray-700 leading-relaxed">
        Rusker Travel est le cœur historique de la marque. La mission est simple : transformer chaque déplacement à Barcelone en 
        expérience d'apprentissage réelle, fondée sur l'immersion, la rencontre et la compréhension de l'écosystème local.
      </p>

      <div className="bg-blue-50 p-8 rounded-2xl my-8 border-l-4 border-blue-600">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Ce que Rusker Travel conçoit et opère :</h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <span className="text-blue-600 mt-1">→</span>
            <span className="text-gray-800"><strong>Learning Expeditions</strong> pour écoles, universités, Masters et MBA.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-600 mt-1">→</span>
            <span className="text-gray-800"><strong>Séminaires d'entreprise et offsites</strong> pour COMEX et équipes.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-600 mt-1">→</span>
            <span className="text-gray-800"><strong>Voyages d'étude thématiques</strong> (tech, innovation, santé, mobilité, entrepreneuriat, retail, IA, etc.).</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-600 mt-1">→</span>
            <span className="text-gray-800"><strong>Programmes hybrides</strong> combinant pédagogie, visites d'entreprises, ateliers et découvertes culturelles.</span>
          </li>
        </ul>
      </div>

      <p className="text-lg text-gray-700 leading-relaxed">
        L'approche repose sur une conviction forte : on apprend mieux en rencontrant, en observant, en échangeant et en ressentant. 
        Barcelone devient alors un campus vivant, un laboratoire d'innovation, un terrain de jeu pour comprendre les transformations 
        qui traversent l'Europe.
      </p>

      <div className="grid md:grid-cols-2 gap-6 my-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h4 className="font-bold text-gray-900 mb-3">Ce qui distingue Rusker Travel :</h4>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li>• un accès direct aux startups, scale-ups, institutions et hubs tech,</li>
            <li>• une expertise locale forte,</li>
            <li>• des programmes 100 % personnalisés,</li>
            <li>• une logistique clé en main, fluide et encadrée,</li>
            <li>• un accompagnement humain durant tout le séjour.</li>
          </ul>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <p className="text-gray-700">
            C'est cette combinaison de pédagogie, de terrain et d'immersion qui a fait de Rusker Travel l'un des acteurs de référence 
            des Learning Expeditions à Barcelone.
          </p>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">2. Rusker Events : produire des événements à impact dans un écosystème en pleine accélération</h2>
      
      <p className="text-lg text-gray-700 leading-relaxed">
        Rusker Events est le studio événementiel du groupe. Il conçoit, produit et met en scène des événements professionnels pour 
        des entreprises, des institutions, des écoles ou des organisations internationales.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        Cette branche est née d'un constat simple : Barcelone est devenue une ville d'événements. Les salons internationaux comme le 
        Mobile World Congress ou l'ISE attirent des dizaines de milliers de professionnels. Les entreprises veulent activer leur présence, 
        rassembler leurs équipes, organiser des formats sur mesure ou créer des expériences immersives autour de leurs thématiques.
      </p>

      <div className="bg-purple-50 p-8 rounded-2xl my-8 border-l-4 border-purple-600">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Rusker Events opère une large gamme de formats :</h3>
        <ul className="space-y-2 text-gray-800">
          <li>• événements corporate (séminaires, team buildings, lancements, soirées d'entreprise),</li>
          <li>• conférences et panels thématiques,</li>
          <li>• side-events autour des grands salons technologiques,</li>
          <li>• workshops et expériences interactives,</li>
          <li>• événements publics ou institutionnels,</li>
          <li>• production de sommets d'envergure, dont l'AI Summit Barcelona.</li>
        </ul>
        <p className="text-gray-700 mt-4">
          Chaque événement repose sur une approche intégrée : de la stratégie à la scénographie, du contenu à la technique, de la 
          logistique à l'expérience participant.
        </p>
      </div>

      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl my-8">
        <h4 className="font-bold text-gray-900 mb-3">Pourquoi Rusker Events est unique à Barcelone :</h4>
        <ul className="space-y-2 text-gray-700 text-sm">
          <li>• une connaissance fine des lieux, partenaires et ressources locales,</li>
          <li>• une capacité à produire des événements à la fois créatifs et très structurés,</li>
          <li>• une expertise dans les événements tech et innovation,</li>
          <li>• une vraie sensibilité au contenu et à la qualité des intervenants,</li>
          <li>• un ancrage dans la communauté French Tech, internationale et locale.</li>
        </ul>
        <p className="text-gray-700 mt-3 text-sm">
          Rusker Events ne se contente pas d'organiser des événements : elle les façonne, les contextualise et les connecte à l'écosystème barcelonais.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">3. Rusker Network : connecter talents, écoles et entreprises au cœur de l'écosystème tech barcelonais</h2>
      
      <p className="text-lg text-gray-700 leading-relaxed">
        Rusker Network est l'infrastructure relationnelle qui soutient et amplifie les deux autres branches. Elle regroupe tout ce qui 
        concerne l'écosystème, les partenariats, la communauté et le recrutement.
      </p>

      <div className="bg-green-50 p-8 rounded-2xl my-8 border-l-4 border-green-600">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Rusker Network intervient sur trois axes :</h3>
        
        <div className="space-y-6 mt-6">
          <div>
            <h4 className="font-bold text-gray-900 mb-2">1. La dynamique écosystème</h4>
            <p className="text-gray-700 mb-2">
              Rusker travaille étroitement avec la French Tech Barcelona, les hubs locaux, les clusters d'innovation, les scale-ups 
              et les acteurs publics. Ce lien constant permet :
            </p>
            <ul className="space-y-1 ml-6 text-gray-700 text-sm">
              <li>• d'organiser des rencontres de haut niveau,</li>
              <li>• de créer des passerelles entre acteurs,</li>
              <li>• de rendre Barcelone plus accessible pour les écoles et les entreprises qui viennent l'explorer.</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-2">2. Les initiatives communautaires</h4>
            <p className="text-gray-700">
              Rusker Network anime une communauté internationale de partenaires, intervenants, entreprises et alumni des Learning Expeditions. 
              Cela se traduit par des afterworks, panels, meetups, talks, soirées thématiques, collaborations et projets communs.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-2">3. Le TalentBoard Barcelona</h4>
            <p className="text-gray-700 mb-2">
              Le TalentBoard est une initiative pensée pour résoudre une tension réelle : les entreprises de Barcelone ont besoin de talents, 
              et les étudiants/jeunes diplômés ont besoin d'accéder à ces entreprises plus facilement.
            </p>
            <p className="text-gray-700 text-sm">
              Le TalentBoard permet aux talents de créer leur profil et être visibles, aux entreprises de sourcer de manière proactive 
              ("outbound RH"), et à l'écosystème d'accélérer les mises en relation. C'est un outil moderne, agile, pensé pour un marché en mouvement.
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">4. Pourquoi une architecture 360° ?</h2>

      <p className="text-lg text-gray-700 leading-relaxed">
        Les trois branches – Travel, Events, Network – ne fonctionnent pas séparément. Elles s'alimentent mutuellement, renforcent la valeur 
        des programmes et permettent une cohérence que peu d'acteurs peuvent offrir.
      </p>

      <div className="grid md:grid-cols-3 gap-6 my-8">
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
          <h4 className="font-bold text-gray-900 mb-3">Rusker Travel</h4>
          <p className="text-gray-700 text-sm">
            s'appuie sur Rusker Network pour créer des rencontres de haut niveau, trouver les bons intervenants, accéder aux entreprises.
          </p>
        </div>
        <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
          <h4 className="font-bold text-gray-900 mb-3">Rusker Events</h4>
          <p className="text-gray-700 text-sm">
            crée de la visibilité, attire de nouveaux partenaires et renforce notre rôle dans l'écosystème local.
          </p>
        </div>
        <div className="bg-green-50 p-6 rounded-xl border border-green-200">
          <h4 className="font-bold text-gray-900 mb-3">Rusker Network</h4>
          <p className="text-gray-700 text-sm">
            transforme ces relations en collaborations durables, en projets, en opportunités pour écoles, entreprises et talents.
          </p>
        </div>
      </div>

      <div className="bg-neutral-dark text-white p-8 rounded-2xl my-8">
        <p className="text-xl font-semibold mb-2">C'est cet effet circulaire – inspirer, connecter, rassembler – qui fait de Rusker une agence réellement 360°.</p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Conclusion : trois piliers, un ADN unique</h2>

      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-2xl my-8 border-l-4 border-neutral-dark">
        <p className="text-lg text-gray-900 leading-relaxed">
          Rusker n'est pas seulement une agence de voyages, d'événements ou de networking. C'est une structure intégrée qui relie des 
          mondes qui se croisent rarement : les écoles, les entreprises, les talents, les hubs tech, les institutions et les communautés 
          internationales qui font battre Barcelone.
        </p>
        <p className="text-lg text-gray-800 mt-4">
          Avec Rusker Travel, Rusker Events et Rusker Network, notre vision est simple : transformer chaque présence à Barcelone en 
          expérience humaine, professionnelle et inspirante.
        </p>
      </div>

      <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-200">
        <p className="text-sm font-semibold text-blue-900 mb-2">📚 Articles connexes</p>
        <ul className="space-y-2 text-sm">
          <li>
            <Link href="/blog/learning-expedition-definition" className="text-blue-700 hover:text-blue-900 underline">
              → Tout savoir sur les Learning Expeditions
            </Link>
          </li>
          <li>
            <Link href="/blog/french-tech-barcelona-ecosystem" className="text-blue-700 hover:text-blue-900 underline">
              → Comment French Tech Barcelona & TalentBoard renforcent Rusker Network
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

function Rusker360ArticleEn() {
  return (
    <div className="space-y-8">
      <p className="text-lg text-gray-700 leading-relaxed">
        Barcelona attracts thousands of students, talents, companies and leadership teams every year seeking 
        inspiration, training, innovation and professional encounters. To meet this multifaceted demand, 
        Rusker has developed a unique approach in Europe: an agency structured around three complementary expertises, 
        transforming the city into a field of experiences, events and connections.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        These three pillars – Rusker Travel, Rusker Events and Rusker Network – now form a coherent and integrated whole, 
        capable of supporting schools, companies and institutions globally.
      </p>

      <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-green-50 p-8 rounded-2xl my-8 border-l-4 border-neutral-dark">
        <p className="text-lg text-gray-900 font-semibold mb-2">This article presents this 360° architecture and the logic behind it.</p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">1. Rusker Travel: Learning Expeditions and Immersive Trips Designed to Learn Differently</h2>
      
      <p className="text-lg text-gray-700 leading-relaxed">
        Rusker Travel is the historical heart of the brand. The mission is simple: transform every trip to Barcelona into a 
        real learning experience, based on immersion, meeting and understanding the local ecosystem.
      </p>

      <div className="bg-blue-50 p-8 rounded-2xl my-8 border-l-4 border-blue-600">
        <h3 className="text-xl font-bold text-gray-900 mb-4">What Rusker Travel Designs and Operates:</h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <span className="text-blue-600 mt-1">→</span>
            <span className="text-gray-800"><strong>Learning Expeditions</strong> for schools, universities, Masters and MBAs.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-600 mt-1">→</span>
            <span className="text-gray-800"><strong>Corporate seminars and offsites</strong> for ExCos and teams.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-600 mt-1">→</span>
            <span className="text-gray-800"><strong>Thematic study trips</strong> (tech, innovation, health, mobility, entrepreneurship, retail, AI, etc.).</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-600 mt-1">→</span>
            <span className="text-gray-800"><strong>Hybrid programs</strong> combining pedagogy, company visits, workshops and cultural discoveries.</span>
          </li>
        </ul>
      </div>

      <p className="text-lg text-gray-700 leading-relaxed">
        The approach is based on a strong conviction: we learn better by meeting, observing, exchanging and feeling. 
        Barcelona then becomes a living campus, an innovation laboratory, a playground to understand the transformations 
        crossing Europe.
      </p>

      <div className="grid md:grid-cols-2 gap-6 my-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h4 className="font-bold text-gray-900 mb-3">What Distinguishes Rusker Travel:</h4>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li>• direct access to startups, scale-ups, institutions and tech hubs,</li>
            <li>• strong local expertise,</li>
            <li>• 100% personalized programs,</li>
            <li>• turnkey logistics, fluid and supervised,</li>
            <li>• human support throughout the stay.</li>
          </ul>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <p className="text-gray-700">
            It is this combination of pedagogy, field and immersion that has made Rusker Travel one of the reference players 
            for Learning Expeditions in Barcelona.
          </p>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">2. Rusker Events: Producing Impactful Events in an Accelerating Ecosystem</h2>
      
      <p className="text-lg text-gray-700 leading-relaxed">
        Rusker Events is the group's event studio. It designs, produces and stages professional events for 
        companies, institutions, schools or international organizations.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        This branch was born from a simple observation: Barcelona has become a city of events. International trade shows like 
        Mobile World Congress or ISE attract tens of thousands of professionals. Companies want to activate their presence, 
        gather their teams, organize custom formats or create immersive experiences around their themes.
      </p>

      <div className="bg-purple-50 p-8 rounded-2xl my-8 border-l-4 border-purple-600">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Rusker Events Operates a Wide Range of Formats:</h3>
        <ul className="space-y-2 text-gray-800">
          <li>• corporate events (seminars, team buildings, launches, corporate evenings),</li>
          <li>• thematic conferences and panels,</li>
          <li>• side-events around major technology shows,</li>
          <li>• workshops and interactive experiences,</li>
          <li>• public or institutional events,</li>
          <li>• production of major summits, including the AI Summit Barcelona.</li>
        </ul>
        <p className="text-gray-700 mt-4">
          Each event is based on an integrated approach: from strategy to scenography, from content to technology, from 
          logistics to participant experience.
        </p>
      </div>

      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl my-8">
        <h4 className="font-bold text-gray-900 mb-3">Why Rusker Events is Unique in Barcelona:</h4>
        <ul className="space-y-2 text-gray-700 text-sm">
          <li>• fine knowledge of local venues, partners and resources,</li>
          <li>• ability to produce events that are both creative and highly structured,</li>
          <li>• expertise in tech and innovation events,</li>
          <li>• real sensitivity to content and quality of speakers,</li>
          <li>• anchoring in the French Tech, international and local community.</li>
        </ul>
        <p className="text-gray-700 mt-3 text-sm">
          Rusker Events does not just organize events: it shapes them, contextualizes them and connects them to the Barcelona ecosystem.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">3. Rusker Network: Connecting Talents, Schools and Companies at the Heart of the Barcelona Tech Ecosystem</h2>
      
      <p className="text-lg text-gray-700 leading-relaxed">
        Rusker Network is the relational infrastructure that supports and amplifies the other two branches. It brings together everything 
        related to the ecosystem, partnerships, community and recruitment.
      </p>

      <div className="bg-green-50 p-8 rounded-2xl my-8 border-l-4 border-green-600">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Rusker Network Intervenes on Three Axes:</h3>
        
        <div className="space-y-6 mt-6">
          <div>
            <h4 className="font-bold text-gray-900 mb-2">1. The Ecosystem Dynamic</h4>
            <p className="text-gray-700 mb-2">
              Rusker works closely with French Tech Barcelona, local hubs, innovation clusters, scale-ups 
              and public actors. This constant link allows:
            </p>
            <ul className="space-y-1 ml-6 text-gray-700 text-sm">
              <li>• organizing high-level meetings,</li>
              <li>• creating bridges between actors,</li>
              <li>• making Barcelona more accessible for schools and companies coming to explore it.</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-2">2. Community Initiatives</h4>
            <p className="text-gray-700">
              Rusker Network animates an international community of partners, speakers, companies and Learning Expeditions alumni. 
              This translates into afterworks, panels, meetups, talks, thematic evenings, collaborations and joint projects.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-2">3. The TalentBoard Barcelona</h4>
            <p className="text-gray-700 mb-2">
              TalentBoard is an initiative designed to solve a real tension: Barcelona companies need talent, 
              and students/young graduates need to access these companies more easily.
            </p>
            <p className="text-gray-700 text-sm">
              TalentBoard allows talents to create their profile and be visible, companies to source proactively 
              ("outbound HR"), and the ecosystem to accelerate connections. It is a modern, agile tool, designed for a moving market.
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">4. Why a 360° Architecture?</h2>

      <p className="text-lg text-gray-700 leading-relaxed">
        The three branches – Travel, Events, Network – do not work separately. They feed each other, reinforce the value of 
        programs and allow a coherence that few players can offer.
      </p>

      <div className="grid md:grid-cols-3 gap-6 my-8">
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
          <h4 className="font-bold text-gray-900 mb-3">Rusker Travel</h4>
          <p className="text-gray-700 text-sm">
            relies on Rusker Network to create high-level meetings, find the right speakers, access companies.
          </p>
        </div>
        <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
          <h4 className="font-bold text-gray-900 mb-3">Rusker Events</h4>
          <p className="text-gray-700 text-sm">
            creates visibility, attracts new partners and strengthens our role in the local ecosystem.
          </p>
        </div>
        <div className="bg-green-50 p-6 rounded-xl border border-green-200">
          <h4 className="font-bold text-gray-900 mb-3">Rusker Network</h4>
          <p className="text-gray-700 text-sm">
            transforms these relationships into lasting collaborations, projects, opportunities for schools, companies and talents.
          </p>
        </div>
      </div>

      <div className="bg-neutral-dark text-white p-8 rounded-2xl my-8">
        <p className="text-xl font-semibold mb-2">It is this circular effect – inspiring, connecting, gathering – that makes Rusker a truly 360° agency.</p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Conclusion: Three Pillars, a Unique DNA</h2>

      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-2xl my-8 border-l-4 border-neutral-dark">
        <p className="text-lg text-gray-900 leading-relaxed">
          Rusker is not just a travel, event or networking agency. It is an integrated structure that connects worlds that 
          rarely cross paths: schools, companies, talents, tech hubs, institutions and international communities that make Barcelona beat.
        </p>
        <p className="text-lg text-gray-800 mt-4">
          With Rusker Travel, Rusker Events and Rusker Network, our vision is simple: transform every presence in Barcelona into a 
          human, professional and inspiring experience.
        </p>
      </div>

      <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-200">
        <p className="text-sm font-semibold text-blue-900 mb-2">📚 Related Articles</p>
        <ul className="space-y-2 text-sm">
          <li>
            <Link href="/blog/learning-expedition-definition" className="text-blue-700 hover:text-blue-900 underline">
              → Everything about Learning Expeditions
            </Link>
          </li>
          <li>
            <Link href="/blog/french-tech-barcelona-ecosystem" className="text-blue-700 hover:text-blue-900 underline">
              → How French Tech Barcelona & TalentBoard reinforce Rusker Network
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

function Rusker360ArticleEs() {
  return (
    <div className="space-y-8">
      <p className="text-lg text-gray-700 leading-relaxed">
        Barcelona atrae cada año a miles de estudiantes, talentos, empresas y equipos directivos en busca de 
        inspiración, formación, innovación y encuentros profesionales. Para responder a estas múltiples necesidades, 
        Rusker ha desarrollado un enfoque único en Europa: una agencia estructurada en torno a tres expertises complementarias, 
        que transforman la ciudad en un terreno de experiencias, eventos y conexiones.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        Estos tres pilares – Rusker Travel, Rusker Events y Rusker Network – forman hoy un conjunto coherente e integrado, 
        capaz de acompañar a escuelas, empresas e instituciones de manera global.
      </p>

      <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-green-50 p-8 rounded-2xl my-8 border-l-4 border-neutral-dark">
        <p className="text-lg text-gray-900 font-semibold mb-2">Este artículo presenta esta arquitectura 360° y la lógica que la sustenta.</p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">1. Rusker Travel: Learning Expeditions y viajes inmersivos diseñados para aprender de otra manera</h2>
      
      <p className="text-lg text-gray-700 leading-relaxed">
        Rusker Travel es el corazón histórico de la marca. La misión es simple: transformar cada viaje a Barcelona en una 
        experiencia de aprendizaje real, basada en la inmersión, el encuentro y la comprensión del ecosistema local.
      </p>

      <div className="bg-blue-50 p-8 rounded-2xl my-8 border-l-4 border-blue-600">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Lo que Rusker Travel diseña y opera:</h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <span className="text-blue-600 mt-1">→</span>
            <span className="text-gray-800"><strong>Learning Expeditions</strong> para escuelas, universidades, Másters y MBA.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-600 mt-1">→</span>
            <span className="text-gray-800"><strong>Seminarios corporativos y offsites</strong> para Comités Ejecutivos y equipos.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-600 mt-1">→</span>
            <span className="text-gray-800"><strong>Viajes de estudio temáticos</strong> (tech, innovación, salud, movilidad, emprendimiento, retail, IA, etc.).</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-600 mt-1">→</span>
            <span className="text-gray-800"><strong>Programas híbridos</strong> que combinan pedagogía, visitas a empresas, talleres y descubrimientos culturales.</span>
          </li>
        </ul>
      </div>

      <p className="text-lg text-gray-700 leading-relaxed">
        El enfoque se basa en una fuerte convicción: se aprende mejor encontrando, observando, intercambiando y sintiendo. 
        Barcelona se convierte entonces en un campus vivo, un laboratorio de innovación, un terreno de juego para comprender las transformaciones 
        que atraviesan Europa.
      </p>

      <div className="grid md:grid-cols-2 gap-6 my-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h4 className="font-bold text-gray-900 mb-3">Lo que distingue a Rusker Travel:</h4>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li>• acceso directo a startups, scale-ups, instituciones y hubs tecnológicos,</li>
            <li>• fuerte experiencia local,</li>
            <li>• programas 100 % personalizados,</li>
            <li>• logística llave en mano, fluida y supervisada,</li>
            <li>• acompañamiento humano durante toda la estancia.</li>
          </ul>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <p className="text-gray-700">
            Es esta combinación de pedagogía, terreno e inmersión la que ha hecho de Rusker Travel uno de los actores de referencia 
            de las Learning Expeditions en Barcelona.
          </p>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">2. Rusker Events: producir eventos con impacto en un ecosistema en plena aceleración</h2>
      
      <p className="text-lg text-gray-700 leading-relaxed">
        Rusker Events es el estudio de eventos del grupo. Diseña, produce y escenifica eventos profesionales para 
        empresas, instituciones, escuelas u organizaciones internacionales.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        Esta rama nació de una constatación simple: Barcelona se ha convertido en una ciudad de eventos. Los salones internacionales como el 
        Mobile World Congress o el ISE atraen a decenas de miles de profesionales. Las empresas quieren activar su presencia, 
        reunir a sus equipos, organizar formatos a medida o crear experiencias inmersivas en torno a sus temáticas.
      </p>

      <div className="bg-purple-50 p-8 rounded-2xl my-8 border-l-4 border-purple-600">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Rusker Events opera una amplia gama de formatos:</h3>
        <ul className="space-y-2 text-gray-800">
          <li>• eventos corporativos (seminarios, team buildings, lanzamientos, veladas de empresa),</li>
          <li>• conferencias y paneles temáticos,</li>
          <li>• side-events en torno a los grandes salones tecnológicos,</li>
          <li>• talleres y experiencias interactivas,</li>
          <li>• eventos públicos o institucionales,</li>
          <li>• producción de cumbres de envergadura, incluido el AI Summit Barcelona.</li>
        </ul>
        <p className="text-gray-700 mt-4">
          Cada evento se basa en un enfoque integrado: de la estrategia a la escenografía, del contenido a la técnica, de la 
          logística a la experiencia del participante.
        </p>
      </div>

      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl my-8">
        <h4 className="font-bold text-gray-900 mb-3">Por qué Rusker Events es único en Barcelona:</h4>
        <ul className="space-y-2 text-gray-700 text-sm">
          <li>• conocimiento fino de los lugares, socios y recursos locales,</li>
          <li>• capacidad para producir eventos a la vez creativos y muy estructurados,</li>
          <li>• experiencia en eventos tech e innovación,</li>
          <li>• sensibilidad real al contenido y a la calidad de los ponentes,</li>
          <li>• anclaje en la comunidad French Tech, internacional y local.</li>
        </ul>
        <p className="text-gray-700 mt-3 text-sm">
          Rusker Events no se conforma con organizar eventos: los moldea, los contextualiza y los conecta con el ecosistema barcelonés.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">3. Rusker Network: conectar talentos, escuelas y empresas en el corazón del ecosistema tecnológico barcelonés</h2>
      
      <p className="text-lg text-gray-700 leading-relaxed">
        Rusker Network es la infraestructura relacional que sostiene y amplifica las otras dos ramas. Reúne todo lo relacionado con el 
        ecosistema, las asociaciones, la comunidad y el reclutamiento.
      </p>

      <div className="bg-green-50 p-8 rounded-2xl my-8 border-l-4 border-green-600">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Rusker Network interviene en tres ejes:</h3>
        
        <div className="space-y-6 mt-6">
          <div>
            <h4 className="font-bold text-gray-900 mb-2">1. La dinámica del ecosistema</h4>
            <p className="text-gray-700 mb-2">
              Rusker trabaja estrechamente con la French Tech Barcelona, los hubs locales, los clústeres de innovación, las scale-ups 
              y los actores públicos. Este vínculo constante permite:
            </p>
            <ul className="space-y-1 ml-6 text-gray-700 text-sm">
              <li>• organizar encuentros de alto nivel,</li>
              <li>• crear puentes entre actores,</li>
              <li>• hacer Barcelona más accesible para las escuelas y las empresas que vienen a explorarla.</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-2">2. Las iniciativas comunitarias</h4>
            <p className="text-gray-700">
              Rusker Network anima una comunidad internacional de socios, ponentes, empresas y alumni de las Learning Expeditions. 
              Esto se traduce en afterworks, paneles, meetups, charlas, veladas temáticas, colaboraciones y proyectos conjuntos.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-2">3. El TalentBoard Barcelona</h4>
            <p className="text-gray-700 mb-2">
              TalentBoard es una iniciativa pensada para resolver una tensión real: las empresas de Barcelona necesitan talentos, 
              y los estudiantes/jóvenes graduados necesitan acceder a estas empresas más fácilmente.
            </p>
            <p className="text-gray-700 text-sm">
              TalentBoard permite a los talentos crear su perfil y ser visibles, a las empresas buscar de manera proactiva 
              ("outbound RH"), y al ecosistema acelerar las conexiones. Es una herramienta moderna, ágil, pensada para un mercado en movimiento.
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">4. ¿Por qué una arquitectura 360°?</h2>

      <p className="text-lg text-gray-700 leading-relaxed">
        Las tres ramas – Travel, Events, Network – no funcionan por separado. Se alimentan mutuamente, refuerzan el valor de los 
        programas y permiten una coherencia que pocos actores pueden ofrecer.
      </p>

      <div className="grid md:grid-cols-3 gap-6 my-8">
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
          <h4 className="font-bold text-gray-900 mb-3">Rusker Travel</h4>
          <p className="text-gray-700 text-sm">
            se apoya en Rusker Network para crear encuentros de alto nivel, encontrar los ponentes adecuados, acceder a las empresas.
          </p>
        </div>
        <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
          <h4 className="font-bold text-gray-900 mb-3">Rusker Events</h4>
          <p className="text-gray-700 text-sm">
            crea visibilidad, atrae nuevos socios y refuerza nuestro papel en el ecosistema local.
          </p>
        </div>
        <div className="bg-green-50 p-6 rounded-xl border border-green-200">
          <h4 className="font-bold text-gray-900 mb-3">Rusker Network</h4>
          <p className="text-gray-700 text-sm">
            transforma estas relaciones en colaboraciones duraderas, proyectos, oportunidades para escuelas, empresas y talentos.
          </p>
        </div>
      </div>

      <div className="bg-neutral-dark text-white p-8 rounded-2xl my-8">
        <p className="text-xl font-semibold mb-2">Es este efecto circular – inspirar, conectar, reunir – lo que hace de Rusker una agencia realmente 360°.</p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Conclusión: tres pilares, un ADN único</h2>

      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-2xl my-8 border-l-4 border-neutral-dark">
        <p className="text-lg text-gray-900 leading-relaxed">
          Rusker no es solo una agencia de viajes, de eventos o de networking. Es una estructura integrada que conecta mundos que 
          rara vez se cruzan: escuelas, empresas, talentos, hubs tecnológicos, instituciones y comunidades internacionales que hacen latir a Barcelona.
        </p>
        <p className="text-lg text-gray-800 mt-4">
          Con Rusker Travel, Rusker Events y Rusker Network, nuestra visión es simple: transformar cada presencia en Barcelona en una 
          experiencia humana, profesional e inspiradora.
        </p>
      </div>

      <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-200">
        <p className="text-sm font-semibold text-blue-900 mb-2">📚 Artículos relacionados</p>
        <ul className="space-y-2 text-sm">
          <li>
            <Link href="/blog/learning-expedition-definition" className="text-blue-700 hover:text-blue-900 underline">
              → Todo sobre las Learning Expeditions
            </Link>
          </li>
          <li>
            <Link href="/blog/french-tech-barcelona-ecosystem" className="text-blue-700 hover:text-blue-900 underline">
              → Cómo French Tech Barcelona y TalentBoard refuerzan Rusker Network
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

