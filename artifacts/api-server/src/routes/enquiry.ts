import { Router, type IRouter } from "express";
import nodemailer from "nodemailer";
import { logger } from "../lib/logger";

const router: IRouter = Router();

router.post("/enquiry", async (req, res) => {
  const { name, email, course, message } = req.body as {
    name?: string;
    email?: string;
    course?: string;
    message?: string;
  };

  if (!name || !email || !course || !message) {
    res.status(400).json({ error: "All fields are required." });
    return;
  }

  // Always log the enquiry so it's never silently lost
  logger.info({ name, email, course }, "New enquiry received");

  const smtpUser = process.env["SMTP_USER"];
  const smtpPass = process.env["SMTP_PASS"];
  const enquiryEmail = process.env["ENQUIRY_EMAIL"] ?? smtpUser;

  if (!smtpUser || !smtpPass) {
    logger.warn(
      "SMTP_USER or SMTP_PASS not configured — enquiry logged above, email not sent. " +
      "Set SMTP_USER, SMTP_PASS (and optionally ENQUIRY_EMAIL) in the .env file to enable email notifications."
    );
    // Still return success so form UX works even before credentials are set
    res.json({ success: true });
    return;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: smtpUser, pass: smtpPass },
  });

  const html = `
    <div style="font-family:sans-serif;max-width:560px;margin:0 auto;">
      <h2 style="background:#1a2e6e;color:#fff;padding:16px 20px;margin:0;border-radius:8px 8px 0 0;">
        New Enquiry — Gyanix Academy
      </h2>
      <div style="border:1px solid #e5e7eb;border-top:none;padding:24px;border-radius:0 0 8px 8px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px 0;color:#6b7280;width:130px;">Name</td><td style="padding:8px 0;font-weight:600;">${name}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;">Course</td><td style="padding:8px 0;">${course}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;vertical-align:top;">Message</td><td style="padding:8px 0;">${message.replace(/\n/g, "<br>")}</td></tr>
        </table>
        <p style="margin-top:20px;font-size:12px;color:#9ca3af;">Sent from Gyanix Academy website contact form.</p>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Gyanix Academy Website" <${smtpUser}>`,
      to: enquiryEmail,
      replyTo: email,
      subject: `New Enquiry: ${name} — ${course}`,
      html,
    });

    logger.info({ name, email, course }, "Enquiry email sent");
    res.json({ success: true });
  } catch (err) {
    logger.error({ err }, "Failed to send enquiry email");
    res.status(500).json({ error: "Failed to send message. Please try again." });
  }
});

export default router;
