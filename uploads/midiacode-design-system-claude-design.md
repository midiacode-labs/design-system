# Midiacode Studio Design System

Midiacode Studio is a QR code content management platform built with Vue 3 + Quasar Framework ^2.6.0 (@quasar/app-webpack). It allows companies to create, manage, and track dynamic QR code content — including campaigns, menus, product pages, and AR experiences.

## Stack
- Vue 3 + Quasar ^2.6.0 + @quasar/app-webpack
- TypeScript with Options API (defineComponent — no <script setup>)
- Material Design base with custom brand tokens
- Icon sets: material-icons, material-icons-outlined, material-symbols-outlined, fontawesome-v6

---

## Brand Colors

| Token | Hex | Usage |
|---|---|---|
| Primary | #1976D2 | Buttons, links, active icons, primary actions |
| Primary Dark | #0D47A1 | Main sidebar background |
| CTA / Upgrade | #FFD600 | Upgrade button, Create button, call-to-action |
| Positive | #21BA45 | Success states, published status |
| Negative | #C10015 | Errors, delete actions |
| Warning | #F2C037 | Warning banners, draft status |
| Info | #31CCEC | Informational states |
| Dark | #1D1D1D | Base text, dark backgrounds |
| Surface | #FFFFFF | Cards, inputs, panels |
| Background | #F5F5F5 | Page background (grey-2) |
| Text Primary | rgba(0,0,0,0.87) | Body text |
| Text Secondary | rgba(0,0,0,0.6) | Labels, captions, metadata |
| Divider | rgba(0,0,0,0.12) | Borders, separators |

---

## Typography

Font family: **Roboto**, -apple-system, "Helvetica Neue", Arial, sans-serif
Base font size: 14px

| Scale | Size | Weight | Usage |
|---|---|---|---|
| text-h3 | 48px | 400 | Page titles |
| text-h5 | 24px | 400 | Section headings, back nav titles |
| text-h6 | 20px | 500 | Card titles |
| text-subtitle2 | 14px | 500 | Labels, tab names |
| text-body1 | 16px | 400 | Main body text |
| text-body2 | 14px | 400 | Supporting text, table rows |
| text-caption | 12px | 400 | Helpers, metadata, input hints |
| text-overline | 12px | 500 | Uppercase category labels |

---

## Spacing

Uses Quasar spacing scale with cssAddon: true.

| Token | Value | Class |
|---|---|---|
| xs | 4px | q-pa-xs, q-ma-xs |
| sm | 8px | q-pa-sm, q-ma-sm |
| md | 16px | q-pa-md, q-ma-md |
| lg | 24px | q-pa-lg, q-ma-lg |
| xl | 48px | q-pa-xl, q-ma-xl |

---

## Border Radius

| Context | Value |
|---|---|
| Buttons (q-btn) | 3px |
| Inputs, Tables | 4px |
| Cards | 10px |
| Chips | 16px |
| Pill buttons | 28px |
| Icon buttons (round) | 50% |
| Workspace avatar | 8px |

---

## Elevation / Shadows

Material Design shadow system. Most cards use **no shadow** with rgba(239,239,239,0.314) background.
Tables and elevated cards use shadow-2.

---

## Components

### Buttons
- **Primary**: color="primary", unelevated — CREATE CONTENT, SAVE
- **CTA/Upgrade**: color="yellow-14" text-color="dark" — UPGRADE, CREATE (header)
- **Secondary**: flat + outline, color="primary" — CREATE WORKSPACE, WATCH
- **Danger**: color="negative" — DELETE
- **Icon round**: flat round, size 40x40px, color grey-6

### Inputs
- **Outlined**: standard form inputs with floating label animation
- **Standout**: search bar, background rgba(0,0,0,0.05), no border
- **Toggle**: q-toggle, color="primary"

### Cards
- **Content card**: border-radius 10px, no shadow, thumbnail + title + author + status badge
- **Feature card**: background rgba(239,239,239,0.314), border-radius 10px, icon + title + description + WATCH button

### Navigation
- **Primary sidebar**: width 60px, background #0D47A1, icon-only collapsed, active item has white bg + primary icon
- **Header**: height 51px, white bg, contains CTA button + search + filter icon + notifications + user avatar
- **Filter tabs**: q-tabs, active-color="primary", indicator-color="primary", align="left"

### Status Badges
- Published → color="positive"
- Draft → color="warning" text-color="dark"
- Archived → color="dark"

### Notifications
Uses internal composable: `useCustomNotification({ message, type })`
Types: positive | negative | warning | info | ongoing

---

## Layout Structure

```
[Primary Sidebar — 60px fixed, bg #0D47A1]
  [Warning Banner — full width, bg #F2C037, dismissible]
  [Header — 51px sticky, bg #ffffff]
  [Page Content — padding 24px, bg #F5F5F5]
    [Page Title + Subtitle]
    [Filter Tabs]
    [Content Grid / Table]
```

---

## Code Conventions

- All components use `defineComponent` + Options API
- Props defined inline: `{ type: String, required: false, default: '' }`
- No `<script setup>`, no separate TypeScript interfaces for simple props
- Import alias: `src/` (not `@/`) — e.g. `import X from 'src/components/X.vue'`
- Component naming: PascalCase without prefix — ContentCard, StatusBadge, PrimarySidebar
- Components organized by domain: `src/components/buttons/`, `src/components/studio/`, etc.
