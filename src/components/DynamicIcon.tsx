// src/components/DynamicIcon.tsx
import * as LucideIcons from 'lucide-react';
import { LucideProps } from 'lucide-react';

type Props = {
  name: string;
  className?: string;
  size?: number;
};

export function DynamicIcon({ name, className, size = 24 }: Props) {
  // Get icon from lucide-react by name
  const IconComponent = (LucideIcons as any)[name] as React.ComponentType<LucideProps>;
  
  // Fallback to CheckCircle if icon not found
  if (!IconComponent) {
    const FallbackIcon = LucideIcons.CheckCircle;
    return <FallbackIcon className={className} size={size} />;
  }
  
  return <IconComponent className={className} size={size} />;
}
