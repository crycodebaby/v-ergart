import { client } from "./sanity-client";
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
};

const LIST_QUERY = groq`
*[_type == "jobPosting" && isActive == true && defined(slug.current)]
| order(_createdAt desc){
  _id, title, location, employmentType, slug, excerpt, metaTitle, metaDescription
}
`;

const DETAIL_QUERY = groq`
*[_type == "jobPosting" && slug.current == $slug][0]{
  _id, title, location, employmentType, description, slug, metaTitle, metaDescription
}
`;

// Tags für Next.js Cache (On-demand Revalidate)
export const JOBS_TAG = "jobs";

export async function fetchJobs(): Promise<JobPosting[]> {
  return client.fetch(
    LIST_QUERY,
    {},
    { next: { revalidate: 60, tags: [JOBS_TAG] } }
  );
}

export async function fetchJobBySlug(slug: string): Promise<JobPosting | null> {
  return client.fetch(
    DETAIL_QUERY,
    { slug },
    { next: { revalidate: 60, tags: [JOBS_TAG] } }
  );
}
