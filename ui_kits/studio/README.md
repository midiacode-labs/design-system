# Midiacode Studio — UI Kit

Pixel-level recreation of the Midiacode Studio operator console. Vue 3 + Quasar is the production stack; for this kit we recreate the look in React + JSX so it runs in any browser without a build step.

## Open

Open `index.html` directly — it loads React + Babel from a CDN and the design tokens from `../../colors_and_type.css`.

## Components (in `components.jsx`)

- `PrimarySidebar` — 60 px navy sidebar with icon nav and active state
- `AppHeader` — sticky 51 px top bar with yellow Create CTA, standout search, upgrade pill, avatar
- `WarningBanner` — full-width yellow trial banner, dismissible
- `FilterTabs` — All / Published / Drafts / Archived with counts
- `ContentCard` — thumbnail + title + meta + status badge
- `StatusBadge` — pill, three variants
- `Button` — primary, CTA, flat, outline, danger
- `Input` — outlined, focused, error
- `Toast` — pos / neg / warn / info / ongoing
- `Drawer` — Create-content modal slide-in
- `SettingsSidebar` — secondary 300 px white sidebar for /settings

## Screens (selectable from the top nav)

1. **Content Library** (default) — the masonry-style grid of content cards.
2. **Content Detail** — click any card to open: thumbnail + meta + scan stats panel.
3. **Create Content** — yellow CTA opens a side-sheet drawer with type-picker → form.
4. **Settings · Team & Permissions** — demonstrates the secondary sidebar layout.

All screens are click-through; nothing persists. The point is high-fidelity component coverage.

## Code notes

These JSX components are **prototyping mirrors** of the production Vue components — they look the same but skip real logic. When porting back to Vue, structure each component as `defineComponent({ name, props, data, methods, computed })` with `<template>` SFC bodies, and use Quasar primitives (`q-btn`, `q-input`, `q-card`, `q-tabs`, `q-icon`, `q-toggle`, `q-chip`). See the root `README.md` → Code conventions.
