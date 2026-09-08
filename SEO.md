# SEO.md — Gyanix Academy Website — Complete Technical Documentation

> **Document Purpose:** This file is a complete technical reference for the Gyanix Academy website. It documents the entire project: where the frontend and backend live, how the site is designed, what AI models/technologies are used, every page, every API route, all configuration, and all key code.

> **Generated:** September 2026
> **Project Root:** `C:\Users\pc\Desktop\gyanix-acedemy-`
> **Live Hosting:** Replit (also has Vercel / Render deployment configs prepared)

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Full Folder Structure](#2-full-folder-structure)
3. [Frontend — Where It Lives & How It Works](#3-frontend--where-it-lives--how-it-works)
4. [Backend / API — Where It Lives & How It Works](#4-backend--api--where-it-lives--how-it-works)
5. [Pages & Routes (Full List)](#5-pages--routes-full-list)
6. [AI / Model Usage](#6-ai--model-usage)
7. [Images / Assets — Where They Live](#7-images--assets--where-they-live)
8. [Colors & Design System](#8-colors--design-system)
9. [Environment Variables & Secrets](#9-environment-variables--secrets)
10. [Deployment & Hosting (Replit / Vercel / Render)](#10-deployment--hosting-replit--vercel--render)
11. [How to Run the Project](#11-how-to-run-the-project)
12. [API Routes (Detailed)](#12-api-routes-detailed)
13. [Responsiveness Notes](#13-responsiveness-notes)
14. [Known Limitations / TODO](#14-known-limitations--todo)
15. [Key Code Snippets — Frontend](#15-key-code-snippets-most-important-frontend-code)
16. [Backend Code Snippets — Full API](#16-backend-code-snippets-full-api)
17. [Complete UI Component Library](#17-complete-ui-component-library-shadcnui)
18. [Helper Utilities](#18-helper-utilities)
19. [OpenAPI Spec](#19-openapi-spec-libapi-specopenapiyaml)
20. [SEO / Organic Content Keywords](#20-seo--organic-content-keywords)
21. [Page-by-Page Section Breakdown (Content Map)](#21-page-by-page-section-breakdown-content-map)
22. [Business & Contact Information](#22-business--contact-information-content-reference)

---

## 1. Project Overview

**Gyanix Academy** is a premium residential coaching institute located in **Defence Colony, Kaithal, Haryana, India** (founded 2025). It runs a **School + Coaching + Hostel** all under one roof.

This project is the institute's **official website** — a full-stack web application that:

- Presents the academy's **courses, faculty, results, facilities, and gallery**
- Lets visitors **submit admission enquiries** (Contact page) and **G-SET scholarship registrations**
- Provides a **multilingual AI chatbot** (Hindi / English / Hinglish) that answers questions about the academy
- Drives admissions through strong calls-to-action (WhatsApp, Enquire Now, Book Free Demo, Apply G-SET)

**Tagline:** *"Lighting the way to excellence"*
**Subjects/Exams Covered:** IIT-JEE, NEET, NDA & Defence, CUET, RMS & Sainik School, School Boards (5th–12th), Olympiads, Pre-Foundation (6–8), G-SET Scholarship.

---

## 2. Full Folder Structure

```
gyanix-acedemy-/                          ← Workspace root (pnpm monorepo)
│
├── .replit                          ← Replit config (workflows, ports, deployment)
├── .env                             ← Local secrets (NOT committed)
├── .gitignore
├── .npmrc                           ← pnpm settings
├── pnpm-workspace.yaml              ← Workspace package definitions
├── pnpm-lock.yaml
├── tsconfig.json / tsconfig.base.json
├── package.json                     ← Root scripts (dev, build, typecheck)
├── README.md                        ← Technical audit README
├── replit.md                        ← Operate/Run notes
├── SEO.md                           ← THIS FILE
├── render.yaml                      ← Backend API deployment (Render)
├── vercel.json                      ← Frontend deployment (Vercel)
│
├── artifacts/
│   ├── gyanix-academy/              ★ FRONTEND (React + Vite) — THE WEBSITE
│   │   ├── index.html                ← HTML entry point
│   │   ├── vite.config.ts            ← Vite config (PORT, BASE_PATH, aliases)
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── public/                   ← Static files (favicon, og-image, robots.txt)
│   │   │   ├── favicon.png / favicon.svg
│   │   │   ├── og-image.png
│   │   │   ├── robot-icon.png
│   │   │   └── robots.txt
│   │   ├── dist/                     ← Production build output (dist/public/)
│   │   └── src/
│   │       ├── main.tsx              ← React bootstrap (mounts #root)
│   │       ├── App.tsx               ← QueryClient + Router + ChatBot
│   │       ├── index.css             ← Global styles + Tailwind + design tokens
│   │       ├── pages/                ← Each page component
│   │       │   ├── home.tsx
│   │       │   ├── about.tsx
│   │       │   ├── courses.tsx
│   │       │   ├── scholarship.tsx
│   │       │   ├── results.tsx
│   │       │   ├── gallery.tsx
│   │       │   ├── faculty.tsx
│   │       │   ├── contact.tsx
│   │       │   └── not-found.tsx
│   │       ├── components/
│   │       │   ├── layout.tsx        ← Navbar + main + Footer + WhatsappFab wrapper
│   │       │   ├── navbar.tsx        ← Sticky navbar + mobile menu
│   │       │   ├── footer.tsx
│   │       │   ├── whatsapp-fab.tsx  ← Floating WhatsApp button
│   │       │   ├── chatbot.tsx       ← AI chatbot floating widget
│   │       │   └── ui/               ← shadcn/ui component library (40+ primitives)
│   │       └── hooks/
│   │           └── use-mobile.tsx    ← Mobile breakpoint hook
│   │
│   ├── api-server/                   ★ BACKEND (Express 5 API)
│   │   ├── build.mjs                 ← esbuild bundler
│   │   ├── package.json
│   │   ├── src/
│   │   │   ├── index.ts              ← Server entry (reads PORT, starts app)
│   │   │   ├── app.ts                ← Express app (CORS, body-parser, routes)
│   │   │   ├── lib/logger.ts         ← Pino logger
│   │   │   └── routes/
│   │   │       ├── index.ts          ← Mounts all routers under /api
│   │   │       ├── health.ts         ← GET /api/healthz
│   │   │       ├── enquiry.ts        ← POST /api/enquiry
│   │   │       ├── gset.ts           ← POST /api/gset-register
│   │   │       └── chat.ts           ← POST /api/chat (Groq AI)
│   │   └── dist/                     ← Production bundle (dist/index.mjs)
│   │
│   └── mockup-sandbox/               ← Replit Design Canvas preview (not part of site)
│       └── src/ (design preview components)
│
├── lib/
│   ├── db/                           ← PostgreSQL + Drizzle ORM (configured, empty schema)
│   │   └── src/{ index.ts, schema/index.ts }
│   ├── api-zod/                      ← Generated Zod validation schemas
│   │   └── src/index.ts
│   ├── api-spec/                     ← OpenAPI 3.1.0 contract
│   └── api-client-react/             ← Generated React Query API client
│
├── attached_assets/
│   │   ✓ THIS IS WHERE ALL WEBSITE IMAGES LIVE (photo source folder)
│   └── generated_images/             ← 25 photos used across all pages
│       ├── home-hero.jpg / home-hero-2.jpg / home-hero-3.jpg
│       ├── about-classroom.jpg
│       ├── courses-hero.jpg
│       ├── course-*.jpg  (iit-jee, neet, nda, cuet, rms, boards, olympiads, foundation)
│       ├── faculty-1..4.jpg
│       ├── gallery-1..6.jpg
│       ├── results-hero.jpg
│       └── scholarship-hero.jpg
│
├── public/                           ← Extra assets (robot images used by chatbot icon)
└── scripts/
    └── post-merge.sh
```

---

## 3. Frontend — Where It Lives & How It Works

**Location:** `artifacts/gyanix-academy/`

### Tech Stack (Frontend)
| Layer | Technology | Version |
|---|---|---|
| Framework | React | 19.1.0 |
| Language | TypeScript | ~5.9 |
| Build tool | Vite | ^7.3.2 |
| Styling | Tailwind CSS | ^4.1.14 |
| Component library | shadcn/ui (Radix UI primitives) | Various |
| Animation | Framer Motion | ^12.23.24 |
| Routing | Wouter | ^3.3.5 |
| Data fetching | TanStack React Query | ^5.90.21 |
| Icons | Lucide React | ^0.545.0 |
| Forms | React Hook Form + Zod | (installed) |

### How the frontend is wired (data flow)

1. **`src/main.tsx`** — creates the React root and mounts `<App />` into `<div id="root">` in `index.html`.
2. **`index.html`** — contains SEO meta tags (title, description, Open Graph, Twitter card), Google Fonts (Inter), favicon, and the `#root` div.
3. **`src/App.tsx`** — is the app shell:
   - Wraps everything in a **QueryClientProvider** (TanStack React Query).
   - Sets up **Wouter Router** using `base = import.meta.env.BASE_URL`.
   - Renders a `<Switch>` of all page routes wrapped in `<Layout>`.
   - Mounts the global `<Toaster />` and the `<ChatBot />`.
4. **`src/components/layout.tsx`** — the shared page frame: `<Navbar />` → `<main>{children}</main>` → `<Footer />` → `<WhatsappFab />`.
5. **`src/components/navbar.tsx`** — sticky header with a **top info bar** (phone, address, timings, rating — desktop only), desktop nav links, and a **mobile hamburger menu** with animation.
6. **`src/components/chatbot.tsx`** — the floating AI assistant bubble (bottom-left) with chat panel, text-to-speech, and voice input (Web Speech API).

### Frontend aliases (from vite.config.ts)
```ts
'@'        → src/                                  // e.g. import { Button } from "@/components/ui/button"
'@assets'  → ../../attached_assets                 // e.g. import img from "@assets/generated_images/home-hero.jpg"
```

> ⚠️ **Very important:** All photos are imported via the `@assets` alias which points to the `attached_assets/` folder at the project root. That folder is the **single source for all website images**. Do NOT delete it or images will break.

### Frontend path aliases in tsconfig.json
```json
"paths": { "@/*": ["./src/*"] }
```

---

## 4. Backend / API — Where It Lives & How It Works

**Location:** `artifacts/api-server/`

### Tech Stack (Backend)
| Layer | Technology | Version |
|---|---|---|
| Runtime | Node.js (ESM) | System |
| Framework | Express | ^5.2.1 |
| Language | TypeScript | ~5.9 |
| Bundler | esbuild | 0.27.3 |
| Logger | Pino + pino-http | ^9.x / ^10.x |
| Email | Nodemailer (Gmail SMTP) | ^9.0.3 |
| AI | Groq SDK | ^1.5.0 |
| Validation | Zod | via lib/api-zod |

### Backend server flow

1. **`src/index.ts`** — reads `PORT` from env, validates it, then calls `app.listen()`.
2. **`src/app.ts`** — creates the Express server:
   - Adds pino-http logging
   - `cors()` (permissive/all origins)
   - `express.json()` + `express.urlencoded()`
   - Serves `GET /healthz`
   - Mounts all routes under `/api` via `src/routes/index.ts`
3. **`src/routes/index.ts`** — mounts the four routers: health, enquiry, chat, gset.
4. **`build.mjs`** — esbuild bundles the TS into a single ESM file `dist/index.mjs` (externalizes many native packages; includes esbuild-plugin-pino).
5. **`src/lib/logger.ts`** — Pino logger; pretty-print in dev, JSON in production; redacts auth headers/cookies.

---

## 5. Pages & Routes (Full List)

Routing is done client-side with **Wouter**. The full map lives in `src/App.tsx`.

| Route | File | Purpose |
|---|---|---|
| `/` | `pages/home.tsx` | Homepage: hero slider, stats counters, achievements, courses, facilities, reviews, CTA |
| `/about` | `pages/about.tsx` | Academy story, mission, vision, why-choose-us |
| `/courses` | `pages/courses.tsx` | 8 course cards with images + "Enquire Now" |
| `/scholarship` | `pages/scholarship.tsx` | G-SET Scholarship: how-it-works + registration form |
| `/results` | `pages/results.tsx` | Featured topper, stats counters, hall of fame |
| `/gallery` | `pages/gallery.tsx` | Photo gallery (masonry) with lightbox |
| `/faculty` | `pages/faculty.tsx` | 4 faculty profiles |
| `/contact` | `pages/contact.tsx` | Enquiry form + call/visit cards + Google Map |
| `*` (404) | `pages/not-found.tsx` | 404 page |

### Dynamic content on each page (from code)

**home.tsx** — hero slider (3 images, auto-rotates every 3.5s), AnimatedCounter stats (500+ students, 95% success, 5.0★, 9+ exams), 9 course links, 5 facility cards, reviews section.

**courses.tsx** — 8 courses: IIT-JEE, NEET, NDA & Defence, CUET, RMS & Sainik School, School Boards (5th–12th), Olympiads, Pre-Foundation. Each has an image, icon, description, 3 feature bullets, and an Enquire button.

**contact.tsx** — submits to `/api/enquiry`. Fields: name, email, course (dropdown), message.

**scholarship.tsx** — submits to `/api/gset-register`. Fields: name, email, current class (dropdown), target exam (dropdown). Hero shows "Anuj Saharan — District Topper — 100% Fee Waived".

**results.tsx** — Featured topper Anuj Saharan (JEE Mains 322/360), counters (95% success, 50+ ranks, 100% board pass, 84+ students), and 4 topper cards (Anuj, Priya Malik, Rahul Verma, Sneha Gupta).

**faculty.tsx** — 4 faculty: Dr. Rajesh Kumar, Ms. Priya Sharma, Mr. Amit Singh, Ms. Sunita Verma.

**gallery.tsx** — 6 gallery images with click-to-zoom lightbox.

---

## 6. AI / Model Usage

### 🧠 Chatbot (main AI feature)
- **Provider:** Groq
- **Model:** `openai/gpt-oss-120b` (via Groq API)
- **Route:** `POST /api/chat`
- **Max tokens:** 1000 | **Temperature:** 0.6
- **Context:** last 8 conversation exchanges retained
- **Language:** responds in the same language as the user (Hindi, English, or Hinglish)
- **Knowledge:** a 151-line `SYSTEM_PROMPT` in `src/routes/chat.ts` hard-codes everything about the academy (courses, faculty, fees process, G-SET, toppers, contact, facilities).
- **Voice input:** browser Web Speech API (`SpeechRecognition`, lang `hi-IN`)
- **Text-to-speech:** browser `speechSynthesis` (prefers a Hindi voice, falls back to English)
- **If `GROQ_API_KEY` is missing:** the route returns HTTP 500 `{ error: "Chat service not configured." }`

### 🧠 Other AI / Generation
- **Images:** The site photos in `attached_assets/generated_images/` are AI-generated images (produced during site creation) — they are static JPG assets, not generated at runtime.

> **No other AI APIs** (OpenAI, Claude, Anthropic, etc.) are used in this project.

---

## 7. Images / Assets — Where They Live

### Source folder (the real photos)
**`attached_assets/generated_images/`** — This is the master photo folder. All 25 images used on the site live here:
- `home-hero.jpg`, `home-hero-2.jpg`, `home-hero-3.jpg` → Home hero slider
- `about-classroom.jpg` → About page
- `courses-hero.jpg` → Courses hero background
- `course-iit-jee.jpg`, `course-neet.jpg`, `course-nda.jpg`, `course-cuet.jpg`, `course-rms.jpg`, `course-boards.jpg`, `course-olympiads.jpg`, `course-foundation.jpg` → 8 course cards
- `faculty-1.jpg` … `faculty-4.jpg` → Faculty profiles
- `gallery-1.jpg` … `gallery-6.jpg` → Gallery
- `results-hero.jpg` → Results featured topper
- `scholarship-hero.jpg` → Scholarship hero

### Static public assets (served as-is)
**`artifacts/gyanix-academy/public/`** → `favicon.png`, `favicon.svg`, `og-image.png`, `robot-icon.png`, `robots.txt`.

### Extra icons
**`public/` (root)** → robot images (`3d-robot.jpg`, `blue-robot.jpg`, etc.) used for the chatbot icon.

### How images get used in code
All pages import from `@assets/generated_images/...` (which maps to `attached_assets/`). Vite processes them in production into `dist/public/assets/*.jpg` with hashed filenames.

---

## 8. Colors & Design System

The design system is defined in **`src/index.css`** using Tailwind CSS v4 CSS variables (`@theme`).

### Brand colors (light mode, `:root`)
| Token | HSL | Purpose |
|---|---|---|
| `--primary` | `162 85% 12%` (dark green) | Main brand color |
| `--secondary` | `28 90% 54%` (orange) | Accent / CTA color |
| `--background` | `0 0% 100%` | White background |
| `--foreground` | `222 47% 11%` | Dark text |
| `--muted` | `210 40% 96%` | Muted surfaces |
| `--destructive` | `0 84.2% 60.2%` | Error/red |

### Dark mode colors (`.dark` class)
Defined in `index.css` — `--primary` becomes `224 69% 53%` (blue). Dark mode is supported via `next-themes` (installed) but **no toggle is exposed in the UI yet**.

### Fonts
- **App font:** Poppins (`--app-font-sans`)
- **index.html** also loads Inter as a secondary font.

### Logo
Custom inline SVG (a `>_`-style chevron with an orange circle) — defined directly in `navbar.tsx` and `footer.tsx`. Colors: dark navy `#1e3a8a` + orange `#f4841f`.

---

## 9. Environment Variables & Secrets

> Secrets are stored in Replit Secrets (or local `.env`). NEVER commit them.

| Variable | Required | Purpose |
|---|---|---|
| `PORT` | ✓ | Server listen port (Replit injects; also set manually for local) |
| `GROQ_API_KEY` | ✓ (for chatbot) | Groq API key for the AI chatbot |
| `SMTP_USER` | optional | Gmail address for sending enquiry/registration emails |
| `SMTP_PASS` | optional | Gmail App Password (not the login password) |
| `ENQUIRY_EMAIL` | optional | Recipient email for notifications (defaults to `SMTP_USER`) |
| `DATABASE_URL` | optional | PostgreSQL connection string (used by lib/db; not used by any route yet) |
| `SESSION_SECRET` | optional | Session secret (injected, not actively used) |
| `LOG_LEVEL` | optional | Pino log level (default `info`) |

---

## 10. Deployment & Hosting (Replit / Vercel / Render)

### Current active hosting: **Replit**
- `.replit` defines the dev workflow: `PORT=3000 BASE_PATH=/ npm run --prefix artifacts/gyanix-academy dev`
- The frontend and API are separate **artifacts**:
  - Frontend (gyanix-academy): served at `/`
  - API (api-server): served at `/api/*`
- `.replit` uses `router = "application"` with `deploymentTarget = "autoscale"`.

### Vercel (also configured, in `vercel.json`)
- Build: `pnpm install && PORT=3000 BASE_PATH=/ pnpm --filter @workspace/gyanix-academy run build`
- Output directory: `artifacts/gyanix-academy/dist/public`
- Rewrites `/api/*` to the Render-hosted API: `https://gyanix-acedemy.onrender.com/api/*`
- SPA rewrite: all non-asset routes → `/index.html`

### Render (backend, in `render.yaml`)
- Service: `gyanix-api`, runtime node, free plan
- Build: `pnpm install && pnpm --filter @workspace/api-server run build`
- Start: `node --enable-source-maps artifacts/api-server/dist/index.mjs`
- Health check: `/api/healthz`; PORT=10000

---

## 11. How to Run the Project

### Local development (frontend + API)
```bash
# Terminal 1 — API server
pnpm --filter @workspace/api-server run dev

# Terminal 2 — Frontend (Replit default port)
PORT=3000 BASE_PATH=/ npm run --prefix artifacts/gyanix-academy dev
# or your chosen port, e.g. 5000:
PORT=5000 BASE_PATH=/ npm run --prefix artifacts/gyanix-academy dev
```

### Production build
```bash
# Root scripts
npm run typecheck      # TypeScript check across workspace
npm run build          # Build frontend (needs PORT + BASE_PATH env)
```

### Start API in production
```bash
node --enable-source-maps artifacts/api-server/dist/index.mjs
```

---

## 12. API Routes (Detailed)

All routes are mounted under `/api`.

### `GET /api/healthz`
- **Response 200:** `{ "status": "ok" }`
- Used for uptime monitoring.

### `POST /api/enquiry`
- **Body:** `{ name, email, course, message }` (all required)
- **200:** `{ success: true }` — enquiry logged; if SMTP configured, an HTML email is sent.
- **400:** `{ error: "All fields are required." }`
- **500:** `{ error: "Failed to send message. Please try again." }`
- **Side effect:** always logs the enquiry (never silently lost), even without SMTP.

### `POST /api/gset-register`
- **Body:** `{ name, email, currentClass, targetExam }` (all required)
- **200 / 400 / 500** — same pattern as enquiry, for the G-SET registration form.

### `POST /api/chat`
- **Body:** `{ message, history }` — `history` = last 8 exchanges.
- **200:** `{ reply: "..." }` from Groq (`openai/gpt-oss-120b`).
- **400:** `{ error: "Message is required." }` if empty.
- **500:** `{ error: "Chat service not configured." }` if `GROQ_API_KEY` missing, or generic error if Groq fails.

---

## 13. Responsiveness Notes

The site is built with **Tailwind CSS responsive utilities** and is fully responsive (mobile / tablet / desktop).

Key responsive implementations:
- **Navbar:** top info bar hidden below `lg`; desktop links hidden below `lg`; hamburger menu shown on mobile with animated dropdown.
- **Grids:** pages use `grid-cols-1 md:grid-cols-2 lg:grid-cols-4` etc. — stack to 1 column on phones, expand on larger screens.
- **Hero:** `grid-cols-1 lg:grid-cols-2`; CTA buttons stack full-width on mobile (`flex-col sm:flex-row`).
- **Global image safety rule** (in `src/index.css`):
  ```css
  body { overflow-x: hidden; }
  img, video { max-width: 100%; height: auto; }
  ```
  This prevents any image from overflowing its container on phones.

---

## 14. Known Limitations / TODO

- **Enquiries not stored in a database** — lost if server restarts and SMTP is not configured.
- **Database schema is empty** (`lib/db/src/schema/index.ts` has only `export {}`).
- **No admin panel** to view enquiries (only server logs / email inbox).
- **`GROQ_API_KEY`** needed for the chatbot to work (else it returns 500).
- **OpenAPI spec** (`lib/api-spec/openapi.yaml`) only documents `/healthz`; `/enquiry`, `/chat`, `/gset-register` are not yet in the spec.
- **Dark mode** is wired up (Tailwind + next-themes) but no toggle is exposed.
- **recharts** installed but not used on any page.
- **No rate limiting / CAPTCHA** on the enquiry & chat API routes (spam risk).
- **Chatbot history** stored in React state only — clears on refresh.

---

## 15. Key Code Snippets (Most Important Frontend Code)

### 15.1 App.tsx — Routing & App Shell (FULL CODE)
```tsx
// File: artifacts/gyanix-academy/src/App.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { Layout } from './components/layout';
import { ChatBot } from './components/chatbot';

import Home from './pages/home';
import About from './pages/about';
import Courses from './pages/courses';
import Scholarship from './pages/scholarship';
import Results from './pages/results';
import Gallery from './pages/gallery';
import Faculty from './pages/faculty';
import Contact from './pages/contact';

const queryClient = new QueryClient();

function NotFound() { /* 404 page with "Go Back Home" button */ }

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/courses" component={Courses} />
        <Route path="/scholarship" component={Scholarship} />
        <Route path="/results" component={Results} />
        <Route path="/gallery" component={Gallery} />
        <Route path="/faculty" component={Faculty} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
        <Router />
      </WouterRouter>
      <Toaster />
      <ChatBot />
    </QueryClientProvider>
  );
}
export default App;
```

### 15.2 Layout.tsx — Page Frame (FULL CODE)
```tsx
// File: artifacts/gyanix-academy/src/components/layout.tsx
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { WhatsappFab } from "./whatsapp-fab";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-[100dvh] w-full font-sans bg-background">
      <Navbar />
      <main className="flex-1 w-full">{children}</main>
      <Footer />
      <WhatsappFab />
    </div>
  );
}
```

### 15.3 Navbar — Nav Links + Mobile Menu Logic (KEY PARTS)
```tsx
// Nav links array
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/courses", label: "Courses" },
  { href: "/scholarship", label: "G-SET Scholarship" },
  { href: "/results", label: "Results" },
  { href: "/gallery", label: "Gallery" },
  { href: "/faculty", label: "Faculty" },
  { href: "/contact", label: "Contact" },
];
```
- **Desktop nav:** `hidden lg:flex` — only shows on large screens
- **Mobile hamburger:** `lg:hidden` button with Framer Motion rotate animation
- **Mobile menu:** dropdown with `AnimatePresence` (height animation), staggered link reveals, WhatsApp + Enquire buttons, and an info strip
- **Top info bar:** `hidden lg:block` — shows phone, address, timings, rating (desktop only)
- **Sticky behavior:** header is `sticky top-0 z-50`; on scroll it adds `bg-white/95 backdrop-blur shadow-md`, on click of location route it closes the mobile menu.

### 15.4 ChatBot — Floating AI Widget (KEY PARTS)
- **Position:** `fixed bottom-6 left-6 z-50` (bottom-LEFT; WhatsApp FAB is bottom-RIGHT)
- **States:** `open`, `listening`, `loading`, `ttsEnabled`, `unread`
- **Messages:** stored in React state; `WELCOME` greeting is in Hindi/Hinglish
- **API call:** `POST /api/chat` with `{ message, history: last 8 }`
- **Speech:** `startListening()` uses `window.SpeechRecognition || window.webkitSpeechRecognition` with `lang: "hi-IN"`
- **TTS:** `speak()` uses `window.speechSynthesis`, prefers a Hindi voice
- **Panel sizing (mobile fix):** `fixed bottom-20 left-2 right-2 sm:left-6 sm:right-auto w-auto sm:w-[380px]` so it fills the screen width on phones.

### 15.5 Contact Form — Handle Submit (KEY CODE)
```tsx
// File: src/pages/contact.tsx (logic)
const data = {
  name, email, course, message
};
const res = await fetch("/api/enquiry", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
});
// states: idle → loading → success | error
// success shows a green checkmark for 8 seconds, then resets to idle
```

---

## 16. Backend Code Snippets (Full API)

### 16.1 app.ts — Express Setup (FULL)
```ts
// File: artifacts/api-server/src/app.ts
import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();
app.use(pinoHttp({ logger, serializers: { req, res } }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/healthz", (_req, res) => res.json({ status: "ok" }));
app.use("/api", router);
export default app;
```

### 16.2 routes/index.ts — Router Mounting (FULL)
```ts
import { Router } from "express";
import healthRouter from "./health";
import enquiryRouter from "./enquiry";
import chatRouter from "./chat";
import gsetRouter from "./gset";

const router = Router();
router.use(healthRouter);   // GET /api/healthz
router.use(enquiryRouter);  // POST /api/enquiry
router.use(chatRouter);     // POST /api/chat
router.use(gsetRouter);     // POST /api/gset-register
export default router;
```

### 16.3 chat.ts — Chatbot Endpoint (KEY)
```ts
router.post("/chat", async (req, res) => {
  const { message, history } = req.body;
  if (!message?.trim()) return res.status(400).json({ error: "Message is required." });
  const apiKey = process.env["GROQ_API_KEY"];
  if (!apiKey) return res.status(500).json({ error: "Chat service not configured." });

  const client = new Groq({ apiKey });
  const safeHistory = (history ?? []).slice(-8);
  const completion = await client.chat.completions.create({
    model: "openai/gpt-oss-120b",
    messages: [{ role: "system", content: SYSTEM_PROMPT }, ...safeHistory, { role: "user", content: message }],
    max_tokens: 1000,
    temperature: 0.6,
  });
  res.json({ reply: completion.choices[0]?.message?.content });
});
```

---

## 17. Complete UI Component Library (shadcn/ui)

The frontend includes the full shadcn/ui component set in `artifacts/gyanix-academy/src/components/ui/`. These are used by the pages:

`accordion, alert, alert-dialog, aspect-ratio, avatar, badge, breadcrumb, button, button-group, calendar, card, carousel, chart, checkbox, collapsible, command, context-menu, dialog, drawer, dropdown-menu, empty, field, form, hover-card, input, input-group, input-otp, item, kbd, label, menubar, navigation-menu, pagination, popover, progress, radio-group, resizable, scroll-area, select, separator, sheet, sidebar, skeleton, slider, sonner, spinner, switch, table, tabs, textarea, toast, toaster, toggle, toggle-group, tooltip`

The most-used in this project's pages:
- `Button` (`@/components/ui/button`) — everywhere for CTAs
- `Card` (`@/components/ui/card`) — scholarship registration card
- `Input` / `Textarea` — contact & scholarship forms
- `Toaster` / `Toast` — global notifications

---

## 18. Helper Utilities

### `src/lib/utils.ts` — class merging
```ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### `src/hooks/use-mobile.tsx` — mobile detection
- Uses `window.matchMedia("(max-width: 767px)")`
- Returns `true` when viewport width < 768px.

### `src/hooks/use-toast.ts` — toast notifications
- Standard shadcn/ui toast hook (probably using sonner or the toast primitive — confirm current usage; the app uses `<Toaster />` in App.tsx).

---

## 19. OpenAPI Spec (lib/api-spec/openapi.yaml)

Currently **only documents** the health check:
- `GET /healthz` → `{ status: "ok" }` (schema `HealthStatus`)
- **Not yet documented:** `/api/enquiry`, `/api/chat`, `/api/gset-register`

---

## 20. SEO / Organic Content Keywords

For the marketing/SEO side of this website, the following **key content and keywords** are embedded in the pages and chatbot prompt:

- City/local: **Kaithal, Haryana, Defence Colony, Karnal Road**
- Exams: **IIT-JEE, NEET, NDA, CUET, Sainik School, RMS, Olympiads**
- Type: **Coaching institute, Residential, School + Coaching + Hostel**
- Status: **5.0★ Google (59 reviews), 5.0★ Justdial (84+), Est. 2025**
- Toppers: **Anuj Saharan (JEE 322/360), Priya Malik (NEET 685/720), Rahul Verma (NDA), Sneha Gupta (CBSE 99.8%)**
- Contact: **89501-75314 / 89502-75314, gyanixacademy@gmail.com**

---

## 21. Page-by-Page Section Breakdown (Content Map)

### Home (`/`)
1. **Hero** — dark green gradient, glassmorphism "5.0 Rated Institute" badge, animated heading "Your Path to IIT, NEET, NDA & Defence Success" with bouncing letter animation, subtitle, two CTA buttons (Book Free Demo Class → /contact, Explore Courses → /courses), auto-rotating image slider (3 images), floating "100% Results Driven" badge.
2. **Why Choose Gyanix Academy** — 4 animated counters (500+ students, 95% success, 5.0★ Google, 9+ exams) + 3 reason chips (small batches, expert faculty, on-campus hostel).
3. **Our Achievers** — 4 award cards (District & State Ranks, Amar Ujala Coverage, Road Safety Programme, Prize Distribution).
4. **Our Premier Programs** — 9 course cards, each with icon + color + "Know More → /courses" + "View All Courses" button.
5. **World-Class Facilities** — 5 cards (Residential Hostel, Experienced Faculty, Regular Tests, Small Batches, Safe Campus).
6. **Ready to secure your future?** — CTA band with "Apply for G-SET Scholarship" + "Contact Us" buttons.
7. **Reviews / Stats** — 4 stat counters (84+ Justdial reviews, 5.0★, 9+ exams, Est. 2025) + 4 trust badges (Google 5.0, Justdial 5.0, Justdial Claimed, School·Coaching·Hostel).

### About (`/about`)
1. **Header** — title + tagline, centered on `bg-primary/5`.
2. **Our Story** — 2-col layout: text + "Our Mission" / "Our Vision" cards on left, classroom image with overlay caption on right.
3. **Why Choose Gyanix?** — 6 feature cards (Experienced Faculty, Small Batches, Comprehensive Material, Doubt Sessions, Test Series, Result Oriented).

### Courses (`/courses`)
1. **Hero** — dark overlay background image + heading "Academic Programs".
2. **Course Grid** — 8 cards, each: image banner (h-48, object-cover), icon badge top-right, title, description, 3 feature bullets, "Enquire Now → /contact" button.

### Scholarship (`/scholarship`)
1. **Hero** — dark green, "G-SET" badge, big title "Unlock up to 100% Scholarship", "Register Now for Free" button, scholarship image with floating "Anuj Saharan — District Topper — 100% Fee Waived" card, orange bottom border.
2. **How G-SET Works** — 3 steps (1. Register, 2. Take the Test, 3. Get Scholarship).
3. **Registration Form** — 2-col card: left dark-green benefits panel, right form (name, email, class, target exam) → posts to `/api/gset-register`.

### Results (`/results`)
1. **Header** — trophy icon + title.
2. **Featured Topper** — large card for Anuj Saharan (322/360 JEE Mains, District Topper, yellow border), image on right.
3. **Stats Counters** (dark green band) — 95% success, 50+ top 1000 ranks, 100% board pass, 84+ students.
4. **Hall of Fame** — 4 topper cards.

### Gallery (`/gallery`)
- **Masonry grid** (`columns-1 md:columns-2 lg:columns-3`) of 6 images with hover zoom + click-to-open lightbox (black overlay, X close button).

### Faculty (`/faculty`)
1. **Header** — dark green band "Meet Our Experts".
2. **Grid** — 4 faculty cards, each: `aspect-[4/5]` image, hover social icons overlay, name, subject, experience badge, bio.

### Contact (`/contact`)
1. **Header** — dark green band "Get in Touch".
2. **3 Info Cards** — Call Us (2 phone numbers), Visit Us (address + Google Maps link), "Open until 7:00 PM" live card.
3. **Enquiry Form** — name, email, course dropdown, message → posts to `/api/enquiry`.
4. **Google Map embed** — 180px tall iframe of Gyanix Academy location.

---

## 22. Business & Contact Information (Content Reference)

- **Institute:** Gyanix Academy
- **Phone:** 89501-75314 / 89502-75314
- **WhatsApp:** 89501-75314
- **Email:** gyanixacademy@gmail.com
- **Address:** Karnal Road, Street No. 4, Near New Bus Stand, Defence Colony, Kaithal, Haryana – 136027
- **Timings:** Mon–Sat 9:00 AM – 7:00 PM (closed Sunday)
- **Google Maps:** https://maps.app.goo.gl/8phnpfA2nXru4tXS8
- **Facebook:** facebook.com/GyanixAcademy
- **Instagram:** instagram.com/gyanix_academy

---

*This document is a complete technical map of the Gyanix Academy website. Use it for onboarding, debugging, SEO/content understanding, and maintenance.*
