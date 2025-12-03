// src/app/karriere/[slug]/page.tsx
import { notFound } from "next/navigation";
import { ArrowLeft, Briefcase, MapPin, Clock } from "lucide-react";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { fetchJobBySlug, fetchJobs, type JobPosting } from "@/lib/jobs-queries";
import type { Metadata } from "next";
import { StickySidebarApply } from "@/components/StickySidebarApply";
import { JobDetailTracking } from "@/components/JobDetailTracking";

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const job = await fetchJobBySlug(params.slug);
  
  if (!job) {
    return { title: "Stelle nicht gefunden" };
  }

  const title = job.metaTitle || `${job.title} | Karriere bei Ergart`;
  const description = job.metaDescription || 
    `Bewerben Sie sich als ${job.title} bei Ergart in ${job.location ?? "Neuss"}.`;
  const url = `/karriere/${params.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url,
      locale: "de_DE",
      siteName: "Alexander Ergart Hausmeister- & Fensterservice",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
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
      <JobDetailTracking jobTitle={job.title} />

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-slate-50 to-background dark:from-zinc-900 dark:to-background border-b border-border/40">
        <div className="container mx-auto max-w-7xl px-4 py-12 lg:py-16">
          <Link
            href="/karriere"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-brand-blue transition-colors group mb-8"
          >
            <ArrowLeft
              size={16}
              className="transition-transform group-hover:-translate-x-1"
            />
            Zurück zur Übersicht
          </Link>

          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {job.employmentType && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-brand-blue/10 text-brand-blue">
                  <Briefcase className="w-3 h-3 mr-1.5" />
                  {job.employmentType}
                </span>
              )}
              {job.location && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                  <MapPin className="w-3 h-3 mr-1.5" />
                  {job.location}
                </span>
              )}
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                <Clock className="w-3 h-3 mr-1.5" />
                Zum nächstmöglichen Zeitpunkt
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
              {job.title}
            </h1>

            {job.metaDescription && (
              <p className="text-lg text-muted-foreground leading-relaxed">
                {job.metaDescription}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-7xl px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Job Description */}
          <div className="lg:col-span-2">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {job.description ? (
                <PortableText value={job.description} />
              ) : (
                <div className="bg-muted/50 rounded-lg p-8 text-center">
                  <p className="text-muted-foreground">Keine Beschreibung vorhanden.</p>
                </div>
              )}
            </div>

            {/* Additional Info Card */}
            <div className="mt-12 p-6 bg-card border border-border/40 rounded-xl">
              <h3 className="text-lg font-bold text-foreground mb-3">
                Haben wir Ihr Interesse geweckt?
              </h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Wir freuen uns auf Ihre aussagekräftigen Bewerbungsunterlagen. 
                Senden Sie uns gerne Ihren Lebenslauf, Zeugnisse und ein kurzes Anschreiben per E-Mail.
              </p>
              <p className="text-sm text-muted-foreground">
                Bei Fragen zur Stelle können Sie uns auch gerne telefonisch kontaktieren: 
                <a href="tel:+4917666825889" className="text-brand-blue hover:underline ml-1">
                  +49 176 668 25 889
                </a>
              </p>
            </div>
          </div>

          {/* Sticky Apply Sidebar */}
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
