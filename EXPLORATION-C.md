# Exploration C — Progressive Discovery

The hypothesis is that navigation can help guests choose an experience before leaving the menu. Eleven Experience supplied the interaction reference: selecting a destination reveals adjacent choices while retaining earlier selections. Its visual identity was not adopted.

## Try it

Open http://127.0.0.1:5176/ and use the icon-only navigation control. Choose Four Mountains, then Aspen Mountain. Switch to Summer while the mountain is open, compare another mountain, then open Trail Maps. The selected experience stays behind the utility chooser. Back or Escape unwinds one layer at a time. Closing and reopening starts at categories while retaining the season.

Also try Ski & Ride/Bike, Lodging and Things to Do. Every offered option has an image, short explanation, decision facts and an external CTA. No option is automatically selected when a category opens.

## Decisions

- Desktop (1280px and above): a compact entry opens over the landscape. Options reveal in a second panel; a third becomes an immersive context surface. Previous selections remain visible.
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

Local branch `exploration/progressive-discovery` is based on original snapshot `7336516`. The initial C snapshot was saved to GitHub on its own branch. The refinements are saved to the same C branch. No deployment/import occurred. All 56 original, 85 A and 117 B tracked-file hashes match the pre-work manifest; see `exploration-evidence/preservation-check.json`.

Production build and packaging passed. All 16 tests passed (12 discovery contracts and 4 hosting checks). No browser console warnings/errors were observed during exercised C flows. See `design-qa.md` and the evidence boards.


## Refinement — stable cascade

Desktop primary navigation is always 360px wide, with 30px item text, a 42px heading, 40px/34px padding and unchanged item gaps. The options column is 320px wide at both category and context depths. Neither column compresses or reduces typography when another level opens. Below 1280px the existing sequential compact model avoids squeezing the context into a narrow desktop remainder.

The utility row is now a grid child of the cascade, under the primary column initially (360px), then under both navigation columns (680px). At the context level it stops at the navigation boundary; the photographic context spans both rows beside it. All five tools persist across categories. Initial compact-width utilities wrap onto two rows, retaining readable labels. Tablet/mobile keep the tools beneath the active sequential panel.

Progression remains click-based; CSS hover feedback never dispatches a navigation event. Clicking an already-selected category or option now preserves the locked context. Back is the explicit way to unwind. “Back to Explore” replaces the inherited back-navigation wording. Mountain personality, copy, facts, photography and CTA remain unchanged.

Measurements, captures and comparison boards are in `exploration-evidence/refinement/`. The geometry check confirms identical primary bounds, padding, typography and spacing at all three desktop depths, with options fixed at 320px. Browser checks also exercised pointer travel from the options area into context without replacing the selected mountain.


## Latest refinement — utilities anchored to the primary column

This supersedes the expanding utility row described above. On desktop, “On the Mountain” is a two-column, muted 14px utility group inside the 360px primary column, above About Us / Contact Us. Its content width stays approximately 291px at every cascade depth. Options and context extend horizontally independently; both now use the full content height. No additional icons were necessary for these clear, familiar labels.

The primary footer remains visible on shorter desktop screens while the category area scrolls independently. In sequential tablet/mobile layouts, the same two-column group lives beneath the active panel so it remains accessible when the primary panel is hidden. Mobile primary categories and secondary links share the scrolling panel; all four categories remain visible at the tested 390×844 viewport.

Evidence is in `exploration-evidence/primary-utilities/`: equal primary crops, before/after composition, responsive views and geometry across all three desktop states. Tools and seasonal behavior were rechecked. Build and all 16 existing tests passed. This update is saved on the GitHub branch exploration/progressive-discovery.
