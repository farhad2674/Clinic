# Built-in imagegen and review

Apply the available imagegen skill and current tool schema. Use one built-in call per independent photo. Do not generate a collage, grid, diptych, webpage screenshot, or contact sheet as a shortcut for independent masters. Review contact sheets only after masters exist.

Inspect local image references first with view_image. Label each as an edit target, composition reference, or supporting image. For an edit, repeat invariants. Do not invent built-in output-path arguments or use CLI/API mode without explicit user authorization.

## Prompt skeleton

Use only useful fields:
- Use case: photorealistic-natural.
- Asset type: actual topic and placement.
- Primary request: one independent professional clinic editorial photograph.
- Scene/action: concrete believable moment tied to topic.
- Subject: clearly adult Persian woman 23–32 for service, or relevant unbranded objects/interior.
- Casting/styling: distinct face/hair/garment and explicit complexion; independent lip, cheek, brow, lash, eye-makeup and skin-finish descriptions; name the natural, polished, moderate or high-enhancement tier.
- Composition: framing, camera distance, gaze, safe subject placement for crops.
- Light/palette: name the physical source, direction, hardness, temperature and falloff; describe visible highlight/shadow/catchlight/hair-rim effects; include warm/cool/balanced class, neutral base and complementary relationship, and protect the intended complexion.
- Texture/finish: pores, small asymmetries, flyaways, tactile cloth, realistic lens perspective and careful editing.
- Constraints/avoid: actual protected features, no fabricated treatment result/branding/watermark, no grid or captions.

For still lifes, use material-specific realism: seams, translucency, cream viscosity, cotton fibers, contact shadows, and perspective. Do not embed claims or labels. For interiors, preserve required architecture/camera/signage while altering only authorized styling.

Camera descriptions help when they affect the image: natural eye-level viewpoint, normal/short-portrait perspective, restrained depth of field. Avoid a repeated long technical camera recipe.

## Ledger and agent handoff

Before generating: job ID, topic/placement, three concepts, selected concept/reason, palette/light, casting/action/style, final prompt.
After generating: actual tool source and workspace original paths, attempt, inspected review, actual dimensions/hash, derivative paths, focal point, Persian alt/caption.

The orchestrator owns shared coverage and registries. Agents own disjoint job lists/output folders and send concise status with actual paths. Do not edit another agent's shared mappings. Preserve accepted prompts and meaningful rejection reasons.

Built-in imagegen outputs normally live under Codex generated_images. Obtain the actual output path, copy accepted originals into the project, and record it. Never leave a website asset only outside the project. Do not print base64 payloads.

## Acceptance observations

Inspect full resolution and intended crops:
- Topic/honesty: relevant image, no fictional patient result, clinician identity, endorsement, or diagnostic authority.
- People: believable anatomy, hands, ears, pupils, teeth, hairline, neck/shoulders, jewelry, and clothing; relaxed posture.
- Retouching: pores/asymmetry survive, no waxy skin or improbable glow; intended complexion, makeup, brow/lash treatment and enhancement tier remain visibly distinct.
- Objects/interiors: plausible scale, joints, lids, reflections, furniture clearance, shadow/contact; no unwanted lettering.
- Color and light: chosen family appears while skin remains credible; highlights and shadows clearly follow the named source; the collection shows real complexion and exposure variety rather than uniformly pale, flat faces.
- Crops: eyes, hair, hands, and topic cue survive real masks and small cards.
- Collection: no repeated identities, gaze, silhouettes, rooms, or props dominating the set.

Repair demonstrated weaknesses with targeted edits/regeneration. Record what the image actually shows; a prompt is not evidence of success. Missing or rejected jobs remain incomplete.

Keep originals locally and create versioned optimized full/800px WebPs without enlargement. Existing starting settings are width ≤1600, quality near85 for full and near82 for thumbnail; inspect actual quality. Corridor ≤120KB. Verify decode and HTTP status before registry changes.

Use descriptive Persian alt about visible content. Keep existing conceptual-image disclosure; never label a model a patient or conceptual interior an operating branch. Default when appropriate: «تصویر مفهومی ساخته‌شده با هوش مصنوعی؛ عکس بیمار یا نتیجه درمان نیست.» Preserve the more specific non-diagnostic/product disclosure when the topic needs it.

## ELVITHA safety boundary

Protected: public/media/portrait-turn/supplied-portrait.mp4 and supplied-poster.webp; components/face-analysis.tsx; lib/portrait-landmarks.ts; their media mapping, markup, CSS, overlays, and shared scroll/motion behavior. Entrance film/poster are also preserved. The separate corridor still is a reference-led edit preserving architecture and composition. Hash protected files before/after; inspect shared-file diffs.

Current approved 2026-10-13 baseline: 42 masters (16 service, 23 article, 3 interior), 52 routes. These are this refresh's counts, not requirements for future batches. Use the live manifest and sitemap for checks, because old QA and image builders contain obsolete counts/paths and can overwrite newer registry merges. No publication in this pass.

