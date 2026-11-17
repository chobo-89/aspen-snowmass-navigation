# Exploration C primary utilities — Design QA

final result: passed

## Latest utility-placement verification

The user's latest brief supersedes the expanding row. Source target: the preceding C refinement (`exploration-evidence/refinement/desktop-context.jpg`) plus the requested primary-column placement. Current implementation: `exploration-evidence/primary-utilities/desktop-root.jpg`, `desktop-options.jpg`, `desktop-context.jpg`, `desktop-1280.jpg`, `tablet-context.jpg`, `mobile-root.jpg`, `mobile-context.jpg`, `desktop-maps.jpg`.

Combined comparisons opened: `primary-utilities/comparison.jpg`, `primary-utilities/primary-detail.jpg`, `primary-utilities/responsive.jpg`. Primary detail uses native equal 360px crops at all three levels. Final result is passed: the expanding footer is replaced by a compact two-column group above secondary links, inside the primary column; options/context remain full-height. No remaining P0/P1/P2 findings.

Geometry: primary is 360px; utility content is approximately 291px with two approximately 137px tracks and 16px gap. Its x/y/width/height are identical through all three desktop depths, recorded in `primary-utilities/geometry.json`. Item typography remains 30px. Muted 14px utility labels are secondary to primary categories. Existing Aspen typography, palette, photography, mountain copy, CTA and click locking are retained. No new assets/icons were needed.

Viewports: 1512×982 and 1280×800 desktop, 766×1024 tablet, 390×844 mobile. User zoom was now 90%; screenshot canvas padding was cropped to measured CSS bounds without resizing. Comparison boards scale only for presentation; prior source capture used 80% zoom, so minor raster antialiasing differences are expected.

Review found a compact-layout issue during the first responsive comparison: pinning About/Contact/Account/Cart within the primary panel reduced category visibility to two items. Fixed compact layout to scroll primary content and secondary links together while tools remain outside the active panel. Final mobile geometry shows all four category bottoms above the utility boundary (552px versus 568px), and updated mobile-root.jpg verifies the fix. Desktop footer remains anchored as requested.

Browser rechecked all primary categories, option/context progression, Trail Maps, chooser Escape/focus return, seasonal switching, mobile CTA scrolling, mobile Back and resizing compact → desktop. Tools reparent to the primary footer on desktop and remain usable. No console errors/warnings observed. Production build/packaging and 16 tests passed. Original/A/B preservation was verified. GitHub branch update was subsequently requested; only exploration/progressive-discovery is updated.

## Earlier refinement record (superseded utility placement)

### Source and implementation

The source target is the existing C prototype plus the user's scoped refinement brief: preserve visual direction and final content; fix column compression, typography changes, inherited back label and utility placement. Original C visual truth: `exploration-evidence/desktop-root.jpg`, `desktop-options.jpg`, `desktop-context-winter.jpg`. Original booking fidelity evidence remains in `exploration-evidence/booking-comparison.jpg`.

Implementation evidence: `exploration-evidence/refinement/desktop-root.jpg`, `desktop-options.jpg`, `desktop-context.jpg`, `desktop-1280.jpg`, `tablet-context.jpg`, `mobile-root.jpg`, `mobile-options.jpg`, `mobile-context.jpg`, `desktop-lifts.jpg`, `mobile-maps.jpg`, `mobile-book.jpg`.

Combined inputs opened and reviewed: `refinement/before-after.jpg` (original C and refined C at the same winter mountain state), `refinement/primary-detail.jpg` (native 360px primary-column crops across all depths), and `refinement/responsive-board.jpg`. The source and revised full views intentionally differ in navigation proportions, utility extent and contextual height as requested. Focused primary crops verify consistent typography/spacing; original booking evidence covers retained controls.

## Dimensions and normalization

CSS viewports: desktop 1512×982 and 1280×800; tablet 767×1024; mobile 390×844. Browser zoom remained at the user's 80%. Raw screenshots included right/bottom canvas padding (for example 1891×1228 for the 1512×982 view); stored captures were cropped at the measured CSS viewport bounds without resizing. Boards scale images for presentation only. The focused primary comparison uses equal native 360×717px regions. Browser viewport overrides were reset before handoff.

`refinement/geometry.json` records all three desktop levels. Primary width 360px, heading 42px, item text 30px, padding 40px 34px, item padding 21px 0 and gap 14px are identical across states, including bounds and heading margins. Options remain 320px wide. Utilities grow 360 → 680 → 680px. Context is 792.5px wide at 1512px, spans the full content height, and contains no utility links. No horizontal overflow at tested dimensions.

## Findings and fix history

- [P2, resolved] Prior cascade reduced the primary from 360px to 270px, its item typography from 30px to 24px, and changed heading size/padding. Removed depth-specific primary overrides and fixed the options track at 320px. Post-fix evidence: primary-detail.jpg and geometry.json.
- [P2, resolved] Prior viewport-wide utility strip visually framed the page and put practical tools beneath the context. Moved utilities into the cascade grid. They span only the active navigation tracks; the photographic region spans the full height alongside them. Post-fix evidence: before-after.jpg and desktop-context.jpg.
- [P2, resolved] Inherited “All destinations” language did not fit this offering. Replaced it with “Back to Explore”; incidental “destination page” copy became “linked page.” Evidence: desktop-options.jpg and mobile-options.jpg.
- Selection refinement: retained click-only event delegation and made repeated selections idempotent. Re-clicking the active option/category keeps context. Moving the pointer from options into the photograph did not replace the selected Aspen Mountain profile. Back remains the explicit return path.

Final combined comparison after these fixes found no remaining actionable P0/P1/P2 issues.

## Five fidelity surfaces

- Typography: original Whitney font assets and weights retained. Primary item, heading and spacing do not change at deeper levels. Options typography also remains constant when context opens. Mountain heading/body/fact hierarchy remains intact.
- Layout rhythm: fixed tracks expand horizontally, with stable primary padding/spacing. Utility row belongs to the navigation tracks. Compact panels use a single active level with Back. Longer content scrolls independently without hiding persistent tools.
- Colors/tokens: Aspen black, light text and red accents remain. Active category and option use red underlines/arrows rather than size changes. Source season toggle, top controls and CTA treatment remain.
- Image quality/assets: same official photographs, logo, fonts and supplied seasonal SVGs. Increased context height changes the crop intentionally; imagery remains immersive with legible gradient-backed content. No replacement brand assets introduced.
- Copy/content: same mountain personalities, descriptions, Best for, The feel and primary CTA. New back language is contextual. Mountain draft labels and prototype operational-data boundaries remain documented.

## Interaction and regression checks

Browser exercised initial/category/context progression; repeated category/option selection; all four primary categories; seasonal ski-to-bike selection; Back to Explore; tablet/mobile Back; mobile context scrolling to CTA; utility access and chooser dismissal preserving context; Lift Status; Trail Maps; mobile booking; keyboard Escape and focus return. Pointer travel from options into context retained Aspen Mountain. Event inspection confirms only clicks dispatch category/option transitions; hover styling is feedback only.

Production build and hosting packaging passed; 16/16 tests passed, including the locked-selection regression. No console warnings/errors observed. Original booking interaction block is unchanged. Original/A/B tracked-file hashes remain unchanged; see initial preservation manifest and the verification of this refinement.

## Limits / follow-up

Weather is captured data; search has no live backend; booking retains its original winter catalog. Draft copy needs editorial review. No independent physical touch-device, screen-reader, sub-390px or OS reduced-motion session was performed. Reduced-motion support remains in CSS/JavaScript. These are existing prototype boundaries.

Implementation checklist complete: stable geometry, click locking, contextual Back, integrated utilities, preserved immersive profile, responsive checks, combined visual comparison, build/tests and isolation verification. This refinement is saved on exploration/progressive-discovery; the subsequent utility placement above is the current version.
