// src/components/JobsList.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Briefcase, MapPin, ArrowRight, Clock, Euro } from "lucide-react";
import type { JobPosting } from "@/lib/jobs-queries";

export default function JobsList({jobs }: { jobs: JobPosting[] }) {
  if (jobs.length === 0) {
    return (
      <div className="text-center py-16 px-4">
        <div className="max-w-md mx-auto">
          <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
            <Briefcase className="w-10 h-10 text-muted-foreground" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-3">
            Aktuell keine offenen Stellen
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Momentan haben wir keine offenen Stellenangebote. Schauen Sie gerne später
            noch einmal vorbei oder senden Sie uns eine Initiativbewerbung.
          </p>
          <a
            href="mailto:aergart@gmail.com"
            className="inline-flex items-center gap-2 text-brand-blue hover:underline font-medium"
          >
            Initiativbewerbung senden
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {jobs.map((job, index) => (
        <motion.div
          key={job._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Link
            href={`/karriere/${job.slug.current}`}
            className="group block"
          >
            <article className="relative bg-card border border-border/40 rounded-xl p-6 hover:border-brand-blue/50 hover:shadow-xl transition-all duration-300 overflow-hidden">
              {/* Gradient Background Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative">
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center flex-shrink-0">
                        <Briefcase className="w-5 h-5 text-brand-blue" />
                      </div>
                      {job.employmentType && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                          {job.employmentType}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-brand-blue transition-colors">
                      {job.title}
                    </h3>
                  </div>

                  {/* Arrow Icon */}
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center group-hover:bg-brand-blue transition-colors">
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-white transition-colors" />
                  </div>
                </div>

                {/* Excerpt */}
                {job.excerpt && (
                  <div className="text-muted-foreground text-sm mb-4 line-clamp-2 leading-relaxed">
                    {/* Simplified excerpt rendering - you might want to use PortableText here */}
                    {job.metaDescription || 'Erfahren Sie mehr über diese spannende Position.'}
                  </div>
                )}

                {/* Footer Info */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  {job.location && (
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </span>
                  )}
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    Zum nächstmöglichen Zeitpunkt
                  </span>
                </div>

                {/* Hover Effect Line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-blue via-blue-500 to-brand-blue transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </div>
            </article>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
