# Production Themes Change Log & Notes (`notes-7sl-old.md`)

This file records the detailed history of modifications, brand palette analyses, alias strategies, and token alignment logs for the production design themes located in `/themes/`.

---

## 📌 Change Log Index
- **2026-08-03**: `masalbet` (`7slots.masalbet.json`) complete token set alignment to `7slots.default.json` baseline.

---

## 📝 2026-08-03: `masalbet` Token Set Alignment to `7slots.default.json` Baseline

### Overview & Objective
`themes/7slots.masalbet.json` had fallen behind the canonical `themes/7slots.default.json` baseline schema (missing 57 component tokens and containing 21 legacy `mobapp` tokens). The objective was to bring `masalbet` into 100% key-for-key alignment with `7slots.default.json` (884 tokens total) while strictly maintaining `masalbet`'s distinct brand palette (`#FAA500` amber primary accent, `#FFC908` golden yellow secondary accent) and using `basari` (`themes/7slots.basari.json`) as an alias and design pattern reference.

---

### 1. Main Brand Palettes (Internal Reference)

Below are the compiled baseline color palettes for all 5 brands across the 7slots multi-tenant system:

| Role / Token Alias | 7slots (Default Baseline) | masalbet (Production) | basari (Style Reference) | abe.bet | winnita |
| --- | --- | --- | --- | --- | --- |
| **Dark (Page Background)** | `#1C212E` | `#000000` | `#000000` | `#0C050E` | `#14213A` |
| **Surface (Container/Card)** | `#252D40` | `#131313` | `#131313` | `#101A32` | `#FFFFFF` |
| **Primary Accent** | `#2DD890` (Emerald Green) | `#FAA500` (Amber Orange) | `#FB3C3C` (Crimson Red) | `#F2FF44` (Neon Yellow) | `#0A5AC9` (Royal Blue) |
| **Secondary Accent** | `#FCFF71` (Light Gold) | `#FFC908` (Golden Yellow) | `#FFC02E` (Gold) | `#912266` (Magenta/Purple) | `#3BEA62` (Neon Green) |
| **Tertiary Accent** | `#FFC94D` | `#FFC908` | `#FFC94D` | `#F2FF44` | `#FFC94D` |
| **Accent Light** | `{bg.additional}` | `#EDEDED` | `#EDEDED` | `#E1D9FA` (Lavender) | `{bg.other.win-card-wrap}` |
| **Gold** | `linear-gradient(99deg, #FFCE64 0%, #916206 100%)` | `#EEBD0E` | `#C79E0C` | `#FFBB00` | `#FFC13B` |
| **Silver** | `#DADFEC` | `#B4B4B4` | `#B4B4B4` | `#B4B4B4` | `#8A8F98` |
| **Bronze** | `#FFB053` | `#C1511B` | `#C1511B` | `#DB510C` | `#FFB053` |
| **Success** | `#2DD890` | `#079E02` | `#079E02` | `#00D900` | `#0BB12F` |
| **Warning** | `#FDBB2C` | `#DCAC00` | `#DCAC00` | `#F9DE11` | `#FF9B25` |
| **Error** | `#B62D3E` | `#CF0000` | `#CF0000` | `#EB0202` | `#DE3838` |
| **Light** | `#FFFFFF` | `#FFFFFF` | `#FFFFFF` | `#FFFFFF` | `#FFFFFF` |
| **Primary Text** | `#FFFFFF` | `#FFFFFF` | `#FFFFFF` | `#FFFFFF` | `#192947` |
| **Font Main** | `Inter` | `{font-family.fester}` / `Fester` | `{font-family.fester}` / `Fester` | `{font-family.fester}` / `Fester` | `Akshar` |
| **Font Accent** | `Golos UI` | `{font-family.fester}` / `Fester` | `{font-family.fester}` / `Fester` | `{font-family.fester}` / `Fester` | `Teko` |

---

### 2. Set Comparison Table (Before vs After Update)

| Brand Theme | Total Tokens | Common Keys w/ 7slots | Missing Keys vs 7slots | Extra Keys vs 7slots | Alias References | Status |
| --- | --- | --- | --- | --- | --- | --- |
| **7slots (Default)** | 884 | 884 (100%) | 0 | 0 | 317 (35.9%) | Canonical Baseline |
| **masalbet (Before)** | 864 | 827 (93.5%) | 57 | 37 | 354 (41.0%) | Outdated Schema |
| **masalbet (After)** | 887 | 884 (100%) | **0** | 3 | 373 (42.0%) | **100% Aligned** |
| **basari** | 884 | 876 (99.1%) | 8 | 8 | 367 (41.5%) | Reference Theme |
| **abe.bet** | 884 | 860 (97.3%) | 24 | 24 | 328 (37.1%) | Production Theme |
| **winnita** | 871 | 855 (96.7%) | 29 | 16 | 320 (36.7%) | Production Theme |

---

### 3. Detailed Token Creation & Alias Assignment Log for `masalbet`

All 57 missing tokens were added to `themes/7slots.masalbet.json`, adopting `basari`'s `{base.*}` alias design strategy:

| Token Key | Token Type | 7slots Baseline Value | `masalbet` Assigned Value & Alias Strategy | Rationale & Design Decision |
| --- | --- | --- | --- | --- |
| `bg.blur-fun` | color | `4px` | `4px` | Standard blur radius for 1st deposit card |
| `bg.blur-referral` | color | `150px` | `150px` | Standard referral backdrop blur |
| `bg.card.bg.fun` | color | `linear-gradient(151deg, rgba(96, 59, 157, 0.64)...)` | `linear-gradient(151deg, rgba(102, 87, 87, 0.86) 0%, rgba(60, 53, 53, 0.86) 34%, rgba(39, 34, 34, 0.86) 100%)` | Provider fun card BG using dark neutral tones (matching basari) |
| `bg.card.bg.fun-2` | color | `linear-gradient(180deg, rgba(255, 213, 132, 0.32)...)` | `linear-gradient(180deg, rgba(255, 201, 8, 0.48) 0%, rgba(193, 81, 27, 0.72) 100%)` | Fun card 2 BG using masalbet amber-gold to bronze |
| `bg.card.bg.fun-daily-active` | color | `linear-gradient(151deg, rgba(176, 113, 211, 1.00)...)` | `linear-gradient(151deg, rgba(250, 165, 0, 1.00) 28%, rgba(213, 147, 13, 1.00) 51%, rgba(60, 48, 20, 1.00) 100%)` | Daily check-in active card BG using masalbet amber gradient |
| `bg.card.bg.fun-daily-check` | color | `#181321` | `#2B2220` | Daily check-in card BG matching dark neutral |
| `bg.card.border.card-fun` | color | `linear-gradient(180deg, rgba(255, 213, 132, 0.32)...)` | `linear-gradient(180deg, rgba(250, 165, 0, 0.40) 0%, rgba(255, 201, 8, 0.40) 100%)` | Fun card stroke using masalbet amber/yellow |
| `bg.card.border.card-fun-daily-active` | color | `#A37ABD` | `{base.accent-primary}` | Primary accent alias (`#FAA500`) |
| `bg.other.cashbox-bonus-AB` | color | `#1C212E` | `{base.surface}` | Surface alias (`#131313`) |
| `bg.other.deposit form` | color | `#202535` | `#1A1A1A` | Deposit form BG matching dark container tint |
| `bg.other.exhange-point-banner` | color | `linear-gradient(180deg, #1C212E 0%...)` | `linear-gradient(180deg, {base.surface} 0%, {base.dark} 100%)` | Surface-to-dark alias gradient |
| `bg.other.exhange-point-table` | color | `#202535` | `#181818` | Exchange table row BG |
| `bg.other.my-status-bg` | color | `rgba(255, 255, 255, 0.05)` | `rgba(255, 255, 255, 0.05)` | Status card overlay |
| `bg.technical-fun` | color | `linear-gradient(180deg, #885FBC 0%...)` | `linear-gradient(180deg, {base.accent-primary} 0%, {base.bronze} 100%)` | Primary accent to bronze gradient |
| `border.nav-active-promo` | color | `linear-gradient(180deg, #2DD890 0%...)` | `linear-gradient(180deg, {base.accent-primary} 0%, rgba(250, 165, 0, 0) 100%)` | Active promo border gradient |
| `border.nav-promo` | color | `rgba(255, 255, 255, 0.15)` | `rgba(255, 255, 255, 0.15)` | Promo nav border |
| `button.bg.selection-buttons` | color | `#252D40` | `#222222` | Selection button BG |
| `button.border.selection-buttons-active` | color | `#2DD890` | `{base.accent-primary}` | Primary accent alias (`#FAA500`) |
| `font-size.extra` | fontSizes | `18` | `18` | Mobile main page titles font size |
| `radius.button-icon-menu-logged` | borderRadius | `4px` | `4px` | Standard button icon menu radius |
| `shadow.card-fun` | boxShadow | `{"x": "1", "y": "1", "blur": "12"...}` | `{"x": "1", "y": "1", "blur": "12", "spread": "0", "color": "rgba(0, 0, 0, 0.40)", "type": "dropShadow"}` | Fun card shadow |
| `shadow.special-blocks.promo-1prize` | boxShadow | `[{"color": "#2DD890"...}]` | `[{"x": "0", "y": "0", "blur": "7", "color": "{base.accent-primary}", "type": "dropShadow"}, {"x": "0", "y": "0", "blur": "14", "color": "{base.accent-primary}", "type": "dropShadow"}]` | Promo 1st prize glow shadow |
| `shadow.special-blocks.promo-prize` | boxShadow | `[{"color": "#006CFF"...}]` | `[{"x": "0", "y": "0", "blur": "16", "color": "{base.accent-primary}", "type": "dropShadow"}, {"x": "0", "y": "0", "blur": "16", "color": "{base.accent-primary}", "type": "dropShadow"}, {"x": "0", "y": "1", "blur": "1", "color": "{base.accent-primary}", "type": "innerShadow"}]` | Promo prize glow shadow |
| `shadow.special-blocks.viplanding-card` | boxShadow | `[{"color": "rgba(194, 194, 194, 0.03)"...}]` | `[{"x": "28", "y": "-28", "blur": "28", "spread": "0", "color": "rgba(194, 194, 194, 0.03)", "type": "innerShadow"}, {"x": "-28", "y": "28", "blur": "28", "spread": "0", "color": "rgba(255, 255, 255, 0.03)", "type": "innerShadow"}]` | VIP landing inner shadows |
| `small-elements.fade-tertiary` | color | `linear-gradient(270deg, #1C212E...` | `linear-gradient(270deg, #2D2D2D 0%, rgba(45, 45, 45, 0) 100%)` | Tertiary surface fade gradient |
| `small-elements.game.label-tournament-fun` | color | `linear-gradient(180deg, #4B9DE8...` | `{base.accent-secondary}` | Secondary accent alias (`#FFC908`) |
| `small-elements.label.cardshop` | color | `linear-gradient(90deg, rgba(83...` | `linear-gradient(90deg, #876E6E 0%, #604444 100%)` | Cardshop label gradient |
| `small-elements.label.cardshop-timer` | color | `rgba(42, 61, 92, 0.80)` | `#171717` | Cardshop timer BG |
| `small-elements.selection-checkmark` | color | `rgba(35, 49, 71, 0.30)` | `rgba(27, 27, 27, 0.30)` | Selection checkmark tint |
| `small-elements.widget.complete-bg` | color | `{base.primary}` | `{base.primary}` | Primary alias (`#FFF`) |
| `special-blocks.VIPLanding.bg` | color | `#0E0F12` | `{base.surface}` | Surface alias (`#131313`) |
| `special-blocks.VIPLanding.categories.bg.1main` | color | `linear-gradient(135deg, #287D86...` | `linear-gradient(135deg, #584A19 1.26%, #62480A 5.99%, #312428 38.92%, #272525 63.16%)` | VIP landing category 1 main BG |
| `special-blocks.VIPLanding.categories.bg.2main` | color | `linear-gradient(350deg, #255761...` | `linear-gradient(350deg, #62480A 13.12%, #584A19 18.87%, #272525 47.39%, #282626 88.42%)` | VIP landing category 2 main BG |
| `special-blocks.VIPLanding.categories.bg.secondary` | color | `#111A1D` | `#272525` | VIP landing secondary category BG |
| `special-blocks.VIPLanding.categories.border` | color | `linear-gradient(143deg, rgba(255...` | `linear-gradient(148deg, #373737 23.12%, #222222 89.32%)` | VIP landing border gradient |
| `special-blocks.VIPLanding.categories.border main` | color | `rgba(255, 255, 255, 0.10)` | `rgba(255, 255, 255, 0.20)` | VIP landing main border |
| `special-blocks.VIPLanding.promotion-bg` | color | `linear-gradient(157deg, #3B6E73...` | `linear-gradient(176deg, #584A19 6.8%, #62480A 34.97%, #452A54 61.27%, #261D28 81.93%)` | VIP landing promotion banner BG |
| `special-blocks.achievements.border.activity-copy` | color | `linear-gradient(158deg, #4A80C5...` | `linear-gradient(158deg, {base.accent-primary} 15.68%, rgba(250, 165, 0, 0.43) 48.53%, {base.accent-secondary} 74.32%)` | Achievement activity border |
| `special-blocks.achievements.border.default` | color | `rgba(255, 255, 255, 0.3)` | `rgba(255, 255, 255, 0.3)` | Default achievement card border |
| `special-blocks.achievements.border.mobapp` | color | `linear-gradient(170.92deg, #3BA0C6...` | `{base.accent-primary}` | Primary accent alias (`#FAA500`) |
| `special-blocks.achievements.card.default` | color | `rgba(151, 151, 151, 0.10)` | `rgba(151, 151, 151, 0.10)` | Default achievement card BG |
| `special-blocks.achievements.card.mobapp` | color | `linear-gradient(132deg, rgba(59, 160, 198...` | `linear-gradient(132deg, rgba(250, 165, 0, 0.54) 15.4%, rgba(250, 165, 0, 0.16) 39.28%, rgba(250, 165, 0, 0.00) 57.31%)` | Mobapp achievement card BG |
| `special-blocks.promo.categories.bg.main` | color | `linear-gradient(135deg, #36538B...` | `linear-gradient(93deg, #452A54 2.04%, #584A19 52.07%, #261D28 97.96%)` | Promo main category card BG |
| `special-blocks.promo.categories.border.nav` | color | `linear-gradient(180deg, #2DD890...` | `linear-gradient(180deg, {base.accent-primary} 0%, {base.accent-primary} 24.92%, #C78725 69.4%, #1E1D1D 113.28%)` | Promo category border nav |
| `special-blocks.promo.line` | color | `linear-gradient(180deg, rgba(92, 217, 149...` | `linear-gradient(180deg, rgba(250, 165, 0, 0) 0%, {base.accent-primary} 100%)` | Promo landing line gradient |
| `special-blocks.promo.lottery-timer-bg` | color | `linear-gradient(151deg, rgba(59, 92, 157...` | `linear-gradient(93deg, #383737 4.3%, #252525 51.97%, #1E1E1E 95.7%)` | Promo lottery timer BG |
| `special-blocks.promo.place-color` | color | `{base.light}` | `{base.light}` | Promo place color text |
| `special-blocks.promo.stroke` | color | `{button.bg.primary}` | `{button.bg.primary}` | Promo ticket stroke |
| `text.error-2` | color | `#cf3422` | `{base.error}` | Error alias (`#CF0000`) |
| `text.text-sum-fun` | color | `#FFD284` | `{base.accent-secondary}` | Secondary accent alias (`#FFC908`) |
| `typography.body-card-fun` | typography | `{"fontFamily": "{font-family.main}", ...}` | `{"fontFamily": "{font-family.main}", "fontWeight": "{font-weight.0}", "lineHeight": "{line-height.sm}", "fontSize": "{font-size.3}"}` | Fun body card typography |
| `typography.special-blocks.VIPSpace` | typography | `{"fontFamily": "{font-family.accent}", ...}` | `{"fontFamily": "{font-family.accent}", "fontWeight": "{font-weight.3}", "lineHeight": "48px", "fontSize": "48px"}` | VIP Space title typography |
| `typography.special-blocks.VIPbonus-mob` | typography | `{"fontFamily": "{font-family.accent}", ...}` | `{"fontFamily": "{font-family.accent}", "fontWeight": "{font-weight.1}", "lineHeight": "34px", "fontSize": "28px"}` | VIP bonus mobile typography |
| `typography.special-blocks.VIPbonus-web` | typography | `{"fontFamily": "{font-family.accent}", ...}` | `{"fontFamily": "{font-family.accent}", "fontWeight": "{font-weight.2}", "lineHeight": "38px", "fontSize": "32px"}` | VIP bonus web typography |
| `typography.special-blocks.promolanding-1place` | typography | `{"fontFamily": "{font-family.accent}", ...}` | `{"fontFamily": "{font-family.accent}", "fontWeight": "{font-weight.3}", "lineHeight": "32px", "fontSize": "22px"}` | Promo landing 1st place typography |
| `typography.text-fun-sum` | typography | `{"fontFamily": "{font-family.main}", ...}` | `{"fontFamily": "{font-family.main}", "fontWeight": "{font-weight.2}", "lineHeight": "{line-height.1}", "fontSize": "{font-size.4}"}` | Fun sum text typography |
| `typography.title-small-fun` | typography | `{"fontFamily": "{font-family.accent}", ...}` | `{"fontFamily": "{font-family.accent}", "fontWeight": "{font-weight.0}", "lineHeight": "{line-height.2}", "fontSize": "{font-size.5}"}` | Fun title small typography |
| `special-blocks.mobapp.border.cardbenefit-additional` | color | `rgba(255, 255, 255, 0.10)` | `rgba(255, 255, 255, 0.10)` | Mobapp card benefit stroke |
| `special-blocks.mobapp.card.1` | color | `linear-gradient(155deg, #287D85...` | `linear-gradient(155deg, #584A19 2.44%, #62480A 7.84%, #312428 34.61%, #272525 73.13%)` | Mobapp benefit card 1 BG |
| `special-blocks.mobapp.card.2` | color | `linear-gradient(151deg, #3D72B3...` | `linear-gradient(151deg, #62480A -7.66%, #584A19 -2.28%, #312428 18.16%, #272525 50.27%)` | Mobapp benefit card 2 BG |
| `special-blocks.mobapp.card.3` | color | `linear-gradient(156deg, #9B244D...` | `linear-gradient(156deg, #584A19 -3.01%, rgba(98, 72, 10, 0.78) 2.61%, #272525 41.17%)` | Mobapp benefit card 3 BG |
| `special-blocks.mobapp.card.4` | color | `linear-gradient(133deg, #9C6C0D...` | `linear-gradient(133deg, #9C6C0D -11.97%, #544628 6.81%, #362D19 26.58%, #1D212E 44.91%, #1C212E 91.81%)` | Mobapp benefit card 4 BG |
| `special-blocks.mobapp.card.5` | color | `linear-gradient(151deg, #4B2C80...` | `linear-gradient(151deg, #452A54 3.96%, #261D28 23.71%, #1C212E 56.34%)` | Mobapp benefit card 5 BG |
| `special-blocks.mobapp.qrcod-off` | color | `linear-gradient(180deg, #386267...` | `linear-gradient(180deg, #653F46 0%, #422B2E 100%)` | Mobapp QR code off BG |
| `special-blocks.mobapp.qrcod-on` | color | `linear-gradient(180deg, #5CD995...` | `linear-gradient(180deg, #FAA500 0%, #C78725 100%)` | Mobapp QR code on BG |

---

### 4. Verification & Validation Summary

- **Canonical Key Coverage**: 884 / 884 keys (100%).
- **Missing Keys vs 7slots Baseline**: **0**.
- **JSON Format**: Valid W3C Design Tokens Community Group JSON format with 2-space indentation.
