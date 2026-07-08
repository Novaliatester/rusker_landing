# Learning Expeditions Purchase Platform — Design

**Date:** 2026-07-08
**Status:** Approved by user (interactive brainstorming session)

## Summary

Add a self-serve purchase flow for Rusker learning expeditions using Stripe hosted
checkout, and restructure the repository into a Turborepo monorepo modeled on the
AI Summit repo (`aisummitbarcelona/AI-SUMMIT-FULL-WEBSITE`): multiple Next.js apps
at the repo root, deployed to different domains from the same repo.

## Decisions made

| Question | Decision |
|---|---|
| Repo shape | Full monorepo split now: `apps/web` (landing) + `apps/platform` (purchase system) |
| Git | Evolve the existing `rusker_landing` repo in place — keep history and remotes |
| Tooling | npm workspaces + Turborepo (landing already uses npm; Bun swap possible later) |
| Pricing model | Per-person price × quantity, single payment via Stripe hosted Checkout |
| Catalog source | Supabase table (`expeditions`), reusing the existing Supabase project |
| Post-payment | Order recorded in Supabase (webhook), Stripe receipt email, custom Resend confirmation email, team notification email |
| Auth | None in v1 — guest checkout; Stripe collects buyer email |
| VAT | Prices are VAT-inclusive (21% ES included); no Stripe Tax in v1 |
| Languages | Platform catalog is English-only in v1 (landing stays trilingual) |

## Repo structure

```
rusker_landing/  (repo root — the existing repo, restructured; renameable later)
├── package.json          # npm workspaces: apps/*, packages/*
├── turbo.json            # dev/build/lint tasks; env allowlist (STRIPE_*, SUPABASE_*, RESEND_*)
├── apps/
│   ├── web/              # current landing site moved wholesale → rusker-travel.com
│   └── platform/         # NEW Next.js 15 app → app.rusker-travel.com
│       ├── app/
│       │   ├── expeditions/page.tsx          # catalog (server-rendered)
│       │   ├── expeditions/[slug]/page.tsx   # detail + quantity picker
│       │   ├── checkout/success/page.tsx
│       │   ├── checkout/cancelled/page.tsx
│       │   └── api/
│       │       ├── checkout/route.ts         # creates Stripe Checkout Session
│       │       └── webhooks/stripe/route.ts  # order insert + emails
│       └── lib/          # stripe.ts, supabase.ts, orders.ts, emails.ts
├── packages/
│   ├── config/           # shared tsconfig base
│   └── ui/               # brand tokens (Rusker Blue #277396) shared by both apps; grows over time
└── supabase/
    └── migrations/       # SQL migrations (expeditions, orders)
```

**Deployment:** two Vercel projects from the same repo — `rusker-web`
(root directory `apps/web`, keeps `rusker-travel.com`) and `rusker-platform`
(root directory `apps/platform`, on `app.rusker-travel.com`). The landing's
"Book an expedition" CTAs link across to the platform.

`apps/web` changes are limited to: moving into the workspace, and the CTA link.
All new functionality lives in `apps/platform`.

## Data model (Supabase)

Created via SQL migrations in `supabase/migrations/`, in the existing Supabase project.

### `expeditions`

| column | type | notes |
|---|---|---|
| `id` | uuid pk | `gen_random_uuid()` |
| `slug` | text unique not null | URL identity |
| `title` | text not null | |
| `description` | text | |
| `image_url` | text | |
| `price_per_person_cents` | integer not null | VAT-inclusive |
| `currency` | text not null default `'eur'` | |
| `min_participants` | integer not null default 1 | quantity picker lower bound |
| `max_participants` | integer | quantity picker upper bound (null = no cap) |
| `is_active` | boolean not null default true | only active rows are listed |
| `created_at` | timestamptz default now() | |

### `orders`

Written **only by the Stripe webhook** — no pending rows. Expedition id and
quantity travel in Checkout Session `metadata`.

| column | type | notes |
|---|---|---|
| `id` | uuid pk | |
| `expedition_id` | uuid fk → expeditions | |
| `quantity` | integer not null | |
| `buyer_email` | text not null | from Stripe customer details |
| `buyer_name` | text | |
| `amount_total_cents` | integer not null | |
| `currency` | text not null | |
| `status` | text not null default `'paid'` | later: `refunded` |
| `stripe_checkout_session_id` | text unique not null | idempotency key for webhook retries |
| `stripe_payment_intent_id` | text | |
| `created_at` | timestamptz default now() | |

**RLS:** enabled on both tables with **no public policies**. All access goes
through server code using the existing service-role key; nothing is exposed to
browsers.

## Purchase flow

1. **`/expeditions`** — server-rendered catalog of active expeditions (image,
   title, per-person price).
2. **`/expeditions/[slug]`** — description, per-person price, quantity picker
   clamped to `min/max_participants`, live total, "Proceed to payment" button.
3. **`POST /api/checkout`** — receives `{ slug, quantity }`:
   - Re-reads the expedition from Supabase — **the price always comes from the
     DB, never from the client.** Validates `is_active` and quantity bounds.
   - Creates a Stripe Checkout Session: `mode: 'payment'`, one `line_item` with
     `price_data` from the DB price and `quantity`,
     `metadata: { expedition_id, quantity }`, `customer_creation: 'always'`,
     billing address + name collected by Stripe.
   - `success_url: /checkout/success?session_id={CHECKOUT_SESSION_ID}`;
     `cancel_url` back to the expedition detail page.
   - Returns the session URL; the browser redirects to Stripe's hosted page.
     No Stripe.js client-side — hosted checkout is a pure redirect, PCI handled
     by Stripe.
4. **`/checkout/success`** — retrieves the session server-side and checks
   `payment_status === 'paid'` before showing the branded confirmation. If not
   yet paid (delayed payment method), shows a "payment processing" state — never
   a false confirmation.
5. **`/checkout/cancelled`** — friendly "nothing was charged" page linking back
   to the catalog.

## Webhook & post-payment

**`POST /api/webhooks/stripe`** (registered in the Stripe dashboard):

1. Verify the signature with `STRIPE_WEBHOOK_SECRET` against the raw body;
   reject anything unsigned (400).
2. On `checkout.session.completed` with `payment_status === 'paid'`:
   - Insert the `orders` row from session metadata + customer details.
     Idempotent via the unique `stripe_checkout_session_id` — Stripe retries
     are safe.
   - Then, **best-effort** (failures logged, never fail the webhook once the
     order is stored):
     - Buyer confirmation email via Resend — branded "your expedition is
       booked, here's what happens next".
     - Team notification email to `TEAM_NOTIFICATION_EMAIL` — expedition,
       quantity, buyer, amount. (Slack can replace this later.)
3. Order insert failure → 500 so Stripe retries automatically. Unhandled event
   types → 200, ignored.

Stripe's built-in receipt email is enabled in the dashboard (zero code):
the buyer gets the payment receipt from Stripe and the "what's next" email
from Rusker.

## Environment variables

| Variable | Where | Purpose |
|---|---|---|
| `SUPABASE_URL` | existing | Supabase project |
| `SUPABASE_SERVICE_ROLE_KEY` | existing | server-side DB access |
| `STRIPE_SECRET_KEY` | new | Checkout Session creation |
| `STRIPE_WEBHOOK_SECRET` | new | webhook signature verification |
| `RESEND_API_KEY` | new | transactional emails |
| `TEAM_NOTIFICATION_EMAIL` | new | sale notifications recipient |

One-time setup: Resend domain verification for `rusker-travel.com`
(sender e.g. `bookings@rusker-travel.com`).

## Error handling

- `POST /api/checkout`: unknown slug / inactive expedition / out-of-bounds
  quantity → 400 with a friendly message on the detail page. Stripe API errors
  → generic "try again" message without losing the user's selection.
- Success page: unpaid session → "payment processing" state.
- Webhook: bad signature → 400; insert failure → 500 (Stripe retries); email
  failure after insert → logged, 200.
- Catalog fetch failure / empty catalog → graceful empty state.

## Testing

- Built and verified against **Stripe test mode**; local webhook development
  via `stripe listen --forward-to`.
- Automated tests for money-touching logic: checkout route validation (DB
  price, quantity clamping) and webhook handling (signature verification,
  idempotent insert). UI pages verified manually.
- Pre-launch manual pass: full test-card purchase, cancel path, duplicate
  webhook delivery, quantity bounds, both emails arriving.

## Out of scope (future)

- User accounts / order history (platform auth)
- Deposits / installment payments
- Multilingual catalog on the platform
- Slack notifications
- Stripe Tax / B2B invoicing (AI Summit-style sales orders)
- Refund handling beyond a `status` column
