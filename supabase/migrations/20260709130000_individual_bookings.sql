-- Individual-seat bookings: dated expeditions with capacity, pending->paid orders
-- with billing/consent data, one participants row per seat, private ID-scan bucket.

alter table public.expeditions
  add column starts_on date,
  add column ends_on date,
  add column capacity integer check (capacity is null or capacity >= 1),
  add column vat_rate numeric(4,2) not null default 21.00,
  add column departure_stations text[] not null default '{}';

alter table public.orders
  alter column status set default 'pending',
  alter column stripe_checkout_session_id drop not null,
  add constraint orders_status_check check (status in ('pending', 'paid', 'expired')),
  add column locale text not null default 'fr',
  add column company_legal_name text,
  add column billing_address text,
  add column vat_number text,
  add column amount_subtotal_cents integer,
  add column amount_tax_cents integer,
  add column terms_accepted_at timestamptz,
  add column privacy_accepted_at timestamptz,
  add column consent_ip text,
  add column expires_at timestamptz;

-- Named expedition_participants because a CRM table called "participants" already
-- exists in this shared database and must not be touched.
create table public.expedition_participants (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders (id) on delete cascade,
  first_name text not null,
  last_name text not null,
  birthdate date not null,
  nationality text not null,
  email text not null,
  phone text not null,
  company_name text not null,
  company_position text not null,
  id_document_number text not null,
  id_document_expiry date not null,
  id_document_path text,
  departure_station text not null,
  dietary_restrictions text,
  emergency_contact_name text not null,
  emergency_contact_phone text not null,
  created_at timestamptz not null default now()
);

alter table public.expedition_participants enable row level security;

-- Private bucket for ID scans. No storage policies: only the service role touches it.
insert into storage.buckets (id, name, public)
values ('id-documents', 'id-documents', false)
on conflict (id) do nothing;
