# Exploration B — Immersive Navigation

Local preview: http://127.0.0.1:5175/
Original: http://127.0.0.1:5173/
Exploration A: http://127.0.0.1:5174/

## Design approach

A floating horizontal header opens the landscape up. Its subtly translucent, 12px-blurred surface becomes solid black on hover, keyboard focus, scroll, or menu activation. Activating a category opens an inset, near-full-screen discovery surface, with the landscape softly blurred around its edges.

At 1280px and above, each of the four primary labels opens a mega menu directly below the header. There is no desktop hamburger or repeated category rail. Clicking the active label closes its panel; another label switches the content. A close icon, Escape and outside click also dismiss it. Four Mountains presents all four names, clearly marked draft personality lines, a Compare Mountains entry point, and official mountain photography. Hovering or focusing a mountain updates the photograph, caption and direct exploration link. The source map is replaced by this discovery treatment.

Below 1280px, an icon-only hamburger opens the four-section touch menu. It never shows a visible Menu or Close label. Each category opens a sliding detail drawer with All destinations as its Back control. Content scrolls within the drawer. A persistent season row sits above a booking shelf at the bottom, while the logo, weather, search and menu remain in the compact top header. On desktop, Winter/Summer sits before account, cart and search as a single outlined segmented control. Its 14×14 snowflake and sun use the exact user-supplied path geometry with currentColor for selected-state inversion. Account and cart are available in the menu when space is tight.

## References inspected

- Eleven Experience: translucent/blurred horizontal header, solid black expanded header, image-led destination discovery. Browser inspection found an 8px header blur; B interprets this with Aspen assets, its own grid and existing motion timing. Resting and activated states were inspected; not every Eleven hover path was sampled.
- White Desert: compact, grouped navigation panel over a blurred landscape, clear hierarchy and focused actions.
- Vita Travel: restrained horizontal header, fine dividing lines, landscape-led composition and minimal navigation labels.

These are principles, not copied branding or pixel targets. Reference captures and comparisons are in `exploration-evidence/`. The latest revision screenshots and supplied toggle comparison are in `exploration-evidence/revision-2026-11-16/`; earlier screenshots document the first version of B. Mountain images come from Aspen Snowmass's Four Mountains overview; the Bike photo comes from its summer biking page. Asset source URLs are recorded in the evidence JSON files.

## Reused and new behavior

Reused: original Whitney fonts, logo, account/cart/search/menu icons and the user-supplied seasonal icons, hero landscape and copy, booking markup, original booking JavaScript block, nine booking destinations, button fill treatment, popup link motion, arrow-key controls, outside dismissal and source weather/search panels. The original source stylesheet, navigation capture, hero markup and sprite are unchanged.

New: floating header material states, category-driven desktop mega menus, hover/focus mountain previews, seasonal IA, responsive season placement, operational mountain choosers, mobile category drawers, inert background/panels, focus management and announcements. Menu entrance/exit use the existing 400ms desktop / 300ms mobile timing and easing; child drawers use 300ms. Booking retains its original 400ms behavior. Reduced-motion preferences bypass JavaScript animation and reduce CSS transitions.

## Review

1. At desktop width, move into and out of the header to see translucent → solid behavior.
2. Open Four Mountains; hover or keyboard-focus each mountain. Compare Mountains opens the current overview in a new tab.
3. Open Ski & Ride and switch Summer: the category becomes Bike with actual summer biking links and photography. Check Things to Do for Dining and seasonal Activities.
4. Try Book Now from the homepage and expanded menu. All nine original products remain available in both seasons.
5. At 768px and 390px, open each category, scroll Four Mountains, return with All destinations, and switch seasons inside a drawer.
6. Try Trail Maps, Lift Status, weather and search. Tab/Shift+Tab stay inside the active surface. Escape dismisses the top interaction first and restores focus.

Build and 12 checks pass. Browser QA covers 1512×982, 1280×800, 768×1024 and 390×844. The browser tools do not offer media-preference emulation, so reduced-motion visual behavior was not emulated. See `design-qa.md` for evidence and exact test limits.

## Isolation and run instructions

Branch: `exploration/immersive-navigation`.

This is a real independent Git worktree at `outputs/aspen-immersive-navigation`, attached to the separate local repository `work/aspen-exploration-baseline.git`. It starts at `7336516`, the verified original snapshot, rather than Exploration A's implementation. A local clone of the repository supplied that baseline commit; its temporary source remote was removed. No publishing remote is configured. Neither the original nor A's tracked files were modified. Nothing was pushed, deployed or imported into Figma.

The preview is running on port 5175. To restart later with Node.js 22+:

```sh
npm ci
npm run dev -- --host 127.0.0.1 --port 5175
```

Validation:

```sh
npm run build
npm test
```

The retained Sites adapter remains ready for a later hosting handoff, but no hosting was changed.

## Known limits and deliberate choices

- Mountain descriptors and new editorial lines are exploration copy; the mountain descriptors explicitly say Draft.
- Compare Mountains opens the existing overview. There is no new comparison tool or map interaction.
- Mountain discovery and the homepage retain winter imagery in both seasons. Bike switches to an official summer image. Other Summer category panels label their winter reference imagery.
- Book Now deliberately retains the original winter products and all nine links in Summer mode.
- Weather remains the existing captured 34°F snapshot; its report tabs/units have the baseline's static behavior. No weather API or fabricated live conditions.
- Search opens, focuses and submits to the production search URL in a new tab; live suggestions are not connected.
- Destination pages are real external links, not pages built in this prototype. No checkout or account transaction was performed.
- Browser QA is not a screen-reader audit, exhaustive device/browser certification, or frame-by-frame pixel certification. Existing raster imagery limits extreme enlargement.
