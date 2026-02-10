// src/app/karriere/[slug]/page.tsx
import { notFound } from "next/navigation";
import { ArrowLeft, Briefcase, MapPin, Clock, CheckCircle, AlertCircle } from "lucide-react";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { fetchJobBySlug, fetchJobs, type JobPosting } from "@/lib/jobs-queries";
import type { Metadata } from "next";
import { StickySidebarApply } from "@/components/StickySidebarApply";
import { JobDetailTracking } from "@/components/JobDetailTracking";
import { DynamicIcon } from "@/components/DynamicIcon";
import { BASE_URL } from "@/lib/seo-utils";

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const job = await fetchJobBySlug(params.slug);

  if (!job) {
    return { title: "Stelle nicht gefunden" };
  }

  const title = job.metaTitle || `${job.title} | Karriere bei Ergart`;
  const description = job.metaDescription ||
    `Bewerben Sie sich als ${job.title} bei Ergart in ${job.location ?? "Neuss"}.`;
  const url = `${BASE_URL}/karriere/${params.slug}`;

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
    description: job.metaDescription || "Stellenbeschreibung verfügbar auf der Website.",
    responsibilities: job.responsibilities?.join("; "),
    skills: job.requirements?.join(", "),
    jobBenefits: job.benefits?.map((b) => b.title).join(", "),
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
        <div className="container mx-auto max-w-7xl px-4 py-16 lg:py-20">
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
            <div className="flex flex-wrap items-center gap-3 mb-6">
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

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
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
      <div className="container mx-auto max-w-7xl px-4 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Job Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Job Description */}
            {job.description && (
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Über die Stelle
                </h2>
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <PortableText value={job.description} />
                </div>
              </section>
            )}

            {/* Responsibilities */}
            {job.responsibilities && job.responsibilities.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Ihre Aufgaben
                </h2>
                <ul className="space-y-3">
                  {job.responsibilities.map((task, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" />
                      <span className="text-base text-foreground">{task}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Requirements */}
            {job.requirements && job.requirements.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Das bringen Sie mit
                </h2>
                <ul className="space-y-3">
                  {job.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-3 p-4 bg-card border border-border/40 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" />
                      <span className="text-base text-foreground">{req}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Nice-to-Have */}
            {job.niceToHave && job.niceToHave.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Von Vorteil
                </h2>
                <ul className="space-y-3">
                  {job.niceToHave.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <span className="text-base text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Benefits */}
            {job.benefits && job.benefits.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Das erwartet Sie
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {job.benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="p-6 bg-card border border-border/40 rounded-xl hover:border-brand-blue/50 hover:shadow-lg transition-all group"
                    >
                      <DynamicIcon
                        name={benefit.icon}
                        className="w-8 h-8 text-brand-blue mb-3 group-hover:scale-110 transition-transform"
                      />
                      <h3 className="font-bold text-foreground mb-2">{benefit.title}</h3>
                      {benefit.description && (
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {benefit.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Application Info Card */}
            <div className="p-6 bg-muted/50 border border-border/40 rounded-xl">
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

          {/* Right Column: Sidebar */}
          <aside>
            <StickySidebarApply
              title={job.title}
              location={job.location}
              employmentType={job.employmentType}
              quickFacts={job.quickFacts}
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
