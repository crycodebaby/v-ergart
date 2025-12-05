// src/components/StickySidebarApply.tsx
"use client";

import { Briefcase, MapPin, Mail, Phone, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackKarriereAction } from "@/lib/analytics";

type Props = {
  title: string;
  location?: string;
  employmentType?: string;
  quickFacts?: string[]; // NEW: from Sanity CMS
};

// Default fallback wenn keine quickFacts in Sanity
const DEFAULT_QUICK_FACTS = [
  "Unbefristeter Vertrag",
  "Faire Bezahlung",
  "Modernes Equipment",
  "Teamgeist & Support",
];

export const StickySidebarApply = ({
  title,
  location,
  employmentType,
  quickFacts,
}: Props) => {
  const mailtoLink = `mailto:aergart@gmail.com?subject=Bewerbung als ${encodeURIComponent(
    title
  )}`;

  // Use Sanity facts if available, otherwise use defaults
  const displayFacts = quickFacts && quickFacts.length > 0 
    ? quickFacts 
    : DEFAULT_QUICK_FACTS;

  return (
    <div className="sticky top-28">
      <div className="bg-card border border-border/40 p-6 rounded-xl shadow-lg">
        {/* Header */}
        <div className="mb-6">
          <div className="inline-flex items-center px-3 py-1 bg-brand-blue/10 text-brand-blue rounded-full text-xs font-medium mb-3">
            <span className="inline-block w-2 h-2 bg-brand-blue rounded-full mr-2 animate-pulse" />
            Jetzt bewerben
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
        </div>

        {/* Job Details */}
        <div className="space-y-3 mb-6 pb-6 border-b border-border/40">
          {employmentType && (
            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                <Briefcase className="w-4 h-4 text-muted-foreground" />
              </div>
              <span className="text-muted-foreground">{employmentType}</span>
            </div>
          )}
          {location && (
            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4 text-muted-foreground" />
              </div>
              <span className="text-muted-foreground">{location}</span>
            </div>
          )}
        </div>

        {/* Quick Facts (Dynamic from Sanity or Default) */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-foreground mb-3">Das erwartet Sie:</h4>
          <ul className="space-y-2">
            {displayFacts.map((fact, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-brand-blue flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{fact}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-3">
          <Button 
            asChild 
            className="w-full h-12 text-base font-semibold"
          >
            <a 
              href={mailtoLink}
              onClick={() => trackKarriereAction('apply_click', title)}
            >
              <Mail className="mr-2 w-5 h-5" />
              Jetzt per E-Mail bewerben
            </a>
          </Button>

          <a
            href="tel:+4917666825889"
            className="flex items-center justify-center gap-2 w-full h-12 rounded-md border-2 border-border hover:border-brand-blue hover:bg-brand-blue/5 transition-all text-sm font-medium"
          >
            <Phone className="w-4 h-4" />
            Fragen? Rufen Sie an
          </a>
        </div>

        {/* Info Text */}
        <p className="text-xs text-muted-foreground mt-6 text-center leading-relaxed">
          Senden Sie uns Ihre aussagekräftigen Bewerbungsunterlagen. 
          Wir freuen uns auf Sie!
        </p>
      </div>
    </div>
  );
};
