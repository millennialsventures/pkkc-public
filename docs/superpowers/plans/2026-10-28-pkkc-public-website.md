# PKKC Public Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and statically export a 5-page Bahasa Malaysia website (`/`, `/tentang`, `/organisasi`, `/aktiviti`, `/aplikasi`) for Persatuan Komuniti Kita Cybersouth (PKKC), using a rainbow palette sampled from the real logo, parallax-blob hero animation, real committee/coverage-area data, and a "coming soon" mobile app teaser.

**Architecture:** Next.js (App Router) with `output: 'export'` for a fully static site, styled with Tailwind CSS using a custom theme extension for the logo palette, animated with Framer Motion (scroll parallax + `whileInView` reveals, both respecting `prefers-reduced-motion`). All content is hardcoded TypeScript data modules — no CMS, no backend, no forms. Tested with Vitest + React Testing Library (jsdom), with `IntersectionObserver` and `matchMedia` mocked for the motion components.

**Tech Stack:** Next.js 15 (App Router, TypeScript, static export), Tailwind CSS, Framer Motion, Vitest, React Testing Library, npm.

**Spec:** `docs/superpowers/specs/2026-10-28-pkkc-public-website-design.md`

## Global Constraints

- Bahasa Malaysia only — no language toggle, no English copy.
- No CMS, backend, auth, or database. All content is hardcoded TypeScript/TSX. No forms, no waitlist/email capture anywhere on the site.
- No membership registration or renewal UI on the website — those flows stay in the mobile app; the website only links out conceptually, never a form.
- Footer shows **only**: official name "PERSATUAN KOMUNITI KITA CYBERSOUTH (PKKC)", registration number `PPM-004-10-21092024`, registered date `21 September 2024`, and address `NO 4-1, JALAN KB8, KITA BAYU, CYBERSOUTH, 43800 DENGKIL, SELANGOR`. No email, phone, WhatsApp, or social links — none are verified real (the only candidates found, `info@pkkc.org` / `03-12345678` / `wa.me/60123456789`, are mock data from `pkkc-mobile` and must never appear on the public site).
- Committee data must exactly match `pkkc-mobile/app/organisation.tsx` (14 members, levels 1–4; see Task 3 for the exact list).
- Taman coverage list must exactly match `pkkc-mobile/app/signup.tsx`'s `taman` chip options (8 taman; see Task 3).
- Canonical domain is `https://pkkc.org.my` — use it in `metadataBase`, OG tags, `sitemap.xml`, and `robots.txt`.
- Palette (sampled from the logo file, not the mobile app's teal/navy system):
  purple `#B8529E`, blue `#1273B8` (primary), pink `#EF5FA5`, green `#37A94A`,
  orange `#F49021`, red `#ED1E26`, background `#FAFAF9`, ink `#1A1A1A`.
- Hero/section motion pattern is "parallax floating blobs" + scroll-triggered fade/slide reveals, consistently across all 5 pages — not just the homepage.
- Activities on `/aktiviti` are explicitly placeholder/illustrative — every card must carry a visible "Contoh aktiviti" (example activity) label and use icon/illustration art, never photos implying a real past event.
- `/aplikasi` (mobile app teaser) has **zero** call-to-action: no button, no link, no email/WhatsApp capture, no app store badge.
- All animation must respect `prefers-reduced-motion: reduce` (disable/skip transform-based motion, keep content visible).
- Static export only: no `next/image` without `unoptimized: true`, no server actions, no `cookies()`/`headers()`, no dynamic route segments requiring a server.

## Review Focus

- Footer must never render fabricated contact info (`info@pkkc.org`, `03-12345678`, `wa.me/...`, or any email/phone/social) — this directly contradicts the site's core legitimacy goal and is an explicit anti-goal. Test owned by Task 5.
- `next build` with `output: 'export'` must succeed with no server-only API usage — the whole point of this project is a static, hardcoded site; a build that silently requires a server defeats the goal. Test owned by Task 1 (config) and Task 12 (final verification).
- `/aplikasi` must contain no actionable CTA (button, mailto, tel, wa.me, or external app-store link) — this was an explicit decision (teaser only), easy for an implementer to "helpfully" add back. Test owned by Task 10.
- `/aktiviti` cards must not imply real past events — every card requires the visible "Contoh aktiviti" label and must not use photographic imagery. Test owned by Task 9.
- Motion components must render static (no transform animation) when `prefers-reduced-motion: reduce` is set, while still rendering all content — explicit anti-goal about accessibility/performance. Test owned by Task 4.

---

## File Structure

```
pkkc-public/
├── app/
│   ├── layout.tsx              # root layout: fonts, metadata, NavBar, Footer
│   ├── globals.css             # Tailwind entry + CSS variables for palette
│   ├── page.tsx                # / (Laman Utama)
│   ├── tentang/page.tsx        # /tentang (Tentang Kami)
│   ├── organisasi/page.tsx     # /organisasi (Carta Organisasi)
│   ├── aktiviti/page.tsx       # /aktiviti (Aktiviti)
│   ├── aplikasi/page.tsx       # /aplikasi (Aplikasi Mudah Alih)
│   ├── robots.ts
│   └── sitemap.ts
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Container.tsx
│   │   │   ├── Section.tsx
│   │   │   ├── Button.tsx
│   │   │   └── Badge.tsx
│   │   ├── layout/
│   │   │   ├── NavBar.tsx
│   │   │   └── Footer.tsx
│   │   ├── motion/
│   │   │   ├── useReducedMotion.ts
│   │   │   ├── ParallaxBlobs.tsx
│   │   │   └── RevealOnScroll.tsx
│   │   ├── organisation/
│   │   │   ├── OrgChart.tsx
│   │   │   └── OrgCard.tsx
│   │   └── activities/
│   │       └── ActivityCard.tsx
│   ├── data/
│   │   ├── orgInfo.ts          # registration number, date, address, domain
│   │   ├── committee.ts        # 14 members, levels 1-4
│   │   ├── taman.ts            # 8 taman names
│   │   ├── activities.ts       # 4-6 placeholder activities
│   │   └── appFeatures.ts      # mobile app feature list
│   └── test/
│       └── setup.ts            # jsdom mocks: IntersectionObserver, matchMedia
├── public/
│   ├── logo.png                # copied from project root
│   └── favicon.ico / icon.png
├── next.config.ts              # output: 'export', images.unoptimized
├── tailwind.config.ts          # palette theme extension
├── vitest.config.ts
├── tsconfig.json
└── package.json
```

---

### Task 1: Project Scaffold (Next.js + TypeScript + Tailwind + Vitest + static export)

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `postcss.config.mjs`, `vitest.config.ts`, `.gitignore`
- Create: `app/layout.tsx` (minimal placeholder), `app/page.tsx` (minimal placeholder), `app/globals.css`
- Create: `src/test/setup.ts`
- Test: `src/test/smoke.test.tsx`

**Interfaces:**
- Produces: `next.config.ts` exports a config with `output: 'export'` and `images: { unoptimized: true }` — every later page/component must stay compatible with static export.
- Produces: Tailwind theme tokens under `theme.extend.colors.pkkc` = `{ purple: '#B8529E', blue: '#1273B8', pink: '#EF5FA5', green: '#37A94A', orange: '#F49021', red: '#ED1E26', bg: '#FAFAF9', ink: '#1A1A1A' }` — all later components reference `pkkc-*` Tailwind classes (e.g. `bg-pkkc-blue`, `text-pkkc-ink`), never raw hex.
- Produces: `src/test/setup.ts` registers `IntersectionObserver` and `window.matchMedia` mocks globally for Vitest (referenced by `vitest.config.ts`'s `setupFiles`) — every later component test relies on these existing.
- Produces: `vitest.config.ts` resolves the `@/*` import alias (via the `vite-tsconfig-paths` plugin) exactly as `tsconfig.json` defines it — Tasks 8, 9, and 10's tests import data modules as `@/src/data/...` and depend on this resolving under Vitest, not just under Next.js's own bundler.

- [ ] **Step 1: Scaffold the Next.js app**

Run: `npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*" --eslint` (answer "no" to any prompt about using `src/`; this plan adds its own `src/` for non-route code only). Confirm it creates `app/`, `package.json`, `tsconfig.json`, `tailwind.config.ts` (or `.js`), `postcss.config.mjs`.

- [ ] **Step 2: Configure static export in `next.config.ts`**

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
```

- [ ] **Step 3: Extend Tailwind theme with the `pkkc` palette in `tailwind.config.ts`**

Add the six logo colors plus `bg`/`ink` under `theme.extend.colors.pkkc`, exact hex values listed in the Interfaces block above.

- [ ] **Step 4: Install test dependencies and configure Vitest**

Run: `npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event vite-tsconfig-paths`

Create `vitest.config.ts` with `environment: 'jsdom'`, `setupFiles: ['./src/test/setup.ts']`, the React plugin, and the `vite-tsconfig-paths` plugin (resolves the `@/*` alias from `tsconfig.json` — Tasks 8-10's tests import via `@/src/data/...` and will fail to resolve without this).

- [ ] **Step 5: Write `src/test/setup.ts` with `IntersectionObserver` and `matchMedia` mocks**

```typescript
import '@testing-library/jest-dom/vitest';

class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
// @ts-expect-error - test environment polyfill
global.IntersectionObserver = MockIntersectionObserver;

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  }),
});
```

- [ ] **Step 6: Write the failing smoke test**

```typescript
// src/test/smoke.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from '../../app/page';

describe('smoke', () => {
  it('renders the home page placeholder', () => {
    render(<Home />);
    expect(screen.getByText(/PKKC/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 7: Run test to verify it fails**

Run: `npx vitest run src/test/smoke.test.tsx`
Expected: FAIL (placeholder `app/page.tsx` from scaffold doesn't contain "PKKC")

- [ ] **Step 8: Replace `app/page.tsx` placeholder content with a minimal "PKKC" heading**

Minimal `export default function Home() { return <main>PKKC</main>; }` — full implementation comes in Task 6.

- [ ] **Step 9: Run test to verify it passes**

Run: `npx vitest run src/test/smoke.test.tsx`
Expected: PASS

- [ ] **Step 10: Verify static export build succeeds**

Run: `npm run build`
Expected: completes with an `out/` directory containing `index.html`, no errors about server-only APIs.

- [ ] **Step 11: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js static-export site with Tailwind palette and Vitest"
```

---

### Task 2: Shared UI Primitives (Container, Section, Button, Badge)

**Files:**
- Create: `src/components/ui/Container.tsx`
- Create: `src/components/ui/Section.tsx`
- Create: `src/components/ui/Button.tsx`
- Create: `src/components/ui/Badge.tsx`
- Test: `src/components/ui/ui.test.tsx`

**Interfaces:**
- Consumes: `pkkc-*` Tailwind color tokens from Task 1.
- Produces: `Container({ children, className? }: { children: ReactNode; className?: string })` — a `div` with responsive horizontal padding (`px-4 sm:px-6 lg:px-8`) and `max-w-6xl mx-auto`. All page sections wrap content in this.
- Produces: `Section({ children, className? }: { children: ReactNode; className?: string })` — a `section` with vertical padding (`py-16 sm:py-24`).
- Produces: `Button({ children, href?, onClick?, variant = 'primary' | 'outline' }: ...)` — renders an `<a>` when `href` is given, else `<button>`. `primary` = gradient `from-pkkc-blue to-pkkc-purple` background, white text; `outline` = `border-pkkc-blue text-pkkc-blue`.
- Produces: `Badge({ children, color? }: { children: ReactNode; color?: 'blue'|'purple'|'pink'|'green'|'orange'|'red' })` — small pill, `bg-pkkc-{color}/10 text-pkkc-{color}` (default `blue`).

- [ ] **Step 1: Write failing tests for all four primitives**

```typescript
// src/components/ui/ui.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Container } from './Container';
import { Section } from './Section';
import { Button } from './Button';
import { Badge } from './Badge';

describe('ui primitives', () => {
  it('Container applies responsive padding classes', () => {
    render(<Container><p>content</p></Container>);
    expect(screen.getByText('content').parentElement?.className).toMatch(/px-4/);
  });

  it('Button renders as a link when href is given', () => {
    render(<Button href="/tentang">Ketahui Lagi</Button>);
    expect(screen.getByRole('link', { name: 'Ketahui Lagi' })).toHaveAttribute('href', '/tentang');
  });

  it('Button renders as a button when no href is given', () => {
    render(<Button>Klik</Button>);
    expect(screen.getByRole('button', { name: 'Klik' })).toBeInTheDocument();
  });

  it('Badge applies the color-specific classes', () => {
    render(<Badge color="green">Aktif</Badge>);
    expect(screen.getByText('Aktif').className).toMatch(/pkkc-green/);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run src/components/ui/ui.test.tsx`
Expected: FAIL (modules don't exist yet)

- [ ] **Step 3: Implement `Container`, `Section`, `Button`, `Badge`**

Implement per the signatures in Interfaces. No business logic — pure presentational components.

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run src/components/ui/ui.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/ui
git commit -m "feat: add shared UI primitives (Container, Section, Button, Badge)"
```

---

### Task 3: Content Data Layer (committee, taman, activities, app features, org info)

**Files:**
- Create: `src/data/orgInfo.ts`
- Create: `src/data/committee.ts`
- Create: `src/data/taman.ts`
- Create: `src/data/activities.ts`
- Create: `src/data/appFeatures.ts`
- Test: `src/data/data.test.ts`

**Interfaces:**
- Produces: `orgInfo` object: `{ name: 'PERSATUAN KOMUNITI KITA CYBERSOUTH (PKKC)', shortName: 'PKKC', registrationNumber: 'PPM-004-10-21092024', registeredDate: '21 September 2024', address: 'NO 4-1, JALAN KB8, KITA BAYU, CYBERSOUTH, 43800 DENGKIL, SELANGOR', domain: 'https://pkkc.org.my' }` — Footer (Task 5) and `/tentang` (Task 7) consume this; nothing else in the data layer or components may hardcode these strings separately.
- Produces: `CommitteeMember { id: number; name: string; position: string; level: 1|2|3|4 }` and `committee: CommitteeMember[]` with exactly these 14 entries (copied verbatim from `pkkc-mobile/app/organisation.tsx`):
  1. `ASMEL SUFIAN BIN HASSAN` — `Pengerusi PKKC` — level 1
  2. `ABDUL HADI BIN OSMAN` — `Timbalan Pengerusi PKKC` — level 2
  3. `Puan Syuhaidah` — `Setiausaha PKKC` — level 3
  4. `NORMALA BINTI CHE EEMBI @ JAMIL` — `Penolong Setiausaha PKKC` — level 3
  5. `MOHD HAFIZZUDDIN BIN KAMARUZAINI` — `Bendahari PKKC` — level 3
  6. `ABDUL KARIM BIN ABDUL RAHIM` — `AJK PKKC` — level 4
  7. `MUHAMMAD HARITH BIN ZAMSAIMI` — `AJK PKKC` — level 4
  8. `MUHAMMAD AZHARUDDIN BIN KASWANDI` — `AJK PKKC` — level 4
  9. `NIK KHAIRUL HAKIM BIN AB RAZAK` — `AJK PKKC` — level 4
  10. `KHAIRUN NIZAM BIN ABD SAMAD` — `AJK PKKC` — level 4
  11. `ZAKIR BIN HJ MOKRI` — `AJK PKKC` — level 4
  12. `MOHD YUNUS BIN MAT NAWAWI` — `AJK PKKC` — level 4
  13. `ABU HANIFAH BIN YAHAYA` — `AJK PKKC` — level 4
  14. `ABDUL RAHMAN BIN MUSTAPHA` — `AJK PKKC` — level 4
  `OrgChart` (Task 8) consumes `committee` directly.
- Produces: `taman: string[]` = `['Kita Ria', 'Kita Bayu', 'Kita Impian', 'Kita Sejati', 'Kita Mesra', 'Kita Harmoni', 'Kita Mekar', 'Kita Bestari']` (copied verbatim from `pkkc-mobile/app/signup.tsx`). `/tentang` (Task 7) consumes this.
- Produces: `Activity { id: number; title: string; description: string; icon: string }` and `activities: Activity[]` with 4-6 entries (e.g. Gotong-Royong Perdana, Majlis Rumah Terbuka Aidilfitri, Malam Futsal Komuniti, Mesyuarat Agung Tahunan, Kelas Tuisyen Percuma, Program Kitar Semula) — original placeholder copy, `icon` is a short identifier string (e.g. `'broom'`, `'home'`, `'ball'`) for later icon mapping, not a photo path. `/aktiviti` (Task 9) consumes this.
- Produces: `AppFeature { id: number; title: string; description: string }` and `appFeatures: AppFeature[]` covering: Pendaftaran & Pembaharuan Keahlian, Direktori Ahli, Pengumuman, Marketplace Komuniti, Carta Organisasi (5 entries, drawn from what's actually built in `pkkc-mobile/app`). `/aplikasi` (Task 10) consumes this.

- [ ] **Step 1: Write failing data-integrity tests**

```typescript
// src/data/data.test.ts
import { describe, it, expect } from 'vitest';
import { committee } from './committee';
import { taman } from './taman';
import { activities } from './activities';
import { appFeatures } from './appFeatures';
import { orgInfo } from './orgInfo';

describe('content data layer', () => {
  it('has exactly 14 committee members', () => {
    expect(committee).toHaveLength(14);
  });

  it('has exactly one level-1 chairman', () => {
    expect(committee.filter((m) => m.level === 1)).toHaveLength(1);
    expect(committee[0]).toMatchObject({ name: 'ASMEL SUFIAN BIN HASSAN', position: 'Pengerusi PKKC', level: 1 });
  });

  it('has exactly 9 level-4 AJK members', () => {
    expect(committee.filter((m) => m.level === 4)).toHaveLength(9);
  });

  it('has exactly 8 taman', () => {
    expect(taman).toEqual([
      'Kita Ria', 'Kita Bayu', 'Kita Impian', 'Kita Sejati',
      'Kita Mesra', 'Kita Harmoni', 'Kita Mekar', 'Kita Bestari',
    ]);
  });

  it('has between 4 and 6 placeholder activities', () => {
    expect(activities.length).toBeGreaterThanOrEqual(4);
    expect(activities.length).toBeLessThanOrEqual(6);
  });

  it('has the real orgInfo registration details', () => {
    expect(orgInfo.registrationNumber).toBe('PPM-004-10-21092024');
    expect(orgInfo.domain).toBe('https://pkkc.org.my');
  });

  it('has app features list non-empty', () => {
    expect(appFeatures.length).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run src/data/data.test.ts`
Expected: FAIL (modules don't exist)

- [ ] **Step 3: Implement all five data modules per the Interfaces block**

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run src/data/data.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/data
git commit -m "feat: add hardcoded content data layer (committee, taman, activities, app features)"
```

---

### Task 4: Motion Primitives (ParallaxBlobs, RevealOnScroll, reduced-motion hook)

**Files:**
- Create: `src/components/motion/useReducedMotion.ts`
- Create: `src/components/motion/ParallaxBlobs.tsx`
- Create: `src/components/motion/RevealOnScroll.tsx`
- Test: `src/components/motion/motion.test.tsx`

**Interfaces:**
- Consumes: `window.matchMedia` mock from Task 1's `src/test/setup.ts`.
- Produces: `useReducedMotion(): boolean` — reads `window.matchMedia('(prefers-reduced-motion: reduce)').matches`, updates on change. Both motion components below call this.
- Produces: `ParallaxBlobs({ className? }: { className?: string })` — renders 3+ absolutely-positioned `div`s with `aria-hidden="true"`, each `bg-pkkc-{color}` at low opacity. When `useReducedMotion()` is `false`, wraps each in a Framer Motion `motion.div` with scroll-linked `y` transform (`useScroll` + `useTransform`); when `true`, renders plain static `div`s with no transform/animation props.
- Produces: `RevealOnScroll({ children, delay? }: { children: ReactNode; delay?: number })` — wraps children in `motion.div` with `whileInView={{ opacity: 1, y: 0 }}` / `initial={{ opacity: 0, y: 24 }}` when motion is allowed; when `useReducedMotion()` is `true`, renders children directly with no wrapper animation (opacity always 1). Used by every page section in Tasks 6-10.

- [ ] **Step 1: Write failing tests for reduced-motion behavior**

```typescript
// src/components/motion/motion.test.tsx
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ParallaxBlobs } from './ParallaxBlobs';
import { RevealOnScroll } from './RevealOnScroll';

function mockReducedMotion(matches: boolean) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches,
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
    }),
  });
}

describe('motion primitives', () => {
  beforeEach(() => mockReducedMotion(false));

  it('ParallaxBlobs renders decorative blobs marked aria-hidden', () => {
    const { container } = render(<ParallaxBlobs />);
    const blobs = container.querySelectorAll('[aria-hidden="true"]');
    expect(blobs.length).toBeGreaterThanOrEqual(3);
  });

  it('RevealOnScroll always renders its children', () => {
    render(<RevealOnScroll><p>Kandungan</p></RevealOnScroll>);
    expect(screen.getByText('Kandungan')).toBeInTheDocument();
  });

  it('RevealOnScroll renders children directly without motion wrapper when reduced motion is preferred', () => {
    mockReducedMotion(true);
    const { container } = render(<RevealOnScroll><p>Kandungan</p></RevealOnScroll>);
    expect(container.querySelector('[style*="opacity: 0"]')).toBeNull();
    expect(screen.getByText('Kandungan')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run src/components/motion/motion.test.tsx`
Expected: FAIL (modules don't exist)

- [ ] **Step 3: Install Framer Motion**

Run: `npm install framer-motion`

- [ ] **Step 4: Implement `useReducedMotion`, `ParallaxBlobs`, `RevealOnScroll`**

Implement per the Interfaces block. `useReducedMotion` uses `useState` + `useEffect` subscribing to the media query's `change` event.

- [ ] **Step 5: Run tests to verify they pass**

Run: `npx vitest run src/components/motion/motion.test.tsx`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/components/motion package.json package-lock.json
git commit -m "feat: add parallax blob and scroll-reveal motion primitives with reduced-motion support"
```

---

### Task 5: Site Shell (root layout, NavBar, Footer)

**Files:**
- Create: `src/components/layout/NavBar.tsx`
- Create: `src/components/layout/Footer.tsx`
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`
- Test: `src/components/layout/layout.test.tsx`

**Interfaces:**
- Consumes: `orgInfo` from `src/data/orgInfo.ts` (Task 3); `Container` from `src/components/ui/Container.tsx` (Task 2).
- Produces: `NavBar()` — renders `<nav>` with a logo (`public/logo.png` via `next/image`, `unoptimized` config already set) and links to all 5 routes with these exact labels: `Laman Utama` (`/`), `Tentang Kami` (`/tentang`), `Carta Organisasi` (`/organisasi`), `Aktiviti` (`/aktiviti`), `Aplikasi Mudah Alih` (`/aplikasi`). `app/layout.tsx` renders this once, above `{children}`.
- Produces: `Footer()` — renders `orgInfo.name`, `orgInfo.registrationNumber` (prefixed "No. Pendaftaran:"), `orgInfo.registeredDate`, `orgInfo.address`. **Must not** render any `href="mailto:..."`, `href="tel:..."`, or the substrings `info@pkkc.org`, `03-12345678`, or `wa.me`.
- Produces: `app/layout.tsx` exports `metadata: Metadata` with `metadataBase: new URL(orgInfo.domain)`, `title: { default: 'PKKC - Persatuan Komuniti Kita Cybersouth', template: '%s | PKKC' }`, `description` (one sentence, BM), and `openGraph: { url: orgInfo.domain, siteName: 'PKKC', locale: 'ms_MY' }`.

- [ ] **Step 1: Write failing tests for NavBar and Footer**

```typescript
// src/components/layout/layout.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NavBar } from './NavBar';
import { Footer } from './Footer';

describe('NavBar', () => {
  it('links to all five routes', () => {
    render(<NavBar />);
    const expected: [string, string][] = [
      ['Laman Utama', '/'],
      ['Tentang Kami', '/tentang'],
      ['Carta Organisasi', '/organisasi'],
      ['Aktiviti', '/aktiviti'],
      ['Aplikasi Mudah Alih', '/aplikasi'],
    ];
    for (const [label, href] of expected) {
      expect(screen.getByRole('link', { name: label })).toHaveAttribute('href', href);
    }
  });
});

describe('Footer', () => {
  it('renders registration number and address', () => {
    render(<Footer />);
    expect(screen.getByText(/PPM-004-10-21092024/)).toBeInTheDocument();
    expect(screen.getByText(/DENGKIL/)).toBeInTheDocument();
  });

  it('never renders fabricated contact info', () => {
    const { container } = render(<Footer />);
    const html = container.innerHTML;
    expect(html).not.toMatch(/info@pkkc\.org/);
    expect(html).not.toMatch(/03-12345678/);
    expect(html).not.toMatch(/wa\.me/);
    expect(container.querySelector('a[href^="mailto:"]')).toBeNull();
    expect(container.querySelector('a[href^="tel:"]')).toBeNull();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run src/components/layout/layout.test.tsx`
Expected: FAIL (modules don't exist)

- [ ] **Step 3: Copy the logo asset into `public/`**

Run: `cp "../logo pkkc - transparent background.png" public/logo.png` (path relative to `pkkc-public/`; source is the project-root logo file).

- [ ] **Step 4: Implement `NavBar` and `Footer`**

Implement per the Interfaces block.

- [ ] **Step 5: Wire `app/layout.tsx` with metadata, `NavBar`, `Footer`**

Implement per the Interfaces block's metadata shape; render `<NavBar />{children}<Footer />` inside `<body>`.

- [ ] **Step 6: Run tests to verify they pass**

Run: `npx vitest run src/components/layout/layout.test.tsx`
Expected: PASS

- [ ] **Step 7: Commit**

```bash
git add app/layout.tsx app/globals.css src/components/layout public/logo.png
git commit -m "feat: add site shell with NavBar, Footer, and page metadata"
```

---

### Task 6: Homepage (`/`)

**Files:**
- Modify: `app/page.tsx`
- Test: `app/page.test.tsx`

**Interfaces:**
- Consumes: `ParallaxBlobs`, `RevealOnScroll` (Task 4); `Container`, `Section`, `Button`, `Badge` (Task 2); `orgInfo` (Task 3); `Link` from `next/link` for internal navigation to `/tentang`, `/organisasi`, `/aktiviti`, `/aplikasi`.
- Produces: default export `Home()` rendering, in order: hero (headline, subhead, `ParallaxBlobs` background, a `Button` linking to `/tentang`), a trust strip showing `orgInfo.registrationNumber` and `orgInfo.registeredDate`, and three preview sections ("Jawatankuasa Kami" linking to `/organisasi`, "Aktiviti Komuniti" linking to `/aktiviti`, "Aplikasi Mudah Alih" linking to `/aplikasi`), each wrapped in `RevealOnScroll`.

- [ ] **Step 1: Write failing test for homepage content**

```typescript
// app/page.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from './page';

describe('Home page', () => {
  it('renders the hero headline and a link to Tentang Kami', () => {
    render(<Home />);
    expect(screen.getByRole('link', { name: /Ketahui Lagi|Tentang Kami/i })).toHaveAttribute('href', '/tentang');
  });

  it('shows the registration number as a trust signal', () => {
    render(<Home />);
    expect(screen.getByText(/PPM-004-10-21092024/)).toBeInTheDocument();
  });

  it('links to all three preview sections', () => {
    render(<Home />);
    expect(screen.getByRole('link', { name: /Carta Organisasi/i })).toHaveAttribute('href', '/organisasi');
    expect(screen.getByRole('link', { name: /Aktiviti/i })).toHaveAttribute('href', '/aktiviti');
    expect(screen.getByRole('link', { name: /Aplikasi/i })).toHaveAttribute('href', '/aplikasi');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run app/page.test.tsx`
Expected: FAIL

- [ ] **Step 3: Implement the homepage per the Interfaces block**

Original BM copy for hero headline/subhead — e.g. headline "Bersama Membina Komuniti Cybersouth" (exact wording left to implementer, in the site's voice per the spec).

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run app/page.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx app/page.test.tsx
git commit -m "feat: build homepage hero, trust strip, and section previews"
```

---

### Task 7: Tentang Kami Page (`/tentang`)

**Files:**
- Create: `app/tentang/page.tsx`
- Test: `app/tentang/page.test.tsx`

**Interfaces:**
- Consumes: `orgInfo`, `taman` (Task 3); `Container`, `Section`, `Badge` (Task 2); `RevealOnScroll` (Task 4).
- Produces: default export `TentangPage()` rendering: the org's story (original copy), a registration-proof block showing `orgInfo.registrationNumber`, `orgInfo.registeredDate`, `orgInfo.address`, and a "Kawasan Liputan" section rendering all 8 `taman` entries as `Badge` chips.

- [ ] **Step 1: Write failing test**

```typescript
// app/tentang/page.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TentangPage from './page';

describe('Tentang Kami page', () => {
  it('renders registration proof', () => {
    render(<TentangPage />);
    expect(screen.getByText(/PPM-004-10-21092024/)).toBeInTheDocument();
    expect(screen.getByText(/21 September 2024/)).toBeInTheDocument();
  });

  it('renders all 8 taman', () => {
    render(<TentangPage />);
    for (const name of ['Kita Ria', 'Kita Bayu', 'Kita Impian', 'Kita Sejati', 'Kita Mesra', 'Kita Harmoni', 'Kita Mekar', 'Kita Bestari']) {
      expect(screen.getByText(name)).toBeInTheDocument();
    }
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run app/tentang/page.test.tsx`
Expected: FAIL

- [ ] **Step 3: Implement the page per the Interfaces block**

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run app/tentang/page.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add app/tentang
git commit -m "feat: build Tentang Kami page with registration proof and coverage area"
```

---

### Task 8: Carta Organisasi Page (`/organisasi`) with OrgChart

**Files:**
- Create: `src/components/organisation/OrgCard.tsx`
- Create: `src/components/organisation/OrgChart.tsx`
- Create: `app/organisasi/page.tsx`
- Test: `src/components/organisation/OrgChart.test.tsx`
- Test: `app/organisasi/page.test.tsx`

**Interfaces:**
- Consumes: `committee`, `CommitteeMember` (Task 3); `RevealOnScroll` (Task 4).
- Produces: `OrgCard({ member }: { member: CommitteeMember })` — renders `member.position` and `member.name`, with level-based styling (`bg-pkkc-blue` for level 1, progressively lighter/tinted for 2-4; classes include both a mobile-stacked utility (`w-full` / `flex-col`) and a desktop tree utility (`md:` prefixed grid/row classes), per the Review Focus item on mobile layout.
- Produces: `OrgChart({ members }: { members: CommitteeMember[] })` — groups `members` by `level` and renders one `OrgCard` per member, level 1 first, staggered reveal via `RevealOnScroll`.
- Produces: default export `OrganisasiPage()` rendering a heading ("Jawatankuasa PKKC") and `<OrgChart members={committee} />`.

- [ ] **Step 1: Write failing test for OrgChart grouping**

```typescript
// src/components/organisation/OrgChart.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { OrgChart } from './OrgChart';
import { committee } from '@/src/data/committee';

describe('OrgChart', () => {
  it('renders the chairman first', () => {
    render(<OrgChart members={committee} />);
    const names = screen.getAllByText(/BIN|BINTI|Puan/).map((el) => el.textContent);
    expect(names[0]).toMatch(/ASMEL SUFIAN BIN HASSAN/);
  });

  it('renders all 14 members', () => {
    render(<OrgChart members={committee} />);
    expect(screen.getAllByText('AJK PKKC')).toHaveLength(9);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/organisation/OrgChart.test.tsx`
Expected: FAIL

- [ ] **Step 3: Implement `OrgCard` and `OrgChart`**

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/organisation/OrgChart.test.tsx`
Expected: PASS

- [ ] **Step 5: Write failing test for the page**

```typescript
// app/organisasi/page.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import OrganisasiPage from './page';

describe('Organisasi page', () => {
  it('renders the committee chart', () => {
    render(<OrganisasiPage />);
    expect(screen.getByText('ASMEL SUFIAN BIN HASSAN')).toBeInTheDocument();
  });
});
```

- [ ] **Step 6: Run test to verify it fails, then implement `app/organisasi/page.tsx`, then verify it passes**

Run: `npx vitest run app/organisasi/page.test.tsx` (expect FAIL, implement, re-run, expect PASS)

- [ ] **Step 7: Commit**

```bash
git add src/components/organisation app/organisasi
git commit -m "feat: build Carta Organisasi page with responsive OrgChart"
```

---

### Task 9: Aktiviti Page (`/aktiviti`) with illustrative ActivityCard

**Files:**
- Create: `src/components/activities/ActivityCard.tsx`
- Create: `app/aktiviti/page.tsx`
- Test: `src/components/activities/ActivityCard.test.tsx`
- Test: `app/aktiviti/page.test.tsx`

**Interfaces:**
- Consumes: `activities`, `Activity` (Task 3); `Badge` (Task 2); `RevealOnScroll` (Task 4).
- Produces: `ActivityCard({ activity }: { activity: Activity })` — renders `activity.title`, `activity.description`, an icon derived from `activity.icon` (simple inline SVG or icon-font glyph, not a photo), and a visible `Badge` or label with the exact text `Contoh aktiviti`.
- Produces: default export `AktivitiPage()` rendering a heading and a grid of `ActivityCard` for every entry in `activities`.

- [ ] **Step 1: Write failing test for the "illustrative" label**

```typescript
// src/components/activities/ActivityCard.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ActivityCard } from './ActivityCard';

describe('ActivityCard', () => {
  it('always shows the "Contoh aktiviti" disclaimer', () => {
    render(<ActivityCard activity={{ id: 1, title: 'Gotong-Royong Perdana', description: 'Contoh penerangan.', icon: 'broom' }} />);
    expect(screen.getByText('Contoh aktiviti')).toBeInTheDocument();
  });

  it('does not render an <img> tag (icon-based, not photo-based)', () => {
    const { container } = render(<ActivityCard activity={{ id: 1, title: 'Gotong-Royong Perdana', description: 'Contoh penerangan.', icon: 'broom' }} />);
    expect(container.querySelector('img')).toBeNull();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/activities/ActivityCard.test.tsx`
Expected: FAIL

- [ ] **Step 3: Implement `ActivityCard`**

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/activities/ActivityCard.test.tsx`
Expected: PASS

- [ ] **Step 5: Write failing test for the page, implement `app/aktiviti/page.tsx`, verify it passes**

```typescript
// app/aktiviti/page.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import AktivitiPage from './page';
import { activities } from '@/src/data/activities';

describe('Aktiviti page', () => {
  it('renders one "Contoh aktiviti" label per activity', () => {
    render(<AktivitiPage />);
    expect(screen.getAllByText('Contoh aktiviti')).toHaveLength(activities.length);
  });
});
```

Run: `npx vitest run app/aktiviti/page.test.tsx` (expect FAIL, implement, re-run, expect PASS)

- [ ] **Step 6: Commit**

```bash
git add src/components/activities app/aktiviti
git commit -m "feat: build Aktiviti page with illustrative placeholder activity cards"
```

---

### Task 10: Aplikasi Mudah Alih Page (`/aplikasi`) — teaser, zero CTA

**Files:**
- Create: `app/aplikasi/page.tsx`
- Test: `app/aplikasi/page.test.tsx`

**Interfaces:**
- Consumes: `appFeatures` (Task 3); `Badge` (Task 2, e.g. an "Akan Datang" badge); `RevealOnScroll` (Task 4).
- Produces: default export `AplikasiPage()` rendering a heading, an "Akan Datang" badge, and a list/grid of `appFeatures` (title + description each). No `<button>`, no `<a>` elements anywhere on the page.

- [ ] **Step 1: Write failing test asserting zero interactive CTA elements**

```typescript
// app/aplikasi/page.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import AplikasiPage from './page';
import { appFeatures } from '@/src/data/appFeatures';

describe('Aplikasi Mudah Alih page', () => {
  it('lists every app feature', () => {
    render(<AplikasiPage />);
    for (const f of appFeatures) {
      expect(screen.getByText(f.title)).toBeInTheDocument();
    }
  });

  it('contains no CTA buttons or links', () => {
    const { container } = render(<AplikasiPage />);
    expect(container.querySelector('button')).toBeNull();
    expect(container.querySelector('a')).toBeNull();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run app/aplikasi/page.test.tsx`
Expected: FAIL

- [ ] **Step 3: Implement `app/aplikasi/page.tsx`**

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run app/aplikasi/page.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add app/aplikasi
git commit -m "feat: build Aplikasi Mudah Alih teaser page with no CTA"
```

---

### Task 11: SEO & Metadata (robots.ts, sitemap.ts, favicon/OG)

**Files:**
- Create: `app/robots.ts`
- Create: `app/sitemap.ts`
- Create: `app/icon.png` (or `app/favicon.ico`, generated from `public/logo.png`)
- Test: `app/seo.test.ts`

**Interfaces:**
- Consumes: `orgInfo.domain` (Task 3).
- Produces: `app/robots.ts` default export returning a `MetadataRoute.Robots` object allowing all user agents, `sitemap: ${orgInfo.domain}/sitemap.xml`.
- Produces: `app/sitemap.ts` default export returning a `MetadataRoute.Sitemap` array with exactly 5 entries, `url` = `${orgInfo.domain}` + each of `/`, `/tentang`, `/organisasi`, `/aktiviti`, `/aplikasi`.

- [ ] **Step 1: Write failing tests for robots and sitemap**

```typescript
// app/seo.test.ts
import { describe, it, expect } from 'vitest';
import robots from './robots';
import sitemap from './sitemap';

describe('SEO config', () => {
  it('robots allows all and points to the canonical sitemap', () => {
    const result = robots();
    expect(result.sitemap).toBe('https://pkkc.org.my/sitemap.xml');
  });

  it('sitemap lists exactly the 5 routes under the canonical domain', () => {
    const result = sitemap();
    const urls = result.map((entry) => entry.url).sort();
    expect(urls).toEqual([
      'https://pkkc.org.my',
      'https://pkkc.org.my/aktiviti',
      'https://pkkc.org.my/aplikasi',
      'https://pkkc.org.my/organisasi',
      'https://pkkc.org.my/tentang',
    ].sort());
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run app/seo.test.ts`
Expected: FAIL

- [ ] **Step 3: Implement `app/robots.ts` and `app/sitemap.ts`**

- [ ] **Step 4: Generate `app/icon.png` from the logo**

Run: use an image tool (e.g. `sips` on macOS) to produce a square icon from `public/logo.png`, e.g.: `sips -z 512 512 public/logo.png --out app/icon.png`.

- [ ] **Step 5: Run tests to verify they pass**

Run: `npx vitest run app/seo.test.ts`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add app/robots.ts app/sitemap.ts app/icon.png
git commit -m "feat: add robots.txt, sitemap.xml, and favicon for pkkc.org.my"
```

---

### Task 12: Static Export Verification (final build gate)

**Files:**
- No new source files — this task verifies the whole site.

**Interfaces:**
- Consumes: every route and component from Tasks 1-11.

- [ ] **Step 1: Run the full test suite**

Run: `npx vitest run`
Expected: all tests across all prior tasks PASS.

- [ ] **Step 2: Run the static export build**

Run: `npm run build`
Expected: completes with no errors, produces `out/`.

- [ ] **Step 3: Verify every route exported a static HTML file**

Run: `ls out/index.html out/tentang/index.html out/organisasi/index.html out/aktiviti/index.html out/aplikasi/index.html out/sitemap.xml out/robots.txt`
Expected: all 7 files exist (Next.js static export writes nested routes to `out/<route>/index.html`).

- [ ] **Step 4: Spot-check exported HTML contains expected content**

Run: `grep -l "PPM-004-10-21092024" out/index.html out/tentang/index.html`
Expected: both files match (registration number present in both the homepage trust strip and the Tentang Kami proof block).

- [ ] **Step 5: Commit (only if Steps 1-4 required any fixes)**

```bash
git add -A
git commit -m "fix: resolve static export issues found during final verification"
```

If no fixes were needed, skip this step — nothing to commit.

---

## Self-Review Notes

- **Spec coverage:** every Goal and Decided item in the spec maps to a task — palette (Task 1), parallax hero (Task 4/6), multi-page structure (Tasks 6-10), real committee/taman data (Task 3), placeholder activities with illustrative framing (Task 9), app teaser with no CTA (Task 10), BM-only copy (all page tasks, no i18n scaffolding added), footer trust info without fabricated contact (Task 5), canonical domain SEO (Task 11), static export (Tasks 1 & 12).
- **Review Focus coverage:** all five items each have an owning task and an explicit test, listed in the Review Focus section above.
- **Left-to-builder items from the spec** (Tailwind config naming, hero/story copy wording, exact activity selection, org chart breakpoint specifics, certificate-download decision, favicon generation method) are intentionally not over-specified in this plan — tasks give the exact signatures/data/guardrails and leave wording and minor styling to the implementer, per the spec.
