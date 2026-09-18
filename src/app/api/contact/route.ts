// src/app/api/contact/route.ts
import { NextResponse } from "next/server";

type Body = {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  website?: string; // Honeypot
};

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export async function POST(req: Request) {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const TO = process.env.CONTACT_TO_EMAIL || "info@ergart.de";
  const FROM = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";

  if (!RESEND_API_KEY) {
    return NextResponse.json(
      { ok: false, error: "Server not configured (RESEND_API_KEY missing)" },
      { status: 500 }
    );
  }

  let data: Body;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON" },
      { status: 400 }
    );
  }

  const {
    name,
    email,
    phone = "",
    subject = "Neue Kontaktanfrage",
    message,
    website = "",
  } = data;

  // Honeypot (Bots füllen das)
  if (website.trim() !== "") {
    return NextResponse.json({ ok: true, muted: true }); // silently succeed
  }

  // Basic Validation
  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "Bitte Name, E-Mail und Nachricht ausfüllen." },
      { status: 400 }
    );
  }
  if (!isEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "Bitte eine gültige E-Mail angeben." },
      { status: 400 }
    );
  }
  if (message.length > 5000) {
    return NextResponse.json(
      { ok: false, error: "Nachricht ist zu lang." },
      { status: 400 }
    );
  }

  const plain = [
    `Neue Kontaktanfrage von der Website`,
    `----------------------------------`,
    `Name:   ${name}`,
    `E-Mail: ${email}`,
    phone ? `Telefon: ${phone}` : null,
    `Betreff: ${subject}`,
    ``,
    `Nachricht:`,
    message,
    ``,
    `— Ende —`,
  ]
    .filter(Boolean)
    .join("\n");

  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.5;color:#111;">
      <h2>Neue Kontaktanfrage</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>E-Mail:</strong> ${escapeHtml(email)}</p>
      ${phone ? `<p><strong>Telefon:</strong> ${escapeHtml(phone)}</p>` : ""}
      <p><strong>Betreff:</strong> ${escapeHtml(subject)}</p>
      <p><strong>Nachricht:</strong></p>
      <div style="white-space:pre-wrap;border:1px solid #e5e7eb;border-radius:8px;padding:12px;background:#fafafa;">
        ${escapeHtml(message)}
      </div>
    </div>
  `;

  // Send via Resend REST (kein SDK nötig)
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      reply_to: email,
      subject,
      text: plain,
      html,
    }),
  });

  if (!res.ok) {
    let detail: any = null;
    try {
      detail = await res.json();
    } catch {}
    // TEMP: gib den echten Fehler zurück (danach wieder entfernen!)
    return NextResponse.json(
      { ok: false, error: "Resend error", status: res.status, detail },
      { status: 500 }
    );
  }

  // rudimentärer Escape
  function escapeHtml(str: string) {
    return str.replace(
      /[&<>"']/g,
      (m) =>
        ((
          {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;",
          } as any
        )[m])
    );
  }
}
