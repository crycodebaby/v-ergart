import { getFormsparkConfig } from "@/lib/lead-intake";
import { getBrevoNotificationConfig } from "@/lib/lead-notification";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function GET(req: Request): Response {
  const intakeConfigured = Boolean(
    getFormsparkConfig() &&
    process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY?.trim() &&
    process.env.RECAPTCHA_SECRET_KEY?.trim()
  );
  const notificationsConfigured = Boolean(getBrevoNotificationConfig());
  const checkNotifications = new URL(req.url).searchParams.get("check") === "notifications";
  const ok = intakeConfigured && (!checkNotifications || notificationsConfigured);

  // Öffentliche Prüfung der Konfiguration ohne Provideraufrufe und Testzustellungen.
  return Response.json({
    ok,
    intake: intakeConfigured ? "configured" : "not_configured",
    notifications: notificationsConfigured ? "configured" : "not_configured",
  }, {
    status: ok ? 200 : 503,
    headers: {
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex",
    },
  });
}
