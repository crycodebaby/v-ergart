// src/app/fenster-tueren/page.tsx
/**
 * /fenster-tueren – reine Einstiegs-/Showroom-Seite.
 *
 * BEFUND Batch 1 + 2: Die Route ist intern vollständig verwaist (kein
 * einziger Link aus Header, Footer, Startseite oder Inhalt zeigt hierher,
 * nur die sitemap.xml führt sie). Eigener Inhalt existiert nicht: Die Seite
 * besteht aus zwei Bildkacheln nach /fenster und /tueren plus der
 * Partner-Sektion, die auch auf / und /fensterservice steht.
 *
 * In Batch 2 bewusst NICHT redirected oder auf noindex gesetzt – das wäre
 * ein irreversibler bzw. rankingwirksamer Schritt ohne Datengrundlage aus
 * der Search Console. Stattdessen wurde nur der Title/die Description
 * entschärft: Sie beanspruchen nicht mehr die Kauf-Keywords
 * ("Fensterbau", "professioneller Einbau"), mit denen die
 * Seite gegen /fenster und /tueren antrat, sondern beschreiben die reale
 * Funktion – eine Übersicht.
 *
 * Empfehlung für den nächsten Batch siehe Abschlussbericht: 301 auf
 * /fenster, sobald die Search-Console-Daten zeigen, dass die URL keine
 * eigenen Impressionen trägt.
 */
import { ShowroomDashboard } from "@/components/ShowroomDashboard";
import CTA from "@/components/CTA";
import { Section } from "@/components/ui/section";
import { TrustAndPartnerSection } from "@/components/TrustAndPartnerSection";
import { generateSEOMetadata } from "@/lib/seo-utils";

export const metadata = generateSEOMetadata({
  title: "Fenster & Türen – Übersicht | Alexander Ergart Neuss",
  description:
    "Übersicht unserer Fenster- und Türenbereiche: neue Fenster und Fensteraustausch, Haustüren sowie Reparatur und Wartung bestehender Fenster in Neuss und Umgebung.",
  path: "/fenster-tueren",
  image: {
    url: "/bilder_ordner/hoening/fenster/fenster-baustellenprozess/fensterelement-kran.webp",
    alt: "HÖNING Fenster und Türen – Alexander Ergart Neuss",
  },
});

export default function FensterTuerenDashboardPage() {
  return (
    <>
      <ShowroomDashboard />
      {/* Preservation-Wrapper (Welle 2D.1), siehe /: haelt den bisherigen
          Zustand dieser noch nicht migrierten Route. */}
      <Section surface="base" spacing="compact">
        <TrustAndPartnerSection />
      </Section>
      <CTA />
    </>
  );
}
