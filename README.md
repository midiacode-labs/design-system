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
| `fonts/`                               | Open Sans webfont files (Light 300, Regular 400, Medium 500, Bold 700) — the brand typeface. See “Fonts” below. |
| `index.html`                           | Preview index: every card in `preview/` on one page, with its review status against the Studio codebase. Run `npm run preview` and open http://localhost:8080. |
| `package.json`                         | Only holds the `preview` script (no dependencies). |
| `preview/`                             | Static HTML cards that render in the project's Design System tab. |
| `ui_kits/studio/`                      | The Studio product UI kit — JSX components + interactive index. Covers content library, content detail, settings and create flow. |

### Sources used to build this system

- `uploads/midiacode-design-system-claude-design.md` — written brand & component reference (provided).
- `uploads/midiacode-design-tokens.css` — token export pulled from the production `src/css/app.css` (provided).
- Production stack: Vue 3 + Quasar `^2.6.0` (`@quasar/app-webpack`), TypeScript, `defineComponent` with `setup()`.

> **Reviewed against the codebase.** The first version was generated from the two source documents above. On 2026-11-09 it was compared with the `midiacode-studio` repo (version 4.37.1) and every diverging token, component and rule was rewritten to match what Studio renders. Open `index.html` for a preview of every card with its review status. Three rules are deliberate targets that Studio is still migrating to: Open Sans as the brand font, `no-caps` buttons, and `useCustomNotification` for every toast. The React UI kit in `ui_kits/studio/` reuses the reviewed components, but its content detail, create drawer and team screens are illustrative and have not been compared screen by screen.

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

**Casing:** `Title Case` for page titles and card titles. `Sentence case` for labels, helper text, descriptions, and toasts. Buttons use `Sentence case` with Quasar's `no-caps` prop — e.g. **Create content**, **Save**, **Upgrade**, **Watch**. Do not rely on the `q-btn` uppercase default. Status badges are **Title Case** (`Published`, `Draft`, `Archived`).

**Pronouns:** `you` (the operator). Never `I`. The product talks to the operator, not for them. Workspace state is referred to in third person — “your workspace”, “this content”.

**Tone examples (copy that lives in the product today):**

- Button labels: `Create`, `Create content`, `Upgrade`, `Watch`, `Save`, `Delete`, `Create workspace`.
- Status: `Published`, `Draft`, `Archived`. Filter tabs: `All available`, `Published`, `Draft`, `Archived`.
- Empty / helper: short, declarative. “No content yet.” “Tags help you filter your library.”
- Page titles: the workspace name on the contents page; `Contents` as the section heading; settings menu items `Settings`, `Members`, `Analytics`, `Themes and pages`, `Groups`, `QR Code`.
- Confirmations (toasts): single sentence, past tense for successes. e.g. “Content published.” “Workspace deleted.” “Could not save — try again.”
- Trial notice: a red countdown in the workspace header — “Free trial ends in: 3 days 4 hours and 12 minutes”. Inline notices use `q-banner` inside the page.
- **Languages:** Studio ships in `en-US` and `pt-BR` through `vue-i18n`. Every label needs both strings; never hard-code copy in a template.

**No emoji.** The product does not use emoji in copy, labels or empty states. Status and category are communicated through **colored pills** and **icons**, never glyphs.

**No exclamation marks** in product copy. Marketing material is allowed one, sparingly.

**Numbers and dates:** `Apr 14, 2026`, `12,438 scans`, `2 days ago` (relative for ≤ 7 days, absolute after).

**Vibe:** confident operator tool. Reads like the back office of a payments dashboard or a CMS — calm, dense, never chatty.

---

## Visual foundations

### Color
- **Primary `#1976D2`** (Material blue-8). Used for buttons, links, active icons, primary actions, tab indicator. About 60 % of "color" pixels in any given screen.
- **Primary dark `#0D47A1`** (blue-10). Only on the 60 px primary sidebar background. Never on text, buttons, or accents.
- **CTA yellow `#FFD600`** (yellow-14). Reserved for the header **Create** button and the **Upgrade** button. The yellow is the visual signpost — using it elsewhere weakens it.
- **Feedback**: positive `#21BA45`, warning `#F2C037`, negative `#C10015`, info `#31CCEC` (toasts, banners, destructive buttons).
- **Content status** uses Quasar palette colours, not the feedback colours: Published `green` `#4CAF50`, Draft `red` `#F44336`, Archived `grey-8` `#616161`.
- **Links** are `#0277BD`.
- **Background `#F5F5F5`** (`bg-grey-2`) for pages and content type cards; **`#FFFFFF`** for cards/panels/header.
- Studio has no CSS variables and an empty Quasar `brand` config: colours are applied with Quasar classes and props (`color="primary"`, `bg-grey-2`, `text-grey-7`, `text-grey-8`). The variables in `colors_and_type.css` are a convenience for prototypes.
- Smart Forms and Smart Analytics currently use their own hex neutrals (`#E4E6EB`, `#F7F8FA`, `#5B6270`, `#1E2330`). They are not part of this system yet.
- Text is Material black-on-white: `rgba(0,0,0,0.87)` primary, `0.60` secondary, `0.38` disabled. **Not** pure `#000`.

### Type
- **Open Sans** (TTFs in `fonts/`): Light 300, Regular 400, Medium 500, Bold 700. Base 14 px.
- Weights follow Quasar's default type scale, which is what the Studio renders today: `text-h1`/`h2` 300 · `text-h3`–`h5` 400 · `text-h6` 500 · `subtitle1` 400 · `subtitle2` 500 · `body1`/`body2` 400 · `caption` 400 · `overline` 500. Buttons (`q-btn`) and tabs are 500. `text-weight-bold` / `.open-sans-bold` is 700. The workspace title (`h1.workspace-title`) is 300.
- Workspace name: `h1.workspace-title` at `3rem` (2rem under 768px). Content form title: `text-h4` 34. Back label, empty states and menu titles: `text-h5` 24. Section headings: `text-h6 text-weight-regular` 20. Content card titles: `text-subtitle1` 16. Body `text-body1` 16 and `text-body2` 14. Metadata `text-caption` 12, usually `text-grey-7` or `#808080`. `text-h3` and `text-overline` are almost unused.
- Buttons are **no-caps**: always pass `no-caps` to `q-btn` and write the label in sentence case in the i18n string. Never call `.toUpperCase()` on a label.

### Spacing
- Quasar scale, multiples of 8: `xs 4 / sm 8 / md 16 / lg 24 / xl 48`. Page padding is **24 px**, cards are **16 px** internally. Vertical rhythm between sections is **24 px**, between header and first content **24 px**.

### Backgrounds
- Solid colors only. **No gradients, no textures, no patterns, no full-bleed photography.** A screen is either grey `#F5F5F5` (page) or white (card/header) or navy (sidebar). Card thumbnails use a flat grey placeholder when no image is set.
- Imagery, when it appears, is in **content thumbnails** uploaded by the operator. Native UI never decorates with photography.

### Animation & motion
- One easing: `cubic-bezier(0.4, 0, 0.2, 1)` (Material standard). Speeds 220/300/360 ms.
- **Fades** for entry/exit; **slide-in** for drawers and side-sheets; **subtle 2 px lift** for cards on hover where elevation changes. **No bounces, no springs, no parallax.**
- Toast notifications slide up from the bottom-center and dismiss after 5 s (the `useCustomNotification` default).

### Hover states
- Buttons: filled buttons darken ~8 %; flat/outline buttons get a translucent fill `rgba(0,0,0,0.04)`.
- List rows: tinted hover `rgba(0,0,0,0.04)`.
- Cards: cursor → pointer, optional `shadow-1` lift (most cards stay flat).

### Press / active states
- Buttons depress slightly (Quasar ripple). The ripple is in the button's own color at ~20 % alpha.
- Sidebar: the current workspace avatar turns `blue-10` with a `1px #81b6e4` border (others are `blue-8`). Home and search are `grey-3` with a `blue-8` icon at rest and take the same active state.
- Tabs: the whole tab bar is `text-primary`; the active tab gets the Quasar underline indicator.
- Form inputs: focus outlines the border at 2 px in `--color-primary`.

### Borders
- `rgba(0,0,0,0.12)` for dividers, table rows, outlined inputs at rest.
- `2 px solid var(--color-primary)` for focused inputs and the tab indicator.
- Content cards are `flat bordered`: a `1px rgba(0,0,0,0.12)` border and no shadow.
- No double borders.

### Shadows / elevation
- Content cards and list cards are `flat bordered` — no shadow. Other `q-card`s keep the Quasar default shadow, and dialogs, menus and toasts use Quasar's own elevation. The header is `bordered`, not elevated.
- Shadows are Material's stock 0/1/2/4 — never custom-tinted.

### Transparency & blur
- Used sparingly. Subtle hover/active fills use `rgba(0,0,0,0.04)`. **No backdrop blur** anywhere — flat surfaces only. Modal overlays use plain `rgba(0,0,0,0.4)`.

### Corner radii
- Buttons **3 px** • Cards, inputs, tables **4 px** (Quasar default) • Custom surfaces **8 px** (the most common custom value) • Section cards **10 px** • Content type cards and `.default-border-radius` **15 px** • Workspace avatar **`20% 8% 20% 20%`** • Chips **16 px** • Round icon buttons and user avatars **50 %**.
- There is no single signature radius in Studio today; for new work prefer 4 px for `q-card` and 8 px for custom surfaces.

### Cards
- **Content card** (`ContentGalleyItem`): `q-card flat bordered`, 4 px radius, white. Cover image 150 px high (`contain`), with an analytics count (`bar_chart` + total) in a white tag at the top right. Body: content type icon + title (`text-subtitle1`, two lines max), owner (`text-body2`), `Updated:` and `Version:` captions in `#808080`, and a `more_vert` menu button. Footer: status badge on the left, short link and mini QR code on the right (click copies to clipboard). Grid: 4 per row on `lg`, 3 on `md`, 2 on `sm`.
- **Content type card** (`ContentTypeCard`): `bg-grey-2`, 15 px radius, `q-pa-lg`, primary icon aligned right, name below. No description or button.
- **Empty state** (`WorkspaceNoContents`): centred `qr_code` icon in a `grey-4` circle, `text-h5` message, and the Create button when the workspace has no content.

### Layout rules
- **Sidebar** is a workspace switcher: fixed left, 60 px wide, `blue-10`, with logo, Home, search, one avatar per workspace and “add”. Below 600 px it becomes an overlay opened from a menu button in the header.
- **Header** is white and bordered, 51 px. Left: the yellow **Create** button (`qr_code` icon). Centre: a dense standout search whose `tune` icon opens the filters. Right: notifications and the account menu.
- **Workspace header** sits under it: workspace name, settings button, trial countdown and **Upgrade** button (free and trial plans), and the List / Gallery tabs. The status tabs are centred below.
- **Settings pages** replace the sidebar with a single 300 px white drawer: workspace avatar and name, then a menu with FontAwesome icons; items locked by plan show an `UpgradePlanBadge`. The header shows a back button.
- There is no full-width warning banner.
- Page content gets 24 px horizontal padding (`q-px-lg`) on `bg-grey-2`.

### Imagery direction
When operators upload thumbnails the platform shows them as-is — color, treatment and crop are user-controlled. Native illustration is **absent**: the system uses Material and FontAwesome icons, pill badges, and color. If illustration is ever introduced (empty states, marketing), it should be flat, two-color, Material-aligned.

---

## Iconography

The product loads four icon sets, all glyph-based, all delivered via `@quasar/extras`:

- `material-icons` (filled — default)
- `material-icons-outlined` (outline)
- `material-symbols-outlined` (variable, used for newer screens)
- `fontawesome-v6`

**No custom icon font.** All icons are rendered through Quasar's `<q-icon>` or an `icon` prop (e.g. `name="add"`, `name="sym_o_rocket_launch"` for symbols, `name="fa-solid fa-gear"` for FontAwesome).

Usage in Studio today: filled Material Icons are the default (about three quarters of all icons); **FontAwesome v6 is a first-class set**, used for the settings menu, the status filter tabs and the user avatar; Material Symbols (`sym_o_`) appear on newer screens; Material Icons Outlined is almost unused.

**Sidebar icons** are filled Material (`home`, `search`, `add`) inside the workspace-shaped avatar.

**No emoji**, **no unicode arrow glyphs as buttons**, **no SVG illustration packs**. Pick from the four loaded sets rather than introducing a fifth.

**Substitution flag:** the preview cards in this design system load Material Icons + Material Symbols Outlined directly from Google Fonts' icon CDN (`fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Outlined|Material+Symbols+Outlined`). The cards that show FontAwesome icons load FontAwesome 6 from cdnjs.

---

## Fonts

- **Open Sans** — brand typeface. Files live in `fonts/`:
  - `fonts/OpenSans-Light.ttf`   → weight **300**
  - `fonts/OpenSans-Regular.ttf` → weight **400**
  - `fonts/OpenSans-Medium.ttf`  → weight **500**
  - `fonts/OpenSans-Bold.ttf`    → weight **700**
  - `fonts/OFL.txt` — SIL Open Font License
- Regular and Medium are Open Sans 3.003; Light and Bold are 3.000 (the originally provided files).
- Loaded via inline `@font-face` declarations at the top of `colors_and_type.css`.

### How Open Sans is applied in the Studio codebase

Open Sans is the brand typeface and the target for every new screen and component. In the production repo it is **opt-in**, not global:

- `src/css/app.css` registers two separate families — `open-sans` (Light) and `open-sans-bold` (Bold) — from `src/css/fonts/`.
- Apply them with the utility classes **`.open-sans`** and **`.open-sans-bold`** (also available in `colors_and_type.css`). Put `.open-sans` on the page or component root and `.open-sans-bold` on emphasised text, instead of `text-weight-bold`.
- Do not use Roboto, Inter, Arial or `system-ui` in new components. Roboto still renders on legacy screens only because Quasar bundles it as a default extra (`roboto-font` in `quasar.config.js`); those screens migrate to Open Sans as they are touched.

> **Studio migration note.** The Studio registers only Light (`open-sans`) and Bold (`open-sans-bold`), and Quasar's type scale asks for 400/500, which today render in Roboto. To move a screen to Open Sans with the right weights, the Studio also needs Regular 400 and Medium 500 registered (a single `font-family: 'Open Sans'` with four `@font-face` weights, as in `colors_and_type.css`) and `font-family` set on the root. With only Light/Bold registered, 400/500 would be synthesised by the browser and look wrong.

---

## Code conventions (carry into any prototype intended for the repo)

- Vue 3 + Quasar 2.6 + TypeScript. Components are written as **`defineComponent({ … })` with a `setup()` function** (Composition API) — this is the pattern in the large majority of files. Avoid `<script setup>` and pure Options API (`data` / `methods`), which exist only in a handful of files.
- Props inline: `props: { title: { type: String, required: true, default: '' } }`.
- Imports use `src/` alias (not `@/`). e.g. `import ContentStatusBadge from 'src/components/drive/ContentStatusBadge.vue'`.
- Components are PascalCase, **no prefix**. Real names for the pieces in this system: `Sidebar`, `CreateContentButton`, `UpgradeAccountButton`, `UpgradePlanBadge`, `ContentStatusBadge`, `ContentGalleyItem`, `ContentTypeCard`, `WorkspaceNoContents`, `BackButton`.
- Buttons: prefer the wrappers in `src/components/buttons/` — `CustomButtonFlat`, `CustomButtonOutlined`, `CustomButtonUnelevated` (props `label`, `color`, `noCaps`, `isLoading`, `iconLeft` / `iconRight`). Flat is the most common button style in Studio.
- Components live by domain: `src/components/account/`, `analytics/`, `auth/`, `buttons/`, `common/`, `drive/`, `groups/`, `smart-analytics/`, `studio/`.
- Template attribute order: conditionals / `v-for`, boolean props, static attributes (alphabetical), `v-model`, bound props (alphabetical), event handlers (alphabetical).
- **Notifications always go through `useCustomNotification`** (`src/composables/general/useCustomNotification`) — never call `$q.notify` or `Notify.create` directly.
  - Signature: `useCustomNotification({ message, type })`. Types: `positive | negative | warning | info | ongoing` only (`success` and `alert` are not valid types).
  - The composable sets the icon and colour per type (`check_circle` / `error` / `warning` / `info`; `ongoing` is `grey-8` with no icon) and a 5 s timeout. Override `timeout`, `icon`, `color` or `textColor` only when the case needs it.
  - Do not pass `position` — every toast uses the default bottom placement.
  - Use `logMessage`, `warningMessage` and `errorMessage` to send the technical detail to the console instead of a separate `console.*` call.
  - Existing direct `$q.notify` calls in the repo are legacy: migrate them to the composable when you touch the file, and do not copy them into new code.
