# CLAUDE.md — public/wedding_pics/

# Last updated: 2026-06-14

## Subfolders

| Folder     | Contents                                  | Status         |
| ---------- | ----------------------------------------- | -------------- |
| `deities/` | Hindu deity images for DivineBlessings    | Complete ✅    |
| `namaste/` | Bride & groom intro image                 | 1 image ✅     |
| `others/`  | Gallery photos (engagement, family, etc.) | Empty — needed |

## File Naming Convention

- Lowercase, underscores only: `ganesha_2.jpg`, `bride_groom_namaste.png`
- No spaces, no hyphens, no special characters
- Include a descriptive name — avoid generic names like `img1.jpg`

## Adding New Images

1. Compress before adding (target < 300KB for regular photos, < 100KB for icons/small)
2. Use `.jpg` for photos, `.png` for images with transparency, `.webp` for best compression
3. Update `manifest.json` if the folder uses one (deities/ does — see its CLAUDE.md)
4. Reference in code as root-relative: `/wedding_pics/namaste/bride_groom_namaste.png`

## Gallery Photos (others/)

Add engagement/wedding photos here when available. The `Gallery.tsx` section reads from this folder.
Masonry grid + lightbox implementation is pending until photos are provided.
