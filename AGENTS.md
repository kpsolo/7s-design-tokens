# Project Rules & Guidelines: 7Slots Design Tokens

Refer to [claude.md](file:///c:/Work/7slots/claude.md) for full project context, theme baselines, and sync tools.

## 🎨 Color & Gradient Format Rules
* **Always use `rgba(...)` format**: For any transparent color or opacity values, always use standard comma-separated `rgba(r, g, b, a)` format (e.g. `rgba(78, 73, 62, 0.60)`).
* **Gradients**: All color stops with transparency in `linear-gradient(...)` and `radial-gradient(...)` must use `rgba(r, g, b, a)` format.
* **No Modern CSS Slash Syntax**: Never use or preserve CSS Color Module 4 slash syntax (`rgb(r g b / a)` or `hsl(h s l / a)`). Always convert to `rgba(r, g, b, a)`.

## 🤖 General Rules
* **Pure Config Repo**: Do not attempt to run or compile web applications.
* **Token Studio `-copy` Artifacts**: Strip or deduplicate `-copy` tokens.
* **Notes & Change Logs**: Record detailed changes in `notes-7sl-old.md` (Production) or `notes-7sl-v2.md` (V2).
