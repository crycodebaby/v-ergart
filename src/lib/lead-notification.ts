import { createHmac, timingSafeEqual } from "node:crypto";
import { CONTACT_EMAIL_PATTERN, CONTACT_LIMITS } from "@/lib/contact-lead";

const UUID_V4 = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const HEX_SHA256 = /^[0-9a-f]{64}$/i;
const ISO_TIMESTAMP = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
const MAX_WEBHOOK_AGE_MS = 5 * 60 * 1000;
const BREVO_TIMEOUT_MS = 3_500;
const NOTICE = "Eine Nachricht über die Homepage ist eingegangen.";
const REPLY_HINT = "Klicken Sie in Gmail auf Antworten, um direkt auf diese Anfrage zu antworten.";

type NotificationLead = { id: string; kind: "contact" | "fenster"; createdAt: string };
type NotificationField = [label: string, value: string];
type NotificationDetails = {
  email: string;
  contact: NotificationField[];
  request: NotificationField[];
  message: string;
};
type TrustedNotificationLead = NotificationLead & { details: NotificationDetails | null };
type BrevoNotificationDelivery = {
  apiKey: string;
  recipient: string;
  copyRecipient?: string;
};

export function getBrevoNotificationConfig() {
  const webhookSecret = process.env.FORMSPARK_WEBHOOK_SECRET?.trim();
  const proofKey = process.env.RECAPTCHA_SECRET_KEY?.trim();
  const apiKey = process.env.BREVO_API_KEY?.trim();
  const recipient = process.env.BREVO_NOTIFICATION_RECIPIENT?.trim();
  const copyRecipient = process.env.BREVO_NOTIFICATION_COPY_RECIPIENT?.trim();
  if (!webhookSecret || !proofKey || !apiKey || !recipient) return null;
  if (recipient.length > CONTACT_LIMITS.email.max || !CONTACT_EMAIL_PATTERN.test(recipient)) return null;
  if (copyRecipient && (copyRecipient.length > CONTACT_LIMITS.email.max || !CONTACT_EMAIL_PATTERN.test(copyRecipient))) return null;
  return { webhookSecret, proofKey, apiKey, recipient, copyRecipient };
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

function notificationDetails(payload: Record<string, unknown>, kind: NotificationLead["kind"]): NotificationDetails {
  function value(key: string): string {
    const field = payload[key];
    return typeof field === "string" ? field : "";
  }

  const email = value("email");
  return {
    email,
    contact: [["Name", value("name")], ["E-Mail", email], ["Telefon", value("phone")]],
    request: kind === "fenster"
      ? [
          ["Anliegen", value("vorhaben")],
          ["Objektart", value("objektart")],
          ["Fensteranzahl", value("fensteranzahl")],
          ["Postleitzahl", value("plz")],
          ["Gewünschter Zeitraum", value("zeitraum")],
        ]
      : [["Anliegen", value("service")]],
    message: value("message"),
  };
}

function proofForDetails(lead: NotificationLead, details: NotificationDetails, secret: string): Buffer {
  return createHmac("sha256", secret)
    .update("ergart-website-notification-content-v1\n")
    .update(JSON.stringify([lead.kind, lead.id, lead.createdAt, details]))
    .digest();
}

/** Bindet die E-Mail-Daten an die serverseitig geprüfte Anfrage. */
export function notificationProofs(lead: NotificationLead, payload: Record<string, unknown>, secret: string) {
  const details = notificationDetails(payload, lead.kind);
  return {
    notification_proof: proofForLead(lead, secret).toString("hex"),
    notification_content_proof: proofForDetails(lead, details, secret).toString("hex"),
  };
}

export function trustedNotificationLead(payload: Record<string, unknown>, secret: string): TrustedNotificationLead | null {
  const lead = notificationLead(payload);
  if (!lead || !safeHashMatches(proofForLead(lead, secret), payload.notification_proof)) return null;

  // Bereits vor der Umstellung angenommene Anfragen erhalten den kurzen Hinweis.
  if (payload.notification_content_proof === undefined) return { ...lead, details: null };

  const details = notificationDetails(payload, lead.kind);
  return safeHashMatches(proofForDetails(lead, details, secret), payload.notification_content_proof)
    ? { ...lead, details }
    : null;
}

function escapeHtml(text: string): string {
  return text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

const SECTION_STYLE = "margin:20px 0 8px;padding-top:16px;border-top:1px solid #dce5ef;font-size:18px;line-height:24px;";

function fieldsHtml(title: string, fields: NotificationField[], titleStyle: string): string {
  if (fields.length === 0) return "";
  const items = fields.map(([label, value]) => `
    <dt style="margin:0;font-weight:bold;">${label}</dt>
    <dd style="margin:0 0 10px;">${escapeHtml(value)}</dd>`).join("");
  return `<h2 style="${titleStyle}">${title}</h2><dl style="margin:0;">${items}</dl>`;
}

function notificationHtml(topic: string, content: string): string {
  return `<table role="presentation" lang="de" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;margin:0;background-color:#f1f5f9;font-family:Arial,Helvetica,sans-serif;color:#17212b;">
  <tr><td align="center" style="padding:24px 12px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:580px;background-color:#ffffff;border:1px solid #dce5ef;border-radius:12px;">
      <tr><td bgcolor="#123153" style="padding:24px;color:#ffffff;background-color:#123153;border-radius:11px 11px 0 0;">
        <p style="margin:0 0 8px;color:#d7e7fa;font-size:13px;font-weight:bold;line-height:20px;">Alexander Ergart &middot; Hausmeister- &amp; Fensterservice</p>
        <h1 style="margin:0;color:#ffffff;font-size:24px;line-height:30px;">${topic}</h1>
      </td></tr>
      <tr><td style="padding:24px;font-size:16px;line-height:24px;overflow-wrap:anywhere;word-wrap:break-word;">${content}</td></tr>
    </table>
  </td></tr>
</table>`;
}

function notificationBody(topic: string, details: NotificationDetails | null) {
  if (!details) return { htmlContent: notificationHtml(topic, `<p>${NOTICE}</p>`), textContent: `${topic}\n\n${NOTICE}` };

  const email = details.email;
  const replyTo = email.length <= CONTACT_LIMITS.email.max && CONTACT_EMAIL_PATTERN.test(email) ? { email } : undefined;
  const contact = details.contact.filter(([, value]) => value);
  const request = details.request.filter(([, value]) => value);
  const htmlContent = notificationHtml(topic, `
    ${fieldsHtml("Kontakt", contact, "margin:0 0 8px;font-size:18px;line-height:24px;")}
    ${fieldsHtml("Zum Vorhaben", request, SECTION_STYLE)}
    ${details.message ? `<h2 style="${SECTION_STYLE}">Nachricht</h2>
    <div style="padding:14px 16px;background-color:#f1f5f9;border-radius:8px;white-space:pre-wrap;overflow-wrap:anywhere;word-wrap:break-word;">${escapeHtml(details.message)}</div>` : ""}
    ${replyTo ? `<p style="margin:22px 0 0;padding-top:16px;border-top:1px solid #dce5ef;color:#394b5e;font-size:14px;line-height:22px;">Klicken Sie in Gmail auf <strong>Antworten</strong>, um direkt auf diese Anfrage zu antworten.</p>` : ""}`);
  const textContent = [
    topic,
    contact.map(([label, value]) => `${label}: ${value}`).join("\n"),
    request.map(([label, value]) => `${label}: ${value}`).join("\n"),
    details.message ? `Nachricht:\n${details.message}` : "",
    replyTo ? REPLY_HINT : "",
  ].filter(Boolean).join("\n\n");

  return { htmlContent, textContent, replyTo };
}

export async function deliverBrevoNotification(
  lead: TrustedNotificationLead,
  { apiKey, recipient, copyRecipient }: BrevoNotificationDelivery,
): Promise<boolean> {
  const topic = lead.kind === "fenster" ? "Neue Fensteranfrage" : "Neue Kontaktanfrage";
  const bcc = copyRecipient && copyRecipient.toLowerCase() !== recipient.toLowerCase()
    ? [{ email: copyRecipient }]
    : undefined;
  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      sender: { name: "Ergart Website", email: "system@alexander-ergart.de" },
      to: [{ email: recipient }],
      bcc,
      subject: `Ergart | ${topic} (${lead.id.slice(0, 8)})`,
      ...notificationBody(topic, lead.details),
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
