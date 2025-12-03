// src/app/karriere/[slug]/page.tsx
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { fetchJobBySlug, fetchJobs, type JobPosting } from "@/lib/jobs-queries";
import type { Metadata } from "next";
import { StickySidebarApply } from "@/components/StickySidebarApply";

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const job = await fetchJobBySlug(params.slug);
  if (!job) return { title: "Stelle nicht gefunden" };
  return {
    title: job.metaTitle || `${job.title} | Karriere bei Ergart`,
    description: job.metaDescription || `Bewerben Sie sich als ${job.title} bei Ergart in ${
      job.location ?? "Neuss"
    }.`,
  };
}

function JobJsonLd({ job }: { job: JobPosting }) {
  const data = {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    title: job.title,
    hiringOrganization: { "@type": "Organization", name: "Ergart" },
    jobLocation: job.location
      ? [{ "@type": "Place", address: job.location }]
      : undefined,
    employmentType: job.employmentType,
    datePosted: new Date().toISOString(),
    description: "Details auf der Seite.",
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default async function JobDetailPage({ params }: Props) {
  const job = await fetchJobBySlug(params.slug);
  if (!job) return notFound();

  return (
    <div className="bg-background">
      <JobJsonLd job={job} />

      <div className="container mx-auto max-w-7xl px-4 py-16 lg:py-24">
        <div className="mb-8">
          <Link
            href="/karriere"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft
              size={16}
              className="transition-transform group-hover:-translate-x-1"
            />
            Zurück zur Übersicht
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Beschreibung */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              {job.title}
            </h1>
            <div className="prose dark:prose-invert max-w-none mt-8">
              {job.description ? (
                <PortableText value={job.description} />
              ) : (
                <p>Keine Beschreibung vorhanden.</p>
              )}
            </div>
          </div>

          {/* Sticky Apply */}
          <aside>
            <StickySidebarApply
              title={job.title}
              location={job.location}
              employmentType={job.employmentType}
            />
          </aside>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const jobs = await fetchJobs();
  return jobs.map((job) => ({
    slug: job.slug.current,
  }));
}
