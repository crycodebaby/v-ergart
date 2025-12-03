# Ergart Blog System - Einrichten & Nutzen

## .env Konfiguration

Erstelle eine `.env.local` Datei im Projekt-Root mit:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=2vj1v9w9
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SITE_URL=https://alexander-ergart.de
```

## Sanity Studio

Das Studio ist in einem separaten Projekt (`ergart-sanity-test`).

**Studio starten:**
```bash
cd c:\Users\Robin\Desktop\ergart-sanity-test
npm run dev
```

Öffne `http://localhost:3333` im Browser.

## Ersten Blog-Artikel erstellen

1. Im Studio: **"Blog-Artikel"** auswählen
2. **Titel** eingeben (z.B. "Winterdienst Checkliste für Vermieter")
3. **Slug** generieren (Button klicken)
4. **Autor** wählen oder neu erstellen
5. **Kategorien** zuweisen
6. **Hauptbild** hochladen
7. **Inhalt** schreiben (Rich Text Editor)
8. **SEO-Felder** ausfüllen:
   - Meta Titel (max. 60 Zeichen)
   - Meta Beschreibung (max. 160 Zeichen)
   - Fokus-Keywords (z.B. "Winterdienst Neuss")
   - Standort-Tags (z.B. "Neuss", "Rhein-Kreis Neuss")
9. ✅ **"Veröffentlicht"** aktivieren
10. **Speichern**

## Blog aufrufen

- Übersicht: `http://localhost:3000/blog`
- Artikel: `http://localhost:3000/blog/dein-slug`

## SEO Best Practices

### Lokale Keywords
Nutze Ortsnamen in Titeln und Texten:
- "Winterdienst in Neuss"
- "Fensterreinigung Rhein-Kreis"
- "Hausmeister Kaarst"

### Content-Ideen
- Checklisten und How-Tos
- Saisonale Themen (Winter/Sommer)
- Branchen-Insider-Wissen
- Vorher/Nachher-Stories

## Featured Posts auf Homepage

Um einen Artikel auf der Startseite zu zeigen:
1. Öffne den Artikel im Studio
2. Aktiviere **"Als Featured markieren"**
3. Speichern

Max. 2-3 Featured Posts empfohlen.
