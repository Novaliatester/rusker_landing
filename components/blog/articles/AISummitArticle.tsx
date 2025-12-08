'use client'

import { useI18n } from '@/lib/i18n'
import Link from 'next/link'

export default function AISummitArticle() {
  const { locale } = useI18n()

  if (locale === 'en') {
    return <AISummitArticleEn />
  } else if (locale === 'es') {
    return <AISummitArticleEs />
  }
  
  return <AISummitArticleFr />
}

function AISummitArticleFr() {
  return (
    <div className="space-y-8">
      <p className="text-lg text-gray-700 leading-relaxed">
        L'AI Summit Barcelona n'a pas commencé comme un grand salon international. Il n'avait pas d'équipe dédiée, 
        peu de ressources, presque aucun programme structuré, et seulement une poignée de tickets vendus.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        Pourtant, en quelques mois, ce projet encore flou est devenu un événement majeur réunissant plus de mille 
        participants, près d'une centaine de speakers et une énergie rarement égalée dans l'écosystème IA européen.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        Voici l'histoire de cette transformation, et ce qu'elle dit sur la manière de construire un événement à très fort impact.
      </p>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">1. Une idée née en mars 2025 : l'intuition avant l'infrastructure</h2>
      
      <p className="text-lg text-gray-700 leading-relaxed">
        L'initiative vient de Jérémie Benhamou, fondateur de The Tech Nation, qui imagine début 2025 un rendez-vous IA à 
        Barcelone, juste après le Mobile World Congress. L'idée séduit rapidement des acteurs institutionnels. La Chambre 
        de Commerce et la French Tech Barcelona rejoignent le projet, convaincues du potentiel d'un événement de ce type.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        En juin, <strong>Rusker est appelé à rejoindre l'aventure</strong>. À ce moment-là, l'événement existe surtout comme 
        une promesse : un site minimaliste, six speakers amis des fondateurs, environ vingt tickets vendus, et une ambition 
        encore très floue.
      </p>

      <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-8 rounded-r-xl">
        <p className="text-lg text-gray-900">
          C'est le point de départ.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">2. Premier défi : transformer une idée en événement réel</h2>
      
      <p className="text-lg text-gray-700 leading-relaxed">
        Rusker commence par structurer ce qui manque : l'identité, la présence en ligne et la crédibilité.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">Les premières actions sont simples mais décisives :</p>

      <ul className="space-y-2 ml-6 my-6">
        <li className="text-lg text-gray-700">• création des pages marketing,</li>
        <li className="text-lg text-gray-700">• structuration du narratif,</li>
        <li className="text-lg text-gray-700">• lancement des comptes LinkedIn et Instagram,</li>
        <li className="text-lg text-gray-700">• clarification du positionnement : un sommet international de l'IA à Barcelone.</li>
      </ul>

      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-2xl my-8">
        <p className="text-lg text-gray-900 mb-4">
          Cette dernière idée est plus stratégique qu'elle n'en a l'air. Le nom <strong>AI Summit Barcelona</strong> crée 
          instantanément un cadre mental. Pour un speaker international, il s'agit d'un événement clé, dans une ville qui compte.
        </p>
        <p className="text-gray-700">
          Le branding a ouvert des portes que la taille réelle du projet ne permettait pas encore d'ouvrir.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">3. La stratégie la plus sous-estimée : contacter le monde entier</h2>
      
      <p className="text-lg text-gray-700 leading-relaxed">
        Plutôt que de se concentrer sur quelques intervenants locaux, Rusker applique une intuition simple : si Barcelone 
        veut accueillir un événement IA crédible, il doit réunir les mêmes gens que les conférences internationales.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        L'équipe contacte alors des speakers de salons majeurs dans le monde entier. Et la magie opère. Grâce au nom, à la 
        ville, et à un positionnement clair, les réponses commencent à affluer. Des chercheurs, des fondateurs, des responsables 
        IA, des experts reconnus acceptent de venir intervenir, parfois même sans connaître encore la structure de l'événement.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        En août puis en septembre, la dynamique s'accélère. Chaque semaine apporte son lot de confirmations et transforme un 
        petit projet initial en un sommet d'envergure.
      </p>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">4. Montrer que Barcelone mérite un vrai sommet IA</h2>

      <p className="text-lg text-gray-700 leading-relaxed">
        À mesure que les speakers se multiplient, la question devient évidente : un événement prévu pour 300 personnes ne suffit plus.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        L'objectif est donc revu à la hausse. Il faut viser 1 000 participants, voire davantage, et adapter tout le dispositif 
        logistique en conséquence.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        Rusker se rend alors chez Glovo, où se tiendra l'événement, pour imaginer une configuration entièrement nouvelle : une 
        disposition des salles repensée, une scène principale plus grande, des espaces de networking, un rooftop réaménagé, une 
        signalétique cohérente, et une circulation fluide pour accueillir plusieurs centaines de visiteurs simultanément.
      </p>

      <div className="bg-amber-50 border-l-4 border-amber-600 p-6 my-8 rounded-r-xl">
        <p className="text-lg text-gray-900">
          Un second enjeu apparaît également : créer une expérience. Le Summit ne doit pas seulement être informatif. Il doit 
          être vivant, inspirant, immersif. Des workshops, des formats interactifs et des moments de rencontre sont ajoutés pour 
          donner une dimension "haut niveau" au contenu.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">5. Le hackathon : un catalyseur inattendu</h2>

      <p className="text-lg text-gray-700 leading-relaxed">
        En parallèle, un hackathon est organisé la semaine précédente. Ce choix crée plusieurs effets de levier importants :
      </p>

      <div className="grid md:grid-cols-3 gap-4 my-8">
        <div className="bg-white p-5 rounded-xl border border-gray-200">
          <p className="text-gray-700">• attirer une communauté de développeurs et d'ingénieurs,</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200">
          <p className="text-gray-700">• générer de la visibilité avant le jour J,</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200">
          <p className="text-gray-700">• positionner Barcelone comme un terrain d'innovation concrète, pas seulement théorique.</p>
        </div>
      </div>

      <p className="text-lg text-gray-700 leading-relaxed">
        Ce pré-événement renforce la crédibilité du Summit et contribue à structurer ce qui deviendra l'AI Week Barcelona.
      </p>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">6. Un retournement spectaculaire : de 20 tickets vendus à 1 200 participants</h2>

      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-8 rounded-2xl my-8 border-l-4 border-green-600">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Les chiffres de la transformation</h3>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">20</div>
            <div className="text-sm text-gray-700">Tickets vendus<br />au départ</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">1,200</div>
            <div className="text-sm text-gray-700">Participants<br />finaux</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">90</div>
            <div className="text-sm text-gray-700">Speakers<br />internationaux</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">60x</div>
            <div className="text-sm text-gray-700">Multiplicateur<br />de croissance</div>
          </div>
        </div>
      </div>

      <p className="text-lg text-gray-700 leading-relaxed">
        En octobre, le momentum devient impressionnant. Les ventes augmentent rapidement. La French Tech Barcelona joue un rôle 
        clé dans la mobilisation de l'écosystème local. Les community partners partagent des codes de réduction à leurs réseaux. 
        Les speakers internationaux relaient leur participation.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        Résultat : les ventes doivent être fermées une semaine avant l'événement, faute de place. On atteint environ 1 200 participants, 
        un niveau inimaginable au départ.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        L'arrivée de grands noms, dont certains très influents dans le monde de l'IA, tel que Luc Julia, renforce la portée de l'événement. 
        Des médias et chaînes TV couvrent le Summit. Des sponsors de premier plan rejoignent le projet, notamment dans les dernières semaines.
      </p>

      <div className="bg-neutral-dark text-white p-6 rounded-xl my-8">
        <p className="text-lg font-semibold mb-2">L'équation est désormais claire :</p>
        <p className="text-xl">Barcelone voulait son grand événement IA, et le public l'attendait.</p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">7. Une journée dense, une énergie unique et un écosystème unifié</h2>

      <p className="text-lg text-gray-700 leading-relaxed">
        Le jour J, près de 90 speakers se succèdent. Les salles sont pleines du matin au soir. Les échanges sont d'un niveau rarement 
        observé dans un événement qui en est à sa première édition.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        La veille, une soirée VIP à la Torre Glòries donne le ton. Le lendemain, l'événement principal se déroule chez Glovo, avec 
        plusieurs scènes, des workshops, des panels, et des espaces de networking animés en continu.
      </p>

      <div className="bg-purple-50 p-8 rounded-2xl my-8 border-l-4 border-purple-600">
        <h3 className="text-xl font-bold text-gray-900 mb-4">La AI Week Barcelona prend forme naturellement</h3>
        <p className="text-gray-800 mb-4">De multiples acteurs organisent leurs propres side-events, alignés sur la thématique :</p>
        <ul className="space-y-2 text-gray-700">
          <li>• sessions startups,</li>
          <li>• panels institutionnels,</li>
          <li>• soirées de networking,</li>
          <li>• ateliers spécialisés,</li>
          <li>• événements communautaires.</li>
        </ul>
        <p className="text-gray-800 mt-4">
          L'ensemble crée une semaine complète dédiée à l'IA, et ancre Barcelone dans une dynamique nouvelle.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Conclusion : l'histoire d'un événement qui a dépassé sa propre ambition</h2>

      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-2xl my-8 border-l-4 border-neutral-dark">
        <p className="text-lg text-gray-900 leading-relaxed">
          L'AI Summit Barcelona n'était pas destiné à devenir immédiatement un événement majeur. Mais une intuition juste, un branding 
          fort, une stratégie agressive de speakers, un réseau institutionnel solide et une exécution logistique précise ont permis de 
          transformer une idée encore floue en un sommet de référence.
        </p>
        <p className="text-lg text-gray-800 mt-4">
          Le résultat n'est pas seulement un succès chiffré. C'est la naissance d'un rendez-vous annuel attendu, capable de rassembler 
          chercheurs, entrepreneurs, investisseurs et institutions autour d'une vision commune de l'IA à Barcelone.
        </p>
        <p className="text-lg text-gray-800 mt-4">
          Rusker a accompagné la structuration, la conception opérationnelle et l'orchestration de l'événement, en lien étroit avec The 
          Tech Nation, Glovo, la French Tech Barcelona et l'ensemble des partenaires ayant contribué à faire émerger cette première édition.
        </p>
      </div>

      <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-200">
        <p className="text-sm font-semibold text-blue-900 mb-2">📚 Articles connexes</p>
        <ul className="space-y-2 text-sm">
          <li>
            <Link href="/blog/lexintown-rusker-transformation" className="text-blue-700 hover:text-blue-900 underline">
              → Comment l'AI Summit a révélé la transformation de Lexintown en Rusker
            </Link>
          </li>
          <li>
            <Link href="/blog/rusker-360-agency" className="text-blue-700 hover:text-blue-900 underline">
              → Découvrez Rusker Events : la branche événementielle de Rusker
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

function AISummitArticleEn() {
  return (
    <div className="space-y-8">
      <p className="text-lg text-gray-700 leading-relaxed">
        AI Summit Barcelona did not start as a grand international conference. It had no dedicated team, 
        few resources, almost no structured program, and just a handful of tickets sold.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        Yet, in just a few months, this still-vague project became a major event bringing together over a thousand 
        participants, nearly a hundred speakers, and an energy rarely matched in the European AI ecosystem.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        Here is the story of this transformation, and what it says about how to build a high-impact event.
      </p>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">1. An Idea Born in March 2025: Intuition Before Infrastructure</h2>
      
      <p className="text-lg text-gray-700 leading-relaxed">
        The initiative comes from Jérémie Benhamou, founder of The Tech Nation, who in early 2025 imagined an AI gathering in 
        Barcelona, right after the Mobile World Congress. The idea quickly appealed to institutional players. The Chamber 
        of Commerce and French Tech Barcelona joined the project, convinced of the potential of such an event.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        In June, <strong>Rusker was called to join the adventure</strong>. At that time, the event existed mainly as 
        a promise: a minimalist website, six speakers who were friends of the founders, about twenty tickets sold, and a still 
        very vague ambition.
      </p>

      <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-8 rounded-r-xl">
        <p className="text-lg text-gray-900">
          This was the starting point.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">2. First Challenge: Turning an Idea into a Real Event</h2>
      
      <p className="text-lg text-gray-700 leading-relaxed">
        Rusker started by structuring what was missing: identity, online presence, and credibility.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">The first actions were simple but decisive:</p>

      <ul className="space-y-2 ml-6 my-6">
        <li className="text-lg text-gray-700">• creation of marketing pages,</li>
        <li className="text-lg text-gray-700">• structuring the narrative,</li>
        <li className="text-lg text-gray-700">• launching LinkedIn and Instagram accounts,</li>
        <li className="text-lg text-gray-700">• clarifying the positioning: an international AI summit in Barcelona.</li>
      </ul>

      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-2xl my-8">
        <p className="text-lg text-gray-900 mb-4">
          This last idea is more strategic than it seems. The name <strong>AI Summit Barcelona</strong> instantly creates 
          a mental framework. For an international speaker, it is a key event, in a city that matters.
        </p>
        <p className="text-gray-700">
          Branding opened doors that the actual size of the project did not yet allow opening.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">3. The Most Underestimated Strategy: Contacting the Whole World</h2>
      
      <p className="text-lg text-gray-700 leading-relaxed">
        Rather than focusing on a few local speakers, Rusker applied a simple intuition: if Barcelona 
        wants to host a credible AI event, it must bring together the same people as international conferences.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        The team then contacted speakers from major trade shows worldwide. And the magic happened. Thanks to the name, the 
        city, and a clear positioning, responses began to flow. Researchers, founders, AI heads, 
        recognized experts agreed to come and speak, sometimes even without knowing the event structure yet.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        In August and then September, the momentum accelerated. Each week brought its share of confirmations and transformed a 
        small initial project into a major summit.
      </p>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">4. Showing that Barcelona Deserves a Real AI Summit</h2>

      <p className="text-lg text-gray-700 leading-relaxed">
        As speakers multiplied, the question became obvious: an event planned for 300 people was no longer enough.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        The objective was therefore revised upwards. We had to aim for 1,000 participants, or even more, and adapt the entire 
        logistical setup accordingly.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        Rusker then went to Glovo, where the event would be held, to imagine an entirely new configuration: a 
        redesigned room layout, a larger main stage, networking spaces, a redesigned rooftop, coherent 
        signage, and fluid circulation to welcome several hundred visitors simultaneously.
      </p>

      <div className="bg-amber-50 border-l-4 border-amber-600 p-6 my-8 rounded-r-xl">
        <p className="text-lg text-gray-900">
          A second challenge also appeared: creating an experience. The Summit should not only be informative. It must 
          be lively, inspiring, immersive. Workshops, interactive formats, and meeting moments were added to 
          give a "high-level" dimension to the content.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">5. The Hackathon: An Unexpected Catalyst</h2>

      <p className="text-lg text-gray-700 leading-relaxed">
        In parallel, a hackathon was organized the previous week. This choice created several important leverage effects:
      </p>

      <div className="grid md:grid-cols-3 gap-4 my-8">
        <div className="bg-white p-5 rounded-xl border border-gray-200">
          <p className="text-gray-700">• attracting a community of developers and engineers,</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200">
          <p className="text-gray-700">• generating visibility before D-Day,</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200">
          <p className="text-gray-700">• positioning Barcelona as a field of concrete innovation, not just theoretical.</p>
        </div>
      </div>

      <p className="text-lg text-gray-700 leading-relaxed">
        This pre-event reinforced the credibility of the Summit and contributed to structuring what would become AI Week Barcelona.
      </p>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">6. A Spectacular Turnaround: From 20 Tickets Sold to 1,200 Participants</h2>

      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-8 rounded-2xl my-8 border-l-4 border-green-600">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Transformation Figures</h3>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">20</div>
            <div className="text-sm text-gray-700">Tickets sold<br />initially</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">1,200</div>
            <div className="text-sm text-gray-700">Final<br />Participants</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">90</div>
            <div className="text-sm text-gray-700">International<br />Speakers</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">60x</div>
            <div className="text-sm text-gray-700">Growth<br />Multiplier</div>
          </div>
        </div>
      </div>

      <p className="text-lg text-gray-700 leading-relaxed">
        In October, the momentum became impressive. Sales increased rapidly. French Tech Barcelona played a key 
        role in mobilizing the local ecosystem. Community partners shared discount codes with their networks. 
        International speakers relayed their participation.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        Result: sales had to be closed a week before the event due to lack of space. We reached about 1,200 participants, 
        an unimaginable level at the start.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        The arrival of big names, including some very influential in the AI world, such as Luc Julia, reinforced the event's reach. 
        Media and TV channels covered the Summit. Top-tier sponsors joined the project, especially in the final weeks.
      </p>

      <div className="bg-neutral-dark text-white p-6 rounded-xl my-8">
        <p className="text-lg font-semibold mb-2">The equation is now clear:</p>
        <p className="text-xl">Barcelona wanted its big AI event, and the public was waiting for it.</p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">7. A Dense Day, Unique Energy, and a Unified Ecosystem</h2>

      <p className="text-lg text-gray-700 leading-relaxed">
        On D-Day, nearly 90 speakers succeeded one another. The rooms were full from morning to evening. The exchanges were of a level rarely 
        observed in a first-edition event.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        The day before, a VIP evening at the Torre Glòries set the tone. The next day, the main event took place at Glovo, with 
        several stages, workshops, panels, and continuously animated networking spaces.
      </p>

      <div className="bg-purple-50 p-8 rounded-2xl my-8 border-l-4 border-purple-600">
        <h3 className="text-xl font-bold text-gray-900 mb-4">AI Week Barcelona Takes Shape Naturally</h3>
        <p className="text-gray-800 mb-4">Multiple players organize their own side-events, aligned with the theme:</p>
        <ul className="space-y-2 text-gray-700">
          <li>• startup sessions,</li>
          <li>• institutional panels,</li>
          <li>• networking evenings,</li>
          <li>• specialized workshops,</li>
          <li>• community events.</li>
        </ul>
        <p className="text-gray-800 mt-4">
          The ensemble creates a complete week dedicated to AI, and anchors Barcelona in a new dynamic.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Conclusion: The Story of an Event That Exceeded Its Own Ambition</h2>

      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-2xl my-8 border-l-4 border-neutral-dark">
        <p className="text-lg text-gray-900 leading-relaxed">
          AI Summit Barcelona was not destined to immediately become a major event. But a correct intuition, strong branding, 
          an aggressive speaker strategy, a solid institutional network, and precise logistical execution allowed 
          transforming a still-vague idea into a reference summit.
        </p>
        <p className="text-lg text-gray-800 mt-4">
          The result is not just a numerical success. It is the birth of an awaited annual meeting, capable of gathering 
          researchers, entrepreneurs, investors, and institutions around a common vision of AI in Barcelona.
        </p>
        <p className="text-lg text-gray-800 mt-4">
          Rusker accompanied the structuring, operational design, and orchestration of the event, in close connection with The 
          Tech Nation, Glovo, French Tech Barcelona, and all partners who contributed to making this first edition emerge.
        </p>
      </div>

      <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-200">
        <p className="text-sm font-semibold text-blue-900 mb-2">📚 Related Articles</p>
        <ul className="space-y-2 text-sm">
          <li>
            <Link href="/blog/lexintown-rusker-transformation" className="text-blue-700 hover:text-blue-900 underline">
              → How the AI Summit revealed Lexintown's transformation into Rusker
            </Link>
          </li>
          <li>
            <Link href="/blog/rusker-360-agency" className="text-blue-700 hover:text-blue-900 underline">
              → Discover Rusker Events: the event branch of Rusker
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

function AISummitArticleEs() {
  return (
    <div className="space-y-8">
      <p className="text-lg text-gray-700 leading-relaxed">
        El AI Summit Barcelona no comenzó como una gran feria internacional. No tenía equipo dedicado, 
        pocos recursos, casi ningún programa estructurado y solo un puñado de entradas vendidas.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        Sin embargo, en pocos meses, este proyecto aún difuso se convirtió en un evento importante que reunió a más de mil 
        participantes, casi cien ponentes y una energía raramente igualada en el ecosistema de IA europeo.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        Aquí está la historia de esta transformación, y lo que dice sobre cómo construir un evento de alto impacto.
      </p>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">1. Una idea nacida en marzo de 2025: la intuición antes que la infraestructura</h2>
      
      <p className="text-lg text-gray-700 leading-relaxed">
        La iniciativa proviene de Jérémie Benhamou, fundador de The Tech Nation, quien a principios de 2025 imagina una cita de IA en 
        Barcelona, justo después del Mobile World Congress. La idea seduce rápidamente a los actores institucionales. La Cámara 
        de Comercio y la French Tech Barcelona se unen al proyecto, convencidas del potencial de un evento de este tipo.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        En junio, <strong>Rusker es llamado a unirse a la aventura</strong>. En ese momento, el evento existe sobre todo como 
        una promesa: un sitio minimalista, seis ponentes amigos de los fundadores, unas veinte entradas vendidas y una ambición 
        aún muy difusa.
      </p>

      <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-8 rounded-r-xl">
        <p className="text-lg text-gray-900">
          Este es el punto de partida.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">2. Primer desafío: transformar una idea en un evento real</h2>
      
      <p className="text-lg text-gray-700 leading-relaxed">
        Rusker comienza por estructurar lo que falta: la identidad, la presencia en línea y la credibilidad.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">Las primeras acciones son simples pero decisivas:</p>

      <ul className="space-y-2 ml-6 my-6">
        <li className="text-lg text-gray-700">• creación de páginas de marketing,</li>
        <li className="text-lg text-gray-700">• estructuración de la narrativa,</li>
        <li className="text-lg text-gray-700">• lanzamiento de cuentas de LinkedIn e Instagram,</li>
        <li className="text-lg text-gray-700">• clarificación del posicionamiento: una cumbre internacional de IA en Barcelona.</li>
      </ul>

      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-2xl my-8">
        <p className="text-lg text-gray-900 mb-4">
          Esta última idea es más estratégica de lo que parece. El nombre <strong>AI Summit Barcelona</strong> crea 
          instantáneamente un marco mental. Para un ponente internacional, se trata de un evento clave, en una ciudad que cuenta.
        </p>
        <p className="text-gray-700">
          El branding abrió puertas que el tamaño real del proyecto aún no permitía abrir.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">3. La estrategia más subestimada: contactar a todo el mundo</h2>
      
      <p className="text-lg text-gray-700 leading-relaxed">
        En lugar de centrarse en unos pocos ponentes locales, Rusker aplica una intuición simple: si Barcelona 
        quiere acoger un evento de IA creíble, debe reunir a las mismas personas que las conferencias internacionales.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        El equipo contacta entonces a ponentes de ferias importantes en todo el mundo. Y la magia opera. Gracias al nombre, la 
        ciudad y un posicionamiento claro, las respuestas comienzan a fluir. Investigadores, fundadores, responsables 
        de IA, expertos reconocidos aceptan venir a intervenir, a veces incluso sin conocer aún la estructura del evento.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        En agosto y luego en septiembre, la dinámica se acelera. Cada semana trae su lote de confirmaciones y transforma un 
        pequeño proyecto inicial en una cumbre de envergadura.
      </p>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">4. Mostrar que Barcelona merece una verdadera cumbre de IA</h2>

      <p className="text-lg text-gray-700 leading-relaxed">
        A medida que los ponentes se multiplican, la cuestión se vuelve evidente: un evento previsto para 300 personas ya no es suficiente.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        El objetivo se revisa al alza. Hay que apuntar a 1.000 participantes, o incluso más, y adaptar todo el dispositivo 
        logístico en consecuencia.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        Rusker va entonces a Glovo, donde se celebrará el evento, para imaginar una configuración completamente nueva: una 
        disposición de las salas repensada, un escenario principal más grande, espacios de networking, una azotea rediseñada, una 
        señalización coherente y una circulación fluida para acoger a varios cientos de visitantes simultáneamente.
      </p>

      <div className="bg-amber-50 border-l-4 border-amber-600 p-6 my-8 rounded-r-xl">
        <p className="text-lg text-gray-900">
          También aparece un segundo desafío: crear una experiencia. El Summit no debe ser solo informativo. Debe 
          ser vivo, inspirador, inmersivo. Talleres, formatos interactivos y momentos de encuentro se añaden para 
          dar una dimensión de "alto nivel" al contenido.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">5. El hackathon: un catalizador inesperado</h2>

      <p className="text-lg text-gray-700 leading-relaxed">
        Paralelamente, se organiza un hackathon la semana anterior. Esta elección crea varios efectos de palanca importantes:
      </p>

      <div className="grid md:grid-cols-3 gap-4 my-8">
        <div className="bg-white p-5 rounded-xl border border-gray-200">
          <p className="text-gray-700">• atraer a una comunidad de desarrolladores e ingenieros,</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200">
          <p className="text-gray-700">• generar visibilidad antes del día D,</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200">
          <p className="text-gray-700">• posicionar a Barcelona como un terreno de innovación concreta, no solo teórica.</p>
        </div>
      </div>

      <p className="text-lg text-gray-700 leading-relaxed">
        Este pre-evento refuerza la credibilidad del Summit y contribuye a estructurar lo que se convertirá en la AI Week Barcelona.
      </p>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">6. Un cambio espectacular: de 20 entradas vendidas a 1.200 participantes</h2>

      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-8 rounded-2xl my-8 border-l-4 border-green-600">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Las cifras de la transformación</h3>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">20</div>
            <div className="text-sm text-gray-700">Entradas vendidas<br />al inicio</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">1.200</div>
            <div className="text-sm text-gray-700">Participantes<br />finales</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">90</div>
            <div className="text-sm text-gray-700">Ponentes<br />internacionales</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">60x</div>
            <div className="text-sm text-gray-700">Multiplicador<br />de crecimiento</div>
          </div>
        </div>
      </div>

      <p className="text-lg text-gray-700 leading-relaxed">
        En octubre, el momentum se vuelve impresionante. Las ventas aumentan rápidamente. La French Tech Barcelona juega un papel 
        clave en la movilización del ecosistema local. Los community partners comparten códigos de descuento con sus redes. 
        Los ponentes internacionales retransmiten su participación.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        Resultado: las ventas deben cerrarse una semana antes del evento, por falta de espacio. Se alcanzan unos 1.200 participantes, 
        un nivel inimaginable al principio.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        La llegada de grandes nombres, incluidos algunos muy influyentes en el mundo de la IA, como Luc Julia, refuerza el alcance del evento. 
        Medios y canales de televisión cubren el Summit. Patrocinadores de primer nivel se unen al proyecto, especialmente en las últimas semanas.
      </p>

      <div className="bg-neutral-dark text-white p-6 rounded-xl my-8">
        <p className="text-lg font-semibold mb-2">La ecuación es ahora clara:</p>
        <p className="text-xl">Barcelona quería su gran evento de IA, y el público lo esperaba.</p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">7. Un día denso, una energía única y un ecosistema unificado</h2>

      <p className="text-lg text-gray-700 leading-relaxed">
        El día D, casi 90 ponentes se suceden. Las salas están llenas de la mañana a la noche. Los intercambios son de un nivel raramente 
        observado en un evento que está en su primera edición.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        La víspera, una velada VIP en la Torre Glòries marca el tono. Al día siguiente, el evento principal se desarrolla en Glovo, con 
        varios escenarios, talleres, paneles y espacios de networking animados continuamente.
      </p>

      <div className="bg-purple-50 p-8 rounded-2xl my-8 border-l-4 border-purple-600">
        <h3 className="text-xl font-bold text-gray-900 mb-4">La AI Week Barcelona toma forma naturalmente</h3>
        <p className="text-gray-800 mb-4">Múltiples actores organizan sus propios side-events, alineados con la temática:</p>
        <ul className="space-y-2 text-gray-700">
          <li>• sesiones de startups,</li>
          <li>• paneles institucionales,</li>
          <li>• veladas de networking,</li>
          <li>• talleres especializados,</li>
          <li>• eventos comunitarios.</li>
        </ul>
        <p className="text-gray-800 mt-4">
          El conjunto crea una semana completa dedicada a la IA, y ancla a Barcelona en una dinámica nueva.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Conclusión: la historia de un evento que superó su propia ambición</h2>

      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-2xl my-8 border-l-4 border-neutral-dark">
        <p className="text-lg text-gray-900 leading-relaxed">
          El AI Summit Barcelona no estaba destinado a convertirse inmediatamente en un evento importante. Pero una intuición correcta, un branding 
          fuerte, una estrategia agresiva de ponentes, una red institucional sólida y una ejecución logística precisa permitieron 
          transformar una idea aún difusa en una cumbre de referencia.
        </p>
        <p className="text-lg text-gray-800 mt-4">
          El resultado no es solo un éxito en cifras. Es el nacimiento de una cita anual esperada, capaz de reunir a 
          investigadores, emprendedores, inversores e instituciones en torno a una visión común de la IA en Barcelona.
        </p>
        <p className="text-lg text-gray-800 mt-4">
          Rusker acompañó la estructuración, el diseño operativo y la orquestación del evento, en estrecha colaboración con The 
          Tech Nation, Glovo, la French Tech Barcelona y el conjunto de socios que contribuyeron a hacer emerger esta primera edición.
        </p>
      </div>

      <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-200">
        <p className="text-sm font-semibold text-blue-900 mb-2">📚 Artículos relacionados</p>
        <ul className="space-y-2 text-sm">
          <li>
            <Link href="/blog/lexintown-rusker-transformation" className="text-blue-700 hover:text-blue-900 underline">
              → Cómo el AI Summit reveló la transformación de Lexintown en Rusker
            </Link>
          </li>
          <li>
            <Link href="/blog/rusker-360-agency" className="text-blue-700 hover:text-blue-900 underline">
              → Descubre Rusker Events: la rama de eventos de Rusker
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

