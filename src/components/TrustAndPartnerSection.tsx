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
    // Welle 2D.1 (Befund M1): Der Abstand zwischen Karte und Partnergrid ist
    // internes Layout und liegt deshalb hier — als space-y statt als my-8 in
    // der Karte. Das `px-4` an der HandwerkskammerCard ist entfallen: es hat
    // das Container-Padding der umgebenden <Section> dupliziert.
    <section
      aria-label="Zertifizierungen & Partner"
      className={cn("w-full space-y-12", className)}
    >
      <HandwerkskammerCard />

      <PartnersSection
        eyebrow="Partner, Lieferanten & Kooperationen"
        title="Starke Partner für belastbare Qualität"
        description="Zwei Fensterhersteller, Profi-Montagetechnik, lokaler Fachhandel und regionales Engagement – gemeinsam sichern wir Qualität und Werterhalt."
      />
    </section>
  );
}

export default TrustAndPartnerSection;
