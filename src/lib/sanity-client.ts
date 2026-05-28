import { createClient } from "@sanity/client";

const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const sanityDataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

export const isSanityConfigured = Boolean(sanityProjectId && sanityDataset);

if (!isSanityConfigured && process.env.NODE_ENV !== "production") {
  console.warn(
    "[sanity] NEXT_PUBLIC_SANITY_PROJECT_ID/NEXT_PUBLIC_SANITY_DATASET fehlen. Sanity-Abfragen werden mit lokalen Fallbacks beantwortet."
  );
}

export const client = createClient({
  // Fallback verhindert Start-Crash bei fehlender Env in lokaler Entwicklung.
  projectId: sanityProjectId ?? "local-dev-placeholder",
  dataset: sanityDataset ?? "production",
  apiVersion: "2024-03-11",
  useCdn: process.env.NODE_ENV === "production",
});
