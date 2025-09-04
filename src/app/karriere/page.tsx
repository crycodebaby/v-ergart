// src/app/karriere/page.tsx
import { fetchJobs } from "@/lib/jobs-queries";
import JobsList from "@/components/JobsList";
import { Award, ShieldCheck, Users } from "lucide-react";

export default async function KarrierePage() {
  const jobs = await fetchJobs();

  return (
    <>
      <div className="bg-background">
        <div className="container mx-auto max-w-7xl px-4 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Jobliste */}
            <div className="lg:col-span-2">
              <JobsList jobs={jobs} />
            </div>

            {/* Sidebar "Warum bei Ergart arbeiten?" */}
            <aside className="lg:sticky top-28 h-fit">
              <div className="bg-card p-6 rounded-lg shadow-md border border-border/20">
                <h3 className="text-lg font-bold text-foreground mb-4">
                  Warum bei Ergart arbeiten?
                </h3>
                <ul className="space-y-4 text-sm text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <Award
                      size={16}
                      className="text-brand-blue mt-1 flex-shrink-0"
                    />
                    <span>
                      <strong>Qualitätsfokus:</strong> Wir liefern Arbeit, auf
                      die man stolz sein kann.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ShieldCheck
                      size={16}
                      className="text-brand-blue mt-1 flex-shrink-0"
                    />
                    <span>
                      <strong>Sicherer Arbeitsplatz:</strong> Unbefristeter
                      Vertrag & moderne Ausrüstung.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Users
                      size={16}
                      className="text-brand-blue mt-1 flex-shrink-0"
                    />
                    <span>
                      <strong>Starkes Team:</strong> Respektvoller, ehrlicher
                      Umgang & Unterstützung.
                    </span>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
