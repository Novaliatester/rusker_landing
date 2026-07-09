# Deployment — two Vercel projects from one repo

## Vercel projects

| Project | Root Directory | Domain | Env vars |
|---|---|---|---|
| rusker-web | `apps/web` | rusker-travel.com, www | `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, (`NEXT_PUBLIC_PLATFORM_URL` optional override) |
| rusker-platform | `apps/platform` | app.rusker-travel.com | `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `RESEND_API_KEY`, `ADMIN_EMAILS`, `ADMIN_NOTIFICATION_EMAILS`, `CRON_SECRET`, `NEXT_PUBLIC_SITE_URL=https://app.rusker-travel.com` |

Setup for each project: Vercel → Add New Project → import this repo → set **Root Directory**
(build/install commands stay default — Vercel detects npm workspaces and installs at the repo root).
The existing rusker-web project just needs its Root Directory changed to `apps/web` after the
monorepo restructure lands.

DNS: add `app` CNAME → `cname.vercel-dns.com` (Vercel shows the exact target when the domain
is added to the rusker-platform project).

## Stripe (do in test mode first, repeat in live mode)

1. Dashboard → Developers → API keys → copy the secret key → `STRIPE_SECRET_KEY`.
2. Dashboard → Developers → Webhooks → Add endpoint:
   - URL: `https://app.rusker-travel.com/api/webhooks/stripe`
   - Events: `checkout.session.completed` (card paid), `checkout.session.expired` (card abandoned → order purged), `invoice.paid` (bank transfer settled).
   - Copy the signing secret → `STRIPE_WEBHOOK_SECRET`.
3. Dashboard → Settings → Emails: we send our own branded emails via Resend. Leave Stripe's
   "Email finalized invoices to customers" **off** so bank-transfer buyers don't get a duplicate
   of the invoice Rusker already emails them.

### Two payment modes
- **Card** — Stripe Checkout, card only. The order is created `pending` with ID scans held in `tmp/`;
  on payment it flips to `paid` and the scans are promoted to permanent storage. An abandoned session
  fires `checkout.session.expired`, which hard-deletes the order and its tmp files (belt-and-suspenders:
  the daily cron also purges stragglers).
- **Bank transfer** — a Stripe Invoice (`send_invoice`, due in 14 days) backs an `awaiting_transfer`
  order; the seat is held. `invoice.paid` (or the admin "Mark as paid" action) flips it to `paid`.
  The daily cron cancels + notifies unpaid orders past the due date (status `cancelled`).

## Resend

1. Create the account, add domain `rusker-travel.com`, add the DNS records Resend shows
   (SPF + DKIM), wait for verification.
2. Create an API key → `RESEND_API_KEY`.
3. Sender is `bookings@rusker-travel.com` (defined in `apps/platform/lib/emails.ts`).

## Supabase

The schema is managed with the Supabase CLI (`supabase/migrations/`, linked to the
Rusker Travel project). New migrations: add a timestamped SQL file and run
`supabase db push`. Manage the expeditions catalog by inserting/updating rows in the
`expeditions` table (Table Editor).

## Admin & cron

- Legal documents are live v1.0 (2026-07-09): `/terms` (full CGV, FR+EN) and `/privacy` (GDPR notice,
  FR+EN), sourced from `lib/legal/cgv.ts` and `lib/legal/privacy.ts`. Checkout requires two consents
  (CGV + privacy); the separate "terms of service" was removed. Bump `CONSENT_VERSIONS` in
  `lib/consent.ts` whenever either text changes.
- Admin dashboard: https://app.rusker-travel.com/admin — **email OTP login** (8-digit code), allowlist in `ADMIN_EMAILS`.
- Supabase dashboard → Authentication → Email Templates → **Magic Link**: the body must render the
  code (`{{ .Token }}`) or the email only has a link and no code shows. The project issues 8-digit
  codes. No URL allowlist is needed with OTP.
- Vercel Cron (`apps/platform/vercel.json`) hits `/api/cron/cleanup` daily at 03:00 UTC;
  it purges abandoned pending bookings and ID scans older than 30 days post-expedition.
  `CRON_SECRET` must be set on the Vercel project (Vercel sends it as the Bearer token automatically).
- Env changes only take effect after a redeploy.

## Local development

- `npm run dev` (turbo runs both apps: web on :3000, platform on :3001)
- Webhooks locally: `stripe listen --forward-to localhost:3001/api/webhooks/stripe`
  → copy the printed `whsec_...` into `apps/platform/.env.local`.
- Test card: `4242 4242 4242 4242`, any future expiry, any CVC.
