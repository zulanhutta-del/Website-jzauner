# START HERE — Julian Zauner Photography Website

This folder is the complete hand-off for building **julianzauner.at** (Zauner Visuals).
It was designed in Claude (Cowork) as a clickable mockup; now build it for real here in Claude Code.

## What's in this folder
```
START-HERE.md          ← this file (read first)
briefing.md            ← full strategy: tech stack, page structure, SEO/GEO plan, JSON-LD, copy
image-map.md           ← which image belongs where + alt texts
reference/             ← the approved design as HTML (open index.html in a browser; images load from ../images/)
  index.html                 (homepage: hero carousel, welcome, latest work)
  gallery-cars.html          (masonry gallery + lightbox)
  gallery-creative.html
  gallery-landscape.html
  gallery-wildlife.html
  design.html                (graphic design projects)
  about.html                 (biography)
  contact.html               (contact info + form)
images/                ← final, web-optimized, correctly-named photos
  hero/ (4)  cars/ (15)  wildlife/ (12)  landscape/ (14)  creative/ (10)
```

## The goal
Rebuild the reference design as a **real, fast, SEO/GEO-optimized site** and deploy it.

**Recommended stack** (see briefing.md §2 for rationale & alternative):
- **Astro** (or Next.js App Router) + **TypeScript** + **Tailwind CSS**
- **Vercel** for hosting (auto-deploy from GitHub)
- **GitHub** repo
- **Supabase** for the contact-form submissions (table `inquiries`) — see briefing.md §13

> Astro is the leaner choice for this image-heavy portfolio and gives excellent SEO out of the box.
> Use Next.js if you plan richer dynamic features later.

## Design system (matches the reference exactly)
- **Colours:** near-black bg `#0C0D10`, surface `#14161B`, line `#2A2E36`, text `#ECEBE7`,
  muted `#8B9099`, subtle gold accent `#C6A15B`. Dark, single-theme, cinematic.
- **Type:** **Helvetica Neue** everywhere — headings **bold + white**, body regular, small labels medium.
  (For production add a web-safe fallback / licensed webfont so Windows visitors match; note in briefing.)
- **Header:** solid black bar, ~101px tall, logo **ZAUNER VISUALS** (with PHOTO · VIDEO · DESIGN) flush
  top-left, menu right: **Photo ▾** (click-dropdown: cars · creative · landscape · wildlife) · Design ·
  About me · Contact · Instagram. Logo always links home. All navigation stays in the same window.
- **Homepage:** full-screen hero **carousel** (auto-advance ~4s, 4 slides: Automotive/Motorsport,
  Creative, Landscape, Wildlife — each a big lowercase-ish title + "View gallery" pill button, dots below);
  then **Welcome to my website.** (text left, portrait right, "read more" → about); then **Latest Work**
  grid; footer.
- **Gallery pages:** big lowercase title + one short line, then a **masonry grid** of photos with a
  click **lightbox**. Clean, minimal.
- **Footer (every page):** left `© 2026 Julian Zauner`, right `Privacy · Cookies · Imprint`.

## Routes / pages (SEO-friendly slugs — see briefing.md §4)
```
/                                  homepage
/automotive-motorsport-salzburg    (cars gallery — main SEO landing page)
/creative
/landscape-salzburg
/wildlife
/design
/about
/contact
/privacy /cookies /imprint         (legal — Julian must supply German legal text)
```
Put the 300–500 words of unique text + FAQ on the automotive/motorsport landing page (briefing §7–8).

## Images
Use `images/` directly (copy to `/public/images/` or `/src/assets/`). File names carry the order
(`cars-01…`, etc.). Convert to WebP/AVIF, add responsive sizes, lazy-load, and use the alt texts from
image-map.md. Hero images are the 4 in `images/hero/`.

Still missing (Julian to provide): a **portrait of Julian** for /about (`about/about-portrait.jpg`),
and the **graphic-design work files** for /design (Ferrari poster, RERIDE, Atomic goggle, logos…).

## SEO / GEO (the whole point — briefing.md §5–12)
- Per-page `<title>` + meta description (briefing §6), JSON-LD (`ProfessionalService`, `Person`,
  `FAQPage`, `BreadcrumbList` — briefing §8), sitemap.xml, robots.txt that **allows** AI crawlers
  (GPTBot, Google-Extended, PerplexityBot, ClaudeBot), Core Web Vitals, image SEO.
- **301-redirect the old Wix URLs** to the new ones on launch (don't lose ranking).
- Google Business Profile + consistent NAP. Keep the address consistent everywhere
  (contact page currently shows 5303 Thalgau/Salzburg; footer previously 5020 Salzburg — pick one).

## First steps in Claude Code
1. `cd` into this folder (it's your project root — separate from any other project).
2. Init the app: `npm create astro@latest .`  (or `npx create-next-app@latest .`)
3. Recreate the design system (colours, Helvetica Neue, header/dropdown/footer) as shared components.
4. Build the pages from `reference/*.html`, wiring images from `images/`.
5. Add the SEO layer (metadata, JSON-LD, sitemap, robots) per briefing.md.
6. `git init`, push to a new **GitHub** repo, connect **Vercel** for auto-deploy, add **Supabase** for the form.
7. Point the domain julianzauner.at at Vercel and add the 301 redirects.
