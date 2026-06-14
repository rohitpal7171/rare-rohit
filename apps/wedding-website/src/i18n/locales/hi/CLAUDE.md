# CLAUDE.md — src/i18n/locales/hi/
# Last updated: 2026-06-14

## Purpose

Hindi (Devanagari script) translations. Must mirror `en/` structure exactly — identical keys, same nesting.

## Files

Same filenames as `en/` — see `en/CLAUDE.md` for the file-to-section mapping.

## Key Rules

1. Every key in `en/` must exist in `hi/` with the same path and nesting
2. The pre-push check validates this — mismatched keys block the push
3. Do NOT use Roman script for Hindi values — use proper Devanagari (देवनागरी)
4. Font: `font-hindi` class (Noto Sans Devanagari) is automatically applied to Hindi content via i18n language detection

## Language Note

- `fallbackLng` is currently `'en'` in `src/i18n/config.ts`
- Before production launch: change `fallbackLng` to `'hi'` (Hindi is the primary language for the wedding audience)

## Translation Tone

- Warm, ceremonial, appropriate for a North Indian Hindu wedding
- Use Sanskrit-rooted vocabulary where natural (शुभ, मंगल, आशीर्वाद)
- Avoid overly formal or archaic language — modern Devanagari is preferred
- Marriage type is arranged (व्यवस्थित विवाह) — keep story content consistent with this
