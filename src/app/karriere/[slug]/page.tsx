// src/app/karriere/[slug]/page.tsx
import { notFound } from "next/navigation";
import {
  ArrowDown,
  Briefcase,
  CalendarClock,
  Check,
  ClipboardList,
  Gift,
  MapPin,
  Plus,
  ScrollText,
  Send,
  UserCheck,
  type LucideIcon,
} from "lucide-react";
import { PortableText } from "@portabletext/react";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  cleanList,
  fetchJobBySlug,
  fetchJobs,
  formatEmploymentType,
  portableTextToPlain,
  schemaEmploymentType,
  type JobPosting,
} from "@/lib/jobs-queries";
import { StickySidebarApply } from "@/components/StickySidebarApply";
import { JobDetailTracking } from "@/components/JobDetailTracking";
import { JobApplyButton } from "@/components/JobApplyButton";
import { BewerbungsAblauf } from "@/components/BewerbungsAblauf";
import { BewerbungsCTA } from "@/components/BewerbungsCTA";
import { DynamicIcon } from "@/components/DynamicIcon";
import { Section } from "@/components/ui/section";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BASE_URL } from "@/lib/seo-utils";

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const job = await fetchJobBySlug(params.slug);

  if (!job) {
    return { title: "Stelle nicht gefunden" };
  }

  const title = job.metaTitle || `${job.title} | Karriere bei Ergart`;
  const description =
    job.metaDescription ||
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
  const description =
    portableTextToPlain(job.description) ||
    portableTextToPlain(job.excerpt) ||
    job.metaDescription ||
    `Stellenangebot: ${job.title} bei Alexander Ergart in Neuss.`;

  const data = {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    title: job.title,
    description,
    // Stabiles Datum aus dem CMS statt "jetzt" bei jedem Rendern
    datePosted: job._createdAt,
    employmentType: schemaEmploymentType(job.employmentType),
    hiringOrganization: {
      "@type": "Organization",
      name: "Alexander Ergart Hausmeister- & Fensterservice",
      sameAs: BASE_URL,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Further Straße 89B",
        postalCode: "41462",
        addressLocality: "Neuss",
        addressRegion: "NRW",
        addressCountry: "DE",
      },
    },
    directApply: false,
    responsibilities: cleanList(job.responsibilities).join("; ") || undefined,
    skills: cleanList(job.requirements).join(", ") || undefined,
    jobBenefits:
      job.benefits?.map((b) => b.title?.trim()).filter(Boolean).join(", ") ||
      undefined,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Einheitlicher Abschnittskopf: Nummer · Icon · Titel · Unterzeile */
function BlockHeader({
  index,
  icon: Icon,
  title,
  subtitle,
}: {
  index: string;
  icon: LucideIcon;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-6 flex items-center gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-blue/10">
        <Icon className="h-6 w-6 text-brand-text" aria-hidden="true" />
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-text">
          {index}
        </p>
        <h2 className="text-2xl font-bold text-foreground md:text-3xl">{title}</h2>
        {subtitle ? (
          <p className="mt-0.5 text-sm text-muted-foreground">{subtitle}</p>
        ) : null}
      </div>
    </div>
  );
}

function Block({ id, children }: { id: string; children: ReactNode }) {
  // scroll-mt: Sprungziele liegen sonst unter dem Sticky-Header
  return (
    <section id={id} className="scroll-mt-40">
      {children}
    </section>
  );
}

export default async function JobDetailPage({ params }: Props) {
  const job = await fetchJobBySlug(params.slug);
  if (!job) return notFound();

  const responsibilities = cleanList(job.responsibilities);
  const requirements = cleanList(job.requirements);
  const niceToHave = cleanList(job.niceToHave);
  const quickFacts = cleanList(job.quickFacts);
  const benefits = (job.benefits ?? []).filter((b) => b.title?.trim());
  const employmentType = formatEmploymentType(job.employmentType);
  const longText = job.description ?? job.excerpt;
  const hasProfile = requirements.length > 0 || niceToHave.length > 0;

  const facts = [
    { icon: Briefcase, label: "Anstellung", value: employmentType },
    { icon: MapPin, label: "Einsatzort", value: job.location },
    { icon: CalendarClock, label: "Start", value: "Nächstmöglich" },
    { icon: Send, label: "Bewerbung", value: "Per E-Mail" },
  ].filter((fact) => fact.value);

  // Fortlaufende Nummerierung nur über tatsächlich vorhandene Abschnitte
  let counter = 0;
  const next = () => String(++counter).padStart(2, "0");

  return (
    <div className="bg-background">
      <JobJsonLd job={job} />
      <JobDetailTracking jobTitle={job.title} />

      {/* Hero – dauerhaft dunkle Bühne, unabhängig vom Theme */}
      <header className="relative isolate overflow-hidden bg-slate-950 text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(70%_90%_at_15%_0%,hsl(var(--brand)/0.35),transparent_65%)]"
        />
        <div className="container mx-auto max-w-7xl px-4 pb-10 pt-12 lg:pb-14 lg:pt-16">
          <Breadcrumbs
            tone="inverse"
            items={[
              { label: "Karriere", href: "/karriere" },
              { label: job.title, href: `/karriere/${params.slug}` },
            ]}
          />

          <div className="mt-8 max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-blue">
              Stellenangebot
            </p>
            <h1 className="mt-3 text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
              {job.title}
            </h1>
            {job.metaDescription ? (
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-200 md:text-xl">
                {job.metaDescription}
              </p>
            ) : null}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <JobApplyButton jobTitle={job.title} tone="inverse" />
              <a
                href="#aufgaben"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/30 px-6 text-base font-semibold text-white transition-colors duration-300 hover:bg-white/10"
              >
                Stelle im Überblick
                <ArrowDown size={18} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Faktenleiste: die Eckdaten EINMAL, gut sichtbar */}
          <ul className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/15 bg-white/15 lg:grid-cols-4">
            {facts.map((fact) => (
              <li key={fact.label} className="flex items-center gap-3 bg-slate-950/80 p-4 lg:p-5">
                <fact.icon className="h-5 w-5 shrink-0 text-brand-blue" aria-hidden="true" />
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-wider text-slate-400">
                    {fact.label}
                  </p>
                  <p className="truncate font-semibold">{fact.value}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </header>

      {/* Inhalt */}
      <div className="container mx-auto max-w-7xl px-4 py-14 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-16">
            {/* Aufgaben */}
            {responsibilities.length > 0 ? (
              <Block id="aufgaben">
                <BlockHeader
                  index={next()}
                  icon={ClipboardList}
                  title="Ihre Aufgaben"
                  subtitle="Das machen Sie bei uns"
                />
                <ul className="grid gap-3 sm:grid-cols-2">
                  {responsibilities.map((task) => (
                    <li
                      key={task}
                      className="flex items-start gap-3 rounded-xl border border-border bg-card p-4"
                    >
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-blue/10">
                        <Check className="h-4 w-4 text-brand-text" aria-hidden="true" />
                      </span>
                      <span className="text-foreground">{task}</span>
                    </li>
                  ))}
                </ul>
              </Block>
            ) : null}

            {/* Profil: Muss & Plus nebeneinander */}
            {hasProfile ? (
              <Block id="profil">
                <BlockHeader
                  index={next()}
                  icon={UserCheck}
                  title="Ihr Profil"
                  subtitle="Was Sie mitbringen sollten – und was ein Plus ist"
                />
                <div className="grid gap-4 md:grid-cols-2">
                  {requirements.length > 0 ? (
                    <div className="rounded-2xl border border-brand-blue/30 bg-brand-blue/5 p-6">
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-text">
                        Das bringen Sie mit
                      </h3>
                      <ul className="mt-4 space-y-3">
                        {requirements.map((req) => (
                          <li key={req} className="flex items-start gap-3">
                            <Check
                              className="mt-0.5 h-5 w-5 shrink-0 text-brand-text"
                              aria-hidden="true"
                            />
                            <span className="text-foreground">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                  {niceToHave.length > 0 ? (
                    <div className="rounded-2xl border border-border bg-card p-6">
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                        Von Vorteil – kein Muss
                      </h3>
                      <ul className="mt-4 space-y-3">
                        {niceToHave.map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <Plus
                              className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground"
                              aria-hidden="true"
                            />
                            <span className="text-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              </Block>
            ) : null}

            {/* Benefits */}
            {benefits.length > 0 ? (
              <Block id="benefits">
                <BlockHeader
                  index={next()}
                  icon={Gift}
                  title="Das bieten wir"
                  subtitle="Ihre Vorteile in dieser Position"
                />
                <ul className="grid gap-4 md:grid-cols-2">
                  {benefits.map((benefit) => (
                    <li
                      key={benefit.title}
                      className="rounded-2xl border border-border bg-card p-6 shadow-sm"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-blue/10">
                        <DynamicIcon
                          name={benefit.icon}
                          className="h-5 w-5 text-brand-text"
                        />
                      </div>
                      <h3 className="mt-4 text-lg font-bold text-foreground">
                        {benefit.title.trim()}
                      </h3>
                      {benefit.description?.trim() ? (
                        <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                          {benefit.description.trim()}
                        </p>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </Block>
            ) : null}

            {/* Langtext aus dem CMS – bewusst NACH den strukturierten Fakten */}
            {longText ? (
              <Block id="details">
                <BlockHeader
                  index={next()}
                  icon={ScrollText}
                  title="Die Stelle im Detail"
                />
                <div className="prose prose-lg max-w-none rounded-2xl border border-border bg-card p-6 dark:prose-invert md:p-8">
                  <PortableText value={longText} />
                </div>
              </Block>
            ) : null}
          </div>

          <aside>
            <StickySidebarApply title={job.title} quickFacts={quickFacts} />
          </aside>
        </div>
      </div>

      <Section surface="muted">
        <BewerbungsAblauf />
      </Section>

      <BewerbungsCTA jobTitle={job.title} />
    </div>
  );
}

export async function generateStaticParams() {
  const jobs = await fetchJobs();
  return jobs.map((job) => ({
    slug: job.slug.current,
  }));
}
