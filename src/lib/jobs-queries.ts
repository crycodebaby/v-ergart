import { client, isSanityConfigured } from "./sanity-client";
import groq from "groq";

export type JobPosting = {
  _id: string;
  _createdAt?: string;
  title: string;
  location?: string;
  employmentType?: string;
  slug: { current: string };
  excerpt?: any;
  description?: any;
  metaTitle?: string;
  metaDescription?: string;
  // New CMS fields
  responsibilities?: string[];
  requirements?: string[];
  niceToHave?: string[];
  benefits?: Array<{
    icon: string;
    title: string;
    description?: string;
  }>;
  quickFacts?: string[];
};

const LIST_QUERY = groq`
*[_type == "jobPosting" && isActive == true && defined(slug.current)]
| order(_createdAt desc){
  _id, _createdAt, title, location, employmentType, slug, excerpt, metaTitle, metaDescription,
  responsibilities, quickFacts
}
`;

const DETAIL_QUERY = groq`
*[_type == "jobPosting" && isActive == true && slug.current == $slug][0]{
  _id,
  _createdAt,
  title,
  location,
  employmentType,
  excerpt,
  description,
  slug,
  metaTitle,
  metaDescription,
  responsibilities,
  requirements,
  niceToHave,
  benefits[]{
    icon,
    title,
    description
  },
  quickFacts
}
`;

// Tags für Next.js Cache (On-demand Revalidate)
export const JOBS_TAG = "jobs";

/**
 * Lokale Beispieldaten statt CMS – nur mit `JOBS_FIXTURE=1` (serverseitig,
 * nie in Production gesetzt). Erlaubt Layout-Arbeit ohne Sanity-Zugang.
 */
const useFixture = process.env.JOBS_FIXTURE === "1";

export async function fetchJobs(): Promise<JobPosting[]> {
  if (useFixture) {
    const { FIXTURE_JOBS } = await import("./jobs-fixture");
    return FIXTURE_JOBS;
  }
  if (!isSanityConfigured) return [];
  return client.fetch(
    LIST_QUERY,
    {},
    { next: { revalidate: 60, tags: [JOBS_TAG] } }
  );
}

export async function fetchJobBySlug(slug: string): Promise<JobPosting | null> {
  if (useFixture) {
    const { FIXTURE_JOBS } = await import("./jobs-fixture");
    return FIXTURE_JOBS.find((job) => job.slug.current === slug) ?? null;
  }
  if (!isSanityConfigured) return null;
  return client.fetch(
    DETAIL_QUERY,
    { slug },
    { next: { revalidate: 60, tags: [JOBS_TAG] } }
  );
}

// ---------------------------------------------------------------------------
// Anzeige-Helfer – normalisieren die im CMS gepflegten Rohwerte
// ---------------------------------------------------------------------------

const EMPLOYMENT_TYPES: Record<string, { label: string; schema: string }> = {
  VOLLZEIT: { label: "Vollzeit", schema: "FULL_TIME" },
  TEILZEIT: { label: "Teilzeit", schema: "PART_TIME" },
  MINIJOB: { label: "Minijob", schema: "PART_TIME" },
  AUSHILFE: { label: "Aushilfe", schema: "TEMPORARY" },
  AUSBILDUNG: { label: "Ausbildung", schema: "OTHER" },
  PRAKTIKUM: { label: "Praktikum", schema: "INTERN" },
};

const employmentKey = (value?: string) =>
  value?.trim().toUpperCase().replace(/[\s-]+/g, "_") ?? "";

/** "VOLLZEIT" → "Vollzeit"; unbekannte Werte werden unverändert angezeigt. */
export function formatEmploymentType(value?: string): string | undefined {
  if (!value?.trim()) return undefined;
  return EMPLOYMENT_TYPES[employmentKey(value)]?.label ?? value.trim();
}

/** schema.org-Wert für JobPosting.employmentType (Google for Jobs). */
export function schemaEmploymentType(value?: string): string | undefined {
  if (!value?.trim()) return undefined;
  return EMPLOYMENT_TYPES[employmentKey(value)]?.schema ?? "OTHER";
}

/** Entfernt leere/nur-Leerzeichen-Einträge, die im Studio leicht entstehen. */
export function cleanList(items?: string[]): string[] {
  return (items ?? []).map((item) => item?.trim()).filter(Boolean) as string[];
}

/** Portable Text → reiner Text (für JSON-LD / Meta), Absätze durch Leerzeile getrennt. */
export function portableTextToPlain(blocks?: any): string {
  if (!Array.isArray(blocks)) return "";
  return blocks
    .filter((block) => block?._type === "block" && Array.isArray(block.children))
    .map((block) => block.children.map((child: any) => child?.text ?? "").join("").trim())
    .filter(Boolean)
    .join("\n\n");
}
