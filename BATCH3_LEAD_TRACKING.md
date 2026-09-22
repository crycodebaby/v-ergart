# Batch 3 – Fenster-Lead: Attribution, serverseitige Lead-ID, `generate_lead`

Umfang: **Websitebesuch → Attribution → Fensterformular → serverseitig
akzeptierter Lead → eindeutige `lead_id` → DataLayer `generate_lead`.**

CRM-Status (QUALIFIED/WON), Offline-Conversion-Upload und jede Konfiguration
in Google-Konten sind **nicht** Teil dieses Batches.

---

## A. Architektur vorher / nachher

**Vorher**

```
Browser (/fenster)
  └─ ContactForm (generisch)
      └─ reCAPTCHA-Token holen
          └─ fetch  ──►  https://formcarry.com/s/tUPZr1Mwu_1   (URL hartkodiert im Client)
                            └─ E-Mail an Ergart
      └─ dataLayer: fensterservice_lead_submit_success
```

Kein Lead-Identifier. Keine Kampagnendaten. Validierung nur im Browser.
Das Conversion-Event feuerte, sobald Formcarry irgendein `res.ok` lieferte.

**Nachher**

```
Browser (/fenster)
  └─ AttributionTracker (Root-Layout, consent-aware)
      └─ First-/Last-Touch  →  RAM (ohne Consent) | localStorage (mit Consent)

  └─ FensterAnfrageForm
      └─ reCAPTCHA-Token holen
          └─ POST /api/leads/fenster   (eigener Origin)
                ├─ 1. Größenlimit (20 KB)
                ├─ 2. Honeypot          → 200 { muted } ohne lead_id
                ├─ 3. Idempotenz-Reservierung (synchron)
                ├─ 4. Schema-/Enum-Validierung        → 400
                ├─ 5. reCAPTCHA                       → 403
                ├─ 6. Ratenlimit                      → 429
                ├─ 7. lead_id = crypto.randomUUID()
                ├─ 8. Zustellung ──► Formcarry (serverseitig, Attribution angehängt)
                │                     └─ E-Mail an Ergart   → Fehler: 502
                └─ 9. { ok, lead_id, analytics }
      └─ nur bei vorhandener lead_id:
            dataLayer: generate_lead  (+ Legacy-Event, s. Abschnitt K)
            Plausible: lead_form_submit
```

---

## B. Datenmodell – die drei Ebenen sind strikt getrennt

### 1. Lead / PII — **nur** im Lead-Datensatz (Formcarry-Posteingang)

`name`, `email`, `phone`, `message`, `plz` (+ deutsche Klartext-Labels
`vorhaben`, `fensteranzahl`, `objektart`, `zeitraum`, `zusammenfassung`).

### 2. Attribution — **nur** im Lead-Datensatz

Unterstützt: `gclid`, `gbraid`, `wbraid`, `utm_source`, `utm_medium`,
`utm_campaign`, `utm_content`, `utm_term` – jeweils als First- und
Last-Touch (`first_*` / `last_*`), dazu `first_landing_page`,
`first_referrer`, `first_captured_at`, `source_page`, `created_at`,
`attribution_consent`, `attribution_storage`.

### 3. Analytics — **nur** DataLayer / Plausible

| Feld | Werte |
|---|---|
| `lead_id` | UUID v4 (serverseitig) |
| `lead_type` | `new_windows` \| `window_replacement` |
| `window_count_bucket` | `one` \| `two_to_four` \| `five_to_ten` \| `more_than_ten` \| `unknown` |
| `property_type` | `single_family_house` \| `multi_family_house` \| `apartment` \| `commercial` \| `other` |
| `timeframe` | `asap` \| `1_3_months` \| `3_6_months` \| `later` |
| `source_page` | z. B. `/fenster` |

Kein Name, keine E-Mail, keine Telefonnummer, keine Nachricht, **keine PLZ**.
Die PLZ bleibt bewusst ausschließlich im Lead-Datensatz.

Strukturelle Absicherung: der **Server** baut das Analytics-Objekt
(`LeadAnalyticsPayload`) und gibt es zurück; der Client pusht es unverändert
per Spread. Ein PII-Feld kann dort gar nicht erst hineingeraten.

---

## C. Lead-ID — Nachweis

* **Serverseitig erzeugt:** `crypto.randomUUID()` in
  `src/app/api/leads/fenster/route.ts`, Schritt 7. Ein vom Client
  mitgeschicktes `lead_id` wird nirgends gelesen.
* **Zurückgegeben:** `{ ok: true, lead_id, analytics }`.
* **Mit dem Lead transportiert:** als `lead_id` im Formcarry-Payload, im
  Betreff (`… (462a52b1)`) und in der Klartext-Zusammenfassung.
* **Im Event verwendet:** identische ID in `generate_lead` — belegt in E.

---

## D. Attributionstests (Browser, 9 Szenarien)

`LS` = `localStorage["ergart_attribution_v1"]`, `RAM` = Modulvariable.

| # | Szenario | Consent | gespeichert wo | Inhalt | im Lead | im DataLayer |
|---|---|---|---|---|---|---|
| 1 | direkt, keine Parameter | denied | **nur RAM**, LS `null` | `landing_page:/fenster` | first_landing_page | – |
| 2 | `?gclid=test-gclid` | unknown | **nur RAM**, LS `null` | gclid first+last | first_gclid, last_gclid | – |
| 3 | volle UTM (5 Parameter) | unknown | **nur RAM**, LS `null` | alle 5 first+last | first_utm_* | – |
| 4 | `?gbraid=test-gbraid-001` | unknown | **nur RAM**, LS `null` | gbraid | first_gbraid | – |
| 5 | `?wbraid=test-wbraid-002` | unknown | **nur RAM**, LS `null` | wbraid | first_wbraid | – |
| 6 | `/fenster` → `/referenzen` → `/fenster` (Reload) | granted | LS | first_touch **unverändert** | Kampagne A | – |
| 6b | dieselbe Route per Client-Navigation | **denied** | nur RAM | first_touch überlebt, URL wieder parameterlos | Kampagne A | – |
| 7 | zweiter Kampagnenbesuch (Kampagne B) | granted | LS | `first`=A, `last`=B | first_*=A, last_*=B | – |
| 8 | „Nur notwendige Cookies“ | denied | **LS gelöscht** (`null`) | RAM bleibt | Attribution der Sitzung | – |
| 9 | „Alle akzeptieren“ | granted | LS **neu geschrieben** | RAM-Stand wird nachträglich persistiert | vollständig | – |

Kernaussagen:

* **Ohne Einwilligung wird nichts auf dem Endgerät gespeichert.** In allen
  Szenarien mit `denied`/`unknown` war `localStorage` nachweislich `null`.
* **First-Touch wird nie überschrieben.** Szenario 7: `first_gclid` blieb
  `KAMPAGNE-A-111`, während `last_gclid` auf `KAMPAGNE-B-999` wechselte.
* **Ein gewöhnlicher Seitenwechsel schreibt nichts.** `last_touch` wird nur
  bei einem Aufruf *mit* Kampagnenparametern aktualisiert – sonst würde jede
  Unterseite die Kampagne leer überschreiben.
* Attribution landet **nie** im DataLayer.

---

## E. DataLayer-Beweis

Erfolgreicher Testlead (Mobil-Viewport, nur E-Mail als Kontaktweg):

```json
{
  "event": "generate_lead",
  "lead_id": "8c1d99cd-9ee1-416a-8c26-2474e3780e26",
  "lead_type": "new_windows",
  "window_count_bucket": "more_than_ten",
  "property_type": "commercial",
  "timeframe": "3_6_months",
  "source_page": "/fenster"
}
```

Automatisierte Prüfung über den **gesamten** `window.dataLayer` nach dem
Absenden (gesucht wurde nach den tatsächlich eingegebenen Werten
`Testkunde`, `Doppelklick`, `0211`, `7654321`, `TESTANFRAGE`, `41462`):

```json
{
  "generate_lead_im_gesamten_dataLayer": 1,
  "PII_treffer_im_dataLayer": [],
  "PII_treffer_im_lead_request": ["Testkunde","Doppelklick","0211","7654321","TESTANFRAGE","41462"]
}
```

→ Event genau **1×**; `lead_id` vorhanden; **keine** E-Mail, **kein** Name,
**keine** Telefonnummer, **keine** Nachricht, **keine** PLZ. Die PII existiert
ausschließlich im Request an die eigene Lead-Route.

**Fehlerfälle — `generate_lead` = 0×:**

| Fall | Ergebnis |
|---|---|
| leeres Formular (Clientvalidierung) | 0 Requests, `form_error`, **0× generate_lead** |
| gültiger Lead, Zustellweg ausgefallen (502) | Fehlertext im UI, kein Erfolgs-State, **0× generate_lead** |
| Honeypot | 200 ohne `lead_id` → Client feuert nicht |

---

## F. Servervalidierung – Testmatrix (16/16 wie erwartet)

| Fall | Status | Code |
|---|---|---|
| gültiger Lead | **200** | `lead_id` gesetzt |
| kein Kontaktweg (weder Tel. noch E-Mail) | **400** | `validation_failed` / `contact` |
| ungültige E-Mail | **400** | `validation_failed` / `email` |
| ungültige PLZ (4-stellig) | **400** | `validation_failed` / `postalCode` |
| ungültige PLZ (`00123`) | **400** | `validation_failed` / `postalCode` |
| fehlender Name | **400** | `validation_failed` / `name` |
| manipuliertes `intent` (`repair`) | **400** | `validation_failed` / `intent` |
| manipuliertes `windowCount` (`999`) | **400** | `validation_failed` / `windowCount` |
| manipuliertes `propertyType` (`castle`) | **400** | `validation_failed` / `propertyType` |
| manipuliertes `timeframe` (`yesterday`) | **400** | `validation_failed` / `timeframe` |
| fehlende Datenschutz-Zustimmung | **400** | `validation_failed` / `privacyConsent` |
| unplausible Telefonnummer | **400** | `validation_failed` / `phone` |
| Nachricht > 2000 Zeichen | **400** | `validation_failed` / `message` |
| Payload > 20 KB | **413** | `payload_too_large` |
| Bot / Honeypot | **200** | `muted: true`, **ohne** `lead_id` |
| fehlendes reCAPTCHA-Token | **403** | `recaptcha_missing` |
| reCAPTCHA von Google abgelehnt | **403** | `recaptcha_rejected`, **0 Zustellungen** |
| Upstream antwortet 500 | **502** | `upstream_error` |
| Upstream nicht erreichbar | **502** | `upstream_unreachable` |
| Ratenlimit überschritten | **429** | `rate_limited` |
| `GET` statt `POST` | **405** | `method_not_allowed` |

Keine Fehlermeldung nennt Interna, Upstream-URLs oder Secrets.

---

## G. Zustellung – über den bestehenden Weg belegt

Ein als Test gekennzeichneter Lead (`TESTLEAD Batch3 (bitte ignorieren)`,
`batch3-test@example.invalid`, Telefon `0000 0000000`) wurde über die
Lead-Route an den **echten** Formcarry-Endpunkt geschickt:

```
HTTP 200
{ "ok": true, "lead_id": "025926fa-8706-4b54-b165-44e08f1b89d8", "analytics": { … } }
Serverlog:  POST /api/leads/fenster 200 in 196ms
```

Damit ist belegt, dass Formcarry serverseitige POSTs ohne Browser-Origin
akzeptiert (die Route setzt `Origin`/`Referer` explizit auf die Live-Domain).
**Eine echte Test-E-Mail liegt jetzt im Ergart-Posteingang und kann gelöscht
werden.** Keine echten Kundendaten verwendet.

Gegen einen lokalen Mock-Upstream wurde zusätzlich der vollständige
ausgehende Payload protokolliert – Aufbau siehe Abschnitt B.

---

## H. Browserprüfung

| | Desktop 1268 px | Mobil 500 px |
|---|---|---|
| Formular vollständig nutzbar | ✓ | ✓ (einspaltig gestapelt) |
| Clientvalidierung | ✓ alle Pflichtfelder melden sich | ✓ |
| Loading-State | ✓ „Wird gesendet…“, Button disabled | ✓ |
| Success-State | ✓ ersetzt das Formular | ✓ |
| Fehlerzustand | ✓ `role="alert"` | ✓ |
| Überlagerung | keine – Absende-Button ist oberstes Element am Klickpunkt | keine (Sticky-CTA überlappt nicht) |
| Console Errors | **0** | **0** |
| Horizontaler Overflow | **nein** (`scrollWidth == clientWidth`) | **nein** |

Touch-Target des Absende-Buttons: **44 px** Höhe.

Einschränkung: Chrome ließ das Fenster nicht unter 500 px CSS-Breite
verkleinern; 500 px liegt unterhalb des `md`-Breakpoints (768 px), d. h. das
getestete Layout **ist** das Mobil-Layout. Ein Test bei exakt 390 px steht aus.

`/fensterservice` gegengeprüft: unverändertes Formular
(`name, email, phone, service, message, consent`), Button weiterhin
„Nachricht senden“, keine Console-Errors.

---

## I. Technische Tests

| Prüfung | Ergebnis |
|---|---|
| TypeScript (`tsc --noEmit`) | ✓ fehlerfrei |
| ESLint (`next lint`) | ✓ keine Warnungen |
| Production Build | ✓ 60/60 Seiten, `/fenster` bleibt **statisch** (`○`) |
| Vorhandene Tests | keine im Repository vorhanden |
| API-Matrix | 16/16 |
| Browser-Console | 0 Fehler |

Der Build bestätigt, dass die `<Suspense>`-Boundary um den
`AttributionTracker` wirkt: `useSearchParams()` hätte sonst alle Seiten aus
dem statischen Rendering geworfen.

---

## J. Geänderte und neue Dateien

| Datei | Änderung | Zweck | Daten-/Tracking-Auswirkung |
|---|---|---|---|
| `src/lib/fenster-lead.ts` | **neu** | Enums, Limits, Wire-Typen – eine Quelle für Client und Server | definiert, welche Felder Analytics-tauglich sind |
| `src/lib/attribution.ts` | **neu** | First-/Last-Touch, consent-aware | einziger Ort, der Attribution speichert |
| `src/components/AttributionTracker.tsx` | **neu** | erfasst Parameter bei jedem Aufruf; hört auf Consent-Event | schreibt ohne Einwilligung nichts aufs Endgerät |
| `src/components/FensterAnfrageForm.tsx` | **neu** | dediziertes Verkaufsformular | erzeugt `generate_lead` (genau 1×) + Legacy-Event + Plausible |
| `src/app/api/leads/fenster/route.ts` | **neu** | Validierung, Anti-Spam, `lead_id`, Zustellung | einziger Ort, der PII verarbeitet; erzeugt das Analytics-Objekt |
| `src/components/FensterBeratung.tsx` | ersetzt `ContactForm` durch `FensterAnfrageForm` | Verkaufs-Datenmodell auf `/fenster` | `/fenster` sendet nicht mehr direkt an Formcarry |
| `src/app/layout.tsx` | `<Suspense><AttributionTracker /></Suspense>` | Attribution auf allen Seiten | kein Einfluss auf Consent Mode oder GTM |
| `src/components/CookieBanner.tsx` | sendet `ergart:consent`-Event | Attribution erfährt von der Entscheidung | Consent-Mode-Logik selbst **unverändert** |

**Nicht angefasst:** `ContactForm.tsx`, `useRecaptcha.ts`, `analytics.ts`,
`/api/contact`, der Consent-Mode-Default in `layout.tsx`, GTM-Einbindung,
Plausible-Einbindung, `/fensterservice`.

---

## K. Ausdrücklich NICHT konfiguriert

GTM-Container, GA4-Tags, Google-Ads-Conversion-Aktionen, Enhanced
Conversions, Google Ads Data Manager, Offline-Conversion-Upload, PMax,
Kampagneneinstellungen, CRM-Anbindung, QUALIFIED/WON-Logik. In keinem
externen Konto wurde etwas verändert.

### Bestandsevent bewusst beibehalten

`fensterservice_lead_submit_success` feuert auf `/fenster` weiterhin – direkt
nach `generate_lead`. Grund: sollte in GTM bereits eine Conversion darauf
liegen, würde sie sonst stillschweigend ausfallen. **Sobald die neue
Conversion auf `generate_lead` läuft, muss dieses Doppel-Event entfernt
werden, sonst zählt Google doppelt** (Datei `FensterAnfrageForm.tsx`, der
zweite `dataLayer.push` im Erfolgszweig).

---

## L. Manuelle nächste Schritte (außerhalb des Repositories)

1. **`RECAPTCHA_SECRET_KEY` in Vercel setzen — hohe Priorität.**
   Befund aus dem Zustellungstest: ein Lead mit dem frei erfundenen Token
   `batch3-delivery-proof` wurde von Formcarry mit **HTTP 200** angenommen.
   Das deutet stark darauf hin, dass Formcarry das reCAPTCHA-Token gar nicht
   verifiziert – der Schutz wäre bisher also dekorativ. Mit gesetztem Secret
   prüft die eigene Route selbst gegen Google (nachgewiesen: ungültiges
   Secret → 403 `recaptcha_rejected`, **0 Zustellungen**). Optional:
   `RECAPTCHA_MIN_SCORE` (Default 0.5).
2. **Datenschutzerklärung juristisch prüfen lassen.** Offener Punkt, bewusst
   nicht eigenmächtig geändert: gclid/UTM werden auch ohne Einwilligung
   *zusammen mit dem Lead* an den eigenen Server übertragen, wenn sie in
   derselben Sitzung in der URL standen. Das ist kein Speichervorgang auf dem
   Endgerät, sondern Verarbeitung im Rahmen der Anfragebearbeitung – ob das
   so abgedeckt ist, muss ein Jurist beurteilen. Ebenso zu prüfen: der
   `localStorage`-Key `ergart_attribution_v1` nach erteilter Einwilligung.
3. **GTM:** Trigger auf `generate_lead` anlegen, GA4-Event und
   Google-Ads-Conversion daran hängen. Danach das Legacy-Event nach
   Abschnitt K entfernen.
4. **Formcarry-Posteingang:** den Testlead
   `025926fa-8706-4b54-b165-44e08f1b89d8` löschen.
5. Optional: `FORMCARRY_ENDPOINT` als Env-Variable setzen (Default bleibt der
   bisherige, im Client ohnehin öffentliche Endpunkt).

---

## Bekannte Grenzen (ehrlich benannt)

* **Idempotenz und Ratenlimit leben im Prozessspeicher.** Auf Vercel wirken
  sie pro warmer Instanz, nicht global. Für die tatsächliche Lead-Menge ist
  das angemessen; eine Datenbank nur dafür wäre unverhältnismäßig. Der
  Doppelklick-Schutz greift dadurch zuverlässig (gleiche Instanz), ein
  Duplikat über zwei Kaltstarts hinweg wäre theoretisch möglich.
* **Ohne Einwilligung überlebt die Attribution keinen Reload und keinen
  neuen Tab.** Das ist kein Defekt, sondern die Konsequenz aus §25 TTDSG.
* **Mobil-Layout bei exakt 390 px ungetestet** (siehe H).
* Ob Formcarry das reCAPTCHA-Token prüft, ist nicht bewiesen, sondern nur
  stark indiziert (siehe L.1).

---

# Nachtrag Batch 3.2 – alle Formulare über den eigenen Server

## Formularinventar

| URL | Komponente | Endpoint vorher | Endpoint nachher | serverseitiges reCAPTCHA | Zustellziel |
|---|---|---|---|---|---|
| `/fenster` | `FensterAnfrageForm` | `/api/leads/fenster` | `/api/leads/fenster` | ja, Action `window_lead_submit` | Formcarry (serverseitig) |
| `/kontakt` | `ContactForm` | **Browser → formcarry.com** | `/api/leads/contact` | ja, Action `contact_form_submit` | Formcarry (serverseitig) |
| `/fensterservice` | `ContactForm` | **Browser → formcarry.com** | `/api/leads/contact` | ja, Action `contact_form_submit` | Formcarry (serverseitig) |

Repositoryweit gibt es nur diese zwei Formularkomponenten und keine weiteren
Formulare auf Leistungs- oder Karriereseiten.

`/api/contact` (Resend-basiert, unreferenziert, ohne reCAPTCHA, mit einem
Debug-Zweig der Upstream-Fehler an den Client zurückgab) wurde entfernt.

## reCAPTCHA je Formularart

| | `/fenster` | `/kontakt` + `/fensterservice` |
|---|---|---|
| Action | `window_lead_submit` | `contact_form_submit` |
| Threshold | `RECAPTCHA_MIN_SCORE`, Default 0.5 | identisch |
| Hostnames | `alexander-ergart.de`, `localhost` | identisch |
| Fail-closed | ja | ja |
| Token an Formcarry | nein | nein |

Getrennte Actions heißt: ein auf `/kontakt` erzeugtes Token ist an der
Fenster-Route ungültig und umgekehrt (beide Richtungen getestet).

## Tracking – welches Event entsteht wo

| Formular | Erfolgsereignisse |
|---|---|
| `/fenster` | `generate_lead` (1×, mit `lead_id`) **+** `fensterservice_lead_submit_success` (Legacy) + Plausible `lead_form_submit` |
| `/kontakt` | `fensterservice_lead_submit_success` + Plausible `lead_form_submit` |
| `/fensterservice` | `fensterservice_lead_submit_success` + Plausible `lead_form_submit` |

Unverändert gegenüber Batch 3.1. Kein neues Conversion-Event eingeführt.
`generate_lead` entsteht weiterhin ausschließlich auf `/fenster`.

## Preview-Deployments

`*.vercel.app` steht bewusst **nicht** in der Hostname-Allowlist. Auf einem
Vercel-Preview schlägt jeder Formular-Submit deshalb mit 403
`recaptcha_rejected` fehl. Das ist gewollt. Vorgesehene E2E-Umgebungen sind
`localhost` und Produktion.
