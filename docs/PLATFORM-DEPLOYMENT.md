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
   - Events: `checkout.session.completed`
   - Copy the signing secret → `STRIPE_WEBHOOK_SECRET`.
3. Dashboard → Settings → Emails → enable **Successful payments** (customer receipt).

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

- Admin dashboard: https://app.rusker-travel.com/admin — magic-link login, allowlist in `ADMIN_EMAILS`.
- Supabase dashboard → Authentication → URL Configuration must allowlist
  `https://app.rusker-travel.com/admin/auth/confirm` (and `http://localhost:3001/admin/auth/confirm` for dev).
- Vercel Cron (`apps/platform/vercel.json`) hits `/api/cron/cleanup` daily at 03:00 UTC;
  it purges abandoned pending bookings and ID scans older than 30 days post-expedition.
  `CRON_SECRET` must be set on the Vercel project (Vercel sends it as the Bearer token automatically).
- Env changes only take effect after a redeploy.

## Local development

- `npm run dev` (turbo runs both apps: web on :3000, platform on :3001)
- Webhooks locally: `stripe listen --forward-to localhost:3001/api/webhooks/stripe`
  → copy the printed `whsec_...` into `apps/platform/.env.local`.
- Test card: `4242 4242 4242 4242`, any future expiry, any CVC.
