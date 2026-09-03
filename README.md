# julianzauner.at — Zauner Visuals

Website für Julian Zauner (Fotograf, Videograf & Designer, Salzburg). Gebaut mit
**Astro + TypeScript**, dunkles Design-System aus dem genehmigten Mockup, Deutsch als
Hauptsprache, SEO/GEO-optimiert (siehe `docs/briefing.md`).

## Struktur

```
docs/                 Planungsmaterial (nicht Teil der Website)
  START-HERE.md          Ursprüngliches Hand-off-Dokument
  briefing.md             Vollständiges SEO/GEO-Briefing
  image-map.md             Bild-Zuordnung & Alt-Texte
  reference/                Genehmigtes HTML-Mockup (Referenz, nicht mehr live genutzt)
  source-images/            Original-Fotos (Quelle für public/images/)

src/
  components/          Header, Footer, Seo, GalleryGrid
  layouts/BaseLayout.astro
  data/                 business.ts (JSON-LD), galleries.ts (Bild-Daten)
  lib/supabase.ts       Supabase-Client fürs Kontaktformular
  pages/                Alle Routen (siehe unten)

public/images/         Fotos, wie sie live ausgeliefert werden
public/robots.txt      Erlaubt KI-Crawler (GPTBot, ClaudeBot, PerplexityBot, …)
```

## Seiten

| Route | Zweck |
|---|---|
| `/` | Startseite: Hero-Carousel, Neueste Arbeiten, Leistungen, FAQ, Kontakt-CTA |
| `/automobil-motorsport-fotografie-salzburg` | SEO-Pillar-Seite (kombiniert die Keywords „automobilfotografie salzburg“ + „motorsportfotografie salzburg“) + Cars-Galerie |
| `/fotograf-salzburg` | SEO-Pillar-Seite, lokaler Oberbegriff |
| `/kreativ`, `/landschaftsfotografie-salzburg`, `/wildlife-fotografie` | Galerie-Seiten |
| `/design` | Grafikdesign-Portfolio (Platzhalter-Grafiken, siehe unten) |
| `/ueber-mich`, `/kontakt` | Biografie, Kontaktformular (→ Supabase) |
| `/impressum`, `/datenschutz`, `/cookies` | Rechtliches (Platzhaltertexte) |

> **Hinweis zur Seitenstruktur:** `briefing.md` schlägt 3 separate Pillar-Seiten vor
> (automobilfotografie-salzburg, motorsportfotografie-salzburg, fotograf-salzburg). Da beide
> Auto-Keywords dieselbe 15-Bilder-Galerie bedienen, wurden sie zu **einer** Seite
> zusammengelegt (H1 + Text + FAQ decken beide Suchbegriffe ab) — vermeidet dünnen,
> sich überschneidenden Content. Bei Bedarf lässt sich das später auftrennen.

## Offene Punkte (nicht von hier aus lösbar)

- **Supabase-Projekt anlegen** und `PUBLIC_SUPABASE_URL` / `PUBLIC_SUPABASE_ANON_KEY` in
  `.env` eintragen (siehe `.env.example`), Tabelle `inquiries` anlegen (Spalten: `name`,
  `email`, `phone`, `message`, `source`, `created_at`), Row Level Security mit
  „Insert only, kein Read“ für anonyme Nutzer. Ohne das läuft das Kontaktformular ins Leere.
- **GitHub-Repo** anlegen & pushen, **Vercel** verbinden (Auto-Deploy).
- **Domain** julianzauner.at auf Vercel zeigen lassen, 301-Redirects von den alten Wix-URLs.
- **Portrait-Foto** für `/ueber-mich` (aktuell Platzhalter).
- **Design-Dateien** für `/design` (Ferrari-Poster, RERIDE, Surfer-Mag, Atomic-Goggle, Logos) —
  aktuell CSS-Platzhalter, echte Bilder fehlen noch.
- **Rechtstexte** für Impressum/Datenschutz (aktuell nur Platzhalter, Pflicht in AT vor Live-Gang).
- **Google Business Profile**, Telefonnummer fürs Schema (optional, siehe `docs/briefing.md` §11).

## Befehle

| Befehl | Wirkung |
|---|---|
| `npm run dev` | Dev-Server auf `localhost:4321` |
| `npm run build` | Production-Build nach `./dist/` |
| `npm run preview` | Build lokal testen |
| `npx astro check` | TypeScript/Astro-Typcheck |
