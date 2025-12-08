'use client'

import Link from 'next/link'
import { useI18n } from '@/lib/i18n'

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

// Learning Expedition Article - COMPLETE
function LearningExpeditionArticle() {
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

// AI Summit Barcelona Article - COMPLETE
function AISummitArticle() {
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

// Lexintown Transformation Article - COMPLETE
function LexintownTransformationArticle() {
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

// Rusker 360 Article - COMPLETE
function Rusker360Article() {
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

// French Tech Ecosystem Article - COMPLETE  
function FrenchTechEcosystemArticle() {
  return (
    <div className="space-y-8">
      <p className="text-lg text-gray-700 leading-relaxed">
        L'écosystème tech de Barcelone a explosé en visibilité ces dernières années. Startups, scale-ups, hubs d'innovation, 
        investisseurs, écoles internationales… tout converge dans une ville qui attire talents, projets et entreprises du monde entier.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        Mais un écosystème ne se résume pas à des entreprises. Un écosystème vit grâce à ses connexions. À sa capacité à mettre en relation :
      </p>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl my-8 border-l-4 border-blue-600">
        <ul className="space-y-2 text-gray-800">
          <li>• les écoles et les entreprises,</li>
          <li>• les talents et les opportunités,</li>
          <li>• les organisations locales et les visiteurs internationaux.</li>
        </ul>
      </div>

      <p className="text-lg text-gray-700 leading-relaxed">
        C'est dans cette logique que se sont construits trois axes aujourd'hui indissociables de Rusker : French Tech Barcelona, 
        TalentBoard Barcelona, et Rusker Network. Trois initiatives qui, ensemble, renforcent la dynamique locale et créent des ponts 
        durables au service des talents et des organisations.
      </p>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">1. French Tech Barcelona : un ancrage stratégique dans l'écosystème</h2>
      
      <p className="text-lg text-gray-700 leading-relaxed">
        En 2024, Rusker commence à collaborer avec la French Tech Barcelona et son président, Guillaume Rostand. L'objectif est clair : 
        créer un lien structuré entre l'écosystème français de Barcelone, les écoles internationales et les entreprises qui cherchent à 
        comprendre la dynamique locale.
      </p>

      <div className="bg-blue-50 border-l-4 border-blue-600 p-8 my-8 rounded-r-xl">
        <h3 className="text-xl font-bold text-gray-900 mb-4">La French Tech a deux missions essentielles :</h3>
        <div className="space-y-4">
          <div>
            <p className="text-lg text-gray-900 font-semibold mb-2">1. Faire rayonner la France à Barcelone</p>
            <p className="text-gray-700">
              En soutenant ses entrepreneurs, ses talents, ses entreprises implantées localement et en favorisant leur intégration.
            </p>
          </div>
          <div>
            <p className="text-lg text-gray-900 font-semibold mb-2">2. Faire rayonner Barcelone en France et à l'international</p>
            <p className="text-gray-700">
              En attirant au cœur de la ville des écoles, des talents, des organisations, des leaders et des décideurs.
            </p>
          </div>
        </div>
      </div>

      <p className="text-lg text-gray-700 leading-relaxed">
        Ce partenariat apporte trois leviers structurants pour Rusker : l'accès aux entreprises locales, la légitimité institutionnelle 
        pour opérer des Learning Expeditions, la capacité à connecter nos clients aux bons interlocuteurs.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        Mais la relation fonctionne dans les deux sens. Pour la French Tech, travailler avec une agence capable de structurer Learning 
        Expeditions, événements et initiatives communautaires permet de dynamiser l'écosystème, attirer des délégations étrangères, renforcer 
        la visibilité des entreprises locales, fédérer davantage de communautés autour de Barcelone.
      </p>

      <div className="bg-neutral-dark text-white p-6 rounded-xl my-8">
        <p className="text-lg">C'est un mouvement gagnant-gagnant, qui donne naissance à une troisième brique : Rusker Network.</p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">2. Rusker Network : connecter, structurer, amplifier</h2>

      <p className="text-lg text-gray-700 leading-relaxed">
        Rusker Network naît d'un constat simple : Barcelone est riche en talents, en écoles, en entreprises, mais les connexions ne se 
        font pas naturellement. Les acteurs existent. Ils sont nombreux, brillants, motivés. Mais il manque parfois un pont, un intermédiaire, 
        un orchestrateur. C'est ce rôle que Rusker Network assume.
      </p>

      <div className="grid md:grid-cols-3 gap-6 my-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h4 className="font-bold text-gray-900 mb-3">A. L'écosystème : rendre Barcelone accessible</h4>
          <p className="text-gray-700 text-sm">
            Grâce à la French Tech Barcelona et à nos partenaires, Rusker Network construit des passerelles entre écoles, startups, 
            scale-ups, VCs, incubateurs, hubs et institutions publiques. Cela permet d'organiser des rencontres de qualité pendant les 
            Learning Expeditions, mais aussi d'activer des synergies pour des conférences, des side-events, des panels, des visites ou 
            des projets collaboratifs.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h4 className="font-bold text-gray-900 mb-3">B. La communauté : fédérer les acteurs</h4>
          <p className="text-gray-700 text-sm">
            Afterworks, panels, networking, talks, side-events… Rusker Network alimente une dynamique communautaire qui fait vivre la ville. 
            Les entreprises ont besoin de visibilité. Les talents ont besoin d'accès. Les écoles ont besoin de contacts. Rusker Network crée cet espace.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h4 className="font-bold text-gray-900 mb-3">C. Le recrutement : répondre à une fracture structurelle</h4>
          <p className="text-gray-700 text-sm">
            C'est ici que naît TalentBoard Barcelona, la brique la plus innovante du réseau.
          </p>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">3. Le TalentBoard Barcelona : une réponse à un problème que personne ne résout vraiment</h2>

      <p className="text-lg text-gray-700 leading-relaxed">
        Pour comprendre pourquoi TalentBoard existe, il faut regarder le contexte du travail en 2024–2030. Nous évoluons dans un marché bouleversé par :
      </p>

      <div className="bg-amber-50 p-8 rounded-2xl my-8 border-l-4 border-amber-600">
        <div className="space-y-4">
          <div>
            <h4 className="font-bold text-gray-900 mb-2">1. La montée fulgurante de l'IA</h4>
            <p className="text-gray-700 text-sm">
              Des compétences deviennent obsolètes en quelques mois. Des postes disparaissent. Des métiers apparaissent sans cadre clair. 
              La vitesse de transformation dépasse la capacité d'adaptation des formations.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2">2. Une économie plus prudente</h4>
            <p className="text-gray-700 text-sm">
              Les entreprises recrutent moins vite. Elles attendent plus. Elles internalisent moins. Elles prennent moins de risques.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2">3. Une génération (Gen Z et Alphas) en décalage avec les outils RH existants</h4>
            <p className="text-gray-700 text-sm">
              Aujourd'hui, plus personne n'a envie de postuler sur 50 offres, écrire 20 lettres de motivation, attendre des réponses automatiques, 
              se battre contre des algorithmes de tri CV. Les méthodes traditionnelles – Indeed, Jobteaser, LinkedIn, ATS – sont conçues pour l'entreprise, pas pour le talent.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2">4. Une contradiction majeure dans le système éducatif</h4>
            <p className="text-gray-700 text-sm">
              Un Bachelor ou un Master dure 3 à 5 ans. Pendant ces 3 à 5 ans : les technologies changent, les besoins du marché évoluent, 
              les compétences enseignées deviennent parfois décalées, les étudiants paient des formations cher… pour parfois découvrir que leur 
              apprentissage n'est déjà plus suffisant.
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">4. Pourquoi TalentBoard est différent</h2>

      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-8 rounded-2xl my-8 border-l-4 border-indigo-600">
        <p className="text-lg text-gray-900 mb-4">
          TalentBoard Barcelona propose un modèle inversé : plutôt que les étudiants cherchent des offres, ce sont les entreprises qui trouvent directement les talents.
        </p>
        <h4 className="font-bold text-gray-900 mb-3">Comment ça fonctionne ?</h4>
        <ul className="space-y-2 text-gray-800">
          <li>• Les talents créent un profil simple, visuel, interactif.</li>
          <li>• Les entreprises accèdent à une base de talents préqualifiés.</li>
          <li>• Un système de matching modernisé permet de "liker" un talent ou une entreprise.</li>
          <li>• L'IA filtre, propose, analyse.</li>
          <li>• Le système fonctionne comme une app moderne, fluide, intuitive.</li>
        </ul>
        <p className="text-gray-700 mt-4 text-sm italic">
          Pas comme un portail d'offres d'emploi des années 2000.
        </p>
      </div>

      <div className="bg-green-50 p-6 rounded-xl my-8">
        <p className="text-gray-800 mb-2"><strong>Le résultat :</strong></p>
        <ul className="space-y-1 text-gray-700 text-sm">
          <li>• plus de visibilité pour les jeunes,</li>
          <li>• moins de friction pour les entreprises,</li>
          <li>• plus de pertinence dans l'identification des profils.</li>
        </ul>
        <p className="text-gray-800 mt-4">
          TalentBoard s'intègre ensuite dans les Learning Expeditions : un étudiant qui découvre Barcelone en immersion peut ensuite trouver 
          un stage, un emploi, une entreprise ou un projet… dans la ville même où il vient d'apprendre. C'est la boucle parfaite.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">5. French Tech → Network → TalentBoard : un système intégré</h2>

      <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-green-50 p-8 rounded-2xl my-8">
        <p className="text-lg text-gray-900 mb-4">
          On pourrait croire qu'il s'agit de trois initiatives séparées. En réalité, c'est un écosystème cohérent :
        </p>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
            <div>
              <h4 className="font-bold text-gray-900 mb-1">La French Tech Barcelona</h4>
              <p className="text-gray-700 text-sm">ouvre les portes, connecte les entreprises, crée la légitimité.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
            <div>
              <h4 className="font-bold text-gray-900 mb-1">Rusker Network</h4>
              <p className="text-gray-700 text-sm">orchestre les rencontres, anime les communautés, crée les passerelles.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
            <div>
              <h4 className="font-bold text-gray-900 mb-1">TalentBoard Barcelona</h4>
              <p className="text-gray-700 text-sm">transforme ces rencontres en opportunités concrètes pour les talents et les entreprises.</p>
            </div>
          </div>
        </div>
        <p className="text-gray-800 mt-6">
          Ce système bénéficie à tout le monde : aux écoles, aux étudiants, aux jeunes diplômés, aux entreprises locales, à la ville de 
          Barcelone elle-même. C'est un cercle vertueux qui n'existait pas. Il est en train de se construire.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Conclusion : un ancrage local au service d'un impact global</h2>

      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-2xl my-8 border-l-4 border-neutral-dark">
        <p className="text-lg text-gray-900 leading-relaxed">
          Le partenariat avec la French Tech Barcelona, le lancement du TalentBoard et la création de Rusker Network participent d'une même 
          vision : faire de Barcelone un écosystème plus accessible, plus connecté, plus dynamique, et plus ouvert au monde.
        </p>
        <p className="text-lg text-gray-800 mt-4">
          Dans un contexte où le marché du travail se fragilise, où les compétences doivent être mises à jour en continu, et où les jeunes 
          perdent parfois leurs repères, TalentBoard apporte une réponse moderne et optimiste. Et Rusker Network crée les ponts qui transforment 
          ces réponses en réalité.
        </p>
        <p className="text-lg text-gray-800 mt-4">
          C'est cette dynamique que Rusker continuera à porter en 2026 : connecter, inspirer, activer, et créer de vraies opportunités pour tous 
          ceux qui veulent comprendre, apprendre et travailler au cœur de Barcelone.
        </p>
      </div>

      <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-200">
        <p className="text-sm font-semibold text-blue-900 mb-2">📚 Articles connexes</p>
        <ul className="space-y-2 text-sm">
          <li>
            <Link href="/blog/rusker-360-agency" className="text-blue-700 hover:text-blue-900 underline">
              → Comment Rusker Network s'intègre dans l'architecture 360° de Rusker
            </Link>
          </li>
          <li>
            <Link href="/blog/barcelona-tech-ecosystem" className="text-blue-700 hover:text-blue-900 underline">
              → Découvrez l'écosystème tech barcelonais dans son ensemble
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

// ESSEC Case Study - COMPLETE
function EssecCaseStudyArticle() {
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

// ESCEN Case Study - COMPLETE
function EscenCaseStudyArticle() {
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

// WeshareTrust Case Study - COMPLETE
function WeshareTrustCaseStudyArticle() {
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

// Barcelona Tech Ecosystem Article - COMPLETE
function BarcelonaTechEcosystemArticle() {
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
