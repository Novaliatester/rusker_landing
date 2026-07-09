# Individual Bookings, Participant Identity & Admin Dashboard — Design

**Date:** 2026-07-09
**Status:** Approved by user (sections reviewed interactively)
**Builds on:** `2026-07-08-expeditions-checkout-design.md` (Stripe hosted checkout, webhook, orders — live at app.rusker-travel.com)

## Problem

The current flow sells anonymous group bookings (quantity picker, no participant data). The real products are **individual-seat delegation trips** — currently two: *Délégation AURA* and *Délégation Occitanie* (AI Summit Barcelona, 21–23 Sept 2026, 20 seats each, €2,100 HT per participant). Rusker must collect each participant's identity (including a passport/ID scan) to book trains and hotels, obtain legal consents, invoice with Spanish VAT, notify the team, and give admins a dashboard to run logistics.

## Decisions (made with user)

| Topic | Decision |
|---|---|
| Sale model | Instant purchase — public page, anyone with the link can buy |
| Seats per checkout | Multiple allowed; full identity form + ID upload for **every** participant **before** payment; one invoice per order |
| Form shape | 3-step wizard: Participants → Billing → Review & Pay |
| VAT | Always Spanish 21% (service physically in Spain): €2,100 HT + €441 = **€2,541/seat**; Stripe fixed tax rate + Stripe-generated numbered invoice |
| Admin auth | Supabase Auth magic link, env-var email allowlist (adam@, tanguy@rusker-travel.com) |
| ID scan retention | Auto-delete 30 days after expedition end date; booking data kept |
| Legal texts | Placeholder Terms of Sale + GDPR privacy notice drafted, marked for lawyer review |
| Language | French + English (next-intl), French default |

## Data model (new migration)

**`expeditions`** — add: `starts_on date`, `ends_on date`, `capacity integer` (20), `vat_rate numeric(4,2) default 21.00`, `departure_stations text[]` (choices the wizard offers, e.g. `{Lyon,Grenoble}`). `price_per_person_cents` now means the **HT** unit price (210000). `min_participants` becomes 1 for these offers; the column stays for compatibility.

**`orders`** — add:
- `status text` check in `('pending','paid','expired')`, default `'pending'` (webhook flips to `paid`; cron flips abandoned to `expired`)
- Billing: `company_legal_name text`, `billing_address text`, `vat_number text`
- Amounts: `amount_subtotal_cents int`, `amount_tax_cents int` (existing `amount_total_cents` keeps the TTC total)
- Consent proof: `terms_accepted_at timestamptz`, `privacy_accepted_at timestamptz`, `consent_ip text`
- Lifecycle: `expires_at timestamptz` (pending hold; mirrors the Stripe session's 30-minute expiry)
- `stripe_checkout_session_id` becomes nullable (set immediately after session creation, before redirect)

**`participants`** — new table, one row per seat:
`id uuid pk`, `order_id uuid fk → orders`, `first_name`, `last_name`, `birthdate date`, `nationality`, `email`, `phone`, `company_name`, `company_position`, `id_document_number`, `id_document_expiry date`, `id_document_path text` (storage key, nulled after retention purge), `departure_station`, `dietary_restrictions`, `emergency_contact_name`, `emergency_contact_phone`, `created_at`. RLS enabled, no policies (service-role only), like all our tables.

**Storage** — private bucket `id-documents`, keys `orders/{order_id}/{participant_id}.{ext}`. JPG/PNG/PDF, ≤10 MB. All reads/writes go through server routes with the service-role key; the browser never gets bucket credentials. Admin views use signed URLs (10-minute TTL).

**Seat accounting** — seats taken = Σ quantity over orders with `status='paid'` OR (`status='pending'` AND `expires_at > now()`). Checked when the wizard loads and re-checked inside `POST /api/bookings`. Low-traffic products (20 seats); the residual race between two simultaneous submits is accepted and surfaced in `/admin` if it ever happens.

## Booking flow

Route `/[locale]/expeditions/[slug]/book`, client wizard, 3 steps:

1. **Participants** — 1..N blocks (N = seats remaining). Fields: first name, last name, birthdate, nationality, email, phone, company, position, ID number, ID expiry, departure station, dietary restrictions, emergency contact name + phone, ID scan upload. Each completed block uploads its file right away (`POST /api/bookings/upload` → temp storage key) so final submit is fast.
2. **Billing** — company legal name, billing address, VAT number (pre-filled from participant 1's company).
3. **Review & Pay** — participant summary, price table (N × €2,100 HT, +21% IVA, total TTC), two mandatory checkboxes linking to `/terms` and `/privacy`, submit button.

`POST /api/bookings`:
1. Validate payload server-side (all fields, consents true, file keys present).
2. Re-check seat availability → 409 with a friendly message if insufficient.
3. Create `pending` order + participants rows; move uploads under the order's storage prefix.
4. Create Stripe Customer (name = company legal name, address = billing address; attach `eu_vat` tax id when the VAT number parses as one — best-effort).
5. Create checkout session: line item = HT unit price × N with a fixed 21% **exclusive** tax rate (find-or-create by name "IVA 21%"), `invoice_creation.enabled = true`, `expires_at = +30 min`, metadata `order_id`, success → `/checkout/success`, cancel → the expedition page.
6. Save session id on the order, return the session URL for redirect.

**Webhook** (existing `/api/webhooks/stripe`, extended): on `checkout.session.completed`, mark the order `paid` (idempotent — only the `pending→paid` transition sends emails), store payment intent + final amounts, then fail-soft emails.

## Emails (Resend — account setup is a follow-up; failures logged, never block the order)

1. **Buyer confirmation** (locale of the booking): expedition, dates, participants, amount breakdown, Stripe hosted invoice link, "the team will contact you".
2. **Admin notification** to `ADMIN_NOTIFICATION_EMAILS` (adam@, tanguy@): full reservation details + deep link to `/admin/orders/{id}`.

## Admin dashboard

- `/admin/login` — email → magic link, sent only for allowlisted addresses (`ADMIN_EMAILS` env). Supabase Auth via `@supabase/ssr` (adds anon-key envs); middleware guards all `/admin/*` routes.
- `/admin` — per-expedition seats sold/remaining + revenue; recent bookings list (paid & pending).
- `/admin/orders/[id]` — everything: participants (all fields), billing, consent timestamps + IP, Stripe links, signed-URL buttons to view each ID scan.
- `/admin/expeditions/[id]/export.csv` — participant manifest (names, birthdates, ID numbers + expiry, nationality, departure station, dietary, emergency contacts) for train/hotel booking.
- Admin UI language: English (internal tool).

## Data lifecycle (GDPR)

Vercel Cron → `GET /api/cron/cleanup` (Bearer `CRON_SECRET`), daily:
1. **Abandoned bookings:** `pending` orders past `expires_at` → delete their ID files, delete participants rows, mark order `expired`.
2. **Retention:** expeditions with `ends_on + 30 days < today` → delete remaining ID files, null `id_document_path`. Names/orders are retained (legitimate accounting interest).

The privacy notice documents: what is collected, why (travel booking), storage location (Supabase EU — Paris), recipients (Adam, Tanguy), retention (scans 30 days post-trip), and contact for erasure requests.

## i18n

Platform adopts next-intl (same pattern as `apps/web`): locales `fr` (default) + `en`, locale-prefixed routes, switcher in the header. All new user-facing surfaces (catalog, wizard, success/cancel, legal pages, buyer emails) are translated; `/admin` is English-only.

## Content

Replace the two dev seeds with the real offers (data from the flyers):
- *Délégation AURA — AI Summit Barcelona 2026* (`aura-ai-summit-2026`): trains Lyon/Grenoble, 21–23 Sept 2026, 20 seats, 210000 cents HT.
- *Délégation Occitanie — AI Summit Barcelona 2026* (`occitanie-ai-summit-2026`): trains Toulouse/Montpellier, otherwise identical.
Descriptions carry the program (D1 arrival/dinner, D2 summit + networking, D3 workshops + return) and inclusions (train, 4★ hotel ×2 nights, opening dinner, Pass Gold, side events, AI Week access, Rusker accompaniment). Departure-station options per expedition are stored on the expedition row (`departure_stations text[]`) so the wizard shows the right choices.

## Error handling

- Wizard: inline per-field validation; upload failures retryable per participant; seat-availability conflict at submit → message + refreshed availability.
- `POST /api/bookings`: 400 invalid payload, 409 seats gone, 502 Stripe failure (pending order cleaned up so seats aren't leaked).
- Webhook: unchanged semantics — 500 on DB failure so Stripe retries; email failures logged only.
- Success page: exists already; now also shows participant count.

## Testing (TDD where there's logic)

- Booking payload validation incl. multi-participant, consent flags, field formats.
- Seat-capacity math (paid + live pending − expired).
- Webhook transition `pending→paid` idempotency (emails exactly once).
- Cleanup rules (which orders/files each cron pass touches).
- Admin allowlist check.
- Route tests: `/api/bookings` (mocked Stripe/Supabase), webhook route (existing suite extended).
- Manual E2E in Stripe test mode before launch.

## New environment variables

`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` (admin auth), `ADMIN_EMAILS`, `ADMIN_NOTIFICATION_EMAILS`, `CRON_SECRET`, `RESEND_API_KEY` (when the account exists).

## Explicitly out of scope / follow-ups

- Resend account + domain verification (user does right after; email code ships fail-soft).
- Stripe live mode switch + live webhook endpoint (launch step).
- Lawyer review of `/terms` and `/privacy` placeholders (**required before real sales**).
- Refunds/cancellations UI, seat transfers, multi-expedition cart, CRM integration.
