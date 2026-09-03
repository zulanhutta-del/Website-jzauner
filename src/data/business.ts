export const SITE_URL = "https://www.julianzauner.at";
export const SITE_NAME = "Julian Zauner — Zauner Visuals";

export const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#business`,
  name: "Julian Zauner",
  image: `${SITE_URL}/og-image.jpg`,
  url: SITE_URL,
  email: "julianzauner@icloud.com",
  priceRange: "€€",
  founder: { "@type": "Person", name: "Julian Zauner" },
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
  knowsAbout: [
    "Automobilfotografie",
    "Motorsportfotografie",
    "Aerial-/Drohnenfotografie",
    "Wildlife-Fotografie",
    "Landschaftsfotografie",
    "Videografie",
    "Grafikdesign",
  ],
  sameAs: ["https://www.instagram.com/jzauner_"],
};

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Julian Zauner",
  jobTitle: "Fotograf, Videograf & Designer",
  worksFor: { "@id": `${SITE_URL}/#business` },
  address: { "@type": "PostalAddress", addressLocality: "Salzburg", addressCountry: "AT" },
  sameAs: ["https://www.instagram.com/jzauner_"],
};

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

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
