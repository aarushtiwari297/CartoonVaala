# Asset Placement & Integration Specification
## Nostalgic Cartoon Website — V1

> This document defines exactly how existing and future assets should be organized, inspected, and integrated into the website. It is written so another developer or LLM can take the asset folder and place everything correctly without guessing intent. It pairs with `website_structure_and_technical_spec.md`.

---

## 1. Asset Inventory

### Confirmed assets (already provided)
| Asset | Purpose |
|---|---|
| Childhood TV — Desktop background | Primary hero visual on desktop/tablet |
| Childhood TV — Mobile background | Primary hero visual on mobile (separately composed, not a crop) |
| Desktop BGM | Background music track used on desktop/tablet |
| Mobile BGM | Background music track used on mobile |
| Website logo | Header/hero branding mark |

### Anticipated future assets (structure should accommodate, not require)
- Character illustrations
- Cartoon artwork (for the Collection section)
- Decorative objects/stickers
- Icons
- Textures

None of these future categories are required for V1 to ship — the site must work correctly with only the five confirmed assets above, and gracefully accept more later.

---

## 2. Asset Folder Structure

```
/assets/
├── /images/
│   ├── /backgrounds/
│   │   ├── tv-desktop.webp        # + .jpg/.png fallback if needed
│   │   └── tv-mobile.webp
│   ├── /logo/
│   │   ├── logo.svg               # preferred (scalable)
│   │   └── logo.png               # fallback if SVG unavailable
│   ├── /characters/
│   │   └── (character-name).webp
│   ├── /artwork/
│   │   └── (artwork-title).webp
│   ├── /decorations/
│   │   └── (decoration-name).webp
│   └── /icons/
│       └── (icon-name).svg
└── /audio/
    ├── bgm-desktop.mp3
    └── bgm-mobile.mp3
```

Rules:
- Backgrounds, logo, characters, artwork, decorations, and icons each get their own subfolder — never mixed together.
- Prefer `.webp` for photographic/painterly images, `.svg` for the logo and icons where possible (scalability + small file size).
- Audio stays in a separate top-level `/audio/` folder, not mixed with images.

---

## 3. Desktop TV Background

- **Where it belongs:** Hero section background on tablet and desktop breakpoints (≥600px per the technical spec's breakpoint strategy)
- **Where it should be used:** Only in the Hero. Do not reuse the same full background elsewhere (e.g. as a repeating section background) — it should stay a signature, singular moment.
- **background-size:** `cover`
- **background-position:** Determined by the asset's actual focal point (see Section 11 — Asset Inspection) — do not default to `center center` without checking where the TV/subject sits in the frame
- **Overlays:** A subtle gradient or low-opacity dark layer may sit above the background only if needed to keep hero text legible — must preserve the asset's warm tone, not wash it out
- **Safe text areas:** Identify the region(s) of the image that are visually "quiet" (not covered in fine detail) before placing headline text — text should live in a safe area, not floated arbitrarily over the busiest part of the artwork
- **Responsive considerations:** This asset is used only at tablet/desktop widths. At mobile widths it is fully replaced (not scaled down) by the mobile-specific asset below.

---

## 4. Mobile TV Background

**This is a distinct, separately composed asset — never a cropped or scaled-down version of the desktop background.**

- **Where it belongs:** Hero section background at mobile breakpoints (below ~600px)
- **How it's switched in:** Via a CSS media query on the hero's background, e.g. swapping `background-image` inside a `max-width: 599px` query — implemented in `responsive.css`, not via JavaScript
- **background-size / position:** Evaluated independently from the desktop asset — inspect this file's own focal point and safe areas (it was composed specifically for a tall/narrow viewport)
- **Why this matters:** Cropping the desktop asset for mobile would very likely cut off the visual "heart" of the composition (e.g. the TV itself) and break the nostalgic effect the whole hero depends on. The mobile asset exists precisely to prevent that failure mode.

---

## 5. Logo

- **Where it appears:** Header (small, consistent) on every breakpoint; optionally a slightly larger appearance inside the Hero itself if the composition supports it
- **Sizing:** Defined via a fixed max-height in the header (e.g. constrained height, auto width) so it stays crisp and consistent regardless of section
- **Aspect-ratio preservation:** Always set `height: auto` alongside a constrained `width`/`max-width` (or vice versa) — never stretch the logo to fill a fixed box
- **Desktop/mobile behavior:** Same logo asset across breakpoints; only its rendered size changes (typically smaller on mobile header)
- **Accessibility/alt text:** Use a descriptive alt text equal to the site/brand name (e.g. `alt="[Site Name] logo"`) — not `alt="logo.png"` or an empty string, since this logo is meaningful content, not decoration

---

## 6. Desktop and Mobile BGM

- **Where each file belongs:** `/assets/audio/bgm-desktop.mp3` and `/assets/audio/bgm-mobile.mp3`, loaded conditionally based on viewport (mirroring the background-image swap logic)
- **When each should be used:** Desktop track for tablet/desktop breakpoints, mobile track for mobile breakpoints — determined by the same breakpoint boundary used for the background asset swap, so audio and visual identity stay in sync
- **How to switch between them:** A small JS check on load (matching the CSS breakpoint) selects which `<audio>` source to use; do not load both simultaneously
- **Browser autoplay restrictions:** Never attempt forced/unmuted autoplay. Audio must start only after an explicit user tap/click on a visible play/mute control.
- **User-controlled playback:** Provide one simple, clearly visible toggle control (e.g. speaker icon) placed in the header or hero corner — sized as a touch-friendly target (~44×44px minimum) per the technical spec's responsive requirements
- **Volume considerations:** Set a moderate default volume (audio should feel ambient/supportive, not dominate the experience); no volume slider required for V1 — mute/unmute is sufficient

---

## 7. Character Assets

- **Appropriate sections:** Primarily the "Characters" section; may also appear as smaller supporting decoration in the Hero or Closing section if composition allows
- **Layering:** Characters with transparent backgrounds (PNG/WebP with alpha) should sit directly on the section background rather than being boxed in a card, to feel like they're "in the room" rather than catalogued
- **Sizing:** Consistent scale within a section (avoid wildly mismatched character sizes unless intentionally stylized); scale down proportionally, never distort aspect ratio
- **Positioning:** Anchor characters to natural resting points (bottom of section, beside text blocks) rather than floating arbitrarily
- **Desktop/mobile behavior:** On mobile, characters may need to shrink, reposition below text (rather than beside it), or in some cases be simplified to a single featured character per view rather than a full group, to avoid crowding a narrow viewport
- **Avoiding overlap with text:** Always check that a character's silhouette doesn't intersect body text at any breakpoint — adjust positioning or size rather than letting overlap happen

---

## 8. Cartoon Artwork

- **How artwork should be used in cards/sections:** Populates the Cartoon/Memory Collection section's card grid (see technical spec Section 11 — Cards/Components)
- **Aspect ratio:** Pick one consistent aspect ratio for all collection cards (e.g. 4:3 or 1:1) so the grid feels intentional, not haphazard
- **Cropping rules:** If source artwork doesn't match the chosen card aspect ratio, crop toward the artwork's focal point (inspect first — see Section 11) rather than a default center-crop that might cut off a character's face or key detail
- **Consistent presentation:** Same corner radius, same shadow treatment, same hover behavior across every card
- **Lazy loading:** All artwork cards below the first viewport should use `loading="lazy"` to keep initial page load light

---

## 9. Decorative Assets

- **Purpose:** Reinforce atmosphere (e.g. small stickers, doodles, soft textures) without becoming the focal point of any section
- **Usage rule:** Decorations should always be secondary to primary content (headline, character, artwork) — smaller in scale, lower in visual weight, often placed at section edges or corners
- **Restraint:** A section should generally use very few decorative elements (one to three) — the goal is warmth and polish, not visual clutter. When in doubt, remove a decoration rather than add one.

---

## 10. Asset Naming

Use clear, lowercase, hyphenated, descriptive names — no spaces, no ambiguous abbreviations:

```
tv-desktop.webp
tv-mobile.webp
logo.svg
character-[name].webp          e.g. character-max.webp
artwork-[short-title].webp     e.g. artwork-saturday-morning.webp
decoration-[description].webp  e.g. decoration-sticker-star.webp
icon-[name].svg                e.g. icon-speaker-on.svg
bgm-desktop.mp3
bgm-mobile.mp3
```

Avoid generic names like `image1.png`, `final-final2.png`, or `IMG_2031.jpg` — every asset filename should be self-explanatory in the folder structure.

---

## 11. Asset Inspection (Do This Before Designing Around Any Asset)

For every image asset, check before writing layout/CSS:

- **Dimensions:** exact pixel width/height
- **Aspect ratio:** does it match an intended card/section ratio, or will it need cropping?
- **Transparency:** does it have an alpha channel (PNG/WebP) suitable for layering, or is it a flat/opaque image meant as a full background?
- **Focal point:** where is the visual "subject" (the TV, a character's face, key detail)? This determines `background-position`/`object-position` and safe text areas.
- **Intended viewport:** was this asset composed for wide/desktop framing or tall/mobile framing? (Critical for the two TV background assets — never assume.)
- **Visual safe areas:** which regions are calm enough to place text over, and which are too busy?

Skipping this step is the most common cause of hero sections that "almost work" but subtly fight their own background art.

---

## 12. Responsive Asset Strategy

Classify every asset into one of three categories before implementation:

| Category | Definition | Examples |
|---|---|---|
| **Fixed** | Same asset, same treatment at every breakpoint | Logo, icons |
| **Responsive** | Same single asset, but sizing/position/crop changes by breakpoint | Character illustrations, artwork cards, decorations |
| **Alternate (desktop/mobile pair)** | Genuinely different assets swapped by breakpoint | TV background, BGM track |

This distinction should be documented per-asset as new files are added, so future contributors know immediately whether a new mobile-specific asset is expected or whether the existing file should simply be repositioned.

---

## 13. Asset Performance

- **Image optimization:** Compress every image before adding it to the project (target reasonable file sizes for web — large hero backgrounds should still be optimized aggressively since they load first)
- **Lazy loading:** Apply `loading="lazy"` to every image below the first viewport (artwork cards, character sections further down the page, decorations)
- **Avoiding unnecessary duplicates:** Don't keep multiple resolution/format copies of the same asset unless they're genuinely serving different breakpoints or use cases (e.g. don't keep both a `.png` and `.webp` unless the `.png` is a real fallback need)
- **Appropriate dimensions:** Export images at the actual maximum size they'll be displayed at (roughly 1.5–2x for retina, not arbitrarily huge originals) — don't ship a 4000px-wide source image for a 600px-wide card

---

## 14. Asset Placement Workflow

Step-by-step process for integrating a new batch of assets (existing or future):

1. Drop raw assets into a temporary/inbox location
2. Run through the **Asset Inspection checklist** (Section 11) for each file
3. Optimize/compress each file appropriately (Section 13)
4. Rename according to the naming convention (Section 10)
5. Move into the correct subfolder per the folder structure (Section 2)
6. Classify each asset as Fixed / Responsive / Alternate (Section 12)
7. Reference the asset in the appropriate HTML/CSS location per its designated section (Sections 3–9)
8. Verify placement at all three breakpoints (mobile, tablet, desktop)
9. Confirm no text/character/artwork overlap issues at any breakpoint
10. Run the final validation checklist (Section 15) before considering the asset "integrated"

---

## 15. Asset Validation Checklist

Before considering any asset fully integrated, confirm:

- [ ] Asset is placed in the correct subfolder
- [ ] Asset follows the naming convention
- [ ] Asset has been inspected (dimensions, aspect ratio, transparency, focal point, intended viewport, safe areas)
- [ ] Asset is optimized/compressed appropriately for web
- [ ] Correct `background-size`/`object-fit` and `background-position`/`object-position` values are applied based on the actual focal point
- [ ] Desktop and mobile versions (where applicable) are both verified independently — mobile is not just a scaled-down desktop view
- [ ] No text overlaps busy artwork at any breakpoint
- [ ] Alt text is present and meaningful (or explicitly empty for purely decorative images)
- [ ] Lazy loading is applied where appropriate (below-the-fold assets)
- [ ] Audio (if applicable) respects autoplay restrictions and is user-controlled
- [ ] Asset renders correctly across mobile, tablet, and desktop breakpoints

---

## Summary

Every placement decision in this document flows from one rule: **study the asset before designing around it.** The existing Childhood TV backgrounds, logo, and BGM tracks are not placeholders to be replaced — they are the site's visual and emotional identity, and this specification exists to make sure they're placed with the care that identity deserves.
