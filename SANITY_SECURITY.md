# Sanity Security & CORS Best Practices

## CORS Einstellungen (manage.sanity.io)

### Aktuelle Konfiguration
Gehe auf [manage.sanity.io](https://manage.sanity.io) → Projekt `2vj1v9w9` → **API** → **CORS Origins**

### Empfohlene Domains

#### Entwicklung
```
http://localhost:3000
http://localhost:3333
```
✅ Allow credentials: **JA**

#### Produktion
```
https://alexander-ergart.de
https://www.alexander-ergart.de
```
✅ Allow credentials: **JA**

### ⚠️ Sicherheitshinweise

1. **NIEMALS** `*` (Wildcard) verwenden
2. **NIEMALS** unnötige Domains hinzufügen
3. Produktions- und Entwicklungsdomains klar trennen
4. "Allow credentials" nur für vertrauenswürdige Domains aktivieren

## API Tokens

### Read-Only Token (Frontend)
- Wird in `.env.local` verwendet
- Nur **Lesezugriff**
- Niemals in Git committen (`.gitignore` prüfen!)

### Write Token (Studio)
- Nur im Sanity Studio verwenden
- **Niemals** im Frontend exponieren
- Regelmäßig rotieren (alle 6 Monate)

## Dataset-Schutz

### Production Dataset
- Nur für Live-Content
- Keine Experimente

### Development Dataset (optional)
- Für Tests und Entwicklung
- Kann jederzeit zurückgesetzt werden

## Checkliste

- [ ] CORS auf spezifische Domains beschränkt (kein `*`)
- [ ] `.env.local` in `.gitignore`
- [ ] Nur minimale API-Rechte (Read-Only für Frontend)
- [ ] Tokens regelmäßig rotieren
- [ ] Development und Production Datasets getrennt (optional)
