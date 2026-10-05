# ELORA media inventory

## Supplied assets

- Video A: 1-gen-vid-1790420364-jRD9JKw0jPXyCBn9im4c-0.mp4, 1280x720, 24fps, approximately 6.08 seconds. It begins in the lounge, not the corridor. Used in the entrance chapter after a crossfade from the supplied corridor still.
- Video B: 2-gen-vid-1790420714-EXLx5fRR8aEIoA6DmtQf-0.mp4, 720x1280, 24fps, approximately 8.10 seconds. Used in the understanding chapter.
- Both source films are preserved in C:/clinicwebsite/.codex-remote-attachments/01a0dd06-1eb3-7580-934e-ea9b877b186f/5479c295-8359-453c-b9de-23d67671e008/.
- The three supplied clinic concept images are approximately 1672x941 and are preserved in the user's Downloads.
- No artificial upscaling was applied. The films' source resolution sets their detail ceiling.

## Web derivatives

The entrance film remains under public/media/entrance.mp4. The older portrait.mp4 derivative was removed from public after the supplied portrait became the active film.
public/media/entrance-poster.webp and the active supplied-poster.webp are frames extracted from their matching films. The older portrait poster was removed from public.
public/media/corridor.webp, lounge.webp and brand-space.webp: quality-85 derivatives of the supplied concept interiors.
public/media/hair.webp and mature.webp: quality-86 derivatives of the initial two generated editorial assets.
public/media/young-scarf.webp and young-natural.webp: optimized WebP derivatives of the two new generated editorial portraits.

The portrait still was extracted from Video B instead of generating an inconsistent second person.
No generated image represents a clinician, patient, treatment result, or real clinic photograph.

## Image generation

Tool: built-in image_gen. Each of the four editorial assets was generated in one request, with no variant/retry cycle.

### Hair — exact prompt

Create one photorealistic editorial photograph for ELORA, a refined Persian skin and hair clinic website. Close study of healthy but natural dark brown hair on an adult Iranian woman, viewed from behind at a gentle three-quarter angle, elegant long hair curving across an ivory blouse, a small realistic visible scalp part, no exposed body, no text. Soft warm daylight against a seamless near-white #FBFAF8 background, very pale blush undertone, sophisticated quiet fashion editorial lighting, tactile strands, absolutely no plastic retouching or before-and-after. Portrait 4:5 composition, head in upper middle with breathing room. This is an illustrative model, not a patient or treatment result. Deliver a clean standalone high-resolution photograph.

Original generated output: C:/Users/Farhad/.codex/generated_images/01a0dd06-1eb3-7580-934e-ea9b877b186f/exec-18bab8e3-937e-4f10-b0b4-730ab267d198.png
Project asset: public/media/hair.webp

### Mature portrait — exact prompt

Create one photorealistic editorial portrait for ELORA, a refined Persian skin and hair clinic website. An Iranian woman around 55 with naturally silver-streaked dark hair loosely swept back, authentic visible fine lines and realistic skin texture, quietly confident warm expression, subtle smile, looking slightly past camera, elegant modest ivory high-neck blouse. Chest-up portrait with complete head and generous breathing room, pale blush #F8ECEE seamless studio background, soft diffused daylight, refined magazine photography, warm natural skin tones, no beauty retouching or de-aging. Portrait 4:5. No text, no jewelry glare, no medical equipment. Illustrative model, not a patient or treatment result. Deliver one clean high-resolution photograph.

Original generated output: C:/Users/Farhad/.codex/generated_images/01a0dd06-1eb3-7580-934e-ea9b877b186f/exec-9452c94d-fb00-45d4-bd5e-cc0ddfd98edf.png
Project asset: public/media/mature.webp


### Young scarf portrait — exact prompt

Create one photorealistic editorial portrait for the Persian RTL Elora beauty-clinic website. Subject: a 20-year-old adult Iranian woman with natural skin texture, light hazel-green eyes, subtly full lips and softly rounded cheeks suggesting a conservative filler aesthetic without exaggeration. She wears a beautifully designed multicolor patterned silk headscarf in warm coral, muted teal and cream; she looks off to the side in a calm three-quarter view. Soft window daylight, pale blush and warm-ivory studio setting, refined magazine photography, realistic facial asymmetry and pores, no beauty retouching, no flawless plastic skin. Vertical 4:5 composition, chest-up with complete head and generous space around her. No text, no logo, no medical equipment, no before-and-after implications. Illustrative adult model, not a patient.

Original generated output: C:/Users/Farhad/.codex/generated_images/01a0dd28-54b7-70b0-880c-3f1dfdb9cb8e/exec-15af38f4-57a8-4d7d-a261-b588cd49ee11.png

Project asset: public/media/young-scarf.webp

### Young natural portrait — exact prompt

Create one photorealistic editorial portrait for the Persian RTL Elora beauty-clinic website. Subject: a 25-year-old adult Iranian woman with natural, unretouched beauty, dark expressive eyes, dark hair styled simply, visible realistic skin texture and small human imperfections, relaxed confident expression, looking to the side in three-quarter profile. The portrait should feel candid, warm, and attainable rather than perfectionist or glamorous. Soft diffused daylight, neutral ivory clothing, pale powder-pink and warm stone backdrop, refined editorial photography. Vertical 4:5 composition, chest-up with complete head and negative space for a website card. No text, no logo, no medical equipment, no before-and-after implication. Illustrative adult model, not a patient.

Original generated output: C:/Users/Farhad/.codex/generated_images/01a0dd28-54b7-70b0-880c-3f1dfdb9cb8e/exec-86e6aa18-1bcc-46f9-9d26-83223d9f58b8.png

Project asset: public/media/young-natural.webp
## Fonts

Vazirmatn variable WOFF2 and Estedad variable TTF are self-hosted. Their SIL Open Font License files are included beside them in public/fonts/.

## First-screen loading — 30 September 2026

The hero is server-rendered and visible without a loading overlay. The homepage preloads the small corridor still, while the layout preloads Vazirmatn. Below-the-fold editorial images use lazy loading. Vinext/Vite minifies the production JavaScript and CSS. The homepage loads its GSAP motion chunk after the first paint; a small scroll helper stays available for controls during that delay.

The entrance and understanding films are requested only after page load and when their video elements approach the viewport. Full films are held in local blob URLs for reliable forward and reverse scroll seeking. Until ready, the posters remain visible. Reduced-motion and data-saver visitors use stills without downloading films. Failed media falls back to its poster. Motion initializes independently of film downloads, and saved scroll positions restore after fonts settle.

Run `node scripts/first-screen-check.mjs` against the production preview (override with `ELORA_BASE_URL`). Results are saved to `qa/first-screen-results.json`. Use `pnpm exec vite preview --host 127.0.0.1 --port 3003` for the Cloudflare build.

## Inner-page editorial reuse — 28 September 2026

The newer supplied-project derivatives `young-natural.webp` and `young-scarf.webp` now illustrate inner skin/rejuvenation service guides and journal pages. `hair.webp`, `mature.webp`, and `brand-space.webp` remain where the subject fits. No new generated or downloaded assets were added. Existing files and homepage image mappings were preserved. Descriptive alt text and illustrative captions are rendered on meaningful standalone images; linked article-card imagery has empty alt because the same link includes its descriptive heading.

## Dedicated journal covers — 28 September 2026

Ten original blog images were generated with the built-in image_gen tool after authoring, installing, and reading the local `elora-blog-imagery` skill. Each article now has its own image. The homepage journal feature uses the new hair cover; service and other homepage images retain their existing assets.

- Skill source: `docs/skills/elora-blog-imagery/SKILL.md`.
- Installed entrypoint: `C:/Users/Farhad/.codex/skills/elora-blog-imagery/SKILL.md`.
- Exact prompts, original source paths, descriptive Persian alt text, captions, dimensions and byte sizes: `docs/journal-image-prompts.json`.
- Preserved PNG originals: `assets/journal-originals/<article-slug>.png`.
- Full web derivatives: `public/media/journal/<article-slug>.webp`.
- Small derivatives: `public/media/journal/<article-slug>-800.webp`.
- Article mapping: `lib/journal-images.ts`, consumed through `lib/journal.ts`.
- Rebuild derivatives: `node scripts/prepare-journal-images.mjs` (uses preserved project originals and the bundled Sharp runtime).

All ten delivered originals are 1254 x 1254 pixels, despite the requested 1536-square brief. No upscaling was applied. Full WebP files are approximately 68–160 KiB; 800-square versions are approximately 31–68 KiB. Responsive srcset selects the appropriate file. Card frames are 4:3; article frames are 4:5 on desktop and square on mobile. The article caption sits outside the animated crop.

All subjects are AI-generated editorial illustrations. The PRP/PRF vials and exosome glass forms are conceptual motifs, not literal scientific specimens, microscopy, product evidence or treatment outcomes. The camera image illustrates photography conditions without fabricating before-and-after evidence. Portraits do not represent actual patients or clinicians.

Validation: the installed skill passed the skill-creator quick validator and matches the project copy by SHA256. TypeScript and production build passed. Browser checks covered all ten articles and the journal listing at 390 and 1440 pixels, image decoding, unique covers, decorative card alt text, twenty asset URLs, horizontal overflow, and normal/reduced motion samples. Results and screenshots: `qa/journal-images/`. No hosted publication was performed.


## Homepage scarf-headband portrait turn — 28 September 2026

Replaced only the understanding chapter's video/poster mapping. The original portrait film and poster remain in public/media because other pages and care-journey cards still use the original still.

- Skill: `C:/Users/Farhad/.codex/skills/elora-blog-imagery/SKILL.md`.
- Generation: built-in `image_gen`; eight selected portraits of one fictional 25-year-old adult Iranian model. Subtly fuller lips/cheeks, visible natural skin texture, ivory/powder-pink patterned silk scarf folded and tied as a headband (تل روسری), ivory high-neck blouse, diffuse light.
- Exact prompts, source paths and selected frame order: `docs/portrait-turn-prompts.json`. Prompt angle targets are artistic directions, not measured yaw.
- Selected originals and prepared keyframes: `assets/portrait-turn/originals/` and `assets/portrait-turn/keyframes/`.
- Contact sheet: `assets/portrait-turn/contact-sheet.png`.
- The earlier generated film and poster were removed from public because the supplied portrait is now active. The preparation script and source frames remain for provenance and regeneration.
- The final film is assembled from generated still keyframes using FFmpeg motion-compensated interpolation. It is not a natively generated video or a recorded model. Fine texture can soften between source keyframes.
- All 24 fps delivery frames are also saved in `assets/portrait-turn/frames/` as WebP files. Rebuild with `node scripts/prepare-portrait-turn.mjs`.
- The Persian cheek/lip/jaw callouts are authored illustrative landmarks in `lib/portrait-landmarks.ts`, updated from actual decoded video time by `components/face-analysis.tsx`. This avoids drifting ahead during slow seeking and reverses with the video. No diagnostic scores, treatment recommendations, or real facial-analysis service are implied.
- Matching poster remains for no-JavaScript, reduced-motion, data-saver and failed-film states. The visible caption identifies the AI model and illustrative analysis.
- Historical results and responsive screenshots for the earlier assembled clip remain in `qa/portrait-turn/`; its obsolete validation script was removed.
- Local implementation only; no hosting or access-setting changes.

Final local validation: `pnpm typecheck` and `pnpm build` pass. All 13 targeted browser checks pass against the production preview on port 3003, including reverse scrubbing/anchor movement, 390 px and 768 px layouts, reduced-motion stills, failed-video poster fallback, and no page errors. FFprobe confirms 720 x 960, 24 fps, 180 frames, 7.5 seconds, 2,661,932 bytes. The eight-frame contact sheet and half-second interpolation samples were visually reviewed. Final desktop/mobile screenshots are in `qa/portrait-turn/`.

## Supplied Veo portrait for the homepage — 28 September 2026

The understanding chapter now uses the user's `google-veo-3.1-lite-video.mp4`. The original is preserved at `assets/portrait-turn/supplied/google-veo-3.1-lite-video.mp4` (SHA-256: `1186552E88D292385C8A70727E32364D193C18E38F4484224748E3FB06B03ABA`). It is a 1080 x 1920, 24 fps, 8-second H.264 video with audio. The active web derivative is `public/media/portrait-turn/supplied-portrait.mp4`: 720 x 960, 24 fps, 192 frames, silent H.264, fast-start, approximately 3.92 MB. Its black top and bottom bands are cropped with `crop=1080:1440:0:240`; the visible portrait is not stretched. `supplied-poster.webp` is an actual frame from the same clip.

`lib/site.ts` maps the homepage portrait to these assets. The original assembled portrait turn and poster remain in the project as historical assets. `lib/portrait-landmarks.ts` now describes authored overlay anchors for the supplied film's turn and return. `components/face-analysis.tsx` reads decoded video time, so the scan markers, callouts, and final on-screen report reverse with scroll. The report describes visual topics only and is labeled illustrative; it gives no diagnosis or treatment result. The caption identifies the AI video and the medical limitation. A matching still and visible report serve reduced-motion, data-saver, and failed-video states.

Rebuild the web film with FFmpeg from the preserved source using `-vf crop=1080:1440:0:240,scale=720:960:flags=lanczos -an -c:v libx264 -preset medium -crf 21 -pix_fmt yuv420p -g 6 -keyint_min 6 -sc_threshold 0 -movflags +faststart`. Generate the poster from the source at 6.25 seconds with the same crop and scale. Current validation: `pnpm typecheck`, `pnpm build`, and `node scripts/supplied-portrait-check.mjs`. Results and screenshots are in `qa/supplied-portrait/`. The earlier `qa/portrait-turn/` archive documents the previous assembled clip.
## Browser feedback: sculptural scan and demo results — 28 September 2026

The supplied portrait now has a scroll-synced wireframe that turns with the face and is uncovered by a scan sweep. This is a 3D-style editorial effect drawn from authored positions, not a depth capture or facial measurement. The bottom report opens near the end of the film and closes again when scrolling back. Its skin 80/100, hair 100/100, and overall 88/100 numbers are explicitly labeled a design sample, not values calculated from the video. It makes no exosome recommendation. On reduced-motion, data-saver, or failed-film views, the matching still and static sample report remain visible. The on-screen caption continues to state that this is not a medical evaluation.

Homepage blurred headings and text in cover chapters now start revealing earlier in the viewport, including the journal section. Validation: `pnpm typecheck`, `pnpm build`, `node scripts/browser-feedback-check.mjs`, and `node scripts/supplied-portrait-check.mjs`; screenshots and results are in `qa/browser-feedback/` and `qa/supplied-portrait/`. The hero-end box now uses the owner-selected copy: «شناختِ شما، آغازِ هر انتخاب است.» / «UNDERSTANDING COMES FIRST.»
## Homepage image and caption feedback — 28 September 2026

The philosophy image's visible figcaption and the understanding film's visible caption were removed at the owner's request. The understanding report still carries its own sample-status header and explanation that the figures are illustrative and not computed from the video. The skin-service card now uses the existing `/media/young-natural.webp` portrait.

Journey stage 2 uses `/media/journey-assessment-young.webp`, an optimized 1440-pixel-wide WebP (57,042 bytes) from a newly generated fictional adult portrait. The original PNG is preserved at `assets/journey-originals/assessment-young.png`. It is an editorial illustration, not a patient, clinician, or treatment result.

Generation tool: built-in `image_gen`. Original generated output: `C:/Users/Farhad/.codex/generated_images/01a0e724-d977-7b22-b630-fafbdd6af08d/exec-30468f7d-0071-43b2-8d9f-84c0fc02c609.png`.

Exact prompt:

> Create a photorealistic editorial portrait photograph for a refined Persian skin clinic website, landscape 4:3 composition. One fictional Iranian woman who is 18 years old (an adult), head and shoulders, facing camera with a subtle relaxed smile. Dark brown hair pulled neatly back and tied behind her head; a narrow soft blush and cream silk scarf tied as a HEADBAND across the crown, leaving her hairline, hair, ears, and neck visible (not a full headscarf). Warm olive skin with realistic natural texture and pores, very gently rosy cheeks, warm honey-colored eyes/contact lenses, understated natural makeup, subtly fuller cheeks and lips without an exaggerated cosmetic appearance. Modest cream high-neck blouse. Warm diffused daylight, pale ivory and blush architectural studio background, elegant calm ELORA editorial visual language, premium natural photography, believable anatomy, clear eyes and face. Frame with generous space on both sides so the face remains visible when cropped to a wide card. No clinic equipment, treatment, medical results, text, watermark, logos, or graphic overlays.
Raw generation originals remain in the local ssets/ workspace and are excluded from the Sites source repository. The site build and deployment use optimized delivery media under public/media/.
