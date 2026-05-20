---
name: midiacode-studio-design
description: Use this skill to generate well-branded interfaces and assets for Midiacode Studio (a Vue 3 + Quasar QR content management platform), either for production code or throwaway prototypes/mocks/decks. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `README.md` file within this skill first, then explore the other available files:

- `colors_and_type.css` — all design tokens (colors, type scale, spacing, radius, shadows, transitions, layout). Drop this into any prototype as the first stylesheet.
- `assets/` — logos, brand marks, placeholder thumbnails.
- `preview/` — example cards demonstrating every foundational pattern (colors, type, buttons, inputs, badges, cards, sidebar, header, banner).
- `ui_kits/studio/` — high-fidelity recreations of the Studio app: Vue-flavoured JSX components + interactive `index.html`. Lift components from here for new mocks.

If creating visual artifacts (slides, mocks, throwaway prototypes), copy assets out of this skill folder and create static HTML files for the user to view; load `colors_and_type.css` and the Material Icons CDN listed in the README.

If working on production code, follow the code conventions in the README (Vue 3 + Quasar 2.6, Options API, `defineComponent`, `src/` alias, PascalCase no prefix), use Quasar components (`q-btn`, `q-input`, `q-card`, `q-tabs`, `q-icon`, `q-toggle`), and route toasts through `useCustomNotification`.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask a few questions about scope and audience, then act as an expert designer — output HTML artifacts *or* production Vue code, depending on the need. Default to Material Design idioms; never invent new colors outside the token palette; reserve yellow `#FFD600` for the single primary CTA on a surface.
