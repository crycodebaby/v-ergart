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
      "/fensterservice",
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
