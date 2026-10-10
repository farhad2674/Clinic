# ELVITHA refresh — 10 October 2026

The owner requested a site-wide rebrand, natural Persian editorial copy, entirely new journal covers, compact references, indexable pages, and a logo intro. The working checkout is `C:\clinicwebsite\elora`; the directory and existing animation event names are internal identifiers.

## Brand and media

The public identity is **ELVITHA / Elvitha / الویتا**. A vector emblem and wordmark appear in the header, menu, footer, favicon and opening intro. Interior images had embedded ELORA signs, so those were edited with the built-in ImageGen tool. Original generated PNGs are preserved in `assets/elvitha-interiors/`; optimized assets are:

- `public/media/corridor-elvitha.webp` — 1672 × 941
- `public/media/brand-space-elvitha.webp` — 1671 × 941
- `public/media/lounge-elvitha.webp` — 1672 × 941

Prompt for each interior (using its corresponding existing image as reference):

> Edit this architectural concept photo for the website rebrand from ELORA to ELVITHA. Preserve exactly the camera angle, room geometry, lighting, furniture, materials, colors and composition. Remove every existing ELORA sign AND leaf logo, including their floor/mirror reflections. Replace signage with the exact elegant uppercase lettering ELVITHA (E L V I T H A), small understated brushed champagne metal letters without a separate icon. Correct realistic perspective, subtle light and reflected letters where physically present. No other words or logos. This is an interior brand concept, not a real clinic. Keep full original landscape frame and premium photorealism. Do not redesign the room.

The entrance film uses new generated signage tracked onto its original frames; its original duration, frame count and camera movement remain. The supplied portrait film and face-analysis effects remain unchanged.

## Purposeful image reuse

Every journal article has its own new cover. A cover is repeated on its listing card, article detail, and directly related service/guide to make the topic recognizable. `lib/guide-images.ts` records these semantic mappings. Homepage method cards and method comparisons use the image of their linked topic, replacing unrelated generic portraits. The corridor, philosophy interior, and shared closing invitation intentionally establish continuity in the same conceptual place; these images are not represented as photographs of an operating branch. Old media are retained as source history but removed from active mappings where replaced.

## Reading and indexing

Article workflow badges (draft, awaiting review, unreviewed) are removed. No reviewer credentials or review dates were invented. Treatment limitations, real source links and unavailable booking information remain accurate. References use a compact native `details` disclosure; numbered citations retain their source anchors. A text-first no-JavaScript reading experience is retained.

Root metadata uses `index, follow`; `public/robots.txt` allows crawling. `/sitemap.xml` derives its origin from the request and includes all valid routes, avoiding a fabricated domain. This enables crawling in the application; actual search-engine indexing requires a public deployment. No hosting visibility change is included in this local project update.

## Opening intro and motion

The intro waits for still images/posters and the existing fonts needed for the first two homepage sections. It does not wait for film downloads. Inner-page intros use their first two content blocks (excluding navigation). The overlay finishes as soon as assets are ready, or releases on failure/timeout; keyboard and explicit skip controls are available. No JavaScript keeps it hidden, and reduced-motion disables its animation. Existing GSAP scenes, reverse scrubbing, face analysis, tab handlers, and chapter effects are retained.

## Verification

Results are recorded in `qa/elvitha/acceptance.json` and `qa/elvitha/routes.json` by `scripts/elvitha-acceptance.mjs`. Final validation passed: TypeScript (tsc --noEmit), production vinext build, all 52 HTML routes, XML sitemap, 46 journal image URLs, 40 integrated production acceptance checks, 13 focused intro checks, 15 supplied-portrait/face-analysis checks, and 4 entrance-film checks. Desktop1440 and mobile390/360 layouts have no horizontal overflow; portrait checks also cover768. Runtime checks recorded no page errors. The Cloudflare Worker production artifact was served through vite preview on port3003; plain vinext start cannot run the cloudflare: modules in this existing Worker-targeted project. Both original and rebranded video assets return200 to Range requests in local Worker preview, preserving baseline behavior; the existing blob-based player passed forward/reverse/idle seeking checks.
