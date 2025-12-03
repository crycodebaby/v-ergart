# Vercel Build-Fehler beheben - Sanity Project ID

## Problem

Der Vercel Build schlägt mit folgendem Fehler fehl:
```
Dataset not found - Dataset "production" not found for project ID "c76lselw"
```

**Ursache**: Vercel verwendet noch die alte Sanity Project ID. Die Environment-Variablen auf Vercel müssen aktualisiert werden.

---

## Lösung: Vercel Environment Variables aktualisieren

### Schritt 1: Zu Vercel gehen
1. Gehe zu https://vercel.com
2. Öffne dein Projekt (v-ergart)
3. Gehe zu **Settings** → **Environment Variables**

### Schritt 2: Neue Variables hinzufügen/aktualisieren

Füge folgende Variables hinzu (oder aktualisiere bestehende):

#### **NEXT_PUBLIC_SANITY_PROJECT_ID**
- **Value**: `2vj1v9w9`
- **Environment**: Production, Preview, Development (alle auswählen)

#### **NEXT_PUBLIC_SANITY_DATASET**
- **Value**: `production`
- **Environment**: Production, Preview, Development (alle auswählen)

#### **NEXT_PUBLIC_SITE_URL**
- **Value**: `https://alexander-ergart.de` (deine Production-URL)
- **Environment**: Production, Preview, Development (alle auswählen)

#### **NEXT_PUBLIC_PLAUSIBLE_DOMAIN**
- **Value**: `alexander-ergart.de`
- **Environment**: Production, Preview, Development (alle auswählen)

### Schritt 3: Neu Deployen

Nach dem Setzen der Variables:
1. Gehe zu **Deployments**
2. Klicke auf das letzte fehlgeschlagene Deployment
3. Klicke auf **Redeploy** (oben rechts)

**ODER**: Push einfach einen neuen Commit zu GitHub - Vercel baut dann automatisch neu.

---

## Wichtige Hinweise

### ⚠️ Alte Project ID entfernen
Falls auf Vercel noch eine Variable mit `c76lselw` existiert:
- **Löschen** oder auf `2vj1v9w9` ändern

### ✅ Richtige Werte
- **Neue Project ID**: `2vj1v9w9` 
- **Dataset**: `production`

### 🔍 Verifizierung
Nach dem Redeploy sollte der Build erfolgreich sein. Du siehst dann:
```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
```

---

## Schnell-Checkliste

- [ ] Vercel.com → Project Settings → Environment Variables öffnen
- [ ] `NEXT_PUBLIC_SANITY_PROJECT_ID` auf `2vj1v9w9` setzen
- [ ] `NEXT_PUBLIC_SANITY_DATASET` auf `production` setzen  
- [ ] `NEXT_PUBLIC_SITE_URL` auf Production-URL setzen
- [ ] `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` auf Domain setzen
- [ ] Alle Environments auswählen (Production, Preview, Development)
- [ ] Save Changes
- [ ] Redeploy triggern
