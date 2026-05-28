import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type FeatureGridProps = {
  columns?: 1 | 2 | 3 | 4;
  className?: string;
  as?: "div" | "ul";
  children: ReactNode;
};

const columnClasses: Record<NonNullable<FeatureGridProps["columns"]>, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  // Tablet-first: auf iPad (md/lg) 2 Spalten, erst ab xl 3 Spalten
  3: "grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
  4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
};

export default function FeatureGrid({
  columns = 3,
  as = "div",
  className,
  children,
}: FeatureGridProps) {
  const Tag = as;
  return <Tag className={cn("grid gap-6", columnClasses[columns], className)}>{children}</Tag>;
}
