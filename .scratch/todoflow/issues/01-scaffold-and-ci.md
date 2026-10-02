# 01: Scaffold the project and get CI green

**What to build:** An empty but fully wired TodoFlow project that installs, runs, type-checks, lints, tests and builds — the skeleton every later ticket builds on. No user-facing feature yet; this is the prefactor that makes the change easy.

**Blocked by:** None (can start immediately)

**Status:** done

- [x] A fresh `npm install` then `npm run dev` serves a blank app shell at the root
- [x] `npm run build` produces a production bundle and `npm run preview` serves it successfully
- [x] TypeScript runs in strict mode; a deliberately wrong type fails the type-check rather than passing silently
- [x] Tailwind v4 is configured CSS-first, with design tokens declared as theme variables and both a light and a dark colour scheme declared
- [x] Vitest runs and a placeholder test passes
- [x] The source tree separates app wiring, per-feature code, shared UI primitives, and library helpers
- [x] GitHub Actions runs type-check, tests and build on every push and reports green
- [x] The project is a git repository with an initial commit and an MIT licence