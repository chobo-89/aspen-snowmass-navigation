# Exploration C — Progressive Discovery

The hypothesis is that navigation can help guests choose an experience before leaving the menu. Eleven Experience supplied the interaction reference: selecting a destination reveals adjacent choices while retaining earlier selections. Its visual identity was not adopted.

## Try it

Open http://127.0.0.1:5176/ and use the icon-only navigation control. Choose Four Mountains, then Aspen Mountain. Switch to Summer while the mountain is open, compare another mountain, then open Trail Maps. The selected experience stays behind the utility chooser. Back or Escape unwinds one layer at a time. Closing and reopening starts at categories while retaining the season.

Also try Ski & Ride/Bike, Lodging and Things to Do. Every offered option has an image, short explanation, decision facts and an external CTA. No option is automatically selected when a category opens.

## Decisions

- Desktop (1100px and above): a compact entry opens over the landscape. Options reveal in a second panel; a third becomes an immersive context surface. Previous selections remain visible.
- Tablet/mobile: one panel at a time with Back and independent scrolling. The mobile season switch and original Book Now treatment remain below the persistent utilities.
- Trail Maps and Lift Status offer a chooser; Weather opens the captured report. Cameras and Parking retain external destinations. This utility layer persists at every expanded level.
- Winter/Summer changes categories, options, descriptions, facts, imagery and relevant CTAs. Shared IDs preserve meaningful selections. Buttermilk explicitly distinguishes summer self-powered access from winter skiing.
- Supplied seasonal SVG artwork, source logo, Whitney fonts, sprite icons, booking markup, booking interaction block and baseline styles are retained. There is no visible Menu/Close label.

## Implementation

`src/discovery-data.js` owns seasonal content and the pure transition model. `src/discovery.js` assembles the three levels around captured controls. `src/navigation.js` coordinates motion, keyboard focus, overlays and preserved booking behavior. `src/styles.css` provides C's composition above the original stylesheet.

Buttons expose expanded state and controlled regions. Hidden compact panels are inert. Expanded navigation and auxiliary overlays trap focus. Escape closes overlays before unwinding discovery; Back restores focus to the relevant option. Reduced-motion preferences shorten CSS and JavaScript animations.

## Prototype boundaries

Mountain personalities are proposed editorial copy, marked “Draft mountain profile.” Other new context copy is exploration copy pending content review. Photos are official Aspen Snowmass assets; source pages, URLs and dimensions are in `exploration-evidence/asset-sources.json`. Eight mountain images were upgraded to larger official photographs before final captures.

Weather is the captured snapshot (34°F), not a live API; report tabs and unit controls retain snapshot appearance. Search opens the captured form; a live search service is not connected. Booking retains the original winter catalog even in Summer, preserving established booking internals. External destinations open in a new tab; purchases and destination-page operations are outside the prototype.

Browser checks cover desktop 1512×982 and 1280×800, tablet 767×1024 and mobile 390×844. Narrower phones, physical touch devices, screen-reader output and an OS reduced-motion session were not independently tested. Reduced-motion support was inspected in code.

## Isolation and validation

Local branch `exploration/progressive-discovery` is based on original snapshot `7336516`. No C publication/import occurred. All 56 original, 85 A and 117 B tracked-file hashes match the pre-work manifest; see `exploration-evidence/preservation-check.json`.

Production build and packaging passed. All 15 tests passed (11 discovery contracts and 4 hosting checks). No browser console warnings/errors were observed during exercised C flows. See `design-qa.md` and the evidence boards.
