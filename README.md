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
- 26 routes: home, 11 main pages and 14 source-backed service detail pages.
- About, care journey, privacy, all seven supplied FAQs, and ten planned journal topics.
- A typed, reusable article template in components/editorial.tsx; no invented published articles or medical reviewers.
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
Journal topics have no dead article links; each is visibly unpublished.
Before public launch confirm contact details, legal identity, actual location, clinical team, medical review ownership, service permissions, policies and the final master logo. The current Sites preview is owner-private; public launch requires the confirmations above.

## Verification

Run pnpm typecheck and pnpm build. For the current motion design, run node scripts/review-comments-check.mjs against the production preview at http://127.0.0.1:3002. The script uses bundled Playwright and Microsoft Edge on this Windows machine; adapt the import and URL on another machine. Results and screenshots are in qa/review-comments-results.json and qa/*-review.png. Earlier qa files and browser scripts record previous designs and are historical.

The intro-seen flag stays in sessionStorage in the user's browser. No personal or medical information is collected.
