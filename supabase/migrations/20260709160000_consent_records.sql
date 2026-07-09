-- Audit log of legal-text acceptances: one row per consent, per booking.
-- Identity = buyer name + email (no customer accounts). document_version pins
-- the exact wording that was accepted; bump it in lib/consent.ts when texts change.

create table public.consent_records (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders (id) on delete cascade,
  consent_type text not null check (consent_type in ('terms_of_sale', 'terms_of_service', 'privacy')),
  document_version text not null,
  identity_name text not null,
  identity_email text not null,
  accepted_at timestamptz not null,
  ip text,
  user_agent text,
  created_at timestamptz not null default now()
);

create index consent_records_order_id_idx on public.consent_records (order_id);

alter table public.consent_records enable row level security;
