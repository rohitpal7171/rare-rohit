# CLAUDE.md — src/components/layout/

## Components
- `Navbar.tsx` — Fixed top nav. Transparent on home hero, divine/95 on scroll + all other pages. Uses `useMotionTemplate` for reactive background. Desktop links + mobile hamburger drawer.
- `Footer.tsx` — Hashtag, blessings text, made-with-love line.
- `PageWrapper.tsx` — Scroll-to-top on route change + page transition wrapper via Framer Motion.

## Key Notes
- Navbar uses `useMotionTemplate` (not `.get()`) for reactive MotionValue background
- Nav links use `<a href="/#section">` for same-page anchor scrolling — NOT React Router `<Link>` (which would cause full-page reload on anchor navigation)
- `PageWrapper` should wrap all non-Home pages (ceremony pages)
- Navbar z-index: z-30. Modal/drawer: z-40/z-50. Keep this hierarchy.
