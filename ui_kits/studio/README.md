# Midiacode Studio — UI Kit

Pixel-level recreation of the Midiacode Studio operator console. Vue 3 + Quasar is the production stack; for this kit we recreate the look in React + JSX so it runs in any browser without a build step.

## Open

Open `index.html` directly — it loads React + Babel from a CDN and the design tokens from `../../colors_and_type.css`.

## Components (in `components.jsx`)

Each mirrors a real Studio component (named in brackets).

- `PrimarySidebar` — 60 px workspace switcher: logo, Home, search, workspace avatars, add [`Sidebar`]
- `AppHeader` — white bordered header: yellow Create, standout search with filters, notifications, account menu [`WorkspaceContentsLayout`]
- `WorkspaceHeader` — workspace name, settings, trial countdown, Upgrade, List / Gallery tabs [`WorkspaceContentsWrapper`]
- `FilterTabs` — All available / Published / Draft / Archived, centred, with FontAwesome icons [`ContentDisplayModeWrapper`]
- `ContentCard` — flat bordered card with cover, analytics count, metadata, status, short link, mini QR [`ContentGalleyItem`]
- `StatusBadge` — green / red / grey-8 pill [`ContentStatusBadge`]
- `UpgradePlanBadge`, `UpgradeButton` [`UpgradePlanBadge`, `UpgradeAccountButton`]
- `ContentTypeCard`, `EmptyState` [`ContentTypeCard`, `WorkspaceNoContents`]
- `Button`, `TextField`, `Toast` — generic recreations of `q-btn` (no-caps), outlined `q-input` and Quasar Notify

## Screens

1. **Workspace contents** (default) — reviewed against Studio.
2. **Content detail**, **Create content drawer**, **Settings** — illustrative only. They were generated before the codebase review and do not match Studio screens (Studio opens a content form page, picks the content type on a full page, and its settings menu has different items).

## Code notes

These JSX components are **prototyping mirrors** of the production Vue components — they look the same but skip real logic. When porting back to Vue, structure each component as `defineComponent({ name, props, setup })` with `<template>` SFC bodies, and use Quasar primitives (`q-btn`, `q-input`, `q-card`, `q-tabs`, `q-icon`, `q-toggle`, `q-chip`). See the root `README.md` → Code conventions.
