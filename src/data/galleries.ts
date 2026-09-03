export interface Shot {
  src: string;
  alt: string;
  cap: string;
}

export const heroSlides = [
  {
    key: "cars",
    title: "Automobil & Motorsport",
    href: "/automobil-motorsport-fotografie-salzburg",
    img: "/images/hero/hero-cars-ferrari.jpg",
    alt: "Roter Ferrari 296 GTB, Seitendetail — Automobilfotografie von Julian Zauner, Salzburg",
  },
  {
    key: "creative",
    title: "Kreativ",
    href: "/kreativ",
    img: "/images/hero/hero-creative-gasmask.jpg",
    alt: "Schwarz-Weiß Studio-Porträt mit Atemschutzmaske — kreative Fotografie",
  },
  {
    key: "landscape",
    title: "Landschaft",
    href: "/landschaftsfotografie-salzburg",
    img: "/images/hero/hero-landscape-storm-coast.jpg",
    alt: "Stürmische Küste unter dramatischen Wolken — Landschaftsfotografie",
  },
  {
    key: "wildlife",
    title: "Wildlife",
    href: "/wildlife-fotografie",
    img: "/images/hero/hero-wildlife-salamander.jpg",
    alt: "Feuersalamander am Waldboden — Wildlife-Fotografie",
  },
] as const;

export const carsGallery: Shot[] = [
  { src: "/images/cars/cars-01-ferrari-296-street.jpg", alt: "Roter Ferrari 296 GTB auf einer von Palmen gesäumten Straße", cap: "Ferrari 296 GTB" },
  { src: "/images/cars/cars-02-ferrari-blue-front.jpg", alt: "Blauer Ferrari auf einer von Palmen gesäumten Straße", cap: "Ferrari · blau" },
  { src: "/images/cars/cars-03-ferrari-wheel-detail.jpg", alt: "Ferrari Rad- und Bremssattel-Detail", cap: "Ferrari · Rad-Detail" },
  { src: "/images/cars/cars-04-porsche-911-track.jpg", alt: "Porsche 911 auf der Rennstrecke", cap: "Porsche 911 · Strecke" },
  { src: "/images/cars/cars-05-bmw-m2-mint.jpg", alt: "Mintgrüner BMW M2 im Indoor-Shooting", cap: "BMW M2" },
  { src: "/images/cars/cars-06-drift-smoke.jpg", alt: "Driftauto mit Reifenrauch", cap: "Drift · Rauch" },
  { src: "/images/cars/cars-07-drift-e30.jpg", alt: "BMW E30 Driftauto auf der Rennstrecke", cap: "Drift · E30" },
  { src: "/images/cars/cars-08-mercedes-amg-gt.jpg", alt: "Schwarzer Mercedes-AMG GT im Showroom", cap: "Mercedes-AMG GT" },
  { src: "/images/cars/cars-09-rwb-porsche.jpg", alt: "Weißer RWB Porsche Rennwagen auf der Strecke", cap: "RWB Porsche" },
  { src: "/images/cars/cars-10-vintage-race.jpg", alt: "Vintage-Rennwagen auf dem Startgrid", cap: "Vintage Race" },
  { src: "/images/cars/cars-11-porsche-taycan-monaco.jpg", alt: "Porsche Taycan auf einer Straße in Monaco", cap: "Porsche Taycan · Monaco" },
  { src: "/images/cars/cars-12-lamborghini-urus.jpg", alt: "Lamborghini Urus", cap: "Lamborghini Urus" },
  { src: "/images/cars/cars-13-ferrari-showroom.jpg", alt: "Roter Ferrari im Showroom", cap: "Ferrari · Showroom" },
  { src: "/images/cars/cars-14-honda-civic-typer.jpg", alt: "Roter Honda Civic Type R", cap: "Honda Civic Type R" },
  { src: "/images/cars/cars-15-porsche-turbo-detail.jpg", alt: "Rad-Detail eines silbernen Porsche 911 Turbo", cap: "Porsche Turbo · Detail" },
];

export const creativeGallery: Shot[] = [
  { src: "/images/creative/creative-01-ski-goggles.jpg", alt: "Studio-Porträt mit Skibrille", cap: "Skibrille" },
  { src: "/images/creative/creative-02-black-canvas.jpg", alt: "Studio-Aufnahme in Schwarz mit Leinwand", cap: "Schwarz · Leinwand" },
  { src: "/images/creative/creative-03-lightpaint-n.jpg", alt: "Lightpainting mit roter Neon-Schleife", cap: "Lightpainting" },
  { src: "/images/creative/creative-04-spraycan-portrait.jpg", alt: "Schwarz-Weiß-Porträt mit Spraydose", cap: "Spraydose" },
  { src: "/images/creative/creative-05-highway-trails.jpg", alt: "Autobahn in der Dämmerung mit Lichtspuren", cap: "Lichtspuren" },
  { src: "/images/creative/creative-06-water-lemon.jpg", alt: "Zitronenscheibe spritzt ins Wasserglas", cap: "Wasser · Zitrone" },
  { src: "/images/creative/creative-07-skier-backlit.jpg", alt: "Skifahrer im Gegenlicht mit Schneestaub", cap: "Skifahrer" },
  { src: "/images/creative/creative-08-lightpaint-loops.jpg", alt: "Rote Neon-Lightpainting-Schleifen", cap: "Light Loops" },
  { src: "/images/creative/creative-09-water-splash.jpg", alt: "Eiswürfel spritzt ins Wasserglas, Schwarz-Weiß", cap: "Water Splash" },
  { src: "/images/creative/creative-10-portrait-bw.jpg", alt: "Schwarz-Weiß Studio-Porträt", cap: "Porträt · s/w" },
];

export const landscapeGallery: Shot[] = [
  { src: "/images/landscape/landscape-01-corsica-hairpin.jpg", alt: "Serpentinenstraße an der Küste Korsikas unter dramatischen Wolken", cap: "Korsika · Serpentine" },
  { src: "/images/landscape/landscape-02-coast-cliffs.jpg", alt: "Küstenklippen mit grünen Hängen", cap: "Küste · Klippen" },
  { src: "/images/landscape/landscape-03-rocky-coast-waves.jpg", alt: "Wellen an einer felsigen Küste", cap: "Felsige Küste" },
  { src: "/images/landscape/landscape-04-bay-fog.jpg", alt: "Bucht und Berge im Morgennebel", cap: "Bucht · Nebel" },
  { src: "/images/landscape/landscape-05-island-fog.jpg", alt: "Felsige Insel im Nebel", cap: "Insel · Nebel" },
  { src: "/images/landscape/landscape-06-mountain-peaks.jpg", alt: "Zerklüftete Berggipfel unter blauem Himmel", cap: "Berggipfel" },
  { src: "/images/landscape/landscape-07-dead-tree-meadow.jpg", alt: "Kahler Baum auf einer Bergwiese", cap: "Wiese · Baum" },
  { src: "/images/landscape/landscape-08-mountain-sunset.jpg", alt: "Bergkette bei Sonnenuntergang", cap: "Bergsonnenuntergang" },
  { src: "/images/landscape/landscape-09-broom-mountains.jpg", alt: "Berge im Gegenlicht hinter Ginster", cap: "Ginster · Berge" },
  { src: "/images/landscape/landscape-10-road-windmills.jpg", alt: "Bergstraße mit Windrädern", cap: "Straße · Windräder" },
  { src: "/images/landscape/landscape-11-reservoir-road.jpg", alt: "Straße am Stausee im Nebel", cap: "Stausee-Straße" },
  { src: "/images/landscape/landscape-12-foggy-road.jpg", alt: "Leere Straße, die im Nebel verschwindet", cap: "Nebelstraße" },
  { src: "/images/landscape/landscape-13-sunset-mountains.jpg", alt: "Sonnenuntergang über gestaffelten Bergen", cap: "Sonnenuntergang Berge" },
  { src: "/images/landscape/landscape-14-red-sunset.jpg", alt: "Tiefroter Sonnenuntergang mit Wolken", cap: "Roter Sonnenuntergang" },
];

export const wildlifeGallery: Shot[] = [
  { src: "/images/wildlife/wildlife-01-wasp.jpg", alt: "Wespe auf verwittertem Holz, Makroaufnahme", cap: "Wespe · Makro" },
  { src: "/images/wildlife/wildlife-02-fire-salamander.jpg", alt: "Feuersalamander am Waldboden", cap: "Feuersalamander" },
  { src: "/images/wildlife/wildlife-03-bee-blossom.jpg", alt: "Biene auf einer Blüte, Makroaufnahme", cap: "Biene · Blüte" },
  { src: "/images/wildlife/wildlife-04-great-tit.jpg", alt: "Kohlmeise im Nadelbaum", cap: "Kohlmeise" },
  { src: "/images/wildlife/wildlife-05-dragonfly.jpg", alt: "Libelle in Nahaufnahme", cap: "Libelle" },
  { src: "/images/wildlife/wildlife-06-sparrow.jpg", alt: "Haussperling auf einer Mauer", cap: "Spatz" },
  { src: "/images/wildlife/wildlife-07-alpine-chough.jpg", alt: "Alpendohle auf einem Fels", cap: "Alpendohle" },
  { src: "/images/wildlife/wildlife-08-caterpillar.jpg", alt: "Raupe auf einem grünen Blatt, Makroaufnahme", cap: "Raupe" },
  { src: "/images/wildlife/wildlife-09-pigeon.jpg", alt: "Taube auf einer Backsteinmauer", cap: "Taube" },
  { src: "/images/wildlife/wildlife-10-bird-feeder.jpg", alt: "Spatz an einer Futterstelle im Garten", cap: "Futterstelle" },
  { src: "/images/wildlife/wildlife-11-snail.jpg", alt: "Schnecke auf Kies, Nahaufnahme", cap: "Schnecke" },
  { src: "/images/wildlife/wildlife-12-bird-branch.jpg", alt: "Vogel auf einem kahlen Ast", cap: "Vogel · Ast" },
];
