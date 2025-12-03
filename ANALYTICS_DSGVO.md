# Plausible Analytics - DSGVO-konforme Implementierung

## Verwendetes Tool

**Plausible Analytics** (https://plausible.io)
- EU-gehostet (Deutschland)
- Open Source
- Cookie-los & DSGVO-freundlich
- Kein Consent-Banner erforderlich

---

## Was wird getrackt?

### Automatisch (ohne Code-Änderung)
- **Pageviews**: Alle Seitenaufrufe
- **Referrer**: Woher kommen Besucher (Google, Direkt, Social, etc.)
- **UTM-Parameter**: Kampagnen-Tracking (utm_source, utm_medium, utm_campaign)
- **Gerätetyp**: Desktop vs. Mobile
- **Land**: Basierend auf IP (ohne IP-Speicherung!)

### Custom Events (vertriebsrelevant)

#### CTA & Kontakt
- `cta_contact_click` - Kontakt-Button geklickt (mit Position: header/footer/hero/blog_cta)
- `cta_phone_click` - Telefonnummer geklickt
- `cta_email_click` - E-Mail-Adresse geklickt

#### Lead-Generierung
- `lead_form_view` - Kontaktformular angezeigt
- `lead_form_submit` - Kontaktformular abgeschickt

#### Blog & Content
- `blog_to_service_click` - Navigation von Blog zur Dienstleistungsseite

#### Karriere
- `karriere_apply_click` - Bewerbungs-Interest
- `karriere_detail_view` - Karriere-Detailseite angesehen

#### Offline-Kampagnen
- `flyer_visit` - Besucher über QR-Code/Flyer

---

## Offline-Kampagnen (Flyer / QR-Code)

### QR-Code URL für Flyer

Für den Firmenflyer mit QR-Code verwenden wir:

```
https://alexander-ergart.de/flyer
```

**Was passiert:**
1. Kunde scannt QR-Code → wird auf `/flyer` geleitet
2. Custom Event `flyer_visit` wird getrackt
3. Automatischer Redirect zur Startseite mit UTM-Parametern:
   ```
   /?utm_source=flyer&utm_medium=offline&utm_campaign=ergart_hausmeister_flyer_2025
   ```

### Auswertung in Plausible

Die Flyer-Performance lässt sich in Plausible auf **3 Arten** messen:

1. **Via Pageview**: Filter auf Seite `/flyer`
2. **Via UTM**: Filter auf `utm_source=flyer`
3. **Via Custom Event**: Filter auf Event `flyer_visit`

**Empfohlene Metriken:**
- Anzahl Besucher über Flyer (Event `flyer_visit`)
- Conversion Flyer → Kontakt (Funnel: `flyer_visit` → `lead_form_submit`)
- Bounce Rate der Flyer-Besucher

### Datenerhebung (DSGVO-konform)

**Was wird getrackt:**
- ✅ Kampagnen-Kennung (`utm_source=flyer`)
- ✅ Medium (`utm_medium=offline`)  
- ✅ Event-Name (`flyer_visit`)
- ✅ Aggregierte Statistiken (Anzahl Besuche, Zeit, Seiten)

**Was wird NICHT getrackt:**
- ❌ Keine personenbezogenen Daten
- ❌ Keine IP-Adressen
- ❌ Keine Cookies
- ❌ Keine individuellen User-IDs

---

## Datenerhebung im Detail

| Datenart | Erfasst? | Personenbezogen? | Speicherdauer |
|----------|----------|------------------|---------------|
| IP-Adresse | ❌ Nein (anonymisiert) | Nein | - |
| Cookies | ❌ Nein | Nein | - |
| User-ID | ❌ Nein | Nein | - |
| Geräteinformationen | ✅ Ja (aggregiert) | Nein | 2 Jahre |
| Referrer/UTM | ✅ Ja | Nein | 2 Jahre |
| Besuchte Seiten | ✅ Ja | Nein | 2 Jahre |
| Event-Properties* | ✅ Ja | **Nein** | 2 Jahre |

***Event-Properties** enthalten **ausschließlich technische/kontextuelle Informationen**:
- Position (`header`, `footer`, `hero`)
- Seite (URL-Pfad)
- Service-Name (technisch, z.B. "Fensterreinigung")
- Form-ID (technisch)

**Niemals enthalten:**
- Namen, E-Mail-Adressen, Telefonnummern
- Freitextnachrichten
- Andere personenbezogene Daten

---

## Rechtsgrundlage (DSGVO)

**Art. 6 Abs. 1 lit. f DSGVO** - Berechtigtes Interesse

### Begründung
- ✅ Cookielos → Kein Einwilligungsbedarf
- ✅ Keine Personenbezogenen Daten
- ✅ Legitimes Interesse an Website-Optimierung und Vertriebsanalyse
- ✅ Keine Weitergabe an Dritte
- ✅ EU-Hosting (keine USA-Übertragung)
- ✅ Aggregierte, anonymisierte Datenauswertung

### Kein Consent-Banner erforderlich!

Da Plausible:
- ✅ Keine Cookies setzt
- ✅ Keine IP-Adressen speichert  
- ✅ Keine User-IDs vergibt
- ✅ Daten aggregiert und anonymisiert

ist nach aktueller Rechtsprechung **kein Consent-Banner** nötig.

---

## Hosting & Datenspeicherung

- **Plausible Server**: EU (Deutschland)
- **Next.js App**: Vercel (Edge-Server weltweit, primär EU)
- **Datenübertragung**: Verschlüsselt (HTTPS)
- **Zugriff**: Nur Websitebetreiber

---

## Plausible Goals - Setup-Anleitung

### Im Plausible Dashboard

Gehe zu: https://plausible.io → Deine Site → **Settings** → **Goals**

#### Custom Events einrichten:

Füge folgende **Custom Events** hinzu:

```
cta_contact_click
cta_phone_click
cta_email_click
blog_to_service_click
lead_form_view
lead_form_submit
karriere_apply_click
flyer_visit
```

#### Pageview Goals (optional):

```
/kontakt
/karriere/*
/blog/*
/flyer
```

**Empfohlene Funnels:**
1. **Blog Conversion**: `blog_to_service_click` → `lead_form_submit`
2. **Flyer Conversion**: `flyer_visit` → `lead_form_submit`
3. **Karriere Interest**: `karriere_detail_view` → `karriere_apply_click`

---

## Konfiguration (.env)

```env
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=alexander-ergart.de
```

Keine API-Keys oder Secrets erforderlich - Plausible ist öffentlich zugänglich.

---

## Datenschutzerklärung - Textvorschlag

> **Webanalyse**
> 
> Diese Website nutzt Plausible Analytics, einen datenschutzfreundlichen Webanalysedienst. Plausible verwendet keine Cookies und erhebt keine personenbezogenen Daten. Die Analyse erfolgt anonym und aggregiert. Die erhobenen Daten (Seitenaufrufe, Referrer, Gerätetypen, Kampagnenquellen) werden auf Servern in der EU gespeichert und dienen ausschließlich der Verbesserung unseres Angebots und der Messung von Marketing-Maßnahmen (z.B. Printmedien mit QR-Codes).
>
> **Rechtsgrundlage:** Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse)
>
> **Weitere Informationen:** https://plausible.io/privacy

---

## Technische Implementierung

- **Package**: `next-plausible` (NPM)
- **Integration**: Root Layout (`app/layout.tsx`)
- **API**: `lib/analytics.ts` (vendor-agnostisch, type-safe)
- **TypeScript**: Vollständig typisiert
- **Error-Safe**: Kein Crash bei Ad-Blockern
- **Zero Cookies**: Keine Cookie-Banner erforderlich

### Code-Beispiele

**CTA-Button tracken:**
```typescript
import { trackCTAClick } from '@/lib/analytics';

<button onClick={() => trackCTAClick('contact', 'header')}>
  Kontakt
</button>
```

**Formular tracken:**
```typescript
import { trackLeadForm } from '@/lib/analytics';

// Bei Formular-Anzeige
useEffect(() => {
  trackLeadForm('view', 'contact_form');
}, []);

// Bei Submit
const handleSubmit = () => {
  trackLeadForm('submit', 'contact_form');
  // ... Formular-Logik
};
```

---

## Support & Fragen

Bei Fragen zur Analytics-Integration:
- **Code**: `src/lib/analytics.ts`
- **Dokumentation**: `implementation_plan.md`
- **Plausible Dashboard**: https://plausible.io (mit Login)
- **Plausible Docs**: https://plausible.io/docs
