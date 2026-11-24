import { createHmac, timingSafeEqual } from "node:crypto";
import { CONTACT } from "@/lib/site-links";

const UUID_V4 = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const HEX_SHA256 = /^[0-9a-f]{64}$/i;
const ISO_TIMESTAMP = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
const MAX_WEBHOOK_AGE_MS = 5 * 60 * 1000;
const BREVO_TIMEOUT_MS = 3_500;
const FORMSPARK_DASHBOARD = "https://dashboard.formspark.io/";
const NOTICE = "Eine Nachricht über die Homepage ist eingegangen.";

type NotificationLead = { id: string; kind: "contact" | "fenster"; createdAt: string };

export function getBrevoNotificationConfig() {
  const webhookSecret = process.env.FORMSPARK_WEBHOOK_SECRET?.trim();
  const proofKey = process.env.RECAPTCHA_SECRET_KEY?.trim();
  const apiKey = process.env.BREVO_API_KEY?.trim();
  return webhookSecret && proofKey && apiKey ? { webhookSecret, proofKey, apiKey } : null;
}

export function notificationLead(payload: Record<string, unknown>): NotificationLead | null {
  const contactId = payload.contact_id;
  const windowId = payload.lead_id;
  const createdAt = payload.created_at;
  const id = contactId ?? windowId;
  if (
    (contactId != null && windowId != null) ||
    typeof id !== "string" || !UUID_V4.test(id) ||
    typeof createdAt !== "string" || !ISO_TIMESTAMP.test(createdAt)
  ) return null;

  return { id, kind: contactId ? "contact" : "fenster", createdAt };
}

function safeHashMatches(expected: Buffer, supplied: unknown): boolean {
  return typeof supplied === "string" && HEX_SHA256.test(supplied) &&
    timingSafeEqual(expected, Buffer.from(supplied, "hex"));
}

export function verifyFormsparkSignature(headers: Headers, rawBody: Buffer, secret: string): boolean {
  const timestamp = headers.get("formspark-timestamp");
  const signature = headers.get("formspark-signature");
  if (!timestamp || !/^\d{10,11}$/.test(timestamp) || !signature?.startsWith("v1=")) return false;
  if (Math.abs(Date.now() - Number(timestamp) * 1000) > MAX_WEBHOOK_AGE_MS) return false;

  const expected = createHmac("sha256", secret).update(`${timestamp}.`).update(rawBody).digest();
  return safeHashMatches(expected, signature.slice(3));
}

function proofForLead(lead: NotificationLead, secret: string): Buffer {
  return createHmac("sha256", secret)
    .update(`ergart-website-notification-v1\n${lead.kind}\n${lead.id}\n${lead.createdAt}`)
    .digest();
}

/** Bestätigt den Weg über die Ergart-Formularprüfung zusätzlich zur Webhook-Signatur. */
export function notificationProof(lead: NotificationLead, secret: string): string {
  return proofForLead(lead, secret).toString("hex");
}

export function trustedNotificationLead(payload: Record<string, unknown>, secret: string): NotificationLead | null {
  const lead = notificationLead(payload);
  return lead && safeHashMatches(proofForLead(lead, secret), payload.notification_proof) ? lead : null;
}

function dashboardUrl(): string {
  try {
    const url = new URL(process.env.FORMSPARK_DASHBOARD_URL || FORMSPARK_DASHBOARD);
    if (url.origin === "https://dashboard.formspark.io" && !url.username && !url.password) {
      return url.href.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
    }
  } catch {
    // Ein fehlerhafter optionaler Link darf den Mailversand nicht aufhalten.
  }
  return FORMSPARK_DASHBOARD;
}

function notificationHtml(): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
  <tr><td align="center" style="padding:20px 12px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;font-family:Arial,sans-serif">
      <tr><td bgcolor="#F4F8FF" style="padding:26px;background:#F4F8FF;border:1px solid #DCE8F7;border-radius:16px">
        <p style="margin:0 0 10px;color:#0061C2;font-size:12px;font-weight:bold;letter-spacing:1px">ALEXANDER ERGART</p>
        <p style="margin:0;color:#17212B;font-size:18px;line-height:1.45">${NOTICE}</p>
        <p style="margin:18px 0 0"><a href="${dashboardUrl()}" style="display:inline-block;padding:10px 15px;background:#0061C2;border-radius:9px;color:#ffffff;font-size:14px;font-weight:bold;text-decoration:none">Anfragen öffnen</a></p>
      </td></tr>
    </table>
  </td></tr>
</table>`;
}

export async function deliverBrevoNotification(lead: NotificationLead, apiKey: string): Promise<boolean> {
  const topic = lead.kind === "fenster" ? "Neue Fensteranfrage" : "Neue Kontaktanfrage";
  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      sender: { name: "Ergart Portal", email: "system@alexander-ergart.de" },
      to: [{ email: CONTACT.email }],
      subject: `Ergart | ${topic} (${lead.id.slice(0, 8)})`,
      htmlContent: notificationHtml(),
      headers: { idempotencyKey: lead.id },
    }),
    redirect: "error",
    signal: AbortSignal.timeout(BREVO_TIMEOUT_MS),
  });
  if (res.status === 201) return true;

  const error = await res.json().catch(() => null);
  if (
    res.status === 400 && error?.code === "duplicate_parameter" &&
    typeof error.message === "string" && /idempotency/i.test(error.message)
  ) {
    return true;
  }

  console.error("[lead-notifications] brevo_rejected", { status: res.status });
  return false;
}
