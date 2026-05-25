import Image from "next/image";
import { cn } from "@/lib/utils";
import type { AboutFigureData } from "@/lib/about/types";

type ResponsiveImageFigureProps = {
  figure: AboutFigureData;
  ratio?: "16/9" | "4/3" | "3/2" | "auto";
  objectFit?: "cover" | "contain";
  rounded?: "md" | "lg" | "xl" | "2xl";
  className?: string;
};

const ratioClassMap: Record<NonNullable<ResponsiveImageFigureProps["ratio"]>, string> = {
  "16/9": "aspect-video",
  "4/3": "aspect-[4/3]",
  "3/2": "aspect-[3/2]",
  auto: "",
};

const roundedClassMap: Record<NonNullable<ResponsiveImageFigureProps["rounded"]>, string> = {
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
};

export default function ResponsiveImageFigure({
  figure,
  ratio = "3/2",
  objectFit = "cover",
  rounded = "xl",
  className,
}: ResponsiveImageFigureProps) {
  const hasStableRatio = ratio !== "auto";

  return (
    <figure className={cn("w-full", className)}>
      <div
        className={cn(
          "relative overflow-hidden border border-border/40 bg-muted",
          roundedClassMap[rounded],
          ratioClassMap[ratio]
        )}
      >
        <Image
          src={figure.src}
          alt={figure.alt}
          width={figure.width ?? 1200}
          height={figure.height ?? 800}
          sizes={figure.sizes ?? "(max-width: 1024px) 100vw, 50vw"}
          priority={figure.priority}
          className={cn(
            hasStableRatio && "h-full w-full",
            objectFit === "cover" ? "object-cover" : "object-contain"
          )}
        />
      </div>
      {figure.caption || figure.credit ? (
        <figcaption className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {figure.caption ? <span>{figure.caption}</span> : null}
          {figure.caption && figure.credit ? <span> </span> : null}
          {figure.credit ? <span>{figure.credit}</span> : null}
        </figcaption>
      ) : null}
    </figure>
  );
}
