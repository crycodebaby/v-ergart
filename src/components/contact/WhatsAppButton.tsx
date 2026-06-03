import { Button } from "@/components/ui/button";
import { SITE_LINKS } from "@/lib/site-links";
import Image from "next/image";

type WhatsAppButtonProps = {
  label?: string;
  helperText?: string;
  variant?: "default" | "outline" | "ghost";
  className?: string;
  iconSize?: number;
};

export default function WhatsAppButton({
  label = "Per WhatsApp schreiben",
  helperText,
  variant = "outline",
  className,
  iconSize = 20,
}: WhatsAppButtonProps) {
  return (
    <div>
      <Button asChild variant={variant} className={className}>
        <a
          href={SITE_LINKS.external.whatsappChat}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Per WhatsApp mit Alexander Ergart chatten"
          data-track="whatsapp-chat"
          className="inline-flex items-center gap-2"
        >
          <Image
            src="/bilder_ordner/icons/whatsapp.svg"
            alt=""
            aria-hidden="true"
            width={iconSize}
            height={iconSize}
            className="shrink-0 rounded-[22%]"
            unoptimized
          />
          {label}
        </a>
      </Button>
      {helperText ? (
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{helperText}</p>
      ) : null}
    </div>
  );
}
