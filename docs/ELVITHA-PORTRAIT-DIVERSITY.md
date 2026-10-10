# ELVITHA portrait diversity refresh

10 October 2026. Supersedes the portrait selections in the earlier service and editorial imagery notes.

## Current direction

The owner requested visibly different faces, hairstyles, expressions, postures and clothes, then refined the casting toward contemporary Iranian and Arab women. The selected set contains no white or gray hair and no elderly-looking models. The 45+ guide uses a polished dark-haired middle-aged model. Two featured portraits include subtle fuller-lip and cheek-contour styling as individual appearances, with no treatment-result claim.

Scarf headbands, soft natural light, warm ivory/blush/stone sets and service-specific objects remain. Skin texture, marks and condition-related details are retained where the content calls for them. All images remain clearly labelled as AI-generated conceptual illustrations on detail pages.

## Files and integration

- Exact selected prompts, final edit prompt, sources, hashes, dimensions and derivatives: docs/portrait-diversity-prompts.json.
- Original selected PNGs: assets/elvitha-portraits-v2/.
- Four service covers and 800-pixel thumbnails: public/media/services-elvitha/ with -v2 suffixes.
- Nine supporting covers and thumbnails: public/media/editorial-elvitha/ with -v2 suffixes.
- Runtime maps: lib/service-images.ts, lib/editorial-image-updates.ts; shared category references updated in lib/site.ts.
- The existing preparation scripts now respect each manifest entry’s explicit source and thumbnail URLs, keeping versioned assets reproducible.
- Earlier images and prompt snapshots remain in the project. Versioned URLs prevent cached earlier portraits from appearing after reload.

Generated with the built-in image_gen tool using the elora-blog-imagery skill. Originals and large derivatives are 1254 × 1254; thumbnails are 800 × 800. No upscaling.

## Selected covers

| Asset | Placement |
| --- | --- |
| prp | Featured homepage service and matching detail page |
| mesogel | Featured homepage service and matching detail page |
| cell-based | Featured homepage service and matching detail page |
| regenerative | Featured homepage service and matching detail page |
| prp-for-hair-loss | Related article/service guide and shared category references |
| acne-marks-vs-scars | Related article/service guide and shared category references |
| natural-rejuvenation | Related article/service guide and shared category references |
| skin-after-45 | Related article/service guide and shared category references |
| elvitha-natural-beauty | Related article/service guide and shared category references |
| vitiligo-cell-therapy | Related article/service guide and shared category references |
| different-treatment-results | Related article/service guide and shared category references |
| pigmentation | Related article/service guide and shared category references |
| scalp-health | Related article/service guide and shared category references |

## Verification

TypeScript typecheck and production build passed. 200 browser assertions passed (46 featured-service checks and 154 editorial/site checks), with zero browser runtime errors. All 52 site routes and 36 referenced media resolved. Featured services were checked at 1440, 390 and 360 pixels, including animated tabs; article and category covers at 1440 and 390 pixels. Content-file hashes confirm article and treatment copy remained unchanged.

The complete set was visually inspected for individual appearance, anatomy, skin texture, scarf/head cropping and embedded text. The crop review and actual rendered screenshots are saved under qa/portrait-diversity/. Relevant still-life research covers, hero film and other brand assets were retained. No publication was performed.
