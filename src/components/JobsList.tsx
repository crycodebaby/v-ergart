// src/components/JobsList.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Briefcase, MapPin } from "lucide-react";
import type { JobPosting } from "@/lib/jobs-queries";

export default function JobsList({ jobs }: { jobs: JobPosting[] }) {
  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ staggerChildren: 0.1 }}
    >
      {jobs.length > 0 ? (
        jobs.map((job) => (
          <motion.div
            key={job._id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link
              href={`/karriere/${job.slug.current}`}
              className="block bg-card p-6 rounded-lg shadow-md border border-border/20 hover:border-brand-blue hover:shadow-xl transition-all duration-300 group"
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
          </motion.div>
        ))
      ) : (
        <div className="text-center p-8 bg-card rounded-lg">
          <h3 className="text-xl font-semibold">
            Aktuell sind keine Stellen ausgeschrieben.
          </h3>
          <p className="text-muted-foreground mt-2">
            Schauen Sie bald wieder vorbei!
          </p>
        </div>
      )}
    </motion.div>
  );
}
