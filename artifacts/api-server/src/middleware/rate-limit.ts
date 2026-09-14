import { rateLimit } from "express-rate-limit";
import type { IncomingMessage } from "node:http";

/**
 * Resolve a positive integer from an env var, falling back to a default.
 * Lets users tune limits per environment without editing code:
 *   - RATE_LIMIT_WINDOW_MS   default 10 minutes
 *   - RATE_LIMIT_FORMS_MAX   default 5 per window
 *   - RATE_LIMIT_CHAT_MAX    default 20 per window
 */
function toPositiveInt(value: string | undefined, fallback: number): number {
  const n = Number.parseInt(value ?? "", 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

const WINDOW_MS = toPositiveInt(process.env["RATE_LIMIT_WINDOW_MS"], 10 * 60 * 1000);
const FORMS_MAX = toPositiveInt(process.env["RATE_LIMIT_FORMS_MAX"], 5);
const CHAT_MAX = toPositiveInt(process.env["RATE_LIMIT_CHAT_MAX"], 20);

const minutes = Math.max(1, Math.round(WINDOW_MS / 60_000));

/**
 * Correctly identify the end-user IP so rate limits are applied per real
 * visitor, not per proxy. The app is reached through proxy/edge providers
 * (Vercel rewrites → Render), so we read the FIRST entry of the
 * X-Forwarded-For header (the original client), clean up IPv6-mapped IPv4
 * (::ffff:127.0.0.1 → 127.0.0.1), and fall back to the socket address.
 */
function getClientIp(req: IncomingMessage): string {
  const xff = req.headers["x-forwarded-for"];
  let ip: string | undefined;
  if (typeof xff === "string" && xff.trim()) {
    ip = xff.split(",")[0]?.trim();
  } else if (Array.isArray(xff)) {
    ip = xff[0]?.trim();
  }
  if (!ip) {
    ip = req.headers["x-real-ip"]?.[0]
      ? String(req.headers["x-real-ip"])
      : (req as IncomingMessage & { ip?: string }).ip ?? req.socket.remoteAddress ?? undefined;
  }
  if (!ip) return "unknown";
  if (ip.startsWith("::ffff:")) ip = ip.slice(7);
  return ip;
}

const sharedOptions = {
  standardHeaders: true,
  legacyHeaders: true,
  keyGenerator: (req: IncomingMessage) => getClientIp(req),
  validate: { xForwardedForHeader: false },
  message: {
    error: `Bahut zyada requests ho gayi hain. Kripya ${minutes} minute baad try karein.`,
  },
};

/**
 * Enquiry form limiter (independent counter from G-SET registration).
 * Production default: 5 requests per 10 minutes per IP.
 */
export const enquiryLimiter = rateLimit({
  windowMs: WINDOW_MS,
  limit: FORMS_MAX,
  ...sharedOptions,
});

/**
 * G-SET registration form limiter (independent counter from enquiry).
 * Production default: 5 requests per 10 minutes per IP.
 */
export const gsetLimiter = rateLimit({
  windowMs: WINDOW_MS,
  limit: FORMS_MAX,
  ...sharedOptions,
});

/**
 * Chatbot limiter. Higher than forms for normal conversation, but still
 * protects the Groq API budget from abuse.
 * Production default: 20 requests per 10 minutes per IP.
 */
export const chatLimiter = rateLimit({
  windowMs: WINDOW_MS,
  limit: CHAT_MAX,
  ...sharedOptions,
});