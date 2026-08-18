# Gyanix Academy — Technical Audit & Project README

> **Audit Date:** August 2026  
> **Project Type:** Coaching Institute Marketing & Enquiry Website  
> **Architecture:** pnpm Monorepo (Multi-Artifact)  
> **Hosted On:** Replit

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Folder & File Structure](#3-folder--file-structure)
4. [AI Tools & Integrations](#4-ai-tools--integrations)
5. [Environment Variables / Secrets](#5-environment-variables--secrets)
6. [Features List](#6-features-list)
7. [Dependencies](#7-dependencies)
8. [Setup & Installation Steps](#8-setup--installation-steps)
9. [API Routes / Endpoints](#9-api-routes--endpoints)
10. [Database Schema](#10-database-schema)
11. [Known Limitations / TODO](#11-known-limitations--todo)
12. [Deployment Info](#12-deployment-info)

---

## 1. Project Overview

**Gyanix Academy** is a premium residential coaching institute located in Kaithal, Haryana, India (founded 2025). This project is the institute's official website — a full-stack web application built to:

- Present the academy's courses, faculty, results, and facilities to prospective students and parents
- Allow visitors to submit admission enquiries via an online form
- Provide an AI-powered chatbot that answers questions about the academy in Hindi, English, or Hinglish
- Showcase toppers, gallery, and the G-SET Scholarship programme
- Drive admissions through strong calls-to-action (WhatsApp, Enquire Now, demo class booking)

**Tagline:** *"Lighting the way to excellence"*  
**Target Audience:** Students (Class 5–12 + Droppers) and their parents in Haryana and nearby regions  
**Business Goal:** Lead generation and online presence for the coaching institute

---

## 2. Tech Stack

### Frontend
| Layer | Technology | Version |
|---|---|---|
| UI Framework | React | 19.1.0 |
| Language | TypeScript | ~5.x |
| Build Tool | Vite | ^7.3.2 |
| Styling | Tailwind CSS | ^4.1.14 |
| Component Library | shadcn/ui (Radix UI primitives) | Various ^1.x–^2.x |
| Animation | Framer Motion | ^12.23.24 |
| Routing | Wouter | ^3.3.5 |
| Data Fetching | TanStack React Query | ^5.90.21 |
| Icons | Lucide React | ^0.545.0 |
| Form Handling | React Hook Form + Zod | ^7.55.0 / ^3.25.76 |

### Backend
| Layer | Technology | Version |
|---|---|---|
| Runtime | Node.js (ESM) | System (Replit NixOS) |
| Framework | Express | ^5.2.1 |
| Language | TypeScript | ~5.x |
| Bundler | esbuild | 0.27.3 |
| HTTP Logger | pino + pino-http | ^9.14.0 / ^10.5.0 |
| Email | Nodemailer (Gmail SMTP) | ^9.0.3 |
| Validation | Zod (via api-zod lib) | ^3.25.76 |

### AI
| Layer | Technology | Details |
|---|---|---|
| Chatbot LLM | Groq SDK | `llama-3.3-70b-versatile` via Groq API |

### Database (Configured, Not Actively Used)
| Layer | Technology | Version |
|---|---|---|
| ORM | Drizzle ORM | ^0.45.2 |
| Database | PostgreSQL | via `pg` driver |

### Infrastructure
| Layer | Technology |
|---|---|
| Hosting / Platform | Replit |
| Package Manager | pnpm (workspace monorepo) |
| API Contract | OpenAPI 3.1.0 + Orval codegen |

---

## 3. Folder & File Structure

```
workspace/                              ← pnpm monorepo root
├── artifacts/
│   ├── gyanix-academy/                 ← React frontend (main website)
│   │   ├── .replit-artifact/
│   │   │   └── artifact.toml           ← Replit artifact config (kind: web, port: 24128)
│   │   ├── public/
│   │   │   ├── favicon.png / .svg
│   │   │   ├── og-image.png            ← Open Graph image for social sharing
│   │   │   └── robots.txt
│   │   ├── src/
│   │   │   ├── App.tsx                 ← Root component, router setup
│   │   │   ├── index.css               ← Global styles, Tailwind + CSS tokens
│   │   │   ├── components/
│   │   │   │   ├── chatbot.tsx         ← AI chatbot widget (floating bubble)
│   │   │   │   ├── footer.tsx          ← Site-wide footer
│   │   │   │   ├── layout.tsx          ← Page layout wrapper (navbar + footer)
│   │   │   │   ├── navbar.tsx          ← Top navigation bar
│   │   │   │   └── ui/                 ← shadcn/ui component library (40+ components)
│   │   │   └── pages/
│   │   │       ├── home.tsx            ← Homepage (hero, stats, features)
│   │   │       ├── about.tsx           ← About the academy
│   │   │       ├── courses.tsx         ← All courses with image cards
│   │   │       ├── contact.tsx         ← Enquiry form + map + contact info
│   │   │       ├── faculty.tsx         ← Faculty profiles
│   │   │       ├── gallery.tsx         ← Photo gallery
│   │   │       ├── results.tsx         ← Toppers / student results
│   │   │       ├── scholarship.tsx     ← G-SET Scholarship programme details
│   │   │       └── not-found.tsx       ← 404 page
│   │   ├── index.html                  ← Vite HTML entry point
│   │   ├── package.json
│   │   └── vite.config.ts              ← Vite config (host 0.0.0.0, BASE_PATH)
│   │
│   ├── api-server/                     ← Express REST API backend
│   │   ├── .replit-artifact/
│   │   │   └── artifact.toml           ← Replit artifact config (kind: api, port: 8080)
│   │   ├── src/
│   │   │   ├── index.ts                ← Server entry (reads PORT, starts app)
│   │   │   ├── app.ts                  ← Express app setup (CORS, pino, routes)
│   │   │   ├── lib/
│   │   │   │   └── logger.ts           ← Pino logger instance
│   │   │   ├── middlewares/            ← (placeholder, currently empty)
│   │   │   └── routes/
│   │   │       ├── index.ts            ← Mounts all routers under /api
│   │   │       ├── health.ts           ← GET /api/healthz
│   │   │       ├── enquiry.ts          ← POST /api/enquiry (form handler + email)
│   │   │       └── chat.ts             ← POST /api/chat (Groq AI chatbot)
│   │   ├── build.mjs                   ← esbuild bundler script
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── mockup-sandbox/                 ← Replit Design Canvas preview server
│       └── .replit-artifact/
│           └── artifact.toml           ← kind: design, port: 8081, path: /__mockup
│
├── lib/
│   ├── api-spec/
│   │   ├── openapi.yaml                ← OpenAPI 3.1.0 contract (healthz defined)
│   │   └── orval.config.ts             ← Orval codegen config (generates api-client + api-zod)
│   ├── api-client-react/               ← Auto-generated React Query API client
│   │   └── src/
│   │       ├── api.ts                  ← Generated fetch wrappers
│   │       ├── api.schemas.ts          ← Generated TypeScript types
│   │       ├── custom-fetch.ts         ← Base fetch with BASE_URL handling
│   │       └── index.ts
│   ├── api-zod/                        ← Auto-generated Zod validation schemas
│   │   └── src/
│   │       └── index.ts
│   └── db/                             ← Drizzle ORM database layer
│       ├── drizzle.config.ts           ← Drizzle config (reads DATABASE_URL)
│       └── src/
│           ├── index.ts                ← Creates pg Pool + Drizzle instance
│           └── schema/
│               └── index.ts           ← ⚠️ Empty — no tables defined yet
│
├── scripts/
│   └── post-merge.sh                   ← Runs after task-agent merges (setup script)
│
├── pnpm-workspace.yaml                 ← Workspace packages + catalog versions
├── tsconfig.base.json                  ← Shared TypeScript base config
├── package.json                        ← Root scripts (build, typecheck)
└── replit.nix                          ← Nix environment for Replit
```

---

## 4. AI Tools & Integrations

### Groq — AI Chatbot

| Property | Detail |
|---|---|
| **Provider** | [Groq](https://groq.com) |
| **SDK** | `groq-sdk` ^1.5.0 |
| **Model Used** | `llama-3.3-70b-versatile` |
| **Feature** | Academy Assistant chatbot (floating widget on all pages) |
| **Route** | `POST /api/chat` |
| **Context Window** | Last 8 conversation exchanges retained |
| **Max Tokens** | 400 per response |
| **Temperature** | 0.6 (balanced — factual but conversational) |
| **System Prompt** | Hard-coded, 151-line prompt with full academy knowledge: courses, faculty, fees process, G-SET, toppers, contact info, facilities |
| **Language Support** | Automatically responds in Hindi, English, or Hinglish based on user's message |
| **Fallback** | Returns HTTP 500 with graceful error if `GROQ_API_KEY` is missing |
| **Required Secret** | `GROQ_API_KEY` (must be set in Replit Secrets) |

> **Note:** No other AI APIs (OpenAI, Claude, Anthropic, etc.) are used in this project.

---

## 5. Environment Variables / Secrets

All secrets are managed via **Replit Secrets** (never hardcoded or in `.env` committed to git).

| Variable | Required | Purpose |
|---|---|---|
| `PORT` | ✅ Auto-set | Server listen port — injected by Replit per artifact. Do not set manually. |
| `GROQ_API_KEY` | ✅ Required | Groq API key — enables the AI chatbot. Without this, `/api/chat` returns 500. |
| `SESSION_SECRET` | ✅ Configured | Session signing secret — set in Replit Secrets. Currently referenced but not actively used by any auth layer. |
| `DATABASE_URL` | ⚠️ Conditional | PostgreSQL connection string for Drizzle ORM. The `lib/db` module **throws on import** if this is missing — but no route currently imports it, so startup is unaffected today. Required if DB-backed features are added. |
| `SMTP_USER` | 🔧 Optional | Gmail address used to send enquiry email notifications. If absent, enquiries are only logged to console. |
| `SMTP_PASS` | 🔧 Optional | Gmail App Password (not your Gmail login password — must be generated at myaccount.google.com). Required alongside `SMTP_USER`. |
| `ENQUIRY_EMAIL` | 🔧 Optional | Recipient email for enquiry notifications. Defaults to `SMTP_USER` if not set. Useful if you want notifications sent to a different address than the sender. |

---

## 6. Features List

### Public Website Pages
- **Homepage** — Hero section with gradient background and glow orbs, animated counter stats ("Why Choose Us": students enrolled, success rate, years of excellence, courses offered), feature highlights, and CTAs
- **About Page** — Academy story, mission, vision, facilities
- **Courses Page** — 8 course cards with AI-generated cover images and icon badges: IIT-JEE, NEET, NDA & Defence, CUET, RMS & Sainik School, School Boards (5th–12th), Olympiads, Pre-Foundation (Class 6–8)
- **Faculty Page** — Faculty profiles with subject expertise and experience
- **Results Page** — Student toppers with scores and achievements
- **Gallery Page** — Photo gallery of academy events and classrooms
- **G-SET Scholarship Page** — Full details of the Gyanix Scholarship Entrance Test (up to 100% fee waiver)
- **Contact Page** — Enquiry form, call cards, Google Maps embed, live "Open until 7 PM" indicator

### Navigation & Layout
- Sticky top navbar with logo, all page links, WhatsApp CTA, and "Enquire Now" CTA button
- Top announcement bar (address, timings, Google/Justdial ratings)
- Site-wide footer with links and contact details
- SPA routing via Wouter (no full-page reloads)

### Enquiry Form
- Fields: Full Name, Email Address, Course Interested In (dropdown with 10 options), Message
- Client-side HTML5 validation (required fields, email format)
- Disabled inputs during submission (prevents double-sends)
- Animated success state (checkmark + thank-you message) for 8 seconds post-submit
- Animated error state with specific error message from API
- `POST /api/enquiry` backend handler with server-side validation
- Every valid enquiry logged to API server console (never silently lost)
- Optional email notification via Gmail SMTP when credentials are configured

### AI Chatbot
- Floating chat bubble (bottom-right) on all pages
- Powered by Groq `llama-3.3-70b-versatile`
- Full academy knowledge baked into system prompt
- Responds in Hindi, English, or Hinglish
- Conversation history retained (last 8 exchanges)
- Opens/closes with animation; shows typing indicator during response

### Design & UX
- Fully responsive design (mobile + desktop)
- Scroll animations via Framer Motion
- Glassmorphism badge on hero section
- Gradient CTAs with hover effects and scale transitions
- Course cards with image headers and overlaid icon badges
- Animated number counters in stats section

---

## 7. Dependencies

### Frontend (`artifacts/gyanix-academy`)

| Package | Version | Role |
|---|---|---|
| `react` + `react-dom` | 19.1.0 | Core UI framework |
| `vite` | ^7.3.2 | Dev server and production bundler |
| `tailwindcss` | ^4.1.14 | Utility-first CSS framework |
| `framer-motion` | ^12.23.24 | Page and element animations |
| `wouter` | ^3.3.5 | Lightweight client-side router |
| `@tanstack/react-query` | ^5.90.21 | Server state management / data fetching |
| `lucide-react` | ^0.545.0 | Icon library |
| `@radix-ui/*` (40+ packages) | ^1.x–^2.x | Accessible headless UI primitives (shadcn/ui base) |
| `react-hook-form` | ^7.55.0 | Form state management |
| `@hookform/resolvers` | ^3.10.0 | Zod integration for react-hook-form |
| `zod` | ^3.25.76 | Schema validation |
| `class-variance-authority` | ^0.7.1 | Variant-based component styling |
| `clsx` + `tailwind-merge` | ^2.1.1 / ^3.3.1 | Conditional class merging |
| `react-icons` | ^5.4.0 | Additional icon sets |
| `embla-carousel-react` | ^8.6.0 | Carousel / slider component |
| `recharts` | ^2.15.2 | Chart library (available, not yet used in pages) |
| `date-fns` | ^3.6.0 | Date utility functions |
| `next-themes` | ^0.4.6 | Theme switching (dark/light, available) |
| `sonner` | ^2.0.7 | Toast notifications |
| `cmdk` | ^1.1.1 | Command palette component |
| `vaul` | ^1.1.2 | Drawer component |

### Backend (`artifacts/api-server`)

| Package | Version | Role |
|---|---|---|
| `express` | ^5.2.1 | HTTP server framework (v5 — async error handling built-in) |
| `groq-sdk` | ^1.5.0 | Groq AI API client for chatbot |
| `nodemailer` | ^9.0.3 | SMTP email sending for enquiry notifications |
| `drizzle-orm` | ^0.45.2 | ORM layer (configured, schema is empty) |
| `pino` + `pino-http` | ^9.14.0 / ^10.5.0 | Structured JSON logging |
| `cors` | ^2.8.6 | Cross-origin request handling |
| `cookie-parser` | ^1.4.7 | Cookie parsing middleware |
| `esbuild` | 0.27.3 | TypeScript → ESM bundler |
| `esbuild-plugin-pino` | ^2.3.3 | Bundles pino worker threads correctly |

---

## 8. Setup & Installation Steps

### Prerequisites
- Node.js ≥ 20.x
- pnpm ≥ 9.x (`npm install -g pnpm`)
- A Groq API key (free at [console.groq.com](https://console.groq.com))
- *(Optional)* A Gmail account with an App Password for enquiry email notifications

### Running on Replit (Recommended)

Replit manages everything automatically. The following workflows run on startup:

| Workflow | Command | URL |
|---|---|---|
| Frontend | `pnpm --filter @workspace/gyanix-academy run dev` | Port 24128 → `/` |
| API Server | `pnpm --filter @workspace/api-server run dev` | Port 8080 → `/api` |

**Steps:**
1. Fork / import the project into Replit
2. Open **Secrets** (padlock icon) and add:
   - `GROQ_API_KEY` → your Groq API key
   - *(Optional)* `SMTP_USER`, `SMTP_PASS`, `ENQUIRY_EMAIL`
3. Click **Run** — both workflows start automatically

### Running Locally

```bash
# 1. Clone the repository
git clone <repo-url>
cd workspace

# 2. Install all dependencies (monorepo-wide)
pnpm install

# 3. Set environment variables
#    Create a .env file in the root (workspace/.env):
#    PORT=8080
#    GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxx
#    SMTP_USER=youremail@gmail.com        # optional
#    SMTP_PASS=xxxx xxxx xxxx xxxx        # optional — Gmail App Password
#    ENQUIRY_EMAIL=admin@example.com      # optional

# 4. Start the API server (in terminal 1)
pnpm --filter @workspace/api-server run dev

# 5. Start the frontend (in terminal 2)
PORT=5173 BASE_PATH=/ pnpm --filter @workspace/gyanix-academy run dev

# 6. Open http://localhost:5173 in your browser
```

### Production Build

```bash
# Build frontend static files
pnpm --filter @workspace/gyanix-academy run build
# Output: artifacts/gyanix-academy/dist/

# Build API server bundle
pnpm --filter @workspace/api-server run build
# Output: artifacts/api-server/dist/index.mjs

# Start API server in production
node --enable-source-maps artifacts/api-server/dist/index.mjs
```

---

## 9. API Routes / Endpoints

All routes are mounted under the `/api` base path.

### `GET /api/healthz`

| Property | Detail |
|---|---|
| **Description** | Health check — confirms the server is running |
| **Auth Required** | No |
| **Response 200** | `{ "status": "ok" }` |
| **Used By** | Replit uptime monitoring (configured in artifact.toml) |

---

### `POST /api/enquiry`

| Property | Detail |
|---|---|
| **Description** | Submits a student enquiry from the Contact page form |
| **Auth Required** | No |
| **Content-Type** | `application/json` |

**Request Body:**
```json
{
  "name": "string (required)",
  "email": "string (required, valid email)",
  "course": "string (required, e.g. 'IIT-JEE')",
  "message": "string (required)"
}
```

**Responses:**
| Status | Body | Condition |
|---|---|---|
| `200` | `{ "success": true }` | Enquiry received and (optionally) emailed |
| `400` | `{ "error": "All fields are required." }` | Any field is missing or empty |
| `500` | `{ "error": "Failed to send message. Please try again." }` | SMTP configured but email send failed |

**Side Effects:**
- Always logs enquiry details to the server console via pino
- If `SMTP_USER` + `SMTP_PASS` are configured: sends a formatted HTML email to `ENQUIRY_EMAIL` (or `SMTP_USER`)
- If SMTP not configured: logs a warning and returns success (form UX works regardless)

---

### `POST /api/chat`

| Property | Detail |
|---|---|
| **Description** | Sends a message to the AI academy assistant and returns a reply |
| **Auth Required** | No |
| **Content-Type** | `application/json` |

**Request Body:**
```json
{
  "message": "string (required)",
  "history": [
    { "role": "user", "content": "..." },
    { "role": "assistant", "content": "..." }
  ]
}
```

**Responses:**
| Status | Body | Condition |
|---|---|---|
| `200` | `{ "reply": "string" }` | AI response generated |
| `400` | `{ "error": "Message is required." }` | Message is empty/missing |
| `500` | `{ "error": "Chat service not configured." }` | `GROQ_API_KEY` not set |
| `500` | `{ "error": "Failed to get a response. Please try again." }` | Groq API call failed |

**Behavior:**
- Retains last 8 conversation exchanges from `history` for context
- Model: `llama-3.3-70b-versatile` (max_tokens: 400, temperature: 0.6)
- System prompt includes full academy knowledge (courses, faculty, contact, G-SET, etc.)

---

## 10. Database Schema

A PostgreSQL + Drizzle ORM setup is **configured but not active**.

### Configuration (`lib/db/`)

```
lib/db/
├── drizzle.config.ts    ← Points to PostgreSQL via DATABASE_URL
└── src/
    ├── index.ts         ← Creates pg Pool + drizzle() instance; throws if DATABASE_URL missing
    └── schema/
        └── index.ts     ← ⚠️ Empty: export {} — no tables defined
```

### Current State

> **No tables are defined.** The `lib/db` package creates a database connection pool but the schema file is a placeholder. No route in the API server imports `lib/db`, so the missing `DATABASE_URL` does not affect startup.

### Intended Future Schema (not yet implemented)

If the enquiry form data is persisted (a planned task), the schema would include a table such as:

```sql
-- Proposed, not yet created
CREATE TABLE enquiries (
  id          SERIAL PRIMARY KEY,
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  course      TEXT NOT NULL,
  message     TEXT NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 11. Known Limitations / TODO

### Critical Gaps

| # | Issue | Impact | Status |
|---|---|---|---|
| 1 | **Enquiries not stored in database** | Submissions are lost if the server restarts and SMTP is not configured | ⚠️ Known — task proposed |
| 2 | **Database schema is empty** | `lib/db/src/schema/index.ts` has only `export {}` — no tables defined | ⚠️ Placeholder only |
| 3 | **No admin panel** | No way to view submitted enquiries except server logs or email inbox | ❌ Not built |
| 4 | **GROQ_API_KEY not configured by default** | Chatbot returns HTTP 500 until the secret is added in Replit Secrets | 🔧 Manual step required |
| 5 | **OpenAPI spec is incomplete** | `lib/api-spec/openapi.yaml` only documents `/healthz` — `/enquiry` and `/chat` routes are not in the spec | ⚠️ Codegen won't cover these routes |

### Minor Issues / Future Improvements

- `SESSION_SECRET` is set in Replit Secrets but no session/auth middleware is implemented — secret is unused
- `recharts` is installed as a dependency but not used on any page yet
- `next-themes` (dark mode) is installed but no dark mode toggle is exposed in the UI
- `artifacts/api-server/src/middlewares/` directory is empty (placeholder)
- `artifacts/api-server/src/lib/.gitkeep` — empty lib directory
- Chatbot history is stored in React state only — clears on page refresh
- No rate limiting on API routes (susceptible to spam on `/api/enquiry` and `/api/chat`)
- No CAPTCHA or honeypot on the enquiry form
- Gallery page uses static assets — no CMS or image management

### Proposed Tasks (In Queue)

- **Task #2:** Store enquiries in PostgreSQL database + build admin view
- **Task #3:** Mobile app for students to browse courses and submit enquiries

---

## 12. Deployment Info

### Platform: Replit

The project is hosted on **Replit** using its managed artifact deployment system.

### Artifact Configuration

| Artifact | Kind | Dev Port | Preview Path | Health Check |
|---|---|---|---|---|
| `gyanix-academy` | `web` (React SPA) | 24128 | `/` | None (SPA) |
| `api-server` | `api` (Express) | 8080 | `/api` | `/api/healthz` |
| `mockup-sandbox` | `design` (Vite) | 8081 | `/__mockup` | None |

### How Routing Works

Replit's proxy uses **path-based routing** to route requests to the correct artifact:

```
Browser → https://<repl>.replit.app/         → gyanix-academy frontend (port 24128)
Browser → https://<repl>.replit.app/api/*    → api-server Express (port 8080)
```

The frontend calls `/api/enquiry` and `/api/chat` — these are automatically routed to the API server at the network level. No Vite proxy configuration is needed.

### Deployment Steps (Replit)

1. Ensure all required secrets are set (`GROQ_API_KEY` at minimum)
2. Click **Deploy** in the Replit workspace
3. Replit builds and serves both artifacts in production mode:
   - Frontend: `vite build` → static files served
   - API server: `esbuild` bundle → `node dist/index.mjs`
4. Production URL is assigned by Replit (format: `https://<slug>.replit.app`)

### Production vs Development

| Aspect | Development | Production |
|---|---|---|
| Frontend | Vite HMR dev server | Static files (nginx/Replit CDN) |
| API Server | TypeScript → esbuild → node (every restart) | Pre-built `dist/index.mjs` |
| Env vars | `.env` file (if present) or Replit Secrets | Replit Secrets only |
| CORS | Permissive (all origins) | Permissive (all origins) — tighten before production |
| Logging | pino-pretty (human-readable) | pino JSON (structured) |

---

*This README was generated by deep codebase analysis in August 2026. All information is sourced directly from the actual source files — no placeholder or generic content.*
