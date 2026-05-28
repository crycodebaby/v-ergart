import type { ReactNode } from "react";
import type { AboutFigureData } from "@/lib/about/types";
import { cn } from "@/lib/utils";
import SectionHeader from "./SectionHeader";
import ResponsiveImageFigure from "./ResponsiveImageFigure";

type MediaTextBlockProps = {
  eyebrow?: string;
  title: string;
  intro?: string;
  paragraphs?: string[];
  figure: AboutFigureData;
  mediaPosition?: "left" | "right";
  ratio?: "16/9" | "4/3" | "3/2" | "auto";
  objectFit?: "cover" | "contain";
  children?: ReactNode;
  className?: string;
};

export default function MediaTextBlock({
  eyebrow,
  title,
  intro,
  paragraphs,
  figure,
  mediaPosition = "right",
  ratio = "3/2",
  objectFit = "cover",
  children,
  className,
}: MediaTextBlockProps) {
  return (
    <div
      className={cn(
        "grid items-start gap-10 lg:grid-cols-2 lg:gap-12",
        mediaPosition === "left" && "lg:[&>*:first-child]:order-2",
        className
      )}
    >
      <div>
        <SectionHeader eyebrow={eyebrow} title={title} intro={intro} />
        {paragraphs?.length ? (
          <div className="mt-6 max-w-prose space-y-4 text-base leading-relaxed text-muted-foreground">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        ) : null}
        {children ? <div className="mt-6">{children}</div> : null}
      </div>
      <ResponsiveImageFigure figure={figure} ratio={ratio} objectFit={objectFit} />
    </div>
  );
}
