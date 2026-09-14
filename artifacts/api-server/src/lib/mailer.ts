import nodemailer from "nodemailer";
import { logger } from "./logger";

/**
 * Max time (ms) we are willing to wait for SMTP to connect/send.
 * Keeps the forms responsive even when SMTP is slow or unreachable.
 */
const SMTP_TIMEOUT_MS = 8000;

interface MailInput {
  subject: string;
  html: string;
  replyTo: string;
}

function wait<T = never>(ms: number, reason: string): Promise<T> {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error(reason)), ms);
  });
}

/**
 * Option 1 (preferred): Resend — plain HTTPS API, works on any network
 * (port 443), no SMTP needed. Enable by setting RESEND_API_KEY.
 * https://resend.com/docs/api-reference/emails/send-email
 */
async function sendViaResend({ subject, html, replyTo }: MailInput): Promise<boolean> {
  const apiKey = process.env["RESEND_API_KEY"];
  const from = process.env["RESEND_FROM"] ?? "Gyanix Academy <onboarding@resend.dev>";
  const to = process.env["ENQUIRY_EMAIL"] ?? process.env["SMTP_USER"];

  if (!apiKey || !to) return false;

  try {
    const res = await Promise.race([
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: [to],
          reply_to: replyTo,
          subject,
          html,
        }),
      }),
      wait(10000, "Resend request timed out"),
    ]);

    if (!res.ok) {
      logger.error({ status: res.status, statusText: res.statusText }, "Resend API returned error");
      return false;
    }
    return true;
  } catch (err) {
    logger.error({ err }, "Resend send failed");
    return false;
  }
}

/**
 * Option 2 (fallback): Gmail SMTP via nodemailer. Some networks / ISPs
 * block outbound SMTP, so this is best-effort and never waits long.
 */
async function sendViaSmtp({ subject, html, replyTo }: MailInput): Promise<boolean> {
  const smtpUser = process.env["SMTP_USER"];
  const smtpPass = process.env["SMTP_PASS"];
  if (!smtpUser || !smtpPass) return false;

  const to = process.env["ENQUIRY_EMAIL"] ?? smtpUser;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: smtpUser, pass: smtpPass },
    connectionTimeout: SMTP_TIMEOUT_MS,
    socketTimeout: SMTP_TIMEOUT_MS,
    greetingTimeout: SMTP_TIMEOUT_MS,
  });

  try {
    await Promise.race([
      transporter.sendMail({
        from: `"Gyanix Academy Website" <${smtpUser}>`,
        to,
        replyTo,
        subject,
        html,
      }),
      wait(SMTP_TIMEOUT_MS, `SMTP send timed out after ${SMTP_TIMEOUT_MS}ms`),
    ]);
    return true;
  } catch (err) {
    logger.error({ err, to }, "SMTP send failed");
    return false;
  }
}

/**
 * Best-effort email notification. Never throws. Prefers the Resend HTTPS
 * API when RESEND_API_KEY is set, otherwise falls back to SMTP. A failed
 * email never blocks the form — the submission is already logged/persisted.
 */
export async function trySendEmail(input: MailInput): Promise<boolean> {
  if (process.env["RESEND_API_KEY"]) {
    const ok = await sendViaResend(input);
    if (ok) return true;
    logger.warn("Resend failed — falling back to SMTP");
  }
  return sendViaSmtp(input);
}