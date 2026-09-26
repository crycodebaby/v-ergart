// src/components/FensterAustauschCheck.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Wind,
  Droplets,
  Flame,
  Hand,
  ShieldAlert,
  PanelsTopLeft,
} from "lucide-react";

/**
 * "Wann lohnt sich ein Fensteraustausch?" – der Bedarfs-/Problemblock auf
 * /fenster.
 *
 * Steht bewusst direkt unter dem Hero: Bevor die Seite Produktqualitaet
 * erklaert, muss sie den Besucher in seiner Situation abholen. Er kommt in
 * der Regel nicht mit "ich will Fenster kaufen", sondern mit "es zieht",
 * "die Heizkosten explodieren", "das Ding ist von 1985".
 *
 * Inhaltliche Grenze: Hier stehen nur Symptome und Einordnungen, KEINE
 * versprochenen Einsparungen in Euro oder Prozent. Belastbare Zahlen dazu
 * liegen im Projekt nicht vor; wer rechnen will, wird weiter unten an den
 * Energieeinsparrechner von HÖNING verwiesen.
 *
 * Der letzte Absatz verweist bewusst auf /fensterservice: Nicht jedes
 * Symptom rechtfertigt einen Austausch, und eine Verkaufsseite, die das
 * verschweigt, verliert Vertrauen.
 */

const anzeichen = [
  {
    icon: Wind,
    title: "Es zieht spürbar",
    text: "Kalte Luft am geschlossenen Fenster – wenn neue Dichtungen und eine Neueinstellung das nicht beheben, ist der Rahmen am Ende.",
  },
  {
    icon: PanelsTopLeft,
    title: "Einfach- oder alte Doppelverglasung",
    text: "Elemente aus den 1980ern und früher verlieren ein Vielfaches der Wärme moderner Verglasung. Hier lohnt der Austausch fast immer.",
  },
  {
    icon: Droplets,
    title: "Beschlagene Scheiben innen im Glas",
    text: "Kondenswasser zwischen den Scheiben heißt: Der Randverbund ist undicht. Das lässt sich nicht reparieren, die Einheit muss getauscht werden.",
  },
  {
    icon: Flame,
    title: "Hohe Heizkosten trotz neuer Heizung",
    text: "Wenn die Wärme durch die Fensterflächen entweicht, bringt die effizienteste Heizung wenig. Die Gebäudehülle entscheidet mit.",
  },
  {
    icon: Hand,
    title: "Der Flügel klemmt dauerhaft",
    text: "Nachjustieren hilft bei fast jedem Fenster. Hilft es nicht mehr, hat sich meist der Rahmen selbst verzogen.",
  },
  {
    icon: ShieldAlert,
    title: "Kein Einbruchschutz vorhanden",
    text: "Alte Elemente haben oft nur Rollzapfen ohne Pilzkopfverriegelung. Neue Fenster gibt es mit geprüfter Einbruchhemmung bis RC2.",
  },
];

export default function FensterAustauschCheck() {
  return (
    <>
      <div className="mx-auto mb-14 max-w-3xl text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-4 inline-block rounded-full bg-brand-blue/10 px-4 py-1.5 text-sm font-medium text-brand-text"
        >
          Bedarf klären
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mb-4 text-3xl font-bold text-foreground md:text-4xl"
        >
          Wann lohnt sich ein Fensteraustausch?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg leading-relaxed text-muted-foreground"
        >
          Sechs Anzeichen, bei denen neue Fenster wirtschaftlich sinnvoller sind
          als weitere Reparaturen. Trifft eines davon auf Ihr Haus zu, schauen
          wir es uns kostenlos vor Ort an.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {anzeichen.map((punkt, index) => (
          <motion.div
            key={punkt.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.08 }}
            className="h-full rounded-2xl border border-border bg-card p-6 md:p-8"
          >
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-brand-blue/10">
              <punkt.icon
                size={28}
                className="text-brand-text"
                aria-hidden="true"
              />
            </div>
            <h3 className="mb-3 text-xl font-bold text-foreground">
              {punkt.title}
            </h3>
            <p className="leading-relaxed text-muted-foreground">
              {punkt.text}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Ehrlicher Gegenhinweis – und der interne Weg zum anderen Intent */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto mt-10 max-w-2xl text-center text-muted-foreground"
      >
        Nicht jedes Problem braucht ein neues Fenster. Klemmende Flügel, poröse
        Dichtungen und verstellte Beschläge lassen sich meist preiswert instand
        setzen –{" "}
        <Link
          href="/fensterservice"
          className="font-semibold text-brand-text underline underline-offset-4"
        >
          Fenster reparieren &amp; warten lassen
        </Link>
        . Wir sagen Ihnen bei der Besichtigung offen, welcher Weg sich rechnet.
      </motion.p>
    </>
  );
}
