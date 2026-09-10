import { rateLimit } from "express-rate-limit";

const RATE_LIMIT_MESSAGE = {
  error:
    "Bahut zyada requests ho gayi hain. Kripya 15 minute baad try karein.",
};

const sharedOptions = {
  standardHeaders: true,
  legacyHeaders: false,
  message: RATE_LIMIT_MESSAGE,
};

/**
 * Forms (enquiry + G-SET registration): max 5 requests per 15 min per IP.
 * Blocks automated form spam.
 */
export const formLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  ...sharedOptions,
});

/**
 * Chatbot: max 20 requests per 15 min per IP.
 * Higher than forms for normal conversation, but still protects the Groq
 * API budget from abuse.
 */
export const chatLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  ...sharedOptions,
});
