# Gyanix Academy

A premium multi-page coaching institute website for Gyanix Academy, Kaithal — helping students prepare for IIT-JEE, NEET, NDA, and Defence exams.

## Run & Operate

- `pnpm --filter @workspace/gyanix-academy run dev` — run the frontend (uses `PORT` + `BASE_PATH` env vars, set automatically by Replit workflows)
- `pnpm --filter @workspace/api-server run dev` — run the API server (requires `DATABASE_URL`)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes to Postgres (dev only, requires `DATABASE_URL`)

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite + Tailwind CSS + Framer Motion (`artifacts/gyanix-academy`)
- API: Express 5 (`artifacts/api-server`)
- DB: PostgreSQL + Drizzle ORM (`lib/db`)
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec in `lib/api-spec`)
- Build: esbuild

## Where things live

- `artifacts/gyanix-academy/src/pages/` — page components (Home, About, Courses, Scholarship, Results, Gallery, Faculty, Contact)
- `artifacts/gyanix-academy/src/components/` — shared UI components (Navbar, Footer, etc.)
- `artifacts/api-server/src/routes/` — API route handlers
- `lib/db/` — Drizzle ORM schema (source of truth for DB structure)
- `lib/api-spec/` — OpenAPI spec (source of truth for API contract)
- `attached_assets/generated_images/` — hero and section images

## Architecture decisions

- The frontend is a React SPA with Wouter for client-side routing; all navigation stays within the `/` base path.
- Vite config reads `PORT` and `BASE_PATH` from env — both are injected by Replit's artifact workflow system.
- The API server is optional for the static marketing site; the frontend works standalone without `DATABASE_URL`.

## Product

Multi-page coaching institute website with pages for: home, about, courses (IIT-JEE / NEET / NDA / Sainik School), G-SET scholarship program, student results, faculty profiles, gallery, and contact/enquiry.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- `post-merge.sh` only runs `db push` when `DATABASE_URL` is set — the frontend works without a database.
- `*.zip` files are gitignored — the original import archive (`zipFile.zip`) is excluded from the repo.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
