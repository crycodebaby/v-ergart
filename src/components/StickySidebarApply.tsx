// src/components/StickySidebarApply.tsx
"use client";

import { Briefcase, MapPin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  title: string;
  location?: string;
  employmentType?: string;
};

export const StickySidebarApply = ({
  title,
  location,
  employmentType,
}: Props) => {
  const mailtoLink = `mailto:aergart@gmail.com?subject=Bewerbung als ${encodeURIComponent(
    title
  )}`;

  return (
    <div className="sticky top-28">
      <div className="bg-background p-6 rounded-lg shadow-md border border-border/20">
        <h3 className="text-lg font-bold text-foreground mb-2">
          Jetzt bewerben als
        </h3>
        <p className="text-2xl font-bold text-brand-blue mb-4">{title}</p>

        <div className="space-y-3 text-sm text-muted-foreground border-t border-border pt-4">
          {employmentType && (
            <div className="flex items-center gap-2">
              <Briefcase size={16} /> {employmentType}
            </div>
          )}
          {location && (
            <div className="flex items-center gap-2">
              <MapPin size={16} /> {location}
            </div>
          )}
        </div>

        <Button asChild className="w-full mt-6 py-6 text-lg">
          <a href={mailtoLink}>
            <Mail className="mr-2" size={18} />
            Per E-Mail bewerben
          </a>
        </Button>
      </div>
    </div>
  );
};
