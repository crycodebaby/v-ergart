// src/lib/attribution.ts
"use client";

/**
 * Consent-bewusste Kampagnen-Attribution (First-Touch + Last-Touch).
 *
 * Warum überhaupt: Ein Google-Ads-Klick landet auf `/fenster?gclid=…`. Wer
 * danach noch drei Unterseiten liest und erst dann das Formular ausfüllt,
 * hat die Parameter längst aus der URL verloren. Ohne diese Schicht kommt
 * der Lead ohne jede Herkunft an.
 *
 * ---------------------------------------------------------------------------
 * CONSENT – das zentrale Designprinzip dieser Datei
 * ---------------------------------------------------------------------------
 * Consent Mode v2 startet in `layout.tsx` mit `denied` für ad_storage,
 * ad_user_data, ad_personalization und analytics_storage. Die einzige
 * Einwilligungsquelle im Projekt ist `localStorage["cookie_consent"]`
 * ("granted" | "denied" | null), gesetzt vom CookieBanner.
 *
 * Daraus folgt hier hart:
 *
 *   OHNE Einwilligung ("denied" oder noch nicht entschieden)
 *     -> KEIN Schreibzugriff auf localStorage/sessionStorage/Cookies.
 *     -> Die Attribution lebt ausschließlich in einer Modulvariablen, also
 *        im Arbeitsspeicher des Tabs. Sie übersteht Client-Navigation
 *        (App Router behält das JS-Modul), aber keinen Reload und keinen
 *        neuen Tab. Das ist gewollt: ein Speichervorgang auf dem Endgerät
 *        ohne Einwilligung findet nicht statt.
 *
 *   MIT Einwilligung ("granted")
 *     -> First-/Last-Touch werden first-party unter ATTR_KEY persistiert
 *        und überleben Reloads, solange sie nicht abgelaufen sind.
 *     -> Beim Widerruf ("Nur notwendige Cookies") wird der Key gelöscht.
 *
 * Der Übergang denied -> granted wird über das CustomEvent
 * `ergart:consent` abgefangen: die bereits im Speicher liegende
 * Attribution wird dann (und nur dann) nachträglich persistiert.
 *
 * OFFENER DATENSCHUTZ-PRÜFPUNKT (bewusst nicht eigenmächtig entschieden):
 * Die Übertragung von gclid/UTM zusammen mit dem Lead an den eigenen Server
 * passiert auch ohne Einwilligung, wenn die Parameter in derselben Sitzung
 * in der URL standen – das ist kein Speichervorgang auf dem Endgerät,
 * sondern die Verarbeitung einer vom Nutzer selbst aufgerufenen URL im
 * Rahmen der Anfragebearbeitung. Ob das so in der Datenschutzerklärung
 * abgedeckt ist, muss juristisch geprüft werden. Diese Datei ändert die
 * Datenschutzerklärung NICHT.
 */

import {
  ATTRIBUTION_PARAMS,
  type AttributionParam,
  type AttributionTouch,
  type LeadAttribution,
} from "@/lib/fenster-lead";

const ATTR_KEY = "ergart_attribution_v1";
const CONSENT_KEY = "cookie_consent";
export const CONSENT_EVENT = "ergart:consent";

/** Nach 90 Tagen gilt ein First-Touch als verfallen (Ads-Lookback-Fenster). */
const MAX_AGE_MS = 90 * 24 * 60 * 60 * 1000;

/** Harte Obergrenze je Parameterwert – schützt Server und Posteingang. */
const MAX_VALUE_LENGTH = 300;

type StoredAttribution = {
  first_touch?: AttributionTouch;
  last_touch?: AttributionTouch;
};

/**
 * Der Speicher ohne Einwilligung: Modul-Scope = pro Tab, pro Page-Load.
 * Mit Einwilligung ist das zusätzlich der Lesecache für localStorage.
 */
let memory: StoredAttribution = {};
let hydrated = false;

// ---------------------------------------------------------------------------
// Consent
// ---------------------------------------------------------------------------

export type ConsentState = "granted" | "denied" | "unknown";

export function getConsentState(): ConsentState {
  if (typeof window === "undefined") return "unknown";
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    if (raw === "granted") return "granted";
    if (raw === "denied") return "denied";
    return "unknown";
  } catch {
    // Privater Modus / blockierter Storage -> wie "keine Einwilligung".
    return "unknown";
  }
}

function mayPersist(): boolean {
  return getConsentState() === "granted";
}

// ---------------------------------------------------------------------------
// Storage-Helfer (jeder Zugriff gekapselt und fehlertolerant)
// ---------------------------------------------------------------------------

function readStored(): StoredAttribution | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(ATTR_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredAttribution;
    const capturedAt = parsed.first_touch?.captured_at;
    if (capturedAt && Date.now() - Date.parse(capturedAt) > MAX_AGE_MS) {
      window.localStorage.removeItem(ATTR_KEY);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function writeStored(value: StoredAttribution): void {
  if (typeof window === "undefined" || !mayPersist()) return;
  try {
    window.localStorage.setItem(ATTR_KEY, JSON.stringify(value));
  } catch {
    // Quota / privater Modus: die Persistenz ist optional, RAM bleibt.
  }
}

function clearStored(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(ATTR_KEY);
  } catch {
    /* noop */
  }
}

// ---------------------------------------------------------------------------
// Erfassung
// ---------------------------------------------------------------------------

function clip(value: string): string {
  return value.trim().slice(0, MAX_VALUE_LENGTH);
}

/** Liest die unterstützten Parameter aus einem Query-String. */
function readParams(search: string): Partial<Record<AttributionParam, string>> {
  const out: Partial<Record<AttributionParam, string>> = {};
  let params: URLSearchParams;
  try {
    params = new URLSearchParams(search);
  } catch {
    return out;
  }
  for (const key of ATTRIBUTION_PARAMS) {
    const raw = params.get(key);
    if (raw && raw.trim()) out[key] = clip(raw);
  }
  return out;
}

/** Referrer nur, wenn er von einer fremden Domain kommt; ohne Query/Hash. */
function externalReferrer(): string | undefined {
  if (typeof document === "undefined") return undefined;
  const ref = document.referrer;
  if (!ref) return undefined;
  try {
    const url = new URL(ref);
    if (url.host === window.location.host) return undefined;
    return clip(url.origin + url.pathname);
  } catch {
    return undefined;
  }
}

function hydrate(): void {
  if (hydrated) return;
  hydrated = true;
  if (mayPersist()) {
    const stored = readStored();
    if (stored) memory = stored;
  }
}

/**
 * Erfasst die Attribution des aktuellen Aufrufs.
 *
 * First-Touch-Regel: `first_touch` wird genau einmal gesetzt und danach nie
 * wieder überschrieben – auch nicht, wenn später eine zweite Kampagne mit
 * eigener gclid hereinkommt. Die neue Kampagne landet dann in `last_touch`.
 * Dadurch bleibt nachvollziehbar, welcher Klick den Kontakt überhaupt
 * erzeugt hat, ohne die jüngste Kampagne zu verlieren.
 *
 * `last_touch` wird NUR bei einem Aufruf mit echten Kampagnenparametern
 * aktualisiert. Ein normaler Seitenwechsel innerhalb der Website schreibt
 * nichts – sonst würde jede Unterseite die Kampagne leer überschreiben.
 */
export function captureAttribution(search?: string): void {
  if (typeof window === "undefined") return;
  hydrate();

  const query = search ?? window.location.search;
  const params = readParams(query);
  const hasCampaign = Object.keys(params).length > 0;
  const now = new Date().toISOString();
  const page = clip(window.location.pathname);

  let changed = false;

  if (!memory.first_touch) {
    // Allererster erfasster Kontakt – auch ohne Kampagnenparameter, damit
    // Landingpage und Referrer eines organischen Einstiegs erhalten bleiben.
    memory.first_touch = {
      ...params,
      landing_page: page,
      referrer: externalReferrer(),
      captured_at: now,
    };
    changed = true;
  }

  if (hasCampaign) {
    memory.last_touch = {
      ...params,
      landing_page: page,
      referrer: externalReferrer(),
      captured_at: now,
    };
    changed = true;
  }

  if (changed) writeStored(memory);
}

/**
 * Attribution für den Lead-Request. Gibt immer ein Objekt zurück, damit der
 * Server den Consent-Zustand auch dann sieht, wenn nichts erfasst wurde.
 */
export function getAttributionForLead(sourcePage?: string): LeadAttribution {
  hydrate();
  const consent = getConsentState();
  return {
    first_touch: memory.first_touch,
    last_touch: memory.last_touch,
    source_page:
      sourcePage ??
      (typeof window !== "undefined" ? window.location.pathname : undefined),
    storage: consent === "granted" ? "local" : "memory",
    consent,
  };
}

/**
 * Reaktion auf eine Consent-Entscheidung.
 *   granted -> bereits im RAM liegende Attribution nachträglich persistieren
 *   denied  -> persistierte Attribution löschen (der RAM darf bleiben, er
 *              ist kein Speichervorgang auf dem Endgerät)
 */
export function applyConsentChange(state: ConsentState): void {
  if (state === "granted") {
    const stored = readStored();
    if (stored) {
      // Ältere persistierte Daten haben beim First-Touch Vorrang.
      memory = {
        first_touch: stored.first_touch ?? memory.first_touch,
        last_touch: memory.last_touch ?? stored.last_touch,
      };
    }
    writeStored(memory);
  } else if (state === "denied") {
    clearStored();
  }
}

/** Nur für Tests/Debugging im Browser. */
export function _debugAttribution(): StoredAttribution {
  hydrate();
  return memory;
}
