# Exploration C — Design QA

final result: passed

## Comparison targets

This is an architecture exploration, not a pixel clone of Eleven. The interaction target is its adjacent destination flyout; Aspen source controls and supplied icons provide the brand/fidelity targets.

Source visual truth: `exploration-evidence/eleven-cascade.jpg` and `../aspen-evolved-original/exploration-evidence/original-book.jpg` (1512×982).

Rendered evidence: `desktop-root.jpg`, `desktop-options.jpg`, `desktop-context-winter.jpg`, `desktop-context-summer.jpg`, `tablet-context.jpg`, `mobile-root.jpg`, `mobile-context-summer.jpg`, `desktop-book.jpg` in `exploration-evidence/`.

Full-view combined inputs, opened and reviewed: `reference-comparison.jpg`, `progression-board.jpg`, `responsive-board.jpg`. Seasonal captures supplement these. Focused combined input: `booking-comparison.jpg`, comparing native 280×490 booking regions (source x1113/y101; C x1182/y93). Header placement intentionally differs; booking internal anatomy is preserved.

Desktop CSS viewports 1512×982 and 1280×800; tablet 767×1024; mobile 390×844. User browser zoom was 80%. Raw captures included extra right/bottom canvas padding; images were cropped to measured CSS bounds without resizing. Raw pixel dimensions and normalization are in `capture-metrics.json`. Boards scale only for presentation. Eleven and C have different viewports/content: that comparison evaluates hierarchy and continuity, not pixel equivalence.

## Findings

No actionable P0/P1/P2 findings remained in the final combined comparisons.

- Fonts/typography: source Whitney assets and weights retained. Context has a deliberately stronger display hierarchy. Descriptions, facts and CTAs remain readable at tested sizes. Focused booking comparison retains wrapping, weight, spacing and external-link icons; capture antialiasing differs slightly.
- Spacing/layout: preceding desktop choices remain visible; compact sizes show one level. No horizontal overflow at measured viewports. Mobile categories scroll while utilities, season and booking remain accessible.
- Colors/tokens: Aspen black, light foregrounds, red interaction accents and outline CTAs are preserved. Dark image gradients support text; the selected season uses the supplied rectangular treatment.
- Images/assets: original logo/sprite icons retained, with supplied seasonal SVG paths. Official larger mountain photos load in exercised contexts and use intentional immersive crops. Booking uses original markup and baseline styling.
- Copy/content: mountain personalities differ by mountain and season and are visibly draft. Summer access and destinations differ from winter. Snapshot values and backend boundaries are documented in EXPLORATION-C.md.
- Interaction: no option is auto-selected. Season changes preserve selected mountains and shared sport choices. Back restores preceding levels; utilities remain persistent.

## Comparison history

Asset preparation identified small source mountain-card photos as unsuitable for the large context surface. They were upgraded to higher-resolution official hero photographs before final comparison; `asset-sources.json` records dimensions/sources. Final winter, summer and responsive captures show the upgraded images. The first formal combined comparison after that preparation found no substantive visual differences requiring another fix iteration.

## Validation

Browser exercised open/close; category → options → context; alternate mountains; Winter/Summer; seasonal ski/bike access; lodging; longer mobile Things to Do options through Guides; Trail Maps at root/context; utility dismissal; desktop/mobile Book Now; Weather; Search; Escape through levels; focus return and Tab movement. Overlay evidence: desktop/mobile maps, weather and booking captures.

Console warnings/errors: none observed in the C browser session. Production build and hosting preparation passed. Tests: 15/15 passed. Preservation: original 56, A 85 and B 117 tracked files all unchanged. Source CSS, navigation/hero markup and symbols also match the original.

## Residual checks and follow-up

Draft editorial copy needs review. Weather and search have no live backend. Booking remains winter-oriented in Summer; seasonal checkout taxonomy is a future decision. Physical-device, screen-reader, sub-390px and OS reduced-motion visual sessions were not performed; reduced-motion handling exists in code. Eleven was observed through a destination cascade, not exhaustively tested.

Checklist complete: combined full views and focused booking comparison; five fidelity surfaces; responsive interactions; build/tests; preservation verification. No C deployment/import performed.
