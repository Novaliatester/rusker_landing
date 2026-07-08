'use client'

import { useI18n } from '@/lib/i18n'
import Link from 'next/link'

export default function LexintownTransformationArticle() {
  const { locale } = useI18n()

  if (locale === 'en') {
    return <LexintownTransformationArticleEn />
  } else if (locale === 'es') {
    return <LexintownTransformationArticleEs />
  }
  
  return <LexintownTransformationArticleFr />
}

function LexintownTransformationArticleFr() {
  return (
    <div className="space-y-8">
      <p className="text-lg text-gray-700 leading-relaxed">
        Les marques ne se transforment pas du jour au lendemain. Elles évoluent avec leur marché, leur public, leur mission, 
        et parfois à travers des événements qui accélèrent les choses.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        C'est exactement ce qui s'est produit entre Rusker et Lexintown.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        À l'origine, ces deux marques avaient été pensées pour répondre à deux besoins différents. Rusker pour les voyages 
        étudiants et les premières Learning Expeditions. Lexintown pour les formats corporate et les entreprises en quête 
        d'immersion professionnelle à Barcelone.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        Pendant un temps, cette distinction fonctionnait. Et puis l'écosystème a changé. Les besoins se sont élargis. Les formats 
        se sont professionnalisés. Et surtout, un événement a tout accéléré : l'AI Summit Barcelona.
      </p>

      <div className="bg-amber-50 border-l-4 border-amber-600 p-6 my-8 rounded-r-xl">
        <p className="text-lg text-gray-900">
          C'est cette histoire que raconte cet article.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">1. Deux marques nées de deux intentions différentes</h2>
      
      <p className="text-lg text-gray-700 leading-relaxed">
        Lorsque Rusker se développe, l'activité repose sur des voyages immersifs pour étudiants :
      </p>

      <ul className="space-y-2 ml-6 my-6">
        <li className="text-lg text-gray-700">• city trips éducatifs</li>
        <li className="text-lg text-gray-700">• découvertes culturelles</li>
        <li className="text-lg text-gray-700">• rencontres locales</li>
        <li className="text-lg text-gray-700">• premières Learning Experiences structurées</li>
      </ul>

      <p className="text-lg text-gray-700 leading-relaxed">
        L'objectif : faire découvrir Barcelone autrement.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        Puis l'envie d'adresser les entreprises arrive. Rassembler des équipes, organiser des séminaires, créer des Learning 
        Expeditions professionnelles. Pour incarner cette dimension plus corporate, Lexintown voit le jour.
      </p>

      <div className="bg-gray-100 p-6 rounded-xl my-8">
        <p className="text-lg text-gray-800">
          <strong>L'idée était logique :</strong> une marque jeune pour les étudiants, une marque premium pour les entreprises.
        </p>
        <p className="text-gray-600 mt-2">Mais très vite, la réalité devient plus complexe.</p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">2. Quand les frontières commencent à se brouiller</h2>

      <p className="text-lg text-gray-700 leading-relaxed">
        Les premières demandes de Learning Expeditions ne viennent pas seulement des entreprises mais surtout des écoles, 
        universités, Masters et MBA. Ces programmes attendent un niveau de professionnalisme très proche du corporate : visites 
        d'entreprises, speakers de haut niveau, contenu stratégique, ateliers thématiques, networking.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        Et dans le même temps, certains de ces programmes accueillent… des cadres, des professionnels en reconversion, des managers 
        internationaux. Le public n'est plus clairement "étudiant" ou "corporate". Il est hybride.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        Travailler sous deux identités commence alors à créer des zones grises, aussi bien dans la communication que dans la 
        perception extérieure. Ce n'est pas un problème : c'est une transition. Une transition qui va s'accélérer brutalement en 2025.
      </p>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">3. Le tournant : Lexintown organise l'AI Summit Barcelona</h2>

      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-2xl my-8 border-l-4 border-purple-600">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Un projet qui change tout</h3>
        <p className="text-lg text-gray-800 mb-4">
          Au printemps 2025, un nouveau projet prend forme : un sommet dédié à l'intelligence artificielle à Barcelone. Très vite, 
          Lexintown est appelée à structurer, organiser et produire l'événement.
        </p>
        <p className="text-gray-700">
          D'abord imaginé comme un format modeste, l'AI Summit Barcelona devient en quelques mois :
        </p>
        <ul className="space-y-2 mt-4 text-gray-700">
          <li>• un rassemblement de plus de 1 000 participants</li>
          <li>• près de 90 speakers internationaux</li>
          <li>• une AI Week animant toute la ville</li>
          <li>• un événement relayé par les médias</li>
          <li>• un symbole fort de l'écosystème tech barcelonais</li>
        </ul>
      </div>

      <p className="text-lg text-gray-700 leading-relaxed">
        Ce projet marque un avant/après. Lexintown n'était plus seulement une marque pour les Learning Expeditions corporate. 
        Elle était devenue un acteur événementiel majeur capable de produire des conférences, panels, contenus et expériences à 
        l'échelle d'un sommet international.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        Pendant ce temps, Rusker continuait d'opérer des Learning Expeditions d'un niveau de plus en plus élevé pour écoles, MBA, 
        équipes corporate et institutions. Les deux mondes ne s'opposaient plus. Ils convergeaient.
      </p>

      <div className="bg-neutral-dark text-white p-6 rounded-xl my-8">
        <p className="text-lg font-semibold mb-2">Et c'est cette convergence qui révèle l'évidence stratégique.</p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">4. L'évidence s'impose : réunir, simplifier, clarifier</h2>

      <p className="text-lg text-gray-700 leading-relaxed">
        Après l'AI Summit Barcelona, une question s'impose naturellement : Pourquoi maintenir deux identités quand tout pointe vers 
        une seule dynamique cohérente ?
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        Lexintown venait de démontrer sa capacité à produire des événements puissants. Rusker était déjà la marque légitime sur les 
        Learning Expeditions. Les deux univers partageaient les mêmes partenaires, les mêmes lieux, le même écosystème, le même ADN.
      </p>

      <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-8 rounded-r-xl">
        <p className="text-lg text-gray-900">
          La conclusion n'était plus discutable : Il fallait unifier les marques, et donner naissance à <strong>Rusker 360°</strong>.
        </p>
        <p className="text-gray-700 mt-2">
          Pas pour renier l'histoire. Pas pour gommer une marque. Mais pour aligner les activités sur la réalité, et offrir une 
          identité forte, lisible et durable.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">5. 2026 : Rusker devient une agence à trois piliers complémentaires</h2>

      <p className="text-lg text-gray-700 leading-relaxed mb-6">
        À partir de 2026, Rusker se structure officiellement en trois branches distinctes et interconnectées :
      </p>

      <div className="space-y-6 my-8">
        <div className="bg-white p-8 rounded-2xl border-2 border-blue-200 shadow-sm">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">1. Rusker Travel – Les Learning Expeditions</h3>
          <p className="text-gray-700 mb-4">
            La branche dédiée à l'immersion pédagogique et professionnelle. Elle conçoit des Learning Expeditions pour :
          </p>
          <ul className="space-y-2 ml-6 text-gray-700">
            <li>• écoles, universités, MBA</li>
            <li>• entreprises et COMEX</li>
            <li>• programmes internationaux</li>
            <li>• équipes en transformation</li>
          </ul>
          <p className="text-gray-700 mt-4">
            Des programmes mêlant visites d'entreprises, ateliers, rencontres, analyses sectorielles et immersion culturelle.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border-2 border-purple-200 shadow-sm">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">2. Rusker Events – La production événementielle</h3>
          <p className="text-gray-700 mb-4">
            Issue du savoir-faire développé avec Lexintown. Cette branche produit :
          </p>
          <ul className="space-y-2 ml-6 text-gray-700">
            <li>• des conférences, panels et workshops</li>
            <li>• des side-events et activations lors des grands salons</li>
            <li>• des événements corporate sur mesure</li>
            <li>• des sommets comme l'AI Summit Barcelona</li>
          </ul>
          <p className="text-gray-700 mt-4">
            C'est la dimension publique, visible, réunissant les communautés et les acteurs clés.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border-2 border-green-200 shadow-sm">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">3. Rusker Network – Le réseau, les partenariats, les talents</h3>
          <p className="text-gray-700 mb-4">
            La brique relationnelle et communautaire. Elle comprend :
          </p>
          <ul className="space-y-2 ml-6 text-gray-700">
            <li>• les liens avec la French Tech Barcelona</li>
            <li>• la structuration d'un réseau international</li>
            <li>• la coordination avec les entreprises partenaires</li>
            <li>• le TalentBoard Barcelona, qui connecte talents et recruteurs</li>
          </ul>
          <p className="text-gray-700 mt-4">
            Rusker Network est la glue qui relie tout : l'écosystème, les talents, les entreprises et les institutions.
          </p>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Conclusion : une marque unifiée pour une mission élargie</h2>

      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-2xl my-8 border-l-4 border-neutral-dark">
        <p className="text-lg text-gray-900 leading-relaxed">
          Lexintown n'a pas disparu. Elle a évolué. Elle s'est intégrée là où son rôle était le plus fort : dans l'événementiel. 
          Cette évolution a permis à Rusker de devenir une marque unique, cohérente, structurée et adaptée à la réalité du marché.
        </p>
        <p className="text-lg text-gray-800 mt-4">
          À partir de 2026, Rusker entre dans une nouvelle phase : une identité claire, trois expertises, et une ambition assumée : 
          transformer chaque immersion à Barcelone en expérience humaine, professionnelle et inspirante.
        </p>
      </div>

      <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-200">
        <p className="text-sm font-semibold text-blue-900 mb-2">📚 Articles connexes</p>
        <ul className="space-y-2 text-sm">
          <li>
            <Link href="/blog/ai-summit-barcelona-story" className="text-blue-700 hover:text-blue-900 underline">
              → L'histoire complète de l'AI Summit Barcelona qui a tout changé
            </Link>
          </li>
          <li>
            <Link href="/blog/rusker-360-agency" className="text-blue-700 hover:text-blue-900 underline">
              → Découvrez la structure complète de Rusker : Travel, Events, Network
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

function LexintownTransformationArticleEn() {
  return (
    <div className="space-y-8">
      <p className="text-lg text-gray-700 leading-relaxed">
        Brands do not transform overnight. They evolve with their market, their audience, their mission, 
        and sometimes through events that accelerate things.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        This is exactly what happened between Rusker and Lexintown.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        Originally, these two brands were designed to meet two different needs. Rusker for student trips 
        and the first Learning Expeditions. Lexintown for corporate formats and companies seeking 
        professional immersion in Barcelona.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        For a time, this distinction worked. And then the ecosystem changed. Needs broadened. Formats 
        became more professional. And above all, one event accelerated everything: the AI Summit Barcelona.
      </p>

      <div className="bg-amber-50 border-l-4 border-amber-600 p-6 my-8 rounded-r-xl">
        <p className="text-lg text-gray-900">
          This is the story this article tells.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">1. Two Brands Born from Two Different Intentions</h2>
      
      <p className="text-lg text-gray-700 leading-relaxed">
        When Rusker develops, the activity relies on immersive trips for students:
      </p>

      <ul className="space-y-2 ml-6 my-6">
        <li className="text-lg text-gray-700">• educational city trips</li>
        <li className="text-lg text-gray-700">• cultural discoveries</li>
        <li className="text-lg text-gray-700">• local meetings</li>
        <li className="text-lg text-gray-700">• first structured Learning Experiences</li>
      </ul>

      <p className="text-lg text-gray-700 leading-relaxed">
        The goal: discover Barcelona differently.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        Then the desire to address companies arrives. Gathering teams, organizing seminars, creating professional 
        Learning Expeditions. To embody this more corporate dimension, Lexintown is born.
      </p>

      <div className="bg-gray-100 p-6 rounded-xl my-8">
        <p className="text-lg text-gray-800">
          <strong>The idea was logical:</strong> a young brand for students, a premium brand for companies.
        </p>
        <p className="text-gray-600 mt-2">But very quickly, reality becomes more complex.</p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">2. When Boundaries Start to Blur</h2>

      <p className="text-lg text-gray-700 leading-relaxed">
        The first requests for Learning Expeditions come not only from companies but primarily from schools, 
        universities, Masters, and MBAs. These programs expect a level of professionalism very close to corporate: company 
        visits, high-level speakers, strategic content, thematic workshops, networking.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        And at the same time, some of these programs welcome... executives, professionals in career transition, international 
        managers. The audience is no longer clearly "student" or "corporate". It is hybrid.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        Working under two identities then begins to create grey areas, both in communication and in 
        external perception. This is not a problem: it is a transition. A transition that will accelerate brutally in 2025.
      </p>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">3. The Turning Point: Lexintown Organizes AI Summit Barcelona</h2>

      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-2xl my-8 border-l-4 border-purple-600">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">A Project That Changes Everything</h3>
        <p className="text-lg text-gray-800 mb-4">
          In the spring of 2025, a new project takes shape: a summit dedicated to artificial intelligence in Barcelona. Very quickly, 
          Lexintown is called upon to structure, organize, and produce the event.
        </p>
        <p className="text-gray-700">
          First imagined as a modest format, AI Summit Barcelona becomes in a few months:
        </p>
        <ul className="space-y-2 mt-4 text-gray-700">
          <li>• a gathering of over 1,000 participants</li>
          <li>• nearly 90 international speakers</li>
          <li>• an AI Week animating the whole city</li>
          <li>• an event covered by the media</li>
          <li>• a strong symbol of the Barcelona tech ecosystem</li>
        </ul>
      </div>

      <p className="text-lg text-gray-700 leading-relaxed">
        This project marks a before/after. Lexintown was no longer just a brand for corporate Learning Expeditions. 
        It had become a major event player capable of producing conferences, panels, content, and experiences at 
        the scale of an international summit.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        Meanwhile, Rusker continued to operate increasingly high-level Learning Expeditions for schools, MBAs, 
        corporate teams, and institutions. The two worlds no longer opposed each other. They converged.
      </p>

      <div className="bg-neutral-dark text-white p-6 rounded-xl my-8">
        <p className="text-lg font-semibold mb-2">And it is this convergence that reveals the strategic evidence.</p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">4. The Evidence Becomes Clear: Unite, Simplify, Clarify</h2>

      <p className="text-lg text-gray-700 leading-relaxed">
        After AI Summit Barcelona, a question naturally arises: Why maintain two identities when everything points towards 
        a single coherent dynamic?
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        Lexintown had just demonstrated its ability to produce powerful events. Rusker was already the legitimate brand for 
        Learning Expeditions. Both universes shared the same partners, the same venues, the same ecosystem, the same DNA.
      </p>

      <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-8 rounded-r-xl">
        <p className="text-lg text-gray-900">
          The conclusion was no longer debatable: We had to unify the brands, and give birth to <strong>Rusker 360°</strong>.
        </p>
        <p className="text-gray-700 mt-2">
          Not to deny history. Not to erase a brand. But to align activities with reality, and offer a 
          strong, readable, and sustainable identity.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">5. 2026: Rusker Becomes an Agency with Three Complementary Pillars</h2>

      <p className="text-lg text-gray-700 leading-relaxed mb-6">
        From 2026, Rusker officially structures itself into three distinct and interconnected branches:
      </p>

      <div className="space-y-6 my-8">
        <div className="bg-white p-8 rounded-2xl border-2 border-blue-200 shadow-sm">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">1. Rusker Travel – Learning Expeditions</h3>
          <p className="text-gray-700 mb-4">
            The branch dedicated to pedagogical and professional immersion. It designs Learning Expeditions for:
          </p>
          <ul className="space-y-2 ml-6 text-gray-700">
            <li>• schools, universities, MBAs</li>
            <li>• companies and Executive Committees</li>
            <li>• international programs</li>
            <li>• teams in transformation</li>
          </ul>
          <p className="text-gray-700 mt-4">
            Programs combining company visits, workshops, meetings, sector analyses, and cultural immersion.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border-2 border-purple-200 shadow-sm">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">2. Rusker Events – Event Production</h3>
          <p className="text-gray-700 mb-4">
            Stemming from the know-how developed with Lexintown. This branch produces:
          </p>
          <ul className="space-y-2 ml-6 text-gray-700">
            <li>• conferences, panels, and workshops</li>
            <li>• side-events and activations during major trade shows</li>
            <li>• custom corporate events</li>
            <li>• summits like AI Summit Barcelona</li>
          </ul>
          <p className="text-gray-700 mt-4">
            It is the public dimension, visible, bringing together communities and key players.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border-2 border-green-200 shadow-sm">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">3. Rusker Network – Network, Partnerships, Talent</h3>
          <p className="text-gray-700 mb-4">
            The relational and community brick. It includes:
          </p>
          <ul className="space-y-2 ml-6 text-gray-700">
            <li>• links with French Tech Barcelona</li>
            <li>• structuring an international network</li>
            <li>• coordination with partner companies</li>
            <li>• TalentBoard Barcelona, connecting talent and recruiters</li>
          </ul>
          <p className="text-gray-700 mt-4">
            Rusker Network is the glue that binds everything: the ecosystem, talents, companies, and institutions.
          </p>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Conclusion: A Unified Brand for an Expanded Mission</h2>

      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-2xl my-8 border-l-4 border-neutral-dark">
        <p className="text-lg text-gray-900 leading-relaxed">
          Lexintown has not disappeared. It has evolved. It integrated where its role was strongest: in events. 
          This evolution allowed Rusker to become a unique, coherent, structured brand adapted to market reality.
        </p>
        <p className="text-lg text-gray-800 mt-4">
          From 2026, Rusker enters a new phase: a clear identity, three expertises, and an assumed ambition: 
          transform every immersion in Barcelona into a human, professional, and inspiring experience.
        </p>
      </div>

      <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-200">
        <p className="text-sm font-semibold text-blue-900 mb-2">📚 Related Articles</p>
        <ul className="space-y-2 text-sm">
          <li>
            <Link href="/blog/ai-summit-barcelona-story" className="text-blue-700 hover:text-blue-900 underline">
              → The full story of AI Summit Barcelona that changed everything
            </Link>
          </li>
          <li>
            <Link href="/blog/rusker-360-agency" className="text-blue-700 hover:text-blue-900 underline">
              → Discover Rusker's full structure: Travel, Events, Network
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

function LexintownTransformationArticleEs() {
  return (
    <div className="space-y-8">
      <p className="text-lg text-gray-700 leading-relaxed">
        Las marcas no se transforman de la noche a la mañana. Evolucionan con su mercado, su público, su misión, 
        y a veces a través de eventos que aceleran las cosas.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        Esto es exactamente lo que sucedió entre Rusker y Lexintown.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        Originalmente, estas dos marcas habían sido pensadas para responder a dos necesidades diferentes. Rusker para viajes 
        estudiantiles y las primeras Learning Expeditions. Lexintown para formatos corporativos y empresas en busca 
        de inmersión profesional en Barcelona.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        Durante un tiempo, esta distinción funcionó. Y luego el ecosistema cambió. Las necesidades se ampliaron. Los formatos 
        se profesionalizaron. Y sobre todo, un evento aceleró todo: el AI Summit Barcelona.
      </p>

      <div className="bg-amber-50 border-l-4 border-amber-600 p-6 my-8 rounded-r-xl">
        <p className="text-lg text-gray-900">
          Esta es la historia que cuenta este artículo.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">1. Dos marcas nacidas de dos intenciones diferentes</h2>
      
      <p className="text-lg text-gray-700 leading-relaxed">
        Cuando Rusker se desarrolla, la actividad se basa en viajes inmersivos para estudiantes:
      </p>

      <ul className="space-y-2 ml-6 my-6">
        <li className="text-lg text-gray-700">• city trips educativos</li>
        <li className="text-lg text-gray-700">• descubrimientos culturales</li>
        <li className="text-lg text-gray-700">• encuentros locales</li>
        <li className="text-lg text-gray-700">• primeras Learning Experiences estructuradas</li>
      </ul>

      <p className="text-lg text-gray-700 leading-relaxed">
        El objetivo: hacer descubrir Barcelona de otra manera.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        Luego llega el deseo de dirigirse a las empresas. Reunir equipos, organizar seminarios, crear Learning 
        Expeditions profesionales. Para encarnar esta dimensión más corporativa, nace Lexintown.
      </p>

      <div className="bg-gray-100 p-6 rounded-xl my-8">
        <p className="text-lg text-gray-800">
          <strong>La idea era lógica:</strong> una marca joven para estudiantes, una marca premium para empresas.
        </p>
        <p className="text-gray-600 mt-2">Pero muy rápido, la realidad se vuelve más compleja.</p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">2. Cuando las fronteras comienzan a desdibujarse</h2>

      <p className="text-lg text-gray-700 leading-relaxed">
        Las primeras solicitudes de Learning Expeditions no provienen solo de empresas, sino sobre todo de escuelas, 
        universidades, Masters y MBA. Estos programas esperan un nivel de profesionalismo muy cercano al corporativo: visitas 
        a empresas, ponentes de alto nivel, contenido estratégico, talleres temáticos, networking.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        Y al mismo tiempo, algunos de estos programas acogen... a ejecutivos, profesionales en reconversión, managers 
        internacionales. El público ya no es claramente "estudiante" o "corporativo". Es híbrido.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        Trabajar bajo dos identidades comienza entonces a crear zonas grises, tanto en la comunicación como en la 
        percepción exterior. No es un problema: es una transición. Una transición que se acelerará brutalmente en 2025.
      </p>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">3. El punto de inflexión: Lexintown organiza el AI Summit Barcelona</h2>

      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-2xl my-8 border-l-4 border-purple-600">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Un proyecto que lo cambia todo</h3>
        <p className="text-lg text-gray-800 mb-4">
          En la primavera de 2025, toma forma un nuevo proyecto: una cumbre dedicada a la inteligencia artificial en Barcelona. Muy rápido, 
          Lexintown es llamada a estructurar, organizar y producir el evento.
        </p>
        <p className="text-gray-700">
          Primero imaginado como un formato modesto, el AI Summit Barcelona se convierte en pocos meses en:
        </p>
        <ul className="space-y-2 mt-4 text-gray-700">
          <li>• una reunión de más de 1.000 participantes</li>
          <li>• cerca de 90 ponentes internacionales</li>
          <li>• una AI Week animando toda la ciudad</li>
          <li>• un evento cubierto por los medios</li>
          <li>• un símbolo fuerte del ecosistema tecnológico barcelonés</li>
        </ul>
      </div>

      <p className="text-lg text-gray-700 leading-relaxed">
        Este proyecto marca un antes y un después. Lexintown ya no era solo una marca para Learning Expeditions corporativas. 
        Se había convertido en un actor de eventos importante capaz de producir conferencias, paneles, contenidos y experiencias a 
        la escala de una cumbre internacional.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        Mientras tanto, Rusker continuaba operando Learning Expeditions de un nivel cada vez más alto para escuelas, MBA, 
        equipos corporativos e instituciones. Los dos mundos ya no se oponían. Convergían.
      </p>

      <div className="bg-neutral-dark text-white p-6 rounded-xl my-8">
        <p className="text-lg font-semibold mb-2">Y es esta convergencia la que revela la evidencia estratégica.</p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">4. La evidencia se impone: reunir, simplificar, aclarar</h2>

      <p className="text-lg text-gray-700 leading-relaxed">
        Después del AI Summit Barcelona, se impone naturalmente una pregunta: ¿Por qué mantener dos identidades cuando todo apunta hacia 
        una sola dinámica coherente?
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        Lexintown acababa de demostrar su capacidad para producir eventos poderosos. Rusker ya era la marca legítima en las 
        Learning Expeditions. Los dos universos compartían los mismos socios, los mismos lugares, el mismo ecosistema, el mismo ADN.
      </p>

      <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-8 rounded-r-xl">
        <p className="text-lg text-gray-900">
          La conclusión ya no era discutible: Había que unificar las marcas y dar nacimiento a <strong>Rusker 360°</strong>.
        </p>
        <p className="text-gray-700 mt-2">
          No para renegar de la historia. No para borrar una marca. Sino para alinear las actividades con la realidad y ofrecer una 
          identidad fuerte, legible y duradera.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">5. 2026: Rusker se convierte en una agencia con tres pilares complementarios</h2>

      <p className="text-lg text-gray-700 leading-relaxed mb-6">
        A partir de 2026, Rusker se estructura oficialmente en tres ramas distintas e interconectadas:
      </p>

      <div className="space-y-6 my-8">
        <div className="bg-white p-8 rounded-2xl border-2 border-blue-200 shadow-sm">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">1. Rusker Travel – Las Learning Expeditions</h3>
          <p className="text-gray-700 mb-4">
            La rama dedicada a la inmersión pedagógica y profesional. Diseña Learning Expeditions para:
          </p>
          <ul className="space-y-2 ml-6 text-gray-700">
            <li>• escuelas, universidades, MBA</li>
            <li>• empresas y COMEX</li>
            <li>• programas internacionales</li>
            <li>• equipos en transformación</li>
          </ul>
          <p className="text-gray-700 mt-4">
            Programas que mezclan visitas a empresas, talleres, encuentros, análisis sectoriales e inmersión cultural.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border-2 border-purple-200 shadow-sm">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">2. Rusker Events – La producción de eventos</h3>
          <p className="text-gray-700 mb-4">
            Surgida del saber hacer desarrollado con Lexintown. Esta rama produce:
          </p>
          <ul className="space-y-2 ml-6 text-gray-700">
            <li>• conferencias, paneles y talleres</li>
            <li>• side-events y activaciones durante las grandes ferias</li>
            <li>• eventos corporativos a medida</li>
            <li>• cumbres como el AI Summit Barcelona</li>
          </ul>
          <p className="text-gray-700 mt-4">
            Es la dimensión pública, visible, que reúne a las comunidades y los actores clave.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border-2 border-green-200 shadow-sm">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">3. Rusker Network – La red, las alianzas, los talentos</h3>
          <p className="text-gray-700 mb-4">
            El ladrillo relacional y comunitario. Incluye:
          </p>
          <ul className="space-y-2 ml-6 text-gray-700">
            <li>• los vínculos con la French Tech Barcelona</li>
            <li>• la estructuración de una red internacional</li>
            <li>• la coordinación con las empresas socias</li>
            <li>• el TalentBoard Barcelona, que conecta talentos y reclutadores</li>
          </ul>
          <p className="text-gray-700 mt-4">
            Rusker Network es el pegamento que une todo: el ecosistema, los talentos, las empresas y las instituciones.
          </p>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Conclusión: una marca unificada para una misión ampliada</h2>

      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-2xl my-8 border-l-4 border-neutral-dark">
        <p className="text-lg text-gray-900 leading-relaxed">
          Lexintown no ha desaparecido. Ha evolucionado. Se ha integrado donde su papel era más fuerte: en los eventos. 
          Esta evolución ha permitido a Rusker convertirse en una marca única, coherente, estructurada y adaptada a la realidad del mercado.
        </p>
        <p className="text-lg text-gray-800 mt-4">
          A partir de 2026, Rusker entra en una nueva fase: una identidad clara, tres experiencias y una ambición asumida: 
          transformar cada inmersión en Barcelona en experiencia humana, profesional e inspiradora.
        </p>
      </div>

      <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-200">
        <p className="text-sm font-semibold text-blue-900 mb-2">📚 Artículos relacionados</p>
        <ul className="space-y-2 text-sm">
          <li>
            <Link href="/blog/ai-summit-barcelona-story" className="text-blue-700 hover:text-blue-900 underline">
              → La historia completa del AI Summit Barcelona que lo cambió todo
            </Link>
          </li>
          <li>
            <Link href="/blog/rusker-360-agency" className="text-blue-700 hover:text-blue-900 underline">
              → Descubre la estructura completa de Rusker: Travel, Events, Network
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

