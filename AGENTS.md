# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Prototype brief

Preserve Aspen Snowmass main navigation on desktop and mobile: original fonts and assets, hover effects, Book Now links and backdrop, independently scrolling desktop links, mobile bottom navigation, mobile Four Mountains screen and Back control. A static map is explicitly acceptable. Use captured source states as the baseline; do not redesign or add destination pages during iteration. Keep work local until publication is requested. Figma transfer is a later option.


## Repository and Figma workflow

The user selected this order: save to a private GitHub repository, try the repository in Figma, then connect Vercel later. Do not deploy or connect Vercel before a later instruction. Use npm and package-lock.json for portable installs. Preserve the verified baseline and use branches for design experiments.

## Exploration B overrides

The user explicitly requested one independent immersive navigation concept, starting from the original baseline. Follow EXPLORATION-B-BRIEF.md and EXPLORATION-B.md. B may change the overall layout and hero composition while preserving Aspen brand assets, original booking internals, source typography/icons and animation language. Do not use Exploration A as the implementation base. Do not edit the original or A, start C, push to GitHub, deploy, or import to Figma without a later request. This checkout is the real worktree on exploration/immersive-navigation attached to work/aspen-exploration-baseline.git.

## B review feedback — 2026-11-16

Remove all visible Menu/Close text from the hamburger control, including tablet. At desktop widths (1280px+), show the four category labels and remove the hamburger and repeated category rail. Each label toggles its mega menu directly below the header; switching labels switches contents. Keep icon-only menu and drawers for tablet/mobile. Put the segmented Winter/Summer control before account/cart/search on desktop, using the user's rectangular outlined reference. Use the exact supplied 14×14 snowflake and sun paths in src/assets/season-*.svg; currentColor allows selected-state inversion. Keep booking and the original/A implementations unchanged.
