# Midiacode Studio Design System

A design system for **Midiacode Studio**, a CMS platform for dynamic QR code content management. Companies use Midiacode Studio to create, publish, and track QR-linked content — campaigns, menus, product pages, videos and AR experiences. Clients scan QR codes; the platform serves the right content based on conditions, audience and real-time rules.

This pack contains everything a designer or engineer needs to build new screens, slides or marketing assets that look and feel native to the product.

---

## Index

| File / Folder                          | What it is |
|----------------------------------------|------------|
| `README.md`                            | This document. Brand context, content fundamentals, visual foundations, iconography. |
| `SKILL.md`                             | Agent SKill manifest — makes this folder usable as a Claude / Claude Code Skill. |
| `colors_and_type.css`                  | All design tokens as CSS variables — colors, type scale, spacing, radius, shadow, transitions, layout. |
| `assets/`                              | Logos, brand marks, icons, illustration placeholders. |
| `fonts/`                               | Webfont files (currently empty — Roboto loaded from Google Fonts; see “Fonts” note below). |
| `preview/`                             | Static HTML cards that render in the project's Design System tab. |
| `ui_kits/studio/`                      | The Studio product UI kit — JSX components + interactive index. Covers content library, content detail, settings and create flow. |

### Sources used to build this system

- `uploads/midiacode-design-system-claude-design.md` — written brand & component reference (provided).
- `uploads/midiacode-design-tokens.css` — token export pulled from the production `src/css/app.css` (provided).
- Production stack: Vue 3 + Quasar `^2.6.0` (`@quasar/app-webpack`), TypeScript, Options API.

> **No live codebase or Figma file was attached.** The system was built entirely from the two source documents above. If you have the repo or Figma, drop them in and ask for a refresh — components will sharpen up immediately.

---

## Product context

Midiacode Studio is the **operator console** for a QR content platform. Operators inside a workspace create and manage *content* — each piece backed by a QR code that, when scanned, resolves to whatever the operator decides (a video, a menu, a product page, an AR scene). The platform layers conditional logic on top: time of day, audience segment, geo, A/B variants.

The Studio app is the place where:

- **Content gets created** — campaign, menu, product page, video, AR experience.
- **Content gets organised** — workspaces group content for a brand or team. Tags, filters and statuses (Published / Draft / Archived) keep large libraries navigable.
- **Performance is tracked** — scan volume, audience and conversion analytics.
- **Settings live** — workspace management, team, billing, integrations.

The visual language is straight **Material Design** with custom brand tokens: blue + navy + a single high-energy yellow CTA. It is utilitarian, dense and predictable — the goal is "the operator finds their content fast and ships an edit without thinking about the UI."

---

## Content fundamentals

**Voice:** practical, terse, slightly formal. Verbs lead actions. No marketing fluff inside the product.

**Casing:** `Title Case` for page titles and card titles. `Sentence case` for labels, helper text, descriptions, and toasts. Buttons use `UPPERCASE` (Quasar `q-btn` default — labels render in caps, e.g. **CREATE CONTENT**, **SAVE**, **UPGRADE**, **WATCH**). Status badges are **Title Case** (`Published`, `Draft`, `Archived`).

**Pronouns:** `you` (the operator). Never `I`. The product talks to the operator, not for them. Workspace state is referred to in third person — “your workspace”, “this content”.

**Tone examples (copy that lives in the product today):**

- Button labels: `CREATE`, `CREATE CONTENT`, `UPGRADE`, `WATCH`, `SAVE`, `DELETE`, `CREATE WORKSPACE`.
- Status: `Published`, `Draft`, `Archived`.
- Empty / helper: short, declarative. “No content yet.” “Tags help you filter your library.”
- Page titles: `Content Library`, `Workspaces`, `Settings`, `Team & Permissions`.
- Confirmations (toasts): single sentence, past tense for successes. e.g. “Content published.” “Workspace deleted.” “Could not save — try again.”
- Warnings (full-width yellow banner): direct + actionable. e.g. “Your trial ends in 3 days. Upgrade to keep publishing.”

**No emoji.** The product does not use emoji in copy, labels or empty states. Status and category are communicated through **colored pills** and **Material icons**, never glyphs.

**No exclamation marks** in product copy. Marketing material is allowed one, sparingly.

**Numbers and dates:** `Apr 14, 2026`, `12,438 scans`, `2 days ago` (relative for ≤ 7 days, absolute after).

**Vibe:** confident operator tool. Reads like the back office of a payments dashboard or a CMS — calm, dense, never chatty.

---

## Visual foundations

### Color
- **Primary `#1976D2`** (Material blue-8). Used for buttons, links, active icons, primary actions, tab indicator. About 60 % of "color" pixels in any given screen.
- **Primary dark `#0D47A1`** (blue-10). Only on the 60 px primary sidebar background. Never on text, buttons, or accents.
- **CTA yellow `#FFD600`** (yellow-14). Reserved exclusively for the header **Create** button, the **Upgrade** button, and the dismissible warning banner (`#F2C037` is the slightly desaturated banner version). The yellow is the visual signpost — using it elsewhere weakens it.
- **Status**: positive `#21BA45`, warning `#F2C037`, negative `#C10015`, info `#31CCEC`.
- **Background `#F5F5F5`** for pages; **`#FFFFFF`** for cards/panels/header; **`rgba(239,239,239,0.314)`** for "subtle" feature cards.
- Text is Material black-on-white: `rgba(0,0,0,0.87)` primary, `0.60` secondary, `0.38` disabled. **Not** pure `#000`.

### Type
- **Open Sans** (brand-provided TTFs in `fonts/`). Two weights only: **Light 300** and **Bold 700**. Base 14 px.
- The whole scale uses Light for everything *except* card titles (`text-h6`), denser labels (`text-subtitle2`) and uppercase categories (`text-overline`), which use Bold. Avoid weights 400/500 in markup — they fall back to Light through the browser's nearest-match logic and produce inconsistent rendering.
- Page titles `text-h3` 48/300. Section heads `text-h5` 24/300. Card titles `text-h6` 20/700. Body `text-body2` 14/300. Captions/metadata `text-caption` 12/300 in `rgba(0,0,0,0.60)`. Categories `text-overline` 12/700 uppercase with 8 % letter-spacing.
- Buttons render uppercase via Quasar's `q-btn` — don't double-uppercase strings in source.

### Spacing
- Quasar scale, multiples of 8: `xs 4 / sm 8 / md 16 / lg 24 / xl 48`. Page padding is **24 px**, cards are **16 px** internally. Vertical rhythm between sections is **24 px**, between header and first content **24 px**.

### Backgrounds
- Solid colors only. **No gradients, no textures, no patterns, no full-bleed photography.** A screen is either grey `#F5F5F5` (page) or white (card/header) or navy (sidebar) or yellow (warning banner). Card thumbnails use a flat grey placeholder when no image is set.
- Imagery, when it appears, is in **content thumbnails** uploaded by the operator. Native UI never decorates with photography.

### Animation & motion
- One easing: `cubic-bezier(0.4, 0, 0.2, 1)` (Material standard). Speeds 220/300/360 ms.
- **Fades** for entry/exit; **slide-in** for drawers and side-sheets; **subtle 2 px lift** for cards on hover where elevation changes. **No bounces, no springs, no parallax.**
- Toast notifications slide up from the bottom-center, dismiss on click or after ~4 s.

### Hover states
- Buttons: filled buttons darken ~8 %; flat/outline buttons get a translucent fill `rgba(0,0,0,0.04)`.
- List rows: tinted hover `rgba(0,0,0,0.04)`.
- Icons in the sidebar: opacity 0.7 → 1.0 on hover.
- Cards: cursor → pointer, optional `shadow-1` lift (most cards stay flat).

### Press / active states
- Buttons depress slightly (Quasar ripple). The ripple is in the button's own color at ~20 % alpha.
- Primary sidebar active item: **white background, primary-color icon** — inverts from "white icon on navy" → "blue icon on white".
- Tabs: active tab text turns `--color-primary` with a 3 px primary underline indicator.
- Form inputs: focus outlines the border at 2 px in `--color-primary`.

### Borders
- `rgba(0,0,0,0.12)` for dividers, table rows, outlined inputs at rest.
- `2 px solid var(--color-primary)` for focused inputs and the tab indicator.
- No double borders.

### Shadows / elevation
- **Most cards have no shadow.** The flat aesthetic is intentional. Elevation appears on: dropdown menus (`shadow-2`), the sticky header on scroll (`shadow-1`), modals/dialogs (`shadow-4`), toasts (`shadow-2`).
- Shadows are Material's stock 0/1/2/4 — never custom-tinted.

### Transparency & blur
- Used sparingly. Subtle hover/active fills use `rgba(0,0,0,0.04)`. Card-subtle background uses `rgba(239,239,239,0.314)`. **No backdrop blur** anywhere — flat surfaces only. Modal overlays use plain `rgba(0,0,0,0.4)`.

### Corner radii
- Buttons **3 px** • Inputs / tables **4 px** • Workspace avatar **8 px** • **Cards 10 px** (this is the signature radius) • Chips **16 px** • Pill buttons **28 px** • Round icon buttons **50 %**.

### Cards
- White surface, **10 px radius**, **no shadow**, internal padding 16 px. Thumbnail is full-bleed at the top, followed by a content block with title (`text-h6`), a single-line metadata row (author • date), and a status badge anchored top-right of the thumbnail. Hover gives a pointer cursor; no lift.
- "Feature cards" used inside dashboards and empty states use the same 10 px radius with the `rgba(239,239,239,0.314)` subtle background.

### Layout rules
- **Primary sidebar** is fixed left, 60 px wide, navy `#0D47A1`, icon-only. Never collapses below this width.
- **Header** is sticky top, 51 px, white. Contains the yellow **CREATE** CTA on the left of the search bar, a standout search input mid, then filter / notifications / avatar on the right.
- **Settings pages** add a **secondary sidebar** on the left (300 px, white) — the primary sidebar still sits left of it.
- **Warning banner** is full-width yellow, sits above the header, dismissible via "×".
- Page content gets 24 px padding on all sides.

### Imagery direction
When operators upload thumbnails the platform shows them as-is — color, treatment and crop are user-controlled. Native illustration is **absent**: the system uses Material icons (line + filled), pill badges, and color. If illustration is ever introduced (empty states, marketing), it should be flat, two-color, Material-aligned.

---

## Iconography

The product loads four icon sets, all glyph-based, all delivered via `@quasar/extras`:

- `material-icons` (filled — default)
- `material-icons-outlined` (outline)
- `material-symbols-outlined` (variable, used for newer screens)
- `fontawesome-v6`

**No custom icon font.** All icons are rendered through Quasar's `<q-icon>` with the `name` prop (e.g. `name="add"`, `name="o_search"` for outlined, `name="sym_o_qr_code_2"` for symbols). Stroke weight matches Material default (24 dp grid, 2 dp stroke for outlined).

**Sidebar icons** are filled Material at 24 px in white; active item flips to filled in `--color-primary` on a white square.

**No emoji**, **no unicode arrow glyphs as buttons**, **no SVG illustration packs**. If an icon is missing from the Material library, the team adds a FontAwesome v6 fallback rather than introducing a fifth set.

**Substitution flag:** the preview cards in this design system load Material Icons + Material Symbols Outlined directly from Google Fonts' icon CDN (`fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Outlined|Material+Symbols+Outlined`). This matches the production glyph set exactly. FontAwesome v6 is loaded only where a Material equivalent does not exist.

---

## Fonts

- **Open Sans** — brand typeface. Files live in `fonts/`:
  - `fonts/OpenSans-Light.ttf`  → weight **300**
  - `fonts/OpenSans-Bold.ttf`   → weight **700**
- Loaded via inline `@font-face` declarations at the top of `colors_and_type.css`.

> **FLAG — limited weight coverage.** Only Light (300) and Bold (700) were provided. The type scale has been restructured to use only those two weights so the browser never has to synthesise faux 400/500 faces (which produces inconsistent weight on different platforms). If you have additional weights (Regular 400, SemiBold 600, etc), drop them into `fonts/` and add matching `@font-face` blocks — the cascade will pick them up automatically without other token changes.

---

## Code conventions (carry into any prototype intended for the repo)

- Vue 3 + Quasar 2.6, **Options API only** (`defineComponent({ … })`). No `<script setup>`.
- Props inline: `props: { title: { type: String, required: true, default: '' } }`.
- Imports use `src/` alias (not `@/`). e.g. `import StatusBadge from 'src/components/studio/StatusBadge.vue'`.
- Components are PascalCase, **no prefix** (`ContentCard`, `PrimarySidebar`, `StatusBadge`).
- Components live by domain: `src/components/buttons/`, `src/components/studio/`, `src/components/settings/`, …
- Toasts go through `useCustomNotification({ message, type })` — never call `$q.notify` directly. Types: `positive | negative | warning | info | ongoing`.
