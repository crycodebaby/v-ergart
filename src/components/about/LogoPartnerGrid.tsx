import Image from "next/image";
import Link from "next/link";
import type { AboutPartner } from "@/lib/about/types";
import FeatureGrid from "./FeatureGrid";

type LogoPartnerGridProps = {
  partners: AboutPartner[];
};

export default function LogoPartnerGrid({ partners }: LogoPartnerGridProps) {
  return (
    <FeatureGrid columns={3} as="ul">
      {partners.map((partner) => (
        <li
          key={partner.id}
          className="group relative h-full overflow-hidden rounded-xl border border-border/40 bg-card/90 p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-blue/30 hover:shadow-md"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-brand-blue/10 blur-2xl"
          />
          <div className="mb-5 flex min-h-[64px] items-center">
            <Image
              src={partner.logo.src}
              alt={partner.logo.alt}
              width={partner.logo.width ?? 180}
              height={partner.logo.height ?? 64}
              className="h-auto max-h-14 w-auto object-contain"
            />
          </div>
          <h3 className="text-lg font-semibold text-foreground">{partner.name}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{partner.body}</p>
          {partner.href ? (
            <div className="mt-4">
              <Link
                href={partner.href}
                target={partner.href.startsWith("http") ? "_blank" : undefined}
                rel={partner.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="text-sm font-medium text-brand-blue hover:underline"
              >
                {partner.hrefLabel ?? "Mehr erfahren"}
              </Link>
            </div>
          ) : null}
        </li>
      ))}
    </FeatureGrid>
  );
}
