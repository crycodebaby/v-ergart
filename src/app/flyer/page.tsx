import { redirect } from 'next/navigation';
import { trackFlyerVisit } from '@/lib/analytics';

export default function FlyerPage() {
  // Track Flyer Visit
  if (typeof window !== 'undefined') {
    trackFlyerVisit('hausmeister_flyer_2025');
  }
  
  // Redirect zur Startseite mit UTM-Parametern
  const targetUrl = '/?utm_source=flyer&utm_medium=offline&utm_campaign=ergart_hausmeister_flyer_2025';
  redirect(targetUrl);
}
