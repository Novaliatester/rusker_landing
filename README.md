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
