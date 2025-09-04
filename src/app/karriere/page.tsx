import Link from "next/link";
import { Briefcase, MapPin } from "lucide-react";
import { fetchJobs } from "@/lib/jobs-queries";

export default async function KarrierePage() {
  const jobs = await fetchJobs();

  return (
    <div className="bg-slate-50 dark:bg-zinc-900 min-h-[70vh]">
      <div className="container mx-auto max-w-4xl px-4 py-16 lg:py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground">
            Karriere bei Ergart
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Werden Sie Teil eines Teams, das auf Qualität, Zuverlässigkeit und
            Handwerkskunst setzt.
          </p>
        </div>

        <div className="space-y-6">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <Link
                key={job._id}
                href={`/karriere/${job.slug.current}`}
                className="block bg-background p-6 rounded-lg shadow-md border border-border/20 hover:border-brand-blue hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold text-foreground group-hover:text-brand-blue transition-colors">
                      {job.title}
                    </h2>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2 text-sm text-muted-foreground">
                      {job.employmentType && (
                        <span className="flex items-center gap-1.5">
                          <Briefcase size={14} /> {job.employmentType}
                        </span>
                      )}
                      {job.location && (
                        <span className="flex items-center gap-1.5">
                          <MapPin size={14} /> {job.location}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="hidden sm:inline-block text-brand-blue font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    Details anzeigen →
                  </span>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center p-8 bg-background rounded-lg">
              <h3 className="text-xl font-semibold">
                Aktuell sind keine Stellen ausgeschrieben.
              </h3>
              <p className="text-muted-foreground mt-2">
                Schauen Sie bald wieder vorbei!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
