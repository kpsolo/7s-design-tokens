# Project Context: 7Slots Design Tokens

This repository acts as the central source of truth for **design tokens** used across the 7Slots stack of web applications. It contains configuration files exported from/used by the **Token Studio** Figma plugin, which frontend developers consume to generate brand-specific style assets.

---

## 🚀 Key Context
1. **Pure Token Repository**: There is **no web application code** in this repository. It is exclusively populated with Token Studio plugin JSON files containing design values (colors, typography, spacing, shadows, etc.).
2. **Multi-Tenant Stack**: The system supports several sites under different themes (brands), sharing similar component architectures but varying in design tokens.
3. **Design System V2 (Work In Progress)**: There is a dedicated `V2/` directory containing the ongoing redesign and new design system tokens.

---

## 📋 Change Log & Notes Index

Detailed logs of changes, brand palette analyses, alias strategies, and token alignment records are maintained in dedicated notes files split by stream:

* **Production Themes (`/themes/`) Notes**: [`notes-7sl-old.md`](file:///c:/Work/7slots/notes-7sl-old.md)
  * *2026-09-23*: Migrate 43 Referral Program tokens from `refferal-program` branch across all production themes and add `scripts/sync-referral-tokens.js` tool.
  * *2026-09-23*: Update `bg.card.bg.2` (`--bg-card-bg-2`) provider card background gradient for `masalbet`.
  * *2026-08-03*: Full token set alignment of `masalbet` (`7slots.masalbet.json`) to `7slots.default.json` baseline using `basari` alias patterns. Pre-update snapshot preserved in `7slots.masalbet-old.json`.
* **V2 Redesign (`/V2/`) Notes**: [`notes-7sl-v2.md`](file:///c:/Work/7slots/notes-7sl-v2.md)
  * Detailed logs and updates for the V2 design system stream.

---

## 📂 Repository Structure

### 🎨 Production Themes (`/themes`)
This folder contains the active design tokens for the production websites.
* **`$metadata.json`**: Controls the ordering and loading priority of token sets in Token Studio (e.g., `7slots.default`, followed by individual theme files).
* **`$themes.json`**: Configures how token sets map to Figma style references and themes (e.g., matching Token Studio tokens to style IDs).
* **Theme-Specific Tokens**:
  * `7slots.default.json` (Base / Default styles)
  * `7slots.abebet.json` (Abebet brand theme)
  * `7slots.basari.json` (Basari brand theme)
  * `7slots.masalbet.json` (Masalbet brand theme - updated)
  * `7slots.masalbet-old.json` (Masalbet pre-update snapshot for change tracking)
  * `7slots.winnita.json` (Winnita brand theme)

### 🧪 Work in Progress / Redesign (`/V2`)
This folder hosts the new design system tokens under development.
* **`$metadata.json`**: Defines the V2 token set order (e.g., containing `7sb.7slot_new`).
* **`$themes.json`**: Themes and Figma style mappings for the V2 redesign.
* **`7sb.7slot_new.json`**: The new design token set containing updated styling specs.

---

## 📝 Format of Tokens
The token files follow the W3C Design Tokens Community Group specification format used by Token Studio:
* **References/Aliases**: Tokens frequently reference base tokens using the `{category.name}` syntax (e.g., `"{font-family.main}"`).
* **Composite Tokens**: Typography and shadows are represented as objects detailing multiple sub-properties (e.g., `fontSize`, `lineHeight`, `fontWeight`, `fontFamily`).
* **Color & Gradient Format Rule (`rgba` only)**:
  * **Always use standard `rgba(r, g, b, a)` format** for any color with opacity / alpha transparency (e.g., `rgba(78, 73, 62, 0.60)`).
  * In gradients (`linear-gradient`, `radial-gradient`), all color stops with transparency **must** use `rgba(r, g, b, a)` format.
  * **Never use modern CSS Color Module 4 slash syntax** (such as `rgb(r g b / a)` or `hsl(h s l / a)`). Always convert them to `rgba(r, g, b, a)`.

```json
"typography": {
  "caption-extrasmall": {
    "value": {
      "fontFamily": "{font-family.main}",
      "fontWeight": "{font-weight.0}",
      "lineHeight": "{line-height.sm}",
      "fontSize": "{font-size.2}",
      "letterSpacing": "-0.2px"
    },
    "type": "typography"
  }
}
```

---

## 🤖 Guide for LLMs / Coding Assistants
* **Pure Config Repository**: Do not attempt to run or compile a web application from this codebase.
* **Locating Tokens**:
  * Production themes baseline: `/themes/7slots.default.json`.
  * Production brand overrides: `/themes/7slots.<brand>.json`.
  * Pre-update masalbet snapshot: `/themes/7slots.masalbet-old.json`.
  * V2 redesign: `/V2/7sb.7slot_new.json`.
* **Token Studio "-copy" Artifacts**:
  * When a designer duplicates or copies a token to another set in the Figma Token Studio plugin, Token Studio automatically appends `-copy` to the token name (e.g., `card.bg-copy`, `nav-promo-copy`, `6-copy`).
  * These are unintentional naming artifacts.
  * When verifying/syncing themes, rename `-copy` tokens to their canonical names if missing, or delete them if the canonical token already exists.
* **Color Format Rule (Always Use `rgba`)**:
  * **MANDATORY**: Always use standard comma-separated `rgba(r, g, b, a)` format (with alpha between `0` and `1`, e.g., `rgba(78, 73, 62, 0.60)`) for any colors with transparency, including within linear or radial gradient color stops.
  * **NEVER** output or preserve modern CSS slash notation (`rgb(r g b / a)` or `hsl(h s l / a)`). If provided in user prompts or copied from Dev Mode/inspectors, immediately convert them to standard `rgba(...)`.
* **Logging Changes in Notes Files**:
  * **ALWAYS** record detailed change logs, palette analyses, alias strategies, and decision tables in the stream-specific note files:
    * Production Themes (`/themes/`) changes $\rightarrow$ write to [`notes-7sl-old.md`](file:///c:/Work/7slots/notes-7sl-old.md).
    * V2 Redesign (`/V2/`) changes $\rightarrow$ write to [`notes-7sl-v2.md`](file:///c:/Work/7slots/notes-7sl-v2.md).
  * Keep `claude.md` updated with high-level summaries and references to these detailed note files in the **Change Log & Notes Index** section.

---

## 🛠️ Verification & Synchronization Tools

* **`scripts/verify-sync.js`**: Quick synchronization verifier that compares theme token sets against the `7slots.default.json` baseline, reporting missing tokens, extra tokens, type mismatches, and Token Studio `-copy` artifacts.
  * Run all themes: `node scripts/verify-sync.js`
  * Summary table only: `node scripts/verify-sync.js -s`
  * Single theme details: `node scripts/verify-sync.js -t <theme>`
  * Filter by pattern (e.g. `ref`, `pregame`): `node scripts/verify-sync.js -f <pattern>`
  * Output as JSON: `node scripts/verify-sync.js --json`
* **`scripts/sync-referral-tokens.js`**: Migrates and verifies the 43 canonical Referral Program tokens across all theme sets from the `refferal-program` git branch.
  * Verify all themes: `node scripts/sync-referral-tokens.js --verify`
  * Apply migration: `node scripts/sync-referral-tokens.js --apply`
  * Dry-run simulation: `node scripts/sync-referral-tokens.js --dry-run`
  * Single theme: `node scripts/sync-referral-tokens.js -t <theme>`

