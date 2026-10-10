# Portfolio refinement

## Current preview authority: black/gold revival

The MK Fieldnotes direction in `docs/original-ui-dna.md` and `src/styles/_editorial.scss` is retained only as rejected design history. The current local preview restores the richer black/gold composition from `src/styles/_refinement.scss` and adds targeted depth and hierarchy in `src/styles/_revival.scss`. Preserve the compact flipping business card, bilingual behavior, honest empty states, and the corrected current-section navigation. Do not publish this preview before visual approval.

This page overrides the generated MASTER.md for the requested portfolio redesign.

- Direction: restrained software-engineering portfolio, clear typography, generous but controlled spacing.
- Dark palette: charcoal #10100f, surface #1e1c18, ivory text #f6f0e5, muted gold accent #d5b47a.
- Light palette: ivory #faf7f0, warm-white surfaces #fffcf7, text #29261f, dark gold accent #805b25 for readable links and controls.
- Business-card reference: user-selected mk-black-gold-v7-domain-qr.png. Display a compact 280px two-sided card within About, with pointer hover, touch and keyboard flip. CSS frames each side from the original unchanged asset.
- Typeface: Geist for English; Vazirmatn for Persian with separate line-height and heading sizing.
- Hero: localized name with solid typography, one primary CTA, selectable Interface/State/Domain architecture layers built in CSS.
- Content: short headings, grouped skill cards, compact career empty state, illustrated case-study placeholder. Keep implementation paths out of visitor-facing copy.
- Metrics: show only populated values; otherwise present engineering principles without invented numbers.
- Responsive: one-column hero below 640px, mobile navigation below 850px, no minimum body width that conflicts with scrollbar space.
- Composition: floating navigation, editorial hero with gold concentric rings, asymmetric skill grid, distinct About principle cards, compact career placeholder and warm contact surface.
- Motion: staged hero entry, staggered section elements, pointer-driven architecture tilt, animated selected layers, subtle hover lift and scroll progress where supported. Honor reduced-motion and keep content visible without observers. No continuous decorative loops.
- Scroll motion preview (2026-10-10): use native CSS view timelines for the hero exit, section headings, gold rules, capability groups, architecture topics and case-file composition. Keep the existing IntersectionObserver reveal as the fallback; never add scroll listeners or make content depend on motion.
- Implementation: page refinements live in src/styles/_refinement.scss; pointer motion is isolated in TiltDirective with listener and animation-frame cleanup.
- Accessibility: visible focus, 44px controls, mobile-menu Escape and focus cycling, current-section semantics.
- Existing MK identity remains in place; this refinement changes presentation, not identity assets.
- Skill-guided refinement (2026-10-07): prioritize contact and capabilities in the hero; explain skills in plain bilingual copy; use direct email/LinkedIn contact cards; keep the inactive form in a labeled disclosure. Compact empty states link to real professional profiles.
- Motion tokens: 120/200/320/420ms; max 120ms reveal stagger; main name/statement render immediately. Prefer calm surfaces, fewer repeated card borders and smaller mobile display type. Detailed validation: docs/design-review-2026-10-07.md.
