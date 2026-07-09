import type { LegalDoc } from '@/components/LegalDocument'

/**
 * Conditions Générales de Vente — Rusker Travel, LEX AI Summit Barcelona 2026,
 * individual registration, v1.0 (2026-07-09). French is the source; English is a
 * faithful translation. Per Art. 18.4 each language version is authoritative in the
 * language the Learning Expedition was sold. Update CONSENT_VERSIONS in lib/consent.ts
 * whenever this text changes.
 */

const fr: LegalDoc = {
  title: 'Conditions générales de vente',
  subtitle: 'Inscription individuelle — Learning Expedition · AI Summit Barcelona 2026 · Barcelone, du 21 au 24 septembre 2026',
  version: 'RUSKER TRAVEL, S.L. — Version 1.0 · 9 juillet 2026',
  sections: [
    {
      heading: "Préambule — Identification de l'Organisateur",
      blocks: [
        {
          type: 'table',
          head: ['Élément', 'Information'],
          rows: [
            ['Dénomination', 'RUSKER TRAVEL, S.L. (nom commercial : Rusker Travel)'],
            ['Siège social', "Carrer de l'Arc de Sant Agustí 3, 08001 Barcelone, Espagne"],
            ['NIF', 'B44897510'],
            ['Registre du commerce', 'Barcelone — Tome 48705, Folio 221, Section 8, Feuille 593224, Inscription 1'],
            ['Agence de voyages — code FUE', 'FUE-2023-03315922'],
            ['Responsabilité civile', 'AXA Seguros Generales, S.A. de Seguros y Reaseguros — police n° 85131623'],
            ['Garantie contre l’insolvabilité', 'AXA Seguros Generales, S.A. de Seguros y Reaseguros — police de caución n° 85132484 — 100 000 €'],
            ['Contact', 'info@rusker-travel.com — +34 663 622 746 — lundi au vendredi, 9h00–19h00 (CET)'],
          ],
        },
      ],
    },
    {
      heading: 'Article préliminaire — Nature et qualification du contrat',
      blocks: [
        { type: 'p', label: 'P.1. Objet.', text: "Les présentes Conditions Générales de Vente (les « CGV ») régissent l'inscription individuelle d'une personne physique à la Learning Expedition organisée par Rusker Travel autour de l'AI Summit Barcelona 2026, à Barcelone, du 21 au 24 septembre 2026 (la « Learning Expedition » ou le « Forfait »)." },
        { type: 'p', label: 'P.2. Qualification juridique.', text: "La Learning Expedition réunit, pour un prix forfaitaire unique, au moins deux types différents de services de voyage. Elle constitue un voyage à forfait (« viaje combinado ») au sens du Real Decreto Legislativo 1/2007 (TRLGDCU) et de la Directive (UE) 2015/2302. Les dispositions impératives du Livre IV du TRLGDCU s'appliquent et priment sur toute stipulation contraire des présentes." },
        { type: 'p', label: "P.3. Qualité de l'Organisateur.", text: 'Rusker Travel agit en qualité d’organisateur (« organizador ») et contracte en son nom propre, en tant que partie principale.' },
        { type: 'p', label: 'P.4. Information précontractuelle.', text: "Avant que le Participant ne soit lié, Rusker Travel lui remet, sur support durable, le formulaire d'information normalisée reproduit à l'Annexe 2. Ce formulaire fait partie intégrante du contrat." },
        { type: 'p', label: 'P.5. Déclaration de liens.', text: "Le Participant est informé que Rusker Travel S.L. acquiert les billets d'accès au sommet auprès d'AI Summit Alliance S.L., organisatrice de l'AI Summit Barcelona 2026, et que M. Adam Hruška est administrateur de Rusker Travel S.L. et intervient également au sein d'AI Summit Alliance S.L. Cette information est communiquée à des fins de transparence. Elle n'affecte pas les droits du Participant, et notamment pas son droit au remboursement intégral dans les cas prévus aux articles 5 et 9, que Rusker Travel assume en toute hypothèse sur ses propres fonds." },
      ],
    },
    {
      heading: 'Article 1 — Parties, formation du contrat',
      blocks: [
        { type: 'p', label: '1.1. Le Participant.', text: "Personne physique majeure (18 ans révolus) qui s'inscrit en son nom propre et pour son propre compte. Le Participant est l'unique partie cocontractante de l'Organisateur. Il n'existe aucun client intermédiaire." },
        { type: 'p', label: '1.2. Inscription.', text: "L'inscription effectuée sur rusker-travel.com constitue une offre du Participant. Le contrat est formé à la réunion des deux conditions suivantes : (i) encaissement effectif du prix intégral prévu à l'article 3.2, et (ii) envoi par Rusker Travel d'une confirmation d'inscription écrite sur support durable. Avant de valider son paiement, le Participant confirme avoir reçu le formulaire d'information normalisée reproduit à l'Annexe 2." },
        { type: 'p', label: '1.3. Droit de refus.', text: "Rusker Travel peut refuser une inscription pour un motif objectif : capacité atteinte, non-respect des conditions de participation publiées, incompatibilité avec les règles d'accès ou de sécurité d'une entreprise visitée, ou comportement antérieur ayant justifié une exclusion. Le refus ne peut jamais reposer sur un motif discriminatoire. En cas de refus, toute somme versée est intégralement remboursée dans un délai de quatorze (14) jours." },
        { type: 'p', label: "1.4. Liste d'attente.", text: "Les inscriptions sont traitées par ordre d'arrivée. En cas de dépassement de la capacité, le Participant est placé en liste d'attente ; aucune somme n'est prélevée avant qu'une place ne se libère et que le Participant n'ait confirmé." },
        { type: 'p', label: '1.5. Ordre de priorité des documents.', text: "En cas de contradiction, prévalent dans cet ordre : (i) les dispositions impératives du Livre IV du TRLGDCU ; (ii) le formulaire d'information normalisée ; (iii) la confirmation d'inscription ; (iv) les présentes CGV ; (v) le programme publié." },
      ],
    },
    {
      heading: 'Article 2 — Contenu du Forfait',
      blocks: [
        { type: 'p', label: '2.1. Prestations incluses.', text: 'Sauf mention contraire dans la confirmation d’inscription, le Forfait comprend :' },
        { type: 'list', items: [
          "L'hébergement : trois (3) nuits (21, 22 et 23 septembre 2026) dans un établissement de la chaîne Catalonia, catégorie 4 étoiles, situé à Barcelone, en chambre individuelle, petit-déjeuner inclus. L'établissement précis est communiqué au Participant au plus tard le 7 août 2026.",
          'Le transport terrestre à Barcelone : transferts et véhicule affrété pour les visites d’entreprises et les déplacements du programme.',
          "Un billet d'accès nominatif de catégorie Gold à l'AI Summit Barcelona 2026 (22 et 23 septembre 2026).",
          "Le programme de la Learning Expedition : visites d'entreprises, ateliers, sessions d'experts, séances de restitution.",
          'Les repas expressément mentionnés au programme.',
          'Un coordinateur Rusker Travel présent sur place pendant toute la durée du Forfait.',
        ] },
        { type: 'p', label: '2.2. Prestations non incluses.', text: 'Ne sont notamment pas comprises :' },
        { type: 'list', items: [
          'Le transport international aller et retour jusqu’à Barcelone (vol, train), organisé par le Participant.',
          "Les assurances de voyage, de santé, d'annulation, d'interruption et de rapatriement.",
          'Les dépenses à caractère personnel et les boissons hors repas mentionnés au programme.',
          'Les visas, formalités administratives et sanitaires, et leurs frais.',
          'La taxe de séjour, si elle n’est pas expressément mentionnée comme incluse.',
          'Toute prestation non expressément énumérée à l’article 2.1.',
        ] },
        { type: 'p', label: '2.3. Billet AI Summit Barcelona 2026.', text: "Le billet d'accès au sommet, de catégorie Gold, est une composante du Forfait. Rusker Travel l'acquiert auprès d'AI Summit Alliance S.L., organisatrice du sommet, et le fait émettre au nom du Participant, à qui il est remis, le 22 août 2026 (J-30). Il est nominatif et incessible, sous réserve de l'article 7, et soumis aux conditions d'accès des participants au sommet, communiquées au Participant avant son inscription. La valeur de la composante « billet » s'élève à 650 €, soit environ 31 % du prix du Forfait ; elle est indiquée distinctement dans le formulaire d'information normalisée." },
        { type: 'p', label: '2.4. Programme et substitutions.', text: "Les visites d'entreprises et les interventions d'experts dépendent de la disponibilité de tiers. En cas d'indisponibilité, Rusker Travel proposera une alternative de secteur, de niveau d'expertise et de valeur pédagogique équivalents. Une telle substitution ne constitue pas une modification significative et n'ouvre droit à aucune réduction ni indemnisation. En revanche, l'annulation ou le report de l'AI Summit Barcelona 2026 constitue une modification significative d'un élément essentiel, régie par l'article 5." },
      ],
    },
    {
      heading: 'Article 3 — Prix, TVA, paiement',
      blocks: [
        { type: 'p', label: '3.1. Prix ferme et définitif.', text: "Le prix du Forfait est de 2 100 € par personne, toutes taxes comprises, en chambre individuelle. Il s'agit d'un prix fermé : aucun frais de dossier, aucun acompte distinct, aucun supplément chambre individuelle et aucun frais annexe ne s'y ajoutent. En application du régime spécial des agences de voyages (articles 141 à 147 de la Ley 37/1992), la TVA est assise sur la marge de Rusker Travel et n'est pas ventilée sur la facture. Aucune TVA déductible n'est transmise au Participant ni à son employeur." },
        { type: 'p', label: '3.2. Paiement.', text: "Le prix est payable en une seule fois, en totalité, au moment de l'inscription. Le contrat n'est formé qu'après encaissement effectif (article 1.2)." },
        { type: 'p', label: '3.3. Absence de frais de dossier.', text: "Aucune somme n'est retenue au titre de frais de dossier, de frais d'inscription ou de frais de traitement. Les seules sommes que Rusker Travel peut retenir sont les frais de résolution prévus à l'article 6.3, et uniquement dans les conditions et limites qui y sont fixées." },
        { type: 'p', label: '3.4. Échec du paiement.', text: "En cas d'échec, de rejet ou de rétrofacturation du paiement, le contrat n'est pas formé ou, s'il l'était, est résolu de plein droit. Aucun frais n'est retenu, la place est remise à disposition et le Participant en est informé par écrit." },
        { type: 'p', label: '3.5. Révision du prix.', text: 'Conformément au TRLGDCU :' },
        { type: 'list', items: [
          '(a) Le prix peut être révisé, à la hausse comme à la baisse, exclusivement en raison de : (i) l’évolution du coût du transport de passagers résultant du prix du carburant ou d’autres sources d’énergie ; (ii) l’évolution des taxes et redevances dues à des tiers non directement impliqués ; (iii) l’évolution des taux de change applicables au Forfait.',
          '(b) Aucune augmentation ne peut intervenir dans les vingt (20) jours précédant le départ, soit après le 1er septembre 2026.',
          '(c) Toute augmentation est notifiée sur support durable, motivée et accompagnée du calcul justificatif.',
          '(d) Rusker Travel est tenue de répercuter toute baisse portant sur les mêmes postes, déduction faite des frais administratifs réels de remboursement, sur demande du Participant.',
          '(e) Si l’augmentation excède 8 % du prix total, le Participant peut résoudre le contrat sans frais et obtenir le remboursement intégral dans un délai de quatorze (14) jours, ou accepter un forfait de substitution. Il notifie son choix dans le délai indiqué dans la notification, qui ne peut être inférieur à sept (7) jours.',
        ] },
        { type: 'p', label: '3.6. Absence de clause de renégociation énergétique.', text: "Aucune clause permettant à Rusker Travel de renégocier les conditions financières ou de résilier le contrat en raison d'une hausse du coût de l'énergie ne figure aux présentes. L'article 3.5 constitue le mécanisme exclusif de révision du prix." },
      ],
    },
    {
      heading: 'Article 4 — Confirmation du départ : départ garanti',
      blocks: [
        { type: 'p', label: '4.1. Départ garanti.', text: "Le départ de la Learning Expedition est confirmé dès l'envoi de la confirmation d'inscription. Rusker Travel ne subordonne pas la tenue du Forfait à l'atteinte d'un nombre minimum de Participants et ne se réserve aucun droit d'annulation pour effectif insuffisant." },
        { type: 'p', label: '4.2. Conséquence.', text: "Les seuls cas d'annulation à l'initiative de Rusker Travel sont ceux prévus à l'article 9." },
      ],
    },
    {
      heading: "Article 5 — Annulation ou report de l'AI Summit Barcelona 2026",
      blocks: [
        { type: 'p', label: '5.1. Élément essentiel.', text: "L'AI Summit Barcelona 2026 est organisé par un tiers. L'accès au sommet constitue un élément essentiel du Forfait." },
        { type: 'p', label: '5.2. Avant le départ.', text: "Si le sommet est annulé, ou reporté de plus de sept (7) jours, avant le départ, cette circonstance constitue une modification significative d'un élément essentiel. Rusker Travel en informe le Participant sans retard injustifié et lui ouvre, dans un délai qui ne peut être inférieur à sept (7) jours — ou, si le départ intervient plus tôt, jusqu'à la veille du départ — le choix entre :" },
        { type: 'list', items: [
          '(a) accepter un forfait de substitution de qualité équivalente ou supérieure sans supplément, ou de qualité inférieure moyennant une réduction de prix appropriée ; ou',
          '(b) résoudre le contrat et obtenir le remboursement intégral de toutes les sommes versées, frais de dossier et composante « billet » inclus, dans un délai de quatorze (14) jours calendaires.',
        ] },
        { type: 'p', text: "Si l'annulation ou le report résulte de circonstances inévitables et extraordinaires, aucune indemnisation complémentaire n'est due. À défaut, le Participant a droit à l'indemnisation prévue par le TRLGDCU." },
        { type: 'p', label: '5.3. Après le départ.', text: "Si le sommet est annulé ou interrompu après le début du Forfait, l'article 10 s'applique." },
      ],
    },
    {
      heading: 'Article 6 — Résolution du contrat par le Participant',
      blocks: [
        { type: 'p', label: '6.1. Droit de résolution.', text: "Le Participant peut résoudre le contrat à tout moment avant le début du Forfait, moyennant le paiement des frais de résolution prévus à l'article 6.3. Le Participant est informé que les forfaits de voyage ne sont pas soumis au droit de rétractation prévu en matière de vente à distance ; l'article 6.1 lui ouvre en contrepartie une faculté de sortie inconditionnelle." },
        { type: 'p', label: '6.2. Modalités.', text: "La résolution est notifiée par courriel à info@rusker-travel.com. La date de réception du courriel constitue la date de résolution. Aucune lettre recommandée n'est exigée." },
        { type: 'p', label: '6.3. Barème des frais de résolution.', text: "Les frais suivants sont fixés par référence aux dates auxquelles les engagements de Rusker Travel auprès de ses fournisseurs deviennent irrévocables — soit, pour l'essentiel, le 22 août 2026 (J-30), date à laquelle les chambres ne sont plus libérables et le billet du sommet est émis :" },
        { type: 'table', head: ['Date de réception de la notification', 'Frais de résolution retenus'], rows: [
          ['Jusqu’au 21 août 2026 (J-31) inclus', 'Aucun frais — remboursement intégral de 2 100 €'],
          ['Du 22 août au 6 septembre 2026 (J-30 à J-15)', '50 % du prix, soit 1 050 € — remboursement de 1 050 €'],
          ['Du 7 au 13 septembre 2026 (J-14 à J-8)', '75 % du prix, soit 1 575 € — remboursement de 525 €'],
          ['À compter du 14 septembre 2026 (J-7), ou non-présentation', '100 % du prix, soit 2 100 € — aucun remboursement'],
        ] },
        { type: 'p', text: "Jusqu'au 21 août 2026 inclus, la résolution est donc entièrement gratuite. À compter du 22 août 2026, les chambres réservées ne peuvent plus être libérées et le billet du sommet est émis au nom du Participant : les frais ci-dessus correspondent aux coûts que Rusker Travel a alors définitivement engagés." },
        { type: 'p', label: '6.4. Composante « billet ».', text: "La valeur du billet (650 €) est comprise dans le prix du Forfait et dans les pourcentages de l'article 6.3. Elle ne fait l'objet d'aucune retenue distincte ni supplémentaire. Lorsque la résolution intervient à compter du 22 août 2026 (J-30), date d'émission du billet, celui-ci demeure acquis au Participant, qui conserve la faculté d'assister au sommet par ses propres moyens." },
        { type: 'p', label: '6.5. Résolution sans frais (circonstances inévitables et extraordinaires).', text: "Si des circonstances inévitables et extraordinaires survenant à Barcelone ou à proximité immédiate affectent de manière significative l'exécution du Forfait, le Participant peut résoudre le contrat avant le départ sans payer aucun frais de résolution, et obtenir le remboursement intégral de toutes les sommes versées, frais de dossier inclus, dans un délai de quatorze (14) jours calendaires. Aucune indemnisation complémentaire n'est due." },
        { type: 'p', label: '6.6. Plafond et réduction en cas de revente.', text: "Les frais de l'article 6.3 constituent un plafond et non un forfait dû en toute hypothèse. Ils ne peuvent en aucun cas excéder le prix du Forfait diminué des économies de coûts réellement réalisées et des recettes réellement tirées de la réattribution de la place. Lorsque Rusker Travel revend tout ou partie de la place résolue, elle rembourse au Participant le montant correspondant, déduction faite de 75 € de frais administratifs et des coûts irrécupérables." },
        { type: 'p', label: '6.7. Prestations non consommées.', text: "Aucun remboursement n'est dû au titre d'une prestation non consommée du fait du Participant, sous réserve de l'article 10." },
      ],
    },
    {
      heading: 'Article 7 — Cession du contrat à un autre voyageur',
      blocks: [
        { type: 'p', label: '7.1. Principe.', text: 'Le Participant peut céder son contrat à une personne remplissant toutes les conditions applicables au Forfait, moyennant un préavis écrit d’au moins sept (7) jours calendaires avant le départ, soit au plus tard le 14 septembre 2026.' },
        { type: 'p', label: '7.2. Solidarité.', text: "Le prix étant intégralement acquitté à l'inscription, la cession n'emporte aucun solde à payer. Le cédant et le cessionnaire demeurent solidairement responsables des seuls frais supplémentaires effectivement causés par la cession. Le remboursement du cédant par le cessionnaire relève de leur seul accord et n'engage pas Rusker Travel." },
        { type: 'p', label: '7.3. Frais.', text: 'Rusker Travel informe le cédant du coût réel de la cession. Ces frais doivent être raisonnables et ne peuvent excéder le coût effectivement supporté. Rusker Travel en fournit la justification.' },
        { type: 'p', label: '7.4. Conditions.', text: "Le cessionnaire doit satisfaire aux exigences d'accès et de sécurité des entreprises visitées ainsi qu'aux conditions d'accès des participants au sommet. Rusker Travel fait procéder à la substitution du nom sur le billet. Les frais éventuels de réémission sont facturés à leur coût réel, sur justificatif." },
      ],
    },
    {
      heading: 'Article 8 — Modifications à l’initiative du Participant',
      blocks: [
        { type: 'p', label: '8.1.', text: 'La correction d’une erreur matérielle sur le nom du Participant est gratuite.' },
        { type: 'p', label: '8.2.', text: 'Toute autre modification constitue une résolution suivie d’une nouvelle inscription, et relève du barème de l’article 6.3.' },
      ],
    },
    {
      heading: 'Article 9 — Modification et annulation à l’initiative de l’Organisateur',
      blocks: [
        { type: 'p', label: '9.1. Modifications insignifiantes.', text: "Rusker Travel peut apporter au Forfait des modifications insignifiantes : réaménagement des horaires, modification de l'ordre des sessions, substitution d'un intervenant ou d'une entreprise visitée dans les conditions de l'article 2.4, remplacement de l'hôtel par un établissement de catégorie équivalente ou supérieure situé dans la même zone. Elles sont notifiées sur support durable et n'ouvrent droit à aucune indemnisation." },
        { type: 'p', label: '9.2. Modifications significatives.', text: "Si Rusker Travel doit modifier de manière significative un élément essentiel du Forfait, ne peut satisfaire une exigence particulière qu'elle avait acceptée, ou doit augmenter le prix de plus de 8 %, le Participant peut, dans un délai qui ne peut être inférieur à sept (7) jours — ou, si le départ intervient plus tôt, jusqu'à la veille du départ — : (a) accepter la modification ; (b) accepter un forfait de substitution ; ou (c) résoudre le contrat sans frais et obtenir le remboursement intégral dans un délai de quatorze (14) jours. Le silence du Participant ne vaut acceptation que si la notification indiquait expressément le délai et la conséquence du silence." },
        { type: 'p', label: '9.3. Effectif insuffisant.', text: "Sans objet. Rusker Travel ne se réserve pas le droit d'annuler la Learning Expedition pour effectif insuffisant (article 4)." },
        { type: 'p', label: '9.4. Annulation pour circonstances inévitables et extraordinaires.', text: "Rusker Travel rembourse l'intégralité des sommes versées dans un délai de quatorze (14) jours. Aucune indemnisation n'est due." },
        { type: 'p', label: '9.5. Annulation pour tout autre motif.', text: "Rusker Travel rembourse l'intégralité des sommes versées dans un délai de quatorze (14) jours et verse en outre l'indemnisation prévue par le TRLGDCU, sauf à démontrer que l'annulation relève de l'article 9.4." },
      ],
    },
    {
      heading: 'Article 10 — Exécution, non-conformité, responsabilité',
      blocks: [
        { type: 'p', label: "10.1. Responsabilité de l'Organisateur.", text: "Rusker Travel est responsable de l'exécution de l'ensemble des services de voyage compris dans le Forfait, qu'ils soient exécutés par elle-même ou par des prestataires tiers." },
        { type: 'p', label: '10.2. Signalement.', text: "Le Participant informe le coordinateur sur place de toute non-conformité, sans retard injustifié. Ses coordonnées figurent dans le carnet de voyage, adressé au plus tard le 14 septembre 2026. Le défaut de signalement peut réduire le montant de la réduction de prix ou des dommages et intérêts lorsqu'un signalement rapide aurait évité ou diminué le dommage. Il n'éteint pas le droit du Participant." },
        { type: 'p', label: '10.3. Remèdes.', text: "Rusker Travel remédie à la non-conformité, sauf impossibilité ou coût disproportionné. À défaut, le Participant a droit à une réduction de prix et, le cas échéant, à des dommages et intérêts." },
        { type: 'p', label: '10.4. Assistance.', text: "Rusker Travel apporte sans retard injustifié une assistance appropriée au Participant en difficulté : informations sur les services de santé, les autorités locales et l'assistance consulaire ; aide à la communication à distance ; recherche de solutions alternatives. Une contribution raisonnable ne peut être facturée que si la difficulté a été causée intentionnellement ou par la négligence du Participant." },
        { type: 'p', label: '10.5. Limitation.', text: "Sauf préjudice corporel et dommage causé intentionnellement ou par négligence, et sous réserve des limites résultant des conventions internationales applicables, l'indemnisation est limitée à trois fois le prix total du Forfait, soit 6 300 € par Participant." },
        { type: 'p', label: '10.6. Exonérations.', text: "La responsabilité de Rusker Travel n'est pas engagée lorsque la non-conformité est imputable au Participant, à un tiers étranger à la fourniture des services de voyage et revêtant un caractère imprévisible et inévitable, ou à des circonstances inévitables et extraordinaires." },
        { type: 'p', label: '10.7. Prescription.', text: "Les actions fondées sur le présent contrat se prescrivent par deux (2) ans à compter de la date à laquelle le Forfait devait prendre fin." },
      ],
    },
    {
      heading: 'Article 11 — Transport et hébergement',
      blocks: [
        { type: 'p', label: '11.1. Transport terrestre.', text: 'Le transport terrestre à Barcelone est affrété par Rusker Travel. Les Participants se conforment aux consignes des conducteurs. Sont notamment interdits, conformément au droit espagnol : la consommation d’alcool à bord, le fait de fumer, et le fait de rester debout lorsque le véhicule est en mouvement.' },
        { type: 'p', label: '11.2. Transport d’approche.', text: "Le transport aller et retour jusqu'à Barcelone est organisé par le Participant, qui prévoit une marge suffisante. Rusker Travel n'est pas responsable des conséquences d'un retard de son transporteur, et aucun remboursement n'est dû au titre des sessions manquées de ce fait." },
        { type: 'p', label: '11.3. Hébergement.', text: "Trois (3) nuits dans un établissement de la chaîne Catalonia, catégorie 4 étoiles, situé à Barcelone. L'établissement précis est communiqué au Participant au plus tard le 7 août 2026 ; à défaut, ou en cas d'indisponibilité, Rusker Travel fournit un hébergement de catégorie équivalente ou supérieure dans la même zone, sans supplément. Le prix s'entend en chambre individuelle. Aucun partage de chambre n'est proposé et aucun supplément chambre individuelle n'est facturé." },
        { type: 'p', label: '11.4. Caution hôtelière.', text: "L'hôtel peut exiger du Participant, directement, une caution destinée à couvrir les extras et les éventuelles dégradations. Rusker Travel n'en assure ni la gestion ni la restitution." },
        { type: 'p', label: '11.5. Bagages.', text: 'Chaque Participant demeure responsable de ses bagages et objets personnels. Toute perte est signalée immédiatement au coordinateur sur place.' },
      ],
    },
    {
      heading: 'Article 12 — Obligations et comportement du Participant',
      blocks: [
        { type: 'p', label: '12.1. Engagement.', text: "Le Participant assiste aux sessions prévues, respecte les horaires, interagit activement avec les intervenants, adopte un comportement professionnel lors des visites d'entreprises et porte une tenue conforme aux exigences des hôtes." },
        { type: 'p', label: '12.2. Confidentialité et interdiction d’enregistrer.', text: "Les informations communiquées par les entreprises visitées sont confidentielles. Le Participant s'interdit de les divulguer, ainsi que d'enregistrer, filmer, photographier ou publier tout élément relatif à une visite, sans l'autorisation écrite préalable de l'entreprise hôte. Cet engagement survit à la fin de la Learning Expedition pendant trois (3) ans. Tout manquement peut justifier une exclusion et engage la responsabilité du Participant à l'égard de l'entreprise hôte." },
        { type: 'p', label: '12.3. Alcool et substances.', text: "La consommation de substances illicites est interdite. Rusker Travel n'est pas responsable des conséquences d'une consommation d'alcool ou de substances illicites par un Participant, ni des incidents en résultant." },
        { type: 'p', label: '12.4. Identification.', text: 'Le port du badge ou du bracelet remis par Rusker Travel est obligatoire pendant toute la durée du Forfait.' },
        { type: 'p', label: '12.5. Exclusion.', text: "Sauf gravité extrême ou danger immédiat pour les personnes ou pour la réputation du groupe auprès d'une entreprise hôte, l'exclusion est précédée d'un avertissement écrit. En cas de récidive ou de persistance, Rusker Travel peut exclure immédiatement le Participant, sans remboursement, le retour restant à sa charge. La décision est notifiée par écrit et doit rester proportionnée." },
        { type: 'p', label: '12.6. Dommages.', text: 'Le Participant répond des dommages qu’il cause aux personnes, aux biens et aux installations.' },
      ],
    },
    {
      heading: 'Article 13 — Aptitude, accessibilité, santé, formalités',
      blocks: [
        { type: 'p', label: '13.1. Capacité.', text: 'Le Participant est majeur et dispose de la capacité de contracter.' },
        { type: 'p', label: '13.2. Formalités.', text: "Le Participant est seul responsable de la validité de ses documents d'identité et de voyage, et de l'accomplissement des formalités de visa et sanitaires. Les frais et conséquences d'une inobservation lui incombent. Aucun remboursement n'est dû en cas de refus d'embarquement ou d'entrée sur le territoire." },
        { type: 'p', label: '13.3. Accessibilité.', text: "Le Participant signale, avant son inscription, tout besoin d'aménagement (mobilité réduite, assistance médicale). Rusker Travel indique sur demande le degré d'adaptation du Forfait et propose des alternatives raisonnables lorsqu'elles existent." },
        { type: 'p', label: '13.4. Données de santé.', text: "Les régimes alimentaires, allergies et besoins médicaux constituent des données relevant de catégories particulières. Ils sont traités sur le fondement du consentement explicite du Participant, aux seules fins de l'exécution du Forfait et de la protection de ses intérêts vitaux, et ne sont communiqués au traiteur, à l'hôtel ou à l'entreprise hôte que dans la stricte mesure nécessaire." },
        { type: 'p', label: '13.5. Assurances.', text: "Les assurances de voyage, de santé, de rapatriement, d'annulation et d'interruption ne sont pas comprises dans le prix. Rusker Travel recommande vivement la souscription d'une garantie annulation et interruption, qui constitue la protection appropriée contre les frais de l'article 6.3. Les Participants résidant hors de l'Espace économique européen doivent disposer d'une couverture médicale valable en Espagne." },
      ],
    },
    {
      heading: 'Article 14 — Protection en cas d’insolvabilité',
      blocks: [
        { type: 'p', text: 'Conformément au Codi de consum de Catalunya, Rusker Travel S.L. est titulaire d’une garantie contre l’insolvabilité souscrite auprès d’AXA Seguros Generales, S.A. de Seguros y Reaseguros (CIF A60917978, C/ Monseñor Palmer 1, 07014 Palma de Mallorca), police de caución n° 85132484, d’un montant de 100 000 €.' },
        { type: 'p', text: 'Cette garantie couvre le remboursement des paiements effectués par les voyageurs, ainsi que — le transport étant compris dans le Forfait — les frais de rapatriement. Le Participant dont les services sont refusés en raison de l’insolvabilité de Rusker Travel peut s’adresser à :' },
        { type: 'list', items: [
          'AXA Seguros Generales, S.A. de Seguros y Reaseguros — déclaration de sinistres : 900 90 90 14 ou +34 91 807 00 55.',
          'Gestión de Riesgos y Patrimonios GALIA, courtier — C/ Campcardós 76 esq. Agudes, 17005 Girona — +34 972 401 016 — administracion@galia.es.',
        ] },
      ],
    },
    {
      heading: 'Article 15 — Propriété intellectuelle et droit à l’image',
      blocks: [
        { type: 'p', label: '15.1. Contenus de Rusker Travel.', text: 'Les programmes, supports, synthèses, marques, photographies et vidéos produits par Rusker Travel demeurent sa propriété. Seul un usage privé et personnel est autorisé.' },
        { type: 'p', label: '15.2. Droit à l’image du Participant.', text: "Rusker Travel photographie et filme la Learning Expedition. L'utilisation de l'image, de la voix ou de la ressemblance d'un Participant à des fins de communication et de marketing est subordonnée à son consentement préalable, spécifique, libre et recueilli séparément des présentes CGV. Ce consentement n'est pas une condition de l'inscription. Il peut être retiré à tout moment par courriel à info@rusker-travel.com, sans que ce retrait n'affecte la licéité des traitements antérieurs. En cas de refus ou de retrait, Rusker Travel prend les mesures raisonnables pour éviter ou supprimer les images identifiantes." },
        { type: 'p', label: '15.3. Vues d’ensemble.', text: "Les photographies de groupe dans lesquelles le Participant n'est pas le sujet principal sont traitées sur le fondement de l'intérêt légitime de Rusker Travel, sous réserve du droit d'opposition." },
      ],
    },
    {
      heading: 'Article 16 — Données à caractère personnel',
      blocks: [
        { type: 'p', text: "Le traitement des données personnelles est décrit en détail dans la Politique de confidentialité, qui fait partie intégrante de l'information précontractuelle. En synthèse : le responsable du traitement est Rusker Travel, S.L. (info@rusker-travel.com) ; les données sont traitées pour l'exécution du Forfait, le respect des obligations légales (dont le registre documental des voyageurs prévu par le Real Decreto 933/2021) et, le cas échéant, sur la base du consentement ; les copies de pièces d'identité recueillies pour les listes d'accès sont supprimées au plus tard un (1) mois après la fin du Forfait, tandis que le registre légal des voyageurs est conservé trois (3) ans. Le Participant dispose des droits d'accès, de rectification, d'effacement, de limitation, d'opposition et de portabilité, et peut saisir l'Agencia Española de Protección de Datos (www.aepd.es)." },
      ],
    },
    {
      heading: 'Article 17 — Réclamations et résolution des litiges',
      blocks: [
        { type: 'p', label: '17.1. Réclamations.', text: "Toute réclamation est adressée à info@rusker-travel.com, accompagnée des justificatifs. Rusker Travel répond dans un délai de trente (30) jours. Le Participant est invité, sans que cela conditionne la recevabilité de sa demande, à réclamer dans les soixante (60) jours suivant la fin du Forfait. Le non-respect de ce délai n'éteint aucun droit (voir article 10.7)." },
        { type: 'p', label: '17.2. Voies complémentaires.', text: 'Le Participant peut également : (a) recourir à un mécanisme de médiation de la consommation ; (b) exiger les feuilles officielles de plainte, réclamation et dénonciation de la Generalitat de Catalunya, que Rusker Travel détient et remet sur demande ; (c) s’il réside dans un autre État membre de l’Union européenne, saisir le Centre européen des consommateurs de son pays.' },
      ],
    },
    {
      heading: 'Article 18 — Droit applicable, juridiction, langue',
      blocks: [
        { type: 'p', label: '18.1. Droit applicable.', text: 'Le présent contrat est régi par le droit espagnol, et notamment par le Real Decreto Legislativo 1/2007.' },
        { type: 'p', label: '18.2. Réserve.', text: 'Le choix du droit espagnol ne prive pas le Participant de la protection que lui assurent les dispositions impératives du droit de la consommation du pays dans lequel il a sa résidence habituelle.' },
        { type: 'p', label: '18.3. Juridiction.', text: "Rusker Travel ne peut agir contre le Participant que devant les juridictions de l'État membre dans lequel celui-ci est domicilié. Le Participant peut agir contre Rusker Travel, à son choix, devant les tribunaux de Barcelone ou devant les juridictions de son propre domicile." },
        { type: 'p', label: '18.4. Langue.', text: "Les présentes CGV existent en français, en anglais et en espagnol. Chaque version fait foi et lie le Participant dans la langue dans laquelle la Learning Expedition lui a été proposée et vendue. Aucune version ne prévaut sur les autres." },
        { type: 'p', label: '18.5. Nullité partielle.', text: "La nullité d'une stipulation n'affecte pas la validité des autres." },
        { type: 'p', label: '18.6. Modification.', text: "Rusker Travel peut modifier les présentes CGV. Les modifications ne s'appliquent qu'aux inscriptions postérieures à leur entrée en vigueur." },
      ],
    },
    {
      heading: 'Annexe 1 — Calendrier contractuel',
      blocks: [
        { type: 'table', head: ['Échéance', 'Événement'], rows: [
          ['À l’inscription', 'Paiement intégral de 2 100 € — contrat formé après encaissement et confirmation écrite'],
          ['7 août 2026 (J-45)', 'Communication au Participant de l’établissement hôtelier retenu'],
          ['21 août 2026 (J-31)', 'Dernier jour pour résoudre sans aucun frais — remboursement intégral de 2 100 €'],
          ['22 août 2026 (J-30)', 'Chambres non libérables ; billet du sommet émis et remis au Participant ; frais de résolution de 50 %'],
          ['1er septembre 2026 (J-20)', 'Aucune augmentation de prix possible au-delà'],
          ['14 septembre 2026 (J-7)', 'Dernier jour pour céder son contrat à un autre voyageur (article 7)'],
          ['14 septembre 2026 (J-7)', 'Envoi du carnet de voyage et des coordonnées du coordinateur'],
          ['21 au 24 septembre 2026', 'Learning Expedition — départ garanti (article 4)'],
          ['14 jours', 'Délai maximal de tout remboursement dû par Rusker Travel'],
          ['2 ans', 'Délai de prescription des actions du Participant'],
        ] },
      ],
    },
    {
      heading: 'Annexe 2 — Formulaire d’information normalisée',
      blocks: [
        { type: 'note', text: 'Ce formulaire est remis au Participant sur support durable avant qu’il ne soit lié par le contrat.' },
        { type: 'p', text: 'La combinaison de services de voyage qui vous est proposée est un forfait au sens du Real Decreto Legislativo 1/2007 et de la directive (UE) 2015/2302. Vous bénéficierez donc de tous les droits de l’Union européenne applicables aux forfaits. Rusker Travel, S.L. sera pleinement responsable de la bonne exécution du forfait dans son ensemble. En outre, conformément à la loi, Rusker Travel, S.L. dispose d’une protection afin de rembourser vos paiements et, le transport étant compris dans le forfait, d’assurer votre rapatriement au cas où elle deviendrait insolvable.' },
        { type: 'p', text: 'Droits essentiels prévus par la directive (UE) 2015/2302 :' },
        { type: 'list', items: [
          'Les voyageurs recevront toutes les informations essentielles sur le forfait avant de conclure le contrat de voyage à forfait.',
          'L’organisateur est responsable de la bonne exécution de tous les services de voyage compris dans le contrat.',
          'Les voyageurs reçoivent un numéro de téléphone d’urgence ou les coordonnées d’un point de contact leur permettant de joindre l’organisateur.',
          'Les voyageurs peuvent céder leur forfait à une autre personne, moyennant un préavis raisonnable et éventuellement sous réserve de payer des frais supplémentaires.',
          'Le prix du forfait ne peut être augmenté que si des coûts spécifiques augmentent (par exemple, les prix des carburants) et si cette possibilité est explicitement prévue dans le contrat, et ne peut en tout cas pas être modifié moins de vingt jours avant le début du forfait. Si la majoration de prix dépasse 8 % du prix du forfait, le voyageur peut résoudre le contrat. Si l’organisateur se réserve le droit d’augmenter le prix, le voyageur a droit à une réduction de prix en cas de diminution des coûts correspondants.',
          'Les voyageurs peuvent résoudre le contrat sans payer de frais de résolution et être intégralement remboursés des paiements effectués si l’un des éléments essentiels du forfait, autre que le prix, subit une modification importante. Si, avant le début du forfait, le professionnel responsable du forfait annule celui-ci, les voyageurs peuvent obtenir le remboursement et un dédommagement, s’il y a lieu.',
          'Les voyageurs peuvent résoudre le contrat sans payer de frais de résolution avant le début du forfait en cas de circonstances exceptionnelles, par exemple s’il existe des problèmes graves pour la sécurité au lieu de destination qui sont susceptibles d’affecter le forfait.',
          'En outre, les voyageurs peuvent, à tout moment avant le début du forfait, résoudre le contrat moyennant le paiement de frais de résolution appropriés et justifiables.',
          'Si, après le début du forfait, des éléments importants de celui-ci ne peuvent pas être fournis comme prévu, d’autres prestations appropriées devront être proposées aux voyageurs, sans supplément de prix. Les voyageurs peuvent résoudre le contrat sans payer de frais de résolution lorsque les services ne sont pas exécutés conformément au contrat, que cela perturbe considérablement l’exécution du forfait et que l’organisateur n’y remédie pas.',
          'Les voyageurs ont aussi droit à une réduction de prix et/ou à un dédommagement en cas d’inexécution ou de mauvaise exécution des services de voyage.',
          'L’organisateur est tenu de fournir une aide si le voyageur est en difficulté.',
          'Si l’organisateur devient insolvable, les montants versés seront remboursés. Si l’organisateur devient insolvable après le début du forfait et si le transport est compris dans le forfait, le rapatriement des voyageurs est garanti. Rusker Travel, S.L. a souscrit une protection contre l’insolvabilité auprès d’AXA Seguros Generales, S.A. de Seguros y Reaseguros (police de caución n° 85132484). Les voyageurs peuvent prendre contact avec cette entité, ou avec le courtier Gestión de Riesgos y Patrimonios GALIA (C/ Campcardós 76, 17005 Girona — +34 972 401 016 — administracion@galia.es), si des services leur sont refusés en raison de l’insolvabilité de Rusker Travel, S.L.',
        ] },
        { type: 'note', text: 'Directive (UE) 2015/2302 transposée en droit espagnol : Real Decreto Legislativo 1/2007, Livre IV.' },
      ],
    },
  ],
}

const en: LegalDoc = {
  title: 'General Terms of Sale',
  subtitle: 'Individual registration — Learning Expedition · AI Summit Barcelona 2026 · Barcelona, 21–24 September 2026',
  version: 'RUSKER TRAVEL, S.L. — Version 1.0 · 9 July 2026',
  sections: [
    {
      heading: 'Preamble — Identification of the Organizer',
      blocks: [
        {
          type: 'table',
          head: ['Item', 'Information'],
          rows: [
            ['Name', 'RUSKER TRAVEL, S.L. (trade name: Rusker Travel)'],
            ['Registered office', "Carrer de l'Arc de Sant Agustí 3, 08001 Barcelona, Spain"],
            ['NIF', 'B44897510'],
            ['Commercial register', 'Barcelona — Volume 48705, Folio 221, Section 8, Sheet 593224, Entry 1'],
            ['Travel agency — FUE code', 'FUE-2023-03315922'],
            ['Civil liability', 'AXA Seguros Generales, S.A. de Seguros y Reaseguros — policy no. 85131623'],
            ['Insolvency guarantee', 'AXA Seguros Generales, S.A. de Seguros y Reaseguros — bond policy no. 85132484 — €100,000'],
            ['Contact', 'info@rusker-travel.com — +34 663 622 746 — Monday to Friday, 9:00–19:00 (CET)'],
          ],
        },
      ],
    },
    {
      heading: 'Preliminary article — Nature and qualification of the contract',
      blocks: [
        { type: 'p', label: 'P.1. Purpose.', text: 'These General Terms of Sale (the "Terms") govern the individual registration of a natural person for the Learning Expedition organized by Rusker Travel around the AI Summit Barcelona 2026, in Barcelona, from 21 to 24 September 2026 (the "Learning Expedition" or the "Package").' },
        { type: 'p', label: 'P.2. Legal qualification.', text: 'The Learning Expedition combines, for a single inclusive price, at least two different types of travel service. It constitutes a package tour ("viaje combinado") within the meaning of Real Decreto Legislativo 1/2007 (TRLGDCU) and Directive (EU) 2015/2302. The mandatory provisions of Book IV of the TRLGDCU apply and prevail over any contrary stipulation herein.' },
        { type: 'p', label: 'P.3. Capacity of the Organizer.', text: 'Rusker Travel acts as organizer ("organizador") and contracts in its own name, as principal party.' },
        { type: 'p', label: 'P.4. Pre-contractual information.', text: 'Before the Participant is bound, Rusker Travel provides, on a durable medium, the standardized information form reproduced in Annex 2. This form forms an integral part of the contract.' },
        { type: 'p', label: 'P.5. Disclosure of links.', text: 'The Participant is informed that Rusker Travel S.L. acquires the summit access tickets from AI Summit Alliance S.L., organizer of the AI Summit Barcelona 2026, and that Mr Adam Hruška is a director of Rusker Travel S.L. and also acts within AI Summit Alliance S.L. This information is provided for transparency. It does not affect the Participant’s rights, and in particular not the right to a full refund in the cases provided for in articles 5 and 9, which Rusker Travel assumes in all cases out of its own funds.' },
      ],
    },
    {
      heading: 'Article 1 — Parties, formation of the contract',
      blocks: [
        { type: 'p', label: '1.1. The Participant.', text: 'A natural person of legal age (18 years or older) who registers in their own name and on their own behalf. The Participant is the sole counterparty of the Organizer. There is no intermediary customer.' },
        { type: 'p', label: '1.2. Registration.', text: 'Registration made on rusker-travel.com constitutes an offer by the Participant. The contract is formed upon the fulfilment of the following two conditions: (i) actual collection of the full price provided for in article 3.2, and (ii) sending by Rusker Travel of a written registration confirmation on a durable medium. Before validating payment, the Participant confirms having received the standardized information form reproduced in Annex 2.' },
        { type: 'p', label: '1.3. Right to refuse.', text: 'Rusker Travel may refuse a registration on an objective ground: capacity reached, failure to meet the published participation conditions, incompatibility with the access or security rules of a visited company, or prior conduct having justified an exclusion. Refusal may never rest on a discriminatory ground. In the event of refusal, any sum paid is fully refunded within fourteen (14) days.' },
        { type: 'p', label: '1.4. Waiting list.', text: 'Registrations are processed on a first-come, first-served basis. If capacity is exceeded, the Participant is placed on a waiting list; no sum is charged before a place becomes available and the Participant has confirmed.' },
        { type: 'p', label: '1.5. Order of precedence of documents.', text: 'In the event of contradiction, the following prevail in this order: (i) the mandatory provisions of Book IV of the TRLGDCU; (ii) the standardized information form; (iii) the registration confirmation; (iv) these Terms; (v) the published program.' },
      ],
    },
    {
      heading: 'Article 2 — Content of the Package',
      blocks: [
        { type: 'p', label: '2.1. Included services.', text: 'Unless otherwise stated in the registration confirmation, the Package includes:' },
        { type: 'list', items: [
          'Accommodation: three (3) nights (21, 22 and 23 September 2026) in a 4-star Catalonia-chain establishment located in Barcelona, in a single room, breakfast included. The specific establishment is communicated to the Participant by 7 August 2026 at the latest.',
          'Ground transport in Barcelona: transfers and chartered vehicle for company visits and program movements.',
          'A personal Gold-category access ticket to the AI Summit Barcelona 2026 (22 and 23 September 2026).',
          'The Learning Expedition program: company visits, workshops, expert sessions, debrief sessions.',
          'The meals expressly mentioned in the program.',
          'A Rusker Travel coordinator present on site for the entire duration of the Package.',
        ] },
        { type: 'p', label: '2.2. Excluded services.', text: 'The following are notably not included:' },
        { type: 'list', items: [
          'International round-trip transport to Barcelona (flight, train), arranged by the Participant.',
          'Travel, health, cancellation, interruption and repatriation insurance.',
          'Personal expenses and drinks outside the meals mentioned in the program.',
          'Visas, administrative and health formalities, and their costs.',
          'The tourist tax, unless expressly mentioned as included.',
          'Any service not expressly listed in article 2.1.',
        ] },
        { type: 'p', label: '2.3. AI Summit Barcelona 2026 ticket.', text: 'The Gold-category summit access ticket is a component of the Package. Rusker Travel acquires it from AI Summit Alliance S.L., organizer of the summit, and has it issued in the Participant’s name, to whom it is delivered on 22 August 2026 (D-30). It is personal and non-transferable, subject to article 7, and governed by the summit attendee access conditions communicated to the Participant before registration. The value of the "ticket" component is €650, i.e. about 31% of the Package price; it is stated separately in the standardized information form.' },
        { type: 'p', label: '2.4. Program and substitutions.', text: 'Company visits and expert contributions depend on third-party availability. If unavailable, Rusker Travel will offer an alternative of equivalent sector, level of expertise and educational value. Such a substitution does not constitute a significant change and gives rise to no reduction or compensation. Conversely, the cancellation or postponement of the AI Summit Barcelona 2026 constitutes a significant change to an essential element, governed by article 5.' },
      ],
    },
    {
      heading: 'Article 3 — Price, VAT, payment',
      blocks: [
        { type: 'p', label: '3.1. Firm and final price.', text: 'The price of the Package is €2,100 per person, all taxes included, in a single room. It is a closed price: no handling fee, no separate deposit, no single-room supplement and no ancillary charge is added. Under the special scheme for travel agencies (articles 141 to 147 of Ley 37/1992), VAT is levied on Rusker Travel’s margin and is not itemized on the invoice. No deductible VAT is passed on to the Participant or their employer.' },
        { type: 'p', label: '3.2. Payment.', text: 'The price is payable in a single instalment, in full, at the time of registration. The contract is formed only after actual collection (article 1.2).' },
        { type: 'p', label: '3.3. No handling fees.', text: 'No sum is retained for handling, registration or processing fees. The only sums Rusker Travel may retain are the termination fees provided for in article 6.3, and only under the conditions and within the limits set out there.' },
        { type: 'p', label: '3.4. Payment failure.', text: 'In the event of failure, rejection or chargeback of payment, the contract is not formed or, if it was, is terminated by operation of law. No fee is retained, the place is made available again and the Participant is informed in writing.' },
        { type: 'p', label: '3.5. Price revision.', text: 'In accordance with the TRLGDCU:' },
        { type: 'list', items: [
          '(a) The price may be revised, upward or downward, exclusively due to: (i) changes in the cost of passenger transport resulting from the price of fuel or other energy sources; (ii) changes in taxes and fees payable to third parties not directly involved; (iii) changes in the exchange rates applicable to the Package.',
          '(b) No increase may occur within the twenty (20) days preceding departure, i.e. after 1 September 2026.',
          '(c) Any increase is notified on a durable medium, justified and accompanied by supporting calculation.',
          '(d) Rusker Travel must pass on any decrease affecting the same items, less the actual administrative refund costs, at the Participant’s request.',
          '(e) If the increase exceeds 8% of the total price, the Participant may terminate the contract without fee and obtain a full refund within fourteen (14) days, or accept a substitute package. They notify their choice within the period stated in the notification, which may not be less than seven (7) days.',
        ] },
        { type: 'p', label: '3.6. No energy renegotiation clause.', text: 'No clause allowing Rusker Travel to renegotiate the financial terms or terminate the contract on account of a rise in energy costs is included herein. Article 3.5 is the exclusive price-revision mechanism.' },
      ],
    },
    {
      heading: 'Article 4 — Departure confirmation: guaranteed departure',
      blocks: [
        { type: 'p', label: '4.1. Guaranteed departure.', text: 'The departure of the Learning Expedition is confirmed upon sending of the registration confirmation. Rusker Travel does not make the Package conditional on reaching a minimum number of Participants and reserves no right to cancel for insufficient numbers.' },
        { type: 'p', label: '4.2. Consequence.', text: 'The only cases of cancellation at Rusker Travel’s initiative are those provided for in article 9.' },
      ],
    },
    {
      heading: 'Article 5 — Cancellation or postponement of the AI Summit Barcelona 2026',
      blocks: [
        { type: 'p', label: '5.1. Essential element.', text: 'The AI Summit Barcelona 2026 is organized by a third party. Access to the summit is an essential element of the Package.' },
        { type: 'p', label: '5.2. Before departure.', text: 'If the summit is cancelled, or postponed by more than seven (7) days, before departure, this circumstance constitutes a significant change to an essential element. Rusker Travel informs the Participant without undue delay and gives them, within a period that may not be less than seven (7) days — or, if departure occurs sooner, until the day before departure — the choice between:' },
        { type: 'list', items: [
          '(a) accepting a substitute package of equivalent or higher quality at no supplement, or of lower quality with an appropriate price reduction; or',
          '(b) terminating the contract and obtaining a full refund of all sums paid, handling fees and "ticket" component included, within fourteen (14) calendar days.',
        ] },
        { type: 'p', text: 'If the cancellation or postponement results from unavoidable and extraordinary circumstances, no additional compensation is due. Otherwise, the Participant is entitled to the compensation provided for by the TRLGDCU.' },
        { type: 'p', label: '5.3. After departure.', text: 'If the summit is cancelled or interrupted after the start of the Package, article 10 applies.' },
      ],
    },
    {
      heading: 'Article 6 — Termination of the contract by the Participant',
      blocks: [
        { type: 'p', label: '6.1. Right to terminate.', text: 'The Participant may terminate the contract at any time before the start of the Package, subject to payment of the termination fees provided for in article 6.3. The Participant is informed that package tours are not subject to the right of withdrawal applicable to distance selling; article 6.1 gives them, in return, an unconditional right of exit.' },
        { type: 'p', label: '6.2. Procedure.', text: 'Termination is notified by email to info@rusker-travel.com. The date the email is received constitutes the termination date. No registered letter is required.' },
        { type: 'p', label: '6.3. Schedule of termination fees.', text: 'The following fees are set by reference to the dates on which Rusker Travel’s commitments to its suppliers become irrevocable — that is, essentially, 22 August 2026 (D-30), the date on which rooms can no longer be released and the summit ticket is issued:' },
        { type: 'table', head: ['Date the notification is received', 'Termination fee retained'], rows: [
          ['Until 21 August 2026 (D-31) inclusive', 'No fee — full refund of €2,100'],
          ['From 22 August to 6 September 2026 (D-30 to D-15)', '50% of the price, i.e. €1,050 — refund of €1,050'],
          ['From 7 to 13 September 2026 (D-14 to D-8)', '75% of the price, i.e. €1,575 — refund of €525'],
          ['From 14 September 2026 (D-7), or no-show', '100% of the price, i.e. €2,100 — no refund'],
        ] },
        { type: 'p', text: 'Until 21 August 2026 inclusive, termination is therefore entirely free of charge. From 22 August 2026, the reserved rooms can no longer be released and the summit ticket is issued in the Participant’s name: the above fees correspond to the costs Rusker Travel has then definitively incurred.' },
        { type: 'p', label: '6.4. "Ticket" component.', text: 'The value of the ticket (€650) is included in the Package price and in the percentages of article 6.3. It is not subject to any separate or additional retention. Where termination occurs from 22 August 2026 (D-30), the ticket issue date, the ticket remains acquired by the Participant, who retains the option of attending the summit by their own means.' },
        { type: 'p', label: '6.5. Termination without fee (unavoidable and extraordinary circumstances).', text: 'If unavoidable and extraordinary circumstances occurring in Barcelona or its immediate vicinity significantly affect the performance of the Package, the Participant may terminate the contract before departure without paying any termination fee, and obtain a full refund of all sums paid, handling fees included, within fourteen (14) calendar days. No additional compensation is due.' },
        { type: 'p', label: '6.6. Cap and reduction upon resale.', text: 'The fees of article 6.3 constitute a cap and not a lump sum due in all cases. They may in no case exceed the Package price less the cost savings actually made and the revenue actually derived from reassigning the place. Where Rusker Travel resells all or part of the terminated place, it refunds the Participant the corresponding amount, less €75 of administrative fees and unrecoverable costs.' },
        { type: 'p', label: '6.7. Unused services.', text: 'No refund is due for a service not consumed due to the Participant, subject to article 10.' },
      ],
    },
    {
      heading: 'Article 7 — Transfer of the contract to another traveller',
      blocks: [
        { type: 'p', label: '7.1. Principle.', text: 'The Participant may transfer their contract to a person meeting all the conditions applicable to the Package, subject to written notice of at least seven (7) calendar days before departure, i.e. by 14 September 2026 at the latest.' },
        { type: 'p', label: '7.2. Joint liability.', text: 'The price being paid in full at registration, the transfer entails no balance to pay. The transferor and the transferee remain jointly and severally liable only for the additional costs actually caused by the transfer. Reimbursement of the transferor by the transferee is a matter for their agreement alone and does not bind Rusker Travel.' },
        { type: 'p', label: '7.3. Costs.', text: 'Rusker Travel informs the transferor of the actual cost of the transfer. These costs must be reasonable and may not exceed the cost actually incurred. Rusker Travel provides supporting evidence.' },
        { type: 'p', label: '7.4. Conditions.', text: 'The transferee must meet the access and security requirements of the visited companies as well as the summit attendee access conditions. Rusker Travel arranges the name change on the ticket. Any reissue fees are charged at their actual cost, with supporting evidence.' },
      ],
    },
    {
      heading: 'Article 8 — Changes at the Participant’s initiative',
      blocks: [
        { type: 'p', label: '8.1.', text: 'Correcting a clerical error in the Participant’s name is free of charge.' },
        { type: 'p', label: '8.2.', text: 'Any other change constitutes a termination followed by a new registration, and is subject to the schedule of article 6.3.' },
      ],
    },
    {
      heading: 'Article 9 — Change and cancellation at the Organizer’s initiative',
      blocks: [
        { type: 'p', label: '9.1. Insignificant changes.', text: 'Rusker Travel may make insignificant changes to the Package: rescheduling, changing the order of sessions, substituting a speaker or a visited company under the conditions of article 2.4, replacing the hotel with an establishment of equivalent or higher category located in the same area. These are notified on a durable medium and give rise to no compensation.' },
        { type: 'p', label: '9.2. Significant changes.', text: 'If Rusker Travel must significantly change an essential element of the Package, cannot meet a special requirement it had accepted, or must increase the price by more than 8%, the Participant may, within a period that may not be less than seven (7) days — or, if departure occurs sooner, until the day before departure —: (a) accept the change; (b) accept a substitute package; or (c) terminate the contract without fee and obtain a full refund within fourteen (14) days. The Participant’s silence amounts to acceptance only if the notification expressly stated the period and the consequence of silence.' },
        { type: 'p', label: '9.3. Insufficient numbers.', text: 'Not applicable. Rusker Travel does not reserve the right to cancel the Learning Expedition for insufficient numbers (article 4).' },
        { type: 'p', label: '9.4. Cancellation for unavoidable and extraordinary circumstances.', text: 'Rusker Travel refunds all sums paid within fourteen (14) days. No compensation is due.' },
        { type: 'p', label: '9.5. Cancellation for any other reason.', text: 'Rusker Travel refunds all sums paid within fourteen (14) days and additionally pays the compensation provided for by the TRLGDCU, unless it demonstrates that the cancellation falls under article 9.4.' },
      ],
    },
    {
      heading: 'Article 10 — Performance, non-conformity, liability',
      blocks: [
        { type: 'p', label: '10.1. Organizer’s liability.', text: 'Rusker Travel is responsible for the performance of all the travel services included in the Package, whether performed by itself or by third-party providers.' },
        { type: 'p', label: '10.2. Reporting.', text: 'The Participant informs the on-site coordinator of any non-conformity, without undue delay. Their contact details appear in the travel booklet, sent by 14 September 2026 at the latest. Failure to report may reduce the amount of the price reduction or damages where prompt reporting would have avoided or lessened the harm. It does not extinguish the Participant’s right.' },
        { type: 'p', label: '10.3. Remedies.', text: 'Rusker Travel remedies the non-conformity, unless impossible or disproportionately costly. Otherwise, the Participant is entitled to a price reduction and, where applicable, damages.' },
        { type: 'p', label: '10.4. Assistance.', text: 'Rusker Travel provides appropriate assistance without undue delay to a Participant in difficulty: information on health services, local authorities and consular assistance; help with distance communication; searching for alternative solutions. A reasonable contribution may be charged only if the difficulty was caused intentionally or by the Participant’s negligence.' },
        { type: 'p', label: '10.5. Limitation.', text: 'Except for personal injury and damage caused intentionally or by negligence, and subject to the limits resulting from applicable international conventions, compensation is limited to three times the total Package price, i.e. €6,300 per Participant.' },
        { type: 'p', label: '10.6. Exemptions.', text: 'Rusker Travel’s liability is not engaged where the non-conformity is attributable to the Participant, to a third party unconnected with the provision of the travel services and of an unforeseeable and unavoidable nature, or to unavoidable and extraordinary circumstances.' },
        { type: 'p', label: '10.7. Limitation period.', text: 'Actions based on this contract are time-barred after two (2) years from the date on which the Package was due to end.' },
      ],
    },
    {
      heading: 'Article 11 — Transport and accommodation',
      blocks: [
        { type: 'p', label: '11.1. Ground transport.', text: 'Ground transport in Barcelona is chartered by Rusker Travel. Participants comply with the drivers’ instructions. The following are notably prohibited, in accordance with Spanish law: consuming alcohol on board, smoking, and standing while the vehicle is moving.' },
        { type: 'p', label: '11.2. Approach transport.', text: 'Round-trip transport to Barcelona is arranged by the Participant, who allows a sufficient margin. Rusker Travel is not responsible for the consequences of a delay of its carrier, and no refund is due for sessions missed as a result.' },
        { type: 'p', label: '11.3. Accommodation.', text: 'Three (3) nights in a 4-star Catalonia-chain establishment located in Barcelona. The specific establishment is communicated to the Participant by 7 August 2026 at the latest; failing that, or in the event of unavailability, Rusker Travel provides accommodation of equivalent or higher category in the same area, at no supplement. The price is for a single room. No room sharing is offered and no single-room supplement is charged.' },
        { type: 'p', label: '11.4. Hotel deposit.', text: 'The hotel may require from the Participant, directly, a deposit to cover extras and any damage. Rusker Travel neither manages nor refunds it.' },
        { type: 'p', label: '11.5. Luggage.', text: 'Each Participant remains responsible for their luggage and personal belongings. Any loss is reported immediately to the on-site coordinator.' },
      ],
    },
    {
      heading: 'Article 12 — Participant’s obligations and conduct',
      blocks: [
        { type: 'p', label: '12.1. Commitment.', text: 'The Participant attends the scheduled sessions, respects the timetable, actively interacts with the speakers, adopts professional conduct during company visits and wears attire consistent with the hosts’ requirements.' },
        { type: 'p', label: '12.2. Confidentiality and recording ban.', text: 'Information communicated by the visited companies is confidential. The Participant undertakes not to disclose it, nor to record, film, photograph or publish anything relating to a visit, without the prior written authorization of the host company. This undertaking survives the end of the Learning Expedition for three (3) years. Any breach may justify an exclusion and engages the Participant’s liability towards the host company.' },
        { type: 'p', label: '12.3. Alcohol and substances.', text: 'The use of illicit substances is prohibited. Rusker Travel is not responsible for the consequences of a Participant’s consumption of alcohol or illicit substances, nor for the incidents resulting from it.' },
        { type: 'p', label: '12.4. Identification.', text: 'Wearing the badge or wristband issued by Rusker Travel is mandatory throughout the duration of the Package.' },
        { type: 'p', label: '12.5. Exclusion.', text: 'Except in cases of extreme gravity or immediate danger to persons or to the group’s reputation with a host company, exclusion is preceded by a written warning. In the event of repetition or persistence, Rusker Travel may exclude the Participant immediately, without refund, the return remaining at their expense. The decision is notified in writing and must remain proportionate.' },
        { type: 'p', label: '12.6. Damage.', text: 'The Participant is liable for the damage they cause to persons, property and facilities.' },
      ],
    },
    {
      heading: 'Article 13 — Fitness, accessibility, health, formalities',
      blocks: [
        { type: 'p', label: '13.1. Capacity.', text: 'The Participant is of legal age and has the capacity to contract.' },
        { type: 'p', label: '13.2. Formalities.', text: 'The Participant is solely responsible for the validity of their identity and travel documents, and for completing visa and health formalities. The costs and consequences of non-compliance are theirs. No refund is due in the event of refusal of boarding or of entry into the territory.' },
        { type: 'p', label: '13.3. Accessibility.', text: 'The Participant reports, before registration, any need for accommodation (reduced mobility, medical assistance). Rusker Travel indicates on request the degree to which the Package is adapted and offers reasonable alternatives where they exist.' },
        { type: 'p', label: '13.4. Health data.', text: 'Dietary requirements, allergies and medical needs constitute special-category data. They are processed on the basis of the Participant’s explicit consent, solely for the purposes of performing the Package and protecting their vital interests, and are communicated to the caterer, hotel or host company only to the strictly necessary extent.' },
        { type: 'p', label: '13.5. Insurance.', text: 'Travel, health, repatriation, cancellation and interruption insurance are not included in the price. Rusker Travel strongly recommends taking out cancellation and interruption cover, which is the appropriate protection against the fees of article 6.3. Participants residing outside the European Economic Area must have medical cover valid in Spain.' },
      ],
    },
    {
      heading: 'Article 14 — Insolvency protection',
      blocks: [
        { type: 'p', text: 'In accordance with the Codi de consum de Catalunya, Rusker Travel S.L. holds an insolvency guarantee taken out with AXA Seguros Generales, S.A. de Seguros y Reaseguros (CIF A60917978, C/ Monseñor Palmer 1, 07014 Palma de Mallorca), bond policy no. 85132484, in the amount of €100,000.' },
        { type: 'p', text: 'This guarantee covers the refund of payments made by travellers, as well as — transport being included in the Package — repatriation costs. A Participant whose services are refused due to Rusker Travel’s insolvency may contact:' },
        { type: 'list', items: [
          'AXA Seguros Generales, S.A. de Seguros y Reaseguros — claims reporting: 900 90 90 14 or +34 91 807 00 55.',
          'Gestión de Riesgos y Patrimonios GALIA, broker — C/ Campcardós 76 esq. Agudes, 17005 Girona — +34 972 401 016 — administracion@galia.es.',
        ] },
      ],
    },
    {
      heading: 'Article 15 — Intellectual property and image rights',
      blocks: [
        { type: 'p', label: '15.1. Rusker Travel content.', text: 'The programs, materials, summaries, trademarks, photographs and videos produced by Rusker Travel remain its property. Only private and personal use is authorized.' },
        { type: 'p', label: '15.2. Participant’s image rights.', text: 'Rusker Travel photographs and films the Learning Expedition. Use of a Participant’s image, voice or likeness for communication and marketing purposes is subject to their prior, specific, free consent, obtained separately from these Terms. This consent is not a condition of registration. It may be withdrawn at any time by email to info@rusker-travel.com, without such withdrawal affecting the lawfulness of prior processing. In the event of refusal or withdrawal, Rusker Travel takes reasonable measures to avoid or remove identifying images.' },
        { type: 'p', label: '15.3. General views.', text: 'Group photographs in which the Participant is not the main subject are processed on the basis of Rusker Travel’s legitimate interest, subject to the right to object.' },
      ],
    },
    {
      heading: 'Article 16 — Personal data',
      blocks: [
        { type: 'p', text: 'The processing of personal data is described in detail in the Privacy Policy, which forms an integral part of the pre-contractual information. In summary: the data controller is Rusker Travel, S.L. (info@rusker-travel.com); data is processed for the performance of the Package, compliance with legal obligations (including the traveller record required by Real Decreto 933/2021) and, where applicable, on the basis of consent; ID document copies collected for access lists are deleted at the latest one (1) month after the end of the Package, while the legal traveller record is kept for three (3) years. The Participant has the rights of access, rectification, erasure, restriction, objection and portability, and may contact the Agencia Española de Protección de Datos (www.aepd.es).' },
      ],
    },
    {
      heading: 'Article 17 — Complaints and dispute resolution',
      blocks: [
        { type: 'p', label: '17.1. Complaints.', text: 'Any complaint is addressed to info@rusker-travel.com, together with supporting documents. Rusker Travel replies within thirty (30) days. The Participant is invited, without this conditioning the admissibility of their claim, to complain within sixty (60) days following the end of the Package. Failure to meet this period extinguishes no right (see article 10.7).' },
        { type: 'p', label: '17.2. Additional channels.', text: 'The Participant may also: (a) use a consumer mediation mechanism; (b) request the official complaint, claim and denunciation forms of the Generalitat de Catalunya, which Rusker Travel holds and provides on request; (c) if resident in another EU Member State, contact the European Consumer Centre of their country.' },
      ],
    },
    {
      heading: 'Article 18 — Governing law, jurisdiction, language',
      blocks: [
        { type: 'p', label: '18.1. Governing law.', text: 'This contract is governed by Spanish law, and in particular by Real Decreto Legislativo 1/2007.' },
        { type: 'p', label: '18.2. Reservation.', text: 'The choice of Spanish law does not deprive the Participant of the protection afforded by the mandatory consumer-law provisions of the country in which they have their habitual residence.' },
        { type: 'p', label: '18.3. Jurisdiction.', text: 'Rusker Travel may bring proceedings against the Participant only before the courts of the Member State in which the Participant is domiciled. The Participant may bring proceedings against Rusker Travel, at their choice, before the courts of Barcelona or before the courts of their own domicile.' },
        { type: 'p', label: '18.4. Language.', text: 'These Terms exist in French, English and Spanish. Each version is authoritative and binds the Participant in the language in which the Learning Expedition was offered and sold to them. No version prevails over the others.' },
        { type: 'p', label: '18.5. Partial nullity.', text: 'The nullity of one stipulation does not affect the validity of the others.' },
        { type: 'p', label: '18.6. Amendment.', text: 'Rusker Travel may amend these Terms. Amendments apply only to registrations subsequent to their entry into force.' },
      ],
    },
    {
      heading: 'Annex 1 — Contractual calendar',
      blocks: [
        { type: 'table', head: ['Deadline', 'Event'], rows: [
          ['At registration', 'Full payment of €2,100 — contract formed after collection and written confirmation'],
          ['7 August 2026 (D-45)', 'Communication to the Participant of the chosen hotel establishment'],
          ['21 August 2026 (D-31)', 'Last day to terminate at no fee — full refund of €2,100'],
          ['22 August 2026 (D-30)', 'Rooms non-releasable; summit ticket issued and delivered to the Participant; 50% termination fee'],
          ['1 September 2026 (D-20)', 'No price increase possible beyond this date'],
          ['14 September 2026 (D-7)', 'Last day to transfer the contract to another traveller (article 7)'],
          ['14 September 2026 (D-7)', 'Sending of the travel booklet and the coordinator’s contact details'],
          ['21–24 September 2026', 'Learning Expedition — guaranteed departure (article 4)'],
          ['14 days', 'Maximum period for any refund due by Rusker Travel'],
          ['2 years', 'Limitation period for the Participant’s actions'],
        ] },
      ],
    },
    {
      heading: 'Annex 2 — Standardized information form',
      blocks: [
        { type: 'note', text: 'This form is provided to the Participant on a durable medium before they are bound by the contract.' },
        { type: 'p', text: 'The combination of travel services offered to you is a package within the meaning of Real Decreto Legislativo 1/2007 and Directive (EU) 2015/2302. You will therefore benefit from all EU rights applicable to packages. Rusker Travel, S.L. will be fully responsible for the proper performance of the package as a whole. In addition, as required by law, Rusker Travel, S.L. has protection in place to refund your payments and, transport being included in the package, to ensure your repatriation in the event that it becomes insolvent.' },
        { type: 'p', text: 'Key rights under Directive (EU) 2015/2302:' },
        { type: 'list', items: [
          'Travellers will receive all essential information about the package before concluding the package travel contract.',
          'The organizer is responsible for the proper performance of all travel services included in the contract.',
          'Travellers are given an emergency telephone number or the details of a contact point through which they can reach the organizer.',
          'Travellers may transfer their package to another person, subject to reasonable notice and possibly to paying additional costs.',
          'The price of the package may only be increased if specific costs rise (for example, fuel prices) and if that possibility is explicitly provided for in the contract, and may in any event not be modified less than twenty days before the start of the package. If the price increase exceeds 8% of the package price, the traveller may terminate the contract. If the organizer reserves the right to increase the price, the traveller is entitled to a price reduction if the corresponding costs fall.',
          'Travellers may terminate the contract without paying any termination fee and be fully refunded of the payments made if any of the essential elements of the package, other than the price, is significantly changed. If, before the start of the package, the professional responsible for the package cancels it, travellers can obtain a refund and, where appropriate, compensation.',
          'Travellers may terminate the contract without paying any termination fee before the start of the package in the event of exceptional circumstances, for instance if there are serious security problems at the destination that are likely to affect the package.',
          'In addition, travellers may, at any time before the start of the package, terminate the contract in return for payment of an appropriate and justifiable termination fee.',
          'If, after the start of the package, significant elements of it cannot be provided as agreed, suitable alternative arrangements must be offered to travellers at no extra cost. Travellers may terminate the contract without paying any termination fee where services are not performed in accordance with the contract, this substantially affects the performance of the package, and the organizer fails to remedy it.',
          'Travellers are also entitled to a price reduction and/or compensation in the event of non-performance or improper performance of the travel services.',
          'The organizer must provide assistance if the traveller is in difficulty.',
          'If the organizer becomes insolvent, payments made will be refunded. If the organizer becomes insolvent after the start of the package and transport is included in the package, travellers’ repatriation is guaranteed. Rusker Travel, S.L. has taken out insolvency protection with AXA Seguros Generales, S.A. de Seguros y Reaseguros (bond policy no. 85132484). Travellers may contact this entity, or the broker Gestión de Riesgos y Patrimonios GALIA (C/ Campcardós 76, 17005 Girona — +34 972 401 016 — administracion@galia.es), if services are refused to them due to Rusker Travel, S.L.’s insolvency.',
        ] },
        { type: 'note', text: 'Directive (EU) 2015/2302 as transposed into Spanish law: Real Decreto Legislativo 1/2007, Book IV.' },
      ],
    },
  ],
}

export const CGV = { fr, en } as const
