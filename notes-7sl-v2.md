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

## 2026-11-27 — Winnita rounded buttons

Only border-radius.button.sm/md/lg now alias border-radius.core.full (9999), giving pill/circle silhouettes equivalent to the old Winnita radius-44 reference at current button heights. Colors, type, sizes, spacing and base 7slots tokens are unchanged. Isolated Winnita preview standard buttons receive matching local radius overrides; global component masters remain unchanged.

## 2026-11-27 — Approved Winnita button colors and outlines

Source of truth: Figma button matrix `70010:103030` within `70010:102981`, 120 variants. Only `V2/Winnita new.json` token values are updated.

- Secondary: core.red.400 is now the production hover anchor #FF6161 (replaces the provisional generated shade); semantic background secondary aliases red.500 / red.400 / red.600, with red.500 at alpha 0.4 for disabled. Contextual secondary fills inherit these roles. White content and transparent borders remain unchanged.
- Tertiary: semantic fill aliases grey.600 at alpha 0.1 in all four states; borders are grey.400 / grey.500 / grey.600 / grey.300 at alpha 0.6 for disabled. Existing dark text roles are preserved.
- Static: transparent fills and the same neutral border states as Tertiary. Its active contextual fill now aliases semantic.background.brand.static.default: the shared semantic static.active and pregame overlay remain unchanged.
- Ghost (existing JSON name ghost-popup): transparent fill in all states; green borders use brand-10.500 / .400 / .600 / .500 at alpha 0.4 for disabled. Added four semantic.text.button.ghost-popup roles to preserve the approved darker text shades (.600 / .400 / .700 / .600a40) without direct contextual-to-core links.
- Primary green colors, pill radii, typography, size, padding, effects and border widths are unchanged. Component effects and per-variant opacity remain inherited Figma component properties; they are not newly exported as color tokens.

40 token objects affected: 1 core, 34 semantic (including 4 additions), 5 contextual. All previous paths retained; total 1659 tokens. Validated 300 fill/border/text comparisons across 120 Figma variants (one 8-bit step allowed for color/alpha serialization), alias graph without missing references or cycles, and byte-identical 7slots base. No production theme or theme activation changes.

## 2026-11-27 — Approved Winnita button typography

Visual approval: Figma `70018:106767` / button set `70018:106816`, 60 text variants using Akshar Medium 500 with UPPER case. Updated only text.button-small, text.button-medium and text.button-large in V2/Winnita new.json: fontWeight references text.strong → Medium (500), and textCase references text-case.uppercase. Existing foundation values and shared text.strong/text.strongest roles are unchanged. Font family, size, line height, spacing, colors and radii are unchanged. All 1659 token paths retained; recursive aliases checked without missing targets/cycles. The 7slots base is byte-identical to origin/main.

## 2026-11-27 — Approved Winnita button sizing and cross-brand schema alignment

User approved the visual size trial in Figma 70018:106767 and an identical token path/type structure in the new 7slots and Winnita sets. Both V2 files now contain 1674 tokens. Production themes and activation files remain unchanged.

Winnita changes:
- Text button heights SM/MD/LG: 22/32/40; font sizes 14/15/17px; line heights 16/15/18px; letter spacing 0/0.2/0.5px. Existing Medium 500 and uppercase are retained.
- Horizontal padding 12/16/16, text-wrapper horizontal padding 0, gap 4, vertical padding 2/4/4. Added button.padding-vertical roles.
- Icon glyph size 16/24/24; icon-only button dimensions 20/32/32, with 2/4/4 inset. Added button.icon-only-type.padding roles. Colors, outlines, effects and pill radii remain unchanged. Auto-layout Hug/Fill is still a Figma component property rather than a JSON token.

Shared structural additions:
- size.20px/22px/32px; font-size.15px/17px; line-height.15px; letter-spacing.0px/0-2px/0-5px. Existing shared size, font-scale and spacing values are unchanged.
- Both sets receive the six padding roles. Their 7slots defaults preserve the existing configuration (vertical padding 0, icon-only horizontal inset 8); the new roles are available for component binding, not an automatic global Figma update.
- Added the four semantic.text.button.ghost-popup states to 7slots, preserving its own core references. Existing contextual Ghost text links now route through them. Winnita already has the same paths.

Validation: exact token path/type parity; no deleted original paths; recursive references valid and acyclic; all 1655 pre-existing 7slots token values resolve identically (including preserved modifier metadata). Winnita dimension, padding and composite typography values match the approved matrix. 7slots gains 19 paths and changes four equivalent aliases; Winnita gains 15 paths and updates 20 existing token objects.
