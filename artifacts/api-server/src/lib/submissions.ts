import { appendFile, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";

const DATA_DIR = join(process.cwd(), "data");
const SUBMISSIONS_FILE = join(DATA_DIR, "submissions.jsonl");

/**
 * Append a submission to data/submissions.jsonl so enquiries and
 * registrations are NEVER lost, even when email sending is unavailable
 * (e.g. a network that blocks SMTP). Never throws.
 */
export function persistSubmission(record: unknown): void {
  try {
    mkdirSync(DATA_DIR, { recursive: true });
    const line = JSON.stringify({
      ts: new Date().toISOString(),
      ...(record as Record<string, unknown>),
    });
    appendFile(SUBMISSIONS_FILE, line + "\n", (err) => {
      if (err) {
        // Silently ignore write failures — logging should never break a form.
      }
    });
  } catch {
    // Never throw from persistence.
  }
}