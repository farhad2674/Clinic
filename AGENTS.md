# ELVITHA repository guidance

## Photography work

For clinic image creation or replacement, read `docs/skills/clinic-brand-photography/SKILL.md` and the relevant references before writing prompts. The versioned repository copy is the source for this project's agent collaboration; the personal `clinic-imagery` plugin provides the same skill for reuse.

The current refresh manifest is `docs/clinic-photography/plan.json`. Keep planned jobs separate from visually reviewed, accepted image outputs. Each generation agent owns its assigned batch file and original-output folder; one integrating agent owns shared website mappings.

The woman's scanned-face film and its complete 3D experience are protected in this refresh. Preserve its video, poster, landmarks, overlays, styling and scroll behavior. The protected baseline is `docs/clinic-photography/protected-baseline.json`.

Use the new `prepare-clinic-photography.mjs` and `check-clinic-photography.mjs` scripts for this collection. Older image builders contain stale mappings and must not overwrite the new registries. Do not integrate incomplete or unreviewed image batches. Publication requires a separate request.
