import type { MetadataRoute } from "next";
import { fetchPostSitemapEntries } from "@/lib/blog-queries";
import { LEISTUNGEN_DETAILS } from "@/lib/leistungen-data";

/**
 * WICHTIG:
 * Setz in .env(.local) deine kanonische Domain:
 * NEXT_PUBLIC_SITE_URL=https://www.deine-domain.de
 */
const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://alexander-ergart.de";

/**
 * Grundregeln dieser Sitemap
 *
 * Aufgenommen wird eine URL nur, wenn sie
 * - HTTP 200 liefert,
 * - indexierbar ist (kein noindex),
 * - ihre eigene kanonische URL ist (kein Redirect, kein fremdes Canonical),
 * - keine reine Utility-Seite ist (z. B. /danke),
 * - tatsaechlich als Google-Suchergebnis gewuenscht ist.
 *
 * Bewusst NICHT enthalten:
 * - /danke              -> Utility-Seite nach Formularabsendung
 * - /einsatzgebiet/*    -> aktuell "noindex, follow" (siehe
 *                          src/app/einsatzgebiet/[slug]/page.tsx).
 *                          Widerspruechliche Signale (Sitemap sagt "wichtig",
 *                          Seite sagt "nicht indexieren") werden vermieden.
 *
 * Kein `priority`, kein `changeFrequency`: Google wertet beides nicht aus.
 * Eine Pseudo-Priorisierung wuerde hier nur Pflegeaufwand erzeugen.
 *
 * `lastModified` wird ausschliesslich gesetzt, wenn ein echtes Aenderungsdatum
 * bekannt ist (Sanity `_updatedAt`). Fuer statische Seiten gibt es kein
 * belastbares Datum -> Feld wird weggelassen statt erfunden. Insbesondere darf
 * ein Deployment nicht jede URL als "gerade geaendert" melden.
 */
const STATIC_ROUTES = [
  "/", // Home
  "/fenster",
  "/fensterservice", // Google Ads Landing Page
  "/fenster-tueren",
  "/tueren",
  "/referenzen",
  "/leistungen", // Uebersichtsseite
  "/blog", // Blog-Uebersicht
  "/karriere",
  "/kontakt",
  "/ueber-uns",
  "/impressum",
  "/datenschutz",
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Statische Seiten - ohne lastModified (kein verlaessliches Aenderungsdatum)
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${BASE_URL}${path}`,
  }));

  // Dynamische /leistungen/[slug]
  // Quelle: src/lib/leistungen-data.ts (Single Source of Truth, im Repo
  // gepflegt -> ebenfalls kein verlaessliches Aenderungsdatum zur Laufzeit)
  const leistungenEntries: MetadataRoute.Sitemap = LEISTUNGEN_DETAILS.map(
    (service) => ({
      url: `${BASE_URL}/leistungen/${service.slug}`,
    })
  );

  // Dynamische /blog/[slug] - hier gibt es mit _updatedAt ein echtes Datum
  const posts = await fetchPostSitemapEntries();
  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => {
    const updatedAt = post._updatedAt ?? post.publishedAt;
    return {
      url: `${BASE_URL}/blog/${post.slug}`,
      ...(updatedAt ? { lastModified: new Date(updatedAt) } : {}),
    };
  });

  return [...staticEntries, ...leistungenEntries, ...blogEntries];
}
