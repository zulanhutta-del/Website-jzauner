export const SITE_URL = "https://www.julianzauner.at";
export const SITE_NAME = "Julian Zauner — Zauner Visuals";

const SERVICES = [
  "Automobilfotografie",
  "Motorsportfotografie",
  "Aerial-/Drohnenfotografie",
  "Wildlife-Fotografie",
  "Landschaftsfotografie",
  "Videografie",
  "Grafikdesign",
] as const;

export const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#business`,
  name: "Julian Zauner — Zauner Visuals",
  alternateName: "Zauner Visuals",
  description:
    "Julian Zauner (Zauner Visuals) ist Fotograf, Videograf und Designer aus Thalgau bei Salzburg, spezialisiert auf Automobil- und Motorsportfotografie. Dazu Wildlife, Landschaft, Kreativ, Video und Grafikdesign — Bild, Film und Branding aus einer Hand für Kunden in Salzburg, dem Salzburger Land und ganz Österreich.",
  slogan: "Photo · Video · Design aus Salzburg",
  image: `${SITE_URL}/og-image.jpg`,
  logo: `${SITE_URL}/favicon.svg`,
  url: SITE_URL,
  email: "julianzauner@icloud.com",
  priceRange: "€€",
  inLanguage: "de-AT",
  founder: { "@type": "Person", name: "Julian Zauner", "@id": `${SITE_URL}/#julian` },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Thalgau",
    addressRegion: "Salzburg",
    postalCode: "5303",
    addressCountry: "AT",
  },
  geo: { "@type": "GeoCoordinates", latitude: 47.795, longitude: 13.253 },
  areaServed: [
    { "@type": "City", name: "Salzburg" },
    { "@type": "State", name: "Salzburger Land" },
    { "@type": "Country", name: "Österreich" },
  ],
  knowsAbout: [...SERVICES],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Foto-, Video- & Design-Leistungen",
    itemListElement: SERVICES.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s, areaServed: "Salzburg, Österreich" },
    })),
  },
  sameAs: ["https://www.instagram.com/jzauner_"],
};

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#julian`,
  name: "Julian Zauner",
  jobTitle: "Fotograf, Videograf & Designer",
  description:
    "Julian Zauner ist Fotograf, Videograf und Designer aus Thalgau bei Salzburg. Ausgebildet an der HTL Salzburg in Grafik- & Mediendesign, mit Schwerpunkt auf Automobil- und Motorsportfotografie.",
  image: `${SITE_URL}/images/profilbild/Profilbild2.jpg`,
  worksFor: { "@id": `${SITE_URL}/#business` },
  alumniOf: { "@type": "EducationalOrganization", name: "HTL Salzburg" },
  knowsAbout: [...SERVICES],
  address: { "@type": "PostalAddress", addressLocality: "Thalgau", addressRegion: "Salzburg", addressCountry: "AT" },
  sameAs: ["https://www.instagram.com/jzauner_"],
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "de-AT",
  publisher: { "@id": `${SITE_URL}/#business` },
};

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

/** Service-Schema für eine Leistungs-/Kategorie-Seite. */
export function serviceJsonLd(opts: {
  name: string;
  description: string;
  path: string;
  serviceType?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    serviceType: opts.serviceType ?? opts.name,
    description: opts.description,
    url: `${SITE_URL}${opts.path}`,
    provider: { "@id": `${SITE_URL}/#business` },
    areaServed: [
      { "@type": "City", name: "Salzburg" },
      { "@type": "State", name: "Salzburger Land" },
      { "@type": "Country", name: "Österreich" },
    ],
    inLanguage: "de-AT",
  };
}

interface GalleryShot {
  src: string;
  alt: string;
  cap: string;
}

/** ImageObject-Liste für eine Galerie-Seite (gibt KI/Suche Bildkontext + Urheber). */
export function galleryImagesJsonLd(shots: GalleryShot[], pagePath: string, limit = 12) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Bildergalerie",
    url: `${SITE_URL}${pagePath}`,
    itemListElement: shots.slice(0, limit).map((shot, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "ImageObject",
        contentUrl: `${SITE_URL}${shot.src}`,
        caption: shot.alt,
        name: shot.cap,
        creator: { "@id": `${SITE_URL}/#julian` },
        copyrightHolder: { "@id": `${SITE_URL}/#julian` },
        creditText: "Julian Zauner — Zauner Visuals",
        isPartOf: `${SITE_URL}${pagePath}`,
      },
    })),
  };
}
