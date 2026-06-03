// src/components/TrustAndPartnerSection.tsx
/**
 * TrustAndPartnerSection
 *
 * Bündelt Trust-Signale für die kommerziellen Seiten:
 *   1. Handwerkskammer Düsseldorf (Mitgliedschaft / Zertifizierung)
 *   2. Zentrale Partner-Sektion (<PartnersSection />)
 *
 * Die Partnerkarten kommen ausschließlich aus der zentralen Quelle
 * (src/lib/partners.ts) und werden über <PartnersSection /> gerendert –
 * dadurch sind sie auf JEDER Seite identisch und responsive. Neue Partner
 * werden nur an einer Stelle (src/lib/partners.ts) ergänzt.
 */
import { HandwerkskammerCard } from "./HandwerkskammerCard";
import PartnersSection from "./PartnersSection";
import { cn } from "@/lib/utils";

interface TrustAndPartnerSectionProps {
  className?: string;
}

export function TrustAndPartnerSection({
  className,
}: TrustAndPartnerSectionProps) {
  return (
    <section
      aria-label="Zertifizierungen & Partner"
      className={cn("w-full", className)}
    >
      <HandwerkskammerCard className="px-4" />

      <PartnersSection
        eyebrow="Partner & Kooperationen"
        title="Starke Partner für belastbare Qualität"
        description="Verlässliche Hersteller, lokale Fachpartner und regionales Engagement – gemeinsam sichern wir Qualität und Werterhalt."
      />
    </section>
  );
}

export default TrustAndPartnerSection;
