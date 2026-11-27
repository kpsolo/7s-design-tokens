# V2 Redesign Change Log & Notes (`notes-7sl-v2.md`)

This file records the detailed history of modifications, token specs, and redesign updates for the V2 design system stream located in `/V2/`.

---

## 📌 Change Log Index
- **Initial Setup**: Dedicated change log for `/V2/` design system redesign (`7sb.7slot_new.json`).


## 2026-11-27 — Winnita V2 core draft (local, not published)

Scope: only `V2/Winnita new.json` → `core`. The 7slots base file, production themes, semantic/contextual layers, typography, component geometry and theme activation were not changed.

144 core paths retained. Production reference: Figma Living Documentation `69957:50485`, set `7slots.winnita`, exported 926 tokens. GitHub base commit: `6f28fed`.

- Green CTA anchors: 500 `#39CC59`, 400 `#4DD16A` (hover), 600 `#33B850` (pressed). State-to-step mapping is planned only; current semantic gradients are still inherited.
- Blue: 500 `#0A5AC9`, 50 `#EBF1FF`, 100 `#DEE8FF`, 200 `#C4CEE6`, 300 `#4090FF`, 600 `#0848A1`.
- Neutral production anchors: 25 `#F8F8F9`, 200 `#C6CCE0`, 300 `#A1A6B0`, 400 `#525252`, 500 `#313644`, 600 `#192947`, 700 `#14213A`. Supporting steps are proposed draft values.
- Status anchors remain separate: success `#0BB12F`, danger `#DE3838`, warning `#FF9B25`. Transparent status/red placeholders were filled with draft LCH shade ramps. Red 500/600 `#FF5050`/`#E64848` retain production secondary anchors; red button roles are not activated.
- Brand-60, white and purple remain inherited. Brand-60 alpha aliases keep their original cross-links to grey. They must be reviewed during semantic mapping.
- Literal alpha copies in brand palettes now reference their own base step; alpha amounts retained.
- New shades and ramps are a proposal, not production values. No theme switch: core alone does not create the final white theme.

Changed token objects: 77. No new core paths.


## 2026-11-27 — Winnita light semantic draft (local, not published)

- Preserved all 1655 token paths: 144 core, 139 semantic, 950 contextual, 422 other. Core remains identical to the preceding Winnita core draft.
- Mapped 96 semantic token objects to light surfaces, dark content, blue navigation/focus and solid primary states. Retained 16 decorative gradients and white banner content.
- Primary: default brand-10/500, hover /400, active /600, disabled rgba(57, 204, 89, 0.4). Secondary stays blue provisionally: product action mapping must decide where red belongs.
- Updated 125 contextual objects for buttons, input, header/sidebar/menu, tabs, dropdown, popup and game-thumbnail labels/placeholders. All component geometry and typography definitions remain unchanged.
- Remaining unchanged contextual tokens with direct core references: 476. Remaining contextual literal/gradient values: 68. These are inventory candidates, not confirmed bugs. The theme is not yet audited across all product screens.
- Verified existing references and acyclic alias graph across the full set. 7slots base file is byte-identical to HEAD.
- Figma preview uses isolated instances/copies only; base component definitions and global 7slots variable values remain unchanged. No activation or GitHub push.

- Visual review: category-card background now aliases semantic.background.slate-4 (221 changed objects total: 96 semantic, 125 contextual). Isolated preview uses local paint/font overrides because many source components have baked colors. Preview is a snapshot, not a globally activated Figma theme.

- Header control preview refinement: profile, notification and balance use semantic.background.slate-4 (#EBF1FF), dark icon role (#525252), notification danger fill (#DE3838) and on-brand white badge text. Restored previously white profile/wallet icon fills on the isolated instances, with pill/circle backgrounds matching the requested production reference. Deposit geometry/color and base 7slots assets unchanged. This is a preview-only override; no new JSON paths or theme activation.

- Production computed-style check (https://winnita.com/it/): neutral category navigation Novità rgb(82,82,82) (#525252); active Popolare rgb(10,90,201) (#0A5AC9); body Provider and game title rgb(25,41,71) (#192947). The old hero navigation uses white/green and is not the new header reference. New Winnita header Casino uses blue selection, Sport/Live neutral #525252. Header default text contextual links now use semantic.text.default.secondary; body primary remains #192947. No #484848 substitution.

## 2026-11-27 — Winnita draft prepared for publication

Prepared the preceding core and light semantic drafts for GitHub publication at user request. Initial upload attempts were blocked by GitHub access. GitHub CLI is now authenticated as JacobSave and repository write access (push: true) has been verified; publication is authorized. Token scope is exclusively `V2/Winnita new.json`; accompanying changes only document this work. `V2/7sb.7slot_new.json`, production themes and theme activation remain unchanged. Supporting palette shades and secondary action mapping remain draft; the isolated Figma preview includes paint overrides and is not a global theme activation.
