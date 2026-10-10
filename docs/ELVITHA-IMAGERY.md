# ELVITHA journal imagery

> Follow-up content-image audit: selected covers and their related-page mappings have been refreshed. See [ELVITHA-IMAGE-AUDIT.md](ELVITHA-IMAGE-AUDIT.md) and [editorial-image-refresh-prompts.json](editorial-image-refresh-prompts.json). The collection below is preserved as the original generation record.

Created 10 October 2026 with the built-in image_gen tool. Every cover was generated independently from a separate subject brief. This collection replaces the previous journal imagery; no existing portrait, model identity, or old blog cover was used as an input.

## Art direction

Warm ivory, powder pink and warm stone; tactile editorial still lifes and conceptual material studies. Soft daylight, real-looking paper, cloth, ceramic, glass and stone. Each subject addresses the article question. Research imagery is an artistic metaphor, not an anatomical figure, product endorsement or treatment result. The design intentionally contains no people, lettering, logos, before-and-after imagery, needles or blood.

## Files and display

- Original PNGs: assets/elvitha-journal/<slug>.png, all 1254 × 1254.
- Large WebP: public/media/journal-elvitha/<slug>.webp, 1254 × 1254; source preserved without artificial upscaling to 1600.
- Card WebP: public/media/journal-elvitha/<slug>-800.webp, 800 × 800.
- Runtime map: lib/journal-images.ts; all 23 slugs have independent src and thumbnail paths and Persian alt text.
- Full provenance and exact prompts: assets/elvitha-journal/manifest.json.
- Local derivative helper: assets/elvitha-journal/prepare.mjs (uses bundled sharp; run from the app root).
- Visual QA: assets/elvitha-journal/contact-sheet.jpg and crop-review.jpg.

Covers use a central focal point, 50% 50%. The crop sheet checks the actual 4:3 journal-card and 4:5 desktop-article frame ratios. Mobile article covers use the uncropped square. Inspection accepted all 23 images: main subjects remain readable, material details are plausible, no accidental text or faces, and each article has a distinct composition.

Visible caption: «تصویر مفهومی ساخته‌شده با هوش مصنوعی برای همراهی با موضوع مقاله.» This identifies image provenance independently of editorial or medical review status.

Reuse is deliberate only where a homepage card or related service introduces the same article/topic. Different journal slugs never share a source image. Previous files remain on disk for historical provenance and unrelated existing uses.

## Validation

- 23 original images and 23 unique SHA-256 hashes.
- 46 derivatives decoded successfully during preparation.
- All large images are 1254 × 1254 and all thumbnails are 800 × 800.
- Combined large-WebP payload: 4.04 MiB.
- Combined thumbnail payload: 1.63 MiB; maximum thumbnail 147 KiB.
- Visual contact sheet and 4:3/4:5 crop sheet reviewed. Browser route, responsive and integration checks are recorded by the project orchestrator.

## Article-specific briefs and outputs

### prp-for-hair-loss

Central question/theme: Choosing care for hair loss; wooden comb and loose hair.

Persian alt: شانه چوبی و دسته‌ای از تارهای طبیعی مو روی پارچه روشن

Original: assets/elvitha-journal/prp-for-hair-loss.png

Large: public/media/journal-elvitha/prp-for-hair-loss.webp (1254 × 1254, 283 KiB)

Card: public/media/journal-elvitha/prp-for-hair-loss-800.webp (800 × 800, 123 KiB)

Focal point: 50% 50%. Review: Accepted: distinct topic-specific subject, no models/text/logos/result claims, center composition readable in portrait and landscape crops.

Exact independent generation prompt:

> Use case: photorealistic-natural. Asset type: new ELVITHA skin and hair journal cover, square 1:1 editorial photograph. Primary request: a quiet material study about choosing care for hair loss. Scene: warm white limestone surface with a single polished dark wooden wide-tooth comb and one graceful loose lock of natural dark hair arranged as an open arc on an ivory cotton swatch, subtle paper edge underneath. The hair must look like loose human hair fibers, not a wig or a before/after claim. Composition: simple central sculptural arrangement with generous breathing room and all key objects inside central 65 percent for both horizontal and portrait crops. Lighting: directional diffused daylight, rich gentle shadows, tactile luxury editorial photography. Palette: #FBFAF8 warm ivory, #F3DFE3 powder pink in tiny cloth detail, warm stone #D9D3CE, natural dark brown. No people, no face, no scalp, no syringe, no flowers, no text, no logos, no watermark, no medical efficacy imagery.

### acne-marks-vs-scars

Central question/theme: How skin color marks differ from texture changes.

Persian alt: دو قطعه سرامیک صورتی با تفاوت رنگ سطح و فرورفتگی‌های ظریف

Original: assets/elvitha-journal/acne-marks-vs-scars.png

Large: public/media/journal-elvitha/acne-marks-vs-scars.webp (1254 × 1254, 199 KiB)

Card: public/media/journal-elvitha/acne-marks-vs-scars-800.webp (800 × 800, 79 KiB)

Focal point: 50% 50%. Review: Accepted: distinct topic-specific subject, no models/text/logos/result claims, center composition readable in portrait and landscape crops.

Exact independent generation prompt:

> Use case: photorealistic-natural. Asset type: a brand-new square 1:1 cover for the ELVITHA Persian skin and hair journal. Art direction: refined tactile editorial still life, quiet material study photographed on warm ivory plaster or limestone, powder pink and warm stone accents, diffused directional daylight, realistic finely resolved materials and gentle dimensional shadows. Keep key objects within central 65 percent of frame, generous calm surrounding negative space, suitable for horizontal and portrait crop. No people, no faces, no old models, no flowers, no words or lettering, no numbers, no labels, no logos or watermark, no before-after or medical efficacy claims, no needles or blood. Subject: two abstract blush ceramic tiles, one smooth with irregular softly colored pink pigment washes, the other unpigmented ivory with gentle shallow dimples and natural tactile relief. Arrange at a slight angle, different heights. This is a purely artistic material metaphor for color versus texture, not a model of actual skin or a diagram. Close angled macro, no split screen, no hands.

### teen-acne

Central question/theme: A simple approachable teenage acne care routine.

Persian alt: کیف پارچه‌ای ساده، شوینده بدون نوشته و دفتر کوچک مراقبت پوست

Original: assets/elvitha-journal/teen-acne.png

Large: public/media/journal-elvitha/teen-acne.webp (1254 × 1254, 186 KiB)

Card: public/media/journal-elvitha/teen-acne-800.webp (800 × 800, 68 KiB)

Focal point: 50% 50%. Review: Accepted: distinct topic-specific subject, no models/text/logos/result claims, center composition readable in portrait and landscape crops.

Exact independent generation prompt:

> Use case: photorealistic-natural. Asset type: a brand-new square 1:1 cover for the ELVITHA Persian skin and hair journal. Art direction: refined tactile editorial still life, quiet material study photographed on warm ivory plaster or limestone, powder pink and warm stone accents, diffused directional daylight, realistic finely resolved materials and gentle dimensional shadows. Keep key objects within central 65 percent of frame, generous calm surrounding negative space, suitable for horizontal and portrait crop. No people, no faces, no old models, no flowers, no words or lettering, no numbers, no labels, no logos or watermark, no before-after or medical efficacy claims, no needles or blood. Subject: a pale blush zippered cotton washbag lying open with one matte ivory pump cleanser and a plain small blank kraft notebook beside it, a clean terry cotton band neatly looped in the foreground. Approachable youthful practical everyday skincare, uncluttered still life with crisp material detail. No makeup, no glamour, no injectables.

### natural-rejuvenation

Central question/theme: Preserving individual character in natural rejuvenation.

Persian alt: مجسمه انتزاعی سرامیکی با خطوط نرم و انعکاس آرام در آینه

Original: assets/elvitha-journal/natural-rejuvenation.png

Large: public/media/journal-elvitha/natural-rejuvenation.webp (1254 × 1254, 99 KiB)

Card: public/media/journal-elvitha/natural-rejuvenation-800.webp (800 × 800, 44 KiB)

Focal point: 50% 50%. Review: Accepted: distinct topic-specific subject, no models/text/logos/result claims, center composition readable in portrait and landscape crops.

Exact independent generation prompt:

> Use case: photorealistic-natural. Asset type: a brand-new square 1:1 cover for the ELVITHA Persian skin and hair journal. Art direction: refined tactile editorial still life, quiet material study photographed on warm ivory plaster or limestone, powder pink and warm stone accents, diffused directional daylight, realistic finely resolved materials and gentle dimensional shadows. Keep key objects within central 65 percent of frame, generous calm surrounding negative space, suitable for horizontal and portrait crop. No people, no faces, no old models, no flowers, no words or lettering, no numbers, no labels, no logos or watermark, no before-after or medical efficacy claims, no needles or blood. Subject: a single asymmetric softly curved hand-built ivory ceramic sculpture, abstract folded arch with delicate surface marks, beside a small oval frameless mirror laying at an angle and reflecting only the sculpture. Preserve visible hand-built irregularity. A thoughtful artistic metaphor for personal character, not a face or human anatomy. Low eye-level elegant composition.

### prp-vs-prf

Central question/theme: Comparing preparation and material structure.

Persian alt: دو قطعه شیشه با بافت روان و شبکه‌ای روی پایه سنگی

Original: assets/elvitha-journal/prp-vs-prf.png

Large: public/media/journal-elvitha/prp-vs-prf.webp (1254 × 1254, 135 KiB)

Card: public/media/journal-elvitha/prp-vs-prf-800.webp (800 × 800, 56 KiB)

Focal point: 50% 50%. Review: Accepted: distinct topic-specific subject, no models/text/logos/result claims, center composition readable in portrait and landscape crops.

Exact independent generation prompt:

> Use case: photorealistic-natural. Asset type: a brand-new square 1:1 cover for the ELVITHA Persian skin and hair journal. Art direction: refined tactile editorial still life, quiet material study photographed on warm ivory plaster or limestone, powder pink and warm stone accents, diffused directional daylight, realistic finely resolved materials and gentle dimensional shadows. Keep key objects within central 65 percent of frame, generous calm surrounding negative space, suitable for horizontal and portrait crop. No people, no faces, no old models, no flowers, no words or lettering, no numbers, no labels, no logos or watermark, no before-after or medical efficacy claims, no needles or blood. Subject: a sculptural pair of thick clear art-glass discs standing on a small horizontal limestone plinth; one disc perfectly transparent pale champagne with smooth flowing swirl, other disc contains an extremely delicate ivory fibrous lattice suspended inside. A restrained material contrast about differing structures, explicitly non-anatomical art objects. Do not make tubes or specimens. Front three-quarter view.

### exosomes-evidence

Central question/theme: Researching extracellular communication.

Persian alt: ترکیب مفهومی عدسی شیشه‌ای و نقاط کوچک نیمه‌شفاف روی کاغذ

Original: assets/elvitha-journal/exosomes-evidence.png

Large: public/media/journal-elvitha/exosomes-evidence.webp (1254 × 1254, 152 KiB)

Card: public/media/journal-elvitha/exosomes-evidence-800.webp (800 × 800, 64 KiB)

Focal point: 50% 50%. Review: Accepted: distinct topic-specific subject, no models/text/logos/result claims, center composition readable in portrait and landscape crops.

Exact independent generation prompt:

> Use case: photorealistic-natural. Asset type: a brand-new square 1:1 cover for the ELVITHA Persian skin and hair journal. Art direction: refined tactile editorial still life, quiet material study photographed on warm ivory plaster or limestone, powder pink and warm stone accents, diffused directional daylight, realistic finely resolved materials and gentle dimensional shadows. Keep key objects within central 65 percent of frame, generous calm surrounding negative space, suitable for horizontal and portrait crop. No people, no faces, no old models, no flowers, no words or lettering, no numbers, no labels, no logos or watermark, no before-after or medical efficacy claims, no needles or blood. Subject: a large clear optical glass loupe lying on unprinted ivory cotton paper, bringing several tiny translucent rose glass beads into focus within its circular view, with other beads softly outside. Reflections must be physically plausible. Conceptual inquiry and observation; not a biological model or laboratory specimen. Near top-down with optical depth.

### different-treatment-results

Central question/theme: Individual differences and personalized treatment goals.

Persian alt: سه سنگ روشن با بافت و اندازه متفاوت روی پارچه صورتی کم‌رنگ

Original: assets/elvitha-journal/different-treatment-results.png

Large: public/media/journal-elvitha/different-treatment-results.webp (1254 × 1254, 160 KiB)

Card: public/media/journal-elvitha/different-treatment-results-800.webp (800 × 800, 69 KiB)

Focal point: 50% 50%. Review: Accepted: distinct topic-specific subject, no models/text/logos/result claims, center composition readable in portrait and landscape crops.

Exact independent generation prompt:

> Use case: photorealistic-natural. Asset type: a brand-new square 1:1 cover for the ELVITHA Persian skin and hair journal. Art direction: refined tactile editorial still life, quiet material study photographed on warm ivory plaster or limestone, powder pink and warm stone accents, diffused directional daylight, realistic finely resolved materials and gentle dimensional shadows. Keep key objects within central 65 percent of frame, generous calm surrounding negative space, suitable for horizontal and portrait crop. No people, no faces, no old models, no flowers, no words or lettering, no numbers, no labels, no logos or watermark, no before-after or medical efficacy claims, no needles or blood. Subject: three naturally weathered pale stones with distinctly different textures and shapes, arranged as a loose open triangle on one softly draped blush linen sheet. One porous limestone, one smooth ivory pebble, one softly veined warm marble. Visual metaphor for individual differences. Balanced central grouping, tactile low angle, no plant or extra ornament.

### questions-before-fillers

Central question/theme: A prepared and thoughtful discussion about fillers.

Persian alt: دفتر باز بدون نوشته، مداد و آینه دستی روی میز روشن

Original: assets/elvitha-journal/questions-before-fillers.png

Large: public/media/journal-elvitha/questions-before-fillers.webp (1254 × 1254, 123 KiB)

Card: public/media/journal-elvitha/questions-before-fillers-800.webp (800 × 800, 47 KiB)

Focal point: 50% 50%. Review: Accepted: distinct topic-specific subject, no models/text/logos/result claims, center composition readable in portrait and landscape crops.

Exact independent generation prompt:

> Use case: photorealistic-natural. Asset type: a brand-new square 1:1 cover for the ELVITHA Persian skin and hair journal. Art direction: refined tactile editorial still life, quiet material study photographed on warm ivory plaster or limestone, powder pink and warm stone accents, diffused directional daylight, realistic finely resolved materials and gentle dimensional shadows. Keep key objects within central 65 percent of frame, generous calm surrounding negative space, suitable for horizontal and portrait crop. No people, no faces, no old models, no flowers, no words or lettering, no numbers, no labels, no logos or watermark, no before-after or medical efficacy claims, no needles or blood. Subject: an open ivory notebook with completely blank pages, a slender champagne metal pencil across its center crease, and the handle of a small brushed-metal hand mirror with the mirror facing upward reflecting window light only. Objects arranged diagonally, warm stone desk. Thoughtful decision preparation. No injection devices, no treatment scene, no makeup.

### before-after-photos

Central question/theme: Understanding lighting and consistency in clinical photographs.

Persian alt: لنز دوربین، کارت خاکستری ساده و قاب نور روی سطح روشن

Original: assets/elvitha-journal/before-after-photos.png

Large: public/media/journal-elvitha/before-after-photos.webp (1254 × 1254, 98 KiB)

Card: public/media/journal-elvitha/before-after-photos-800.webp (800 × 800, 36 KiB)

Focal point: 50% 50%. Review: Accepted: distinct topic-specific subject, no models/text/logos/result claims, center composition readable in portrait and landscape crops.

Exact independent generation prompt:

> Use case: photorealistic-natural. Asset type: a brand-new square 1:1 cover for the ELVITHA Persian skin and hair journal. Art direction: refined tactile editorial still life, quiet material study photographed on warm ivory plaster or limestone, powder pink and warm stone accents, diffused directional daylight, realistic finely resolved materials and gentle dimensional shadows. Keep key objects within central 65 percent of frame, generous calm surrounding negative space, suitable for horizontal and portrait crop. No people, no faces, no old models, no flowers, no words or lettering, no numbers, no labels, no logos or watermark, no before-after or medical efficacy claims, no needles or blood. Subject: a vintage-style compact camera lens standing upright without visible branding, a blank matte medium-gray photographic card propped nearby, and a rectangular shaft of soft window light crossing the tabletop. The lens is glass and silver metal with realistic reflections but no text or numbers. Article about photograph conditions, not patient result. Minimal centered composition.

### skin-after-45

Central question/theme: Everyday comfort and evolving skin needs with age.

Persian alt: پارچه ابریشمی چین‌دار کنار ظرف کرم ساده و سنگ روشن

Original: assets/elvitha-journal/skin-after-45.png

Large: public/media/journal-elvitha/skin-after-45.webp (1254 × 1254, 157 KiB)

Card: public/media/journal-elvitha/skin-after-45-800.webp (800 × 800, 69 KiB)

Focal point: 50% 50%. Review: Accepted: distinct topic-specific subject, no models/text/logos/result claims, center composition readable in portrait and landscape crops.

Exact independent generation prompt:

> Use case: photorealistic-natural. Asset type: a brand-new square 1:1 cover for the ELVITHA Persian skin and hair journal. Art direction: refined tactile editorial still life, quiet material study photographed on warm ivory plaster or limestone, powder pink and warm stone accents, diffused directional daylight, realistic finely resolved materials and gentle dimensional shadows. Keep key objects within central 65 percent of frame, generous calm surrounding negative space, suitable for horizontal and portrait crop. No people, no faces, no old models, no flowers, no words or lettering, no numbers, no labels, no logos or watermark, no before-after or medical efficacy claims, no needles or blood. Subject: an elegant ivory silk fabric with natural relaxed ripples and visible weave, a small unlabeled warm stone ceramic moisturizer pot with lid leaning against it, and a single smooth pale stone. Rich material character, age-positive metaphor through beautiful natural folds; no human, no skin or age erasure. Close low angle still life.

### regenerative-medicine

Central question/theme: Understanding scaffolds and repair concepts in regenerative research.

Persian alt: سازه مشبک دست‌ساز از کاغذ روشن با سایه‌های ظریف

Original: assets/elvitha-journal/regenerative-medicine.png

Large: public/media/journal-elvitha/regenerative-medicine.webp (1254 × 1254, 159 KiB)

Card: public/media/journal-elvitha/regenerative-medicine-800.webp (800 × 800, 68 KiB)

Focal point: 50% 50%. Review: Accepted: distinct topic-specific subject, no models/text/logos/result claims, center composition readable in portrait and landscape crops.

Exact independent generation prompt:

> Use case: photorealistic-natural. Asset type: a brand-new square 1:1 cover for the ELVITHA Persian skin and hair journal. Art direction: refined tactile editorial still life, quiet material study photographed on warm ivory plaster or limestone, powder pink and warm stone accents, diffused directional daylight, realistic finely resolved materials and gentle dimensional shadows. Keep key objects within central 65 percent of frame, generous calm surrounding negative space, suitable for horizontal and portrait crop. No people, no faces, no old models, no flowers, no words or lettering, no numbers, no labels, no logos or watermark, no before-after or medical efficacy claims, no needles or blood. Subject: a small architectural scaffold sculpture handmade from interlocking ivory paper strips, airy open lattice with a gently curved silhouette on a warm limestone block. One pink translucent vellum sheet rests nearby. Material metaphor for tissue engineering research, not an accurate tissue model or evidence of healing. Side light reveals paper fibers.

### cell-therapy-stem-cells

Central question/theme: Understanding cells, origins, and differentiation.

Persian alt: سه فرم گِلی روشن در مراحل متفاوت شکل‌گیری کنار هم

Original: assets/elvitha-journal/cell-therapy-stem-cells.png

Large: public/media/journal-elvitha/cell-therapy-stem-cells.webp (1254 × 1254, 75 KiB)

Card: public/media/journal-elvitha/cell-therapy-stem-cells-800.webp (800 × 800, 32 KiB)

Focal point: 50% 50%. Review: Accepted: distinct topic-specific subject, no models/text/logos/result claims, center composition readable in portrait and landscape crops.

Exact independent generation prompt:

> Use case: photorealistic-natural. Asset type: a brand-new square 1:1 cover for the ELVITHA Persian skin and hair journal. Art direction: refined tactile editorial still life, quiet material study photographed on warm ivory plaster or limestone, powder pink and warm stone accents, diffused directional daylight, realistic finely resolved materials and gentle dimensional shadows. Keep key objects within central 65 percent of frame, generous calm surrounding negative space, suitable for horizontal and portrait crop. No people, no faces, no old models, no flowers, no words or lettering, no numbers, no labels, no logos or watermark, no before-after or medical efficacy claims, no needles or blood. Subject: three small unglazed ivory clay objects arranged from a simple rounded smooth seed-like form to a gently folded form to a delicately branching form. Keep each an obvious handmade abstract art object with pinched-clay texture, a metaphor for potential and specialization, not a cell diagram. Low sculptural viewpoint, soft blush background.

### prp-skin-evidence

Central question/theme: Reading the evidence for platelet products and skin quality.

Persian alt: برگه‌های ساده پژوهش، عدسی و قطعه شیشه شامپاینی روی میز

Original: assets/elvitha-journal/prp-skin-evidence.png

Large: public/media/journal-elvitha/prp-skin-evidence.webp (1254 × 1254, 202 KiB)

Card: public/media/journal-elvitha/prp-skin-evidence-800.webp (800 × 800, 79 KiB)

Focal point: 50% 50%. Review: Accepted: distinct topic-specific subject, no models/text/logos/result claims, center composition readable in portrait and landscape crops.

Exact independent generation prompt:

> Use case: photorealistic-natural. Asset type: a brand-new square 1:1 cover for the ELVITHA Persian skin and hair journal. Art direction: refined tactile editorial still life, quiet material study photographed on warm ivory plaster or limestone, powder pink and warm stone accents, diffused directional daylight, realistic finely resolved materials and gentle dimensional shadows. Keep key objects within central 65 percent of frame, generous calm surrounding negative space, suitable for horizontal and portrait crop. No people, no faces, no old models, no flowers, no words or lettering, no numbers, no labels, no logos or watermark, no before-after or medical efficacy claims, no needles or blood. Subject: a short stack of completely unprinted ivory research papers held by a single smooth translucent pale champagne glass paperweight, with a small magnifying lens partially overlapping one paper edge. Clear evidence-reading metaphor with fine paper fibers and warm refractions. No vial, no syringe, no approval marks. High angle composition.

### mesogel-skin-quality

Central question/theme: Understanding gel materials and skin hydration.

Persian alt: قطره ژل شفاف روی شیشه مات و پارچه روشن

Original: assets/elvitha-journal/mesogel-skin-quality.png

Large: public/media/journal-elvitha/mesogel-skin-quality.webp (1254 × 1254, 222 KiB)

Card: public/media/journal-elvitha/mesogel-skin-quality-800.webp (800 × 800, 91 KiB)

Focal point: 50% 50%. Review: Accepted: distinct topic-specific subject, no models/text/logos/result claims, center composition readable in portrait and landscape crops.

Exact independent generation prompt:

> Use case: photorealistic-natural. Asset type: a brand-new square 1:1 cover for the ELVITHA Persian skin and hair journal. Art direction: refined tactile editorial still life, quiet material study photographed on warm ivory plaster or limestone, powder pink and warm stone accents, diffused directional daylight, realistic finely resolved materials and gentle dimensional shadows. Keep key objects within central 65 percent of frame, generous calm surrounding negative space, suitable for horizontal and portrait crop. No people, no faces, no old models, no flowers, no words or lettering, no numbers, no labels, no logos or watermark, no before-after or medical efficacy claims, no needles or blood. Subject: one large clear gel droplet and a thin translucent gel ribbon on a square frosted-glass slab tilted on a pale stone wedge, beside a softly folded ivory cotton swatch. Macro photograph showing viscosity, clear refraction, moisture and realistic surface tension. This is a conceptual material study not a medical product. No container or branding.

### novel-cellular-methods

Central question/theme: The stages from research idea to evaluated application.

Persian alt: سه قاب کاغذی متوالی با نور و سایه روی سطح سنگی

Original: assets/elvitha-journal/novel-cellular-methods.png

Large: public/media/journal-elvitha/novel-cellular-methods.webp (1254 × 1254, 149 KiB)

Card: public/media/journal-elvitha/novel-cellular-methods-800.webp (800 × 800, 61 KiB)

Focal point: 50% 50%. Review: Accepted: distinct topic-specific subject, no models/text/logos/result claims, center composition readable in portrait and landscape crops.

Exact independent generation prompt:

> Use case: photorealistic-natural. Asset type: a brand-new square 1:1 cover for the ELVITHA Persian skin and hair journal. Art direction: refined tactile editorial still life, quiet material study photographed on warm ivory plaster or limestone, powder pink and warm stone accents, diffused directional daylight, realistic finely resolved materials and gentle dimensional shadows. Keep key objects within central 65 percent of frame, generous calm surrounding negative space, suitable for horizontal and portrait crop. No people, no faces, no old models, no flowers, no words or lettering, no numbers, no labels, no logos or watermark, no before-after or medical efficacy claims, no needles or blood. Subject: three freestanding simple thick ivory paper frames arranged in a receding sequence, progressing from a small circular opening to a medium opening to a wide rectangular opening. Small warm stone path between them. Architectural metaphor for careful research stages, not a clinical success diagram. Refined sculptural composition, three-quarter view.

### vitiligo-cell-therapy

Central question/theme: Understanding pigmentation and selective treatment choices.

Persian alt: قطعه سرامیک با نواحی طبیعی سفید و خاکی در کنار پارچه روشن

Original: assets/elvitha-journal/vitiligo-cell-therapy.png

Large: public/media/journal-elvitha/vitiligo-cell-therapy.webp (1254 × 1254, 311 KiB)

Card: public/media/journal-elvitha/vitiligo-cell-therapy-800.webp (800 × 800, 90 KiB)

Focal point: 50% 50%. Review: Accepted: distinct topic-specific subject, no models/text/logos/result claims, center composition readable in portrait and landscape crops.

Exact independent generation prompt:

> Use case: photorealistic-natural. Asset type: a brand-new square 1:1 cover for the ELVITHA Persian skin and hair journal. Art direction: refined tactile editorial still life, quiet material study photographed on warm ivory plaster or limestone, powder pink and warm stone accents, diffused directional daylight, realistic finely resolved materials and gentle dimensional shadows. Keep key objects within central 65 percent of frame, generous calm surrounding negative space, suitable for horizontal and portrait crop. No people, no faces, no old models, no flowers, no words or lettering, no numbers, no labels, no logos or watermark, no before-after or medical efficacy claims, no needles or blood. Subject: a single handcrafted ceramic oval platter with an organic two-tone matte glaze, warm taupe with irregular soft-edged ivory islands, resting on plain ivory linen. Celebrate distinct pattern, no broken or repaired aesthetic. A respectful abstract pigmentation metaphor, not real skin or treatment result. Close top-down material photograph.

### psoriasis-cell-therapy

Central question/theme: Layers, skin texture, and the research frontier.

Persian alt: لایه‌های نازک کاغذ دست‌ساز با لبه‌های طبیعی و نور نرم

Original: assets/elvitha-journal/psoriasis-cell-therapy.png

Large: public/media/journal-elvitha/psoriasis-cell-therapy.webp (1254 × 1254, 201 KiB)

Card: public/media/journal-elvitha/psoriasis-cell-therapy-800.webp (800 × 800, 81 KiB)

Focal point: 50% 50%. Review: Accepted: distinct topic-specific subject, no models/text/logos/result claims, center composition readable in portrait and landscape crops.

Exact independent generation prompt:

> Use case: photorealistic-natural. Asset type: a brand-new square 1:1 cover for the ELVITHA Persian skin and hair journal. Art direction: refined tactile editorial still life, quiet material study photographed on warm ivory plaster or limestone, powder pink and warm stone accents, diffused directional daylight, realistic finely resolved materials and gentle dimensional shadows. Keep key objects within central 65 percent of frame, generous calm surrounding negative space, suitable for horizontal and portrait crop. No people, no faces, no old models, no flowers, no words or lettering, no numbers, no labels, no logos or watermark, no before-after or medical efficacy claims, no needles or blood. Subject: softly overlapping layers of thick handmade blush and ivory cotton paper with naturally feathered edges and tiny visible paper fibers, arranged into a calm shallow fan on smooth limestone. Pure paper material study about layers and careful observation; no diseased skin, no flaking body, no human, no implied cure. Raking diffused side light.

### lichen-planus-cell-therapy

Central question/theme: Recognizing textured patterns and evaluating early research.

Persian alt: پارچه بافت‌دار یاسی کم‌رنگ و ذره‌بین کوچک روی سنگ روشن

Original: assets/elvitha-journal/lichen-planus-cell-therapy.png

Large: public/media/journal-elvitha/lichen-planus-cell-therapy.webp (1254 × 1254, 329 KiB)

Card: public/media/journal-elvitha/lichen-planus-cell-therapy-800.webp (800 × 800, 147 KiB)

Focal point: 50% 50%. Review: Accepted: distinct topic-specific subject, no models/text/logos/result claims, center composition readable in portrait and landscape crops.

Exact independent generation prompt:

> Use case: photorealistic-natural. Asset type: a brand-new square 1:1 cover for the ELVITHA Persian skin and hair journal. Art direction: refined tactile editorial still life, quiet material study photographed on warm ivory plaster or limestone, powder pink and warm stone accents, diffused directional daylight, realistic finely resolved materials and gentle dimensional shadows. Keep key objects within central 65 percent of frame, generous calm surrounding negative space, suitable for horizontal and portrait crop. No people, no faces, no old models, no flowers, no words or lettering, no numbers, no labels, no logos or watermark, no before-after or medical efficacy claims, no needles or blood. Subject: a small swatch of finely woven muted dusty-lilac textile with a subtle raised grid pattern, an ivory cotton swatch underneath, and a small circular glass magnifier over one corner. The precise tactile weave remains visible. A conceptual observation still life distinct from skin; no lesions, no clinical specimen. Tight top-down, lilac is a restrained accent.

### autoimmunity-after-covid

Central question/theme: Distinguishing statistical associations and mechanisms.

Persian alt: دو حلقه نخ روشن با بخشی هم‌پوشان روی صفحه سنگی

Original: assets/elvitha-journal/autoimmunity-after-covid.png

Large: public/media/journal-elvitha/autoimmunity-after-covid.webp (1254 × 1254, 128 KiB)

Card: public/media/journal-elvitha/autoimmunity-after-covid-800.webp (800 × 800, 52 KiB)

Focal point: 50% 50%. Review: Accepted: distinct topic-specific subject, no models/text/logos/result claims, center composition readable in portrait and landscape crops.

Exact independent generation prompt:

> Use case: photorealistic-natural. Asset type: a brand-new square 1:1 cover for the ELVITHA Persian skin and hair journal. Art direction: refined tactile editorial still life, quiet material study photographed on warm ivory plaster or limestone, powder pink and warm stone accents, diffused directional daylight, realistic finely resolved materials and gentle dimensional shadows. Keep key objects within central 65 percent of frame, generous calm surrounding negative space, suitable for horizontal and portrait crop. No people, no faces, no old models, no flowers, no words or lettering, no numbers, no labels, no logos or watermark, no before-after or medical efficacy claims, no needles or blood. Subject: two fine ivory cotton cords forming separate open circles with one small overlap on a warm stone surface, a pale pink translucent vellum sheet placed beneath only the crossing. Minimal material metaphor for relationship and interpretation, not a medical diagram. Crisp soft shadows, elegantly imperfect cord fibers, central square composition.

### exosomes-vs-stem-cells

Central question/theme: Comparing extracellular particles and whole cells conceptually.

Persian alt: حباب شیشه‌ای توخالی و خوشه دانه‌های شیشه‌ای کوچک روی پایه روشن

Original: assets/elvitha-journal/exosomes-vs-stem-cells.png

Large: public/media/journal-elvitha/exosomes-vs-stem-cells.webp (1254 × 1254, 110 KiB)

Card: public/media/journal-elvitha/exosomes-vs-stem-cells-800.webp (800 × 800, 43 KiB)

Focal point: 50% 50%. Review: Accepted: distinct topic-specific subject, no models/text/logos/result claims, center composition readable in portrait and landscape crops.

Exact independent generation prompt:

> Use case: photorealistic-natural. Asset type: a brand-new square 1:1 cover for the ELVITHA Persian skin and hair journal. Art direction: refined tactile editorial still life, quiet material study photographed on warm ivory plaster or limestone, powder pink and warm stone accents, diffused directional daylight, realistic finely resolved materials and gentle dimensional shadows. Keep key objects within central 65 percent of frame, generous calm surrounding negative space, suitable for horizontal and portrait crop. No people, no faces, no old models, no flowers, no words or lettering, no numbers, no labels, no logos or watermark, no before-after or medical efficacy claims, no needles or blood. Subject: one large hollow frosted ivory glass ovoid sculpture beside a sparse cluster of much smaller transparent rose glass droplets on a single simple limestone block. Make the forms visibly art glass, not accurate biology. A clear quiet comparison of scales and roles, not efficacy. Front oblique view, no dish, no lab props.

### consultation-preparation

Central question/theme: Preparing personal questions and history for consultation.

Persian alt: دفترچه بسته، کارت‌های یادداشت بدون نوشته و مداد روی میز

Original: assets/elvitha-journal/consultation-preparation.png

Large: public/media/journal-elvitha/consultation-preparation.webp (1254 × 1254, 299 KiB)

Card: public/media/journal-elvitha/consultation-preparation-800.webp (800 × 800, 109 KiB)

Focal point: 50% 50%. Review: Accepted: distinct topic-specific subject, no models/text/logos/result claims, center composition readable in portrait and landscape crops.

Exact independent generation prompt:

> Use case: photorealistic-natural. Asset type: a brand-new square 1:1 cover for the ELVITHA Persian skin and hair journal. Art direction: refined tactile editorial still life, quiet material study photographed on warm ivory plaster or limestone, powder pink and warm stone accents, diffused directional daylight, realistic finely resolved materials and gentle dimensional shadows. Keep key objects within central 65 percent of frame, generous calm surrounding negative space, suitable for horizontal and portrait crop. No people, no faces, no old models, no flowers, no words or lettering, no numbers, no labels, no logos or watermark, no before-after or medical efficacy claims, no needles or blood. Subject: a closed linen-bound ivory notebook with three small blank blush index cards tucked under a plain elastic band, a simple wooden pencil and a small blank rectangular paper envelope. Orderly personal consultation preparation. Warm stone writing surface, calm angled overhead photograph, all objects central with generous margins.

### elvitha-natural-beauty

Central question/theme: ELVITHA's respect for natural individual character.

Persian alt: شاخه زیتون با سایه طبیعی کنار آینه بیضی روی پارچه روشن

Original: assets/elvitha-journal/elvitha-natural-beauty.png

Large: public/media/journal-elvitha/elvitha-natural-beauty.webp (1254 × 1254, 240 KiB)

Card: public/media/journal-elvitha/elvitha-natural-beauty-800.webp (800 × 800, 106 KiB)

Focal point: 50% 50%. Review: Accepted: distinct topic-specific subject, no models/text/logos/result claims, center composition readable in portrait and landscape crops.

Exact independent generation prompt:

> Use case: photorealistic-natural. Asset type: a brand-new square 1:1 cover for the ELVITHA Persian skin and hair journal. Art direction: refined tactile editorial still life, quiet material study photographed on warm ivory plaster or limestone, powder pink and warm stone accents, diffused directional daylight, realistic finely resolved materials and gentle dimensional shadows. Keep key objects within central 65 percent of frame, generous calm surrounding negative space, suitable for horizontal and portrait crop. No people, no faces, no old models, no flowers, no words or lettering, no numbers, no labels, no logos or watermark, no before-after or medical efficacy claims, no needles or blood. Subject: one delicate olive branch with matte natural green leaves laid alongside a simple oval mirror on beautifully textured undyed linen. The mirror reflects only a close detail of the same olive leaves and soft light, no room or people. Quiet symbol of individual natural character and considered care. Soft ivory, muted green and warm stone palette, generous space.

### everyday-skin-care

Central question/theme: Simple and sustainable everyday skincare steps.

Persian alt: سه ظرف ساده مراقبت پوست کنار حوله پنبه‌ای روشن

Original: assets/elvitha-journal/everyday-skin-care.png

Large: public/media/journal-elvitha/everyday-skin-care.webp (1254 × 1254, 119 KiB)

Card: public/media/journal-elvitha/everyday-skin-care-800.webp (800 × 800, 53 KiB)

Focal point: 50% 50%. Review: Accepted: distinct topic-specific subject, no models/text/logos/result claims, center composition readable in portrait and landscape crops.

Exact independent generation prompt:

> Use case: photorealistic-natural. Asset type: a brand-new square 1:1 cover for the ELVITHA Persian skin and hair journal. Art direction: refined tactile editorial still life, quiet material study photographed on warm ivory plaster or limestone, powder pink and warm stone accents, diffused directional daylight, realistic finely resolved materials and gentle dimensional shadows. Keep key objects within central 65 percent of frame, generous calm surrounding negative space, suitable for horizontal and portrait crop. No people, no faces, no old models, no flowers, no words or lettering, no numbers, no labels, no logos or watermark, no before-after or medical efficacy claims, no needles or blood. Subject: three unbranded and entirely unlettered daily skincare containers of different simple forms: an ivory pump cleanser bottle, a low warm stone moisturizer jar, and a small matte powder-pink sunscreen tube with cap. Placed as an informal triangle beside a folded ivory terry towel. Practical beautiful daily ritual, no decorative plants or elaborate props. Soft side daylight.
