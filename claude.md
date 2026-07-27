# Project Context: 7Slots Design Tokens

This repository acts as the central source of truth for **design tokens** used across the 7Slots stack of web applications. It contains configuration files exported from/used by the **Token Studio** Figma plugin, which frontend developers consume to generate brand-specific style assets.

---

## 🚀 Key Context
1. **Pure Token Repository**: There is **no web application code** in this repository. It is exclusively populated with Token Studio plugin JSON files containing design values (colors, typography, spacing, shadows, etc.).
2. **Multi-Tenant Stack**: The system supports several sites under different themes (brands), sharing similar component architectures but varying in design tokens.
3. **Design System V2 (Work In Progress)**: There is a dedicated `V2/` directory containing the ongoing redesign and new design system tokens.

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
  * `7slots.masalbet.json` (Masalbet brand theme)
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
* **Locating Tokens**: If asked to find or edit a style rule:
  * Look in `/themes/7slots.default.json` for baseline styles.
  * Check the corresponding brand JSON (e.g., `/themes/7slots.basari.json`) for overrides.
  * Check `/V2/7sb.7slot_new.json` if the user is working on the redesign project.
* **Editing Tokens**: When updating tokens, ensure references (`{alias}`) are preserved and correctly matched to the expected categories. Avoid hardcoding raw values where token aliases are available.
