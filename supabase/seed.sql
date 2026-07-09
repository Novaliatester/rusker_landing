-- Production catalog. Applied via REST (service role) — kept here as the source of truth.
update public.expeditions set is_active = false
where slug in ('barcelona-tech-immersion', 'smart-city-discovery');

insert into public.expeditions
  (slug, title, description, price_per_person_cents, currency, min_participants, max_participants,
   starts_on, ends_on, capacity, vat_rate, departure_stations, is_active, image_url)
values
  (
    'aura-ai-summit-2026',
    'Délégation AURA — AI Summit Barcelona 2026',
    E'20 dirigeants d''Auvergne-Rhône-Alpes au cœur de l''IA européenne. Trois jours d''immersion à Barcelone pendant l''AI Week et l''AI Summit Barcelona 2026, avec un objectif : repartir avec des opportunités d''implémentation IA concrètes pour vos secteurs (pharma & biotech, énergie & industrie, gaming, finance, mécatronique).\n\nProgramme :\n• Lundi 21 sept — Train Lyon/Grenoble → Barcelone, installation à l''hôtel 4★ (centre-ville), briefing délégation, dîner privé d''ouverture.\n• Mardi 22 sept — AI Summit J1 : keynotes, démos, panels au WTC Barcelona, Real Use Case Stage, networking dirigé, side event exclusif en soirée.\n• Mercredi 23 sept — Summit J2 : workshops interactifs, restitution & cas d''usage concrets, train retour en soirée.\n\nL''offre comprend : transport aller/retour en train, hôtel 4★ (2 nuits), dîner privé d''ouverture, Pass Gold AI Summit 2 jours (valeur 650 €), side event du 22/09, accès AI Week (50+ side events), networking organisé et accompagnement Rusker (briefing, coordination, logistique).\n\nPartenaires confirmés : Anthropic, Google Cloud, ElevenLabs, n8n, Artefact, Tether, Digital Realty.',
    210000, 'eur', 1, 20,
    '2026-09-21', '2026-09-23', 20, 21.00, '{Lyon,Grenoble}', true, '/images/gallery/wtc-skyview.jpg'
  ),
  (
    'occitanie-ai-summit-2026',
    'Délégation Occitanie — AI Summit Barcelona 2026',
    E'20 dirigeants d''Occitanie au cœur de l''IA européenne. Trois jours d''immersion à Barcelone pendant l''AI Week et l''AI Summit Barcelona 2026, avec un objectif : repartir avec des opportunités d''implémentation IA concrètes pour vos secteurs (aérospatial & défense, agroalimentaire, biotech & pharmacie, retail & e-commerce, énergie & cleantech).\n\nProgramme :\n• Lundi 21 sept — Train Toulouse/Montpellier → Barcelone, installation à l''hôtel 4★ (centre-ville), briefing délégation, dîner privé d''ouverture.\n• Mardi 22 sept — AI Summit J1 : keynotes, démos, panels au WTC Barcelona, Real Use Case Stage, networking dirigé, side event exclusif en soirée.\n• Mercredi 23 sept — Summit J2 : workshops interactifs, restitution & cas d''usage concrets, train retour en soirée.\n\nL''offre comprend : transport aller/retour en train, hôtel 4★ (2 nuits), dîner privé d''ouverture, Pass Gold AI Summit 2 jours (valeur 650 €), side event du 22/09, accès AI Week (50+ side events), networking organisé et accompagnement Rusker (briefing, coordination, logistique).\n\nPartenaires confirmés : Anthropic, Google Cloud, ElevenLabs, n8n, Artefact, Tether, Digital Realty.',
    210000, 'eur', 1, 20,
    '2026-09-21', '2026-09-23', 20, 21.00, '{Toulouse,Montpellier}', true, '/images/gallery/wtc-skyview.jpg'
  )
on conflict (slug) do nothing;
