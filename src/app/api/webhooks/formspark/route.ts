import { parseJsonObject, readRawBody } from "@/lib/lead-intake";
import {
  deliverBrevoNotification,
  getBrevoNotificationConfig,
  trustedNotificationLead,
  verifyFormsparkSignature,
} from "@/lib/lead-notification";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Die Fenster-Zusammenfassung kann einen bereits vorhandenen Nachrichtentext wiederholen.
const MAX_WEBHOOK_BODY_BYTES = 64 * 1024;

export async function POST(req: Request): Promise<Response> {
  const config = getBrevoNotificationConfig();
  if (!config) return new Response(null, { status: 503 });

  if (!req.headers.has("formspark-signature") || !req.headers.has("formspark-timestamp")) {
    return new Response(null, { status: 401 });
  }
  const contentType = req.headers.get("content-type")?.split(";")[0].trim().toLowerCase();
  if (contentType !== "application/json") {
    return new Response(null, { status: 415 });
  }

  const raw = await readRawBody(req, MAX_WEBHOOK_BODY_BYTES);
  if (!raw.ok) return new Response(null, { status: raw.reason === "too_large" ? 413 : 400 });
  if (!verifyFormsparkSignature(req.headers, raw.bytes, config.webhookSecret)) {
    return new Response(null, { status: 401 });
  }

  const payload = parseJsonObject(raw.bytes);
  if (!payload) return new Response(null, { status: 400 });

  const lead = trustedNotificationLead(payload, config.proofKey);
  if (!lead) {
    // Bestätigt die Webhook-Zustellung, damit fremde Einträge die Warteschlange nicht blockieren.
    console.warn("[lead-notifications] submission_without_website_proof");
    return new Response(null, { status: 204 });
  }

  try {
    if (await deliverBrevoNotification(lead, config.apiKey, config.recipient)) return new Response(null, { status: 204 });
  } catch {
    console.error("[lead-notifications] brevo_unreachable");
  }
  return new Response(null, { status: 502 });
}
