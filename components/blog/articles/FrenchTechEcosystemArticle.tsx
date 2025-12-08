'use client'

import { useI18n } from '@/lib/i18n'
import Link from 'next/link'

export default function FrenchTechEcosystemArticle() {
  const { locale } = useI18n()

  if (locale === 'en') {
    return <FrenchTechEcosystemArticleEn />
  } else if (locale === 'es') {
    return <FrenchTechEcosystemArticleEs />
  }
  
  return <FrenchTechEcosystemArticleFr />
}

function FrenchTechEcosystemArticleFr() {
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

function FrenchTechEcosystemArticleEn() {
  return (
    <div className="space-y-8">
      <p className="text-lg text-gray-700 leading-relaxed">
        Barcelona's tech ecosystem has exploded in visibility in recent years. Startups, scale-ups, innovation hubs, 
        investors, international schools... everything converges in a city that attracts talents, projects and companies from all over the world.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        But an ecosystem is not just about companies. An ecosystem lives through its connections. Through its ability to connect:
      </p>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl my-8 border-l-4 border-blue-600">
        <ul className="space-y-2 text-gray-800">
          <li>• schools and companies,</li>
          <li>• talents and opportunities,</li>
          <li>• local organizations and international visitors.</li>
        </ul>
      </div>

      <p className="text-lg text-gray-700 leading-relaxed">
        It is in this logic that three axes now inseparable from Rusker were built: French Tech Barcelona, 
        TalentBoard Barcelona, and Rusker Network. Three initiatives that, together, strengthen the local dynamic and create 
        lasting bridges for talents and organizations.
      </p>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">1. French Tech Barcelona: A Strategic Anchoring in the Ecosystem</h2>
      
      <p className="text-lg text-gray-700 leading-relaxed">
        In 2024, Rusker began collaborating with French Tech Barcelona and its president, Guillaume Rostand. The goal is clear: 
        to create a structured link between the French ecosystem in Barcelona, international schools and companies seeking to 
        understand the local dynamic.
      </p>

      <div className="bg-blue-50 border-l-4 border-blue-600 p-8 my-8 rounded-r-xl">
        <h3 className="text-xl font-bold text-gray-900 mb-4">French Tech has two essential missions:</h3>
        <div className="space-y-4">
          <div>
            <p className="text-lg text-gray-900 font-semibold mb-2">1. Promote France in Barcelona</p>
            <p className="text-gray-700">
              By supporting its entrepreneurs, talents, locally established companies and promoting their integration.
            </p>
          </div>
          <div>
            <p className="text-lg text-gray-900 font-semibold mb-2">2. Promote Barcelona in France and internationally</p>
            <p className="text-gray-700">
              By attracting schools, talents, organizations, leaders and decision-makers to the heart of the city.
            </p>
          </div>
        </div>
      </div>

      <p className="text-lg text-gray-700 leading-relaxed">
        This partnership brings three structuring levers for Rusker: access to local companies, institutional legitimacy 
        to operate Learning Expeditions, the ability to connect our clients to the right interlocutors.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        But the relationship works both ways. For French Tech, working with an agency capable of structuring Learning 
        Expeditions, events and community initiatives allows energizing the ecosystem, attracting foreign delegations, strengthening 
        the visibility of local companies, uniting more communities around Barcelona.
      </p>

      <div className="bg-neutral-dark text-white p-6 rounded-xl my-8">
        <p className="text-lg">It is a win-win movement, which gives birth to a third brick: Rusker Network.</p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">2. Rusker Network: Connecting, Structuring, Amplifying</h2>

      <p className="text-lg text-gray-700 leading-relaxed">
        Rusker Network was born from a simple observation: Barcelona is rich in talents, schools, companies, but connections do not 
        happen naturally. The actors exist. They are numerous, brilliant, motivated. But sometimes a bridge, an intermediary, 
        an orchestrator is missing. It is this role that Rusker Network assumes.
      </p>

      <div className="grid md:grid-cols-3 gap-6 my-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h4 className="font-bold text-gray-900 mb-3">A. The Ecosystem: Making Barcelona Accessible</h4>
          <p className="text-gray-700 text-sm">
            Thanks to French Tech Barcelona and our partners, Rusker Network builds bridges between schools, startups, 
            scale-ups, VCs, incubators, hubs and public institutions. This allows organizing quality meetings during 
            Learning Expeditions, but also activating synergies for conferences, side-events, panels, visits or 
            collaborative projects.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h4 className="font-bold text-gray-900 mb-3">B. The Community: Uniting Actors</h4>
          <p className="text-gray-700 text-sm">
            Afterworks, panels, networking, talks, side-events… Rusker Network feeds a community dynamic that makes the city alive. 
            Companies need visibility. Talents need access. Schools need contacts. Rusker Network creates this space.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h4 className="font-bold text-gray-900 mb-3">C. Recruitment: Responding to a Structural Fracture</h4>
          <p className="text-gray-700 text-sm">
            This is where TalentBoard Barcelona is born, the most innovative brick of the network.
          </p>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">3. TalentBoard Barcelona: A Response to a Problem No One Really Solves</h2>

      <p className="text-lg text-gray-700 leading-relaxed">
        To understand why TalentBoard exists, we must look at the work context in 2024–2030. We evolve in a market disrupted by:
      </p>

      <div className="bg-amber-50 p-8 rounded-2xl my-8 border-l-4 border-amber-600">
        <div className="space-y-4">
          <div>
            <h4 className="font-bold text-gray-900 mb-2">1. The Meteoric Rise of AI</h4>
            <p className="text-gray-700 text-sm">
              Skills become obsolete in a few months. Positions disappear. Jobs appear without a clear framework. 
              The speed of transformation exceeds the adaptation capacity of training.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2">2. A More Cautious Economy</h4>
            <p className="text-gray-700 text-sm">
              Companies recruit slower. They wait more. They internalize less. They take fewer risks.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2">3. A Generation (Gen Z and Alphas) Out of Sync with Existing HR Tools</h4>
            <p className="text-gray-700 text-sm">
              Today, no one wants to apply for 50 offers, write 20 cover letters, wait for automatic answers, 
              fight against CV sorting algorithms. Traditional methods – Indeed, Jobteaser, LinkedIn, ATS – are designed for the company, not the talent.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2">4. A Major Contradiction in the Educational System</h4>
            <p className="text-gray-700 text-sm">
              A Bachelor or Master lasts 3 to 5 years. During these 3 to 5 years: technologies change, market needs evolve, 
              skills taught sometimes become outdated, students pay for expensive training... only to sometimes discover that their 
              learning is already no longer sufficient.
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">4. Why TalentBoard is Different</h2>

      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-8 rounded-2xl my-8 border-l-4 border-indigo-600">
        <p className="text-lg text-gray-900 mb-4">
          TalentBoard Barcelona proposes an inverted model: rather than students looking for offers, companies directly find talents.
        </p>
        <h4 className="font-bold text-gray-900 mb-3">How Does It Work?</h4>
        <ul className="space-y-2 text-gray-800">
          <li>• Talents create a simple, visual, interactive profile.</li>
          <li>• Companies access a database of pre-qualified talents.</li>
          <li>• A modernized matching system allows "liking" a talent or company.</li>
          <li>• AI filters, proposes, analyzes.</li>
          <li>• The system works like a modern, fluid, intuitive app.</li>
        </ul>
        <p className="text-gray-700 mt-4 text-sm italic">
          Not like a job board from the 2000s.
        </p>
      </div>

      <div className="bg-green-50 p-6 rounded-xl my-8">
        <p className="text-gray-800 mb-2"><strong>The Result:</strong></p>
        <ul className="space-y-1 text-gray-700 text-sm">
          <li>• more visibility for young people,</li>
          <li>• less friction for companies,</li>
          <li>• more relevance in identifying profiles.</li>
        </ul>
        <p className="text-gray-800 mt-4">
          TalentBoard is then integrated into Learning Expeditions: a student who discovers Barcelona in immersion can then find 
          an internship, a job, a company or a project... in the city where they just learned. It's the perfect loop.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">5. French Tech → Network → TalentBoard: An Integrated System</h2>

      <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-green-50 p-8 rounded-2xl my-8">
        <p className="text-lg text-gray-900 mb-4">
          One might think these are three separate initiatives. In reality, it is a coherent ecosystem:
        </p>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
            <div>
              <h4 className="font-bold text-gray-900 mb-1">French Tech Barcelona</h4>
              <p className="text-gray-700 text-sm">opens doors, connects companies, creates legitimacy.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
            <div>
              <h4 className="font-bold text-gray-900 mb-1">Rusker Network</h4>
              <p className="text-gray-700 text-sm">orchestrates meetings, animates communities, creates bridges.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
            <div>
              <h4 className="font-bold text-gray-900 mb-1">TalentBoard Barcelona</h4>
              <p className="text-gray-700 text-sm">transforms these meetings into concrete opportunities for talents and companies.</p>
            </div>
          </div>
        </div>
        <p className="text-gray-800 mt-6">
          This system benefits everyone: schools, students, young graduates, local companies, the city of 
          Barcelona itself. It is a virtuous circle that did not exist. It is being built.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Conclusion: A Local Anchor for Global Impact</h2>

      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-2xl my-8 border-l-4 border-neutral-dark">
        <p className="text-lg text-gray-900 leading-relaxed">
          The partnership with French Tech Barcelona, the launch of TalentBoard and the creation of Rusker Network participate in the same 
          vision: making Barcelona a more accessible, connected, dynamic, and open ecosystem to the world.
        </p>
        <p className="text-lg text-gray-800 mt-4">
          In a context where the labor market is becoming fragile, where skills must be continuously updated, and where young people 
          sometimes lose their bearings, TalentBoard provides a modern and optimistic response. And Rusker Network creates the bridges that transform 
          these responses into reality.
        </p>
        <p className="text-lg text-gray-800 mt-4">
          It is this dynamic that Rusker will continue to carry in 2026: connecting, inspiring, activating, and creating real opportunities for all 
          those who want to understand, learn and work in the heart of Barcelona.
        </p>
      </div>

      <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-200">
        <p className="text-sm font-semibold text-blue-900 mb-2">📚 Related Articles</p>
        <ul className="space-y-2 text-sm">
          <li>
            <Link href="/blog/rusker-360-agency" className="text-blue-700 hover:text-blue-900 underline">
              → How Rusker Network integrates into Rusker's 360° architecture
            </Link>
          </li>
          <li>
            <Link href="/blog/barcelona-tech-ecosystem" className="text-blue-700 hover:text-blue-900 underline">
              → Discover the Barcelona tech ecosystem as a whole
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

function FrenchTechEcosystemArticleEs() {
  return (
    <div className="space-y-8">
      <p className="text-lg text-gray-700 leading-relaxed">
        El ecosistema tecnológico de Barcelona ha explotado en visibilidad en los últimos años. Startups, scale-ups, hubs de innovación, 
        inversores, escuelas internacionales... todo converge en una ciudad que atrae talentos, proyectos y empresas de todo el mundo.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        Pero un ecosistema no se resume en empresas. Un ecosistema vive gracias a sus conexiones. A su capacidad para poner en relación:
      </p>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl my-8 border-l-4 border-blue-600">
        <ul className="space-y-2 text-gray-800">
          <li>• las escuelas y las empresas,</li>
          <li>• los talentos y las oportunidades,</li>
          <li>• las organizaciones locales y los visitantes internacionales.</li>
        </ul>
      </div>

      <p className="text-lg text-gray-700 leading-relaxed">
        Es en esta lógica que se han construido tres ejes hoy inseparables de Rusker: French Tech Barcelona, 
        TalentBoard Barcelona y Rusker Network. Tres iniciativas que, juntas, refuerzan la dinámica local y crean puentes 
        duraderos al servicio de los talentos y las organizaciones.
      </p>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">1. French Tech Barcelona: un anclaje estratégico en el ecosistema</h2>
      
      <p className="text-lg text-gray-700 leading-relaxed">
        En 2024, Rusker comienza a colaborar con la French Tech Barcelona y su presidente, Guillaume Rostand. El objetivo es claro: 
        crear un vínculo estructurado entre el ecosistema francés de Barcelona, las escuelas internacionales y las empresas que buscan 
        comprender la dinámica local.
      </p>

      <div className="bg-blue-50 border-l-4 border-blue-600 p-8 my-8 rounded-r-xl">
        <h3 className="text-xl font-bold text-gray-900 mb-4">La French Tech tiene dos misiones esenciales:</h3>
        <div className="space-y-4">
          <div>
            <p className="text-lg text-gray-900 font-semibold mb-2">1. Hacer brillar a Francia en Barcelona</p>
            <p className="text-gray-700">
              Apoyando a sus emprendedores, sus talentos, sus empresas implantadas localmente y favoreciendo su integración.
            </p>
          </div>
          <div>
            <p className="text-lg text-gray-900 font-semibold mb-2">2. Hacer brillar a Barcelona en Francia y a nivel internacional</p>
            <p className="text-gray-700">
              Atrayendo al corazón de la ciudad a escuelas, talentos, organizaciones, líderes y tomadores de decisiones.
            </p>
          </div>
        </div>
      </div>

      <p className="text-lg text-gray-700 leading-relaxed">
        Esta asociación aporta tres palancas estructurantes para Rusker: el acceso a las empresas locales, la legitimidad institucional 
        para operar Learning Expeditions, la capacidad de conectar a nuestros clientes con los interlocutores adecuados.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        Pero la relación funciona en ambos sentidos. Para la French Tech, trabajar con una agencia capaz de estructurar Learning 
        Expeditions, eventos e iniciativas comunitarias permite dinamizar el ecosistema, atraer delegaciones extranjeras, reforzar 
        la visibilidad de las empresas locales, federar más comunidades en torno a Barcelona.
      </p>

      <div className="bg-neutral-dark text-white p-6 rounded-xl my-8">
        <p className="text-lg">Es un movimiento ganador-ganador, que da nacimiento a un tercer ladrillo: Rusker Network.</p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">2. Rusker Network: conectar, estructurar, amplificar</h2>

      <p className="text-lg text-gray-700 leading-relaxed">
        Rusker Network nace de una constatación simple: Barcelona es rica en talentos, en escuelas, en empresas, pero las conexiones no se 
        hacen naturalmente. Los actores existen. Son numerosos, brillantes, motivados. Pero a veces falta un puente, un intermediario, 
        un orquestador. Es este papel el que asume Rusker Network.
      </p>

      <div className="grid md:grid-cols-3 gap-6 my-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h4 className="font-bold text-gray-900 mb-3">A. El ecosistema: hacer Barcelona accesible</h4>
          <p className="text-gray-700 text-sm">
            Gracias a la French Tech Barcelona y a nuestros socios, Rusker Network construye pasarelas entre escuelas, startups, 
            scale-ups, VCs, incubadoras, hubs e instituciones públicas. Esto permite organizar encuentros de calidad durante las 
            Learning Expeditions, pero también activar sinergias para conferencias, side-events, paneles, visitas o 
            proyectos colaborativos.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h4 className="font-bold text-gray-900 mb-3">B. La comunidad: federar a los actores</h4>
          <p className="text-gray-700 text-sm">
            Afterworks, paneles, networking, charlas, side-events... Rusker Network alimenta una dinámica comunitaria que hace vivir la ciudad. 
            Las empresas necesitan visibilidad. Los talentos necesitan acceso. Las escuelas necesitan contactos. Rusker Network crea este espacio.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h4 className="font-bold text-gray-900 mb-3">C. El reclutamiento: responder a una fractura estructural</h4>
          <p className="text-gray-700 text-sm">
            Es aquí donde nace TalentBoard Barcelona, el ladrillo más innovador de la red.
          </p>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">3. El TalentBoard Barcelona: una respuesta a un problema que nadie resuelve realmente</h2>

      <p className="text-lg text-gray-700 leading-relaxed">
        Para entender por qué existe TalentBoard, hay que mirar el contexto del trabajo en 2024–2030. Evolucionamos en un mercado trastornado por:
      </p>

      <div className="bg-amber-50 p-8 rounded-2xl my-8 border-l-4 border-amber-600">
        <div className="space-y-4">
          <div>
            <h4 className="font-bold text-gray-900 mb-2">1. El ascenso fulgurante de la IA</h4>
            <p className="text-gray-700 text-sm">
              Las habilidades se vuelven obsoletas en pocos meses. Desaparecen puestos. Aparecen oficios sin un marco claro. 
              La velocidad de transformación supera la capacidad de adaptación de las formaciones.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2">2. Una economía más prudente</h4>
            <p className="text-gray-700 text-sm">
              Las empresas reclutan más despacio. Esperan más. Internalizan menos. Toman menos riesgos.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2">3. Una generación (Gen Z y Alphas) desfasada con las herramientas de RRHH existentes</h4>
            <p className="text-gray-700 text-sm">
              Hoy en día, nadie quiere postular a 50 ofertas, escribir 20 cartas de presentación, esperar respuestas automáticas, 
              luchar contra algoritmos de clasificación de CV. Los métodos tradicionales – Indeed, Jobteaser, LinkedIn, ATS – están diseñados para la empresa, no para el talento.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2">4. Una contradicción mayor en el sistema educativo</h4>
            <p className="text-gray-700 text-sm">
              Un Bachelor o un Máster dura de 3 a 5 años. Durante estos 3 a 5 años: las tecnologías cambian, las necesidades del mercado evolucionan, 
              las competencias enseñadas a veces quedan desfasadas, los estudiantes pagan formaciones caras... para a veces descubrir que su 
              aprendizaje ya no es suficiente.
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">4. Por qué TalentBoard es diferente</h2>

      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-8 rounded-2xl my-8 border-l-4 border-indigo-600">
        <p className="text-lg text-gray-900 mb-4">
          TalentBoard Barcelona propone un modelo invertido: en lugar de que los estudiantes busquen ofertas, son las empresas las que encuentran directamente a los talentos.
        </p>
        <h4 className="font-bold text-gray-900 mb-3">¿Cómo funciona?</h4>
        <ul className="space-y-2 text-gray-800">
          <li>• Los talentos crean un perfil simple, visual, interactivo.</li>
          <li>• Las empresas acceden a una base de talentos precalificados.</li>
          <li>• Un sistema de matching modernizado permite dar "like" a un talento o una empresa.</li>
          <li>• La IA filtra, propone, analiza.</li>
          <li>• El sistema funciona como una app moderna, fluida, intuitiva.</li>
        </ul>
        <p className="text-gray-700 mt-4 text-sm italic">
          No como un portal de ofertas de empleo de los años 2000.
        </p>
      </div>

      <div className="bg-green-50 p-6 rounded-xl my-8">
        <p className="text-gray-800 mb-2"><strong>El resultado:</strong></p>
        <ul className="space-y-1 text-gray-700 text-sm">
          <li>• más visibilidad para los jóvenes,</li>
          <li>• menos fricción para las empresas,</li>
          <li>• más relevancia en la identificación de los perfiles.</li>
        </ul>
        <p className="text-gray-800 mt-4">
          TalentBoard se integra luego en las Learning Expeditions: un estudiante que descubre Barcelona en inmersión puede encontrar 
          una pasantía, un empleo, una empresa o un proyecto... en la misma ciudad donde acaba de aprender. Es el bucle perfecto.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">5. French Tech → Network → TalentBoard: un sistema integrado</h2>

      <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-green-50 p-8 rounded-2xl my-8">
        <p className="text-lg text-gray-900 mb-4">
          Se podría pensar que se trata de tres iniciativas separadas. En realidad, es un ecosistema coherente:
        </p>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
            <div>
              <h4 className="font-bold text-gray-900 mb-1">La French Tech Barcelona</h4>
              <p className="text-gray-700 text-sm">abre las puertas, conecta las empresas, crea la legitimidad.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
            <div>
              <h4 className="font-bold text-gray-900 mb-1">Rusker Network</h4>
              <p className="text-gray-700 text-sm">orquesta los encuentros, anima las comunidades, crea las pasarelas.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
            <div>
              <h4 className="font-bold text-gray-900 mb-1">TalentBoard Barcelona</h4>
              <p className="text-gray-700 text-sm">transforma estos encuentros en oportunidades concretas para los talentos y las empresas.</p>
            </div>
          </div>
        </div>
        <p className="text-gray-800 mt-6">
          Este sistema beneficia a todo el mundo: a las escuelas, a los estudiantes, a los jóvenes graduados, a las empresas locales, a la ciudad de 
          Barcelona misma. Es un círculo virtuoso que no existía. Se está construyendo.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Conclusión: un anclaje local al servicio de un impacto global</h2>

      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-2xl my-8 border-l-4 border-neutral-dark">
        <p className="text-lg text-gray-900 leading-relaxed">
          La asociación con la French Tech Barcelona, el lanzamiento del TalentBoard y la creación de Rusker Network participan de una misma 
          visión: hacer de Barcelona un ecosistema más accesible, más conectado, más dinámico y más abierto al mundo.
        </p>
        <p className="text-lg text-gray-800 mt-4">
          En un contexto donde el mercado laboral se fragiliza, donde las competencias deben actualizarse continuamente y donde los jóvenes 
          pierden a veces sus referencias, TalentBoard aporta una respuesta moderna y optimista. Y Rusker Network crea los puentes que transforman 
          estas respuestas en realidad.
        </p>
        <p className="text-lg text-gray-800 mt-4">
          Es esta dinámica la que Rusker continuará llevando en 2026: conectar, inspirar, activar y crear verdaderas oportunidades para todos 
          aquellos que quieran comprender, aprender y trabajar en el corazón de Barcelona.
        </p>
      </div>

      <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-200">
        <p className="text-sm font-semibold text-blue-900 mb-2">📚 Artículos relacionados</p>
        <ul className="space-y-2 text-sm">
          <li>
            <Link href="/blog/rusker-360-agency" className="text-blue-700 hover:text-blue-900 underline">
              → Cómo Rusker Network se integra en la arquitectura 360° de Rusker
            </Link>
          </li>
          <li>
            <Link href="/blog/barcelona-tech-ecosystem" className="text-blue-700 hover:text-blue-900 underline">
              → Descubre el ecosistema tecnológico barcelonés en su conjunto
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

