-- Learning expeditions catalog + orders written by the Stripe webhook.
-- RLS is enabled with NO policies: all access goes through server code
-- using the service-role key. Nothing is exposed to anon/authenticated roles.

create table public.expeditions (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text,
  image_url text,
  price_per_person_cents integer not null check (price_per_person_cents > 0),
  currency text not null default 'eur',
  min_participants integer not null default 1 check (min_participants >= 1),
  max_participants integer check (max_participants >= min_participants),
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  expedition_id uuid not null references public.expeditions (id),
  quantity integer not null check (quantity >= 1),
  buyer_email text not null,
  buyer_name text,
  amount_total_cents integer not null,
  currency text not null,
  status text not null default 'paid',
  stripe_checkout_session_id text not null unique,
  stripe_payment_intent_id text,
  created_at timestamptz not null default now()
);

alter table public.expeditions enable row level security;
alter table public.orders enable row level security;
