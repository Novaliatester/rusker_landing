# Learning Expeditions Purchase Platform Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure the repo into a Turborepo monorepo (`apps/web` landing + `apps/platform` purchase app) and ship a Stripe hosted-checkout purchase flow for learning expeditions backed by Supabase.

**Architecture:** The existing `rusker_landing` repo becomes the monorepo root (npm workspaces + Turborepo). The landing moves wholesale to `apps/web` (rusker-travel.com). A new Next.js 15 app at `apps/platform` (app.rusker-travel.com) renders an expeditions catalog from Supabase, creates Stripe Checkout Sessions server-side (price always from DB), and a signature-verified webhook records orders idempotently and sends Resend emails.

**Tech Stack:** Next.js 15 (App Router), npm workspaces, Turborepo 2, Tailwind 3.4, Supabase (`@supabase/supabase-js`, service-role server-side only), Stripe hosted Checkout (`stripe` node SDK), Resend, Vitest.

**Spec:** `docs/superpowers/specs/2026-07-08-expeditions-checkout-design.md`

**Context notes for the implementer:**
- Repo root is `/Users/lucassala/Code/RUSKER/rusker_landing` (this IS the git repo; the parent `RUSKER/` folder is not a repo).
- Current branch is `security/upgrade-next-15` (contains the Next 15 upgrade — build on top of it, NOT `main`).
- Production is on Vercel (verified via DNS + response headers). The GitHub Pages files in the repo are legacy and safe to delete.
- `.env.local` at repo root is untracked and contains `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY`. It must be moved by hand (git won't track it).
- Node v24 / npm 11 available locally.

---

### Task 1: Feature branch + delete legacy GitHub Pages artifacts

The repo contains committed static-export build output and GH Pages deploy plumbing that must not move into the monorepo.

**Files:**
- Delete: `_next/` (committed build output), `404 2.html`, `index 2.html`, `index 2.txt`, `form 2.html`, `form 2.txt`, `.nojekyll 2`, `CNAME`, `deploy.sh`, `.github/workflows/nextjs.yml`, root-level `favicon.ico`, `favicon-32x32.png`, `favicon-192x192.png`, `apple-touch-icon.png` (duplicates — canonical copies live in `public/`), root `images/` (static-export copy of `public/images/`)
- Modify: `next.config.js` (remove GH Pages static-export branches)
- Modify: `package.json` (remove `build:static` script)
- Delete: `scripts/fix-image-paths.js` (only used by `build:static`)

- [ ] **Step 1: Create the feature branch**

```bash
cd /Users/lucassala/Code/RUSKER/rusker_landing
git checkout security/upgrade-next-15
git checkout -b feat/expeditions-platform
```

- [ ] **Step 2: Delete the legacy files**

```bash
git rm -r "_next" "404 2.html" "index 2.html" "index 2.txt" "form 2.html" "form 2.txt" ".nojekyll 2" CNAME deploy.sh .github/workflows/nextjs.yml favicon.ico favicon-32x32.png favicon-192x192.png apple-touch-icon.png images scripts/fix-image-paths.js
```

Note: root `images/` is the static-export duplicate; the app serves images from `public/images/`. Verify before deleting: `git grep -l '"/images/' app components lib | head` should show references that resolve to `public/images/` at runtime (they do — Next serves `public/` at `/`).

- [ ] **Step 3: Simplify next.config.js to Vercel-only**

Replace the entire contents of `next.config.js` with:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days cache
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  experimental: {
    optimizeCss: true,
  },
}

module.exports = nextConfig
```

(Removed: `output: 'export'` conditional, `basePath`/`assetPrefix`, `images.unoptimized` — all GH Pages-only. Kept everything else identical.)

- [ ] **Step 4: Remove build:static script from package.json**

In `package.json`, delete the line:

```json
    "build:static": "next build && node scripts/fix-image-paths.js",
```

- [ ] **Step 5: Verify the app still builds**

```bash
npm run build
```

Expected: `✓ Compiled successfully`, no `output: export` errors, routes listed (including `/api/submit-form` as a dynamic route).

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: remove legacy GitHub Pages deployment artifacts (prod is Vercel)"
```

---

### Task 2: Monorepo skeleton — move landing to apps/web, add workspaces + Turborepo

**Files:**
- Create: `apps/web/` (everything moves here), root `package.json` (new workspace root), `turbo.json`
- Modify: `.gitignore` (stays at root, add `.turbo`), `apps/web/package.json` (rename)
- Move: `README.md` → `apps/web/README.md`; audit docs (`CLOUDINARY_SETUP.md`, `DATA_USAGE_AUDIT.md`, `DEPLOYMENT.md`, `MOBILE_IMPROVEMENTS.md`, `OPTIMIZATION_SUMMARY.md`, `SEO_AUDIT.md`, `VERCEL_DEPLOYMENT.md`) → `apps/web/`
- Keep at root: `.git`, `.gitignore`, `.github/`, `docs/`

- [ ] **Step 1: Move the app into apps/web**

```bash
mkdir -p apps/web
git mv app components lib messages public scripts next.config.js next-env.d.ts tailwind.config.ts tsconfig.json postcss.config.js .eslintrc.json package.json package-lock.json vercel.json README.md CLOUDINARY_SETUP.md DATA_USAGE_AUDIT.md DEPLOYMENT.md MOBILE_IMPROVEMENTS.md OPTIMIZATION_SUMMARY.md SEO_AUDIT.md VERCEL_DEPLOYMENT.md apps/web/
mv .env.local apps/web/.env.local   # untracked — plain mv
rm -rf .next node_modules            # stale build/deps at old location
```

- [ ] **Step 2: Delete the moved lockfile and vercel.json**

The root lockfile will be regenerated by the workspace install; per-app `vercel.json` is superseded by Vercel project settings (root directory = `apps/web`).

```bash
git rm apps/web/package-lock.json apps/web/vercel.json
```

- [ ] **Step 3: Rename the web package**

In `apps/web/package.json` change:

```json
  "name": "rusker-landing-page",
```

to:

```json
  "name": "@rusker/web",
```

- [ ] **Step 4: Create the workspace root package.json**

Create `package.json` at repo root:

```json
{
  "name": "rusker-monorepo",
  "version": "0.1.0",
  "private": true,
  "workspaces": [
    "apps/*",
    "packages/*"
  ],
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "lint": "turbo run lint",
    "test": "turbo run test"
  },
  "devDependencies": {
    "turbo": "^2"
  }
}
```

- [ ] **Step 5: Create turbo.json**

Create `turbo.json` at repo root:

```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "dev": {
      "cache": false,
      "persistent": true
    },
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**"],
      "env": [
        "NEXT_PUBLIC_*",
        "SUPABASE_URL",
        "SUPABASE_SERVICE_ROLE_KEY",
        "STRIPE_SECRET_KEY",
        "STRIPE_WEBHOOK_SECRET",
        "RESEND_API_KEY",
        "TEAM_NOTIFICATION_EMAIL"
      ]
    },
    "lint": {},
    "test": {}
  }
}
```

- [ ] **Step 6: Update .gitignore**

Append to the root `.gitignore`:

```
# Turborepo
.turbo/
```

(Verify the existing file already ignores `node_modules`, `.next`, `.env*.local` — it does; leave the rest untouched.)

- [ ] **Step 7: Install and build via turbo**

```bash
npm install
npm run build
```

Expected: install creates a root `package-lock.json` and root `node_modules`; turbo runs `@rusker/web#build` successfully (`Tasks: 1 successful, 1 total`).

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "refactor: restructure into npm-workspaces + Turborepo monorepo, landing at apps/web"
```

---

### Task 3: Shared packages — packages/config and packages/ui (Tailwind brand preset)

**Files:**
- Create: `packages/config/package.json`, `packages/config/tsconfig.base.json`
- Create: `packages/ui/package.json`, `packages/ui/tailwind-preset.js`
- Modify: `apps/web/tailwind.config.ts` (use the preset)

- [ ] **Step 1: Create packages/config**

`packages/config/package.json`:

```json
{
  "name": "@rusker/config",
  "version": "0.1.0",
  "private": true
}
```

`packages/config/tsconfig.base.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true
  }
}
```

- [ ] **Step 2: Create packages/ui with the brand preset**

`packages/ui/package.json`:

```json
{
  "name": "@rusker/ui",
  "version": "0.1.0",
  "private": true,
  "main": "tailwind-preset.js"
}
```

`packages/ui/tailwind-preset.js` (CommonJS so both apps' Tailwind configs can load it — theme lifted verbatim from the landing's `tailwind.config.ts`):

```js
/** Rusker brand Tailwind preset — shared by apps/web and apps/platform */
module.exports = {
  theme: {
    extend: {
      colors: {
        // Global neutral colors
        'neutral-light': '#f5f5f5',
        'neutral-dark': '#2f3433',
        'neutral-mid': '#cfcfcf',

        // Travel universe (blue/teal)
        'travel': '#287497',
        'travel-light': '#bfeff4',
        'travel-dark': '#1f6580',

        // Events universe (green)
        'events': '#0b5d56',
        'events-light': '#6ee3a8',
        'events-dark': '#094a44',

        // Network universe (burgundy/red)
        'network': '#a61e3f',
        'network-light': '#ffdfeb',
        'network-dark': '#8a1935',

        // Legacy (keep for backwards compatibility)
        'rusker-blue': '#287497',
        'rusker-travel': '#287497',
        'rusker-events': '#0b5d56',
        'rusker-network': '#a61e3f',
        'text-dark': '#2f3433',
        'bg-light': '#f5f5f5',
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'card': '20px',
        'button': '16px',
      },
      boxShadow: {
        'soft': '0 4px 12px rgba(0, 0, 0, 0.05)',
        'soft-hover': '0 6px 18px rgba(0, 0, 0, 0.08)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle, var(--tw-gradient-stops))',
      },
    },
  },
}
```

- [ ] **Step 3: Point apps/web at the preset**

Replace the entire contents of `apps/web/tailwind.config.ts` with:

```ts
import type { Config } from 'tailwindcss'
import ruskerPreset from '@rusker/ui/tailwind-preset'

const config: Config = {
  presets: [ruskerPreset],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
export default config
```

Add the workspace dependency to `apps/web/package.json` under `dependencies`:

```json
    "@rusker/ui": "*",
```

- [ ] **Step 4: Reinstall and verify web build output is unchanged**

```bash
npm install
npm run build
```

Expected: build succeeds. Spot-check that brand classes still resolve: `grep -o 'rusker-blue' apps/web/.next/static/css/*.css | head -1` prints `rusker-blue`'s compiled color usage (or at minimum the build emits CSS files without errors).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add @rusker/config and @rusker/ui with shared Tailwind brand preset"
```

---

### Task 4: Scaffold apps/platform (Next.js 15 + Tailwind + Vitest)

Scaffold by hand (not create-next-app) so versions match `apps/web` exactly.

**Files:**
- Create: `apps/platform/package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `postcss.config.js`, `vitest.config.ts`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `.env.example`

- [ ] **Step 1: Create apps/platform/package.json**

```json
{
  "name": "@rusker/platform",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev -p 3001",
    "build": "next build",
    "start": "next start -p 3001",
    "lint": "tsc --noEmit",
    "test": "vitest run"
  },
  "dependencies": {
    "@rusker/ui": "*",
    "@supabase/supabase-js": "^2.97.0",
    "next": "^15.5.20",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "resend": "^4.0.0",
    "stripe": "^18.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.14.12",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.5.10",
    "tailwindcss": "^3.4.9",
    "typescript": "^5.5.4",
    "vitest": "^3.0.0"
  }
}
```

- [ ] **Step 2: Create tsconfig.json**

`apps/platform/tsconfig.json`:

```json
{
  "extends": "../../packages/config/tsconfig.base.json",
  "compilerOptions": {
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 3: Create next/tailwind/postcss/vitest configs**

`apps/platform/next.config.ts`:

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
}

export default nextConfig
```

`apps/platform/tailwind.config.ts`:

```ts
import type { Config } from 'tailwindcss'
import ruskerPreset from '@rusker/ui/tailwind-preset'

const config: Config = {
  presets: [ruskerPreset],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [],
}
export default config
```

`apps/platform/postcss.config.js`:

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

`apps/platform/vitest.config.ts`:

```ts
import { defineConfig } from 'vitest/config'
import path from 'node:path'

export default defineConfig({
  test: {
    environment: 'node',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname),
    },
  },
})
```

- [ ] **Step 4: Create the app shell**

`apps/platform/app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

`apps/platform/app/layout.tsx`:

```tsx
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Rusker Expeditions',
  description: 'Book a Rusker learning expedition in Barcelona.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-bg-light text-text-dark antialiased`}>
        <header className="bg-white shadow-soft">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <a href="https://rusker-travel.com" className="text-xl font-bold tracking-wide text-rusker-blue">
              RUSKER
            </a>
            <span className="text-sm text-gray-500">Learning Expeditions</span>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-6 py-12">{children}</main>
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

`apps/platform/app/page.tsx`:

```tsx
import { redirect } from 'next/navigation'

export default function Home() {
  redirect('/expeditions')
}
```

- [ ] **Step 5: Create .env.example**

`apps/platform/.env.example`:

```bash
# Supabase (same project as apps/web)
SUPABASE_URL=https://YOUR-PROJECT.supabase.co
SUPABASE_SERVICE_ROLE_KEY=...

# Stripe (test mode keys while developing)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Emails
RESEND_API_KEY=re_...
TEAM_NOTIFICATION_EMAIL=team@rusker-travel.com

# Absolute URL of this app (used for Stripe redirect URLs when no Origin header)
NEXT_PUBLIC_SITE_URL=http://localhost:3001
```

Also copy the real Supabase values now so local dev works:

```bash
cp apps/web/.env.local apps/platform/.env.local
echo 'NEXT_PUBLIC_SITE_URL=http://localhost:3001' >> apps/platform/.env.local
```

(Stripe/Resend values get added to `apps/platform/.env.local` by hand when the user creates those accounts — see Task 13.)

- [ ] **Step 6: Install, build, and check vitest runs**

```bash
npm install
npm run build
npx vitest run --root apps/platform --passWithNoTests
```

Expected: turbo builds both apps (`Tasks: 2 successful`); vitest exits 0 with "no test files found" tolerated by `--passWithNoTests`.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: scaffold apps/platform (Next 15, Tailwind preset, Vitest)"
```

---

### Task 5: Supabase migration — expeditions and orders tables

**Files:**
- Create: `supabase/migrations/0001_expeditions_and_orders.sql`
- Create: `supabase/seed.sql`

- [ ] **Step 1: Write the migration**

`supabase/migrations/0001_expeditions_and_orders.sql`:

```sql
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
```

- [ ] **Step 2: Write the seed (dev/test data)**

`supabase/seed.sql`:

```sql
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
```

- [ ] **Step 3: Apply to Supabase**

The repo has no Supabase CLI link. Apply via the dashboard: open the project's **SQL Editor**, paste and run `0001_expeditions_and_orders.sql`, then `seed.sql`.

Verify:

```sql
select slug, price_per_person_cents, min_participants, max_participants from public.expeditions;
```

Expected: 2 rows.

If this step can't be performed (no dashboard access from the execution environment), mark it as a HUMAN step and continue — later tasks' automated tests don't hit the real DB.

- [ ] **Step 4: Commit**

```bash
git add supabase
git commit -m "feat: add Supabase migration and seed for expeditions + orders"
```

---

### Task 6: Platform data layer — Supabase client + expedition queries

**Files:**
- Create: `apps/platform/lib/supabase.ts`, `apps/platform/lib/expeditions.ts`

- [ ] **Step 1: Lazy Supabase service client**

`apps/platform/lib/supabase.ts` (lazy so `next build` doesn't require env vars at import time):

```ts
import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let client: SupabaseClient | null = null

/** Server-only Supabase client using the service-role key. Never import from client components. */
export function getSupabase(): SupabaseClient {
  if (!client) {
    const url = process.env.SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!url || !key) {
      throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set')
    }
    client = createClient(url, key, { auth: { persistSession: false } })
  }
  return client
}
```

- [ ] **Step 2: Expedition types + queries**

`apps/platform/lib/expeditions.ts`:

```ts
import { getSupabase } from '@/lib/supabase'

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
}

const COLUMNS =
  'id, slug, title, description, image_url, price_per_person_cents, currency, min_participants, max_participants, is_active'

export async function listActiveExpeditions(): Promise<Expedition[]> {
  const { data, error } = await getSupabase()
    .from('expeditions')
    .select(COLUMNS)
    .eq('is_active', true)
    .order('created_at', { ascending: true })
  if (error) throw new Error(`failed to list expeditions: ${error.message}`)
  return (data ?? []) as Expedition[]
}

export async function getExpeditionBySlug(slug: string): Promise<Expedition | null> {
  const { data, error } = await getSupabase()
    .from('expeditions')
    .select(COLUMNS)
    .eq('slug', slug)
    .maybeSingle()
  if (error) throw new Error(`failed to fetch expedition ${slug}: ${error.message}`)
  return data as Expedition | null
}

export async function getExpeditionById(id: string): Promise<Expedition | null> {
  const { data, error } = await getSupabase()
    .from('expeditions')
    .select(COLUMNS)
    .eq('id', id)
    .maybeSingle()
  if (error) throw new Error(`failed to fetch expedition ${id}: ${error.message}`)
  return data as Expedition | null
}
```

- [ ] **Step 3: Typecheck and commit**

```bash
npx tsc --noEmit -p apps/platform
git add apps/platform/lib
git commit -m "feat(platform): Supabase service client and expedition queries"
```

Expected: tsc exits 0.

---

### Task 7: Checkout request validation (TDD) + price formatting helper

**Files:**
- Create: `apps/platform/lib/checkout.ts`, `apps/platform/lib/format.ts`
- Test: `apps/platform/lib/__tests__/checkout.test.ts`, `apps/platform/lib/__tests__/format.test.ts`

- [ ] **Step 1: Write the failing tests**

`apps/platform/lib/__tests__/checkout.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { parseCheckoutRequest, validateQuantity } from '@/lib/checkout'

describe('parseCheckoutRequest', () => {
  it('accepts a valid body', () => {
    expect(parseCheckoutRequest({ slug: 'barcelona-tech-immersion', quantity: 12 })).toEqual({
      slug: 'barcelona-tech-immersion',
      quantity: 12,
    })
  })

  it.each([
    ['null body', null],
    ['missing slug', { quantity: 3 }],
    ['empty slug', { slug: '', quantity: 3 }],
    ['missing quantity', { slug: 'x' }],
    ['non-integer quantity', { slug: 'x', quantity: 2.5 }],
    ['zero quantity', { slug: 'x', quantity: 0 }],
    ['negative quantity', { slug: 'x', quantity: -1 }],
    ['string quantity', { slug: 'x', quantity: '3' }],
  ])('rejects %s', (_name, body) => {
    expect(parseCheckoutRequest(body)).toBeNull()
  })
})

describe('validateQuantity', () => {
  const bounds = { min_participants: 10, max_participants: 40 }

  it('accepts a quantity within bounds', () => {
    expect(validateQuantity(bounds, 10)).toBeNull()
    expect(validateQuantity(bounds, 40)).toBeNull()
  })

  it('rejects below minimum', () => {
    expect(validateQuantity(bounds, 9)).toBe('This expedition requires at least 10 participants')
  })

  it('rejects above maximum', () => {
    expect(validateQuantity(bounds, 41)).toBe('This expedition allows at most 40 participants')
  })

  it('allows any quantity above min when max is null', () => {
    expect(validateQuantity({ min_participants: 1, max_participants: null }, 500)).toBeNull()
  })
})
```

`apps/platform/lib/__tests__/format.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { formatPrice } from '@/lib/format'

describe('formatPrice', () => {
  it('formats whole euro amounts without decimals', () => {
    expect(formatPrice(89000, 'eur')).toBe('€890')
  })

  it('formats fractional amounts with two decimals', () => {
    expect(formatPrice(89050, 'eur')).toBe('€890.50')
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
cd apps/platform && npx vitest run
```

Expected: FAIL — cannot resolve `@/lib/checkout` / `@/lib/format`.

- [ ] **Step 3: Implement**

`apps/platform/lib/checkout.ts`:

```ts
export type CheckoutRequest = {
  slug: string
  quantity: number
}

export function parseCheckoutRequest(body: unknown): CheckoutRequest | null {
  if (typeof body !== 'object' || body === null) return null
  const { slug, quantity } = body as Record<string, unknown>
  if (typeof slug !== 'string' || slug.length === 0) return null
  if (typeof quantity !== 'number' || !Number.isInteger(quantity) || quantity < 1) return null
  return { slug, quantity }
}

type QuantityBounds = {
  min_participants: number
  max_participants: number | null
}

/** Returns a user-facing error message, or null if the quantity is valid. */
export function validateQuantity(bounds: QuantityBounds, quantity: number): string | null {
  if (quantity < bounds.min_participants) {
    return `This expedition requires at least ${bounds.min_participants} participants`
  }
  if (bounds.max_participants !== null && quantity > bounds.max_participants) {
    return `This expedition allows at most ${bounds.max_participants} participants`
  }
  return null
}
```

`apps/platform/lib/format.ts`:

```ts
export function formatPrice(cents: number, currency: string): string {
  return new Intl.NumberFormat('en-IE', {
    style: 'currency',
    currency: currency.toUpperCase(),
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
    maximumFractionDigits: cents % 100 === 0 ? 0 : 2,
  }).format(cents / 100)
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
cd apps/platform && npx vitest run
```

Expected: all tests PASS.

- [ ] **Step 5: Commit**

```bash
git add apps/platform/lib
git commit -m "feat(platform): checkout request validation and price formatting (TDD)"
```

---

### Task 8: Stripe client + POST /api/checkout

**Files:**
- Create: `apps/platform/lib/stripe.ts`, `apps/platform/app/api/checkout/route.ts`

- [ ] **Step 1: Stripe client**

`apps/platform/lib/stripe.ts`:

```ts
import Stripe from 'stripe'

// Empty-string fallback keeps `next build` from crashing at import time;
// real requests fail loudly if the key is missing.
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '')
```

- [ ] **Step 2: Checkout route**

`apps/platform/app/api/checkout/route.ts`:

```ts
import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { getExpeditionBySlug } from '@/lib/expeditions'
import { parseCheckoutRequest, validateQuantity } from '@/lib/checkout'

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const parsed = parseCheckoutRequest(body)
  if (!parsed) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const expedition = await getExpeditionBySlug(parsed.slug)
  if (!expedition || !expedition.is_active) {
    return NextResponse.json({ error: 'Expedition not found' }, { status: 400 })
  }

  const quantityError = validateQuantity(expedition, parsed.quantity)
  if (quantityError) {
    return NextResponse.json({ error: quantityError }, { status: 400 })
  }

  const origin =
    request.headers.get('origin') ?? process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3001'

  try {
    // Price always comes from the database — the client only ever sends slug + quantity.
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          quantity: parsed.quantity,
          price_data: {
            currency: expedition.currency,
            unit_amount: expedition.price_per_person_cents,
            product_data: {
              name: expedition.title,
              ...(expedition.image_url ? { images: [expedition.image_url] } : {}),
            },
          },
        },
      ],
      metadata: {
        expedition_id: expedition.id,
        quantity: String(parsed.quantity),
      },
      customer_creation: 'always',
      billing_address_collection: 'required',
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/expeditions/${expedition.slug}`,
    })
    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('checkout session creation failed', err)
    return NextResponse.json(
      { error: 'Payment provider error — please try again' },
      { status: 502 }
    )
  }
}
```

- [ ] **Step 3: Typecheck + build**

```bash
npx tsc --noEmit -p apps/platform
npm run build
```

Expected: both succeed; platform build lists `/api/checkout` as a dynamic route.

- [ ] **Step 4: Commit**

```bash
git add apps/platform/lib/stripe.ts apps/platform/app/api
git commit -m "feat(platform): Stripe client and hosted-checkout session endpoint"
```

---

### Task 9: Catalog and detail pages + booking panel

**Files:**
- Create: `apps/platform/app/expeditions/page.tsx`, `apps/platform/app/expeditions/[slug]/page.tsx`, `apps/platform/components/BookingPanel.tsx`

- [ ] **Step 1: Catalog page**

`apps/platform/app/expeditions/page.tsx`:

```tsx
import Link from 'next/link'
import { listActiveExpeditions } from '@/lib/expeditions'
import { formatPrice } from '@/lib/format'

export const dynamic = 'force-dynamic'

export const metadata = { title: 'Learning Expeditions — Rusker' }

export default async function ExpeditionsPage() {
  let expeditions
  try {
    expeditions = await listActiveExpeditions()
  } catch (err) {
    console.error(err)
    return (
      <p className="text-gray-600">
        We couldn&apos;t load the expeditions right now. Please try again in a moment.
      </p>
    )
  }

  if (expeditions.length === 0) {
    return <p className="text-gray-600">No expeditions are available right now — check back soon.</p>
  }

  return (
    <div>
      <h1 className="mb-2 text-4xl font-bold">Learning Expeditions</h1>
      <p className="mb-10 max-w-2xl text-gray-600">
        Immersive Barcelona experiences for schools and companies. Pick an expedition, choose your
        group size, and book online.
      </p>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {expeditions.map((expedition) => (
          <Link
            key={expedition.id}
            href={`/expeditions/${expedition.slug}`}
            className="block overflow-hidden rounded-card bg-white shadow-soft transition-shadow hover:shadow-soft-hover"
          >
            {expedition.image_url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={expedition.image_url}
                alt={expedition.title}
                className="h-44 w-full object-cover"
              />
            )}
            <div className="p-6">
              <h2 className="mb-2 text-xl font-semibold">{expedition.title}</h2>
              {expedition.description && (
                <p className="mb-4 line-clamp-3 text-sm text-gray-600">{expedition.description}</p>
              )}
              <p className="font-semibold text-rusker-blue">
                {formatPrice(expedition.price_per_person_cents, expedition.currency)}
                <span className="font-normal text-gray-500"> / person</span>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Booking panel (client component)**

`apps/platform/components/BookingPanel.tsx`:

```tsx
'use client'

import { useState } from 'react'
import { formatPrice } from '@/lib/format'

type Props = {
  slug: string
  pricePerPersonCents: number
  currency: string
  min: number
  max: number | null
}

export default function BookingPanel({ slug, pricePerPersonCents, currency, min, max }: Props) {
  const [quantity, setQuantity] = useState(min)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const clamp = (q: number) => Math.max(min, max !== null ? Math.min(max, q) : q)

  async function checkout() {
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, quantity }),
      })
      const data = await res.json()
      if (!res.ok || !data.url) {
        setError(data.error ?? 'Something went wrong — please try again')
        setSubmitting(false)
        return
      }
      window.location.assign(data.url)
    } catch {
      setError('Something went wrong — please try again')
      setSubmitting(false)
    }
  }

  return (
    <div className="rounded-card bg-white p-6 shadow-soft">
      <p className="mb-4 text-lg font-semibold text-rusker-blue">
        {formatPrice(pricePerPersonCents, currency)}
        <span className="font-normal text-gray-500"> / person</span>
      </p>

      <label htmlFor="quantity" className="mb-1 block text-sm font-medium">
        Participants
      </label>
      <div className="mb-1 flex items-center gap-3">
        <button
          type="button"
          aria-label="Decrease participants"
          onClick={() => setQuantity((q) => clamp(q - 1))}
          className="h-10 w-10 rounded-button border border-neutral-mid text-lg hover:bg-bg-light"
        >
          −
        </button>
        <input
          id="quantity"
          type="number"
          value={quantity}
          min={min}
          max={max ?? undefined}
          onChange={(e) => {
            const value = Number(e.target.value)
            if (Number.isInteger(value)) setQuantity(clamp(value))
          }}
          className="h-10 w-20 rounded-button border border-neutral-mid text-center"
        />
        <button
          type="button"
          aria-label="Increase participants"
          onClick={() => setQuantity((q) => clamp(q + 1))}
          className="h-10 w-10 rounded-button border border-neutral-mid text-lg hover:bg-bg-light"
        >
          +
        </button>
      </div>
      <p className="mb-4 text-xs text-gray-500">
        {min > 1 ? `Minimum ${min}` : 'From 1'}
        {max !== null ? ` · maximum ${max}` : ''} participants
      </p>

      <p className="mb-6 text-xl font-bold">
        Total: {formatPrice(pricePerPersonCents * quantity, currency)}
      </p>

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

      <button
        type="button"
        onClick={checkout}
        disabled={submitting}
        className="w-full rounded-button bg-rusker-blue px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {submitting ? 'Redirecting to payment…' : 'Proceed to payment'}
      </button>
      <p className="mt-3 text-center text-xs text-gray-500">
        Secure payment via Stripe · prices include VAT
      </p>
    </div>
  )
}
```

- [ ] **Step 3: Detail page**

`apps/platform/app/expeditions/[slug]/page.tsx`:

```tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getExpeditionBySlug } from '@/lib/expeditions'
import BookingPanel from '@/components/BookingPanel'

export const dynamic = 'force-dynamic'

export default async function ExpeditionPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const expedition = await getExpeditionBySlug(slug)
  if (!expedition || !expedition.is_active) notFound()

  return (
    <div>
      <Link href="/expeditions" className="text-sm text-rusker-blue hover:underline">
        ← All expeditions
      </Link>
      <div className="mt-4 grid gap-10 lg:grid-cols-[1fr_380px]">
        <div>
          {expedition.image_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={expedition.image_url}
              alt={expedition.title}
              className="mb-6 h-72 w-full rounded-card object-cover"
            />
          )}
          <h1 className="mb-4 text-4xl font-bold">{expedition.title}</h1>
          {expedition.description && (
            <p className="whitespace-pre-line leading-relaxed text-gray-700">
              {expedition.description}
            </p>
          )}
        </div>
        <div>
          <BookingPanel
            slug={expedition.slug}
            pricePerPersonCents={expedition.price_per_person_cents}
            currency={expedition.currency}
            min={expedition.min_participants}
            max={expedition.max_participants}
          />
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Build and eyeball locally**

```bash
npm run build
```

Expected: build succeeds. If the Supabase migration was applied (Task 5), also verify by hand: `npm run dev --workspace @rusker/platform`, open http://localhost:3001/expeditions — the 2 seeded expeditions render; detail page quantity picker clamps at min/max.

- [ ] **Step 5: Commit**

```bash
git add apps/platform/app/expeditions apps/platform/components
git commit -m "feat(platform): expeditions catalog, detail page, and booking panel"
```

---

### Task 10: Success and cancelled pages

**Files:**
- Create: `apps/platform/app/checkout/success/page.tsx`, `apps/platform/app/checkout/cancelled/page.tsx`

- [ ] **Step 1: Success page (verifies the session server-side)**

`apps/platform/app/checkout/success/page.tsx`:

```tsx
import Link from 'next/link'
import { stripe } from '@/lib/stripe'

export const metadata = { title: 'Booking confirmed — Rusker' }

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>
}) {
  const { session_id: sessionId } = await searchParams
  if (!sessionId) {
    return <Invalid />
  }

  let session
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId)
  } catch {
    return <Invalid />
  }

  if (session.payment_status !== 'paid') {
    return (
      <div className="mx-auto max-w-xl text-center">
        <h1 className="mb-4 text-3xl font-bold">Payment processing…</h1>
        <p className="text-gray-600">
          Your payment hasn&apos;t been confirmed yet. You&apos;ll receive a confirmation email as
          soon as it goes through — no need to pay again.
        </p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-xl text-center">
      <h1 className="mb-4 text-3xl font-bold text-rusker-blue">Your expedition is booked! 🎉</h1>
      <p className="mb-2 text-gray-700">
        Thank you{session.customer_details?.name ? `, ${session.customer_details.name}` : ''}. A
        confirmation has been sent to{' '}
        <strong>{session.customer_details?.email ?? 'your email address'}</strong>.
      </p>
      <p className="mb-8 text-gray-600">
        The Rusker team will contact you shortly to start organizing your learning expedition.
      </p>
      <Link
        href="/expeditions"
        className="inline-block rounded-button bg-rusker-blue px-6 py-3 font-semibold text-white hover:opacity-90"
      >
        Back to expeditions
      </Link>
    </div>
  )
}

function Invalid() {
  return (
    <div className="mx-auto max-w-xl text-center">
      <h1 className="mb-4 text-3xl font-bold">We couldn&apos;t find that payment</h1>
      <p className="text-gray-600">
        If you completed a payment, you&apos;ll still receive a confirmation email.{' '}
        <Link href="/expeditions" className="text-rusker-blue underline">
          Back to expeditions
        </Link>
      </p>
    </div>
  )
}
```

- [ ] **Step 2: Cancelled page**

`apps/platform/app/checkout/cancelled/page.tsx`:

```tsx
import Link from 'next/link'

export const metadata = { title: 'Checkout cancelled — Rusker' }

export default function CancelledPage() {
  return (
    <div className="mx-auto max-w-xl text-center">
      <h1 className="mb-4 text-3xl font-bold">Checkout cancelled</h1>
      <p className="mb-8 text-gray-600">Nothing was charged. Your expedition is still waiting.</p>
      <Link
        href="/expeditions"
        className="inline-block rounded-button bg-rusker-blue px-6 py-3 font-semibold text-white hover:opacity-90"
      >
        Back to expeditions
      </Link>
    </div>
  )
}
```

Note: the checkout route's `cancel_url` points back to the expedition detail page (better UX — the user keeps their selection); this page exists as a friendly fallback destination we can also use in emails or future flows.

- [ ] **Step 3: Build + commit**

```bash
npm run build
git add apps/platform/app/checkout
git commit -m "feat(platform): checkout success and cancelled pages"
```

---

### Task 11: Orders + emails (TDD on order idempotency)

**Files:**
- Create: `apps/platform/lib/orders.ts`, `apps/platform/lib/emails.ts`
- Test: `apps/platform/lib/__tests__/orders.test.ts`

- [ ] **Step 1: Write the failing test for insertOrder**

`apps/platform/lib/__tests__/orders.test.ts` — tests the idempotent-upsert contract by faking the Supabase client chain:

```ts
import { describe, it, expect, vi } from 'vitest'
import { insertOrderWith, type NewOrder } from '@/lib/orders'

const ORDER: NewOrder = {
  expedition_id: '5c0f1f74-0000-0000-0000-000000000000',
  quantity: 12,
  buyer_email: 'buyer@example.com',
  buyer_name: 'Jane Doe',
  amount_total_cents: 1068000,
  currency: 'eur',
  stripe_checkout_session_id: 'cs_test_123',
  stripe_payment_intent_id: 'pi_test_123',
}

function fakeSupabase(result: { data: unknown; error: { message: string } | null }) {
  const select = vi.fn().mockResolvedValue(result)
  const upsert = vi.fn().mockReturnValue({ select })
  const from = vi.fn().mockReturnValue({ upsert })
  return { client: { from } as never, from, upsert, select }
}

describe('insertOrderWith', () => {
  it('returns true when the order row is newly inserted', async () => {
    const { client, from, upsert } = fakeSupabase({ data: [{ id: 'order-1' }], error: null })
    await expect(insertOrderWith(client, ORDER)).resolves.toBe(true)
    expect(from).toHaveBeenCalledWith('orders')
    expect(upsert).toHaveBeenCalledWith(ORDER, {
      onConflict: 'stripe_checkout_session_id',
      ignoreDuplicates: true,
    })
  })

  it('returns false when the session id already exists (duplicate webhook delivery)', async () => {
    const { client } = fakeSupabase({ data: [], error: null })
    await expect(insertOrderWith(client, ORDER)).resolves.toBe(false)
  })

  it('throws when the insert fails so the webhook can return 500', async () => {
    const { client } = fakeSupabase({ data: null, error: { message: 'connection refused' } })
    await expect(insertOrderWith(client, ORDER)).rejects.toThrow('connection refused')
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
cd apps/platform && npx vitest run lib/__tests__/orders.test.ts
```

Expected: FAIL — cannot resolve `@/lib/orders`.

- [ ] **Step 3: Implement orders.ts**

`apps/platform/lib/orders.ts`:

```ts
import type { SupabaseClient } from '@supabase/supabase-js'
import { getSupabase } from '@/lib/supabase'

export type NewOrder = {
  expedition_id: string
  quantity: number
  buyer_email: string
  buyer_name: string | null
  amount_total_cents: number
  currency: string
  stripe_checkout_session_id: string
  stripe_payment_intent_id: string | null
}

/**
 * Insert an order idempotently, keyed on the unique Stripe checkout session id.
 * Returns true if the row was newly inserted, false if it already existed
 * (duplicate webhook delivery). Throws on any other failure.
 */
export async function insertOrderWith(client: SupabaseClient, order: NewOrder): Promise<boolean> {
  const { data, error } = await client
    .from('orders')
    .upsert(order, { onConflict: 'stripe_checkout_session_id', ignoreDuplicates: true })
    .select('id')
  if (error) throw new Error(`order insert failed: ${error.message}`)
  return (data ?? []).length > 0
}

export async function insertOrder(order: NewOrder): Promise<boolean> {
  return insertOrderWith(getSupabase(), order)
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
cd apps/platform && npx vitest run lib/__tests__/orders.test.ts
```

Expected: 3 tests PASS.

- [ ] **Step 5: Implement emails.ts (thin Resend wrapper — no automated tests; verified live in Task 14)**

`apps/platform/lib/emails.ts`:

```ts
import { Resend } from 'resend'
import { formatPrice } from '@/lib/format'
import type { NewOrder } from '@/lib/orders'

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

export async function sendBuyerConfirmation(order: NewOrder, expeditionTitle: string) {
  const total = formatPrice(order.amount_total_cents, order.currency)
  const { error } = await getResend().emails.send({
    from: FROM,
    to: order.buyer_email,
    subject: `Your Rusker expedition is booked: ${expeditionTitle}`,
    html: `
      <div style="font-family: Poppins, system-ui, sans-serif; color: #2f3433; max-width: 560px; margin: 0 auto;">
        <h1 style="color: #287497;">Your expedition is booked!</h1>
        <p>Hi${order.buyer_name ? ` ${order.buyer_name}` : ''},</p>
        <p>Thank you for booking <strong>${expeditionTitle}</strong> for
          <strong>${order.quantity} participants</strong> (total: <strong>${total}</strong>, VAT included).</p>
        <p><strong>What happens next?</strong><br/>
          The Rusker team will contact you within 2 business days to plan the program,
          dates, and logistics of your learning expedition.</p>
        <p>Questions in the meantime? Just reply to this email.</p>
        <p style="margin-top: 32px;">— The Rusker team<br/>
          <a href="https://rusker-travel.com" style="color: #287497;">rusker-travel.com</a></p>
      </div>
    `,
  })
  if (error) throw new Error(`buyer confirmation email failed: ${error.message}`)
}

export async function sendTeamNotification(order: NewOrder, expeditionTitle: string) {
  const to = process.env.TEAM_NOTIFICATION_EMAIL
  if (!to) throw new Error('TEAM_NOTIFICATION_EMAIL is not set')
  const total = formatPrice(order.amount_total_cents, order.currency)
  const { error } = await getResend().emails.send({
    from: FROM,
    to,
    subject: `New expedition sale: ${expeditionTitle} × ${order.quantity} (${total})`,
    html: `
      <div style="font-family: system-ui, sans-serif;">
        <h2>New expedition booking</h2>
        <ul>
          <li><strong>Expedition:</strong> ${expeditionTitle}</li>
          <li><strong>Participants:</strong> ${order.quantity}</li>
          <li><strong>Total paid:</strong> ${total} (VAT incl.)</li>
          <li><strong>Buyer:</strong> ${order.buyer_name ?? '—'} &lt;${order.buyer_email}&gt;</li>
          <li><strong>Stripe session:</strong> ${order.stripe_checkout_session_id}</li>
        </ul>
        <p>Reach out to the buyer to start organizing.</p>
      </div>
    `,
  })
  if (error) throw new Error(`team notification email failed: ${error.message}`)
}
```

- [ ] **Step 6: Typecheck + commit**

```bash
npx tsc --noEmit -p apps/platform
git add apps/platform/lib
git commit -m "feat(platform): idempotent order insert (TDD) and Resend email senders"
```

---

### Task 12: Stripe webhook — handler (TDD) + signature-verified route

**Files:**
- Create: `apps/platform/lib/webhook.ts`, `apps/platform/app/api/webhooks/stripe/route.ts`
- Test: `apps/platform/lib/__tests__/webhook.test.ts`, `apps/platform/app/api/webhooks/stripe/__tests__/route.test.ts`

- [ ] **Step 1: Write the failing handler tests**

`apps/platform/lib/__tests__/webhook.test.ts`:

```ts
import { describe, it, expect, vi } from 'vitest'
import type Stripe from 'stripe'
import { handleCheckoutCompleted, type WebhookDeps } from '@/lib/webhook'

const SESSION = {
  id: 'cs_test_123',
  payment_status: 'paid',
  amount_total: 1068000,
  currency: 'eur',
  payment_intent: 'pi_test_123',
  customer_details: { email: 'buyer@example.com', name: 'Jane Doe' },
  metadata: { expedition_id: 'exp-1', quantity: '12' },
} as unknown as Stripe.Checkout.Session

function makeDeps(overrides: Partial<WebhookDeps> = {}): WebhookDeps {
  return {
    insertOrder: vi.fn().mockResolvedValue(true),
    getExpeditionTitle: vi.fn().mockResolvedValue('Barcelona Tech Immersion'),
    sendBuyerConfirmation: vi.fn().mockResolvedValue(undefined),
    sendTeamNotification: vi.fn().mockResolvedValue(undefined),
    ...overrides,
  }
}

describe('handleCheckoutCompleted', () => {
  it('inserts the order and sends both emails', async () => {
    const deps = makeDeps()
    await handleCheckoutCompleted(SESSION, deps)
    expect(deps.insertOrder).toHaveBeenCalledWith({
      expedition_id: 'exp-1',
      quantity: 12,
      buyer_email: 'buyer@example.com',
      buyer_name: 'Jane Doe',
      amount_total_cents: 1068000,
      currency: 'eur',
      stripe_checkout_session_id: 'cs_test_123',
      stripe_payment_intent_id: 'pi_test_123',
    })
    expect(deps.sendBuyerConfirmation).toHaveBeenCalled()
    expect(deps.sendTeamNotification).toHaveBeenCalled()
  })

  it('skips emails on duplicate delivery (order already recorded)', async () => {
    const deps = makeDeps({ insertOrder: vi.fn().mockResolvedValue(false) })
    await handleCheckoutCompleted(SESSION, deps)
    expect(deps.sendBuyerConfirmation).not.toHaveBeenCalled()
    expect(deps.sendTeamNotification).not.toHaveBeenCalled()
  })

  it('does nothing when the session is not paid', async () => {
    const deps = makeDeps()
    await handleCheckoutCompleted(
      { ...SESSION, payment_status: 'unpaid' } as Stripe.Checkout.Session,
      deps
    )
    expect(deps.insertOrder).not.toHaveBeenCalled()
  })

  it('throws when metadata is missing so the webhook returns 500', async () => {
    const deps = makeDeps()
    await expect(
      handleCheckoutCompleted({ ...SESSION, metadata: {} } as Stripe.Checkout.Session, deps)
    ).rejects.toThrow(/missing.*metadata/i)
  })

  it('propagates insert failures (webhook must 500 so Stripe retries)', async () => {
    const deps = makeDeps({ insertOrder: vi.fn().mockRejectedValue(new Error('db down')) })
    await expect(handleCheckoutCompleted(SESSION, deps)).rejects.toThrow('db down')
  })

  it('does NOT throw when emails fail after a successful insert', async () => {
    const deps = makeDeps({
      sendBuyerConfirmation: vi.fn().mockRejectedValue(new Error('resend down')),
      sendTeamNotification: vi.fn().mockRejectedValue(new Error('resend down')),
    })
    await expect(handleCheckoutCompleted(SESSION, deps)).resolves.toBeUndefined()
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
cd apps/platform && npx vitest run lib/__tests__/webhook.test.ts
```

Expected: FAIL — cannot resolve `@/lib/webhook`.

- [ ] **Step 3: Implement the handler**

`apps/platform/lib/webhook.ts`:

```ts
import type Stripe from 'stripe'
import { insertOrder as defaultInsertOrder, type NewOrder } from '@/lib/orders'
import { getExpeditionById } from '@/lib/expeditions'
import {
  sendBuyerConfirmation as defaultSendBuyerConfirmation,
  sendTeamNotification as defaultSendTeamNotification,
} from '@/lib/emails'

export type WebhookDeps = {
  insertOrder: (order: NewOrder) => Promise<boolean>
  getExpeditionTitle: (id: string) => Promise<string>
  sendBuyerConfirmation: (order: NewOrder, expeditionTitle: string) => Promise<void>
  sendTeamNotification: (order: NewOrder, expeditionTitle: string) => Promise<void>
}

const defaultDeps: WebhookDeps = {
  insertOrder: defaultInsertOrder,
  getExpeditionTitle: async (id) => (await getExpeditionById(id))?.title ?? 'Learning Expedition',
  sendBuyerConfirmation: defaultSendBuyerConfirmation,
  sendTeamNotification: defaultSendTeamNotification,
}

export async function handleCheckoutCompleted(
  session: Stripe.Checkout.Session,
  deps: WebhookDeps = defaultDeps
): Promise<void> {
  if (session.payment_status !== 'paid') return

  const expeditionId = session.metadata?.expedition_id
  const quantity = Number(session.metadata?.quantity)
  if (!expeditionId || !Number.isInteger(quantity) || quantity < 1) {
    throw new Error(`checkout.session.completed is missing expedition metadata (session ${session.id})`)
  }

  const order: NewOrder = {
    expedition_id: expeditionId,
    quantity,
    buyer_email: session.customer_details?.email ?? '',
    buyer_name: session.customer_details?.name ?? null,
    amount_total_cents: session.amount_total ?? 0,
    currency: session.currency ?? 'eur',
    stripe_checkout_session_id: session.id,
    stripe_payment_intent_id:
      typeof session.payment_intent === 'string' ? session.payment_intent : null,
  }

  const inserted = await deps.insertOrder(order)
  if (!inserted) return // duplicate webhook delivery — emails were already sent

  // Best-effort from here: the order is stored; email failures are logged, never thrown.
  let title = 'Learning Expedition'
  try {
    title = await deps.getExpeditionTitle(expeditionId)
  } catch (err) {
    console.error('failed to fetch expedition title for emails', err)
  }
  const results = await Promise.allSettled([
    deps.sendBuyerConfirmation(order, title),
    deps.sendTeamNotification(order, title),
  ])
  for (const result of results) {
    if (result.status === 'rejected') {
      console.error('post-payment email failed', result.reason)
    }
  }
}
```

- [ ] **Step 4: Run handler tests to verify they pass**

```bash
cd apps/platform && npx vitest run lib/__tests__/webhook.test.ts
```

Expected: 6 tests PASS.

- [ ] **Step 5: Write the failing route test (real signature verification)**

`apps/platform/app/api/webhooks/stripe/__tests__/route.test.ts`:

```ts
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Stripe from 'stripe'

vi.mock('@/lib/webhook', () => ({
  handleCheckoutCompleted: vi.fn().mockResolvedValue(undefined),
}))

const SECRET = 'whsec_test_secret'
process.env.STRIPE_WEBHOOK_SECRET = SECRET
process.env.STRIPE_SECRET_KEY = 'sk_test_dummy'

import { POST } from '../route'
import { handleCheckoutCompleted } from '@/lib/webhook'

const stripe = new Stripe('sk_test_dummy')

function signedRequest(payload: string, secret = SECRET): Request {
  const signature = stripe.webhooks.generateTestHeaderString({ payload, secret })
  return new Request('http://localhost/api/webhooks/stripe', {
    method: 'POST',
    headers: { 'stripe-signature': signature },
    body: payload,
  })
}

const EVENT = JSON.stringify({
  id: 'evt_test_1',
  object: 'event',
  type: 'checkout.session.completed',
  data: { object: { id: 'cs_test_123', object: 'checkout.session', payment_status: 'paid' } },
})

describe('POST /api/webhooks/stripe', () => {
  beforeEach(() => vi.clearAllMocks())

  it('rejects requests without a signature', async () => {
    const res = await POST(new Request('http://localhost', { method: 'POST', body: EVENT }))
    expect(res.status).toBe(400)
  })

  it('rejects requests with an invalid signature', async () => {
    const res = await POST(signedRequest(EVENT, 'whsec_wrong_secret'))
    expect(res.status).toBe(400)
    expect(handleCheckoutCompleted).not.toHaveBeenCalled()
  })

  it('processes a correctly signed checkout.session.completed event', async () => {
    const res = await POST(signedRequest(EVENT))
    expect(res.status).toBe(200)
    expect(handleCheckoutCompleted).toHaveBeenCalledOnce()
  })

  it('returns 500 when order recording fails so Stripe retries', async () => {
    vi.mocked(handleCheckoutCompleted).mockRejectedValueOnce(new Error('db down'))
    const res = await POST(signedRequest(EVENT))
    expect(res.status).toBe(500)
  })

  it('acknowledges unhandled event types without processing', async () => {
    const other = JSON.stringify({
      id: 'evt_test_2',
      object: 'event',
      type: 'payment_intent.created',
      data: { object: { id: 'pi_1', object: 'payment_intent' } },
    })
    const res = await POST(signedRequest(other))
    expect(res.status).toBe(200)
    expect(handleCheckoutCompleted).not.toHaveBeenCalled()
  })
})
```

- [ ] **Step 6: Run route tests to verify they fail**

```bash
cd apps/platform && npx vitest run app/api/webhooks/stripe/__tests__/route.test.ts
```

Expected: FAIL — cannot resolve `../route`.

- [ ] **Step 7: Implement the route**

`apps/platform/app/api/webhooks/stripe/route.ts`:

```ts
import { NextResponse } from 'next/server'
import type Stripe from 'stripe'
import { stripe } from '@/lib/stripe'
import { handleCheckoutCompleted } from '@/lib/webhook'

export async function POST(request: Request) {
  const payload = await request.text()
  const signature = request.headers.get('stripe-signature')
  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET ?? ''
    )
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    try {
      await handleCheckoutCompleted(session)
    } catch (err) {
      console.error('webhook order recording failed', err)
      return NextResponse.json({ error: 'Order recording failed' }, { status: 500 })
    }
  }

  return NextResponse.json({ received: true })
}
```

- [ ] **Step 8: Run the full platform test suite**

```bash
cd apps/platform && npx vitest run
```

Expected: all test files PASS (checkout, format, orders, webhook handler, webhook route).

- [ ] **Step 9: Build + commit**

```bash
npm run build
git add apps/platform/lib/webhook.ts apps/platform/app/api/webhooks
git commit -m "feat(platform): Stripe webhook with signature verification and idempotent order recording (TDD)"
```

---

### Task 13: Landing CTA → platform + deployment documentation

**Files:**
- Modify: `apps/web/lib/constants.ts`, `apps/web/components/ui/Navigation.tsx`, `apps/web/messages/en.json`, `apps/web/messages/es.json`, `apps/web/messages/fr.json`
- Create: `docs/PLATFORM-DEPLOYMENT.md`
- Modify: create root `README.md`

- [ ] **Step 1: Add the platform URL constant**

Append to `apps/web/lib/constants.ts`:

```ts
// Purchase platform (apps/platform — app.rusker-travel.com)
export const PLATFORM_URL =
  process.env.NEXT_PUBLIC_PLATFORM_URL || 'https://app.rusker-travel.com'
```

- [ ] **Step 2: Add i18n labels**

The navigation labels use the `common` namespace (`t('common.contactUs')`). Add a `bookExpedition` key inside the existing `"common"` object of each messages file:

`apps/web/messages/en.json`: `"bookExpedition": "Book an expedition"`
`apps/web/messages/es.json`: `"bookExpedition": "Reservar una expedición"`
`apps/web/messages/fr.json`: `"bookExpedition": "Réserver une expédition"`

- [ ] **Step 3: Add the CTA to the navigation**

`apps/web/components/ui/Navigation.tsx` has three `<Link href="/#form-section">` CTA instances (desktop line ~164, tablet ~319, mobile ~423 — locate with `grep -n '"/#form-section"' apps/web/components/ui/Navigation.tsx`). Insert a "Book an expedition" link **immediately before** each of them.

Import at the top of the file:

```tsx
import { PLATFORM_URL } from '@/lib/constants'
```

Before the desktop and tablet instances (whose sibling className is `ml-4 px-5 py-2.5 bg-neutral-dark ...`), insert:

```tsx
<a
  href={`${PLATFORM_URL}/expeditions`}
  className="ml-4 px-5 py-2.5 bg-rusker-blue text-white text-sm font-semibold rounded-full hover:bg-rusker-blue/90 transition-all duration-300 shadow-md hover:shadow-lg"
>
  {t('common.bookExpedition')}
</a>
```

Before the mobile instance (whose sibling className is `mt-4 px-4 py-3 bg-neutral-dark ...`), insert:

```tsx
<a
  href={`${PLATFORM_URL}/expeditions`}
  className="mt-4 px-4 py-3 bg-rusker-blue text-white text-center font-semibold rounded-xl"
>
  {t('common.bookExpedition')}
</a>
```

(Blue = Rusker brand primary, visually distinct from the dark "Contact us" CTA. Plain `<a>` rather than `<Link>` because the platform is a different app/domain.)

- [ ] **Step 4: Verify visually**

```bash
npm run dev --workspace @rusker/web
```

Open http://localhost:3000 — the nav shows "Book an expedition" in desktop and mobile menus; switching language (language switcher) updates the label; the link points to https://app.rusker-travel.com/expeditions (or `NEXT_PUBLIC_PLATFORM_URL` when set).

- [ ] **Step 5: Write the deployment guide**

Create `docs/PLATFORM-DEPLOYMENT.md`:

```markdown
# Deployment — two Vercel projects from one repo

## Vercel projects

| Project | Root Directory | Domain | Env vars |
|---|---|---|---|
| rusker-web | `apps/web` | rusker-travel.com, www | `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, (`NEXT_PUBLIC_PLATFORM_URL` optional override) |
| rusker-platform | `apps/platform` | app.rusker-travel.com | `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `RESEND_API_KEY`, `TEAM_NOTIFICATION_EMAIL`, `NEXT_PUBLIC_SITE_URL=https://app.rusker-travel.com` |

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

Apply `supabase/migrations/0001_expeditions_and_orders.sql` via the SQL Editor (see file
header). Manage the catalog by inserting/updating rows in `expeditions` (Table Editor).

## Local development

- `npm run dev` (turbo runs both apps: web on :3000, platform on :3001)
- Webhooks locally: `stripe listen --forward-to localhost:3001/api/webhooks/stripe`
  → copy the printed `whsec_...` into `apps/platform/.env.local`.
- Test card: `4242 4242 4242 4242`, any future expiry, any CVC.
```

- [ ] **Step 6: Create the root README**

Create `README.md` at repo root:

```markdown
# Rusker Monorepo

Turborepo monorepo for the Rusker websites.

| App | Path | Domain | Purpose |
|---|---|---|---|
| Web | `apps/web` | rusker-travel.com | Marketing site (landing, blog, inquiry form) |
| Platform | `apps/platform` | app.rusker-travel.com | Learning expeditions purchase flow (Stripe hosted checkout) |

Shared code lives in `packages/` (`@rusker/ui` brand preset, `@rusker/config` tsconfig).
Database schema lives in `supabase/migrations/`.

## Commands

```bash
npm install       # install all workspaces
npm run dev       # run all apps (web :3000, platform :3001)
npm run build     # build all apps
npm run test      # run all test suites
```

Deployment: see [docs/PLATFORM-DEPLOYMENT.md](docs/PLATFORM-DEPLOYMENT.md).
Design spec: [docs/superpowers/specs/2026-07-08-expeditions-checkout-design.md](docs/superpowers/specs/2026-07-08-expeditions-checkout-design.md).
```

- [ ] **Step 7: Build + commit**

```bash
npm run build
git add -A
git commit -m "feat(web): 'Book an expedition' nav CTA to platform; add deployment docs and root README"
```

---

### Task 14: End-to-end verification (Stripe test mode)

No new files — full-system verification. Requires: Supabase migration applied (Task 5), Stripe test keys + `stripe` CLI, Resend key (or accept logged email failures).

- [ ] **Step 1: Full build + test suite from clean state**

```bash
rm -rf apps/web/.next apps/platform/.next
npm install
npm run build
npm run test
```

Expected: both apps build; all platform tests pass.

- [ ] **Step 2: Start the platform + webhook forwarding**

```bash
npm run dev --workspace @rusker/platform
# in a second terminal:
stripe listen --forward-to localhost:3001/api/webhooks/stripe
```

Copy the printed `whsec_...` into `apps/platform/.env.local` as `STRIPE_WEBHOOK_SECRET`, restart the dev server.

- [ ] **Step 3: Manual purchase flow checklist**

1. http://localhost:3001/expeditions → both seeded expeditions render with prices.
2. Open a detail page → quantity picker clamps at min (10) and max (40); total updates.
3. "Proceed to payment" → redirected to Stripe hosted checkout showing the right name, unit price, and quantity.
4. Pay with `4242 4242 4242 4242` → redirected to `/checkout/success` showing the buyer email.
5. `stripe listen` terminal shows `checkout.session.completed` → 200.
6. Supabase Table Editor → `orders` has one row with the right quantity/amount and the session id.
7. `stripe trigger` is NOT needed for retry testing — instead, in the Stripe dashboard (test mode) → Webhooks → resend the event → dev server logs show it processed, `orders` still has ONE row (idempotency), no duplicate emails.
8. Back on a detail page, click "Proceed to payment" then use the browser Back button from Stripe → selection intact (cancel_url returns to the detail page).
9. If Resend is configured: buyer confirmation + team notification emails arrived; Stripe receipt arrived (if enabled in dashboard).
10. http://localhost:3000 (web) → nav CTA "Book an expedition" present in all 3 languages, links to the platform.

- [ ] **Step 4: Fix anything found, commit fixes**

Any failure: fix, re-run the relevant step, commit with a descriptive message.

- [ ] **Step 5: Final commit / handoff**

```bash
git status   # clean
git log --oneline main..HEAD
```

Present the branch for user review. Merging `feat/expeditions-platform`, updating the Vercel projects (root directories + env vars), DNS for `app.`, and switching Stripe to live mode are user-facing launch steps documented in `docs/PLATFORM-DEPLOYMENT.md`.
