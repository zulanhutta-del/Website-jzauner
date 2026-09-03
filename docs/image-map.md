# Website-Bilder: Zuordnung & Benennung (Zauner Visuals)

**Zweck:** Diese Liste sagt eindeutig, welches Foto an welche Stelle der Website gehört, wie die
Datei heißen soll und welchen Alt-Text sie bekommt (wichtig für SEO/KI-Suche). Grundlage sind Julians
Screenshots der bestehenden Seite (julianzauner.at). Julian liefert den Original-Ordner; die Spalte
**Quelldatei** wird beim Abgleich mit den echten Dateien ausgefüllt.

---

## 1. Ordnerstruktur (im Repo, z. B. `/public/images/`)

```
/public/images/
  hero/          → 4 Hero-Bilder (Startseite-Carousel), 1 pro Kategorie
  cars/          → Galerie „cars"
  wildlife/      → Galerie „wildlife"
  landscape/     → Galerie „landscape"
  creative/      → Galerie „creative"
  about/         → Portrait für „about me"
  design/        → Grafik-/Designarbeiten (separate Dateien, keine Fotos)
```

## 2. Benennungs-Konvention

`{kategorie}-{NN}-{kurzbeschreibung}.webp`
- `{NN}` = Reihenfolge auf der Seite (01, 02, …) — bestimmt die Anordnung im Raster/Carousel.
- Kleinbuchstaben, Bindestriche, keine Umlaute/Leerzeichen.
- Format **WebP** (Fallback AVIF/JPG), Langkante ~2000–2400 px fürs Web.
- Hero-Bilder zusätzlich hochauflösend (Querformat, ~2560 px breit).

> **Für Claude Code:** Bilder werden pro Kategorie in der Reihenfolge `{NN}` geladen. Die Galerie ist
> ein Masonry-/Grid-Layout; Hochformat/Querformat wie in der Beschreibung angegeben beibehalten.
> Alt-Text und Dateiname sind SEO-relevant → genau übernehmen.

---

## 3. HERO-Carousel (Startseite) — 1 Bild pro Kategorie

| Slot | Beschreibung | Dateiname | Alt-Text (EN) | Quelldatei |
|---|---|---|---|---|
| Cars & Motorsport | Roter Ferrari 296 GTB, dramatische Seiten-/Heckpartie mit Rad, dunkler Hintergrund | `hero/hero-cars-ferrari-296-red.webp` | Red Ferrari 296 GTB side detail — automotive photography by Julian Zauner, Salzburg | |
| Wildlife | Feuersalamander, Kopf-Nahaufnahme am Waldboden | `hero/hero-wildlife-fire-salamander.webp` | Fire salamander close-up on the forest floor — wildlife photography | |
| Landscape | Stürmische Küste (Korsika), dunkle Wolken, Wellen | `hero/hero-landscape-corsica-storm-coast.webp` | Stormy coastline in Corsica under heavy clouds — landscape photography | |
| Creative | S/W-Porträt, Person mit Atemschutzmaske und Beanie | `hero/hero-creative-gasmask-portrait.webp` | Black-and-white studio portrait with respirator mask — creative photography | |

---

## 4. Galerie „cars" (Masonry, Reihenfolge wie auf der Seite)

| # | Beschreibung | Dateiname | Alt-Text (EN) | Quelldatei |
|---|---|---|---|---|
| 01 | Roter Ferrari 296 GTB auf Straße, 3/4-Front, Palmen im Hintergrund | `cars/cars-01-ferrari-296-street.webp` | Red Ferrari 296 GTB parked on a street lined with palm trees | |
| 02 | Blauer Ferrari (488), Detail Vorderrad + Bremssattel + Emblem | `cars/cars-02-ferrari-488-blue-wheel.webp` | Blue Ferrari 488 front wheel and yellow brake caliper detail | |
| 03 | Roter Endurance-Rennwagen (HGT) auf der Rennstrecke | `cars/cars-03-hgt-racecar-red-track.webp` | Red HGT endurance race car on the track | |
| 04 | Porsche 911 GT3 RS, dunkel, auf der Strecke | `cars/cars-04-porsche-gt3rs-dark-track.webp` | Porsche 911 GT3 RS on the race track | |
| 05 | Porsche 911, Rolling Shot mit Bewegungsunschärfe (dunkel) | `cars/cars-05-porsche-911-rolling-shot.webp` | Porsche 911 rolling shot with motion blur | |
| 06 | Roter Ferrari 296 auf Indoor-Event/Showroom, Menschen im Hintergrund | `cars/cars-06-ferrari-296-showroom.webp` | Red Ferrari 296 GTB at an indoor showroom event | |
| 07 | Ferrari Rad/Reifen-Detail (Bridgestone Potenza, gelber Bremssattel) | `cars/cars-07-ferrari-wheel-detail.webp` | Ferrari wheel and tire detail with yellow brake caliper | |
| 08 | Blauer Porsche 911 GT3 auf der Strecke | `cars/cars-08-porsche-gt3-blue-track.webp` | Blue Porsche 911 GT3 on the race track | |
| 09 | Mint/Türkiser BMW M2, indoor, Räder/Seitenpartie | `cars/cars-09-bmw-m2-mint-indoor.webp` | Mint-green BMW M2 indoors, side and wheel detail | |
| 10 | Schwarzer Porsche 718 Spyder, Straße, Palmen | `cars/cars-10-porsche-718-spyder-street.webp` | Black Porsche 718 Spyder on a palm-lined street | |
| 11 | Pink/grünes E30-Driftauto („URSLU") auf der Strecke | `cars/cars-11-drift-e30-pink-green.webp` | Pink and green BMW E30 drift car on track | |
| 12 | Drift-Burnout, Rauchwolke, grünes Auto | `cars/cars-12-drift-smoke-burnout.webp` | Drift car burnout with tire smoke | |
| 13 | Dunkles Low-Key-Detail (Auto-Seite/Spiegel, schwarz) | `cars/cars-13-black-car-lowkey-detail.webp` | Low-key detail of a black car's side mirror | |
| 14 | Porsche Interieur, blau, Lenkrad | `cars/cars-14-porsche-interior-blue.webp` | Blue Porsche interior with steering wheel | |
| 15 | Porsche Interieur, Lüftungsdüsen-Detail | `cars/cars-15-porsche-air-vent-detail.webp` | Porsche interior air vent detail | |
| 16 | Silberner Porsche 911 Turbo, Rad + roter Bremssattel, low key | `cars/cars-16-porsche-turbo-silver-wheel.webp` | Silver Porsche 911 Turbo wheel with red brake caliper | |
| 17 | Schwarzer Mercedes-AMG GT, Showroom („Eingang Foyer") | `cars/cars-17-mercedes-amg-gt-black.webp` | Black Mercedes-AMG GT at an indoor showroom | |
| 18 | Vintage Corvette C3 Rennwagen (#48, Stars & Stripes) | `cars/cars-18-corvette-c3-race-48.webp` | Vintage Corvette C3 race car with stars-and-stripes livery | |
| 19 | Schwarzer McLaren auf der Strecke | `cars/cars-19-mclaren-black-track.webp` | Black McLaren race car on the track | |
| 20 | Roter Ferrari-Rennwagen (296 GT3) auf der Strecke | `cars/cars-20-ferrari-296-gt3-track.webp` | Red Ferrari 296 GT3 race car on the track | |
| 21 | Weißer RWB-Porsche (#31) auf der Strecke | `cars/cars-21-rwb-porsche-white-track.webp` | White RWB Porsche race car on the track | |
| 22 | Grauer Porsche Taycan, Straße in Monaco | `cars/cars-22-porsche-taycan-monaco.webp` | Grey Porsche Taycan on a street in Monaco | |
| 23 | Blauer Ferrari 488, Heck, Fahrerlager mit Menschen | `cars/cars-23-ferrari-488-blue-paddock.webp` | Blue Ferrari 488 rear view in the paddock | |
| 24 | Grauer Mercedes-AMG GT, Heck mit Rückleuchten, Showroom | `cars/cars-24-amg-gt-grey-rear.webp` | Grey Mercedes-AMG GT rear lights detail in a showroom | |
| 25 | Grau/roter GT-Rennwagen (#123) auf der Strecke | `cars/cars-25-gt-racecar-123-track.webp` | Grey and red GT race car number 123 on the track | |
| 26 | Roter Honda Civic Type R, Automesse | `cars/cars-26-honda-civic-typer-red.webp` | Red Honda Civic Type R at a car show | |
| 27 | Blauer Porsche 911, Front-/Scheinwerfer-Detail | `cars/cars-27-porsche-911-blue-headlight.webp` | Blue Porsche 911 front headlight detail | |

> Hinweis: Reihenfolge/Anzahl kann Julian anpassen. Falls im Ordner mehr/weniger Auto-Bilder sind,
> Nummerierung entsprechend fortführen.

---

## 5. Galerie „wildlife"

| # | Beschreibung | Dateiname | Alt-Text (EN) | Quelldatei |
|---|---|---|---|---|
| 01 | Wespe an Holz/Rinde (Makro) | `wildlife/wildlife-01-wasp-bark.webp` | Wasp on weathered wood, macro shot | |
| 02 | Feuersalamander, Kopf-Nahaufnahme | `wildlife/wildlife-02-fire-salamander.webp` | Fire salamander close-up on the forest floor | |
| 03 | Biene an Blüte (Makro) | `wildlife/wildlife-03-bee-blossom.webp` | Honey bee on a blossom, macro shot | |
| 04 | Kohlmeise auf Ast (Nadelbaum, blauer Himmel) | `wildlife/wildlife-04-great-tit-branch.webp` | Great tit perched on a conifer branch | |
| 05 | Biene an rosa Blüte (Nahaufnahme) | `wildlife/wildlife-05-bee-pink-blossom.webp` | Bee on a pink blossom, close-up | |
| 06 | Spatz auf Ast neben schwarzem Topf | `wildlife/wildlife-06-sparrow-pot.webp` | House sparrow perched beside a dark pot | |
| 07 | Spatz auf Mauer/Futterstelle im Garten | `wildlife/wildlife-07-sparrow-garden.webp` | House sparrow at a garden feeding spot | |
| 08 | Spatz vor blauer Bank/Mauer | `wildlife/wildlife-08-sparrow-blue.webp` | House sparrow in front of a blue-painted ledge | |
| 09 | Raupe (rot/grün) auf Blatt (Makro) | `wildlife/wildlife-09-caterpillar-leaf.webp` | Colorful caterpillar on a green leaf, macro | |
| 10 | Alpendohle auf Fels (gelber Schnabel, rote Beine) | `wildlife/wildlife-10-alpine-chough.webp` | Alpine chough on a rock in the mountains | |
| 11 | Spinne auf Holz/Boden (Makro) | `wildlife/wildlife-11-spider-macro.webp` | Spider on textured ground, macro shot | |
| 12 | Taube auf Backsteinmauer (nass/zerzaust) | `wildlife/wildlife-12-pigeon-wall.webp` | Pigeon perched on a brick wall | |

---

## 6. Galerie „landscape"

| # | Beschreibung | Dateiname | Alt-Text (EN) | Quelldatei |
|---|---|---|---|---|
| 01 | Serpentine an der Küste (Korsika), dramatische Wolken (Panorama) | `landscape/landscape-01-corsica-hairpin-pano.webp` | Coastal hairpin road in Corsica under dramatic clouds | |
| 02 | Bergstraße, schwarzes Auto in Bewegung (Motion Blur), Leitplanke | `landscape/landscape-02-mountain-road-car.webp` | Black car in motion on a mountain road, Corsica | |
| 03 | Hafen von oben (Drohne), Boote & Häuser | `landscape/landscape-03-harbour-drone.webp` | Aerial view of a marina with boats and houses | |
| 04 | Küstenklippen bei Sonnenuntergang, grüne Hänge | `landscape/landscape-04-cliffs-sunset.webp` | Coastal cliffs at sunset with green slopes | |
| 05 | Steilküste/Klippen (Bonifacio), weiße Felsen | `landscape/landscape-05-white-cliffs.webp` | White limestone cliffs above the sea, Bonifacio | |
| 06 | Blaues Meer, Boot mit Kielwasser, Küste | `landscape/landscape-06-sea-boat-wake.webp` | Boat leaving a wake on a deep blue sea | |
| 07 | Bunte Fischerboote im Hafen (Malta) | `landscape/landscape-07-malta-fishing-boats.webp` | Colorful traditional fishing boats in a Maltese harbour | |
| 08 | Toter Baum auf Bergwiese, Wolkenhimmel | `landscape/landscape-08-dead-tree-meadow.webp` | Bare tree on an alpine meadow under a cloudy sky | |
| 09 | Höhle mit Blick nach oben zum blauen Himmel | `landscape/landscape-09-cave-sky.webp` | View from inside a cave up to the blue sky | |
| 10 | Sonnenuntergang über Bergen mit See im Tal | `landscape/landscape-10-mountain-sunset-lake.webp` | Sunset over mountains with a lake in the valley | |
| 11 | Autobahn bei Nacht, Lichtspuren (Langzeit) | `landscape/landscape-11-highway-lighttrails.webp` | Highway at dusk with car light trails, long exposure | |
| 12 | Mond hinter Wolken (dramatisch) | `landscape/landscape-12-moon-clouds.webp` | Full moon behind dramatic clouds | |
| 13 | Container-Hafen von oben (Drohne) | `landscape/landscape-13-container-port-drone.webp` | Aerial view of a container port | |
| 14 | Bergstation/Seilbahn mit Alpenblick | `landscape/landscape-14-mountain-station.webp` | Mountain cable-car station with alpine view | |
| 15 | Stadtlichter bei Nacht vom Berg aus (Salzburg?) | `landscape/landscape-15-city-lights-night.webp` | City lights at night seen from a mountain | |
| 16 | Sonnenuntergang, rosa Himmel über Küstenbergen | `landscape/landscape-16-pink-sunset-coast.webp` | Pink sunset sky over coastal mountains | |
| 17 | Roter Sonnenuntergang mit Wolkenband (Panorama) | `landscape/landscape-17-red-sunset-pano.webp` | Deep red sunset with a band of clouds | |
| 18 | Berge hinter Pflanzen/Ginster (Gegenlicht) | `landscape/landscape-18-mountains-broom-backlit.webp` | Mountains framed by backlit broom shrubs | |
| 19 | Bergkuppe im Gegenlicht mit Sonnenstern | `landscape/landscape-19-ridge-sunstar.webp` | Mountain ridge silhouetted with a sun star | |
| 20 | Nebelstraße, verschwindende Fahrbahn (Bergstraße) | `landscape/landscape-20-foggy-road.webp` | Empty road disappearing into fog | |
| 21 | Stausee/Damm mit Motorrad & Auto, Nebel | `landscape/landscape-21-reservoir-road.webp` | Reservoir road with motorcycle and car in mist | |

---

## 7. Galerie „creative"

| # | Beschreibung | Dateiname | Alt-Text (EN) | Quelldatei |
|---|---|---|---|---|
| 01 | S/W-Porträt, Atemschutzmaske + Beanie (Low Key) | `creative/creative-01-gasmask-portrait-bw.webp` | Black-and-white portrait with respirator mask, low key | |
| 02 | Studio-Porträt, Person mit Skibrille, weißer Hintergrund | `creative/creative-02-ski-goggles-portrait.webp` | Studio portrait with ski goggles on white | |
| 03 | Studio, Person in Schwarz mit Gemälde/Leinwand | `creative/creative-03-black-outfit-canvas.webp` | Studio shot of a person in black with a canvas | |
| 04 | Lightpainting, rote Neon-Kurve auf Dunkel („N"-Form) | `creative/creative-04-lightpainting-neon-n.webp` | Red light-painting swirl on a dark background | |
| 05 | S/W, Person mit Maske hält Spraydose (Nike-Hoodie) | `creative/creative-05-spraycan-portrait-bw.webp` | Black-and-white portrait holding a spray can | |
| 06 | Eishockey-Szene (Halle, Spieler am Tor) | `creative/creative-06-icehockey.webp` | Ice hockey player in action at the goal | |
| 07 | Autobahn bei Dämmerung, Lichtspuren (Wald) | `creative/creative-07-highway-dusk-lighttrails.webp` | Highway at dusk with light trails through the forest | |
| 08 | Studio, Person fotografiert mit Handy (Camo-Hose) | `creative/creative-08-phone-selfie-studio.webp` | Studio portrait taking a phone photo | |
| 09 | Wasserglas mit Eiswürfel-Splash (S/W) | `creative/creative-09-water-splash-bw.webp` | Ice cube splashing into a glass of water, black and white | |
| 10 | Skifahrer im Gegenlicht, Schneestaub | `creative/creative-10-skier-backlit.webp` | Skier carving in backlit snow spray | |
| 11 | Wasserglas mit Zitronenscheibe, Splash | `creative/creative-11-water-lemon-splash.webp` | Lemon slice splashing into a glass of water | |
| 12 | Lightpainting, rote Neon-Kreise/-Schleifen | `creative/creative-12-lightpainting-neon-loops.webp` | Red neon light-painting loops on black | |

---

## 8. „about me" & „design"

- **about:** 1 Porträt von Julian → `about/about-portrait-julian.webp`
  Alt: „Portrait of Julian Zauner, photographer and designer from Salzburg".
- **design:** Grafik-/Designarbeiten (keine Fotos) → eigene Dateien in `design/`, benannt nach Projekt:
  `design-ferrari-aesthetics-poster.webp`, `design-surfermag-breakzone.webp`,
  `design-reride-corporate.webp`, `design-atomic-revent-goggle.webp`,
  `design-image-folder-indesign.webp`, plus Logos: `design-logo-kuehberger.webp`,
  `design-logo-monamo.webp`, `design-logo-gardentrend.webp`, `design-packaging-fullstack.webp`.

---

## 9. STATUS: erledigt — Bilder sind ausgewählt, benannt & eingebaut

Die Auswahl ist getroffen und liegt **fertig auf der Platte**:

```
/Users/julianzauner/Documents/JULIAN/Photography/BilderGalerie/website/
  hero/       (4)   hero-cars-ferrari, hero-wildlife-salamander,
                    hero-landscape-storm-coast, hero-creative-gasmask
  cars/       (15)  cars-01 … cars-15
  wildlife/   (12)  wildlife-01 … wildlife-12
  landscape/  (14)  landscape-01 … landscape-14
  creative/   (10)  creative-01 … creative-10
```
Alle Dateien sind bereits web-optimiert (Langkante ~1600 px, Hero ~2400 px, JPEG q80).
Diese 55 Bilder sind auch schon in die Mockup-Seiten (Startseite-Hero, Latest Work, alle vier
Galerien mit Lightbox) eingebaut.

**Für Claude Code:** Den Ordner `website/` direkt als Bildquelle verwenden
(nach `/public/images/{kategorie}/` übernehmen, optional zusätzlich WebP/AVIF erzeugen). Reihenfolge
= Nummerierung im Dateinamen. Alt-Texte siehe Tabellen oben bzw. sind in den Mockup-`<img>`-Tags hinterlegt.

**Noch offen:**
- `about/` Portrait von Julian fehlt im Ordner → bitte ein Porträtfoto ergänzen (`about-portrait-julian.jpg`).
- `design/` Grafikarbeiten (Ferrari-Poster, RERIDE, Surfer-Mag, Atomic-Goggle, Logos) sind separate
  Dateien und nicht Teil dieses Foto-Ordners → bei Bedarf separat liefern.
- Aufräumen: im Ordner liegen jetzt auch Hilfsdateien `website.tar.gz` und `_contact/` (Kontaktbögen) —
  die kannst du löschen.

Alle anderen Fotos im Ordner (nicht ausgewählt) gehören **nicht** auf die Website.
