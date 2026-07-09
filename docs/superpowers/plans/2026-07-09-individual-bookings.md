# Individual Bookings, Participant Identity & Admin Dashboard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the anonymous group-checkout into an individual-seat booking flow with full participant identity collection (incl. ID scans), 21% Spanish VAT invoicing, FR/EN i18n, GDPR lifecycle, and an admin dashboard at /admin.

**Architecture:** A 3-step wizard collects participants (+ ID uploads to a private bucket via server routes), billing, and consents; `POST /api/bookings` creates a `pending` order + participants and a Stripe hosted-checkout session (fixed 21% tax rate, Stripe-generated invoice); the webhook flips `pending→paid` idempotently and sends Resend emails. A daily cron purges abandoned bookings and enforces 30-day ID retention. `/admin` uses Supabase Auth magic links gated by an email allowlist.

**Tech Stack:** Next.js 15 (App Router), next-intl 4, @supabase/supabase-js + @supabase/ssr, Supabase Storage, Stripe hosted Checkout + Tax Rates + Invoicing, Resend, Vitest.

**Spec:** `docs/superpowers/specs/2026-07-09-individual-bookings-design.md`

**Context notes for the implementer:**
- Repo root `/Users/lucassala/Code/RUSKER/rusker_landing`; work on branch `feat/individual-bookings` off `main`.
- `apps/platform` is live at app.rusker-travel.com (Vercel project `rusker-landing-platform`, CLI linked in `apps/platform/.vercel/`). Stripe is TEST mode. Resend is NOT set up (emails must fail-soft).
- `supabase db push` and Vercel prod deploys require explicit user approval (permission classifier). DML (seeds) may go through the REST API with the service-role key in `apps/platform/.env.local`.
- `apps/web` has a custom client-only i18n (`apps/web/lib/i18n.tsx`); the platform intentionally uses next-intl instead because catalog/detail/success pages and emails are server-rendered.
- All Supabase data access stays service-role via server code; RLS enabled with no policies. The ONLY exception is Supabase Auth for admins (anon key + cookies via @supabase/ssr).

---

### Task 1: Branch + migration for expeditions/orders/participants + private bucket

**Files:**
- Create: `supabase/migrations/20260709130000_individual_bookings.sql`

- [ ] **Step 1: Create the branch**

```bash
cd /Users/lucassala/Code/RUSKER/rusker_landing
git checkout main && git pull && git checkout -b feat/individual-bookings
```

- [ ] **Step 2: Write the migration**

`supabase/migrations/20260709130000_individual_bookings.sql`:

```sql
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

create table public.participants (
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

alter table public.participants enable row level security;

-- Private bucket for ID scans. No storage policies: only the service role touches it.
insert into storage.buckets (id, name, public)
values ('id-documents', 'id-documents', false)
on conflict (id) do nothing;
```

- [ ] **Step 3: Apply to Supabase — REQUIRES USER APPROVAL**

```bash
supabase db push
```

This applies DDL to the LIVE project (`tzacbljclqgyvpqnsdyk`). Ask the user before running. If unavailable, mark HUMAN (dashboard SQL editor) and continue — tests don't hit the real DB.

- [ ] **Step 4: Commit**

```bash
git add supabase && git commit -m "feat: migration for individual bookings (participants, order lifecycle, id-documents bucket)"
```

---

### Task 2: Dependencies + next-intl scaffold (locale routing, messages, layout move)

**Files:**
- Modify: `apps/platform/package.json`
- Create: `apps/platform/i18n/routing.ts`, `apps/platform/i18n/request.ts`, `apps/platform/i18n/navigation.ts`
- Create: `apps/platform/messages/fr.json`, `apps/platform/messages/en.json`
- Modify: `apps/platform/next.config.ts`
- Create: `apps/platform/middleware.ts`
- Move: `apps/platform/app/layout.tsx` → `apps/platform/app/(site)/[locale]/layout.tsx`; `app/page.tsx` → `app/(site)/[locale]/page.tsx`; `app/expeditions/*` → `app/(site)/[locale]/expeditions/*`; `app/checkout/*` → `app/(site)/[locale]/checkout/*` (`app/api/*` and `app/globals.css` stay put)
- Create: `apps/platform/components/LocaleSwitcher.tsx`

**Why route groups:** Next.js requires every root layout to render `<html>`/`<body>`, and `/admin` (Task 10/11) must NOT be locale-prefixed. The "multiple root layouts" pattern solves this: `app/(site)/[locale]/layout.tsx` and `app/(admin)/admin/layout.tsx` are BOTH root layouts with their own `<html>`, and there is NO `app/layout.tsx`. Route groups don't affect URLs. The bare `/` is redirected to `/fr` by the next-intl middleware.

- [ ] **Step 1: Add dependencies**

In `apps/platform/package.json` `dependencies`, add:

```json
    "@supabase/ssr": "^0.7.0",
    "next-intl": "^4.0.0",
```

Then `npm install` at the repo root.

- [ ] **Step 2: Create the i18n plumbing**

`apps/platform/i18n/routing.ts`:

```ts
import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['fr', 'en'],
  defaultLocale: 'fr',
})

export type Locale = (typeof routing.locales)[number]
```

`apps/platform/i18n/request.ts`:

```ts
import { getRequestConfig } from 'next-intl/server'
import { hasLocale } from 'next-intl'
import { routing } from './routing'

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale
  return { locale, messages: (await import(`../messages/${locale}.json`)).default }
})
```

`apps/platform/i18n/navigation.ts`:

```ts
import { createNavigation } from 'next-intl/navigation'
import { routing } from './routing'

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing)
```

- [ ] **Step 3: Create the messages files**

`apps/platform/messages/fr.json` (single source of key structure — en mirrors it):

```json
{
  "catalog": {
    "title": "Learning Expeditions",
    "intro": "Des immersions professionnelles à Barcelone. Choisissez votre expédition et réservez votre place en ligne.",
    "perPerson": "/ personne (HT)",
    "loadError": "Impossible de charger les expéditions pour le moment. Réessayez dans un instant.",
    "empty": "Aucune expédition disponible pour le moment.",
    "seatsLeft": "{count} places restantes",
    "soldOut": "Complet",
    "dates": "Du {start} au {end}"
  },
  "detail": {
    "back": "← Toutes les expéditions",
    "book": "Réserver ma place",
    "priceHt": "{price} HT / personne",
    "vatNote": "TVA espagnole 21% en sus — total {total} TTC par personne"
  },
  "wizard": {
    "title": "Réservation — {expedition}",
    "step1": "Participants",
    "step2": "Facturation",
    "step3": "Vérification & paiement",
    "participant": "Participant {number}",
    "addParticipant": "+ Ajouter un participant",
    "removeParticipant": "Retirer",
    "firstName": "Prénom",
    "lastName": "Nom",
    "birthdate": "Date de naissance",
    "nationality": "Nationalité",
    "email": "Email",
    "phone": "Téléphone",
    "companyName": "Entreprise",
    "companyPosition": "Fonction",
    "idNumber": "N° de passeport ou CNI",
    "idExpiry": "Date d'expiration du document",
    "idUpload": "Copie du passeport ou de la CNI (JPG, PNG ou PDF, 10 Mo max)",
    "idUploaded": "Document reçu ✓",
    "departureStation": "Gare de départ",
    "dietary": "Restrictions alimentaires (optionnel)",
    "emergencyName": "Contact d'urgence — nom",
    "emergencyPhone": "Contact d'urgence — téléphone",
    "companyLegalName": "Raison sociale",
    "billingAddress": "Adresse de facturation",
    "vatNumber": "N° de TVA intracommunautaire (ou SIRET)",
    "summary": "Récapitulatif",
    "seat": "{count, plural, one {# place} other {# places}}",
    "subtotal": "Sous-total HT",
    "vat": "TVA espagnole (21%)",
    "total": "Total TTC",
    "acceptTerms": "J'accepte les <link>conditions de vente</link>",
    "acceptPrivacy": "J'accepte le <link>traitement de mes données personnelles</link>, y compris ma pièce d'identité, pour l'organisation du voyage",
    "pay": "Procéder au paiement",
    "paying": "Redirection vers le paiement…",
    "next": "Continuer",
    "back": "Retour",
    "required": "Ce champ est requis",
    "invalidFile": "Fichier invalide : JPG, PNG ou PDF, 10 Mo maximum",
    "uploadFailed": "L'envoi du document a échoué — réessayez",
    "notEnoughSeats": "Il ne reste plus assez de places pour cette réservation",
    "genericError": "Une erreur est survenue — merci de réessayer"
  },
  "success": {
    "title": "Votre expédition est réservée ! 🎉",
    "body": "Merci {name}. Une confirmation et votre facture ont été envoyées à {email}.",
    "processing": "Paiement en cours de confirmation…",
    "processingBody": "Vous recevrez votre confirmation par email dès validation — inutile de payer à nouveau.",
    "invalid": "Nous ne retrouvons pas ce paiement",
    "invalidBody": "Si vous avez bien payé, vous recevrez votre confirmation par email.",
    "backToCatalog": "Retour aux expéditions"
  },
  "cancelled": {
    "title": "Paiement annulé",
    "body": "Aucun montant n'a été débité. Votre expédition vous attend toujours.",
    "back": "Retour aux expéditions"
  },
  "footer": { "tagline": "Learning Expeditions" }
}
```

`apps/platform/messages/en.json`: same keys, English values (translate faithfully; keep ICU syntax identical — e.g. `"seatsLeft": "{count} seats left"`, `"acceptTerms": "I accept the <link>terms of sale</link>"`, `"vat": "Spanish VAT (21%)"`, etc.).

- [ ] **Step 4: Wire the plugin + middleware**

`apps/platform/next.config.ts` becomes:

```ts
import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
}

export default withNextIntl(nextConfig)
```

`apps/platform/middleware.ts` (admin guard lands in Task 10; locale routing only for now):

```ts
import createMiddleware from 'next-intl/middleware'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { routing } from './i18n/routing'

const intlMiddleware = createMiddleware(routing)

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (pathname.startsWith('/admin')) return NextResponse.next() // replaced in Task 10
  return intlMiddleware(request)
}

export const config = {
  matcher: ['/((?!api|_next|favicon.ico|.*\\..*).*)'],
}
```

- [ ] **Step 5: Restructure app/ around [locale]**

```bash
cd apps/platform
mkdir -p "app/(site)/[locale]"
git mv app/expeditions "app/(site)/[locale]/expeditions"
git mv app/checkout "app/(site)/[locale]/checkout"
git mv app/page.tsx "app/(site)/[locale]/page.tsx"
git mv app/layout.tsx "app/(site)/[locale]/layout.tsx"
```

There is deliberately NO `app/layout.tsx` — see the route-groups note above.

Replace `apps/platform/app/(site)/[locale]/layout.tsx` entirely with:

```tsx
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import LocaleSwitcher from '@/components/LocaleSwitcher'
import '../../globals.css'

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'], display: 'swap' })

export const metadata: Metadata = {
  title: 'Rusker Expeditions',
  description: 'Réservez une learning expedition Rusker à Barcelone.',
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)
  const t = await getTranslations('footer')

  return (
    <html lang={locale}>
      <body className={`${poppins.className} bg-bg-light text-text-dark antialiased`}>
        <header className="bg-white shadow-soft">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <a href="https://rusker-travel.com" className="text-xl font-bold tracking-wide text-rusker-blue">
              RUSKER
            </a>
            <div className="flex items-center gap-6">
              <span className="text-sm text-gray-500">{t('tagline')}</span>
              <LocaleSwitcher />
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-6 py-12">
          <NextIntlClientProvider>{children}</NextIntlClientProvider>
        </main>
        <footer className="mt-16 border-t border-neutral-mid/40 bg-white">
          <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-gray-500">
            © {new Date().getFullYear()} Rusker Travel ·{' '}
            <a href="https://rusker-travel.com" className="underline">rusker-travel.com</a>
          </div>
        </footer>
      </body>
    </html>
  )
}
```

Note: `app/globals.css` stays at `app/globals.css`; the locale layout imports it via `../../globals.css`.

`apps/platform/components/LocaleSwitcher.tsx`:

```tsx
'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'

export default function LocaleSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  return (
    <div className="flex gap-1 text-sm">
      {routing.locales.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => router.replace(pathname, { locale: l })}
          className={`rounded px-2 py-1 uppercase ${l === locale ? 'bg-rusker-blue text-white' : 'text-gray-500 hover:text-rusker-blue'}`}
        >
          {l}
        </button>
      ))}
    </div>
  )
}
```

Update `apps/platform/app/(site)/[locale]/page.tsx`:

```tsx
import { redirect } from '@/i18n/navigation'
import { getLocale } from 'next-intl/server'

export default async function Home() {
  redirect({ href: '/expeditions', locale: await getLocale() })
}
```

- [ ] **Step 6: Translate existing pages minimally so the build stays green**

In `app/(site)/[locale]/expeditions/page.tsx`, `app/(site)/[locale]/expeditions/[slug]/page.tsx`, `app/(site)/[locale]/checkout/success/page.tsx`, `app/(site)/[locale]/checkout/cancelled/page.tsx`:
- change `params` types to include `locale` (e.g. `params: Promise<{ locale: string; slug: string }>`),
- replace `Link from 'next/link'` with `Link from '@/i18n/navigation'`,
- replace hardcoded strings with `const t = await getTranslations('catalog')` (server pages) using the keys from Step 3 (`catalog.*`, `success.*`, `cancelled.*`). The detail page's booking-panel replacement happens in Task 8 — for now keep `<BookingPanel …/>` as-is (it still compiles).

- [ ] **Step 7: Build, typecheck, commit**

```bash
npm run build && npx tsc --noEmit -p apps/platform
git add -A && git commit -m "feat(platform): next-intl FR/EN locale routing and translated shell"
```

Expected: build lists routes under `/[locale]/…`; `/fr/expeditions` and `/en/expeditions` render.

---

### Task 3: Amounts + seats math (TDD)

**Files:**
- Create: `apps/platform/lib/pricing.ts`, `apps/platform/lib/seats.ts`
- Test: `apps/platform/lib/__tests__/pricing.test.ts`, `apps/platform/lib/__tests__/seats.test.ts`

- [ ] **Step 1: Write the failing tests**

`apps/platform/lib/__tests__/pricing.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { computeAmounts } from '@/lib/pricing'

describe('computeAmounts', () => {
  it('computes 21% VAT on one seat', () => {
    expect(computeAmounts(210000, 1, 21)).toEqual({
      subtotalCents: 210000,
      taxCents: 44100,
      totalCents: 254100,
    })
  })

  it('computes multi-seat totals', () => {
    expect(computeAmounts(210000, 3, 21)).toEqual({
      subtotalCents: 630000,
      taxCents: 132300,
      totalCents: 762300,
    })
  })

  it('rounds tax to the nearest cent', () => {
    // 1234 * 21% = 259.14 -> 259
    expect(computeAmounts(1234, 1, 21)).toEqual({ subtotalCents: 1234, taxCents: 259, totalCents: 1493 })
  })
})
```

`apps/platform/lib/__tests__/seats.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { seatsTaken, remainingSeats } from '@/lib/seats'

const NOW = '2026-07-09T10:00:00.000Z'

describe('seatsTaken', () => {
  it('counts paid orders and live pending holds, ignores expired ones', () => {
    expect(
      seatsTaken(
        [
          { quantity: 2, status: 'paid', expires_at: null },
          { quantity: 3, status: 'pending', expires_at: '2026-07-09T10:30:00.000Z' },
          { quantity: 5, status: 'pending', expires_at: '2026-07-09T09:00:00.000Z' },
          { quantity: 4, status: 'expired', expires_at: '2026-07-09T09:00:00.000Z' },
        ],
        NOW
      )
    ).toBe(5)
  })
})

describe('remainingSeats', () => {
  it('subtracts from capacity and never goes negative', () => {
    expect(remainingSeats(20, [{ quantity: 19, status: 'paid', expires_at: null }], NOW)).toBe(1)
    expect(remainingSeats(20, [{ quantity: 25, status: 'paid', expires_at: null }], NOW)).toBe(0)
  })

  it('treats null capacity as unlimited', () => {
    expect(remainingSeats(null, [{ quantity: 500, status: 'paid', expires_at: null }], NOW)).toBe(Infinity)
  })
})
```

- [ ] **Step 2: Run to verify they fail**

```bash
cd apps/platform && npx vitest run lib/__tests__/pricing.test.ts lib/__tests__/seats.test.ts
```

Expected: FAIL — cannot resolve `@/lib/pricing` / `@/lib/seats`.

- [ ] **Step 3: Implement**

`apps/platform/lib/pricing.ts`:

```ts
export type Amounts = { subtotalCents: number; taxCents: number; totalCents: number }

export function computeAmounts(unitHtCents: number, quantity: number, vatRatePct: number): Amounts {
  const subtotalCents = unitHtCents * quantity
  const taxCents = Math.round((subtotalCents * vatRatePct) / 100)
  return { subtotalCents, taxCents, totalCents: subtotalCents + taxCents }
}
```

`apps/platform/lib/seats.ts`:

```ts
export type SeatRow = { quantity: number; status: string; expires_at: string | null }

export function seatsTaken(rows: SeatRow[], nowIso: string): number {
  return rows.reduce((sum, row) => {
    if (row.status === 'paid') return sum + row.quantity
    if (row.status === 'pending' && row.expires_at && row.expires_at > nowIso) return sum + row.quantity
    return sum
  }, 0)
}

export function remainingSeats(capacity: number | null, rows: SeatRow[], nowIso: string): number {
  if (capacity === null) return Infinity
  return Math.max(0, capacity - seatsTaken(rows, nowIso))
}
```

- [ ] **Step 4: Run tests to verify they pass, then commit**

```bash
npx vitest run lib/__tests__/pricing.test.ts lib/__tests__/seats.test.ts
git add lib && git commit -m "feat(platform): VAT amounts and seat-capacity math (TDD)"
```

---

### Task 4: Booking request validation (TDD) + expedition type/query updates

**Files:**
- Create: `apps/platform/lib/booking.ts`
- Modify: `apps/platform/lib/expeditions.ts`
- Test: `apps/platform/lib/__tests__/booking.test.ts`

- [ ] **Step 1: Write the failing tests**

`apps/platform/lib/__tests__/booking.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { parseBookingRequest, type BookingRequest } from '@/lib/booking'

const PARTICIPANT = {
  firstName: 'Jeanne',
  lastName: 'Martin',
  birthdate: '1980-04-12',
  nationality: 'Française',
  email: 'jeanne@acme.fr',
  phone: '+33 6 12 34 56 78',
  companyName: 'ACME SA',
  companyPosition: 'CTO',
  idDocumentNumber: '12AB34567',
  idDocumentExpiry: '2030-01-01',
  idDocumentKey: 'tmp/0f9c2c1e-1111-4222-8333-444455556666.pdf',
  departureStation: 'Lyon',
  dietaryRestrictions: '',
  emergencyContactName: 'Paul Martin',
  emergencyContactPhone: '+33 6 98 76 54 32',
}

const VALID = {
  slug: 'aura-ai-summit-2026',
  locale: 'fr',
  participants: [PARTICIPANT],
  billing: { companyLegalName: 'ACME SA', billingAddress: '1 rue de la Paix, 69001 Lyon, France', vatNumber: 'FR12345678901' },
  termsAccepted: true,
  privacyAccepted: true,
}

describe('parseBookingRequest', () => {
  it('accepts a valid single-participant booking', () => {
    const parsed = parseBookingRequest(VALID) as BookingRequest
    expect(parsed).not.toBeNull()
    expect(parsed.participants).toHaveLength(1)
    expect(parsed.locale).toBe('fr')
  })

  it('accepts multiple participants and empty optional fields', () => {
    const parsed = parseBookingRequest({
      ...VALID,
      participants: [PARTICIPANT, { ...PARTICIPANT, email: 'other@acme.fr' }],
      billing: { ...VALID.billing, vatNumber: '' },
    })
    expect(parsed?.participants).toHaveLength(2)
  })

  it.each([
    ['null body', null],
    ['no participants', { ...VALID, participants: [] }],
    ['too many participants', { ...VALID, participants: Array(21).fill(PARTICIPANT) }],
    ['missing consent (terms)', { ...VALID, termsAccepted: false }],
    ['missing consent (privacy)', { ...VALID, privacyAccepted: false }],
    ['missing required participant field', { ...VALID, participants: [{ ...PARTICIPANT, lastName: '' }] }],
    ['bad birthdate format', { ...VALID, participants: [{ ...PARTICIPANT, birthdate: '12/04/1980' }] }],
    ['bad email', { ...VALID, participants: [{ ...PARTICIPANT, email: 'not-an-email' }] }],
    ['upload key outside tmp/', { ...VALID, participants: [{ ...PARTICIPANT, idDocumentKey: 'orders/x/evil.pdf' }] }],
    ['upload key with traversal', { ...VALID, participants: [{ ...PARTICIPANT, idDocumentKey: 'tmp/../secrets.pdf' }] }],
    ['missing billing name', { ...VALID, billing: { ...VALID.billing, companyLegalName: '' } }],
    ['unknown locale', { ...VALID, locale: 'de' }],
  ])('rejects %s', (_name, body) => {
    expect(parseBookingRequest(body)).toBeNull()
  })
})
```

- [ ] **Step 2: Run to verify failure**

```bash
npx vitest run lib/__tests__/booking.test.ts
```

Expected: FAIL — cannot resolve `@/lib/booking`.

- [ ] **Step 3: Implement lib/booking.ts**

```ts
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const TMP_KEY = /^tmp\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.(jpg|jpeg|png|pdf)$/
const LOCALES = ['fr', 'en'] as const

export type ParticipantInput = {
  firstName: string
  lastName: string
  birthdate: string
  nationality: string
  email: string
  phone: string
  companyName: string
  companyPosition: string
  idDocumentNumber: string
  idDocumentExpiry: string
  idDocumentKey: string
  departureStation: string
  dietaryRestrictions: string
  emergencyContactName: string
  emergencyContactPhone: string
}

export type BookingRequest = {
  slug: string
  locale: (typeof LOCALES)[number]
  participants: ParticipantInput[]
  billing: { companyLegalName: string; billingAddress: string; vatNumber: string }
  termsAccepted: true
  privacyAccepted: true
}

const REQUIRED_PARTICIPANT_FIELDS: (keyof ParticipantInput)[] = [
  'firstName', 'lastName', 'birthdate', 'nationality', 'email', 'phone',
  'companyName', 'companyPosition', 'idDocumentNumber', 'idDocumentExpiry',
  'idDocumentKey', 'departureStation', 'emergencyContactName', 'emergencyContactPhone',
]

function isNonEmptyString(v: unknown): v is string {
  return typeof v === 'string' && v.trim().length > 0
}

function parseParticipant(raw: unknown): ParticipantInput | null {
  if (typeof raw !== 'object' || raw === null) return null
  const p = raw as Record<string, unknown>
  for (const field of REQUIRED_PARTICIPANT_FIELDS) {
    if (!isNonEmptyString(p[field])) return null
  }
  if (!ISO_DATE.test(p.birthdate as string) || !ISO_DATE.test(p.idDocumentExpiry as string)) return null
  if (!EMAIL.test(p.email as string)) return null
  if (!TMP_KEY.test(p.idDocumentKey as string)) return null
  const dietary = typeof p.dietaryRestrictions === 'string' ? p.dietaryRestrictions : ''
  return {
    firstName: (p.firstName as string).trim(),
    lastName: (p.lastName as string).trim(),
    birthdate: p.birthdate as string,
    nationality: (p.nationality as string).trim(),
    email: (p.email as string).trim(),
    phone: (p.phone as string).trim(),
    companyName: (p.companyName as string).trim(),
    companyPosition: (p.companyPosition as string).trim(),
    idDocumentNumber: (p.idDocumentNumber as string).trim(),
    idDocumentExpiry: p.idDocumentExpiry as string,
    idDocumentKey: p.idDocumentKey as string,
    departureStation: (p.departureStation as string).trim(),
    dietaryRestrictions: dietary.trim(),
    emergencyContactName: (p.emergencyContactName as string).trim(),
    emergencyContactPhone: (p.emergencyContactPhone as string).trim(),
  }
}

export function parseBookingRequest(body: unknown): BookingRequest | null {
  if (typeof body !== 'object' || body === null) return null
  const b = body as Record<string, unknown>
  if (!isNonEmptyString(b.slug)) return null
  if (!LOCALES.includes(b.locale as never)) return null
  if (b.termsAccepted !== true || b.privacyAccepted !== true) return null
  if (!Array.isArray(b.participants) || b.participants.length < 1 || b.participants.length > 20) return null
  const participants: ParticipantInput[] = []
  for (const raw of b.participants) {
    const p = parseParticipant(raw)
    if (!p) return null
    participants.push(p)
  }
  const billing = b.billing as Record<string, unknown> | null
  if (typeof billing !== 'object' || billing === null) return null
  if (!isNonEmptyString(billing.companyLegalName) || !isNonEmptyString(billing.billingAddress)) return null
  const vatNumber = typeof billing.vatNumber === 'string' ? billing.vatNumber.trim() : ''
  return {
    slug: b.slug as string,
    locale: b.locale as BookingRequest['locale'],
    participants,
    billing: {
      companyLegalName: (billing.companyLegalName as string).trim(),
      billingAddress: (billing.billingAddress as string).trim(),
      vatNumber,
    },
    termsAccepted: true,
    privacyAccepted: true,
  }
}
```

- [ ] **Step 4: Extend the Expedition type and queries**

In `apps/platform/lib/expeditions.ts`, extend the `Expedition` type and `COLUMNS`:

```ts
export type Expedition = {
  id: string
  slug: string
  title: string
  description: string | null
  image_url: string | null
  price_per_person_cents: number
  currency: string
  min_participants: number
  max_participants: number | null
  is_active: boolean
  starts_on: string | null
  ends_on: string | null
  capacity: number | null
  vat_rate: number
  departure_stations: string[]
}

const COLUMNS =
  'id, slug, title, description, image_url, price_per_person_cents, currency, min_participants, max_participants, is_active, starts_on, ends_on, capacity, vat_rate, departure_stations'
```

Add a seat-rows query at the bottom of the file:

```ts
import { seatsTaken, type SeatRow } from '@/lib/seats'

export async function getSeatsTaken(expeditionId: string): Promise<number> {
  const { data, error } = await getSupabase()
    .from('orders')
    .select('quantity, status, expires_at')
    .eq('expedition_id', expeditionId)
    .in('status', ['paid', 'pending'])
  if (error) throw new Error(`failed to count seats for ${expeditionId}: ${error.message}`)
  return seatsTaken((data ?? []) as SeatRow[], new Date().toISOString())
}
```

(Move the `import` up top with the others.)

- [ ] **Step 5: Run all tests + typecheck, commit**

```bash
npx vitest run && npx tsc --noEmit -p apps/platform
git add lib && git commit -m "feat(platform): booking request validation (TDD) and expedition seat queries"
```

---

### Task 5: ID upload validation (TDD) + upload route

**Files:**
- Create: `apps/platform/lib/upload.ts`, `apps/platform/app/api/bookings/upload/route.ts`
- Test: `apps/platform/lib/__tests__/upload.test.ts`

- [ ] **Step 1: Write the failing tests**

`apps/platform/lib/__tests__/upload.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { validateIdUpload, tmpKeyFor } from '@/lib/upload'

describe('validateIdUpload', () => {
  it('accepts jpg, png, and pdf under 10MB', () => {
    expect(validateIdUpload('passport.jpg', 'image/jpeg', 5_000_000)).toBeNull()
    expect(validateIdUpload('id.PNG', 'image/png', 1000)).toBeNull()
    expect(validateIdUpload('scan.pdf', 'application/pdf', 9_999_999)).toBeNull()
  })

  it.each([
    ['oversized file', 'passport.jpg', 'image/jpeg', 10_000_001],
    ['wrong extension', 'malware.exe', 'application/octet-stream', 100],
    ['mime/extension mismatch', 'photo.jpg', 'application/pdf', 100],
    ['no extension', 'passport', 'image/jpeg', 100],
  ])('rejects %s', (_name, filename, mime, size) => {
    expect(validateIdUpload(filename, mime, size)).toBeTypeOf('string')
  })
})

describe('tmpKeyFor', () => {
  it('builds a tmp/ key with a uuid and the normalized extension', () => {
    const key = tmpKeyFor('Passport.JPEG')
    expect(key).toMatch(/^tmp\/[0-9a-f-]{36}\.jpeg$/)
  })
})
```

- [ ] **Step 2: Run to verify failure**

```bash
npx vitest run lib/__tests__/upload.test.ts
```

Expected: FAIL — cannot resolve `@/lib/upload`.

- [ ] **Step 3: Implement lib/upload.ts**

```ts
import { randomUUID } from 'node:crypto'

export const ID_DOCUMENTS_BUCKET = 'id-documents'
const MAX_BYTES = 10_000_000
const ALLOWED: Record<string, string[]> = {
  jpg: ['image/jpeg'],
  jpeg: ['image/jpeg'],
  png: ['image/png'],
  pdf: ['application/pdf'],
}

function extensionOf(filename: string): string | null {
  const match = /\.([A-Za-z0-9]+)$/.exec(filename)
  return match ? match[1].toLowerCase() : null
}

/** Returns a user-facing error string, or null when the file is acceptable. */
export function validateIdUpload(filename: string, mime: string, sizeBytes: number): string | null {
  if (sizeBytes > MAX_BYTES) return 'File is too large (10 MB max)'
  const ext = extensionOf(filename)
  if (!ext || !(ext in ALLOWED)) return 'Only JPG, PNG, or PDF files are accepted'
  if (!ALLOWED[ext].includes(mime)) return 'File type does not match its extension'
  return null
}

export function tmpKeyFor(filename: string): string {
  return `tmp/${randomUUID()}.${extensionOf(filename)}`
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx vitest run lib/__tests__/upload.test.ts
```

- [ ] **Step 5: Implement the upload route**

`apps/platform/app/api/bookings/upload/route.ts`:

```ts
import { NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'
import { validateIdUpload, tmpKeyFor, ID_DOCUMENTS_BUCKET } from '@/lib/upload'

export async function POST(request: Request) {
  let file: File | null = null
  try {
    const form = await request.formData()
    const entry = form.get('file')
    if (entry instanceof File) file = entry
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
  if (!file) return NextResponse.json({ error: 'Missing file' }, { status: 400 })

  const invalid = validateIdUpload(file.name, file.type, file.size)
  if (invalid) return NextResponse.json({ error: invalid }, { status: 400 })

  const key = tmpKeyFor(file.name)
  const { error } = await getSupabase()
    .storage.from(ID_DOCUMENTS_BUCKET)
    .upload(key, Buffer.from(await file.arrayBuffer()), { contentType: file.type })
  if (error) {
    console.error('id upload failed', error)
    return NextResponse.json({ error: 'Upload failed — please try again' }, { status: 502 })
  }
  return NextResponse.json({ key })
}
```

- [ ] **Step 6: Build + commit**

```bash
npm run build
git add lib app/api/bookings && git commit -m "feat(platform): ID document upload validation (TDD) and private-bucket upload route"
```

---

### Task 6: Stripe tax rate helper (TDD) + POST /api/bookings

**Files:**
- Create: `apps/platform/lib/tax.ts`, `apps/platform/lib/orders-create.ts`, `apps/platform/app/api/bookings/route.ts`
- Test: `apps/platform/lib/__tests__/tax.test.ts`

- [ ] **Step 1: Write the failing tax-rate test**

`apps/platform/lib/__tests__/tax.test.ts`:

```ts
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getOrCreateIva21, resetTaxRateCache } from '@/lib/tax'

function fakeStripe(existing: Array<{ id: string; percentage: number; inclusive: boolean; active: boolean; display_name: string }>) {
  return {
    taxRates: {
      list: vi.fn().mockResolvedValue({ data: existing }),
      create: vi.fn().mockResolvedValue({ id: 'txr_created' }),
    },
  } as never
}

beforeEach(() => resetTaxRateCache())

describe('getOrCreateIva21', () => {
  it('reuses an existing active exclusive 21% rate', async () => {
    const stripe = fakeStripe([{ id: 'txr_existing', percentage: 21, inclusive: false, active: true, display_name: 'IVA' }])
    expect(await getOrCreateIva21(stripe)).toBe('txr_existing')
  })

  it('creates the rate when none matches', async () => {
    const stripe = fakeStripe([{ id: 'txr_old', percentage: 10, inclusive: false, active: true, display_name: 'IVA' }])
    expect(await getOrCreateIva21(stripe)).toBe('txr_created')
  })

  it('caches the id across calls', async () => {
    const stripe = fakeStripe([{ id: 'txr_existing', percentage: 21, inclusive: false, active: true, display_name: 'IVA' }])
    await getOrCreateIva21(stripe)
    await getOrCreateIva21(stripe)
    expect((stripe as any).taxRates.list).toHaveBeenCalledTimes(1)
  })
})
```

- [ ] **Step 2: Run to verify failure, then implement lib/tax.ts**

```bash
npx vitest run lib/__tests__/tax.test.ts
```

`apps/platform/lib/tax.ts`:

```ts
import type Stripe from 'stripe'

let cached: string | null = null

export function resetTaxRateCache() {
  cached = null
}

/** Spanish IVA 21%, tax-exclusive — created once in the Stripe account, then reused. */
export async function getOrCreateIva21(stripe: Stripe): Promise<string> {
  if (cached) return cached
  const { data } = await stripe.taxRates.list({ active: true, limit: 100 })
  const found = data.find((r) => r.percentage === 21 && !r.inclusive && r.display_name === 'IVA')
  if (found) return (cached = found.id)
  const created = await stripe.taxRates.create({
    display_name: 'IVA',
    percentage: 21,
    inclusive: false,
    country: 'ES',
    description: 'Spanish VAT 21%',
  })
  return (cached = created.id)
}
```

- [ ] **Step 3: Run tests to verify they pass**

```bash
npx vitest run lib/__tests__/tax.test.ts
```

- [ ] **Step 4: Implement the order-creation data helper**

`apps/platform/lib/orders-create.ts` (isolated so the route stays thin):

```ts
import type { SupabaseClient } from '@supabase/supabase-js'
import type { BookingRequest } from '@/lib/booking'
import type { Amounts } from '@/lib/pricing'
import { ID_DOCUMENTS_BUCKET } from '@/lib/upload'

const HOLD_MINUTES = 35 // slightly longer than the 30-minute Stripe session

export type CreatedOrder = { orderId: string; participantIds: string[] }

export async function createPendingOrder(
  client: SupabaseClient,
  booking: BookingRequest,
  expeditionId: string,
  amounts: Amounts,
  consentIp: string | null
): Promise<CreatedOrder> {
  const now = new Date()
  const { data: order, error: orderError } = await client
    .from('orders')
    .insert({
      expedition_id: expeditionId,
      quantity: booking.participants.length,
      status: 'pending',
      locale: booking.locale,
      buyer_email: booking.participants[0].email,
      buyer_name: `${booking.participants[0].firstName} ${booking.participants[0].lastName}`,
      company_legal_name: booking.billing.companyLegalName,
      billing_address: booking.billing.billingAddress,
      vat_number: booking.billing.vatNumber || null,
      amount_subtotal_cents: amounts.subtotalCents,
      amount_tax_cents: amounts.taxCents,
      amount_total_cents: amounts.totalCents,
      currency: 'eur',
      terms_accepted_at: now.toISOString(),
      privacy_accepted_at: now.toISOString(),
      consent_ip: consentIp,
      expires_at: new Date(now.getTime() + HOLD_MINUTES * 60_000).toISOString(),
    })
    .select('id')
    .single()
  if (orderError || !order) throw new Error(`order insert failed: ${orderError?.message}`)

  const { data: participants, error: participantsError } = await client
    .from('participants')
    .insert(
      booking.participants.map((p) => ({
        order_id: order.id,
        first_name: p.firstName,
        last_name: p.lastName,
        birthdate: p.birthdate,
        nationality: p.nationality,
        email: p.email,
        phone: p.phone,
        company_name: p.companyName,
        company_position: p.companyPosition,
        id_document_number: p.idDocumentNumber,
        id_document_expiry: p.idDocumentExpiry,
        departure_station: p.departureStation,
        dietary_restrictions: p.dietaryRestrictions || null,
        emergency_contact_name: p.emergencyContactName,
        emergency_contact_phone: p.emergencyContactPhone,
      }))
    )
    .select('id')
  if (participantsError || !participants) throw new Error(`participants insert failed: ${participantsError?.message}`)

  return { orderId: order.id, participantIds: participants.map((row) => row.id) }
}

/** Move each tmp upload under the order and record the final path on the participant row. */
export async function attachDocuments(
  client: SupabaseClient,
  created: CreatedOrder,
  booking: BookingRequest
): Promise<void> {
  const storage = client.storage.from(ID_DOCUMENTS_BUCKET)
  for (let i = 0; i < created.participantIds.length; i++) {
    const tmpKey = booking.participants[i].idDocumentKey
    const ext = tmpKey.slice(tmpKey.lastIndexOf('.') + 1)
    const finalKey = `orders/${created.orderId}/${created.participantIds[i]}.${ext}`
    const { error: moveError } = await storage.move(tmpKey, finalKey)
    if (moveError) throw new Error(`document move failed: ${moveError.message}`)
    const { error: updateError } = await client
      .from('participants')
      .update({ id_document_path: finalKey })
      .eq('id', created.participantIds[i])
    if (updateError) throw new Error(`document path update failed: ${updateError.message}`)
  }
}

/** Best-effort rollback if Stripe session creation fails: files + rows go away. */
export async function discardPendingOrder(client: SupabaseClient, orderId: string): Promise<void> {
  const storage = client.storage.from(ID_DOCUMENTS_BUCKET)
  const { data: files } = await storage.list(`orders/${orderId}`)
  if (files?.length) await storage.remove(files.map((f) => `orders/${orderId}/${f.name}`))
  await client.from('orders').delete().eq('id', orderId) // participants cascade
}
```

- [ ] **Step 5: Implement the bookings route**

`apps/platform/app/api/bookings/route.ts`:

```ts
import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { getSupabase } from '@/lib/supabase'
import { getExpeditionBySlug, getSeatsTaken } from '@/lib/expeditions'
import { parseBookingRequest } from '@/lib/booking'
import { computeAmounts } from '@/lib/pricing'
import { getOrCreateIva21 } from '@/lib/tax'
import { createPendingOrder, attachDocuments, discardPendingOrder } from '@/lib/orders-create'

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
  const booking = parseBookingRequest(body)
  if (!booking) return NextResponse.json({ error: 'Invalid request' }, { status: 400 })

  const expedition = await getExpeditionBySlug(booking.slug)
  if (!expedition || !expedition.is_active) {
    return NextResponse.json({ error: 'Expedition not found' }, { status: 400 })
  }

  const taken = await getSeatsTaken(expedition.id)
  const remaining = expedition.capacity === null ? Infinity : expedition.capacity - taken
  if (booking.participants.length > remaining) {
    return NextResponse.json({ error: 'not_enough_seats', remaining: Math.max(0, remaining) }, { status: 409 })
  }

  const amounts = computeAmounts(expedition.price_per_person_cents, booking.participants.length, expedition.vat_rate)
  const consentIp = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null
  const client = getSupabase()
  const created = await createPendingOrder(client, booking, expedition.id, amounts, consentIp)

  try {
    await attachDocuments(client, created, booking)

    const customer = await stripe.customers.create({
      name: booking.billing.companyLegalName,
      email: booking.participants[0].email,
      address: { line1: booking.billing.billingAddress },
    })
    if (/^[A-Z]{2}[0-9A-Z]{8,12}$/.test(booking.billing.vatNumber)) {
      // EU VAT number shows on the Stripe invoice; SIRET or free-form values are skipped.
      await stripe.customers.createTaxId(customer.id, { type: 'eu_vat', value: booking.billing.vatNumber }).catch(() => {})
    }

    const origin = request.headers.get('origin') ?? process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3001'
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer: customer.id,
      line_items: [
        {
          quantity: booking.participants.length,
          tax_rates: [await getOrCreateIva21(stripe)],
          price_data: {
            currency: expedition.currency,
            unit_amount: expedition.price_per_person_cents,
            product_data: { name: expedition.title },
          },
        },
      ],
      invoice_creation: { enabled: true },
      metadata: { order_id: created.orderId, expedition_id: expedition.id, quantity: String(booking.participants.length) },
      expires_at: Math.floor(Date.now() / 1000) + 30 * 60,
      success_url: `${origin}/${booking.locale}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/${booking.locale}/expeditions/${expedition.slug}`,
    })

    const { error } = await client
      .from('orders')
      .update({ stripe_checkout_session_id: session.id })
      .eq('id', created.orderId)
    if (error) throw new Error(`session id update failed: ${error.message}`)

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('booking creation failed, rolling back', err)
    await discardPendingOrder(client, created.orderId).catch((rollbackErr) =>
      console.error('rollback failed', rollbackErr)
    )
    return NextResponse.json({ error: 'Payment provider error — please try again' }, { status: 502 })
  }
}
```

- [ ] **Step 6: Full test suite + build + commit**

```bash
npx vitest run && npm run build
git add lib app/api/bookings && git commit -m "feat(platform): pending-order booking API with Stripe tax rate, invoice creation, and rollback"
```

---

### Task 7: Webhook rework — pending→paid transition (TDD) + new emails

**Files:**
- Modify: `apps/platform/lib/orders.ts`, `apps/platform/lib/webhook.ts`, `apps/platform/lib/emails.ts`
- Test: rewrite `apps/platform/lib/__tests__/orders.test.ts`, `apps/platform/lib/__tests__/webhook.test.ts` (the webhook route test `app/api/webhooks/stripe/__tests__/route.test.ts` keeps passing unchanged — it mocks `handleCheckoutCompleted`)

- [ ] **Step 1: Rewrite the orders test for the transition contract**

Replace `apps/platform/lib/__tests__/orders.test.ts` entirely with:

```ts
import { describe, it, expect, vi } from 'vitest'
import { markOrderPaidWith } from '@/lib/orders'

function fakeSupabase(result: { data: unknown; error: { message: string } | null }) {
  const select = vi.fn().mockResolvedValue(result)
  const eq2 = vi.fn().mockReturnValue({ select })
  const eq1 = vi.fn().mockReturnValue({ eq: eq2 })
  const update = vi.fn().mockReturnValue({ eq: eq1 })
  const from = vi.fn().mockReturnValue({ update })
  return { client: { from } as never, from, update }
}

describe('markOrderPaidWith', () => {
  it('returns the order id when the pending order transitions to paid', async () => {
    const { client, from, update } = fakeSupabase({ data: [{ id: 'order-1' }], error: null })
    await expect(markOrderPaidWith(client, 'cs_test_123', 'pi_test_123')).resolves.toBe('order-1')
    expect(from).toHaveBeenCalledWith('orders')
    expect(update).toHaveBeenCalledWith({ status: 'paid', stripe_payment_intent_id: 'pi_test_123', expires_at: null })
  })

  it('returns null when no pending order matches (duplicate delivery or already paid)', async () => {
    const { client } = fakeSupabase({ data: [], error: null })
    await expect(markOrderPaidWith(client, 'cs_test_123', null)).resolves.toBeNull()
  })

  it('throws on database errors so the webhook returns 500', async () => {
    const { client } = fakeSupabase({ data: null, error: { message: 'connection refused' } })
    await expect(markOrderPaidWith(client, 'cs_test_123', null)).rejects.toThrow('connection refused')
  })
})
```

- [ ] **Step 2: Run to verify failure**

```bash
npx vitest run lib/__tests__/orders.test.ts
```

Expected: FAIL — `markOrderPaidWith` is not exported.

- [ ] **Step 3: Replace lib/orders.ts**

```ts
import type { SupabaseClient } from '@supabase/supabase-js'
import { getSupabase } from '@/lib/supabase'

/**
 * Flip a pending order to paid, keyed on the checkout session id.
 * Returns the order id when THIS call performed the transition, null when the
 * order was already paid (duplicate webhook delivery) or unknown. Idempotency
 * comes from the status filter: only one delivery ever matches 'pending'.
 */
export async function markOrderPaidWith(
  client: SupabaseClient,
  sessionId: string,
  paymentIntentId: string | null
): Promise<string | null> {
  const { data, error } = await client
    .from('orders')
    .update({ status: 'paid', stripe_payment_intent_id: paymentIntentId, expires_at: null })
    .eq('stripe_checkout_session_id', sessionId)
    .eq('status', 'pending')
    .select('id')
  if (error) throw new Error(`order transition failed: ${error.message}`)
  return data?.[0]?.id ?? null
}

export async function markOrderPaid(sessionId: string, paymentIntentId: string | null): Promise<string | null> {
  return markOrderPaidWith(getSupabase(), sessionId, paymentIntentId)
}

export type OrderWithDetails = {
  id: string
  locale: string
  quantity: number
  buyer_email: string
  buyer_name: string | null
  company_legal_name: string | null
  amount_subtotal_cents: number
  amount_tax_cents: number
  amount_total_cents: number
  currency: string
  expedition: { title: string; starts_on: string | null; ends_on: string | null }
  participants: Array<{ first_name: string; last_name: string; email: string; departure_station: string }>
}

export async function getOrderWithDetails(orderId: string): Promise<OrderWithDetails | null> {
  const { data, error } = await getSupabase()
    .from('orders')
    .select(
      'id, locale, quantity, buyer_email, buyer_name, company_legal_name, amount_subtotal_cents, amount_tax_cents, amount_total_cents, currency, expedition:expeditions ( title, starts_on, ends_on ), participants ( first_name, last_name, email, departure_station )'
    )
    .eq('id', orderId)
    .maybeSingle()
  if (error) throw new Error(`failed to load order ${orderId}: ${error.message}`)
  return data as unknown as OrderWithDetails | null
}
```

- [ ] **Step 4: Rewrite the webhook handler test**

Replace `apps/platform/lib/__tests__/webhook.test.ts` entirely with:

```ts
import { describe, it, expect, vi } from 'vitest'
import type Stripe from 'stripe'
import { handleCheckoutCompleted, type WebhookDeps } from '@/lib/webhook'

const SESSION = {
  id: 'cs_test_123',
  payment_status: 'paid',
  payment_intent: 'pi_test_123',
  invoice: 'in_test_123',
  metadata: { order_id: 'order-1' },
} as unknown as Stripe.Checkout.Session

const ORDER = {
  id: 'order-1',
  locale: 'fr',
  quantity: 2,
  buyer_email: 'buyer@acme.fr',
  buyer_name: 'Jeanne Martin',
  company_legal_name: 'ACME SA',
  amount_subtotal_cents: 420000,
  amount_tax_cents: 88200,
  amount_total_cents: 508200,
  currency: 'eur',
  expedition: { title: 'Délégation AURA', starts_on: '2026-09-21', ends_on: '2026-09-23' },
  participants: [
    { first_name: 'Jeanne', last_name: 'Martin', email: 'buyer@acme.fr', departure_station: 'Lyon' },
    { first_name: 'Luc', last_name: 'Durand', email: 'luc@acme.fr', departure_station: 'Grenoble' },
  ],
}

function makeDeps(overrides: Partial<WebhookDeps> = {}): WebhookDeps {
  return {
    markOrderPaid: vi.fn().mockResolvedValue('order-1'),
    getOrderWithDetails: vi.fn().mockResolvedValue(ORDER),
    getInvoiceUrl: vi.fn().mockResolvedValue('https://invoice.stripe.com/i/xyz'),
    sendBuyerConfirmation: vi.fn().mockResolvedValue(undefined),
    sendAdminNotification: vi.fn().mockResolvedValue(undefined),
    ...overrides,
  }
}

describe('handleCheckoutCompleted', () => {
  it('transitions the order and sends both emails with the invoice link', async () => {
    const deps = makeDeps()
    await handleCheckoutCompleted(SESSION, deps)
    expect(deps.markOrderPaid).toHaveBeenCalledWith('cs_test_123', 'pi_test_123')
    expect(deps.sendBuyerConfirmation).toHaveBeenCalledWith(ORDER, 'https://invoice.stripe.com/i/xyz')
    expect(deps.sendAdminNotification).toHaveBeenCalledWith(ORDER)
  })

  it('skips emails on duplicate delivery', async () => {
    const deps = makeDeps({ markOrderPaid: vi.fn().mockResolvedValue(null) })
    await handleCheckoutCompleted(SESSION, deps)
    expect(deps.sendBuyerConfirmation).not.toHaveBeenCalled()
    expect(deps.sendAdminNotification).not.toHaveBeenCalled()
  })

  it('does nothing when the session is not paid', async () => {
    const deps = makeDeps()
    await handleCheckoutCompleted({ ...SESSION, payment_status: 'unpaid' } as Stripe.Checkout.Session, deps)
    expect(deps.markOrderPaid).not.toHaveBeenCalled()
  })

  it('propagates transition failures so the webhook 500s and Stripe retries', async () => {
    const deps = makeDeps({ markOrderPaid: vi.fn().mockRejectedValue(new Error('db down')) })
    await expect(handleCheckoutCompleted(SESSION, deps)).rejects.toThrow('db down')
  })

  it('does NOT throw when emails or invoice lookup fail after the transition', async () => {
    const deps = makeDeps({
      getInvoiceUrl: vi.fn().mockRejectedValue(new Error('stripe down')),
      sendBuyerConfirmation: vi.fn().mockRejectedValue(new Error('resend down')),
      sendAdminNotification: vi.fn().mockRejectedValue(new Error('resend down')),
    })
    await expect(handleCheckoutCompleted(SESSION, deps)).resolves.toBeUndefined()
  })
})
```

- [ ] **Step 5: Run to verify failure, then replace lib/webhook.ts**

```bash
npx vitest run lib/__tests__/webhook.test.ts
```

`apps/platform/lib/webhook.ts`:

```ts
import type Stripe from 'stripe'
import { stripe } from '@/lib/stripe'
import { markOrderPaid as defaultMarkOrderPaid, getOrderWithDetails as defaultGetOrderWithDetails, type OrderWithDetails } from '@/lib/orders'
import {
  sendBuyerConfirmation as defaultSendBuyerConfirmation,
  sendAdminNotification as defaultSendAdminNotification,
} from '@/lib/emails'

export type WebhookDeps = {
  markOrderPaid: (sessionId: string, paymentIntentId: string | null) => Promise<string | null>
  getOrderWithDetails: (orderId: string) => Promise<OrderWithDetails | null>
  getInvoiceUrl: (invoiceId: string | null) => Promise<string | null>
  sendBuyerConfirmation: (order: OrderWithDetails, invoiceUrl: string | null) => Promise<void>
  sendAdminNotification: (order: OrderWithDetails) => Promise<void>
}

async function defaultGetInvoiceUrl(invoiceId: string | null): Promise<string | null> {
  if (!invoiceId) return null
  const invoice = await stripe.invoices.retrieve(invoiceId)
  return invoice.hosted_invoice_url ?? null
}

const defaultDeps: WebhookDeps = {
  markOrderPaid: defaultMarkOrderPaid,
  getOrderWithDetails: defaultGetOrderWithDetails,
  getInvoiceUrl: defaultGetInvoiceUrl,
  sendBuyerConfirmation: defaultSendBuyerConfirmation,
  sendAdminNotification: defaultSendAdminNotification,
}

export async function handleCheckoutCompleted(
  session: Stripe.Checkout.Session,
  deps: WebhookDeps = defaultDeps
): Promise<void> {
  if (session.payment_status !== 'paid') return

  const paymentIntentId = typeof session.payment_intent === 'string' ? session.payment_intent : null
  const orderId = await deps.markOrderPaid(session.id, paymentIntentId)
  if (!orderId) return // duplicate delivery — already handled

  // Order is safely recorded; everything below is best-effort.
  try {
    const order = await deps.getOrderWithDetails(orderId)
    if (!order) throw new Error(`paid order ${orderId} not found for emails`)
    const invoiceUrl = await deps
      .getInvoiceUrl(typeof session.invoice === 'string' ? session.invoice : null)
      .catch((err) => {
        console.error('invoice url lookup failed', err)
        return null
      })
    const results = await Promise.allSettled([
      deps.sendBuyerConfirmation(order, invoiceUrl),
      deps.sendAdminNotification(order),
    ])
    for (const result of results) {
      if (result.status === 'rejected') console.error('post-payment email failed', result.reason)
    }
  } catch (err) {
    console.error('post-payment processing failed (order is paid)', err)
  }
}
```

- [ ] **Step 6: Replace lib/emails.ts (bilingual buyer email + multi-admin notification)**

```ts
import { Resend } from 'resend'
import { formatPrice } from '@/lib/format'
import type { OrderWithDetails } from '@/lib/orders'

const FROM = 'Rusker Expeditions <bookings@rusker-travel.com>'

let resend: Resend | null = null
function getResend(): Resend {
  if (!resend) {
    const key = process.env.RESEND_API_KEY
    if (!key) throw new Error('RESEND_API_KEY is not set')
    resend = new Resend(key)
  }
  return resend
}

const BUYER_COPY = {
  fr: {
    subject: (title: string) => `Votre réservation est confirmée : ${title}`,
    heading: 'Votre expédition est réservée !',
    hello: (name: string | null) => `Bonjour${name ? ` ${name}` : ''},`,
    body: (title: string, count: number) =>
      `Merci d'avoir réservé <strong>${title}</strong> pour <strong>${count} participant${count > 1 ? 's' : ''}</strong>.`,
    amounts: (subtotal: string, tax: string, total: string) =>
      `Sous-total HT : <strong>${subtotal}</strong> · TVA espagnole 21% : <strong>${tax}</strong> · Total TTC : <strong>${total}</strong>`,
    invoice: 'Télécharger votre facture',
    next: "L'équipe Rusker vous contactera sous 2 jours ouvrés pour organiser la logistique (billets de train, hôtel, programme).",
    reply: 'Une question ? Répondez simplement à cet email.',
  },
  en: {
    subject: (title: string) => `Your booking is confirmed: ${title}`,
    heading: 'Your expedition is booked!',
    hello: (name: string | null) => `Hi${name ? ` ${name}` : ''},`,
    body: (title: string, count: number) =>
      `Thank you for booking <strong>${title}</strong> for <strong>${count} participant${count > 1 ? 's' : ''}</strong>.`,
    amounts: (subtotal: string, tax: string, total: string) =>
      `Subtotal (excl. VAT): <strong>${subtotal}</strong> · Spanish VAT 21%: <strong>${tax}</strong> · Total: <strong>${total}</strong>`,
    invoice: 'Download your invoice',
    next: 'The Rusker team will contact you within 2 business days to organize logistics (train tickets, hotel, program).',
    reply: 'Questions? Just reply to this email.',
  },
} as const

export async function sendBuyerConfirmation(order: OrderWithDetails, invoiceUrl: string | null): Promise<void> {
  const copy = BUYER_COPY[order.locale === 'en' ? 'en' : 'fr']
  const subtotal = formatPrice(order.amount_subtotal_cents, order.currency)
  const tax = formatPrice(order.amount_tax_cents, order.currency)
  const total = formatPrice(order.amount_total_cents, order.currency)
  const participantRows = order.participants
    .map((p) => `<li>${p.first_name} ${p.last_name} — ${p.departure_station}</li>`)
    .join('')
  const { error } = await getResend().emails.send({
    from: FROM,
    to: order.buyer_email,
    subject: copy.subject(order.expedition.title),
    html: `
      <div style="font-family: Poppins, system-ui, sans-serif; color: #2f3433; max-width: 560px; margin: 0 auto;">
        <h1 style="color: #287497;">${copy.heading}</h1>
        <p>${copy.hello(order.buyer_name)}</p>
        <p>${copy.body(order.expedition.title, order.quantity)}</p>
        <ul>${participantRows}</ul>
        <p>${copy.amounts(subtotal, tax, total)}</p>
        ${invoiceUrl ? `<p><a href="${invoiceUrl}" style="color: #287497;">${copy.invoice}</a></p>` : ''}
        <p>${copy.next}</p>
        <p>${copy.reply}</p>
        <p style="margin-top: 32px;">— Rusker Travel · <a href="https://rusker-travel.com" style="color: #287497;">rusker-travel.com</a></p>
      </div>
    `,
  })
  if (error) throw new Error(`buyer confirmation email failed: ${error.message}`)
}

export async function sendAdminNotification(order: OrderWithDetails): Promise<void> {
  const to = (process.env.ADMIN_NOTIFICATION_EMAILS ?? '')
    .split(',')
    .map((email) => email.trim())
    .filter(Boolean)
  if (to.length === 0) throw new Error('ADMIN_NOTIFICATION_EMAILS is not set')
  const total = formatPrice(order.amount_total_cents, order.currency)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3001'
  const participantRows = order.participants
    .map((p) => `<li>${p.first_name} ${p.last_name} — ${p.email} — départ ${p.departure_station}</li>`)
    .join('')
  const { error } = await getResend().emails.send({
    from: FROM,
    to,
    subject: `Nouvelle réservation : ${order.expedition.title} × ${order.quantity} (${total})`,
    html: `
      <div style="font-family: system-ui, sans-serif;">
        <h2>Nouvelle réservation</h2>
        <ul>
          <li><strong>Expédition :</strong> ${order.expedition.title} (${order.expedition.starts_on} → ${order.expedition.ends_on})</li>
          <li><strong>Participants :</strong> ${order.quantity}</li>
          <li><strong>Total TTC :</strong> ${total}</li>
          <li><strong>Société :</strong> ${order.company_legal_name ?? '—'}</li>
          <li><strong>Acheteur :</strong> ${order.buyer_name ?? '—'} &lt;${order.buyer_email}&gt;</li>
        </ul>
        <ul>${participantRows}</ul>
        <p><a href="${siteUrl}/admin/orders/${order.id}">Voir la réservation dans l'admin</a></p>
      </div>
    `,
  })
  if (error) throw new Error(`admin notification email failed: ${error.message}`)
}
```

- [ ] **Step 7: Full suite + build + commit**

```bash
npx vitest run && npm run build
```

Expected: all suites pass, including the untouched webhook route test. Then:

```bash
git add lib && git commit -m "feat(platform): webhook pending->paid transition (TDD), bilingual buyer email, multi-admin notification"
```

---

### Task 8: Booking wizard UI + detail page rework

**Files:**
- Create: `apps/platform/components/BookingWizard.tsx`, `apps/platform/components/ParticipantFields.tsx`, `apps/platform/app/(site)/[locale]/expeditions/[slug]/book/page.tsx`
- Modify: `apps/platform/app/(site)/[locale]/expeditions/[slug]/page.tsx`
- Delete: `apps/platform/components/BookingPanel.tsx`

- [ ] **Step 1: Create ParticipantFields (one participant block)**

`apps/platform/components/ParticipantFields.tsx`:

```tsx
'use client'

import { useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import type { ParticipantInput } from '@/lib/booking'

export type ParticipantDraft = Omit<ParticipantInput, 'idDocumentKey'> & { idDocumentKey: string | null }

export const EMPTY_PARTICIPANT: ParticipantDraft = {
  firstName: '', lastName: '', birthdate: '', nationality: '', email: '', phone: '',
  companyName: '', companyPosition: '', idDocumentNumber: '', idDocumentExpiry: '',
  idDocumentKey: null, departureStation: '', dietaryRestrictions: '',
  emergencyContactName: '', emergencyContactPhone: '',
}

type Props = {
  index: number
  value: ParticipantDraft
  stations: string[]
  onChange: (value: ParticipantDraft) => void
  onRemove: (() => void) | null
}

export default function ParticipantFields({ index, value, stations, onChange, onRemove }: Props) {
  const t = useTranslations('wizard')
  const fileInput = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)

  const set = (field: keyof ParticipantDraft) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    onChange({ ...value, [field]: e.target.value })

  async function upload(file: File) {
    setUploading(true)
    setUploadError(null)
    try {
      const form = new FormData()
      form.append('file', file)
      const res = await fetch('/api/bookings/upload', { method: 'POST', body: form })
      const data = await res.json()
      if (!res.ok || !data.key) {
        setUploadError(data.error ?? t('uploadFailed'))
        return
      }
      onChange({ ...value, idDocumentKey: data.key })
    } catch {
      setUploadError(t('uploadFailed'))
    } finally {
      setUploading(false)
    }
  }

  const field = (name: keyof ParticipantDraft, label: string, type = 'text') => (
    <label className="block text-sm">
      <span className="mb-1 block font-medium">{label}</span>
      <input
        type={type}
        value={(value[name] as string) ?? ''}
        onChange={set(name)}
        className="w-full rounded-button border border-neutral-mid px-3 py-2"
      />
    </label>
  )

  return (
    <div className="rounded-card bg-white p-6 shadow-soft">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">{t('participant', { number: index + 1 })}</h3>
        {onRemove && (
          <button type="button" onClick={onRemove} className="text-sm text-red-600 hover:underline">
            {t('removeParticipant')}
          </button>
        )}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {field('firstName', t('firstName'))}
        {field('lastName', t('lastName'))}
        {field('birthdate', t('birthdate'), 'date')}
        {field('nationality', t('nationality'))}
        {field('email', t('email'), 'email')}
        {field('phone', t('phone'), 'tel')}
        {field('companyName', t('companyName'))}
        {field('companyPosition', t('companyPosition'))}
        {field('idDocumentNumber', t('idNumber'))}
        {field('idDocumentExpiry', t('idExpiry'), 'date')}
        <label className="block text-sm">
          <span className="mb-1 block font-medium">{t('departureStation')}</span>
          <select
            value={value.departureStation}
            onChange={set('departureStation')}
            className="w-full rounded-button border border-neutral-mid px-3 py-2"
          >
            <option value="" />
            {stations.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </label>
        {field('dietaryRestrictions', t('dietary'))}
        {field('emergencyContactName', t('emergencyName'))}
        {field('emergencyContactPhone', t('emergencyPhone'), 'tel')}
      </div>
      <div className="mt-4">
        <span className="mb-1 block text-sm font-medium">{t('idUpload')}</span>
        <input
          ref={fileInput}
          type="file"
          accept=".jpg,.jpeg,.png,.pdf"
          onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])}
          className="text-sm"
        />
        {uploading && <p className="mt-1 text-xs text-gray-500">…</p>}
        {value.idDocumentKey && !uploading && <p className="mt-1 text-xs text-green-700">{t('idUploaded')}</p>}
        {uploadError && <p className="mt-1 text-xs text-red-600">{uploadError}</p>}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create BookingWizard**

`apps/platform/components/BookingWizard.tsx`:

```tsx
'use client'

import { useMemo, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { formatPrice } from '@/lib/format'
import { computeAmounts } from '@/lib/pricing'
import ParticipantFields, { EMPTY_PARTICIPANT, type ParticipantDraft } from '@/components/ParticipantFields'

type Props = {
  slug: string
  expeditionTitle: string
  unitHtCents: number
  currency: string
  vatRate: number
  stations: string[]
  maxSeats: number
}

const REQUIRED: (keyof ParticipantDraft)[] = [
  'firstName', 'lastName', 'birthdate', 'nationality', 'email', 'phone', 'companyName',
  'companyPosition', 'idDocumentNumber', 'idDocumentExpiry', 'departureStation',
  'emergencyContactName', 'emergencyContactPhone',
]

export default function BookingWizard({ slug, expeditionTitle, unitHtCents, currency, vatRate, stations, maxSeats }: Props) {
  const t = useTranslations('wizard')
  const locale = useLocale()
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [participants, setParticipants] = useState<ParticipantDraft[]>([{ ...EMPTY_PARTICIPANT }])
  const [billing, setBilling] = useState({ companyLegalName: '', billingAddress: '', vatNumber: '' })
  const [terms, setTerms] = useState(false)
  const [privacy, setPrivacy] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const amounts = useMemo(
    () => computeAmounts(unitHtCents, participants.length, vatRate),
    [unitHtCents, participants.length, vatRate]
  )

  const participantsComplete = participants.every(
    (p) => REQUIRED.every((f) => (p[f] as string).trim() !== '') && p.idDocumentKey !== null
  )
  const billingComplete = billing.companyLegalName.trim() !== '' && billing.billingAddress.trim() !== ''

  async function submit() {
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, locale, participants, billing, termsAccepted: terms, privacyAccepted: privacy }),
      })
      const data = await res.json()
      if (!res.ok || !data.url) {
        setError(data.error === 'not_enough_seats' ? t('notEnoughSeats') : (data.error ?? t('genericError')))
        setSubmitting(false)
        return
      }
      window.location.assign(data.url)
    } catch {
      setError(t('genericError'))
      setSubmitting(false)
    }
  }

  const stepChip = (n: 1 | 2 | 3, label: string) => (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${step === n ? 'bg-rusker-blue text-white' : 'bg-white text-gray-500'}`}>
      {n} · {label}
    </span>
  )

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">{t('title', { expedition: expeditionTitle })}</h1>
      <div className="mb-8 flex gap-2">{stepChip(1, t('step1'))}{stepChip(2, t('step2'))}{stepChip(3, t('step3'))}</div>

      {step === 1 && (
        <div className="space-y-6">
          {participants.map((p, i) => (
            <ParticipantFields
              key={i}
              index={i}
              value={p}
              stations={stations}
              onChange={(next) => setParticipants(participants.map((prev, j) => (j === i ? next : prev)))}
              onRemove={participants.length > 1 ? () => setParticipants(participants.filter((_, j) => j !== i)) : null}
            />
          ))}
          <div className="flex items-center justify-between">
            {participants.length < maxSeats ? (
              <button
                type="button"
                onClick={() => setParticipants([...participants, { ...EMPTY_PARTICIPANT }])}
                className="rounded-button border border-neutral-mid px-4 py-2 text-sm hover:bg-white"
              >
                {t('addParticipant')}
              </button>
            ) : <span />}
            <button
              type="button"
              disabled={!participantsComplete}
              onClick={() => setStep(2)}
              className="rounded-button bg-rusker-blue px-6 py-3 font-semibold text-white disabled:opacity-40"
            >
              {t('next')}
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="max-w-xl space-y-4 rounded-card bg-white p-6 shadow-soft">
          <label className="block text-sm">
            <span className="mb-1 block font-medium">{t('companyLegalName')}</span>
            <input value={billing.companyLegalName} onChange={(e) => setBilling({ ...billing, companyLegalName: e.target.value })} className="w-full rounded-button border border-neutral-mid px-3 py-2" />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block font-medium">{t('billingAddress')}</span>
            <input value={billing.billingAddress} onChange={(e) => setBilling({ ...billing, billingAddress: e.target.value })} className="w-full rounded-button border border-neutral-mid px-3 py-2" />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block font-medium">{t('vatNumber')}</span>
            <input value={billing.vatNumber} onChange={(e) => setBilling({ ...billing, vatNumber: e.target.value })} className="w-full rounded-button border border-neutral-mid px-3 py-2" />
          </label>
          <div className="flex justify-between pt-2">
            <button type="button" onClick={() => setStep(1)} className="text-sm text-gray-500 hover:underline">{t('back')}</button>
            <button type="button" disabled={!billingComplete} onClick={() => setStep(3)} className="rounded-button bg-rusker-blue px-6 py-3 font-semibold text-white disabled:opacity-40">
              {t('next')}
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="max-w-xl space-y-6">
          <div className="rounded-card bg-white p-6 shadow-soft">
            <h3 className="mb-3 text-lg font-semibold">{t('summary')}</h3>
            <ul className="mb-4 list-disc pl-5 text-sm text-gray-700">
              {participants.map((p, i) => (
                <li key={i}>{p.firstName} {p.lastName} — {p.departureStation}</li>
              ))}
            </ul>
            <dl className="space-y-1 text-sm">
              <div className="flex justify-between"><dt>{t('subtotal')}</dt><dd>{formatPrice(amounts.subtotalCents, currency)}</dd></div>
              <div className="flex justify-between"><dt>{t('vat')}</dt><dd>{formatPrice(amounts.taxCents, currency)}</dd></div>
              <div className="flex justify-between text-base font-bold"><dt>{t('total')}</dt><dd>{formatPrice(amounts.totalCents, currency)}</dd></div>
            </dl>
          </div>
          <div className="space-y-3 text-sm">
            <label className="flex items-start gap-2">
              <input type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)} className="mt-1" />
              <span>
                {t.rich('acceptTerms', { link: (chunks) => <Link href="/terms" target="_blank" className="text-rusker-blue underline">{chunks}</Link> })}
              </span>
            </label>
            <label className="flex items-start gap-2">
              <input type="checkbox" checked={privacy} onChange={(e) => setPrivacy(e.target.checked)} className="mt-1" />
              <span>
                {t.rich('acceptPrivacy', { link: (chunks) => <Link href="/privacy" target="_blank" className="text-rusker-blue underline">{chunks}</Link> })}
              </span>
            </label>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="flex justify-between">
            <button type="button" onClick={() => setStep(2)} className="text-sm text-gray-500 hover:underline">{t('back')}</button>
            <button
              type="button"
              disabled={!terms || !privacy || submitting}
              onClick={submit}
              className="rounded-button bg-rusker-blue px-8 py-3 font-semibold text-white disabled:opacity-40"
            >
              {submitting ? t('paying') : t('pay')}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 3: Create the book page**

`apps/platform/app/(site)/[locale]/expeditions/[slug]/book/page.tsx`:

```tsx
import { notFound } from 'next/navigation'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { getExpeditionBySlug, getSeatsTaken } from '@/lib/expeditions'
import BookingWizard from '@/components/BookingWizard'

export const dynamic = 'force-dynamic'

export default async function BookPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const expedition = await getExpeditionBySlug(slug)
  if (!expedition || !expedition.is_active) notFound()

  const taken = await getSeatsTaken(expedition.id)
  const remaining = expedition.capacity === null ? 20 : Math.max(0, expedition.capacity - taken)
  if (remaining === 0) {
    const t = await getTranslations('catalog')
    return <p className="text-gray-600">{t('soldOut')}</p>
  }

  return (
    <BookingWizard
      slug={expedition.slug}
      expeditionTitle={expedition.title}
      unitHtCents={expedition.price_per_person_cents}
      currency={expedition.currency}
      vatRate={expedition.vat_rate}
      stations={expedition.departure_stations}
      maxSeats={remaining}
    />
  )
}
```

- [ ] **Step 4: Rework the detail page and delete BookingPanel**

In `app/(site)/[locale]/expeditions/[slug]/page.tsx`, replace the `<BookingPanel …/>` block (and its import) with a booking card:

```tsx
// imports: add
import { getSeatsTaken } from '@/lib/expeditions'
import { computeAmounts } from '@/lib/pricing'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
```

```tsx
// inside the component, after fetching the expedition:
const t = await getTranslations('detail')
const tc = await getTranslations('catalog')
const taken = await getSeatsTaken(expedition.id)
const remaining = expedition.capacity === null ? null : Math.max(0, expedition.capacity - taken)
const perSeat = computeAmounts(expedition.price_per_person_cents, 1, expedition.vat_rate)
```

```tsx
// in place of <BookingPanel …/>:
<div className="rounded-card bg-white p-6 shadow-soft">
  {expedition.starts_on && expedition.ends_on && (
    <p className="mb-2 text-sm font-medium text-gray-700">
      {tc('dates', { start: expedition.starts_on, end: expedition.ends_on })}
    </p>
  )}
  <p className="mb-1 text-lg font-semibold text-rusker-blue">
    {t('priceHt', { price: formatPrice(expedition.price_per_person_cents, expedition.currency) })}
  </p>
  <p className="mb-4 text-xs text-gray-500">
    {t('vatNote', { total: formatPrice(perSeat.totalCents, expedition.currency) })}
  </p>
  {remaining !== null && (
    <p className={`mb-4 text-sm font-medium ${remaining === 0 ? 'text-red-600' : 'text-gray-700'}`}>
      {remaining === 0 ? tc('soldOut') : tc('seatsLeft', { count: remaining })}
    </p>
  )}
  {remaining !== 0 && (
    <Link
      href={`/expeditions/${expedition.slug}/book`}
      className="block w-full rounded-button bg-rusker-blue px-6 py-3 text-center font-semibold text-white hover:opacity-90"
    >
      {t('book')}
    </Link>
  )}
</div>
```

Also update the success page (`app/(site)/[locale]/checkout/success/page.tsx`): the bookings API now puts `quantity` in the session metadata, so under the confirmation heading add the participant count:

```tsx
{session.metadata?.quantity && (
  <p className="mb-2 text-gray-700">{t('seatCount', { count: Number(session.metadata.quantity) })}</p>
)}
```

with the message key `"seatCount": "{count, plural, one {# participant inscrit} other {# participants inscrits}}"` in `fr.json` (EN: `"{count, plural, one {# participant registered} other {# participants registered}}"`) added to the `success` namespace of both messages files.

Then:

```bash
git rm apps/platform/components/BookingPanel.tsx
```

Also delete the old group-checkout route and its validation now superseded (`app/api/checkout/route.ts` stays DELETED only if nothing references it — it is superseded by `/api/bookings`):

```bash
git rm -r "apps/platform/app/api/checkout"
```

Remove the now-unused `parseCheckoutRequest`/`validateQuantity` from `lib/checkout.ts` and its test file:

```bash
git rm apps/platform/lib/checkout.ts apps/platform/lib/__tests__/checkout.test.ts
```

- [ ] **Step 5: Build, run suite, manual smoke, commit**

```bash
npx vitest run && npm run build
npm run dev --workspace @rusker/platform
```

Open http://localhost:3001/fr/expeditions → detail → "Réserver ma place" → wizard renders, add/remove participants, upload gate blocks Next until every block is complete.

```bash
git add -A && git commit -m "feat(platform): 3-step booking wizard, seat availability on detail page, retire group checkout"
```

---

### Task 9: Cron cleanup — abandoned bookings + 30-day ID retention (TDD)

**Files:**
- Create: `apps/platform/lib/cleanup.ts`, `apps/platform/app/api/cron/cleanup/route.ts`, `apps/platform/vercel.json`
- Test: `apps/platform/lib/__tests__/cleanup.test.ts`

- [ ] **Step 1: Write the failing tests**

`apps/platform/lib/__tests__/cleanup.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { isAbandoned, retentionCutoff } from '@/lib/cleanup'

const NOW = '2026-07-09T10:00:00.000Z'

describe('isAbandoned', () => {
  it('is true for pending orders past their hold', () => {
    expect(isAbandoned({ status: 'pending', expires_at: '2026-07-09T09:59:00.000Z' }, NOW)).toBe(true)
  })
  it('is false for live pending holds, paid, and already-expired orders', () => {
    expect(isAbandoned({ status: 'pending', expires_at: '2026-07-09T10:01:00.000Z' }, NOW)).toBe(false)
    expect(isAbandoned({ status: 'paid', expires_at: null }, NOW)).toBe(false)
    expect(isAbandoned({ status: 'expired', expires_at: '2026-07-09T09:00:00.000Z' }, NOW)).toBe(false)
  })
})

describe('retentionCutoff', () => {
  it('returns the date 30 days before now (date-only)', () => {
    expect(retentionCutoff('2026-10-24T08:00:00.000Z')).toBe('2026-09-24')
  })
})
```

- [ ] **Step 2: Run to verify failure, implement lib/cleanup.ts**

```bash
npx vitest run lib/__tests__/cleanup.test.ts
```

```ts
export function isAbandoned(order: { status: string; expires_at: string | null }, nowIso: string): boolean {
  return order.status === 'pending' && order.expires_at !== null && order.expires_at <= nowIso
}

/** Expeditions whose ends_on is strictly before this date have passed the 30-day ID retention window. */
export function retentionCutoff(nowIso: string, retentionDays = 30): string {
  const cutoff = new Date(new Date(nowIso).getTime() - retentionDays * 24 * 60 * 60 * 1000)
  return cutoff.toISOString().slice(0, 10)
}
```

- [ ] **Step 3: Run tests to verify pass, implement the cron route**

`apps/platform/app/api/cron/cleanup/route.ts`:

```ts
import { NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'
import { isAbandoned, retentionCutoff } from '@/lib/cleanup'
import { ID_DOCUMENTS_BUCKET } from '@/lib/upload'

export async function GET(request: Request) {
  const auth = request.headers.get('authorization')
  if (!process.env.CRON_SECRET || auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const client = getSupabase()
  const storage = client.storage.from(ID_DOCUMENTS_BUCKET)
  const nowIso = new Date().toISOString()
  let abandonedPurged = 0
  let docsPurged = 0

  // Pass 1 — abandoned pending bookings: delete files + participants, mark expired.
  const { data: pending, error: pendingError } = await client
    .from('orders')
    .select('id, status, expires_at')
    .eq('status', 'pending')
  if (pendingError) return NextResponse.json({ error: pendingError.message }, { status: 500 })
  for (const order of pending ?? []) {
    if (!isAbandoned(order, nowIso)) continue
    const { data: files } = await storage.list(`orders/${order.id}`)
    if (files?.length) await storage.remove(files.map((f) => `orders/${order.id}/${f.name}`))
    await client.from('participants').delete().eq('order_id', order.id)
    await client.from('orders').update({ status: 'expired' }).eq('id', order.id).eq('status', 'pending')
    abandonedPurged++
  }

  // Pass 2 — 30-day retention: null paths + delete files for past expeditions.
  const { data: pastExpeditions, error: pastError } = await client
    .from('expeditions')
    .select('id')
    .lt('ends_on', retentionCutoff(nowIso))
  if (pastError) return NextResponse.json({ error: pastError.message }, { status: 500 })
  for (const expedition of pastExpeditions ?? []) {
    const { data: orders } = await client.from('orders').select('id').eq('expedition_id', expedition.id)
    for (const order of orders ?? []) {
      const { data: rows } = await client
        .from('participants')
        .select('id, id_document_path')
        .eq('order_id', order.id)
        .not('id_document_path', 'is', null)
      if (!rows?.length) continue
      await storage.remove(rows.map((r) => r.id_document_path as string))
      await client.from('participants').update({ id_document_path: null }).eq('order_id', order.id)
      docsPurged += rows.length
    }
  }

  return NextResponse.json({ abandonedPurged, docsPurged })
}
```

- [ ] **Step 4: Schedule it**

`apps/platform/vercel.json`:

```json
{
  "crons": [{ "path": "/api/cron/cleanup", "schedule": "0 3 * * *" }]
}
```

(Vercel automatically sends `Authorization: Bearer $CRON_SECRET` when the `CRON_SECRET` env var exists on the project.)

- [ ] **Step 5: Suite + build + commit**

```bash
npx vitest run && npm run build
git add lib app/api/cron vercel.json && git commit -m "feat(platform): daily cron for abandoned bookings and 30-day ID retention (TDD)"
```

---

### Task 10: Admin auth — allowlist (TDD), magic-link login, middleware guard

**Files:**
- Create: `apps/platform/lib/admin.ts`, `apps/platform/lib/supabase-auth.ts`, `apps/platform/app/(admin)/admin/login/page.tsx`, `apps/platform/app/api/admin/login/route.ts`, `apps/platform/app/(admin)/admin/auth/confirm/route.ts`
- Modify: `apps/platform/middleware.ts`, `apps/platform/.env.example`
- Test: `apps/platform/lib/__tests__/admin.test.ts`

- [ ] **Step 1: Write the failing allowlist test**

`apps/platform/lib/__tests__/admin.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { isAdminEmail } from '@/lib/admin'

const ALLOWLIST = 'adam@rusker-travel.com, tanguy@rusker-travel.com'

describe('isAdminEmail', () => {
  it('accepts allowlisted emails case-insensitively', () => {
    expect(isAdminEmail('adam@rusker-travel.com', ALLOWLIST)).toBe(true)
    expect(isAdminEmail('Tanguy@Rusker-Travel.com', ALLOWLIST)).toBe(true)
  })
  it('rejects everyone else, empty allowlists, and null emails', () => {
    expect(isAdminEmail('intruder@evil.com', ALLOWLIST)).toBe(false)
    expect(isAdminEmail('adam@rusker-travel.com', '')).toBe(false)
    expect(isAdminEmail(null, ALLOWLIST)).toBe(false)
  })
})
```

- [ ] **Step 2: Run to verify failure, implement lib/admin.ts**

```bash
npx vitest run lib/__tests__/admin.test.ts
```

```ts
export function isAdminEmail(email: string | null | undefined, allowlistCsv: string | undefined): boolean {
  if (!email || !allowlistCsv) return false
  const allowed = allowlistCsv.split(',').map((e) => e.trim().toLowerCase()).filter(Boolean)
  return allowed.includes(email.trim().toLowerCase())
}
```

- [ ] **Step 3: Run tests to verify pass, create the auth clients**

`apps/platform/lib/supabase-auth.ts` (anon-key clients for Supabase Auth only — data still goes through the service client):

```ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function getAuthClient() {
  const cookieStore = await cookies()
  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (cookiesToSet) => {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        } catch {
          // called from a Server Component — middleware refreshes sessions instead
        }
      },
    },
  })
}
```

- [ ] **Step 4: Login page + OTP-sending route + confirm route**

First create a minimal root layout for the `(admin)` group so the build passes (Task 11 replaces it with the full shell) — `apps/platform/app/(admin)/admin/layout.tsx`:

```tsx
import '../../globals.css'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-bg-light font-sans text-text-dark antialiased">
        <div className="mx-auto max-w-6xl px-6 py-8">{children}</div>
      </body>
    </html>
  )
}
```

`apps/platform/app/(admin)/admin/login/page.tsx`:

```tsx
'use client'

import { useState } from 'react'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function send(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
    if (res.ok) setSent(true)
    else setError('Sign-in link could not be sent.')
  }

  return (
    <div className="mx-auto mt-24 max-w-sm rounded-card bg-white p-8 shadow-soft">
      <h1 className="mb-6 text-2xl font-bold">Rusker Admin</h1>
      {sent ? (
        <p className="text-gray-700">Check your inbox — the sign-in link is on its way.</p>
      ) : (
        <form onSubmit={send} className="space-y-4">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@rusker-travel.com"
            className="w-full rounded-button border border-neutral-mid px-3 py-2"
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button type="submit" className="w-full rounded-button bg-rusker-blue px-6 py-3 font-semibold text-white">
            Send magic link
          </button>
        </form>
      )}
    </div>
  )
}
```

`apps/platform/app/api/admin/login/route.ts`:

```ts
import { NextResponse } from 'next/server'
import { getAuthClient } from '@/lib/supabase-auth'
import { isAdminEmail } from '@/lib/admin'

export async function POST(request: Request) {
  let email: unknown
  try {
    ;({ email } = await request.json())
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
  // Always answer 200 so the form can't be used to probe the allowlist.
  if (typeof email !== 'string' || !isAdminEmail(email, process.env.ADMIN_EMAILS)) {
    return NextResponse.json({ ok: true })
  }
  const supabase = await getAuthClient()
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3001'
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: `${siteUrl}/admin/auth/confirm` },
  })
  if (error) {
    console.error('magic link send failed', error)
    return NextResponse.json({ error: 'Could not send link' }, { status: 502 })
  }
  return NextResponse.json({ ok: true })
}
```

`apps/platform/app/(admin)/admin/auth/confirm/route.ts`:

```ts
import { NextResponse } from 'next/server'
import type { EmailOtpType } from '@supabase/supabase-js'
import { getAuthClient } from '@/lib/supabase-auth'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const tokenHash = url.searchParams.get('token_hash')
  const type = url.searchParams.get('type') as EmailOtpType | null
  if (tokenHash && type) {
    const supabase = await getAuthClient()
    const { error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash })
    if (!error) return NextResponse.redirect(new URL('/admin', url.origin))
  }
  return NextResponse.redirect(new URL('/admin/login', url.origin))
}
```

- [ ] **Step 5: Guard /admin in the middleware**

Replace `apps/platform/middleware.ts` with:

```ts
import createMiddleware from 'next-intl/middleware'
import { createServerClient } from '@supabase/ssr'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { routing } from './i18n/routing'
import { isAdminEmail } from './lib/admin'

const intlMiddleware = createMiddleware(routing)
const PUBLIC_ADMIN_PATHS = ['/admin/login', '/admin/auth']

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (!pathname.startsWith('/admin')) return intlMiddleware(request)

  let response = NextResponse.next({ request })
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options))
        },
      },
    }
  )
  const { data: { user } } = await supabase.auth.getUser()
  const isPublic = PUBLIC_ADMIN_PATHS.some((p) => pathname.startsWith(p))
  const isAdmin = isAdminEmail(user?.email ?? null, process.env.ADMIN_EMAILS)

  if (!isAdmin && !isPublic) return NextResponse.redirect(new URL('/admin/login', request.url))
  if (isAdmin && pathname === '/admin/login') return NextResponse.redirect(new URL('/admin', request.url))
  return response
}

export const config = {
  matcher: ['/((?!api|_next|favicon.ico|.*\\..*).*)'],
}
```

- [ ] **Step 6: Extend .env.example**

Append to `apps/platform/.env.example`:

```bash
# Supabase Auth (admin login only — data access stays service-role)
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...

# Admin dashboard
ADMIN_EMAILS=adam@rusker-travel.com,tanguy@rusker-travel.com
ADMIN_NOTIFICATION_EMAILS=adam@rusker-travel.com,tanguy@rusker-travel.com

# Cron protection (any long random string; also set on Vercel)
CRON_SECRET=...
```

Also add the real values to `apps/platform/.env.local` (anon key: `supabase projects api-keys --project-ref tzacbljclqgyvpqnsdyk` or dashboard → Settings → API).

HUMAN/config step: in the Supabase dashboard → Authentication → URL Configuration, add `http://localhost:3001/admin/auth/confirm` and `https://app.rusker-travel.com/admin/auth/confirm` to the redirect allowlist.

- [ ] **Step 7: Suite + build + manual login smoke + commit**

```bash
npx vitest run && npm run build
```

Manual: `npm run dev --workspace @rusker/platform`, visit http://localhost:3001/admin → redirected to /admin/login; request a link for an allowlisted email; the emailed link signs you in and lands on /admin (404 for now — pages come next).

```bash
git add -A && git commit -m "feat(platform): admin magic-link auth with email allowlist (TDD) and middleware guard"
```

---

### Task 11: Admin dashboard pages + CSV export (TDD)

**Files:**
- Create: `apps/platform/lib/csv.ts`, `apps/platform/lib/admin-queries.ts`, `apps/platform/app/(admin)/admin/layout.tsx`, `apps/platform/app/(admin)/admin/page.tsx`, `apps/platform/app/(admin)/admin/orders/[id]/page.tsx`, `apps/platform/app/(admin)/admin/expeditions/[id]/export/route.ts`, `apps/platform/app/api/admin/logout/route.ts`
- Test: `apps/platform/lib/__tests__/csv.test.ts`

- [ ] **Step 1: Write the failing CSV test**

`apps/platform/lib/__tests__/csv.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { participantsCsv } from '@/lib/csv'

describe('participantsCsv', () => {
  it('produces a header row and one line per participant', () => {
    const csv = participantsCsv([
      {
        first_name: 'Jeanne', last_name: 'Martin', birthdate: '1980-04-12', nationality: 'Française',
        email: 'j@acme.fr', phone: '+33612345678', company_name: 'ACME', company_position: 'CTO',
        id_document_number: '12AB34567', id_document_expiry: '2030-01-01', departure_station: 'Lyon',
        dietary_restrictions: null, emergency_contact_name: 'Paul', emergency_contact_phone: '+33698765432',
      },
    ])
    const lines = csv.trim().split('\n')
    expect(lines).toHaveLength(2)
    expect(lines[0]).toContain('first_name')
    expect(lines[1]).toContain('Jeanne')
  })

  it('escapes quotes, commas, and newlines', () => {
    const csv = participantsCsv([
      {
        first_name: 'Jean "JB"', last_name: 'B, jr.', birthdate: '1980-01-01', nationality: 'FR',
        email: 'j@x.fr', phone: '1', company_name: 'A\nB', company_position: 'C', id_document_number: '1',
        id_document_expiry: '2030-01-01', departure_station: 'Lyon', dietary_restrictions: null,
        emergency_contact_name: 'P', emergency_contact_phone: '2',
      },
    ])
    expect(csv).toContain('"Jean ""JB"""')
    expect(csv).toContain('"B, jr."')
    expect(csv).toContain('"A\nB"')
  })
})
```

- [ ] **Step 2: Run to verify failure, implement lib/csv.ts**

```bash
npx vitest run lib/__tests__/csv.test.ts
```

```ts
export type CsvParticipant = {
  first_name: string
  last_name: string
  birthdate: string
  nationality: string
  email: string
  phone: string
  company_name: string
  company_position: string
  id_document_number: string
  id_document_expiry: string
  departure_station: string
  dietary_restrictions: string | null
  emergency_contact_name: string
  emergency_contact_phone: string
}

const COLUMNS: (keyof CsvParticipant)[] = [
  'first_name', 'last_name', 'birthdate', 'nationality', 'email', 'phone', 'company_name',
  'company_position', 'id_document_number', 'id_document_expiry', 'departure_station',
  'dietary_restrictions', 'emergency_contact_name', 'emergency_contact_phone',
]

function cell(value: string | null): string {
  const v = value ?? ''
  return /[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v
}

export function participantsCsv(rows: CsvParticipant[]): string {
  const header = COLUMNS.join(',')
  const lines = rows.map((row) => COLUMNS.map((c) => cell(row[c])).join(','))
  return [header, ...lines].join('\n') + '\n'
}
```

- [ ] **Step 3: Run tests to verify pass, implement admin queries**

`apps/platform/lib/admin-queries.ts`:

```ts
import { getSupabase } from '@/lib/supabase'
import { seatsTaken, type SeatRow } from '@/lib/seats'
import { ID_DOCUMENTS_BUCKET } from '@/lib/upload'
import type { CsvParticipant } from '@/lib/csv'

export async function getAdminOverview() {
  const client = getSupabase()
  const [{ data: expeditions, error: e1 }, { data: orders, error: e2 }] = await Promise.all([
    client.from('expeditions').select('id, slug, title, capacity, starts_on, ends_on, is_active').order('starts_on'),
    client
      .from('orders')
      .select('id, expedition_id, quantity, status, expires_at, buyer_email, company_legal_name, amount_total_cents, currency, created_at')
      .order('created_at', { ascending: false }),
  ])
  if (e1 || e2) throw new Error(`admin overview failed: ${e1?.message ?? e2?.message}`)
  const nowIso = new Date().toISOString()
  return (expeditions ?? []).map((expedition) => {
    const expeditionOrders = (orders ?? []).filter((o) => o.expedition_id === expedition.id)
    const taken = seatsTaken(expeditionOrders as SeatRow[], nowIso)
    const revenueCents = expeditionOrders
      .filter((o) => o.status === 'paid')
      .reduce((sum, o) => sum + (o.amount_total_cents ?? 0), 0)
    return { ...expedition, taken, revenueCents, orders: expeditionOrders }
  })
}

export async function getAdminOrder(orderId: string) {
  const { data, error } = await getSupabase()
    .from('orders')
    .select('*, expedition:expeditions (*), participants (*)')
    .eq('id', orderId)
    .maybeSingle()
  if (error) throw new Error(`admin order load failed: ${error.message}`)
  return data
}

export async function signedDocumentUrl(path: string): Promise<string | null> {
  const { data, error } = await getSupabase().storage.from(ID_DOCUMENTS_BUCKET).createSignedUrl(path, 600)
  if (error) return null
  return data.signedUrl
}

export async function getExpeditionManifest(expeditionId: string): Promise<{ title: string; rows: CsvParticipant[] }> {
  const client = getSupabase()
  const { data: expedition, error: e1 } = await client
    .from('expeditions').select('title').eq('id', expeditionId).maybeSingle()
  if (e1 || !expedition) throw new Error(`expedition not found: ${e1?.message}`)
  const { data: orders, error: e2 } = await client
    .from('orders').select('id').eq('expedition_id', expeditionId).eq('status', 'paid')
  if (e2) throw new Error(e2.message)
  const orderIds = (orders ?? []).map((o) => o.id)
  if (orderIds.length === 0) return { title: expedition.title, rows: [] }
  const { data: participants, error: e3 } = await client
    .from('participants')
    .select('first_name, last_name, birthdate, nationality, email, phone, company_name, company_position, id_document_number, id_document_expiry, departure_station, dietary_restrictions, emergency_contact_name, emergency_contact_phone')
    .in('order_id', orderIds)
    .order('last_name')
  if (e3) throw new Error(e3.message)
  return { title: expedition.title, rows: (participants ?? []) as CsvParticipant[] }
}
```

- [ ] **Step 4: Admin layout, overview, order detail, export, logout**

`apps/platform/app/(admin)/admin/layout.tsx` — this is the `(admin)` route group's ROOT layout (see Task 2's route-groups note), so it renders `<html>`/`<body>` itself:

```tsx
import '../../globals.css'

export const metadata = { title: 'Rusker Admin' }

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-bg-light font-sans text-text-dark antialiased">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <div className="mb-8 flex items-center justify-between border-b border-neutral-mid/40 pb-4">
            <a href="/admin" className="font-bold text-rusker-blue">Rusker Admin</a>
            <form action="/api/admin/logout" method="post">
              <button type="submit" className="text-sm text-gray-500 hover:underline">Sign out</button>
            </form>
          </div>
          {children}
        </div>
      </body>
    </html>
  )
}
```

`apps/platform/app/api/admin/logout/route.ts`:

```ts
import { NextResponse } from 'next/server'
import { getAuthClient } from '@/lib/supabase-auth'

export async function POST(request: Request) {
  const supabase = await getAuthClient()
  await supabase.auth.signOut()
  return NextResponse.redirect(new URL('/admin/login', request.url), { status: 303 })
}
```

`apps/platform/app/(admin)/admin/page.tsx`:

```tsx
import { getAdminOverview } from '@/lib/admin-queries'
import { formatPrice } from '@/lib/format'

export const dynamic = 'force-dynamic'

export default async function AdminHome() {
  const expeditions = await getAdminOverview()
  return (
    <div className="space-y-10">
      {expeditions.map((expedition) => (
        <section key={expedition.id} className="rounded-card bg-white p-6 shadow-soft">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">{expedition.title}</h2>
              <p className="text-sm text-gray-500">
                {expedition.starts_on} → {expedition.ends_on} · {expedition.taken}/{expedition.capacity ?? '∞'} seats ·
                revenue {formatPrice(expedition.revenueCents, 'eur')}
              </p>
            </div>
            <a
              href={`/admin/expeditions/${expedition.id}/export`}
              className="rounded-button border border-neutral-mid px-4 py-2 text-sm hover:bg-bg-light"
            >
              Export manifest (CSV)
            </a>
          </div>
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-gray-500">
                <th className="py-1">Date</th><th>Company</th><th>Buyer</th><th>Seats</th><th>Total</th><th>Status</th><th />
              </tr>
            </thead>
            <tbody>
              {expedition.orders.map((order) => (
                <tr key={order.id} className="border-t border-neutral-mid/30">
                  <td className="py-2">{new Date(order.created_at).toISOString().slice(0, 10)}</td>
                  <td>{order.company_legal_name ?? '—'}</td>
                  <td>{order.buyer_email}</td>
                  <td>{order.quantity}</td>
                  <td>{order.amount_total_cents ? formatPrice(order.amount_total_cents, order.currency) : '—'}</td>
                  <td>
                    <span className={order.status === 'paid' ? 'text-green-700' : order.status === 'pending' ? 'text-amber-600' : 'text-gray-400'}>
                      {order.status}
                    </span>
                  </td>
                  <td><a href={`/admin/orders/${order.id}`} className="text-rusker-blue hover:underline">View</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ))}
    </div>
  )
}
```

`apps/platform/app/(admin)/admin/orders/[id]/page.tsx`:

```tsx
import { notFound } from 'next/navigation'
import { getAdminOrder, signedDocumentUrl } from '@/lib/admin-queries'
import { formatPrice } from '@/lib/format'

export const dynamic = 'force-dynamic'

export default async function AdminOrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const order = await getAdminOrder(id)
  if (!order) notFound()

  const documents = await Promise.all(
    (order.participants ?? []).map(async (p: { id: string; id_document_path: string | null }) => ({
      participantId: p.id,
      url: p.id_document_path ? await signedDocumentUrl(p.id_document_path) : null,
    }))
  )
  const urlFor = (participantId: string) => documents.find((d) => d.participantId === participantId)?.url ?? null

  return (
    <div className="space-y-8">
      <a href="/admin" className="text-sm text-rusker-blue hover:underline">← Back</a>
      <section className="rounded-card bg-white p-6 shadow-soft">
        <h1 className="mb-2 text-2xl font-bold">{order.expedition?.title}</h1>
        <dl className="grid gap-x-8 gap-y-1 text-sm sm:grid-cols-2">
          <div><dt className="inline font-medium">Status: </dt><dd className="inline">{order.status}</dd></div>
          <div><dt className="inline font-medium">Seats: </dt><dd className="inline">{order.quantity}</dd></div>
          <div><dt className="inline font-medium">Company: </dt><dd className="inline">{order.company_legal_name ?? '—'}</dd></div>
          <div><dt className="inline font-medium">VAT no.: </dt><dd className="inline">{order.vat_number ?? '—'}</dd></div>
          <div><dt className="inline font-medium">Billing address: </dt><dd className="inline">{order.billing_address ?? '—'}</dd></div>
          <div><dt className="inline font-medium">Buyer: </dt><dd className="inline">{order.buyer_name} &lt;{order.buyer_email}&gt;</dd></div>
          <div><dt className="inline font-medium">Subtotal HT: </dt><dd className="inline">{order.amount_subtotal_cents ? formatPrice(order.amount_subtotal_cents, order.currency) : '—'}</dd></div>
          <div><dt className="inline font-medium">VAT 21%: </dt><dd className="inline">{order.amount_tax_cents ? formatPrice(order.amount_tax_cents, order.currency) : '—'}</dd></div>
          <div><dt className="inline font-medium">Total TTC: </dt><dd className="inline">{formatPrice(order.amount_total_cents, order.currency)}</dd></div>
          <div><dt className="inline font-medium">Terms accepted: </dt><dd className="inline">{order.terms_accepted_at ?? '—'}</dd></div>
          <div><dt className="inline font-medium">Privacy accepted: </dt><dd className="inline">{order.privacy_accepted_at ?? '—'} (IP {order.consent_ip ?? '—'})</dd></div>
          <div><dt className="inline font-medium">Stripe session: </dt><dd className="inline">{order.stripe_checkout_session_id ?? '—'}</dd></div>
        </dl>
      </section>
      {(order.participants ?? []).map((p: Record<string, string | null>, i: number) => (
        <section key={p.id as string} className="rounded-card bg-white p-6 shadow-soft">
          <h2 className="mb-2 text-lg font-semibold">Participant {i + 1}: {p.first_name} {p.last_name}</h2>
          <dl className="grid gap-x-8 gap-y-1 text-sm sm:grid-cols-2">
            <div><dt className="inline font-medium">Birthdate: </dt><dd className="inline">{p.birthdate}</dd></div>
            <div><dt className="inline font-medium">Nationality: </dt><dd className="inline">{p.nationality}</dd></div>
            <div><dt className="inline font-medium">Email: </dt><dd className="inline">{p.email}</dd></div>
            <div><dt className="inline font-medium">Phone: </dt><dd className="inline">{p.phone}</dd></div>
            <div><dt className="inline font-medium">Company: </dt><dd className="inline">{p.company_name} — {p.company_position}</dd></div>
            <div><dt className="inline font-medium">ID number: </dt><dd className="inline">{p.id_document_number} (exp. {p.id_document_expiry})</dd></div>
            <div><dt className="inline font-medium">Departure: </dt><dd className="inline">{p.departure_station}</dd></div>
            <div><dt className="inline font-medium">Dietary: </dt><dd className="inline">{p.dietary_restrictions ?? '—'}</dd></div>
            <div><dt className="inline font-medium">Emergency: </dt><dd className="inline">{p.emergency_contact_name} ({p.emergency_contact_phone})</dd></div>
          </dl>
          {urlFor(p.id as string) ? (
            <a href={urlFor(p.id as string)!} target="_blank" className="mt-3 inline-block rounded-button border border-neutral-mid px-4 py-2 text-sm hover:bg-bg-light">
              View ID document (10-min link)
            </a>
          ) : (
            <p className="mt-3 text-sm text-gray-400">ID document purged or missing</p>
          )}
        </section>
      ))}
    </div>
  )
}
```

`apps/platform/app/(admin)/admin/expeditions/[id]/export/route.ts`:

```ts
import { getExpeditionManifest } from '@/lib/admin-queries'
import { participantsCsv } from '@/lib/csv'

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { title, rows } = await getExpeditionManifest(id)
  const filename = `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-participants.csv`
  return new Response(participantsCsv(rows), {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  })
}
```

Security note: the export route's URL is `/admin/expeditions/[id]/export` (route groups don't affect URLs), so the middleware admin guard covers it — only `api|_next|static files` are excluded from the matcher.

- [ ] **Step 5: Suite + build + manual smoke + commit**

```bash
npx vitest run && npm run build
```

Manual: sign in at /admin/login → overview shows both delegations with seat counts; open an order (create one via the wizard + Stripe test card first if none exist); CSV downloads.

```bash
git add -A && git commit -m "feat(platform): admin dashboard (overview, order detail with signed ID links, CSV manifest export)"
```

---

### Task 12: Legal pages (FR/EN placeholders)

**Files:**
- Create: `apps/platform/app/(site)/[locale]/terms/page.tsx`, `apps/platform/app/(site)/[locale]/privacy/page.tsx`

- [ ] **Step 1: Terms page**

`apps/platform/app/(site)/[locale]/terms/page.tsx` — server component; content is a per-locale object in the file (no translation keys — legal text should be reviewed as one block). Structure (both locales, FR shown; EN mirrors):

```tsx
import { setRequestLocale } from 'next-intl/server'

export const metadata = { title: 'Conditions de vente — Rusker' }

const CONTENT = {
  fr: {
    title: 'Conditions générales de vente',
    draft: 'DOCUMENT PROVISOIRE — à faire valider par un conseil juridique avant toute vente réelle.',
    sections: [
      ['Vendeur', 'Rusker Travel S.L., NIF B44897510, Barcelone, Espagne.'],
      ['Objet', "Vente de places individuelles pour des « learning expeditions » : voyages professionnels organisés incluant transport, hébergement et programme."],
      ['Prix et paiement', 'Les prix sont affichés hors taxes, majorés de la TVA espagnole de 21 %. Le paiement s\'effectue en ligne par carte via Stripe. La réservation est confirmée à réception du paiement ; une facture est émise automatiquement.'],
      ['Prestations', 'Le contenu de chaque expédition (transport, hôtel, programme) est décrit sur la page de l\'offre. Rusker Travel organise la logistique et contacte l\'acheteur sous 2 jours ouvrés.'],
      ['Annulation', 'Conditions d\'annulation et de remboursement à définir avec le conseil juridique. En l\'absence de conditions publiées, contacter bookings@rusker-travel.com.'],
      ['Documents d\'identité', 'La copie de pièce d\'identité demandée sert exclusivement à la réservation des transports et de l\'hébergement. Voir la politique de confidentialité.'],
      ['Droit applicable', 'Droit espagnol. Tout litige relève des tribunaux de Barcelone.'],
    ],
  },
  en: {
    title: 'Terms of Sale',
    draft: 'DRAFT DOCUMENT — must be reviewed by legal counsel before real sales.',
    sections: [
      ['Seller', 'Rusker Travel S.L., NIF B44897510, Barcelona, Spain.'],
      ['Scope', 'Sale of individual seats on organized professional "learning expeditions" including transport, accommodation, and program.'],
      ['Prices and payment', 'Prices are shown excluding tax; Spanish VAT at 21% is added. Payment is made online by card via Stripe. The booking is confirmed on receipt of payment; an invoice is issued automatically.'],
      ['Services', "Each expedition's content (transport, hotel, program) is described on the offer page. Rusker Travel organizes logistics and contacts the buyer within 2 business days."],
      ['Cancellation', 'Cancellation and refund conditions to be defined with legal counsel. Absent published conditions, contact bookings@rusker-travel.com.'],
      ['Identity documents', 'The requested ID copy is used exclusively to book transport and accommodation. See the privacy policy.'],
      ['Governing law', 'Spanish law. Disputes fall under the courts of Barcelona.'],
    ],
  },
} as const

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const c = CONTENT[locale === 'en' ? 'en' : 'fr']
  return (
    <article className="prose mx-auto max-w-2xl">
      <h1 className="mb-2 text-3xl font-bold">{c.title}</h1>
      <p className="mb-8 rounded-card bg-amber-50 p-4 text-sm font-medium text-amber-800">{c.draft}</p>
      {c.sections.map(([heading, body]) => (
        <section key={heading} className="mb-6">
          <h2 className="mb-1 text-xl font-semibold">{heading}</h2>
          <p className="text-gray-700">{body}</p>
        </section>
      ))}
    </article>
  )
}
```

- [ ] **Step 2: Privacy page**

`apps/platform/app/(site)/[locale]/privacy/page.tsx` — same structure. Required sections (FR + EN): Responsable de traitement (Rusker Travel S.L., contact bookings@rusker-travel.com); Données collectées (identité, coordonnées, données professionnelles, copie et numéro de pièce d'identité, restrictions alimentaires, contact d'urgence, données de facturation); Finalités (organisation du voyage : billets de train, hôtel, restauration ; facturation ; obligation légale); Base légale (exécution du contrat, art. 6.1.b RGPD); Destinataires (équipe Rusker — Adam et Tanguy — et prestataires strictement nécessaires : transporteurs, hôtels, Stripe, Supabase, Resend); Hébergement (Supabase, région UE — Paris); Durées de conservation (copies de pièces d'identité supprimées automatiquement 30 jours après la fin de l'expédition, immédiatement pour les réservations non finalisées ; données de commande conservées pour les obligations comptables); Droits (accès, rectification, effacement, portabilité — écrire à bookings@rusker-travel.com); Réclamation (AEPD / CNIL). Both locales carry the same amber "DRAFT — legal review required" banner as the terms page.

- [ ] **Step 3: Build + commit**

```bash
npm run build
git add "apps/platform/app/(site)/[locale]/terms" "apps/platform/app/(site)/[locale]/privacy"
git commit -m "feat(platform): FR/EN terms-of-sale and GDPR privacy placeholders (lawyer review required)"
```

---

### Task 13: Real content — replace dev seeds with the two delegations (DML via REST)

**Files:**
- Modify: `supabase/seed.sql` (kept in sync as documentation of prod content)

- [ ] **Step 1: Update seed.sql**

Replace the contents of `supabase/seed.sql` with:

```sql
-- Production catalog. Applied via REST (service role) — kept here as the source of truth.
update public.expeditions set is_active = false
where slug in ('barcelona-tech-immersion', 'smart-city-discovery');

insert into public.expeditions
  (slug, title, description, price_per_person_cents, currency, min_participants, max_participants,
   starts_on, ends_on, capacity, vat_rate, departure_stations, is_active)
values
  (
    'aura-ai-summit-2026',
    'Délégation AURA — AI Summit Barcelona 2026',
    E'20 dirigeants d''Auvergne-Rhône-Alpes au cœur de l''IA européenne. Trois jours d''immersion à Barcelone pendant l''AI Week et l''AI Summit Barcelona 2026, avec un objectif : repartir avec des opportunités d''implémentation IA concrètes pour vos secteurs (pharma & biotech, énergie & industrie, gaming, finance, mécatronique).\n\nProgramme :\n• Lundi 21 sept — Train Lyon/Grenoble → Barcelone, installation à l''hôtel 4★ (centre-ville), briefing délégation, dîner privé d''ouverture.\n• Mardi 22 sept — AI Summit J1 : keynotes, démos, panels au WTC Barcelona, Real Use Case Stage, networking dirigé, side event exclusif en soirée.\n• Mercredi 23 sept — Summit J2 : workshops interactifs, restitution & cas d''usage concrets, train retour en soirée.\n\nL''offre comprend : transport aller/retour en train, hôtel 4★ (2 nuits), dîner privé d''ouverture, Pass Gold AI Summit 2 jours (valeur 650 €), side event du 22/09, accès AI Week (50+ side events), networking organisé et accompagnement Rusker (briefing, coordination, logistique).\n\nPartenaires confirmés : Anthropic, Google Cloud, ElevenLabs, n8n, Artefact, Tether, Digital Realty.',
    210000, 'eur', 1, 20,
    '2026-09-21', '2026-09-23', 20, 21.00, '{Lyon,Grenoble}', true
  ),
  (
    'occitanie-ai-summit-2026',
    'Délégation Occitanie — AI Summit Barcelona 2026',
    E'20 dirigeants d''Occitanie au cœur de l''IA européenne. Trois jours d''immersion à Barcelone pendant l''AI Week et l''AI Summit Barcelona 2026, avec un objectif : repartir avec des opportunités d''implémentation IA concrètes pour vos secteurs (aérospatial & défense, agroalimentaire, biotech & pharmacie, retail & e-commerce, énergie & cleantech).\n\nProgramme :\n• Lundi 21 sept — Train Toulouse/Montpellier → Barcelone, installation à l''hôtel 4★ (centre-ville), briefing délégation, dîner privé d''ouverture.\n• Mardi 22 sept — AI Summit J1 : keynotes, démos, panels au WTC Barcelona, Real Use Case Stage, networking dirigé, side event exclusif en soirée.\n• Mercredi 23 sept — Summit J2 : workshops interactifs, restitution & cas d''usage concrets, train retour en soirée.\n\nL''offre comprend : transport aller/retour en train, hôtel 4★ (2 nuits), dîner privé d''ouverture, Pass Gold AI Summit 2 jours (valeur 650 €), side event du 22/09, accès AI Week (50+ side events), networking organisé et accompagnement Rusker (briefing, coordination, logistique).\n\nPartenaires confirmés : Anthropic, Google Cloud, ElevenLabs, n8n, Artefact, Tether, Digital Realty.',
    210000, 'eur', 1, 20,
    '2026-09-21', '2026-09-23', 20, 21.00, '{Toulouse,Montpellier}', true
  )
on conflict (slug) do nothing;
```

- [ ] **Step 2: Apply via REST (after the Task 1 migration is live)**

Deactivate the dev seeds and insert both rows through the Supabase REST API using the service-role key from `apps/platform/.env.local` (PATCH `expeditions?slug=in.(...)` with `{"is_active": false}`, then POST both new rows to `/rest/v1/expeditions`). Verify:

```bash
source apps/platform/.env.local
curl -s "$SUPABASE_URL/rest/v1/expeditions?select=slug,is_active,capacity,starts_on,departure_stations" \
  -H "apikey: $SUPABASE_SERVICE_ROLE_KEY" -H "Authorization: Bearer $SUPABASE_SERVICE_ROLE_KEY"
```

Expected: old slugs inactive; both `*-ai-summit-2026` rows active with capacity 20 and the right stations.

- [ ] **Step 3: Commit**

```bash
git add supabase/seed.sql && git commit -m "feat: production catalog content for AURA and Occitanie delegations"
```

---

### Task 14: Deployment config + docs

**Files:**
- Modify: `docs/PLATFORM-DEPLOYMENT.md`, `turbo.json`

- [ ] **Step 1: Extend turbo.json build env passthrough**

In `turbo.json`, extend the `build.env` array with:

```json
        "NEXT_PUBLIC_SUPABASE_URL",
        "NEXT_PUBLIC_SUPABASE_ANON_KEY",
        "ADMIN_EMAILS",
        "ADMIN_NOTIFICATION_EMAILS",
        "CRON_SECRET"
```

- [ ] **Step 2: Update the deployment doc**

In `docs/PLATFORM-DEPLOYMENT.md`, update the rusker-platform env list to add: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `ADMIN_EMAILS`, `ADMIN_NOTIFICATION_EMAILS`, `CRON_SECRET`; and append a section:

```markdown
## Admin & cron

- Admin dashboard: https://app.rusker-travel.com/admin — magic-link login, allowlist in `ADMIN_EMAILS`.
- Supabase dashboard → Authentication → URL Configuration must allowlist
  `https://app.rusker-travel.com/admin/auth/confirm` (and the localhost variant for dev).
- Vercel Cron (`apps/platform/vercel.json`) hits `/api/cron/cleanup` daily at 03:00 UTC;
  it purges abandoned pending bookings and ID scans older than 30 days post-expedition.
  `CRON_SECRET` must be set on the Vercel project.
- Env changes only take effect after a redeploy.
```

- [ ] **Step 3: Add env vars to Vercel — REQUIRES USER APPROVAL for the redeploy**

Set the five new vars on the `rusker-landing-platform` project (`vercel env add NAME production` from `apps/platform/`, values from `.env.local`; `NEXT_PUBLIC_SITE_URL` should already be `https://app.rusker-travel.com` in prod — verify, it was `http://localhost:3001` locally). The redeploy happens in Task 15.

- [ ] **Step 4: Commit**

```bash
git add turbo.json docs/PLATFORM-DEPLOYMENT.md
git commit -m "docs: deployment guide and turbo env passthrough for admin/cron/i18n"
```

---

### Task 15: End-to-end verification (Stripe test mode) + ship

No new files. Requires: Task 1 migration applied, Task 13 content live, env vars on Vercel.

- [ ] **Step 1: Clean local run**

```bash
rm -rf apps/platform/.next && npm install && npm run build && npm run test
```

Expected: build green (routes under `/[locale]/…`, `/admin/…`, `/api/…`), all vitest suites pass.

- [ ] **Step 2: Local E2E with webhook forwarding**

```bash
npm run dev --workspace @rusker/platform
stripe listen --forward-to localhost:3001/api/webhooks/stripe   # second terminal; put its whsec_ in .env.local
```

Checklist:
1. `/fr/expeditions` shows both delegations with dates and "X places restantes"; `/en/…` shows English.
2. Wizard: 2 participants, ID uploads (one jpg, one pdf), stations offered match the delegation; oversized file rejected with a message.
3. Step 3 totals: 2 × €2,100 = €4,200 HT, €882 TVA, €5,082 TTC; pay button disabled until both checkboxes ticked.
4. Stripe checkout shows the line item + "IVA (21%)" tax line and total €5,082.
5. Pay `4242 4242 4242 4242` → success page in French; `stripe listen` shows 200.
6. Supabase: order `paid` with amounts/billing/consents; 2 participants rows with `orders/<id>/…` document paths; files present in the bucket.
7. Resend not configured → dev server logs "post-payment email failed" but order stays paid (fail-soft confirmed).
8. Webhook resend from the Stripe dashboard → still exactly one paid order (idempotency).
9. Abandon a checkout (create then close the Stripe tab) → after expiry, `GET /api/cron/cleanup` with the Bearer secret → order `expired`, its files gone.
10. `/admin` denies a non-allowlisted email; allowlisted magic link works; order detail shows everything incl. working 10-minute ID links; CSV manifest downloads with both participants.

- [ ] **Step 2b: Fix anything found, commit fixes**

- [ ] **Step 3: Ship — merge + deploy (REQUIRES USER APPROVAL for prod redeploy)**

```bash
npx vitest run && npm run build
git checkout main && git merge feat/individual-bookings
git -c credential.helper= -c credential.helper='!f() { echo username=Novaliatester; echo "password=$(gh auth token --user Novaliatester)"; }; f' push origin main
```

Vercel auto-deploys from main; verify https://app.rusker-travel.com/fr/expeditions renders the delegations, run one live test-mode purchase, check /admin.

- [ ] **Step 4: Post-ship follow-ups for the user (not in this plan)**

Resend account + domain verification → set `RESEND_API_KEY`; lawyer review of /terms + /privacy; Stripe live keys + live webhook endpoint when ready to sell for real.
