import type { LegalDoc } from '@/components/LegalDocument'

/**
 * Privacy Policy — Rusker Travel, aligned with CGV Art. 16 and the data the
 * booking flow actually collects (identity, ID scan, company, billing, dietary,
 * emergency contact). GDPR + Spanish LOPDGDD. Update CONSENT_VERSIONS in
 * lib/consent.ts whenever this text changes.
 */

const fr: LegalDoc = {
  title: 'Politique de confidentialité',
  subtitle: 'Protection des données personnelles — RGPD (UE 2016/679) et LOPDGDD (Ley Orgánica 3/2018)',
  version: 'RUSKER TRAVEL, S.L. — Version 1.0 · 9 juillet 2026',
  intro: [
    { type: 'p', text: "La présente politique décrit comment Rusker Travel, S.L. traite vos données personnelles lorsque vous réservez une Learning Expedition sur app.rusker-travel.com. Elle complète l'article 16 des Conditions générales de vente et en fait partie intégrante." },
  ],
  sections: [
    {
      heading: '1. Responsable du traitement',
      blocks: [
        { type: 'p', text: 'Rusker Travel, S.L. — Carrer de l’Arc de Sant Agustí 3, 08001 Barcelone, Espagne — NIF B44897510 — agence de voyages FUE-2023-03315922.' },
        { type: 'p', text: 'Contact pour toute question relative aux données : info@rusker-travel.com, objet « PROTECTION DES DONNÉES ».' },
      ],
    },
    {
      heading: '2. Données que nous collectons',
      blocks: [
        { type: 'p', text: 'Dans le cadre de votre inscription, nous collectons :' },
        { type: 'list', items: [
          'Identité : prénom, nom, date de naissance, nationalité.',
          'Coordonnées : adresse email, numéro de téléphone.',
          "Pièce d'identité : copie du passeport ou de la carte nationale d'identité, numéro du document et date d'expiration.",
          'Données professionnelles : entreprise, fonction, gare de départ.',
          'Contact d’urgence : nom et téléphone de la personne à prévenir.',
          "Données de facturation : raison sociale, adresse de facturation et numéro de TVA intracommunautaire (facultatifs).",
          "Données relevant de catégories particulières : restrictions et régimes alimentaires, allergies et besoins médicaux que vous choisissez de nous communiquer.",
          'Données techniques liées au consentement : adresse IP, agent utilisateur et horodatage de votre acceptation des documents contractuels.',
        ] },
      ],
    },
    {
      heading: '3. Finalités et bases légales',
      blocks: [
        { type: 'table', head: ['Finalité', 'Base légale'], rows: [
          ["Gestion de l'inscription et exécution du Forfait", 'Exécution du contrat (art. 6.1.b RGPD)'],
          ['Transmission aux hôtels, transporteurs et restaurateurs pour les réservations', 'Exécution du contrat'],
          ["Émission du billet du sommet — transmission à AI Summit Alliance S.L., organisatrice de l'AI Summit Barcelona 2026", 'Exécution du contrat'],
          ['Registre documental des voyageurs et transmission au Ministère de l’Intérieur (plateforme SES.Hospedajes), en application du Real Decreto 933/2021', 'Obligation légale (art. 6.1.c RGPD)'],
          ["Listes d'accès et contrôles de sécurité des entreprises visitées", "Exécution du contrat et intérêt légitime de l'entreprise hôte"],
          ['Régimes alimentaires, allergies, besoins médicaux', 'Consentement explicite — catégories particulières (art. 9.2.a RGPD)'],
          ['Facturation et obligations comptables et fiscales', 'Obligation légale'],
          ['Preuve du consentement aux documents contractuels (journal de consentement)', 'Intérêt légitime (preuve) et obligation légale'],
          ['Photographies et vidéos identifiantes à des fins de communication', 'Consentement distinct — jamais exigé pour s’inscrire'],
          ['Prospection commerciale de Rusker Travel', 'Consentement, ou intérêt légitime pour les clients existants'],
        ] },
      ],
    },
    {
      heading: '4. Destinataires',
      blocks: [
        { type: 'p', text: "Rusker Travel ne vend ni ne loue vos données. Les transmissions sont limitées à ce qui est strictement nécessaire à l'exécution du Forfait, au respect des obligations légales et aux traitements pour lesquels vous avez consenti :" },
        { type: 'list', items: [
          "L'équipe Rusker Travel en charge de l'organisation.",
          'Les hôtels, transporteurs et restaurateurs prestataires du voyage.',
          "AI Summit Alliance S.L. pour l'émission de votre billet nominatif.",
          'Les entreprises visitées, pour les listes d’accès et contrôles de sécurité.',
          'Le Ministère de l’Intérieur espagnol (SES.Hospedajes), au titre du registre légal des voyageurs.',
        ] },
        { type: 'p', label: 'Sous-traitants techniques.', text: "Nos prestataires informatiques agissent sur instruction et sous contrat conforme à l'article 28 du RGPD : Stripe Payments Europe (paiement et facturation), Supabase (hébergement de la base de données et des documents, Union européenne), Resend (envoi des emails) et Vercel (hébergement du site)." },
      ],
    },
    {
      heading: '5. Durées de conservation',
      blocks: [
        { type: 'list', items: [
          "(a) Registre documental des voyageurs exigé par le Real Decreto 933/2021 (identité, numéro de document, nationalité, date de naissance, coordonnées, données de paiement) : trois (3) ans à compter du départ. Ces données ne peuvent être supprimées avant ce terme, en exécution d'une obligation légale.",
          "(b) Copies et numérisations de pièces d'identité recueillies pour les listes d'accès des entreprises visitées : supprimées dès que la visite a eu lieu, et au plus tard un (1) mois après la fin du Forfait. Les réservations non finalisées sont purgées automatiquement, et leurs documents supprimés, à bref délai.",
          '(c) Données de gestion contractuelle et comptable : durées légales de prescription et de conservation comptable.',
          '(d) Journal de consentement : conservé le temps nécessaire à la preuve, dans les mêmes limites légales.',
          '(e) Données de prospection : trois (3) ans après le dernier contact.',
        ] },
      ],
    },
    {
      heading: '6. Sécurité',
      blocks: [
        { type: 'p', text: "Les données sont hébergées dans l'Union européenne (Supabase, région Paris). Les copies de pièces d'identité sont stockées dans un espace privé, non public, accessible uniquement au moyen de liens signés à durée limitée réservés à l'équipe habilitée. L'accès à l'administration est protégé par une authentification à code à usage unique restreinte à une liste d'adresses autorisées." },
      ],
    },
    {
      heading: '7. Transferts hors EEE',
      blocks: [
        { type: 'p', text: "Aucun transfert de vos données hors de l'Espace économique européen n'est effectué sans garanties appropriées au sens du chapitre V du RGPD." },
      ],
    },
    {
      heading: '8. Vos droits',
      blocks: [
        { type: 'p', text: "Vous disposez des droits d'accès, de rectification, d'effacement, de limitation, d'opposition et de portabilité, ainsi que du droit de retirer votre consentement à tout moment, sans que ce retrait n'affecte la licéité des traitements antérieurs. Ces droits s'exercent dans les limites des obligations légales de conservation visées au point 5 (a)." },
        { type: 'p', text: 'Pour exercer vos droits : info@rusker-travel.com, objet « PROTECTION DES DONNÉES ». Nous répondons dans un délai de trente (30) jours.' },
        { type: 'p', text: "Vous pouvez introduire une réclamation auprès de l'Agencia Española de Protección de Datos (www.aepd.es) ou de l'autorité de contrôle de votre pays de résidence (en France, la CNIL — www.cnil.fr)." },
      ],
    },
    {
      heading: '9. Modifications',
      blocks: [
        { type: 'p', text: 'La présente politique peut être mise à jour. La version applicable est celle en vigueur au jour de votre inscription ; sa référence est enregistrée dans notre journal de consentement.' },
      ],
    },
  ],
}

const en: LegalDoc = {
  title: 'Privacy Policy',
  subtitle: 'Personal data protection — GDPR (EU 2016/679) and Spanish LOPDGDD (Ley Orgánica 3/2018)',
  version: 'RUSKER TRAVEL, S.L. — Version 1.0 · 9 July 2026',
  intro: [
    { type: 'p', text: 'This policy describes how Rusker Travel, S.L. processes your personal data when you book a Learning Expedition on app.rusker-travel.com. It complements Article 16 of the General Terms of Sale and forms an integral part of it.' },
  ],
  sections: [
    {
      heading: '1. Data controller',
      blocks: [
        { type: 'p', text: 'Rusker Travel, S.L. — Carrer de l’Arc de Sant Agustí 3, 08001 Barcelona, Spain — NIF B44897510 — travel agency FUE-2023-03315922.' },
        { type: 'p', text: 'Contact for any data-related question: info@rusker-travel.com, subject "DATA PROTECTION".' },
      ],
    },
    {
      heading: '2. Data we collect',
      blocks: [
        { type: 'p', text: 'As part of your registration, we collect:' },
        { type: 'list', items: [
          'Identity: first name, last name, date of birth, nationality.',
          'Contact details: email address, phone number.',
          'Identity document: copy of the passport or national ID card, document number and expiry date.',
          'Professional data: company, position, departure station.',
          'Emergency contact: name and phone of the person to notify.',
          'Billing data: legal name, billing address and EU VAT number (optional).',
          'Special-category data: dietary requirements, allergies and medical needs that you choose to share with us.',
          'Consent-related technical data: IP address, user agent and timestamp of your acceptance of the contractual documents.',
        ] },
      ],
    },
    {
      heading: '3. Purposes and legal bases',
      blocks: [
        { type: 'table', head: ['Purpose', 'Legal basis'], rows: [
          ['Managing registration and performing the Package', 'Performance of the contract (art. 6.1.b GDPR)'],
          ['Transmission to hotels, carriers and caterers for bookings', 'Performance of the contract'],
          ['Summit ticket issuance — transmission to AI Summit Alliance S.L., organizer of the AI Summit Barcelona 2026', 'Performance of the contract'],
          ['Traveller record and transmission to the Ministry of the Interior (SES.Hospedajes platform), under Real Decreto 933/2021', 'Legal obligation (art. 6.1.c GDPR)'],
          ['Access lists and security checks of visited companies', 'Performance of the contract and host company’s legitimate interest'],
          ['Dietary requirements, allergies, medical needs', 'Explicit consent — special categories (art. 9.2.a GDPR)'],
          ['Invoicing and accounting/tax obligations', 'Legal obligation'],
          ['Proof of consent to the contractual documents (consent log)', 'Legitimate interest (proof) and legal obligation'],
          ['Identifying photographs and videos for communication', 'Separate consent — never required to register'],
          ['Rusker Travel marketing', 'Consent, or legitimate interest for existing customers'],
        ] },
      ],
    },
    {
      heading: '4. Recipients',
      blocks: [
        { type: 'p', text: 'Rusker Travel does not sell or rent your data. Transmissions are limited to what is strictly necessary to perform the Package, comply with legal obligations and carry out the processing you consented to:' },
        { type: 'list', items: [
          'The Rusker Travel team in charge of organization.',
          'The hotels, carriers and caterers providing the trip.',
          'AI Summit Alliance S.L. for issuing your personal ticket.',
          'The visited companies, for access lists and security checks.',
          'The Spanish Ministry of the Interior (SES.Hospedajes), for the legal traveller record.',
        ] },
        { type: 'p', label: 'Technical processors.', text: 'Our IT providers act on instruction and under a contract compliant with Article 28 GDPR: Stripe Payments Europe (payment and invoicing), Supabase (database and document hosting, European Union), Resend (email delivery) and Vercel (site hosting).' },
      ],
    },
    {
      heading: '5. Retention periods',
      blocks: [
        { type: 'list', items: [
          '(a) Traveller record required by Real Decreto 933/2021 (identity, document number, nationality, date of birth, contact details, payment data): three (3) years from departure. This data cannot be deleted before that term, in fulfilment of a legal obligation.',
          '(b) Copies and scans of ID documents collected for the visited companies’ access lists: deleted as soon as the visit has taken place, and at the latest one (1) month after the end of the Package. Uncompleted bookings are purged automatically, and their documents deleted, at short notice.',
          '(c) Contractual and accounting management data: statutory limitation and accounting retention periods.',
          '(d) Consent log: kept as long as necessary for proof, within the same legal limits.',
          '(e) Marketing data: three (3) years after the last contact.',
        ] },
      ],
    },
    {
      heading: '6. Security',
      blocks: [
        { type: 'p', text: 'Data is hosted in the European Union (Supabase, Paris region). ID document copies are stored in a private, non-public space, accessible only through time-limited signed links restricted to authorized staff. Access to the admin is protected by one-time-code authentication limited to an allowlist of authorized addresses.' },
      ],
    },
    {
      heading: '7. Transfers outside the EEA',
      blocks: [
        { type: 'p', text: 'No transfer of your data outside the European Economic Area is carried out without appropriate safeguards within the meaning of Chapter V of the GDPR.' },
      ],
    },
    {
      heading: '8. Your rights',
      blocks: [
        { type: 'p', text: 'You have the rights of access, rectification, erasure, restriction, objection and portability, as well as the right to withdraw your consent at any time, without such withdrawal affecting the lawfulness of prior processing. These rights are exercised within the limits of the legal retention obligations referred to in point 5 (a).' },
        { type: 'p', text: 'To exercise your rights: info@rusker-travel.com, subject "DATA PROTECTION". We respond within thirty (30) days.' },
        { type: 'p', text: 'You may lodge a complaint with the Agencia Española de Protección de Datos (www.aepd.es) or the supervisory authority of your country of residence (in France, the CNIL — www.cnil.fr).' },
      ],
    },
    {
      heading: '9. Changes',
      blocks: [
        { type: 'p', text: 'This policy may be updated. The applicable version is the one in force on the day of your registration; its reference is recorded in our consent log.' },
      ],
    },
  ],
}

export const PRIVACY = { fr, en } as const
