# Skill-guided portfolio refinement — 2026-10-07

## Audit and priorities

- P0: none identified in this scoped review.
- P1 UX: primary hero action led to empty case studies; contact form cannot deliver messages. Hero now offers contact and capabilities. Contact prioritizes the business-card email and verified LinkedIn profile. The existing form is preserved in a clearly labeled, closed preview disclosure.
- P2 clarity: skill lists lacked context; career/project empty states lacked a useful next step. Added bilingual descriptions and relevant LinkedIn/GitHub links.
- P2 motion: long entrance delays and pointer measurements on every event. Shortened entry to 420ms with maximum 120ms stagger; main name and statement have no entrance animation. Tilt now batches pointer reads/writes to one animation frame.
- P3 visual: excessive similar rounded surfaces and large mobile display text. Calmer About rows, smaller mobile headings, compact project artwork and consistent contact action cards retain the approved gold/charcoal identity.

## Skills applied

Read all eight user-provided `.agents/skills/*/SKILL.md` files. The orchestrator guided audit → prioritization → implementation → verification. UI/UX, responsive RTL, motion, Angular, performance, technical SEO and GEO/AEO guidance informed their relevant changes. No standalone accessibility skill was supplied; semantic controls, focus, keyboard support and reduced-motion requirements came from the other skills. User-owned skill files were not modified.

## UI, UX and content

- Clear first actions, direct contact choices and readable technical capability descriptions.
- Business-card email was already public in the user-approved image; it is now selectable/clickable text.
- Compact flip card retained with a visible hover/tap hint.
- No invented work history, awards, clients, metrics, case studies or FAQs.
- Public intent: understand Mahdi Koushyar's frontend capabilities and initiate contact. Existing headings and profile identity remain consistent in both languages.

## Architecture

- Changes stay within existing standalone sections, central profile data, Transloco catalogs and the refinement SCSS module.
- Signals remain local; no added effects, RxJS conversions, dependency, route or hosting changes.
- Tilt listener cancellation and SSR-safe teardown retained; pointer events coalesced with requestAnimationFrame.
- No new shared abstractions for one-off markup.
- Changed areas: hero, about, skills, experience, projects, contact, profile data/test, tilt directive, both translation catalogs, global refinement styles and Person schema.

## Motion and accessibility

- Central motion tokens: 120/200/320/420ms. Reveal travel reduced from 28px to 12px.
- Existing reduced-motion global rule disables animation and minimizes transition duration; pointer tilt explicitly respects the media query.
- New primary arrows mirror in RTL. Standard details/summary works with Enter; confirmed in the browser.
- Touch target sizing and visible focus retained. No new interaction requires hover.
- No external message or email was sent during testing; mailto destination verified without launching a mail client.

## Responsive verification

- DOM overflow checks passed at 360, 375, 390, 430, 768, 1024, 1366, 1440 and 1920px in English and Persian.
- Visual inspection: English light desktop hero/contact; Persian dark mobile contact.
- Default contact form is collapsed and explicitly labeled as unavailable for sending; keyboard expansion/collapse verified.
- Temporary viewport override reset after checks. No tables or large data sets exist in these sections.

## SEO and GEO/AEO

- Built prerender output contains one H1, correct canonical, five mailto links, robots.txt and sitemap.xml.
- Person/WebSite/ProfilePage JSON-LD remains valid JSON. Added supplied public GitHub and LinkedIn profiles to Person.sameAs.
- Clearer first-person introduction and skill explanations improve human-readable entity/context clarity; no claims of ranking or indexing gains.
- Existing shared URL for both languages remains. Separate language URLs/hreflang are not implemented in this design change.

## Performance evidence and limits

Previous release build recorded initial raw/estimated transfer at 331.18/86.13 kB, CSS 36.08 kB and home chunk 56.59 kB. Current build: 337.96/87.23 kB initial, CSS 38.78 kB, home chunk 58.49 kB. This is about +6.78 kB raw and +1.10 kB estimated initial transfer, not a measured speed improvement. No packages added; existing build budgets passed.

LCP: main name and statement no longer wait for an entrance effect. CLS: transforms preserve flow; card dimensions retained. INP: pointer reads are bounded to animation frames. These are implementation changes, not measured Core Web Vitals results. No field data, Lighthouse, CPU throttling or reduced-motion browser emulation measurement was available in this check. Fonts and the original 1.3 MB card image remain unchanged and warrant a separate measured asset pass. Existing initial warning/error budgets remain 550/850 kB.

## Tests and remaining work

Production Pages build passed. Four content-integrity tests passed after updating the existing email expectation to reflect the business-card address. Contact backend remains unconfigured; the disclosure explicitly communicates that. Verified career/project content is still needed to complete those sections. No changes to authentication, deployment permissions or repository visibility.
