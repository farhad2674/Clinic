> Portrait revision, 10 October 2026: current casting and selected assets are documented in [ELVITHA-PORTRAIT-DIVERSITY.md](ELVITHA-PORTRAIT-DIVERSITY.md); earlier portrait descriptions below are historical.

# ELVITHA featured service portraits

Created 10 October 2026 with the built-in image_gen tool, following the requested elora-blog-imagery skill.

## Scope

The four featured homepage cards and their matching service pages use these portraits: PRP, mesogel, cell-based methods and regenerative medicine. Existing journal covers, method-comparison images, category artwork and other service guides retain their existing images.

## Art direction and provenance

Each image was generated independently using its existing topic still life as the visual reference. The portraits show clearly adult models with natural skin texture and silk scarves folded into headbands (تل), with visible hair and modest high-neck clothing. PRP retains champagne glass, blank papers and a magnifying glass; mesogel retains clear gel, frosted glass and linen; cell-based methods retain three ivory ceramic forms and a blush background; regenerative medicine retains a woven paper sculpture, travertine and translucent blush paper.

The imagery is conceptual, not a patient photograph, treatment result or scientific diagram. Each detail-page caption states this in Persian. No embedded text, branding or medical procedure is depicted.

## Saved files

- Selected original PNGs: assets/elvitha-services/{prp,mesogel,cell-based,regenerative}.png, 1254 × 1254. Originals are retained locally under the existing ignored assets directory.
- Full WebP: public/media/services-elvitha/<slug>.webp, 1254 × 1254, without upscaling.
- Card WebP: public/media/services-elvitha/<slug>-800.webp, 800 × 800.
- Exact final prompts, reference/source paths, dimensions, hashes, Persian alt text and review: docs/service-image-prompts.json.
- Runtime mapping: lib/service-images.ts.
- Rebuild derivatives: node scripts/prepare-service-images.mjs, using the bundled Sharp runtime.

## Display and validation

Homepage cards use responsive sources and lazy loading. The focal point is top center so scarves and faces remain visible. Mobile card frames are square to preserve the service-specific foreground objects. Detail pages retain the existing arched frame and motion behavior.

- TypeScript: node node_modules/typescript/bin/tsc --noEmit — passed.
- Production build: node node_modules/vinext/dist/cli.js build — passed.
- 57 browser checks passed: homepage and four detail pages at 1440, 390 and 360 pixels; normal and reduced motion; image loading, correct mapping, captions, mobile square crops, overflow and preservation of the journal/other-service mappings.
- No browser runtime errors.
- QA results: qa/service-portraits/results.json. Screenshots: qa/service-portraits/.
- Local preview: http://127.0.0.1:3014/. No deployment performed.
