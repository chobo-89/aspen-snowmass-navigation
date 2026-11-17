# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Prototype brief

Preserve Aspen Snowmass main navigation on desktop and mobile: original fonts and assets, hover effects, Book Now links and backdrop, independently scrolling desktop links, mobile bottom navigation, mobile Four Mountains screen and Back control. A static map is explicitly acceptable. Use captured source states as the baseline; do not redesign or add destination pages during iteration. Keep work local until publication is requested. Figma transfer is a later option.


## Repository and Figma workflow

The user selected this order: save to a private GitHub repository, try the repository in Figma, then connect Vercel later. Do not deploy or connect Vercel before a later instruction. Use npm and package-lock.json for portable installs. Preserve the verified baseline and use branches for design experiments.

## Exploration C — Progressive Discovery

This is a separate worktree on exploration/progressive-discovery, based on the verified original snapshot 7336516. The user's current brief overrides the earlier clone-only restriction for this checkout. Build one cascading navigation architecture: category → option → useful context, without auto-selecting an option. Keep Trail Maps, Weather, Mountain Cameras, Lift Status and Parking persistently accessible at every expanded level. Season changes must update options, profiles, imagery and relevant destinations, preserving a selected mountain. Reuse the supplied seasonal SVG paths and source booking internals/brand assets. Keep visible Menu/Close labels off the source menu icon. Do not edit original/A/B or publish/import this exploration without a later request. The full brief is in EXPLORATION-C-BRIEF.md.
