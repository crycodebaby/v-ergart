import { notFound } from "next/navigation";
import { Briefcase, MapPin } from "lucide-react";
import { PortableText } from "@portabletext/react";
import { fetchJobBySlug } from "@/lib/jobs-queries";

export default async function JobDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const job = await fetchJobBySlug(params.slug);
  if (!job) return notFound();

  return (
    <div className="bg-background">
      <div className="container mx-auto max-w-3xl px-4 py-16 lg:py-24">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
          {job.title}
        </h1>
        <div className="mt-4 mb-8 text-md text-muted-foreground flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 border-b border-border pb-6">
          {job.employmentType && (
            <span className="flex items-center gap-2">
              <Briefcase size={16} /> {job.employmentType}
            </span>
          )}
          {job.location && (
            <span className="flex items-center gap-2">
              <MapPin size={16} /> {job.location}
            </span>
          )}
        </div>
        <div className="prose dark:prose-invert max-w-none">
          {job.description ? (
            <PortableText value={job.description} />
          ) : (
            <p>Keine Beschreibung vorhanden.</p>
          )}
        </div>
      </div>
    </div>
  );
}
