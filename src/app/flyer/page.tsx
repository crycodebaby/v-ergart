'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { trackEvent, trackPageview } from '@/lib/analytics';

/**
 * Flyer-Landing-Page für Offline-Kampagne "FirstTriFoldFlyer"
 * 
 * Diese Seite wird über QR-Code auf dem gedruckten TriFold-Flyer erreicht.
 * 
 * Tracking-Flow:
 * 1. Pageview für /flyer wird getrackt
 * 2. Custom Event flyer_visit mit Kampagnenname wird getrackt
 * 3. Automatischer Redirect zur Startseite mit UTM-Parametern
 */
export default function FlyerPage() {
  const router = useRouter();

  useEffect(() => {
    const CAMPAIGN_NAME = 'FirstTriFoldFlyer';
    
    // 1. Pageview für /flyer tracken (falls nicht automatisch durch Plausible)
    trackPageview('/flyer');
    
    // 2. Custom Event für Flyer-Besuch tracken
    trackEvent('flyer_visit', {
      campaign: CAMPAIGN_NAME,
      page: '/flyer',
    });
    
    // 3. Redirect zur Startseite mit UTM-Parametern
    // Kurzer Delay um sicherzustellen, dass Tracking-Events gesendet werden
    const redirectTimer = setTimeout(() => {
      router.push(`/?utm_source=flyer&utm_medium=offline&utm_campaign=${CAMPAIGN_NAME}`);
    }, 100);
    
    return () => clearTimeout(redirectTimer);
  }, [router]);

  // Kurze Ladeanzeige während Tracking + Redirect
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-blue mx-auto mb-4" />
        <p className="text-muted-foreground">Weiterleitung...</p>
      </div>
    </div>
  );
}
