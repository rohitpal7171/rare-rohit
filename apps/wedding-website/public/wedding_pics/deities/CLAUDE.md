# CLAUDE.md — public/wedding_pics/deities/

# Last updated: 2026-06-14

## Purpose

Hindu deity images displayed in the `DivineBlessings` section (marquee scroll).
Loaded dynamically via `manifest.json`.

## manifest.json Structure

```json
[
  { "file": "ganesha_2.jpg", "name": "Ganesha", "nameHindi": "गणेश" },
  { "file": "hanuman.jpg",   "name": "Hanuman",  "nameHindi": "हनुमान" },
  ...
]
```

Every image added here **must** have a corresponding entry in `manifest.json` with:

- `file` — exact filename including extension
- `name` — English name displayed under deity image
- `nameHindi` — Hindi/Devanagari name

## Adding a New Deity Image

1. Place the image file in this folder (JPG/PNG, < 200KB, square crop preferred)
2. Add its entry to `manifest.json`
3. `DivineBlessings.tsx` reads the manifest at runtime — no code changes needed

## Removing a Deity Image

1. Remove the `manifest.json` entry first
2. Then delete the image file
   Do it in this order to prevent a broken image flash during hot reload.

## Image Requirements

- Square crop or near-square (will be displayed in a fixed-size container)
- Transparent background (PNG) works best for deity images
- Avoid images with complex backgrounds — the section uses a dark mandala-bg
