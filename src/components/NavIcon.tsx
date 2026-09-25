// src/components/NavIcon.tsx
/**
 * Löst die Icon-Namen aus src/lib/navigation.ts in lucide-Komponenten auf.
 * Die Navigationsdaten bleiben dadurch frei von React-Importen und sind
 * auch aus Server-Komponenten (Footer, Breadcrumbs) nutzbar.
 */
import {
  Building,
  DoorOpen,
  Home,
  LayoutGrid,
  Leaf,
  Paintbrush,
  Shield,
  Wrench,
  type LucideProps,
} from "lucide-react";
import type { NavIconName } from "@/lib/navigation";

const ICONS: Record<NavIconName, React.ComponentType<LucideProps>> = {
  building: Building,
  door: DoorOpen,
  wrench: Wrench,
  paintbrush: Paintbrush,
  leaf: Leaf,
  home: Home,
  shield: Shield,
  "layout-grid": LayoutGrid,
};

export function NavIcon({
  name,
  ...props
}: LucideProps & { name: NavIconName | undefined }) {
  const Icon = name ? ICONS[name] : LayoutGrid;
  return <Icon aria-hidden="true" {...props} />;
}
