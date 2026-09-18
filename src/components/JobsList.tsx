// src/components/JobsList.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Briefcase, Check, Clock, Mail, MapPin } from "lucide-react";
import {
  cleanList,
  formatEmploymentType,
  type JobPosting,
} from "@/lib/jobs-queries";

export default function JobsList({ jobs }: { jobs: JobPosting[] }) {
  if (jobs.length === 0) {
    return (
      <div className="mx-auto max-w-xl rounded-2xl border border-border bg-card p-10 text-center shadow-sm">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-blue/10">
          <Briefcase className="h-8 w-8 text-brand-text" aria-hidden="true" />
        </div>
        <h3 className="text-2xl font-bold text-foreground">
          Aktuell keine offenen Stellen
        </h3>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Gute Leute suchen wir trotzdem immer. Schicken Sie uns eine kurze
          Initiativbewerbung – wir melden uns.
        </p>
        <a
          href="mailto:info@ergart.de?subject=Initiativbewerbung"
          className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-6 font-semibold text-primary-foreground transition-colors hover:bg-brand-solid-hover"
        >
          <Mail size={18} aria-hidden="true" />
          Initiativbewerbung senden
        </a>
      </div>
    );
  }

  return (
    <ul className="space-y-6">
      {jobs.map((job, index) => {
        const tasks = cleanList(job.responsibilities).slice(0, 3);
        const employmentType = formatEmploymentType(job.employmentType);

        return (
          <motion.li
            key={job._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
          >
            <Link
              href={`/karriere/${job.slug.current}`}
              aria-label={`${job.title} – Stellenanzeige ansehen`}
              className="group relative block overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-blue/50 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {/* Akzentkante */}
              <span
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-1.5 bg-brand-blue transition-all duration-300 group-hover:w-2.5"
              />

              <div className="grid gap-6 p-6 pl-8 md:p-8 md:pl-10 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-10">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    {employmentType ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-blue/10 px-3 py-1 text-xs font-semibold text-brand-text">
                        <Briefcase size={13} aria-hidden="true" />
                        {employmentType}
                      </span>
                    ) : null}
                    {job.location ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                        <MapPin size={13} aria-hidden="true" />
                        {job.location}
                      </span>
                    ) : null}
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                      <Clock size={13} aria-hidden="true" />
                      Start nächstmöglich
                    </span>
                  </div>

                  <h3 className="mt-4 text-2xl font-bold text-foreground transition-colors group-hover:text-brand-text md:text-3xl">
                    {job.title}
                  </h3>

                  {job.metaDescription ? (
                    <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
                      {job.metaDescription}
                    </p>
                  ) : null}

                  {tasks.length > 0 ? (
                    <ul className="mt-5 grid gap-x-6 gap-y-2 text-sm text-foreground sm:grid-cols-2">
                      {tasks.map((task) => (
                        <li key={task} className="flex items-start gap-2">
                          <Check
                            size={16}
                            className="mt-0.5 shrink-0 text-brand-text"
                            aria-hidden="true"
                          />
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>

                <span className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-6 font-semibold text-primary-foreground transition-colors group-hover:bg-brand-solid-hover lg:self-center">
                  Stelle ansehen
                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </Link>
          </motion.li>
        );
      })}
    </ul>
  );
}
