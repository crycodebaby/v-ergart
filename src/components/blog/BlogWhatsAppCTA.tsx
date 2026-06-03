import WhatsAppButton from "@/components/contact/WhatsAppButton";
import { cn } from "@/lib/utils";

type BlogWhatsAppCTAProps = {
  className?: string;
  title?: string;
  description?: string;
};

/**
 * Wiederverwendbarer WhatsApp-Business-Kontaktbutton für den Blog.
 * Eingebunden auf der Blog-Startseite und in jedem Artikel.
 */
export default function BlogWhatsAppCTA({
  className,
  title = "Noch Fragen? Schreiben Sie uns direkt",
  description = "Schildern Sie uns Ihr Anliegen oder senden Sie ein Foto – wir antworten in der Regel kurzfristig per WhatsApp.",
}: BlogWhatsAppCTAProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-950/15 p-6 sm:p-8",
        className
      )}
    >
      <h3 className="text-xl font-bold text-foreground">{title}</h3>
      <p className="mt-2 text-muted-foreground leading-relaxed">{description}</p>
      <div className="mt-5">
        <WhatsAppButton
          label="Per WhatsApp Kontakt aufnehmen"
          iconSize={22}
          className="px-6 py-3 border-emerald-500/40 hover:border-emerald-500/60"
        />
      </div>
    </div>
  );
}
