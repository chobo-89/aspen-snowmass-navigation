# Aspen Snowmass navigation prototype

Local preview after starting the project: http://127.0.0.1:5173/

Isolated desktop and mobile navigation prototype, based on the production website observed November 12, 2026. The live website is unaffected.

## Included

Original Whitney fonts, logo/icon sprite, navigation markup, responsive CSS, hover styling and destination URLs are saved locally. Book Now works on the homepage and inside the desktop menu, including all nine booking links, external-link indicators, backdrop, outside-click dismissal and Escape/arrow-key behavior. The desktop menu has independent right-column scrolling; mobile has a fixed bottom bar, scrollable list, Four Mountains child screen and Back control. Account/cart links and search submission use the original website.

## Scope and differences

The map is a static source capture with mountain hotspots and labels, as permitted in the brief. Live panning and animated geographic zoom are excluded. This is a navigation prototype, not a full website clone: the homepage uses an original still image in place of video and blank scrolling space below. Destination links open the live website in a new tab so the prototype remains available. Weather is a captured snapshot; search suggestions are not connected.

Original CSS hover effects are retained, including the 30px booking-link translation, red section-title accents and hamburger animation. Opening/closing timing is based on the public production scripts; desktop staggering is reconstructed rather than a frame-for-frame replay. Full-screen booking backdrops are anchored to the viewport instead of the transient transformed container in the capture.

## Iterating

- `src/navigation.html`: captured navigation structure, labels and destinations.
- `src/navigation.js`: interaction behavior.
- `public/assets/source.css`: source styling.
- `src/styles.css`: prototype corrections and future visual overrides.
- `src/hero.html`: homepage context.
- `reference/`: original captures.
- `verification/`: prototype captures and side-by-side comparisons.
- `design-qa.md`: verification record.

Preserve this baseline while making requested changes. Selected rendered states can later be captured into an existing Figma Design file. Screen capture does not automatically transfer interaction logic.

## Running

With Node.js 22 or newer: `npm ci`, then `npm run dev -- --host 127.0.0.1 --port 5173`. The npm lockfile is the canonical dependency lockfile.

`npm run build` creates `dist/client` and the retained hosting adapter. No deployment has been requested or performed.

## GitHub → Figma → Vercel

Use GitHub as the source of truth. In Figma Make or a supported Code Layer, choose **Clone from GitHub**, authorize access to this private repository, and select `main`. Figma can add its own configuration files and run the project without a Vercel deployment. Use a new branch for experiments and merge reviewed changes back to the baseline.

The standard app commands are `npm ci`, `npm run dev -- --host 0.0.0.0`, and `npm run build`. If Figma prompts to configure the preview, use these commands; its setup may adapt configuration for its environment. The static build output is `dist/client`.

Vercel can be connected later to the same repository. No Vercel project or public deployment has been created as part of the GitHub preparation.
