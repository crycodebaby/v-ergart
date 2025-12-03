// src/components/JobDetailTracking.tsx
'use client';

import { useEffect } from 'react';
import { trackKarriereAction } from '@/lib/analytics';

type Props = {
  jobTitle: string;
};

export function JobDetailTracking({ jobTitle }: Props) {
  useEffect(() => {
    // Track job detail view
    trackKarriereAction('detail_view', jobTitle);
  }, [jobTitle]);

  return null; // This component only tracks, doesn't render
}
