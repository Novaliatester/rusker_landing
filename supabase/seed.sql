-- Dev/test seed. Run manually in non-production or while testing in Stripe test mode.
insert into public.expeditions
  (slug, title, description, price_per_person_cents, currency, min_participants, max_participants)
values
  (
    'barcelona-tech-immersion',
    'Barcelona Tech Immersion',
    'A 4-day learning expedition through the Barcelona tech ecosystem: startup visits, founder talks, and hands-on innovation workshops.',
    89000, 'eur', 10, 40
  ),
  (
    'smart-city-discovery',
    'Smart City Discovery',
    'Explore how Barcelona became a global smart-city reference: urban labs, mobility projects, and meetings with the teams behind them.',
    74000, 'eur', 8, 30
  )
on conflict (slug) do nothing;
