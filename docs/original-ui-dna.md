# MK Fieldnotes — visual DNA

## Decision

Three directions were evaluated before implementation:

| Direction | Originality / brand | Usability, accessibility and RTL | Performance / maintenance / SEO |
| --- | --- | --- | --- |
| A. Editorial fieldnotes | Strong fit for an engineer's personal voice | Clear reading order and open skill rows | Native text and CSS, low complexity |
| B. Spatial architecture | Distinctive, but repeats the existing 3D metaphor | Mobile and keyboard need extra adaptation | More effects and decorative markup |
| C. Motion-led navigation | Memorable, but risks making motion the subject | Requires a static equivalent throughout | More orchestration than the content warrants |

Selected A with a restrained registration-line interaction. Not a claim of uniqueness across the entire web.

## System

- Geometry: sharp rules and 3px controls; the physical business card retains its own corners.
- Surfaces: charcoal or ivory canvas, gold for orientation and action. No hero gradient or glass header.
- Composition: broad personal narrative and narrow interactive marginal note; offset section bodies; open, two-column skill index.
- Persian: independent name scale/leading, logical spacing, right-origin rules. Mobile preserves the numbered margin rather than simply reproducing desktop cards.
- Signature: a gold registration line ties chapter introductions, selected architecture topics and navigation together.
- Motion: immediate content, short line growth on entry, selected-topic marker, understated press feedback. No fade-up content or pointer tilt. Native scrolling and reduced-motion override retained.
- The compact About business card is the single physical flip interaction. No new bitmap or dependency.
- Real content, contact destinations, semantic headings, translations and metadata remain intact. No invented metrics or projects.

## Audit and implementation

- P1: current-section observer incorrectly derived state from only changed entries. It now samples the six known chapter bounds at observer crossings.
- P2: repeated rounded panels and repeated entry motion obscured hierarchy. Replaced with open skill rows, staggered editorial principles, text-first empty states and contact links.
- P3: removed decorative hero scene and switched the page composition mixin to editorial.
- Skills influenced CSS-first motion, readable bilingual layout, semantic preservation and explicit validation limits. The referenced standalone accessibility skill is absent; keyboard and focus checks use the other skills' guidance.

## Verification

- Production Pages build and four existing data tests passed.
- Browser overflow checks passed in Persian and English at 360, 375, 390, 430, 768, 1024, 1366, 1440 and 1920px.
- Visual checks: Persian dark desktop/mobile; English skill index in both themes.
- Architecture topic selection updates the number, description and pressed state.
- Initial raw build: 336.16 kB versus previous release 337.96 kB; estimated transfer 86.94 kB versus 87.23 kB. This is bundle evidence, not measured Core Web Vitals.
- Keyboard checks passed for topic selection, business-card flip, form disclosure and mobile-menu Escape. Prerender retains one H1, the canonical URL, structured data and all seven content sections.
- No Lighthouse, CPU-throttled or real-user measurements; reduced-motion behavior is source-verified, not browser-emulated.
- Contact form remains explicitly a preview without a sending backend. Career/project details remain pending real content.
