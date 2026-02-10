import type { MetadataRoute } from "next";
import { LOCATIONS } from "@/lib/locations";
import { fetchPostSlugs } from "@/lib/blog-queries";

/**
 * WICHTIG:
 * Setz in .env(.local) deine kanonische Domain:
 * NEXT_PUBLIC_SITE_URL=https://www.deine-domain.de
 */
const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://alexander-ergart.de/";

/** Statisch bekannte Routen aus deiner Struktur */
const STATIC_ROUTES = [
  "/", // Home
  "/fenster",
  "/fensterservice", // Google Ads Landing Page
  "/fenster-tueren",
  "/tueren",
  "/referenzen",
  "/leistungen", // Übersichtsseite
  "/karriere",
  "/kontakt",
  "/ueber-uns",
  // "/danke" ENTFERNT - ist Utility-Seite, kein SEO-Ziel
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

/** 
 * Priorisierung nach Business-Relevanz
 * 
 * Fokus: Fensterservice Neuss, Fenster/Türen von HÖNING, Hausmeisterservice
 * 
 * HÖCHSTE PRIORITÄT (1.0):
 * - Homepage
 * 
 * SEHR HOCH (0.9):
 * - Fensterservice Landing Page (Google Ads)
 * - Hauptproduktseiten (Fenster, Türen, Fenster & Türen)
 * 
 * HOCH (0.8):
 * - Service-Übersichten (Leistungen, Kontakt)
 * - Vertrauensbildende Seiten (Referenzen)
 * 
 * MITTEL (0.6-0.7):
 * - Service-Details, Blog-Artikel, Karriere
 * 
 * NIEDRIG (0.3-0.5):
 * - Standort-Seiten (außer Neuss), Rechtliches
 */
function priorityFor(path: string): number {
  // Homepage - höchste Priorität
  if (path === "/") return 1.0;

  // Fensterservice & Hauptprodukte - sehr hoch (Business-Fokus)
  if (["/fensterservice", "/fenster", "/fenster-tueren", "/tueren"].includes(path))
    return 0.9;

  // Service-Übersichten & Vertrauensbildung - hoch
  if (["/leistungen", "/kontakt", "/referenzen"].includes(path))
    return 0.8;

  // Blog & Service-Details - mittel-hoch
  if (path.startsWith("/blog/")) return 0.7;
  if (path.startsWith("/leistungen/")) return 0.7;

  // Karriere & Über Uns - mittel
  if (["/ueber-uns", "/karriere"].includes(path)) return 0.6;
  if (path.startsWith("/karriere/")) return 0.6;

  // Haupt-Standort Neuss - mittel
  if (path === "/einsatzgebiet/neuss") return 0.5;

  // Andere Standorte - niedrig
  if (path.startsWith("/einsatzgebiet/")) return 0.3;

  // Rechtliches - sehr niedrig
  if (["/impressum", "/datenschutz"].includes(path)) return 0.3;

  return 0.5; // Default
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

  // Dynamische /einsatzgebiet/[slug]
  const locationEntries = LOCATIONS.map<MetadataRoute.Sitemap[number]>((loc) => ({
    url: `${BASE_URL}/einsatzgebiet/${loc.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Statische Seiten
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: priorityFor(path),
  }));

  // Dynamische /blog/[slug]
  const blogSlugs = await fetchPostSlugs();
  const blogEntries = blogSlugs.map<MetadataRoute.Sitemap[number]>((item) => ({
    url: `${BASE_URL}/blog/${item.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [
    ...staticEntries,
    ...dynamicLeistungen,
    ...locationEntries,
    ...blogEntries,
  ];
}
