# Website Structure & Technical Specification
## Nostalgic Cartoon Website — V1

> This document is the definitive technical and structural blueprint for V1 of the nostalgic cartoon website. It is written so that any developer or LLM can implement the site accurately without needing to guess intent.

---

## 1. Project Objective

### Emotional goal
The website must recreate a single, specific feeling:

> "Opening the website feels like going back to childhood and sitting in front of the TV after school to watch cartoons."

Every layout, color, animation, and interaction decision in this spec exists to serve that feeling. If a design choice doesn't support the nostalgic emotion, it doesn't belong in V1.

### Visual goal
The site should read as **"childhood memories presented through a beautifully designed modern website"** — never as a literal 2000s-era relic. Nostalgic subject matter, contemporary execution: clean spacing, smooth type, intentional motion, no clutter, no cheap skeuomorphism.

### Design pillars (apply throughout every section below)
1. **Nostalgia first** — every decision supports the emotional goal.
2. **Assets drive composition** — the layout is designed around the supplied artwork, not the other way around.
3. **Mobile is first-class** — not a shrunk desktop layout.
4. **Simple V1** — no over-engineering.
5. **Future-proof, not overbuilt** — structure allows growth without redesign, but nothing is pre-built for V2 features.
6. **Modern nostalgia** — warm and evocative, never dated or amateur-looking.

---

## 2. V1 Scope

### In scope for V1
- A single static landing page (or a very small number of static pages) establishing visual identity
- Hero section built around the "childhood TV" background asset
- A small number of content sections expressing the nostalgic concept
- Responsive desktop and mobile layouts, each independently composed
- Subtle CSS-driven animation and motion
- Background music (BGM) with user-controlled, browser-safe playback
- Semantic, accessible HTML
- Lightweight performance (no build step required)

### Explicitly postponed (do NOT build in V1)
- Interactive nostalgic cartoon "portal" or multi-world system
- Complex or multi-level navigation
- User accounts or authentication
- Databases or backend systems
- Dynamic/server-driven content
- Mini-games or complex interactivity
- Advanced client-side routing
- A full-featured music player (playlists, queues, visualizers, etc.)

V1's job is to nail the **visual identity, structure, and emotional tone**. Everything else is deferred without being designed against — see Section 19.

---

## 3. Recommended Tech Stack

**HTML + CSS + minimal Vanilla JavaScript.** No framework, no build tool, no package manager.

| Concern | Choice | Why |
|---|---|---|
| Markup | Semantic HTML5 | No templating needed for a handful of static sections |
| Styling | Plain CSS3 (custom properties for theming) | Full control, zero build step, easy to preview instantly |
| Behavior | Vanilla JS (small, single file) | Only needed for BGM toggle, subtle scroll-based reveals, mobile nav toggle |
| Tooling | VS Code + Live Server extension | Opens instantly, no install/build step, matches the stated workflow |

**Explicitly avoided unless a future version proves a real need:** npm, Node.js, React, Next.js, Vite, Tailwind, TypeScript, any bundler, any package manager. None of these are justified by V1's scope — a handful of static, content-light sections do not need a build pipeline.

**If a future page count/complexity grows significantly**, revisit this decision — but do not introduce tooling preemptively.

---

## 4. Project / Folder Structure

```
nostalgic-cartoon-site/
│
├── index.html
│
├── /css/
│   ├── reset.css              # minimal CSS reset
│   ├── variables.css          # color system, spacing scale, typography tokens
│   ├── base.css                # global element styles, typography
│   ├── layout.css              # section layout, grid/flex structure
│   ├── components.css          # cards, buttons, nav, reusable UI
│   ├── animations.css          # keyframes, transition utilities
│   └── responsive.css          # media queries (or split per-breakpoint if it grows)
│
├── /js/
│   └── main.js                  # BGM control, nav toggle, scroll reveals
│
├── /assets/
│   ├── /images/
│   │   ├── /backgrounds/
│   │   ├── /logo/
│   │   ├── /characters/
│   │   ├── /artwork/
│   │   ├── /decorations/
│   │   └── /icons/
│   └── /audio/
│       ├── bgm-desktop.mp3
│       └── bgm-mobile.mp3
│
└── /docs/
    ├── website_structure_and_technical_spec.md
    └── asset_placement_and_integration_spec.md
```

Notes:
- CSS is split by concern, not by page — V1 has effectively one page, so this keeps files small and readable rather than introducing a component system.
- `main.js` stays as a **single file** for V1. Do not modularize prematurely.
- The `/assets/` structure matches the Asset Placement spec exactly (Section 2 of that document) so both specs stay in sync.

---

## 5. Overall Page Architecture

Derived from the core concept (childhood TV nostalgia, warm memory, cartoon collection potential, character assets):

1. **Header** — logo + minimal nav (anchor links only)
2. **Hero** — the emotional centerpiece; the "TV turning on" moment
3. **Nostalgia Introduction** — short narrative section, sets emotional tone in words
4. **Cartoon / Memory Collection** — a card-based showcase area (built around supplied artwork, expands naturally in future versions)
5. **Characters** — a section spotlighting character illustrations, if/when supplied
6. **Childhood Memories / Atmosphere** — a more visual, less textual section leaning on decorative assets and mood
7. **Closing Section** — an emotional close-out / call-back to the hero feeling, with a soft CTA (e.g. "come back and visit," a mailing list, or a simple link — kept minimal)
8. **Footer** — minimal credits, links, copyright

This order is a **default recommendation**, not a rigid rule. If supplied assets or content don't fill a section meaningfully, that section should be simplified, merged with a neighbor, or omitted — never padded with filler just to match this outline (Design Principle 2: assets drive composition).

---

## 6. Hero Section

### Purpose
The hero is the "TV turning on after school" moment — the single most important section for establishing the emotional hook in the first few seconds.

### Layout & hierarchy
- Full-viewport-height (or near full-height) section
- Visual hierarchy, top to bottom: logo (small, corner or top-center) → central TV/background artwork → title/headline → short supporting line → optional single CTA
- Content should sit within the "safe area" of the TV background asset (see Asset spec Section 3) so text never overlaps busy artwork

### Background treatment
- The Childhood TV background asset is the dominant visual element, applied via CSS `background-image`
- A subtle dark overlay or gradient (e.g. `linear-gradient` at low opacity) may be layered on top only if needed for text legibility — must not mute the artwork's warmth
- Background should be `background-size: cover` with a fixed or intentional `background-position` chosen based on the asset's actual focal point (inspect the asset first — do not guess)

### Typography
- Headline: warm, rounded or slightly playful display typeface (nostalgic but legible — not a literal cartoon comic-sans style)
- Supporting text: a clean, highly readable sans-serif for contrast against the display type
- Generous letter-spacing and line-height to keep the hero feeling calm, not cramped

### CTA
- One CTA maximum (e.g. "Turn on the TV," "Start watching," "Enter" — playful phrasing matching the concept)
- Should scroll to the next section (anchor link) — no routing needed in V1

### Decorations & overlays
- Optional small decorative elements (light "static"/scanline texture, soft vignette, a subtle glow) may be added via CSS to reinforce the "old TV" feeling — keep these subtle, not literal old-TV distortion effects that would look cheap

### Atmosphere
- Motion should be minimal and slow: a gentle fade/scale-in on load, maybe a soft looping glow — nothing frantic

### Desktop composition
- Wide, cinematic framing; TV artwork centered or slightly off-center per its natural composition; text can sit beside or below the TV artwork depending on the asset's shape

### Mobile composition
- Uses the **separate mobile TV background asset** (never a cropped desktop asset — see Asset spec Section 4)
- Vertical stacking: logo → TV artwork (contained, not cropped awkwardly) → headline → CTA
- Text sized and positioned to avoid overlapping the busiest part of the mobile artwork

---

## 7. Content Sections

General rule for every section below: **purpose before decoration.** Each section should have one clear emotional or informational job.

### Nostalgia Introduction
- **Purpose:** put the emotional concept into words, briefly
- **Structure:** short heading + 1–3 sentence paragraph, generously spaced
- **Visual treatment:** minimal decoration; let the writing breathe; maybe one small supporting illustration or sticker asset

### Cartoon / Memory Collection
- **Purpose:** showcase supplied cartoon artwork in a warm, gallery-like way
- **Structure:** card grid (see Section 11 — Cards/Components), 2–4 columns depending on content volume, collapsing to 1 column on mobile
- **Visual treatment:** consistent card aspect ratio, soft shadows or rounded corners matching the overall warmth, hover states on desktop (subtle lift/scale)

### Characters
- **Purpose:** spotlight individual character illustrations if supplied
- **Structure:** flexible — could be a horizontal scroll row, a staggered grid, or featured single-character blocks, chosen based on how many character assets actually exist
- **Visual treatment:** characters should appear to "sit" naturally in the section (transparent PNGs preferred), not boxed in cards unless that fits the art style better

### Childhood Memories / Atmosphere
- **Purpose:** a more visual, breathing section that reinforces mood over information
- **Structure:** could be a large atmospheric image/illustration with minimal or no text, or a short evocative quote/line
- **Visual treatment:** leans on decorative assets (see Asset spec Section 9); the quietest, most "feeling" section on the page

### Closing Section
- **Purpose:** emotional bookend to the hero; soft invitation to return
- **Structure:** short heading, one supporting line, optional single soft CTA
- **Visual treatment:** can echo the hero's background treatment at lower intensity to create a sense of closure ("the TV turning off")

---

## 8. Navigation

V1 navigation must stay deliberately simple:
- A single fixed or static header with the logo and a small set of **anchor links** to on-page sections (e.g. Home, Cartoons, Characters, Memories)
- No dropdowns, no multi-level menus, no client-side routing
- On mobile: a simple hamburger toggle (pure CSS/minimal JS) that reveals a stacked list of the same anchor links — no off-canvas complexity, no animation libraries
- Smooth scroll behavior (CSS `scroll-behavior: smooth`, respecting reduced-motion preference — see Section 15)

---

## 9. Typography

- Two typeface roles only: **Display** (headlines — warm, characterful, slightly playful) and **Body** (clean, highly legible sans-serif)
- Load via a small number of self-hosted or system-safe web fonts to keep performance light (see Section 16)
- Type scale: define a small set of sizes via CSS custom properties (e.g. `--fs-hero`, `--fs-h2`, `--fs-body`, `--fs-small`) rather than ad-hoc sizing per section
- Line-height generous throughout (1.4–1.6 for body text) to preserve the calm, warm tone
- Avoid literal "cartoon" fonts for body copy — reserve character for headlines only, to prevent visual clutter

---

## 10. Color System

- Derive the palette **from the supplied artwork and TV background assets**, not from an arbitrary preset — extract dominant and accent tones from the actual images
- Expect a warm-toned base (this concept calls for warmth: think late-afternoon light, warm wood-paneled TV sets, soft glows) with a small number of accent colors pulled from character/cartoon artwork
- Define all colors as CSS custom properties in `variables.css`:
  - `--color-bg-base`
  - `--color-bg-alt` (for section-to-section variation)
  - `--color-accent-primary`
  - `--color-accent-secondary`
  - `--color-text-primary`
  - `--color-text-muted`
  - `--color-overlay` (for background overlays)
- Maintain sufficient contrast between text and background at all times (see Section 15 — Accessibility)
- Avoid oversaturated "kids' cartoon" primary colors across large areas — use them as accents, not backgrounds, to keep the modern/polished tone

---

## 11. Cards / Components

Reusable patterns to define once in `components.css` and reuse across sections:

- **Artwork Card** — used in the Cartoon Collection section; consistent aspect ratio, rounded corners, soft shadow, optional caption, subtle hover lift on desktop (disabled/ignored on touch devices)
- **Button/CTA** — one primary style (filled, warm accent color) and optionally one secondary style (outline/ghost); consistent padding and radius
- **Section Heading** — consistent heading treatment (size, spacing, optional decorative underline/sticker accent) reused at the top of every content section
- **Nav Link** — consistent link styling and active/hover state

Keep the component count small for V1 — only build what the current sections actually need.

---

## 12. Animation

Principles:
- **CSS-first.** Use `transition` and `@keyframes` for essentially everything; reach for JS only to add/remove a class (e.g. on scroll-into-view or on load).
- **Subtle over showy.** Fades, gentle scale-ins, soft glows, slow parallax-style background shifts — nothing bouncy, nothing fast, nothing that fights the calm nostalgic tone.
- **Purposeful.** Every animation should reinforce warmth or guide attention (e.g. a soft fade-in as sections enter the viewport) — not decorate for its own sake.

Suggested set for V1:
- Hero: fade + slight scale-in on page load
- Sections: fade/slide-up on scroll into view (via `IntersectionObserver`, a small vanilla JS utility — no library)
- Buttons/cards: soft hover transitions (desktop only)
- Respect `prefers-reduced-motion` globally (see Section 15)

---

## 13. Responsive Design

This is the most critical technical requirement in the project. **The mobile version must be independently designed, not a compressed desktop layout.**

### Breakpoint strategy
Recommend a mobile-first approach with three tiers:
- **Base (mobile):** up to ~599px — default styles
- **Tablet:** ~600px–1023px
- **Desktop:** 1024px and up

Use CSS custom properties + media queries in `responsive.css`; keep breakpoints consistent across all sections.

### Mobile layout
- Vertical, single-column stacking throughout
- The **mobile-specific TV background asset** is swapped in via media query (never a cropped desktop image — see Asset spec Section 4)
- Section padding and spacing recalculated for smaller viewports, not simply scaled down proportionally

### Typography scaling
- Use `clamp()` where practical for fluid headline scaling between breakpoints
- Body text should never drop below a comfortably readable size (≈16px baseline)

### Spacing
- Reduce section vertical padding on mobile, but preserve breathing room — do not compress content edge-to-edge
- Increase spacing between stacked elements that were side-by-side on desktop, to prevent visual crowding

### Image positioning
- Every key image (hero background, character art, artwork cards) should have mobile-specific `object-position`/`background-position` values checked against the actual asset, not assumed from desktop values

### Background switching
- Implemented via `<picture>`/`background-image` media queries — swap, don't scale, the TV background between desktop and mobile

### Touch-friendly controls
- All interactive elements (nav toggle, CTA buttons, BGM control) sized at a minimum ~44×44px touch target
- No hover-dependent functionality — anything triggered by `:hover` on desktop must have a tap-friendly equivalent on mobile

### Preventing text/artwork overlap
- Always test text blocks against the busiest region of each background asset at the actual breakpoint
- Prefer solid or gradient-backed text containers over floating text directly on busy artwork when a background asset's safe area is limited

**The nostalgic emotional experience must remain fully intact on mobile — this is a requirement, not a nice-to-have.**

---

## 14. BGM / Audio

- Two audio assets: desktop BGM and mobile BGM (see Asset spec Section 6 for full placement detail)
- **Autoplay restriction handling:** modern browsers block unmuted autoplay. Do not attempt to force autoplay. Instead:
  - Provide a small, clearly visible **play/mute toggle control** (e.g. a speaker icon in the header or hero corner)
  - Audio begins only after explicit user interaction (the toggle itself counts as that interaction)
  - Persist mute/unmute state only for the current session (simple JS variable or `sessionStorage` — no account/profile system)
- **No full music player.** No playlist, no track list, no progress bar, no volume slider required for V1 — a single play/pause (or mute/unmute) toggle is sufficient
- Desktop vs. mobile track selection follows the same media-query/viewport logic as the background asset swap
- Audio element(s) should be lightweight-format (compressed MP3 or OGG) and loaded without blocking initial render (see Performance, Section 16)

---

## 15. Accessibility

- **Semantic HTML:** proper use of `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, heading hierarchy (`h1` → `h2` → `h3`, no skipped levels)
- **Alt text:** every meaningful image gets descriptive alt text; purely decorative images use `alt=""`
- **Keyboard navigation:** all interactive elements (nav links, CTA, BGM toggle, mobile menu toggle) must be reachable and operable via keyboard (`Tab`, `Enter`/`Space`)
- **Focus states:** visible, clearly styled `:focus-visible` states on every interactive element — never removed without a replacement
- **Contrast:** text-to-background contrast should meet WCAG AA at minimum, especially where text overlays background artwork
- **Reduced motion:** wrap non-essential animation in a `prefers-reduced-motion: no-preference` check; provide instant/near-instant fallback states otherwise

---

## 16. Performance

- No build tooling means performance discipline has to happen manually:
  - Compress and appropriately size all images before adding them (see Asset spec Section 13)
  - Use modern image formats (WebP with a fallback) where practical
  - Lazy-load below-the-fold images (`loading="lazy"`)
  - Keep audio files compressed and reasonably short/loopable rather than long uncompressed tracks
  - Minimize the number of web font weights/styles loaded — 2–3 weights total is plenty
  - Avoid any unnecessary third-party scripts
  - Keep `main.js` small and dependency-free
- Target: fast first paint even on a modest mobile connection, since the hero background is the first meaningful content the user sees

---

## 17. Development Sequence

Recommended build order:

1. Set up folder structure and base CSS reset/variables
2. Inspect all supplied assets (dimensions, focal points, safe areas — see Asset spec Section 11) before writing any layout CSS
3. Build the Header + Hero section first (desktop), including background treatment and typography
4. Build Hero mobile composition using the mobile background asset
5. Build remaining content sections in order (Nostalgia Intro → Collection → Characters → Memories → Closing → Footer), desktop first, then mobile per section
6. Implement navigation (desktop + mobile toggle)
7. Implement BGM toggle and audio switching logic
8. Add scroll-based reveal animations and hover states
9. Pass over the whole site for responsive edge cases (tablet breakpoint, awkward mid-sizes)
10. Accessibility pass (keyboard nav, alt text, contrast, reduced-motion)
11. Performance pass (image compression, lazy loading, font weight audit)
12. Final cross-browser/cross-device check

---

## 18. V1 Completion Criteria

V1 is considered complete when:
- [ ] The hero section reliably produces the intended "nostalgic TV" emotional reaction on both desktop and mobile
- [ ] All defined sections are implemented with real (not placeholder) supplied assets wherever available
- [ ] The site is fully responsive across mobile, tablet, and desktop with independently composed mobile layouts
- [ ] BGM works with a user-controlled toggle and respects browser autoplay restrictions
- [ ] Navigation works via simple anchor links on both desktop and mobile
- [ ] Site passes a basic accessibility check (keyboard nav, alt text, contrast, reduced-motion support)
- [ ] No build step is required — the site runs correctly via VS Code Live Server
- [ ] No framework, bundler, or package manager has been introduced without explicit justification and approval

---

## 19. Future Expansion (V2 / V3 — Not Built Now)

These are acknowledged but intentionally **not designed against** in V1, so the current architecture stays simple:

- Full interactive nostalgic cartoon "portal"/world
- Multiple interactive sub-experiences or "rooms"
- Expanded navigation/routing system
- User accounts, saved preferences, authentication
- Backend/database-driven content (e.g. a growing cartoon library with filtering/search)
- Mini-games or interactive experiences
- Full-featured music player (playlist, multiple tracks, visualizer)
- Possible migration to a lightweight framework **only if** page/interaction complexity grows enough to justify it

V1's folder structure and CSS/JS separation are organized simply enough that none of these require a rewrite to add later — they require **addition**, not demolition.
