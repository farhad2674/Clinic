# Persian copy and chapter navigation review

Reviewed 28 September 2026 against the supplied elora_website_generation_handoff_v1.md and the persian-web-copy skill. The handoff supplied brand and clinical context; the user's requested rewrite controls the final copy and navigation treatment.

## Editorial decisions

- Home: distinguish introduction, assessment, services, life stages, decision questions, care stages, evidence, education, FAQ, and contact. Retain the requested assessment, conversation, and FAQ headings. Promote «زیبایی، به زبان خود شما.» to the life-stage section heading.
- Replace repeated assessment messaging in the perspective section with questions about expected outcomes, time and cost, and alternatives.
- Rewrite all 14 service pages with plain Persian, short paragraphs, realistic limits, and preserved draft status. Remove repeated hero/section introduction text on category and service pages.
- Create unique descriptions for all 26 existing routes. The home search title identifies skin, hair, rejuvenation, Tehran, and ELORA. These are topic-aligned editorial choices; search demand and ranking were not measured.
- Match consultation links to the actual contact-information page. Online requests remain unavailable. Planned location, unconfirmed advanced services, demonstration images, and medical-review notices remain explicit.
- Preserve private-preview noindex/nofollow settings and existing URLs. No publishing or indexability changes.
- Remove chapter numbers and fixed chapter text. Larger accessible dots link to all 12 major sections; short decorative labels sit behind headings and are hidden from assistive technology. Care-step numbers remain meaningful sequence indicators.

## Validation

- TypeScript and production build passed.
- All 26 routes returned HTTP 200, each with one H1 and a distinct description.
- No horizontal overflow at 360, 390, 768, 1024, or 1440 pixels in reduced motion; normal-motion checks also passed at 390, 768, and 1024 pixels.
- Browser checks passed for forward/backward chapter navigation, service tabs, audience tabs, FAQ expansion, and active navigation with reduced motion. No browser runtime errors observed.
- Desktop and mobile screenshots reviewed locally; hosted deployment was not changed.

## Clinical boundaries and sources

This is an editorial review, not clinical approval. No named clinicians, licenses, prices, results, or local treatment authorizations were invented. External references were used to cross-check the consultation/risk framing, not to infer Iranian authorization:

- [AAD: preparing for botulinum toxin treatment](https://www.aad.org/public/cosmetic/wrinkles/botulinum-toxin-preparation)
- [AAD: questions before cosmetic treatment](https://www.aad.org/public/cosmetic/safety/ask-questions)
- [FDA: unapproved stem-cell and exosome products](https://www.fda.gov/safety/medical-product-safety-information/public-safety-alert-due-marketing-unapproved-stem-cell-and-exosome-products)

The original handoff is preserved. lib/content.json is now edited publication copy; running the original prepare-content.mjs importer would regenerate its earlier wording from docs/handoff.md.
