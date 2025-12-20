// src/components/ProfileCard.tsx
"use client";

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Check, FileText } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const ProfileCard = () => {
  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(null);

  const certificates = [
    { id: "1", title: "Zertifikat 1 (TÜV)", image: "z1.webp" },
    { id: "2", title: "Zertifikat 2 (Sicherheit)", image: "z2.webp" },
  ];

  return (
    <motion.section
      id="profilkarte"
      className="py-16 px-5"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="container max-w-6xl mx-auto border-2 border-brand-blue/50 dark:border-brand-blue/30 rounded-2xl p-5 shadow-lg bg-slate-50 dark:bg-black/30 backdrop-blur-sm">
        <div className="flex flex-wrap justify-center items-center gap-10">
          <div className="profil-image flex-shrink-0">
            <Image
              src="/bilder_ordner/fensterbauer-neuss-profi.webp"
              alt="Alexander Ergart – Geschäftsführer Hausmeister- und Fensterservice Neuss"
              width={300}
              height={300}
              className="rounded-xl object-cover shadow-md transition-transform duration-300 hover:scale-105"
              quality={85}
            />
          </div>
          <div className="profil-details flex-1 min-w-[300px] text-zinc-800 dark:text-gray-200 p-5 rounded-xl">
            <h2 className="text-4xl font-bold text-foreground">Alexander Ergart</h2>
            <p className="subtitle text-xl text-muted-foreground mb-5">
              Ihr zuverlässiger Hausmeister und Allround-Handwerker
            </p>
            <p className="description text-base leading-relaxed mb-5">
              Mit über <strong>12 Jahren Erfahrung</strong> in Gebäudemanagement und Handwerk stehe ich für Qualität, Zuverlässigkeit und persönlichen Service.
            </p>
            <div className="zertifikate">
              <h3 className="text-2xl font-semibold mb-4 text-brand-blue">Zertifikate</h3>
              <ul className="list-none p-0 mb-6 space-y-2">
                <li className="flex items-start gap-3">
                  <Check className="text-brand-blue mt-1 flex-shrink-0" size={20} />
                  <span>TÜV Nord: Beauftragte Person für Aufzugsanlagen nach TRBS 3121</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-brand-blue mt-1 flex-shrink-0" size={20} />
                  <span>Sicherheitsbeauftragter gemäß DGUV Vorschrift 1</span>
                </li>
              </ul>
              <Dialog>
                <div className="flex flex-col sm:flex-row gap-4">
                  {certificates.map((cert) => (
                    <DialogTrigger asChild key={cert.id}>
                      <Button onClick={() => setSelectedCertificate(cert.image)} variant="outline">
                        <FileText className="mr-2 h-4 w-4" />
                        {cert.title}
                      </Button>
                    </DialogTrigger>
                  ))}
                </div>
                <DialogContent className="bg-background p-0 border-none max-w-3xl">
                  <DialogHeader className="p-4 border-b">
                    <DialogTitle>Zertifikat Ansicht</DialogTitle>
                  </DialogHeader>
                  <div className="p-4">
                    {selectedCertificate && (
                      <Image
                        src={`/bilder_ordner/zertifikate/${selectedCertificate}`}
                        alt="Zertifikat von Alexander Ergart – TÜV und Sicherheitsbeauftragter"
                        width={800}
                        height={1120}
                        className="w-full h-auto rounded-md"
                        quality={90}
                      />
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ProfileCard;