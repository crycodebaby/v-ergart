import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { AboutCtaLink } from "@/lib/about/types";

type ButtonLinkProps = {
  link: AboutCtaLink;
  variant?: "default" | "outline" | "ghost" | "link";
  size?: "default" | "sm" | "lg";
  className?: string;
};

export default function ButtonLink({
  link,
  variant = "default",
  size = "default",
  className,
}: ButtonLinkProps) {
  const isExternal = link.kind === "external";

  return (
    <Button asChild variant={variant} size={size} className={className}>
      <Link
        href={link.href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        data-track={link.trackingId}
        aria-label={link.ariaLabel}
      >
        {link.label}
      </Link>
    </Button>
  );
}
