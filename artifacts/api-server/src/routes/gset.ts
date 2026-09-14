import { Router, type IRouter } from "express";
import { logger } from "../lib/logger";
import { trySendEmail } from "../lib/mailer";
import { persistSubmission } from "../lib/submissions";

const router: IRouter = Router();

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME = 100;
const MAX_EMAIL = 254;
const MAX_FIELD = 100;

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

router.post("/gset-register", async (req, res) => {
  const { name, email, currentClass, targetExam } = req.body as {
    name?: string;
    email?: string;
    currentClass?: string;
    targetExam?: string;
  };

  if (!name?.trim() || !email?.trim() || !currentClass?.trim() || !targetExam?.trim()) {
    res.status(400).json({ error: "All fields are required." });
    return;
  }

  const trimName = name.trim();
  const trimEmail = email.trim();
  const trimClass = currentClass.trim();
  const trimExam = targetExam.trim();

  if (trimName.length > MAX_NAME || trimEmail.length > MAX_EMAIL || trimClass.length > MAX_FIELD || trimExam.length > MAX_FIELD) {
    res.status(400).json({ error: "One or more fields exceed the maximum allowed length." });
    return;
  }

  if (!EMAIL_REGEX.test(trimEmail)) {
    res.status(400).json({ error: "Please enter a valid email address." });
    return;
  }

  // Always log so registration is never silently lost
  logger.info({ name: trimName, email: trimEmail, currentClass: trimClass, targetExam: trimExam }, "New G-SET registration");
  persistSubmission({ type: "gset-registration", name: trimName, email: trimEmail, currentClass: trimClass, targetExam: trimExam });

  const html = `
    <div style="font-family:sans-serif;max-width:560px;margin:0 auto;">
      <h2 style="background:#1a2e6e;color:#fff;padding:16px 20px;margin:0;border-radius:8px 8px 0 0;">
        New G-SET Registration — Gyanix Academy
      </h2>
      <div style="border:1px solid #e5e7eb;border-top:none;padding:24px;border-radius:0 0 8px 8px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px 0;color:#6b7280;width:130px;">Name</td><td style="padding:8px 0;font-weight:600;">${escapeHtml(trimName)}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;">Email</td><td style="padding:8px 0;"><a href="mailto:${escapeHtml(trimEmail)}">${escapeHtml(trimEmail)}</a></td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;">Current Class</td><td style="padding:8px 0;">${escapeHtml(trimClass)}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;">Target Exam</td><td style="padding:8px 0;">${escapeHtml(trimExam)}</td></tr>
        </table>
        <p style="margin-top:20px;font-size:12px;color:#9ca3af;">Sent from Gyanix Academy G-SET registration form.</p>
      </div>
    </div>
  `;

  // Send notification email in the background so the form responds instantly.
  // Email failure never blocks the submission — data is already logged above.
  void trySendEmail({
    subject: `New G-SET Registration: ${trimName} — ${trimExam} (${trimClass})`,
    html,
    replyTo: trimEmail,
  }).then((sent) => {
    if (sent) {
      logger.info({ name: trimName, email: trimEmail, currentClass: trimClass, targetExam: trimExam }, "G-SET registration email sent");
    } else {
      logger.warn({ name: trimName, email: trimEmail }, "G-SET registration email not sent — submission still accepted");
    }
  });

  res.json({ success: true });
});

export default router;
