// src/app/sitemap.ts
import type { MetadataRoute } from "next";

/**
 * WICHTIG:
 * Setz in .env(.local) deine kanonische Domain:
 * NEXT_PUBLIC_SITE_URL=https://www.deine-domain.de
 */
const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://www.deine-domain.de";

/** Statisch bekannte Routen aus deiner Struktur */
const STATIC_ROUTES = [
  "/", // Home
  "/fenster",
  "/fenster-tueren",
  "/tueren",
  "/referenzen",
  "/leistungen", // Übersichtsseite
  "/karriere",
  "/kontakt",
  "/ueber-uns",
  "/danke",
  "/impressum",
  "/datenschutz",
] as const;

/** Dynamische Slugs für /leistungen/[slug]
 *  -> diese Seiten verlinkst du über "Mehr erfahren"
 *  Falls du später aus einer DB/CMS liest, einfach hier ersetzen.
 */
async function getLeistungenSlugs(): Promise<string[]> {
  return [
    "innenausbau",
    "gartenpflege",
    "hausmeister",
    "reinigung",
    "sicherheit",
  ];
}

/** Optional: einfache Priorisierung nach Route */
function priorityFor(path: string): number {
  if (path === "/") return 1.0;
  if (
    [
      "/fenster",
      "/fenster-tueren",
      "/tueren",
      "/leistungen",
      "/kontakt",
      "/referenzen",
    ].includes(path)
  )
    return 0.9;
  if (path.startsWith("/leistungen/")) return 0.8;
  if (["/ueber-uns", "/karriere"].includes(path)) return 0.7;
  return 0.5; // Rechtliches & sonstiges
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // Dynamische /leistungen/[slug]
  const leistungenSlugs = await getLeistungenSlugs();
  const dynamicLeistungen = leistungenSlugs.map<MetadataRoute.Sitemap[number]>(
    (slug) => ({
      url: `${BASE_URL}/leistungen/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: priorityFor(`/leistungen/${slug}`),
    })
  );

  // Statische Seiten
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: priorityFor(path),
  }));

  return [...staticEntries, ...dynamicLeistungen];
}
