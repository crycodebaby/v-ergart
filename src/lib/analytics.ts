/**
 * Zentrale Analytics-Schicht für vertriebsrelevantes Tracking
 * 
 * Features:
 * - Type-safe Event API
 * - Vendor-agnostisch (einfacher Austausch von Plausible)
 * - Error-safe (kein Crash bei blockiertem Script)
 * - DSGVO-konform (cookielos via Plausible)
 * - Sales-optimiert (Lead-Tracking, Offline-Kampagnen)
 */

// ============================================================================
// EVENT TYPES (Type-Safe)
// ============================================================================

// Vertriebsrelevante Event-Typen
export type AnalyticsEvent =
  // CTA-Klicks (allgemein)
  | 'cta_contact_click'
  | 'cta_phone_click'
  | 'cta_email_click'
  // Blog → Service Conversion
  | 'blog_to_service_click'
  // Lead-Generierung (Kontaktformular)
  | 'lead_form_view'
  | 'lead_form_submit'
  // Karriere
  | 'karriere_apply_click'
  | 'karriere_detail_view'
  // Service-Interesse
  | 'service_detail_view'
  | 'service_cta_click'
  // Offline-Kampagnen
  | 'flyer_visit';

// Event-Properties (optional, für Kontext ohne personenbezogene Daten)
export interface AnalyticsEventProps {
  // Position des Elements auf der Seite
  position?: 'header' | 'footer' | 'hero' | 'blog_cta' | 'sidebar' | 'inline';
  // Aktuelle Seite (path)
  page?: string;
  // Service/Kategorie (technisch, kein Freitext)
  service?: string;
  category?: string;
  // Formular-Kontext
  form_id?: string;
  form_context?: string;
  // Kampagnen-Info
  campaign?: string;
  // Custom Properties (technisch, KEINE personenbezogenen Daten!)
  [key: string]: string | number | boolean | undefined;
}

// ============================================================================
// CORE TRACKING FUNCTIONS
// ============================================================================

/**
 * Track ein Custom Event
 * 
 * @example
 * trackEvent('cta_contact_click', { position: 'header', page: window.location.pathname })
 * 
 * WICHTIG: Niemals personenbezogene Daten im Payload!
 */
export function trackEvent(
  event: AnalyticsEvent,
  props?: AnalyticsEventProps
): void {
  try {
    if (typeof window !== 'undefined' && window.plausible) {
      window.plausible(event, { props: props || {} });
    }
  } catch (error) {
    // Fehler nicht werfen, um App nicht zu crashen
    if (process.env.NODE_ENV === 'development') {
      console.warn('Analytics Event konnte nicht getrackt werden:', event, error);
    }
  }
}

/**
 * Track einen Pageview (wird normalerweise automatisch von Plausible gemacht)
 */
export function trackPageview(url?: string): void {
  try {
    if (typeof window !== 'undefined' && window.plausible) {
      window.plausible('pageview', { u: url });
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('Pageview konnte nicht getrackt werden:', error);
    }
  }
}

// ============================================================================
// HELPER FUNCTIONS (Vertriebsorientiert)
// ============================================================================

/**
 * Track CTA-Button-Klick (Kontakt, Telefon, Email)
 * 
 * @param type - Art des CTAs
 * @param position - Position auf der Seite
 * @param page - Aktuelle Seite (optional, wird automatisch ermittelt)
 */
export function trackCTAClick(
  type: 'contact' | 'phone' | 'email',
  position?: AnalyticsEventProps['position'],
  page?: string
): void {
  const eventMap = {
    contact: 'cta_contact_click' as const,
    phone: 'cta_phone_click' as const,
    email: 'cta_email_click' as const,
  };
  
  const currentPage = page || (typeof window !== 'undefined' ? window.location.pathname : undefined);
  
  trackEvent(eventMap[type], { 
    position,
    page: currentPage,
  });
}

/**
 * Track Blog → Service Navigation
 */
export function trackBlogToService(service: string, category?: string): void {
  trackEvent('blog_to_service_click', { 
    service, 
    category,
    page: typeof window !== 'undefined' ? window.location.pathname : undefined,
  });
}

/**
 * Track Lead-Form Events
 * 
 * @param action - 'view' beim Laden, 'submit' beim Absenden
 * @param formId - Technische ID des Formulars (KEIN Freitext!)
 */
export function trackLeadForm(
  action: 'view' | 'submit', 
  formId?: string,
  formContext?: string
): void {
  const event = action === 'view' ? 'lead_form_view' : 'lead_form_submit';
  trackEvent(event, { 
    form_id: formId,
    form_context: formContext,
    page: typeof window !== 'undefined' ? window.location.pathname : undefined,
  });
}

/**
 * Track Karriere/Bewerbungs-Interest
 */
export function trackKarriereAction(
  action: 'apply_click' | 'detail_view',
  jobTitle?: string
): void {
  const event = action === 'apply_click' ? 'karriere_apply_click' : 'karriere_detail_view';
  trackEvent(event, {
    service: jobTitle, // Technisch: Job-Titel, kein Freitext
    page: typeof window !== 'undefined' ? window.location.pathname : undefined,
  });
}

/**
 * Track Flyer/QR-Code Besuch (Offline-Kampagne)
 * 
 * Wird automatisch auf /flyer Route aufgerufen
 * 
 * @param campaign - Name der Kampagne (z.B. "FirstTriFoldFlyer")
 */
export function trackFlyerVisit(campaign?: string): void {
  trackEvent('flyer_visit', {
    campaign: campaign || 'FirstTriFoldFlyer',
    page: '/flyer',
  });
}

// ============================================================================
// TYPESCRIPT TYPES
// ============================================================================

declare global {
  interface Window {
    plausible?: (
      event: string,
      options?: { props?: Record<string, any>; u?: string }
    ) => void;
  }
}
