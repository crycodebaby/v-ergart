// src/app/karriere/[slug]/page.tsx
import { client } from "@/lib/sanity-client";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";
import type { SanityDocument } from "next-sanity";
import { Briefcase, MapPin } from "lucide-react";

interface JobDetail extends SanityDocument {
  title: string;
  location?: string;
  employmentType?: string;
  description?: any;
}

const query = `*[_type == "jobPosting" && slug.current == $slug][0]{
    _id, title, location, employmentType, description
}`;

export default async function JobDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const job = await client.fetch<JobDetail | null>(query, {
    slug: params.slug,
  });

  if (!job) {
    notFound(); // Zeigt eine 404-Seite, wenn der Job nicht existiert
  }

  return (
    <div className="bg-background">
      <div className="container mx-auto max-w-3xl px-4 py-16 lg:py-24">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
          {job.title}
        </h1>
        <div className="mt-4 mb-8 text-md text-muted-foreground flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 border-b border-border pb-6">
          {job.employmentType && (
            <span className="flex items-center gap-2">
              <Briefcase size={16} /> {job.employmentType}
            </span>
          )}
          {job.location && (
            <span className="flex items-center gap-2">
              <MapPin size={16} /> {job.location}
            </span>
          )}
        </div>

        {/* Hier wird der formatierte Text aus dem CMS dargestellt */}
        <div className="prose dark:prose-invert max-w-none">
          {job.description ? (
            <PortableText value={job.description} />
          ) : (
            <p>Keine Beschreibung vorhanden.</p>
          )}
        </div>
      </div>
    </div>
  );
}
