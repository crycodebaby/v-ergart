import { client, isSanityConfigured } from "./sanity-client";
import groq from "groq";

export type JobPosting = {
  _id: string;
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
  _id, title, location, employmentType, slug, excerpt, metaTitle, metaDescription
}
`;

const DETAIL_QUERY = groq`
*[_type == "jobPosting" && slug.current == $slug][0]{
  _id,
  title,
  location,
  employmentType,
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

export async function fetchJobs(): Promise<JobPosting[]> {
  if (!isSanityConfigured) return [];
  return client.fetch(
    LIST_QUERY,
    {},
    { next: { revalidate: 60, tags: [JOBS_TAG] } }
  );
}

export async function fetchJobBySlug(slug: string): Promise<JobPosting | null> {
  if (!isSanityConfigured) return null;
  return client.fetch(
    DETAIL_QUERY,
    { slug },
    { next: { revalidate: 60, tags: [JOBS_TAG] } }
  );
}
