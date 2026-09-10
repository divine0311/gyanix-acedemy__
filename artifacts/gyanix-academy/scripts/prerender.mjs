import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const SITE_URL = "https://gyanixacademy.com";
const outDir = resolve(fileURLToPath(new URL(".", import.meta.url)), "..", "dist", "public");

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": ["EducationalOrganization", "LocalBusiness"],
  name: "Gyanix Academy",
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/og-image.png`,
  image: `${SITE_URL}/og-image.png`,
  telephone: "+91-8950175314",
  email: "gyanixacademy@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Karnal Road, Street No. 4, Near New Bus Stand, Defence Colony",
    addressLocality: "Kaithal",
    addressRegion: "Haryana",
    postalCode: "136027",
    addressCountry: "IN",
  },
  geo: { "@type": "GeoCoordinates", latitude: 29.797647, longitude: 76.4252486 },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "19:00",
    },
  ],
  priceRange: "₹₹",
  openingHours: "Mo-Sa 09:00-19:00",
  sameAs: ["https://facebook.com/GyanixAcademy", "https://instagram.com/gyanix_academy"],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Gyanix Academy",
  url: `${SITE_URL}/`,
};

const routes = [
  {
    path: "/",
    slug: "index",
    title: "Gyanix Academy – Best Coaching Institute in Kaithal for IIT-JEE, NEET, NDA",
    description:
      "Gyanix Academy is Kaithal's top-rated coaching institute for IIT-JEE, NEET, NDA, CUET, RMS & Sainik School. Expert faculty, residential hostel, 5★ rated. Enrol now.",
    jsonLd: [orgJsonLd, websiteJsonLd],
  },
  {
    path: "/about",
    title: "About Gyanix Academy – Coaching Institute in Kaithal, Haryana",
    description:
      "Learn about Gyanix Academy — Kaithal's complete School · Coaching · Hostel institute founded in 2025 with a 5.0★ rating. Discover our mission, vision and why students choose us.",
    jsonLd: [orgJsonLd, websiteJsonLd],
  },
  {
    path: "/courses",
    title: "Courses at Gyanix Academy – IIT-JEE, NEET, NDA, CUET Coaching in Kaithal",
    description:
      "Explore Gyanix Academy's coaching programs in Kaithal: IIT-JEE, NEET, NDA & Defence, CUET, RMS & Sainik School, School Boards, Olympiads and Pre-Foundation.",
    jsonLd: [orgJsonLd],
  },
  {
    path: "/scholarship",
    title: "G-SET Scholarship – Up to 100% Fee Waiver | Gyanix Academy Kaithal",
    description:
      "Apply for the Gyanix Scholarship Entrance Test (G-SET) at Gyanix Academy Kaithal and secure up to 100% tuition fee waiver for IIT-JEE, NEET and NDA batches. Free to register.",
    jsonLd: [orgJsonLd],
  },
  {
    path: "/results",
    title: "Results & Achievements – Gyanix Academy Toppers in Kaithal",
    description:
      "See Gyanix Academy's proven results: District & State rankers in JEE, NEET and NDA, a 95% success rate and 100% board pass rate. Join the Hall of Fame.",
    jsonLd: [orgJsonLd],
  },
  {
    path: "/gallery",
    title: "Photo Gallery – Life at Gyanix Academy Kaithal",
    description:
      "Browse the Gyanix Academy photo gallery — classrooms, events, award ceremonies and the vibrant learning environment at our coaching institute in Kaithal.",
    jsonLd: [orgJsonLd],
  },
  {
    path: "/faculty",
    title: "Faculty at Gyanix Academy – Expert IIT-JEE, NEET & NDA Teachers in Kaithal",
    description:
      "Meet the expert faculty at Gyanix Academy Kaithal — experienced IIT-JEE, NEET, NDA and CUET educators dedicated to your competitive exam success.",
    jsonLd: [orgJsonLd],
  },
  {
    path: "/contact",
    title: "Contact Gyanix Academy – Coaching Institute Kaithal | Call 89501-75314",
    description:
      "Contact Gyanix Academy in Defence Colony, Kaithal. Call 89501-75314 / 89502-75314, WhatsApp us, or send an enquiry. Open Mon–Sat 9 AM to 7 PM.",
    jsonLd: [orgJsonLd, websiteJsonLd],
  },
];

function setHtml(regex, replacement, html) {
  return html.replace(regex, replacement);
}

function buildHtml(route) {
  const base = readFileSync(join(outDir, "index.html"), "utf8");
  const canonical = route.path === "/" ? `${SITE_URL}/` : `${SITE_URL}${route.path}`;

  let html = base;

  html = setHtml(/<title>.*?<\/title>/, `<title>${route.title}</title>`, html);
  html = setHtml(
    /<meta name="description" content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${route.description}" />`,
    html,
  );
  html = setHtml(
    /<link rel="canonical" href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${canonical}" />`,
    html,
  );
  html = setHtml(
    /<meta property="og:title" content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${route.title}" />`,
    html,
  );
  html = setHtml(
    /<meta property="og:description" content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${route.description}" />`,
    html,
  );
  html = setHtml(
    /<meta name="twitter:title" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:title" content="${route.title}" />`,
    html,
  );
  html = setHtml(
    /<meta name="twitter:description" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:description" content="${route.description}" />`,
    html,
  );

  const jsonLdHtml = route.jsonLd
    .map((b) => `<script type="application/ld+json">${JSON.stringify(b)}</script>`)
    .join("\n    ");

  html = html.replace(
    /<!-- Structured Data[\s\S]*?(<script type="application\/ld\+json">[\s\S]*?<\/script>\s*)+/,
    `<!-- Structured Data -->\n    ${jsonLdHtml}\n    `,
  );

  return html;
}

if (!existsSync(join(outDir, "index.html"))) {
  console.error(`dist/public/index.html not found at ${outDir}. Run 'vite build' first.`);
  process.exit(1);
}

for (const route of routes) {
  const html = buildHtml(route);
  if (route.path === "/") {
    writeFileSync(join(outDir, "index.html"), html);
    writeFileSync(join(outDir, "200.html"), html);
  } else {
    const targetDir = join(outDir, route.path.replace(/^\//, ""));
    mkdirSync(targetDir, { recursive: true });
    writeFileSync(join(targetDir, "index.html"), html);
  }
  console.log(`✓ prerendered ${route.path}`);
}

const home = readFileSync(join(outDir, "index.html"), "utf8");
const notFoundTitle = "Page Not Found – Gyanix Academy";
const notFoundDesc =
  "The page you are looking for could not be found. Visit Gyanix Academy's homepage to explore IIT-JEE, NEET and NDA coaching in Kaithal.";
const notFound = setHtml(/<title>.*?<\/title>/, `<title>${notFoundTitle}</title>`, setHtml(
  /<meta name="robots" content="[^"]*"[^>]*\/?>/,
  '<meta name="robots" content="noindex, nofollow" />',
  home,
));
writeFileSync(join(outDir, "404.html"), notFound);
console.log("✓ prerendered /404.html");
console.log("Prerendering complete.");
