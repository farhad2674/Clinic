# Shared editorial motion — 28 September 2026

- `components/invitation.tsx` now supplies the same closing chapter to the homepage and every editorial route (37 sitemap routes total). Service/category links retain their `care` context; the contact page points to preparation instead of linking to itself.
- Inner headings use reversible text masks without blur; the closing title also remains sharp. Blur, including navigation backdrop blur, is reserved for the homepage. Cards and rows reveal with scroll; images receive gentle parallax. The decorative orbit and gold heading rules repeat existing brand details.
- At desktop widths of at least 1024px and heights of at least 700px, the completed inner content holds while the rounded invitation rises over it. The invitation fills the viewport; the footer follows normally. Keyboard focus releases the cover to expose a focused content link.
- Narrow screens use normal document flow and lighter movement. OS reduced-motion changes revert all GSAP effects and pins. No-JavaScript content and links remain available. Accordion changes refresh the closing section's position.

## Validation

- `pnpm typecheck` passed.
- Production compilation passed. Windows held the empty `dist` directory open; builds used a temporary `build.emptyOutDir: false` setting, then restored `vite.config.ts` exactly. No permanent build configuration change.
- `scripts/shared-motion-check.mjs`: 99 passing checks; sitemap rendering, 10 desktop page families, reversible closing titles, 360/390/768/1024px layouts, contextual links, FAQ, article anchors, reduced-motion changes, no-JS rendering, and homepage motion.
- `scripts/shared-motion-refinements.mjs`: keyboard focus visibility, reversible section heading masks, mobile spacing, and footer visibility.
- `scripts/shared-motion-production.mjs`: local Cloudflare worker smoke checks. This project emits a Cloudflare worker and uses Wrangler for its production preview.
- Results and reviewed screenshots: `qa/shared-motion/`.
