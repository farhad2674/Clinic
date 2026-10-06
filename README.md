# ELORA — local website

A Persian-first, RTL editorial clinic website built with React, Vinext, TypeScript and GSAP. This is a local review build, not a public clinical launch.

## Run

From C:\clinicwebsite\elora:

- pnpm install --frozen-lockfile
- pnpm dev — http://127.0.0.1:3000
- pnpm typecheck
- pnpm build
- pnpm start — production server on port 3000 (stop the development server first)

## Implemented

- Ten cinematic homepage chapters, a conversation CTA and FAQ interlude; reversible entrance and portrait video scrubbing.
- The server-rendered hero is visible immediately. Its still image and Vazirmatn font are prioritized; scroll films load after page load as their scenes approach the viewport, and GSAP motion loads after the first paint.
- Four horizontally composed care paths on desktop, vertical reading flow on mobile.
- Six concise care-journey slides with titles, icons, images, short captions and progress controls. Desktop scroll scrubs them horizontally in both directions; mobile uses horizontal swipe and snap.
- Rounded, overlapping cover transitions across chapters 07–10, including sections 07 and 08 at compact desktop heights, center-timed title reveals and drifting content boxes.
- A three-step qualitative assessment display over the portrait, using source-backed categories without fabricated measurements or diagnosis.
- A three-question decision sequence, chapter navigation, and scroll restoration. The site follows the operating system's reduced-motion preference; there is no fixed motion toggle.
- 49 routes: home, 12 main pages, 16 service guides and 20 source-backed educational articles.
- About, care journey, privacy, FAQs, and a journal covering regenerative medicine, cell therapy and skin/hair care.
- A typed article template with section-level citations, reference cards and related services; no invented medical reviewers.
- Contact links only. Configure verified public details in lib/site.ts. Until then the page explains that consultation contact is unavailable.
- No patient form, health-data database, analytics, or external runtime fonts.
- Site-wide noindex/nofollow while this is a preview.

## Source and media

docs/handoff.md controls clinical copy, positioning and brand colors.
docs/DESIGN-4.md and docs/DESIGN-5.md are layout and motion references only.
Run pnpm content to regenerate lib/content.json from the handoff; 14 service pages, 7 FAQs and 6 care stages are validated by the extractor.

See docs/MEDIA.md for source provenance and exact image-generation prompts. Supplied source films remain untouched under the parent workspace's .codex-remote-attachments directory. Web-ready media and locally hosted licensed fonts are under public/.

## Review and launch boundaries

Concept interiors are labeled. Portraits are illustrative models, never patient outcomes or staff.
Every service detail and category page is marked for medical review. Exosome and cell-based pages explicitly state that availability is unconfirmed.
Journal articles have live internal links, scientific references and explicit medical-review status.
Before public launch confirm contact details, legal identity, actual location, clinical team, medical review ownership, service permissions, policies and the final master logo. The current Sites preview is owner-private; public launch requires the confirmations above.

## Verification

Run pnpm typecheck and pnpm build. For the current motion design, run node scripts/review-comments-check.mjs against the production preview at http://127.0.0.1:3002. The script uses bundled Playwright and Microsoft Edge on this Windows machine; adapt the import and URL on another machine. Results and screenshots are in qa/review-comments-results.json and qa/*-review.png. Earlier qa files and browser scripts record previous designs and are historical.

The intro-seen flag stays in sessionStorage in the user's browser. No personal or medical information is collected.

## Regenerative content update — 2026-10-06

The homepage now focuses on پزشکی بازساختی and سلول‌درمانی, with four direct service paths: PRP, mesogel, cellular methods and regenerative medicine. Existing chapter IDs, GSAP motion, videos, backgrounds and images remain; the mesogel card reuses the existing skin portrait. Shorter copy and descriptive headings support scanning without an arbitrary universal word limit.

Ten additional Persian articles cover the two core concepts, PRP, mesogel, novel cellular methods, vitiligo, psoriasis, lichen planus, post-COVID autoimmunity and exosomes versus stem cells. Sources include NIH, ISSCR, peer-reviewed Iranian Royan/TUMS research and international primary studies. Study findings and limitations appear together. Experimental cellular approaches are distinguished from established care; observational associations are not described as causation.

- Homepage copy: `lib/home-content.ts` and homepage components.
- Research and section citations: `lib/research-content.json`.
- Service additions: `lib/regenerative-services.ts`; detail overrides: `lib/regenerative-service-details.ts`.
- These additions are separate from the original handoff extractor and are retained if its original content is regenerated.
- Persian editorial, marketing/storytelling and brand reviews were performed by separate agents. Requested refinements were applied. These reviews do not constitute clinician approval; private preview and noindex/nofollow remain.
- QA: `pnpm typecheck`, `pnpm build`, `scripts/regenerative-check.mjs`, results in `qa/regenerative/results.json`. The browser script accepts `PLAYWRIGHT_MODULE`, `CHROMIUM_PATH` and `ELORA_QA_URL` for portable local execution.

Content-placement research: [NN/g: reading online](https://www.nngroup.com/articles/how-users-read-on-the-web/), [descriptive headings and scanning](https://www.nngroup.com/articles/layer-cake-pattern-scanning/), [scrolling and attention](https://www.nngroup.com/articles/scrolling-and-attention/). Iranian and international context: [Behroyan consultation pathway](https://www.behroyan.ir/page/fa-240/سلول-درمانی), [Mayo Clinic patient education](https://newsnetwork.mayoclinic.org/discussion/regenerative-patient-consult-service-seeks-to-educate-patients/). These inform content structure; scientific claims use the references displayed with each article.

Final checks passed: 49 routes returned 200 with unique titles/descriptions, one H1, Persian RTL and valid fragment/internal links; no browser errors or horizontal overflow at 360, 768 and 1440 pixels. Normal-motion checks at 390, 1024 and 1440 pixels, mobile menu, FAQ and 404 behavior passed. Motion source and original media files are unchanged.
