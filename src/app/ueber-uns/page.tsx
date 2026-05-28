// src/app/ueber-uns/page.tsx
import Image from "next/image";
import SectionShell from "@/components/about/SectionShell";
import SectionHeader from "@/components/about/SectionHeader";
import MediaTextBlock from "@/components/about/MediaTextBlock";
import FeatureGrid from "@/components/about/FeatureGrid";
import FeatureCard from "@/components/about/FeatureCard";
import LogoPartnerGrid from "@/components/about/LogoPartnerGrid";
import CTAGroup from "@/components/about/CTAGroup";
import ResponsiveImageFigure from "@/components/about/ResponsiveImageFigure";
import { ABOUT_PAGE_DATA } from "@/lib/about/about-page-data";
import { ABOUT_ASSETS } from "@/lib/about/about-assets";
import { generateSEOMetadata } from "@/lib/seo-utils";
import {
  Building2,
  Compass,
  Handshake,
  HeartHandshake,
  MapPin,
  ShieldCheck,
  Sparkles,
  Workflow,
  Wrench,
} from "lucide-react";

export const metadata = generateSEOMetadata({
  title:
    "Über uns | Alexander Ergart - Hausmeisterservice, Fensterservice & Immobilienverwaltung",
  description:
    "Lernen Sie Alexander Ergart kennen: strukturierter Hausmeister- und Fensterservice mit klaren Prozessen, starken Partnern und Fokus auf langfristigen Werterhalt in Neuss und der Region.",
  path: "/ueber-uns",
  image: {
    url: ABOUT_PAGE_DATA.hero.figure.src,
    alt: ABOUT_PAGE_DATA.hero.figure.alt,
  },
});

export default function UeberUnsPage() {
  const data = ABOUT_PAGE_DATA;

  return (
    <>
      <SectionShell id={data.hero.id} spacing="lg" containerWidth="2xl" className="pt-10 md:pt-14">
        <div className="relative overflow-hidden rounded-3xl border border-border/50 shadow-xl">
          <Image
            src={data.hero.figure.src}
            alt={data.hero.figure.alt}
            width={data.hero.figure.width ?? 1600}
            height={data.hero.figure.height ?? 1000}
            priority
            sizes={data.hero.figure.sizes ?? "100vw"}
            className="h-[56vh] min-h-[440px] max-h-[660px] w-full object-cover md:h-[62vh] lg:h-[66vh]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/20" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 opacity-80">
            <svg
              viewBox="0 0 1440 160"
              aria-hidden="true"
              className="h-20 w-full text-brand-blue/25"
              preserveAspectRatio="none"
            >
              <path
                d="M0,96 C210,132 370,36 560,62 C760,90 920,156 1120,128 C1260,108 1350,76 1440,84 L1440,160 L0,160 Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <div className="absolute inset-0 flex items-end p-6 md:p-10">
            <div className="max-w-2xl rounded-2xl border border-white/20 bg-black/35 p-5 backdrop-blur-md md:p-7">
              <p className="inline-flex rounded-full border border-brand-blue/30 bg-brand-blue/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                {data.hero.eyebrow}
              </p>
              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white md:text-5xl">
                {data.hero.title}
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-200 md:text-lg">
                {data.hero.intro}
              </p>
              <div className="mt-6">
                <CTAGroup data={data.hero.ctas} inverted />
              </div>
            </div>
          </div>
        </div>
      </SectionShell>

      <SectionShell id={data.origin.id} tone="muted">
        <MediaTextBlock
          eyebrow={data.origin.eyebrow}
          title={data.origin.title ?? ""}
          intro={data.origin.intro}
          paragraphs={data.origin.paragraphs}
          figure={data.origin.figure}
          mediaPosition="right"
          ratio="4/3"
          objectFit="cover"
          className="items-center"
        />
      </SectionShell>

      <SectionShell id={data.leadership.id}>
        <MediaTextBlock
          eyebrow={data.leadership.eyebrow}
          title={data.leadership.title ?? ""}
          paragraphs={data.leadership.paragraphs}
          figure={data.leadership.figure}
          mediaPosition="left"
          ratio="3/2"
          objectFit="cover"
          className="items-center"
        />
      </SectionShell>

      <SectionShell id={data.milestones.id} tone="muted">
        <SectionHeader
          eyebrow={data.milestones.eyebrow}
          title={data.milestones.title ?? ""}
          intro="Kompakt, nachvollziehbar und auf langfristige Entwicklung ausgerichtet."
          icon={<Compass size={18} />}
          align="center"
          className="mx-auto max-w-3xl"
        />
        <FeatureGrid columns={2} className="mt-10">
          {data.milestones.items.map((item) => (
            <FeatureCard
              key={item.id}
              title={item.title}
              body={item.body}
              badge={item.year}
              icon={<Workflow size={14} />}
            />
          ))}
        </FeatureGrid>
      </SectionShell>

      <SectionShell id={data.regionScope.id}>
        <SectionHeader
          eyebrow={data.regionScope.eyebrow}
          title={data.regionScope.title ?? ""}
          intro="Kurze Wege, klare Kommunikation und saubere Umsetzung vor Ort."
          icon={<MapPin size={18} />}
          align="center"
          className="mx-auto max-w-3xl"
        />
        <FeatureGrid columns={3} className="mt-10">
          <article className="rounded-xl border border-border/40 bg-card/90 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-foreground">Einsatzgebiet</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {data.regionScope.regions.map((region) => (
                <span
                  key={region}
                  className="rounded-full border border-border/60 bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground"
                >
                  {region}
                </span>
              ))}
            </div>
          </article>
          <FeatureCard
            title="Leistungen für private Kunden"
            body={data.regionScope.b2cServices.join(" • ")}
            icon={<HeartHandshake size={14} />}
          />
          <FeatureCard
            title="Leistungen für B2B & Verwaltung"
            body={data.regionScope.b2bServices.join(" • ")}
            icon={<Building2 size={14} />}
          />
        </FeatureGrid>
      </SectionShell>

      <SectionShell id={data.quality.id} tone="muted">
        <SectionHeader
          eyebrow={data.quality.eyebrow}
          title={data.quality.title ?? ""}
          intro={data.quality.intro}
          icon={<ShieldCheck size={18} />}
          align="center"
          className="mx-auto max-w-3xl"
        />
        <FeatureGrid columns={3} className="mt-10">
          {data.quality.principles.map((principle) => (
            <FeatureCard
              key={principle.id}
              title={principle.title}
              body={principle.body}
              icon={<Sparkles size={14} />}
            />
          ))}
        </FeatureGrid>
        {data.quality.toolsNote ? (
          <p className="mx-auto mt-8 max-w-4xl text-sm leading-relaxed text-muted-foreground">
            {data.quality.toolsNote}
          </p>
        ) : null}
      </SectionShell>

      <SectionShell id={data.partnerships.id}>
        <SectionHeader
          eyebrow={data.partnerships.eyebrow}
          title={data.partnerships.title ?? ""}
          intro="Qualität entsteht in der Zusammenarbeit mit starken Partnern und kurzen Lieferwegen."
          icon={<Handshake size={18} />}
          align="center"
          className="mx-auto max-w-3xl"
        />
        <div className="mt-10">
          <LogoPartnerGrid partners={data.partnerships.partners} />
        </div>
        <div className="mx-auto mt-10 max-w-4xl">
          <ResponsiveImageFigure
            figure={{
              ...ABOUT_ASSETS.windowService,
              caption:
                "Fenster- und Türenservice mit Fokus auf Qualität, Funktion und langlebige Ergebnisse.",
            }}
          />
        </div>
      </SectionShell>

      <SectionShell id={data.future.id} tone="muted">
        <SectionHeader
          eyebrow={data.future.eyebrow}
          title={data.future.title ?? ""}
          intro="Digitale Prozesse sollen Transparenz, Wartungssicherheit und Werterhalt weiter verbessern."
          icon={<Wrench size={18} />}
          align="center"
          className="mx-auto max-w-3xl"
        />
        <div className="mx-auto mt-8 max-w-3xl space-y-3 text-base leading-relaxed text-muted-foreground">
          {data.future.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <p className="mx-auto mt-6 max-w-3xl rounded-xl border border-border/60 bg-card p-4 text-sm leading-relaxed text-muted-foreground">
          {data.future.disclaimer}
        </p>
      </SectionShell>

      <SectionShell id={data.socialEngagement.id}>
        <SectionHeader
          eyebrow={data.socialEngagement.eyebrow}
          title={data.socialEngagement.title}
          intro={data.socialEngagement.body}
          icon={<HeartHandshake size={18} />}
          align="center"
          className="mx-auto max-w-3xl"
        />
        <div className="mx-auto mt-8 max-w-4xl">
          {data.socialEngagement.figure ? (
            <ResponsiveImageFigure figure={data.socialEngagement.figure} ratio="3/2" />
          ) : (
            <div className="rounded-xl border border-dashed border-border/70 bg-muted p-6 text-sm leading-relaxed text-muted-foreground">
              <p>
                Bild folgt nach Lieferung der optimierten Datei.
              </p>
              <p className="mt-2 font-medium">
                TODO: {data.socialEngagement.imageTodo}
              </p>
              <p className="mt-2">Bildnachweis: K&amp;L Verlag</p>
            </div>
          )}
        </div>
        {data.socialEngagement.legalNote ? (
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            {data.socialEngagement.legalNote}
          </p>
        ) : null}
      </SectionShell>

      <SectionShell id={data.values.id} tone="muted">
        <SectionHeader
          eyebrow={data.values.eyebrow}
          title={data.values.title ?? ""}
          icon={<ShieldCheck size={18} />}
          align="center"
          className="mx-auto max-w-3xl"
        />
        <FeatureGrid columns={3} className="mt-10">
          {data.values.principles.map((principle) => (
            <FeatureCard
              key={principle.id}
              title={principle.title}
              body={principle.body}
              icon={<ShieldCheck size={14} />}
            />
          ))}
        </FeatureGrid>
      </SectionShell>

      <SectionShell id={data.finalCta.id} tone="accent" className="border-y border-border/40">
        <SectionHeader
          eyebrow={data.finalCta.eyebrow}
          title={data.finalCta.title ?? ""}
          intro="Direkter Kontakt, klare Abstimmung und verbindliche nächste Schritte."
          icon={<Handshake size={18} />}
          align="center"
          className="mx-auto max-w-3xl"
        />
        <div className="mt-4">
          <CTAGroup data={data.finalCta.ctas} align="center" />
        </div>
      </SectionShell>
    </>
  );
}