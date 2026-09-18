'use client';

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { trackBlogToService } from "@/lib/analytics";

type Props = {
  categories?: Array<{ title: string; slug: { current: string } }>;
};

// Service mapping basierend auf Kategorien
const categoryToService: Record<string, { title: string; href: string; description: string }> = {
  "fensterreinigung": {
    title: "Fensterservice & Glasreinigung",
    href: "/fensterservice",
    description: "Professionelle Reinigung für streifenfreien Durchblick",
  },
  "winterdienst": {
    title: "Winterdienst",
    href: "/leistungen/hausmeister",
    description: "Zuverlässiger Räum- und Streudienst für Ihre Sicherheit",
  },
  "hausmeisterservice": {
    title: "Hausmeisterservice",
    href: "/leistungen/hausmeister",
    description: "Rundum-Betreuung für Ihr Gebäude",
  },
  "reparatur": {
    title: "Reparaturen & Wartung",
    href: "/leistungen/hausmeister",
    description: "Schnelle Hilfe bei Schäden und regelmäßige Instandhaltung",
  },
};

export default function BlogServiceCTA({ categories }: Props) {
  // Finde passenden Service basierend auf Kategorie
  const matchedService = categories?.find(
    (cat) => categoryToService[cat.slug.current.toLowerCase()]
  );

  const service = matchedService
    ? categoryToService[matchedService.slug.current.toLowerCase()]
    : {
        title: "Unsere Leistungen",
        href: "/leistungen",
        description: "Entdecken Sie unser vollständiges Dienstleistungsangebot",
      };

  return (
    <div className="bg-gradient-to-br from-brand-blue/10 via-background to-background border border-brand-blue/20 rounded-lg p-8 mt-12">
      <h3 className="text-2xl font-bold text-foreground mb-3">
        Interessiert an {service.title}?
      </h3>
      <p className="text-muted-foreground mb-6">{service.description}</p>
      <Link
        href={service.href}
        onClick={() => trackBlogToService(service.title, matchedService?.title)}
        className="inline-flex items-center gap-2 px-6 py-3 bg-brand-blue text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
      >
        Mehr erfahren
        <ArrowRight size={18} />
      </Link>
    </div>
  );
}
