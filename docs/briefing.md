# Projekt-Briefing: Neue Website julianzauner.at

**Für:** Umsetzung in Claude Code
**Auftraggeber:** Julian Zauner — Fotograf, Videograf & Designer, Salzburg
**Ziel:** Neue, selbst gebaute Website (Custom Code + Supabase + GitHub), die
(a) optisch an die bestehende Seite anknüpft, aber deutlich professioneller wirkt, und
(b) so für Suchmaschinen **und KI-Suchen** optimiert ist, dass sie bei Anfragen wie
„Fotograf Salzburg", „Automobilfotografie Salzburg", „Motorsportfotografie Salzburg"
möglichst weit vorne bzw. als Empfehlung in ChatGPT, Gemini & Perplexity erscheint.

> **Wie dieses Dokument zu lesen ist:** Es ist die vollständige Spezifikation. Der begleitende
> Design-Entwurf (klickbares HTML-Mockup) zeigt Look & Feel und Seitenaufbau. Dieses Dokument
> liefert die Technik, die Struktur, die SEO/GEO-Strategie und die fertigen Texte. Claude Code
> soll auf Basis von Mockup + Dokument die produktionsreife Website bauen.

---

## 1. Zusammenfassung der Entscheidungen (aus dem Gespräch)

| Thema | Entscheidung |
|---|---|
| Umsetzungs-Tool | **Bau & Deployment in Claude Code** (lokaler Projektordner, git, CLI). Konzept/Design in Cowork. |
| Tech-Stack | **Custom Code + Supabase + GitHub** (statt Wix). |
| Optik | An bestehende Seite angelehnt: dunkel, cinematisch, bild-fokussiert — aber moderner. |
| Fokus-Themen | Automobil- & Motorsportfotografie (Hauptkeywords), dazu Wildlife, Landschaft, Kreativ, Design. |
| Primäres Ziel | Sichtbarkeit in **klassischer Suche + KI-Suche (GEO)** für lokale Foto-Keywords in Salzburg. |
| Sprache | Deutsch (primär). Optional später englische Version für internationale Auto-/Motorsport-Kundschaft. |

---

## 2. Empfohlener Tech-Stack

**Empfehlung: Next.js (App Router) + Supabase + Vercel, Repo auf GitHub.**

| Baustein | Wahl | Warum |
|---|---|---|
| Framework | **Next.js 14+ (App Router, React, TypeScript)** | Server-Side Rendering / Static Generation → sauberes HTML, das Google *und* KI-Crawler perfekt lesen. Beste SEO-Kontrolle (Metadata-API, Sitemap, Schema). |
| Hosting | **Vercel** | Nahtlos mit Next.js + GitHub, automatische Deploys bei jedem Push, schnelle Ladezeiten (CDN), kostenloser Einstieg. |
| Backend / DB | **Supabase** | Für: Kontaktformular-Anfragen (Postgres-Tabelle), optionales Foto-CMS (Kategorien/Bilder verwalten), Storage für Bilder, später ggf. Kunden-Login/Galerien. |
| Bild-Hosting | **Supabase Storage** oder Vercel/Next `<Image>` + CDN | Automatische WebP/AVIF-Auslieferung, responsive Größen. |
| Versionierung | **GitHub** | Repo, von dem Vercel automatisch deployed. |

> **Alternative, falls es simpler sein soll:** **Astro** statt Next.js. Astro liefert standardmäßig
> statisches, extrem schnelles HTML (top für SEO/GEO) und ist für eine bild-lastige Portfolio-Seite
> oft die schlankere Wahl. Supabase lässt sich genauso anbinden. **Für dieses Projekt ist Astro
> sogar eine sehr gute Option**, wenn keine komplexe App-Logik nötig ist. Next.js ist die sichere
> Wahl, wenn du später mehr dynamische Features (Kunden-Portale, Buchung) planst.

**Wofür Supabase konkret gebraucht wird:**
1. **Kontaktanfragen** in Tabelle `inquiries` speichern (+ optional E-Mail-Benachrichtigung via Supabase Edge Function / Resend).
2. **Portfolio-Verwaltung** (optional, aber empfohlen): Tabelle `projects` (Titel, Kategorie, Beschreibung, Slug, Bilder, Ort, Datum) + `images` in Supabase Storage → Bilder ohne Code-Änderung ergänzen.
3. **Reviews/Testimonials** (optional): Tabelle `testimonials`.

---

## 3. Design-System (aus dem Mockup)

Der begleitende HTML-Entwurf setzt das um. Kernwerte für konsistenten Aufbau:

**Farben (Dark, cinematisch):**
```
--bg:        #0C0D10   /* Grundfläche, kühles Fast-Schwarz (Asphalt) */
--surface:   #14161B   /* Karten / Sektionen */
--surface-2: #1B1E24
--line:      #2A2E36   /* Rahmen / Trennlinien */
--text:      #ECEBE7   /* warmes Off-White */
--muted:     #8B9099   /* Sekundärtext */
--accent:    #C6A15B   /* Messing/Champagner-Gold (Reflexionen auf Lack) */
--accent-hi: #DCBB77   /* Hover-Gold */
```
Bewusst **kein knalliges Rot/Grün** als Akzent (wirkt schnell „AI-generiert"). Das warme Gold auf
kühlem Schwarz erzeugt die Temperatur-Spannung, die zu Automobilfotografie passt (Sonnenuntergang
auf Metall, Chrom, Ferrari-Sandtöne).

**Typografie (Google Fonts):**
- **Display / Headlines:** `Archivo` (700–900), Versalien, negatives Tracking — kraftvoll, „poster/motorsport".
- **Fließtext:** `Hanken Grotesk` (400–600) — sauber, gut lesbar.
- **Labels / Daten / Meta:** `IBM Plex Mono` — „Telemetrie/Instrumenten"-Anmutung (Koordinaten, Specs, Captions).

**Layout-Prinzipien:** Full-Bleed-Hero, großzügiger Weißraum, bild-dominante Sektionen,
mono-getextete Eyebrows/Indizes (01/02/03), dezente Scroll-Reveals, sticky Header mit Blur.
Respektiert `prefers-reduced-motion`. Committet bewusst auf **ein dunkles Theme** (Portfolio-Standard).

**Wichtig für den Bau:** Im Mockup sind alle Bilder **Platzhalter** (CSS-Verläufe mit Label
„Foto-Slot"). Diese durch Julians echte Fotos ersetzen — pro Kategorie die stärksten Arbeiten.

---

## 4. Seitenstruktur & URL-Architektur

SEO-freundliche, sprechende URLs mit Keywords im Slug. Deutsche Slugs (passend zur Zielgruppe).

```
/                                  → Startseite (Hero, Portfolio-Übersicht, About-Teaser, Leistungen, FAQ, Kontakt)
/automobilfotografie-salzburg      → Landingpage Hauptkeyword #1  (Pillar)
/motorsportfotografie-salzburg     → Landingpage Hauptkeyword #2  (Pillar)
/fotograf-salzburg                 → Landingpage Oberbegriff / lokal (Pillar)
/wildlife-fotografie               → Kategorie
/landschaftsfotografie-salzburg    → Kategorie
/kreativ                           → Kategorie (Composing/Fine-Art)
/design                            → Grafikdesign & Branding
/ueber-mich                        → About (E-E-A-T: Story, Credentials, Ausrüstung)
/kontakt                           → Kontakt (Formular → Supabase)
/portfolio/[slug]                  → Einzelne Projekt-/Case-Study-Seiten (dynamisch aus Supabase)
/blog                              → Blog-Übersicht
/blog/[slug]                       → Blogartikel (Content-Marketing, GEO)
/impressum  /datenschutz  /cookies → Rechtliches (Pflicht in AT)
```

**Content-Cluster-Prinzip:** Die drei Pillar-Landingpages (`/automobilfotografie-salzburg`,
`/motorsportfotografie-salzburg`, `/fotograf-salzburg`) sind die SEO-Hauptseiten. Blogartikel und
Projektseiten verlinken zurück auf die passende Pillar-Seite → baut thematische Autorität auf.

> **Kritisch (aus der Recherche):** Jede Landingpage braucht **mind. 300–500 Wörter eigenen,
> einzigartigen Text** — nicht nur Bilder. Keine kopierten Texte mit ausgetauschtem Stadtnamen.
> Echte Orte, echte Shootings, echte Details nennen (Salzburger Locations, Strecken, Kunden).

**Galerie-/„Ausstellungswand"-Seiten (Kernstück).** Die Kategorie-Seiten sind Julians Ausstellungswände:
großes, klein geschriebenes Titelwort oben (cars / wildlife / landscape / creative), darunter die Bilder
als Raster (Masonry für cars) bzw. als horizontale/vertikale Reihe. Das Design-Prinzip beibehalten,
aber **SEO/GEO-fest machen**:
- Saubere, keyword-starke Slugs statt `kopie-von-wildlife` → `/automobilfotografie-salzburg`,
  `/motorsportfotografie-salzburg`, `/wildlife-fotografie`, `/landschaftsfotografie-salzburg`, `/kreativ`.
- **Ein bis zwei einleitende Sätze** oben unter dem Titelwort (mit Keyword + Ort) — verwandelt die reine
  Bilderwand in eine für Suche/KI verständliche Seite, ohne die Optik zu stören.
- **Alt-Text + sprechender Dateiname pro Bild** (z. B. `ferrari-296-gtb-shooting-salzburg.webp`,
  Alt: „Roter Ferrari 296 GTB bei Auto-Shooting in Salzburg").
- Grid als CSS-Grid/Masonry, WebP/AVIF, Lazy Loading; Lightbox beim Klick (optional).
- Cars-Seite ist gleichzeitig die Automobil-/Motorsport-Landingpage → hier gehören die 300–500 Wörter
  Fließtext (weiter unten oder in einem einklappbaren Bereich) plus FAQ hin.

---

## 5. Keyword-Strategie

**Primäre Keywords (Hauptziel):**
- `fotograf salzburg`
- `automobilfotografie salzburg`
- `motorsportfotografie salzburg`
- `autofotograf salzburg`

**Sekundär / Long-Tail (bessere Conversion, laut Recherche ~2× Conversion-Rate):**
- `automobilfotograf salzburg`, `car fotografie salzburg`
- `motorsport fotograf österreich`, `rennstrecken fotograf`
- `auto shooting salzburg`, `fahrzeugfotografie salzburg`
- `landschaftsfotografie salzburg`, `tierfotografie / wildlife fotografie salzburg`
- `fotograf salzburg umgebung`, `fotograf salzburger land`
- `videograf salzburg`, `grafikdesign salzburg`

**Keyword-→-Seite-Mapping:**

| Seite | Primär-Keyword | Nebenkeywords |
|---|---|---|
| `/` | fotograf salzburg | automobil, motorsport, videograf salzburg |
| `/automobilfotografie-salzburg` | automobilfotografie salzburg | auto shooting, fahrzeugfotografie, autofotograf |
| `/motorsportfotografie-salzburg` | motorsportfotografie salzburg | rennstrecken fotograf, motorsport fotograf österreich |
| `/fotograf-salzburg` | fotograf salzburg | fotograf salzburger land, fotograf salzburg umgebung |
| `/landschaftsfotografie-salzburg` | landschaftsfotografie salzburg | alpine fotografie, bergfotografie |
| `/wildlife-fotografie` | wildlife fotografie salzburg | tierfotografie salzburg |
| `/design` | grafikdesign salzburg | branding, poster design |

---

## 6. On-Page-SEO — fertige Title-Tags & Meta-Descriptions

Formel (aus Recherche): **`[Leistung] [Ort] | Julian Zauner`**, Title 50–60 Zeichen, Keyword vorne.
Meta-Description 140–160 Zeichen, mit Keyword + Handlungsaufruf.

| Seite | `<title>` | `<meta description>` |
|---|---|---|
| `/` | Fotograf Salzburg – Automobil & Motorsport \| Julian Zauner | Julian Zauner: Fotograf & Videograf aus Salzburg, spezialisiert auf Automobil- und Motorsportfotografie. Cinematische Bilder, schnelle Lieferung – jetzt Projekt anfragen. |
| `/automobilfotografie-salzburg` | Automobilfotografie Salzburg \| Julian Zauner | Automobilfotografie in Salzburg: cinematische Car-Shootings, Rolling Shots & Detailaufnahmen. Jetzt Projekt anfragen. |
| `/motorsportfotografie-salzburg` | Motorsportfotografie Salzburg \| Julian Zauner | Motorsportfotografie in Salzburg & Österreich: Renntag-Coverage, Action auf der Strecke & Bilder für Team und Sponsoren. |
| `/fotograf-salzburg` | Fotograf Salzburg – Foto, Video, Design \| Julian Zauner | Dein Fotograf in Salzburg für Automobil, Motorsport, Wildlife & Landschaft. Foto, Video und Design aus einer Hand. Jetzt unverbindlich anfragen. |
| `/ueber-mich` | Über Julian Zauner – Fotograf aus Salzburg | Lerne Julian Zauner kennen: Fotograf, Videograf & Designer aus Salzburg mit Fokus auf Automobil- und Motorsportfotografie. Erfahrung, Stil & Ausrüstung. |
| `/kontakt` | Kontakt & Anfrage \| Julian Zauner Fotografie Salzburg | Projekt anfragen: Auto-Shooting, Renntag oder Kampagne. Kontaktiere Julian Zauner, Fotograf in Salzburg – Rückmeldung meist in 24 Stunden. |

**Pro Seite außerdem:**
- Genau **eine `<h1>`** mit dem Primär-Keyword (natürlich formuliert).
- `<h2>/<h3>` als **echte Fragen**, wo möglich (siehe GEO, Abschnitt 7).
- Open-Graph- & Twitter-Card-Tags (Titel, Beschreibung, Vorschaubild) für Social-Sharing.
- `<link rel="canonical">` pro Seite.
- `lang="de"` am `<html>`, `hreflang` falls später EN-Version.

---

## 7. GEO – Optimierung für KI-Suchen (ChatGPT, Gemini, Perplexity)

Das ist der Kern des Auftrags. GEO (Generative Engine Optimization) = dafür sorgen, dass KI-Systeme
die Seite **zitieren und als Empfehlung ausgeben**. Konkrete Taktiken (aus aktueller Recherche):

**7.1 Antwort-zuerst-Struktur.** Jede wichtige Seite/jeder Abschnitt beginnt mit einer **direkten
Antwort in den ersten ~200 Wörtern**, bevor Kontext folgt. KI-Systeme extrahieren die knappe,
direkte Antwort. Beispiel-Einstieg für `/automobilfotografie-salzburg`:
> „Julian Zauner ist ein auf Automobilfotografie spezialisierter Fotograf in Salzburg. Er
> fotografiert Autos, Fahrzeug-Details und Rolling Shots für Autohäuser, Tuner, Sammler und
> Privatpersonen – inklusive professioneller Bildbearbeitung."

**7.2 Frage-Überschriften.** H2/H3 als reale Suchfragen formulieren: „Was kostet ein Auto-Shooting
in Salzburg?" statt „Preise". Matcht die Art, wie Leute mit KI sprechen.

**7.3 FAQ mit FAQPage-Schema.** 6–10 echte Fragen pro relevanter Seite, jede Antwort **50–150 Wörter,
direkte Antwort zuerst**. Mit `FAQPage`-JSON-LD auszeichnen (siehe Abschnitt 8). Das ist das stärkste
einzelne GEO-Signal. Die Startseite im Mockup enthält bereits einen fertigen FAQ-Block als Vorlage.

**7.4 Entitäts- & Autoritätssignale (E-E-A-T).**
- **Benannter Autor mit Profil:** Julian Zauner als Entität etablieren — echte Bio, Foto,
  verlinkte externe Präsenz (Instagram, ggf. LinkedIn, Branchenverzeichnisse). `Person`-Schema mit `sameAs`.
- **Konkrete, zitierbare Fakten statt vager Aussagen:** „über 250 umgesetzte Shootings",
  „Lieferung im Schnitt in 48 Stunden", „seit 2018 aktiv". KI-Systeme bevorzugen belegbare Zahlen.
- **Konsistente Entität:** Name, Ort, Spezialisierung überall identisch (Website, GBP, Instagram).

**7.5 Externe Erwähnungen / Zitierbarkeit.** KIs empfehlen, was mehrfach im Netz konsistent auftaucht.
→ Einträge in lokalen Verzeichnissen, Foto-Portalen, Presse/Blog-Erwähnungen, Kunden-Backlinks
(siehe Abschnitt 11). Je öfter „Julian Zauner + Automobilfotografie + Salzburg" gemeinsam auftaucht,
desto eher wird er als *die* Antwort auf die Frage ausgegeben.

**7.6 Frische.** Sichtbares „Zuletzt aktualisiert"-Datum auf Content-Seiten, regelmäßig aktualisieren.
Blog aktiv halten.

**7.7 Sauberes, crawlbares HTML.** Server-gerendertes HTML (Next.js/Astro), semantische Tags,
kein Content nur per JS nachgeladen. `robots.txt` erlaubt KI-Crawler (GPTBot, Google-Extended,
PerplexityBot, ClaudeBot) — bewusst *nicht* blocken, da Sichtbarkeit in KI-Suchen gewünscht ist.

---

## 8. Strukturierte Daten (JSON-LD Schema)

Auf jeder Seite passendes JSON-LD im `<head>`. Das ist Pflicht für Local Pack, Google Maps *und*
KI-Verständnis. **Wichtig: NAP (Name, Adresse, Telefon) muss zeichengenau identisch sein** mit
Google Business Profile und allen Verzeichnissen.

**8.1 Global (auf jeder Seite) — Person + ProfessionalService/LocalBusiness:**
```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://www.julianzauner.at/#business",
  "name": "Julian Zauner",
  "image": "https://www.julianzauner.at/og-image.jpg",
  "url": "https://www.julianzauner.at",
  "telephone": "+43 …",            // echte Nummer eintragen (falls öffentlich gewünscht)
  "email": "julianzauner@icloud.com",
  "priceRange": "€€",
  "founder": { "@type": "Person", "name": "Julian Zauner" },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Thalgau",
    "addressRegion": "Salzburg",
    "postalCode": "5303",
    "addressCountry": "AT"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": 47.795, "longitude": 13.253 },
  "areaServed": [
    { "@type": "City", "name": "Salzburg" },
    { "@type": "State", "name": "Salzburger Land" },
    { "@type": "Country", "name": "Österreich" }
  ],
  "knowsAbout": ["Automobilfotografie","Motorsportfotografie","Aerial-/Drohnenfotografie","Wildlife-Fotografie","Landschaftsfotografie","Videografie","Grafikdesign"],
  "sameAs": [
    "https://www.instagram.com/jzauner_",
    "https://www.google.com/maps/…"  // Google Business Profile (falls angelegt)
  ]
}
```
> `@type`-Hinweis: Es gibt keinen spezifischen Schema-Typ „Photographer". `ProfessionalService`
> (Unterklasse von `LocalBusiness`) ist die beste Wahl; alternativ `LocalBusiness`.
> Falls `aggregateRating` verfügbar (echte Google-Reviews): ergänzen — nie erfinden.

**8.2 Auf FAQ-Seiten/-Abschnitten — FAQPage:**
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "Was kostet ein Auto-Shooting in Salzburg?",
    "acceptedAnswer": { "@type": "Answer", "text": "Der Preis hängt von Umfang, Ort und Anzahl der Fahrzeuge ab. Ein einzelnes Auto-Shooting startet ab einem festen Paketpreis inklusive Bearbeitung …" }
  }]
}
```

**8.3 Auf `/ueber-mich` — Person (Entität):**
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Julian Zauner",
  "jobTitle": "Fotograf, Videograf & Designer",
  "worksFor": { "@id": "https://www.julianzauner.at/#business" },
  "address": { "@type": "PostalAddress", "addressLocality": "Salzburg", "addressCountry": "AT" },
  "sameAs": ["https://www.instagram.com/…"]
}
```

**8.4 Weitere:** `BreadcrumbList` auf Unterseiten, `ImageObject` für Portfolio-Bilder
(mit `contentUrl`, `caption`, `creator`), `WebSite` mit `SearchAction` auf der Startseite.
Alles mit dem **Rich Results Test** und **Schema.org Validator** prüfen.

---

## 9. Bild-SEO (extrem wichtig bei einer Fotoseite)

- **Dateinamen sprechend & vor Upload umbenennen:** `porsche-911-shooting-salzburg.webp`
  statt `DSC_4392.jpg`.
- **Alt-Text pro Bild, beschreibend & natürlich:** z. B. „Roter Ferrari bei Rolling Shot auf
  Bergstraße bei Salzburg, Abendlicht". Enthält Motiv + ggf. Ort.
- **Format WebP oder AVIF** (25–50 % kleiner als JPEG). Next.js `<Image>` / Astro erledigen das
  weitgehend automatisch inkl. responsiver Größen.
- **`<figcaption>`** unter wichtigen Bildern — Google wertet das als starkes Kontextsignal.
- **Lazy Loading** für alles außerhalb des sichtbaren Bereichs (Portfolio-Grids).
- **Bildgrößen begrenzen**, Ladezeit im Blick behalten (Core Web Vitals). Hero-Bild priorisiert laden.
- Für hochauflösende Portfolio-Fotos ggf. Wasserzeichen/Downscaling erwägen (Bildschutz).

---

## 10. Technisches SEO / Performance

- **Sitemap** (`/sitemap.xml`) automatisch generieren (Next.js/Astro können das) und in der
  **Google Search Console** einreichen. Ebenso **Bing Webmaster Tools**.
- **`robots.txt`**: Sitemap referenzieren; KI-Crawler (GPTBot, Google-Extended, PerplexityBot,
  ClaudeBot, CCBot) **erlauben**.
- **Core Web Vitals**: schnelle Ladezeit (LCP < 2,5 s), keine Layout-Sprünge (CLS), mobil top.
  Bild-lastige Seite → Bilder sind der Hebel Nr. 1.
- **Mobile-first**: 56 % Traffic mobil, Google indexiert mobil-first. Galerien & Formular müssen
  am Handy einwandfrei laufen (das Mockup ist bereits responsive).
- **HTTPS**, sauberes Redirect von `julianzauner.at` → `www.julianzauner.at` (oder umgekehrt),
  konsistente kanonische Domain.
- **Interne Verlinkung:** jede Seite verlinkt 2–3 thematisch passende andere Seiten.
- **404-Seite** gestaltet; alte Wix-URLs per 301 auf neue URLs weiterleiten (Ranking-Erhalt!).
- **Analytics**: datenschutzfreundlich (z. B. Plausible) oder Google Analytics 4 mit Consent.

---

## 11. Lokales SEO (Google Maps, Local Pack) & Off-Page

Das entscheidet stark über „erscheint Julian bei *Fotograf Salzburg* ganz oben".

- **Google Business Profile** anlegen/optimieren: exakte Kategorie **„Fotograf"** (nicht generisch),
  Beschreibung (bis 750 Zeichen) mit Keywords + Einzugsgebiet, Öffnungszeiten, 10+ Portfolio-Fotos.
  **Wöchentlich posten** (~5× mehr Profilaufrufe laut Recherche).
- **Reviews aktiv einsammeln:** Kunden 24–48 h nach Lieferung um eine Google-Bewertung bitten.
  Ziel 4,8★+. Reviews sind Ranking- *und* Vertrauensfaktor (und speisen später `aggregateRating`).
- **NAP-Konsistenz** über alle Plattformen (zeichengenau identisch): Website, GBP, Instagram,
  Verzeichnisse. Uneinheitliche Adressformate vermeiden.
- **Verzeichnisse & Backlinks (Priorität):**
  1. Kunden-/Partner-Verlinkung (Autohäuser, Tuner, Teams verlinken Bildcredits) — stärkster Hebel.
  2. Lokale & Foto-Verzeichnisse (österreichische Branchenverzeichnisse, Foto-Portale) mit NAP.
  3. Redaktionelle Erwähnungen: Auto-/Motorsport-Blogs, lokale Medien, Styled-Shoot-Features.
- **Social:** Instagram (bereits vorhanden) aktiv, konsistenter Handle, Website verlinkt.

---

## 12. Content- / Blog-Strategie (SEO + GEO-Motor)

Regelmäßiger Blog baut Autorität und liefert KI-zitierbare Inhalte. **2–4 Beiträge/Monat** →
laut Recherche +30–50 % organische Anfragen binnen 6 Monaten. Jeder Beitrag 500–1.000 Wörter,
Ort + Keywords natürlich eingebaut, direkte Antwort pro Abschnitt zuerst.

**Konkrete Themen-Ideen:**
- „Was kostet ein Auto-Shooting in Salzburg? (Preise & Ablauf)"
- „Die besten Locations für Auto-Fotografie rund um Salzburg"
- „Motorsport-Fotografie: So entstehen scharfe Action-Bilder am Renntag"
- „Rolling Shots erklärt – wie fahrende Autos fotografiert werden"
- „[Konkreter Renntag / Event] – Rückblick & Bilder"
- „Case Study: [Fahrzeug] Shooting für [Kunde] in Salzburg"
- „Beste Tageszeit & Licht für Autofotografie in den Alpen"

Jeder Beitrag verlinkt zurück auf die passende Pillar-Landingpage.

---

## 13. Supabase-Datenmodell (Vorschlag)

```
inquiries      (id, created_at, name, email, phone, project_type, message, source)
projects       (id, slug, title, category, description, location, shot_date, cover_image, published)
project_images (id, project_id, storage_path, alt_text, caption, sort_order)
testimonials   (id, author, role, rating, quote, published)
```
- Kontaktformular → Insert in `inquiries` (+ optional Edge Function → E-Mail-Benachrichtigung via Resend/SMTP).
- Row Level Security aktivieren; Insert für `inquiries` öffentlich (nur Insert, kein Read), Rest geschützt.
- Portfolio kann statisch (im Code) starten und später auf Supabase-CMS umziehen — MVP zuerst.

---

## 14. Umsetzungs-Reihenfolge für Claude Code (Vorschlag)

1. **Setup:** Next.js (oder Astro) + TypeScript + Tailwind, Repo auf GitHub, Vercel verbinden.
2. **Design-System** aus Abschnitt 3 als Tailwind-Theme/Tokens anlegen (Farben, Fonts, Spacing).
3. **Startseite** aus dem Mockup nachbauen (Hero, Portfolio-Grid, About-Teaser, Leistungen, Proof, FAQ, Kontakt-CTA, Footer) — echte Fotos statt Platzhalter.
4. **Landingpages** (`/automobilfotografie-salzburg`, `/motorsportfotografie-salzburg`, `/fotograf-salzburg`) mit je 300–500+ Wörtern Unikat-Text + FAQ-Block.
5. **Weitere Seiten:** Über mich, Kategorien, Design, Kontakt (Formular → Supabase), Rechtliches.
6. **SEO-Layer:** pro Seite Title/Description/OG (Abschnitt 6), JSON-LD (Abschnitt 8), Canonical, `lang="de"`.
7. **Bild-Pipeline:** WebP/AVIF, Alt-Texte, figcaption, Lazy Loading, Hero priorisiert.
8. **Technik:** Sitemap, robots.txt (KI-Crawler erlauben), 301-Redirects von alten Wix-URLs, 404.
9. **Supabase:** Tabellen + Kontaktformular-Anbindung + RLS.
10. **Launch-Checks:** Rich Results Test, PageSpeed/Core Web Vitals, mobile, Search Console + Sitemap einreichen, GBP verknüpfen.

---

## 15. Fertige Texte (Copy-Bausteine, Deutsch)

**Hero H1:** Automobil- & Motorsportfotografie in Salzburg
**Hero-Subline:** Julian Zauner — Fotograf, Videograf und Designer. Kompromisslose, cinematische Bilder von Autos, Rennsport und der alpinen Landschaft rund um Salzburg.

**About (Kurzfassung, an echte Bio angelehnt):**
> Ich bin Julian Zauner, Fotograf, Videograf und Designer aus Salzburg (Thalgau). Ich mache nicht
> einfach Bilder — ich baue die ganze visuelle Geschichte: von Automobil-, Motorsport- und
> Aerial-Shootings über den Schnitt bis zum Branding drumherum. Ausgebildet an der HTL Salzburg in
> Grafik- & Mediendesign, habe ich über die Schule die Foto- und Videografie entdeckt. Ich arbeite
> mit den neuesten KI-Tools, damit Ideen schneller und mutiger Wirklichkeit werden.

> **Wichtig – Ehrlichkeit statt erfundener Belege:** Julian präsentiert sich (Stand jetzt) als junger
> Fotograf/Designer. KEINE erfundenen Kundenstimmen, Sternebewertungen oder Statistiken einbauen —
> das schadet bei Google/KI und verstößt gegen Richtlinien. `aggregateRating` NUR mit echten
> Google-Reviews. Trust-Signale stattdessen ehrlich aufbauen: echte Projekte/Case-Studies (Ferrari-
> Aesthetics, RERIDE, Surfer-Mag, Atomic-Skibrille etc. aus der Design-Seite), Instagram, künftige
> echte Reviews.

**Leistungen:** Automobilfotografie · Motorsportfotografie · Wildlife & Landschaft · Design & Branding
(Beschreibungen siehe Mockup.)

**FAQ (6 fertige Q&A mit lokalen Keywords):** siehe FAQ-Block im Mockup — direkt übernehmbar,
inkl. FAQPage-Schema.

**Kontakt-CTA:** „Lass uns etwas Sichtbares schaffen — ob Auto-Shooting, Renntag oder komplette
Bildkampagne, erzähl mir von deinem Projekt."

---

## 16. Echte Eckdaten & offene Punkte

**Bereits bekannt (aus der bestehenden Seite):**
- Name: Julian Zauner · Marke/Logo: **ZAUNER VISUALS** (PHOTO · VIDEO · DESIGN).
- Ort: **5303 Thalgau/Salzburg**, Österreich.
- E-Mail: **julianzauner@icloud.com** · Instagram: **@jzauner_**.
- Ausbildung: **HTL Salzburg**, Grafik- & Mediendesign.
- Disziplinen: Automobil, Motorsport, **Aerial (Drohne)**, Wildlife, Landschaft, Kreativ/Composing; Video; Grafikdesign.
- Design-Referenzen (echt, für Case-Studies nutzbar): Ferrari 296 GTB „Aesthetics"-Poster, RERIDE Corporate Design (Schulprojekt 2024), Surfer-Mag „BREAKZONE" (Editorial 2023), Atomic REVENT Skibrille (2024), Image-Folder (2023), Logos: Kühberger Schmuckdesign, monamo, Garden Trend, FULLSTACK.
- Kontaktseite hat bereits ein Formular (Vorname, Nachname, E-Mail, Telefon, Nachricht).

**Noch zu klären / liefern:**
- Bilder in Web-Auflösung pro Kategorie + Portrait (Julian liefert).
- Telefonnummer — nur falls öffentlich gewünscht (für Schema/Impressum).
- Impressum & Datenschutz-Inhalte (rechtlich, AT — Pflicht).
- Ob eine englische Version gewünscht ist (aktuelle Texte sind teils EN).

---

*Erstellt als Übergabe-Briefing für die Umsetzung in Claude Code. Begleitend: klickbares Design-Mockup (HTML).*
