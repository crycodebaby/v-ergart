// src/app/karriere/[slug]/page.tsx
/**
 * Stellenanzeige.
 *
 * Aufbau wie eine gut gesetzte Anzeige: Kopf mit Titel, Meta-Zeile und
 * Faktenleiste auf heller Fläche; darunter eine Lesespalte mit den
 * Abschnitten Aufgaben, Profil, Wir bieten, Details – rechts die
 * Bewerbungskarte. Keine nummerierten Icon-Kacheln, keine Karten in Karten.
 */
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check, Phone, Plus } from "lucide-react";
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
import { CONTACT } from "@/lib/site-links";
import { StickySidebarApply } from "@/components/StickySidebarApply";
import { JobDetailTracking } from "@/components/JobDetailTracking";
import { JobApplyButton } from "@/components/JobApplyButton";
import { JobMobileApplyBar } from "@/components/JobMobileApplyBar";
import { BewerbungsAblauf } from "@/components/BewerbungsAblauf";
import { KarriereAnsprechpartner } from "@/components/KarriereAnsprechpartner";
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

/** Abschnitt der Anzeige: Haarlinie oben, Überschrift, Inhalt. */
function Block({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  // scroll-mt: Sprungziele liegen sonst unter dem Sticky-Header
  return (
    <section id={id} className="scroll-mt-40 border-t border-border pt-8">
      <h2 className="text-xl font-bold tracking-tight text-foreground md:text-2xl">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function CheckList({
  items,
  icon: Icon = Check,
  muted = false,
}: {
  items: string[];
  icon?: typeof Check;
  muted?: boolean;
}) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 leading-relaxed text-foreground">
          <Icon
            size={18}
            aria-hidden="true"
            className={muted ? "mt-1 shrink-0 text-muted-foreground" : "mt-1 shrink-0 text-brand-text"}
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
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

  const meta = [employmentType, job.location, "Start nächstmöglich"].filter(Boolean);

  const facts = [
    { label: "Anstellung", value: employmentType },
    { label: "Einsatzort", value: job.location },
    { label: "Beginn", value: "Nächstmöglich" },
    { label: "Bewerbung", value: "Per E-Mail, Lebenslauf genügt" },
  ].filter((fact) => fact.value);

  return (
    <>
      <JobJsonLd job={job} />
      <JobDetailTracking jobTitle={job.title} />

      {/* Kopf der Anzeige */}
      <Section surface="base" spacing="compact" className="border-b border-border">
        <Breadcrumbs
          items={[
            { label: "Karriere", href: "/karriere" },
            { label: job.title, href: `/karriere/${params.slug}` },
          ]}
        />

        <div id="stellenkopf" className="mt-8 max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            {meta.join("  ·  ")}
          </p>
          <h1 className="mt-3 text-4xl font-bold leading-[1.1] tracking-tight text-foreground md:text-5xl">
            {job.title}
          </h1>
          {job.metaDescription ? (
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              {job.metaDescription}
            </p>
          ) : null}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <JobApplyButton jobTitle={job.title} />
            <a
              href={CONTACT.phoneHref}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-input px-6 text-base font-semibold text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <Phone size={18} aria-hidden="true" />
              Fragen zur Stelle? Anrufen
            </a>
          </div>
        </div>

        {/* Faktenleiste: die Eckdaten einmal, gut sichtbar */}
        <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-border pt-6 md:grid-cols-4">
          {facts.map((fact) => (
            <div key={fact.label} className="min-w-0">
              <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {fact.label}
              </dt>
              <dd className="mt-1 font-medium leading-snug text-foreground">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* Inhalt */}
      <Section surface="base">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-16">
          <article className="max-w-3xl space-y-12">
            {responsibilities.length > 0 ? (
              <Block id="aufgaben" title="Ihre Aufgaben">
                <CheckList items={responsibilities} />
              </Block>
            ) : null}

            {hasProfile ? (
              <Block id="profil" title="Ihr Profil">
                <div className="space-y-8">
                  {requirements.length > 0 ? (
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                        Das bringen Sie mit
                      </h3>
                      <div className="mt-3">
                        <CheckList items={requirements} />
                      </div>
                    </div>
                  ) : null}
                  {niceToHave.length > 0 ? (
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                        Von Vorteil, kein Muss
                      </h3>
                      <div className="mt-3">
                        <CheckList items={niceToHave} icon={Plus} muted />
                      </div>
                    </div>
                  ) : null}
                </div>
              </Block>
            ) : null}

            {benefits.length > 0 ? (
              <Block id="wir-bieten" title="Das bieten wir">
                <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                  {benefits.map((benefit) => (
                    <li key={benefit.title} className="flex gap-3">
                      <DynamicIcon
                        name={benefit.icon}
                        size={20}
                        className="mt-0.5 shrink-0 text-brand-text"
                      />
                      <div>
                        {/* text-base explizit: globals.css skaliert h3 sonst per clamp hoch */}
                        <h3 className="text-base font-semibold text-foreground">
                          {benefit.title.trim()}
                        </h3>
                        {benefit.description?.trim() ? (
                          <p className="mt-1 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                            {benefit.description.trim()}
                          </p>
                        ) : null}
                      </div>
                    </li>
                  ))}
                </ul>
              </Block>
            ) : null}

            {longText ? (
              <Block id="details" title="Die Stelle im Detail">
                <div className="prose prose-neutral max-w-none dark:prose-invert prose-headings:text-base prose-headings:font-semibold prose-headings:tracking-tight prose-p:leading-relaxed">
                  <PortableText value={longText} />
                </div>
              </Block>
            ) : null}

            <div className="border-t border-border pt-8">
              <Link
                href="/karriere"
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-text hover:underline"
              >
                <ArrowLeft size={16} aria-hidden="true" />
                Alle offenen Stellen
              </Link>
            </div>
          </article>

          <aside>
            <StickySidebarApply title={job.title} quickFacts={quickFacts} />
          </aside>
        </div>
      </Section>

      <Section surface="muted">
        <BewerbungsAblauf />
      </Section>

      <Section surface="base" className="border-t border-border">
        <KarriereAnsprechpartner jobTitle={job.title} />
      </Section>

      <JobMobileApplyBar jobTitle={job.title} sentinelId="stellenkopf" />
    </>
  );
}

export async function generateStaticParams() {
  const jobs = await fetchJobs();
  return jobs.map((job) => ({
    slug: job.slug.current,
  }));
}
