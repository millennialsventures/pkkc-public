# PKKC Public Website — Design

## Intent

Persatuan Komuniti Kita Cybersouth (PKKC) is a registered residents' association
(JPPM registration PPM-004-10-21092024, registered 21 September 2024, address
NO 4-1, Jalan KB8, KITA Bayu, Cybersouth, 43800 Dengkil, Selangor) that currently
has no public web presence. A companion mobile app (`pkkc-mobile`, Expo/React
Native) already exists for members to register, renew membership, and view
announcements, directory, and marketplace — more mobile features are coming.

This project builds **pkkc-public**, a static marketing/informational website.
Its job is narrower than "explain PKKC" — it exists to turn a Cybersouth
resident who doesn't know PKKC yet into someone convinced enough to register
(registration itself happens in the mobile app; the website drives intent and
trust, it is not a transactional system).

## Goals

- A visitor who has never heard of PKKC understands, within the hero section,
  what it is and why it exists.
- The site visibly proves PKKC is a real, legitimate, officially registered
  body (registration number, date, address) — not a vanity page.
- The organisation chart and committee are shown with real names/positions
  (sourced from `pkkc-mobile/app/organisation.tsx`), reinforcing that real
  people are accountable.
- A taste of community activities is shown, even before real event data exists.
- The mobile app is teased with its real feature set, building anticipation
  without overpromising a launch date.
- The site feels distinctly "PKKC" — modern, animated, built from the actual
  logo's colors — not a generic template.

## Non-goals

- No real backend, CMS, auth, or database. All content is hardcoded in the
  codebase for this phase (explicitly requested).
- No membership registration, renewal, or any transactional flow on the
  website — those stay in the mobile app. The website does not duplicate
  app functionality.
- No waitlist/email capture for the mobile app teaser (decided: teaser only,
  no CTA button, since there's no backend to receive it).
- No multi-language toggle. Bahasa Malaysia only, matching the org's actual
  documents and committee titles.

## Anti-goals (would count as failure even if "it works")

- A generic-feeling site that could be any club's homepage (ignores the
  distinctive rainbow logo and the brief to avoid "templated defaults").
- Fabricated specifics presented as fact: invented activities must read as
  clearly illustrative, not implied to be real past events with real dates.
- Heavy animation that hurts mobile performance or ignores
  `prefers-reduced-motion` — this is a residents' association site, not a
  portfolio piece; it still needs to load fast on mobile data in Dengkil.
- Embedding the scanned government registration certificate (with official
  seal/signature) on the public page — citing the registration number and
  date as text is enough proof; publishing a scan of a signed government
  document isn't necessary and is avoided by default (see "Left to the
  builder" if they want a download link instead).

## Constraints

- Hardcoded content only (no CMS) — this phase.
- Must use the real committee data already encoded in
  `pkkc-mobile/app/organisation.tsx` (14 members, 4 hierarchy levels) rather
  than inventing names.
- Must use the real logo file (`logo pkkc - transparent background.png`).
- The `pkkc-public` repo already has a GitHub remote
  (`millennialsventures/pkkc-public`, no commits yet) — build happens there.
- No MCP installation is required for this project. Vercel deployment and
  GitHub workflows are available as built-in skills in this environment
  already; nothing extra needs installing for the human partner.

## Decided (brainstormed with human partner)

**Color palette — "Light & Airy," colors sampled directly from the logo file**
(not the mobile app's teal/navy design system — intentionally a fresh,
distinct palette for the public-facing brand):

| Role | Hex | Source |
|---|---|---|
| Purple | `#B8529E` | logo |
| Blue (primary) | `#1273B8` | logo |
| Pink | `#EF5FA5` | logo |
| Green | `#37A94A` | logo |
| Orange | `#F49021` | logo |
| Red | `#ED1E26` | logo |
| Base background | `#FAFAF9` (off-white) | chosen to keep the rainbow accents readable |
| Ink / body text | near-black, e.g. `#1A1A1A` | chosen for contrast on the light base |

Approved via visual mockup (3 options shown: Light & Airy / Deep Navy /
Mesh Gradient — Light & Airy selected).

**Hero style — "Parallax Floating Blobs"**: soft, semi-transparent rainbow
blobs drift at different scroll speeds behind the hero headline and CTA.
Approved via visual mockup (3 options shown: Parallax Blobs / Bento Grid /
Big Type + Photo Collage — Parallax Blobs selected). This pattern (soft
blob shapes + scroll parallax + fade/slide reveals) should carry through
section transitions on other pages too, not just the homepage hero, for
visual consistency.

**Stack**: Next.js (App Router, static export via `output: 'export'`) +
Tailwind CSS + Framer Motion for scroll-linked parallax and
`whileInView` reveal animations. Static export keeps hosting simple
(e.g. Vercel, matching the existing GitHub remote) with no server runtime
needed, consistent with "hardcoded data for now."

**Site structure — multi-page with an animated homepage** (not a single
long scroller):

- `/` — Laman Utama (Home): hero, short "what is PKKC," trust/registration
  strip, snapshot of organisation + activities + app teaser with "lihat
  lagi" links into their full pages, footer.
- `/tentang` — Tentang Kami: fuller story, registration proof
  (number/date/address), kawasan liputan (the 8 taman, from
  `pkkc-mobile/app/signup.tsx`: Kita Ria, Kita Bayu, Kita Impian, Kita
  Sejati, Kita Mesra, Kita Harmoni, Kita Mekar, Kita Bestari).
- `/organisasi` — Carta Organisasi: the real 14-member committee chart,
  reimagined for web (desktop: tree layout; mobile: stacked cards),
  animated staggered reveal.
- `/aktiviti` — Aktiviti: placeholder activity cards (see below).
- `/aplikasi` — Aplikasi Mudah Alih: mobile app teaser, feature list, "akan
  datang" framing, no CTA button.
- Contact/location folded into the footer (address, map link, social if
  any) rather than a separate page — reasonable for an org this size; can
  split out later if it grows.

**Footer contact info — address + registration number only.** No real
email/phone/WhatsApp/social exists yet (the only candidates found in
`pkkc-mobile` — `info@pkkc.org`, `03-12345678`, `wa.me/60123456789` — are
mock/test data used elsewhere for placeholder directory/marketplace
listings, not verified real PKKC channels, so they must not be published
as fact). Footer shows: official name, registration number
(PPM-004-10-21092024), registered date, and address only. Revisit once
real contact channels exist.

**Deployment target — `pkkc.org.my`.** This is a real custom domain, so
SEO meta, canonical URLs, OG tags, `sitemap.xml`, and `robots.txt` should
be built against `https://pkkc.org.my` from the start rather than a
placeholder Vercel subdomain. Deployment still goes through the existing
`millennialsventures/pkkc-public` GitHub remote (e.g. via Vercel); domain
DNS connection is a deploy-time task, not a blocker for building the site
itself.

**Activities content — placeholder**: 4–6 realistic-sounding community
activity cards (e.g. gotong-royong, majlis Raya, futsal night, mesyuarat
agung) written as illustrative placeholders, clearly structured so they're
trivial to find/replace with real events later. No implied real dates.

**Mobile app teaser — "coming soon" only, no CTA**: feature list drawn from
what's actually built in `pkkc-mobile/app` (pendaftaran & pembaharuan
keahlian, direktori ahli, pengumuman, marketplace komuniti, carta
organisasi) framed as "akan datang" / "sedang dibangunkan." No app store
badges (app isn't published), no email/WhatsApp capture (decided against —
no backend to receive it).

**Language**: Bahasa Malaysia only, matching committee titles (Pengerusi,
Timbalan Pengerusi, Setiausaha, Penolong Setiausaha, Bendahari, AJK) and
official documents.

## Left to the builder

- Exact Tailwind config / CSS variable naming for the palette above.
- Specific copy for the "Tentang Kami" story, mission-style framing, and
  hero headline/subhead — no existing mission/vision statement was found in
  either codebase, so this is original copy in the site's voice, written to
  be easy for the human partner to edit (not presented as official
  quotes/policy).
- Exact wording and selection of the 4–6 placeholder activities.
- Visual treatment of activity cards: since there are no real event photos
  yet, use icon/illustration-based cards (not generic stock "community"
  photos standing in as if they were real PKKC events) — avoids implying
  fabricated photographic evidence of events that didn't happen.
- Org chart responsive behavior details (breakpoints, connector line
  styling) — follow the brief's "modern, smooth transitions" direction,
  loosely inspired by the existing React Native tree layout in
  `organisation.tsx` but is a fresh web implementation, not a port.
- Whether to add a "Muat turun Sijil Pendaftaran" (download registration
  certificate PDF) link in the footer/Tentang page as an extra trust
  signal, versus text-only citation of the registration number — default
  is text-only per the anti-goal above; flip this is a low-cost call either
  way.
- Exact favicon/meta setup from the logo file.
- `robots.txt` / basic SEO meta (title, description, OG tags) — standard
  defaults, built against the confirmed canonical domain `https://pkkc.org.my`.

## Next step

Once this document is approved, proceed to a full implementation plan
(`superpowers:writing-plans`) before any code is written.
