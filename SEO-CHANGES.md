# SEO Changes — Gyanix Academy Website

> **Document Purpose:** Ye file un sabhi SEO changes ka pura technical detail hai jo Gyanix Academy website ki search engine ranking, local visibility aur shareability (WhatsApp/Facebook/LinkedIn) badhane ke liye code mein ki gayi hain.
>
> **Changes Context:** SEO ka bada set do commits mein aaya:
> 1. `3f71fb6` — "Update chatbot, styling, pages and add SEO/deployment config"
> 2. `9c9a7f0` — "SEO improvements: JSON-LD, prerendering, rate limiting, sitemap"
>
> **Project Root:** `C:\Users\pc\Desktop\gyanix-acedemy-`
> **Live Domain:** `https://gyanixacademy.com`

---

## Table of Contents

1. [Overall SEO Strategy (Kya-Kya Kiya Gaya)](#1-overall-seo-strategy)
2. [Per-Page Static SEO — index.html](#2-per-page-static-seo--indexhtml)
3. [Dynamic SEO Component — seo.tsx (React)](#3-dynamic-seo-component--seotsx-react)
4. [Page-wise <Seo /> Implementations](#4-page-wise-seo--implementations)
5. [Structured Data (JSON-LD) Schema Types](#5-structured-data-json-ld-schema-types)
6. [Sitemap.xml](#6-sitemapxml)
7. [Robots.txt](#7-robotstxt)
8. [Prerendering — scripts/prerender.mjs](#8-prerendering--scriptsprerendermjs)
9. [Image SEO — alt / lazy / decoding](#9-image-seo--alt--lazy--decoding)
10. [Accessibility SEO — Form Labels (htmlFor/id)](#10-accessibility-seo--form-labels-htmlforid)
11. [Internal Linking & Content SEO](#11-internal-linking--content-seo)
12. [Security / Crawl-Budget Protection — Rate Limiting](#12-security--crawl-budget-protection--rate-limiting)
13. [Deployment Config SEO — vercel.json / 200.html / 404.html](#13-deployment-config-seo--verceljson--200html--404html)
14. [Final Summary (Full SEO Change List)](#14-final-summary)

---

## 1. Overall SEO Strategy

Gyanix Academy ek **React SPA (Single Page App)** hai. SPA ke 2 bade SEO problems hote hain:

| Problem | Solution Used |
|---|---|
| Search engine ko sirf khali `index.html` dikhti hai, content JS se load hota hai | **Static meta tags** in `index.html` + **Prerendering** (har page ki ready HTML build ke time ban jaati hai) |
| Har page par same title/description rehta hai | **Dynamic `<Seo />` component** — har route par unique title, description, canonical, Open Graph |
| Google rich results (star, faq, business info) nahi dikhte | **JSON-LD Structured Data** — `EducationalOrganization`, `LocalBusiness`, `WebSite`, `FAQPage`, `ItemList` |
| Google ko pages dhoondhne hue nahi milte | **sitemap.xml** + **robots.txt** |
| WhatsApp/Facebook par share karte waqt koi preview nahi dikhta | **Open Graph + Twitter Card** tags |
| Images ka koi alt/text nahi tha | **Descriptive alt text** + `loading="lazy"` + `decoding="async"` |
| Dual pages / duplicate content ka danger | **Canonical URLs** har page par |
| Spam requests abhi bhi SEO/data quality kharab kar sakti hain | **API Rate Limiting** (forms + chatbot) |

---

## 2. Per-Page Static SEO — index.html

**File:** `artifacts/gyanix-academy/index.html`

Ye wahi HTML hai jo har page ka base hai aur crawlers ko sabse pehle dikhta hai.

### 2.1 Title (60 chars ke andar, keyword-rich)
```html
<title>Gyanix Academy – Best Coaching Institute in Kaithal for IIT-JEE, NEET, NDA</title>
```
- Primary keywords: `Gyanix Academy`, `Coaching Institute`, `Kaithal`
- Secondary keywords: `IIT-JEE`, `NEET`, `NDA`
- Location keyword (local SEO): **Kaithal**

### 2.2 Meta Description (150–160 chars)
```html
<meta name="description" content="Gyanix Academy is Kaithal's top-rated coaching institute for IIT-JEE,
NEET, NDA, CUET, RMS & Sainik School. Expert faculty, residential hostel, 5★ rated. Enrol now." />
```
- Call to action ("Enrol now") include hai.
- Local + exam keywords dono hain.

### 2.3 Robots + Theme Color
```html
<meta name="robots" content="index, follow" />
<meta name="theme-color" content="#022c22" />
```
- `index, follow` = Google ko page ko index karne aur links follow karne ki permission.
- `theme-color` = mobile browser tab ka color (brand consistency).

### 2.4 Canonical URL (Duplicate content fix)
```html
<link rel="canonical" href="https://gyanixacademy.com/" />
```
- SPA sirf `/` route ka HTML serve karta hai, isliye canonical se Google ko bataya ki original/canonical version kya hai.

### 2.5 Open Graph (WhatsApp / Facebook / LinkedIn preview)
```html
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Gyanix Academy" />
<meta property="og:title" content="Gyanix Academy — Kaithal's Trusted Coaching Institute" />
<meta property="og:description" content="Top-rated coaching for IIT-JEE, NEET, NDA, CUET & more. Residential
institute in Defence Colony, Kaithal, Haryana. 5★ rated on Google & Justdial." />
<meta property="og:image" content="https://gyanixacademy.com/og-image.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="Gyanix Academy — Kaithal's Trusted Coaching Institute" />
```
- `1200×630` size = WhatsApp/Facebook ka standard preview size.
- `og:image:alt` bhi add kiya — accessibility + accesible previews.

### 2.6 Twitter / X Card
```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Gyanix Academy — Kaithal's Trusted Coaching Institute" />
<meta name="twitter:description" content="Top-rated coaching for IIT-JEE, NEET, NDA, CUET & more. ..." />
<meta name="twitter:image" content="https://gyanixacademy.com/og-image.png" />
```
- `summary_large_image` = bade image card ka format.

### 2.7 Favicon + Apple Touch Icon
```html
<link rel="icon" type="image/png" href="/favicon.png" />
<link rel="apple-touch-icon" href="/favicon.png" />
```

### 2.8 Font Preconnect (Performance SEO)
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```
- `preconnect` se font setup ki latency kam hoti hai → better Core Web Vitals → better ranking.

### 2.9 Static JSON-LD (Crawlers ke liye, JS click hone se pehle hi)
- `EducationalOrganization` + `LocalBusiness` block (see #5.1)
- `WebSite` block (see #5.2)

---

## 3. Dynamic SEO Component — seo.tsx (React)

**File:** `artifacts/gyanix-academy/src/components/seo.tsx` (134 lines, naya banaya gaya)

### 3.1 Kya karta hai
JA `<Seo />` component har page par lagaya, jo route badalne par **dynamically** head tags update karta hai:

| Tag | Kaise update hota hai |
|---|---|
| `<title>` | `document.title = title` |
| `meta name="description"` | upsert (banaya nahi toh update) |
| `og:title`, `og:description` | upsert by `property` |
| `og:url`, `og:type`, `og:image` | `${SITE_URL}${path}` se absolute URL |
| `twitter:title`, `twitter:description`, `twitter:image` | upsert |
| `link rel="canonical"` | `${SITE_URL}${path}` |
| `meta name="robots"` | `noIndex` true → `noindex, nofollow`, warna `index, follow` |
| JSON-LD scripts | Purane `data-seo-jsonld` scripts remove karke naye inject |

### 3.2 Constants
```ts
export const SITE_URL = "https://gyanixacademy.com";
export const SITE_NAME = "Gyanix Academy";
```

### 3.3 Reusable JSON-LD blocks (module level export)
- `organizationJsonLd` → Har page par reuse
- `websiteJsonLd` → Home, About, Contact par

> **Benefit:** SEO data ek jagah centralized hai — aage change karna easy. Har page ke `jsonLd` props mein `organizationJsonLd` pass ho raha hai isliye rich results har page par mil sakte hain.

---

## 4. Page-wise <Seo /> Implementations

Har page par naya `import { Seo, ... } from "@/components/seo"` + `<Seo />` block add kiya. Yeh sab pages:

| Page | Unique Title (Google SERP mein dikhta hai) | JSON-LD Types |
|---|---|---|
| `/` (home) | "Gyanix Academy – Best Coaching Institute in Kaithal for IIT-JEE, NEET, NDA" | `org` + `WebSite` + `FAQPage` (4 Q&A) |
| `/about` | "About Gyanix Academy – Coaching Institute in Kaithal, Haryana" | `org` + `WebSite` |
| `/courses` | "Courses at Gyanix Academy – IIT-JEE, NEET, NDA, CUET Coaching in Kaithal" | `org` + `ItemList` (8 courses) |
| `/scholarship` | "G-SET Scholarship – Up to 100% Fee Waiver \| Gyanix Academy Kaithal" | `org` + `FAQPage` (2 Q&A) |
| `/results` | "Results & Achievements – Gyanix Academy Toppers in Kaithal" | `org` |
| `/gallery` | "Photo Gallery – Life at Gyanix Academy Kaithal" | `org` |
| `/faculty` | "Faculty at Gyanix Academy – Expert IIT-JEE, NEET & NDA Teachers in Kaithal" | `org` + `ItemList` (4 Persons) |
| `/contact` | "Contact Gyanix Academy – Coaching Institute Kaithal \| Call 89501-75314" | `org` + `WebSite` |
| 404 | "Page Not Found – Gyanix Academy" | none, `noIndex` |

### 4.1 Home — FAQPage JSON-LD (Google rich results mein Q&A)
`faqJsonLd` 4 questions ke sath:
1. Which competitive exams does Gyanix Academy prepare students for? → IIT-JEE, NEET, NDA & Defence, CUET, RMS & Sainik School...
2. Where is Gyanix Academy located? → Karnal Road, Street No. 4, Near New Bus Stand, Defence Colony, Kaithal...
3. Does Gyanix Academy offer scholarships? → G-SET up to 100% fee waiver...
4. Does Gyanix Academy provide hostel facilities? → Yes, safe residential hostel...

> FAQPage schema = Google search mein expansion faq dikh sakta hai.

### 4.2 Courses — ItemList schema
- `ItemList` jisme 8 courses `ListItem` ke roop mein dale gaye
- Har item: `position`, `name`, `description`
- Course card headings `h1` → `h2` kiye (heading hierarchy fix) ✅

### 4.3 Faculty — ItemList + Person schema
- `ItemList` jisme har faculty `ListItem` → `item: { "@type": "Person", name, jobTitle }`
- Example: `"Dr. Rajesh Kumar"`, `"Physics Faculty"`

### 4.4 Scholarship — FAQPage schema
2 questions: "What is the G-SET scholarship?" aur "Is G-SET registration free?"

### 4.5 404 page — noindex
`Seo noIndex` ke sath → 404 page Google index main nahi jayega.

---

## 5. Structured Data (JSON-LD) Schema Types

### 5.1 EducationalOrganization + LocalBusiness (har page)
`index.html` mein static + `seo.tsx` mein `organizationJsonLd`. Fields:
- `name`, `url`, `logo`, `image`
- `telephone: "+91-8950175314"`, `email`
- `address` → `PostalAddress`: Karnal Road, Street No. 4, Near New Bus Stand, Defence Colony, Kaithal, Haryana, 136027, India
- `geo` → lat `29.797647`, lng `76.4252486`
- `openingHoursSpecification` (Mon–Sat, 09:00–19:00)
- `priceRange: "₹₹"`, `currenciesAccepted: "INR"`, `paymentAccepted`
- `sameAs`: Facebook + Instagram (social signals)

> Ye local SEO ka sabse powerful piece hai — Google Business Profile se match karta hai to Google Maps/local pack ranking improve hoti hai.

### 5.2 WebSite schema
```json
{ "@type": "WebSite", "name": "Gyanix Academy", "url": "https://gyanixacademy.com" }
```

### 5.3 FAQPage schema (Home + Scholarship)
Google ke FAQ rich results ke liye.

### 5.4 ItemList schema (Courses + Faculty)
Content ko structured list ke roop mein Google ko samjhana.

---

## 6. Sitemap.xml

**File:** `artifacts/gyanix-academy/public/sitemap.xml` (naya banaya gaya, 8 pages)

| URL | Lastmod | Changefreq | Priority |
|---|---|---|---|
| `/` | 2026-09-08 | weekly | 1.0 |
| `/about` | 2026-09-08 | monthly | 0.8 |
| `/courses` | 2026-09-08 | weekly | 0.9 |
| `/scholarship` | 2026-09-08 | monthly | 0.9 |
| `/results` | 2026-09-08 | monthly | 0.7 |
| `/gallery` | 2026-09-08 | monthly | 0.5 |
| `/faculty` | 2026-09-08 | monthly | 0.7 |
| `/contact` | 2026-09-08 | monthly | 0.8 |

- Priority + changefreq se Google ko bataya kaunsa page kitna important hai.
- `/` sabse zyada priority (1.0), gallery sabse kam (0.5).

---

## 7. Robots.txt

**File:** `artifacts/gyanix-academy/public/robots.txt` (naya banaya gaya)

```txt
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin
Disallow: /*?*

Sitemap: https://gyanixacademy.com/sitemap.xml
```

| Line | Kya karta hai |
|---|---|
| `Allow: /` | Saare public pages crawl ho sakte hain |
| `Disallow: /api/` | API endpoints crawl nahi honge (crawl budget bachata hai) |
| `Disallow: /admin` | Admin area Google se chhupa (security) |
| `Disallow: /*?*` | Query strings/indexed params ko block karta hai (duplicate content ghata) |
| `Sitemap:` line | Google ko sitemap file ka path bataata hai |

---

## 8. Prerendering — scripts/prerender.mjs

**File:** `artifacts/gyanix-academy/scripts/prerender.mjs` (189 lines, naya banaya gaya)
**Trigger:** `package.json` mein `"postbuild": "node scripts/prerender.mjs"` add kiya → `npm run build` ke baad automatically chalta hai.

### 8.1 Problem jo ye solve karta hai
SPA ka `index.html` har route ke liye same hota hai. Google pure SPA ko render kar sakta hai, lekin **direct URL load** (Social preview, WhatsApp) par hamesha sabse pehle raw HTML dikhti hai. Prerender se static HTML ka **Snapshot** banta hai.

### 8.2 Kya karta hai (build ke baad)
Har route ke liye `dist/public/` mein static HTML files banata hai:
- `/` → `dist/public/index.html` + `dist/public/200.html`
- `/about` → `dist/public/about/index.html`
- `/courses` → `dist/public/courses/index.html`
- ... (saare 8 routes)
- 404 → `dist/public/404.html` (with `noindex` robots)

### 8.3 Har prerendered page mein replace hota hai
- `<title>` → route-specific title
- `meta description` → route-specific description
- `<link rel="canonical">` → route-specific canonical URL
- `og:title`, `og:description` → route-specific
- `twitter:title`, `twitter:description` → route-specific
- JSON-LD blocks → route ke schema se replace

> **Result:** Waise bhi dobara search engine aur WhatsApp preview ko har URL par fully SEO-ready static HTML milta hai — JS load hone ka wait nahi karna padta.

---

## 9. Image SEO — alt / lazy / decoding

Saare pages par images ko SEO-friendly banaya:

### 9.1 Descriptive alt text (keyword-rich, specific)
Pehle generic alt the (`"Topper Celebration"`, `"Modern Classroom at Gyanix Academy"`), ab descriptive:
- `"Gyanix Academy JEE topper Anuj Saharan celebrating success"`
- `"Modern classroom interior at Gyanix Academy Kaithal"`
- `"${course.title} coaching at Gyanix Academy Kaithal"` (courses page — dynamic)
- `"${member.name}, ${member.subject} faculty at Gyanix Academy"` (faculty page — dynamic)
- Gallery ki saari 6 images ka alt "Gyanix Academy" se enrich kiya

### 9.2 loading="lazy" + decoding="async"
Har `<img>` par:
```html
loading="lazy" decoding="async"
```
- `loading="lazy"` → jo images viewport se bahar hain wo tabhi load hoti hain jab scroll karo → **Page Speed faster → Core Web Vitals better → SEO better**
- `decoding="async"` → image decoding main thread ko block nahi karta
- Courses hero image ko `alt="" aria-hidden="true"` diya (decorative image — screen reader ko aur SEO ko bata raha hai ye decorative hai)

---

## 10. Accessibility SEO — Form Labels (htmlFor/id)

**File:** `artifacts/gyanix-academy/src/pages/contact.tsx`

Contact form ke sab labels ko inputs se connect kiya:
- `<label htmlFor="contact-name">` ↔ `<Input id="contact-name">`
- `<label htmlFor="contact-email">` ↔ `<Input id="contact-email">`
- `<label htmlFor="contact-course">` ↔ `<select id="contact-course">`
- `<label htmlFor="contact-message">` ↔ `<Textarea id="contact-message">`

> **Benefit:** Form accessibility (WCAG) improve hui — assistive tech aur crawlers ke liye form fields clear hain. Google accessibility ko ranking factor consider karta hai.

---

## 11. Internal Linking & Content SEO

Search engines ko site ki pages ke beech ready raste chahiye (internal links). In changes se aur links aaye:

| Page | Naya Internal Link |
|---|---|
| **home.tsx** | "Explore our full Hall of Fame results" → `/results` |
| **about.tsx** | "Explore Our Courses" button → `/courses` + "Contact Us Today" → `/contact` |
| **courses.tsx** | "Browse our faculty profiles" → `/faculty` + "Taught by our expert IIT, NEET & NDA educators" content |
| **courses.tsx** | Course card headings `h1` → `h2` (heading hierarchy fix for SEO + semantics) |

> Internal links = Google ko link juice distribute hota hai aur users ko site ke ander explore karne ke raste milte hain.

---

## 12. Security / Crawl-Budget Protection — Rate Limiting

**File:** `artifacts/api-server/src/middleware/rate-limit.ts` (naya)
**Updated file:** `artifacts/api-server/src/routes/index.ts`

Express rate-limit middleware — bot/spam se bachata hai (form spam, chatbot API abuse):

| Limiter | Limit | Use par |
|---|---|---|
| `formLimiter` | **5 requests / 15 min / IP** | `/api/enquiry` + `/api/gset-register` |
| `chatLimiter` | **20 requests / 15 min / IP** | `/api/chat` |

- **Chatbot error message:** `"Bahut zyada requests ho gayi hain. Kripya 15 minute baad try karein."` (Hindi)
- **Chat route** mein extra validation: message max **1000 characters** (`MAX_MESSAGE_LENGTH`) — message too lamba hone par `400` error.
- `routes/index.ts` mein limiter mount kiye: `router.use(formLimiter, enquiryRouter)` etc.

> **SEO connection:** spam se site ka domain reputation kharab hota hai, resources waste hote hain, aur valid users ka experience khartab hota hai — dono ranking / user signals ko nuksan pahunchate hain.

---

## 13. Deployment Config SEO — vercel.json / 200.html / 404.html

### 13.1 vercel.json (SEO-friendly rewrites)
```json
{ "cleanUrls": true, "rewrites": [ { "source": "/api/:path*", ... } ] }
```
- `cleanUrls: true` → URLs mein `.html` nahi dikhta (`/about` bana rehta hai, `/about.html` nahi).
- SPA routes non-asset URLs par `/index.html` par rewrite hote hain (Vercel default).
- API requests Render-hosted API par proxy hote hain.

### 13.2 prerender se banne wali 200.html / 404.html
- `200.html` → PWA-style fallback (SSR hosts par) — har route ko SEO HTML serve hota hai.
- `404.html` → Proper 404 page with `noindex, nofollow` → Google 404 URLs index nahi karta.

### 13.3 .replit (Replit host)
- Build latch: prerender `postbuild` hook se automatically chalkar static HTML files banati hain production deploy par.

---

## 14. Final Summary

### Kotrol haath mein: 2 files nayi + 13+ files modify kiya

#### Naye banaye gaye files (3)
| File | Role |
|---|---|
| `src/components/seo.tsx` | Dynamic SEO engine (title, meta, canonical, OG, JSON-LD) |
| `scripts/prerender.mjs` | Build-time static HTML prerendering (8 pages + 404) |
| `src/middleware/rate-limit.ts` | API spam protection (forms + chatbot) |

#### Sabse important coding changes (top-5)
1. **JSON-LD Structured Data** — `EducationalOrganization`/`LocalBusiness` block har page par + `FAQPage` (home, scholarship) + `ItemList` (courses, faculty). → **Local SEO + Rich Results**
2. **Prerendering (`prerender.mjs`)** — har URL ke liye SEO-ready static HTML build ke waqt ban jaati hai → **SPA ka sabse bada SEO drawback solve**
3. **SEO meta engine (`seo.tsx`)** — unique title/description/canonical/OG har page par → **Duplicate titles khatam, better CTR in SERP**
4. **sitemap.xml + robots.txt** — Google ko saare pages index karne ka naksa diya, crawlers ko /api/ aur query strings se bachaya → **Faster indexing, crawl budget bacha**
5. **Image + Accessibility + Internal Links** — descriptive alt, lazy loading, form labels, cross-page links → **Better speed, better accessibility, more link juice**

#### Page-wise SEO audit result
| Page | Title | Description | Canonical | OG/Twitter | JSON-LD |
|---|---|---|---|---|---|
| Home | ✅ | ✅ | ✅ | ✅ | org+WebSite+FAQ |
| About | ✅ | ✅ | ✅ | ✅ | org+WebSite |
| Courses | ✅ | ✅ | ✅ | ✅ | org+ItemList |
| Scholarship | ✅ | ✅ | ✅ | ✅ | org+FAQ |
| Results | ✅ | ✅ | ✅ | ✅ | org |
| Gallery | ✅ | ✅ | ✅ | ✅ | org |
| Faculty | ✅ | ✅ | ✅ | ✅ | org+ItemList |
| Contact | ✅ | ✅ | ✅ | ✅ | org+WebSite |
| 404 | ✅(noindex) | ✅ | — | — | — |

#### SEO keywords covered
- **Sarvadic:** kaithal, haryana, coaching institute, residential, school+coaching+hostel
- **Exams:** IIT-JEE, NEET, NDA, CUET, Sainik School, RMS, Olympiads
- **Proof:** 5.0★ Google, 5.0★ Justdial, 95% success, 100% board pass
- **Toppers:** Anuj Saharan, Priya Malik, Rahul Verma, Sneha Gupta
- **Contact:** 89501-75314 / 89502-75314