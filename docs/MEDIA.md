# ELORA media inventory

## Supplied assets

- Video A: 1-gen-vid-1790420364-jRD9JKw0jPXyCBn9im4c-0.mp4, 1280x720, 24fps, approximately 6.08 seconds. It begins in the lounge, not the corridor. Used in the entrance chapter after a crossfade from the supplied corridor still.
- Video B: 2-gen-vid-1790420714-EXLx5fRR8aEIoA6DmtQf-0.mp4, 720x1280, 24fps, approximately 8.10 seconds. Used in the understanding chapter.
- Both source films are preserved in C:/clinicwebsite/.codex-remote-attachments/01a0dd06-1eb3-7580-934e-ea9b877b186f/5479c295-8359-453c-b9de-23d67671e008/.
- The three supplied clinic concept images are approximately 1672x941 and are preserved in the user's Downloads.
- No artificial upscaling was applied. The films' source resolution sets their detail ceiling.

## Web derivatives

public/media/entrance.mp4 and portrait.mp4: silent H.264, yuv420p, frequent six-frame keyframes, CRF 21, fast-start metadata. Approximately 2.93 MB and 2.45 MB respectively.
public/media/entrance-poster.webp and portrait-poster.webp: frames extracted from the actual films.
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
