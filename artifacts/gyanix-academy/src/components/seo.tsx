import { useEffect } from "react";

export const SITE_URL = "https://gyanixacademy.com";
export const SITE_NAME = "Gyanix Academy";

interface SeoProps {
  title: string;
  description: string;
  path?: string;
  type?: string;
  image?: string;
  noIndex?: boolean;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function Seo({
  title,
  description,
  path = "/",
  type = "website",
  image = "/og-image.png",
  noIndex = false,
  jsonLd,
}: SeoProps) {
  useEffect(() => {
    document.title = title;
    upsertMeta("name", "description", description);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", `${SITE_URL}${path}`);
    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:image", `${SITE_URL}${image}`);
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", `${SITE_URL}${image}`);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", `${SITE_URL}${path}`);

    const robots = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (robots) {
      robots.setAttribute("content", noIndex ? "noindex, nofollow" : "index, follow");
    }

    const jsonLdScripts = document.head.querySelectorAll<HTMLScriptElement>('script[data-seo-jsonld]');
    jsonLdScripts.forEach((s) => s.remove());

    const blocks = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];
    blocks.forEach((block) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-seo-jsonld", "true");
      script.textContent = JSON.stringify(block);
      document.head.appendChild(script);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, path, type, image, noIndex, JSON.stringify(jsonLd)]);

  return null;
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": ["EducationalOrganization", "LocalBusiness"],
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/og-image.png`,
  image: `${SITE_URL}/og-image.png`,
  description:
    "Gyanix Academy — Kaithal's top-rated residential coaching institute for IIT-JEE, NEET, NDA, CUET, RMS & Sainik School, School Boards and Olympiads.",
  telephone: "+91-8950175314",
  email: "gyanixacademy@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "Karnal Road, Street No. 4, Near New Bus Stand, Defence Colony",
    addressLocality: "Kaithal",
    addressRegion: "Haryana",
    postalCode: "136027",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 29.797647,
    longitude: 76.4252486,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "09:00",
      closes: "19:00",
    },
  ],
  priceRange: "₹₹",
  currenciesAccepted: "INR",
  paymentAccepted: "Cash, Credit Card, UPI, Bank Transfer",
  sameAs: [
    "https://facebook.com/GyanixAcademy",
    "https://instagram.com/gyanix_academy",
  ],
  // Keep legacy "openingHours" for broad compatibility
  openingHours: "Mo-Sa 09:00-19:00",
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  publisher: { "@type": "Organization", name: SITE_NAME },
};
