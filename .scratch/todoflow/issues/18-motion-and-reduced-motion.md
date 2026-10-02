# 18: Motion and reduced-motion

**What to build:** The animation pass from TOR sections 15 and 24 — every animation justified, all within 100–300ms, and every one of them silenced for users who ask for less movement.

**Blocked by:** 06 — Archive and duplicate a todo; 13 — Command palette; 14 — Drag to reorder, plus keyboard reorder; 15 — Bulk actions; 17 — Settings

**Status:** ready-for-agent

- [ ] Shared UI primitives animate on open, close and dismissal
- [ ] Adding a todo fades and slides it in; deleting collapses it out of the list
- [ ] Completing animates the checkbox and the strikethrough
- [ ] Filter changes animate the list layout rather than snapping
- [ ] The progress bar animates both its width and its number
- [ ] Theme changes animate colour
- [ ] All interaction animation sits between 100 and 300 milliseconds
- [ ] With the operating system's reduced-motion preference on, no animation plays and the app remains fully usable
- [ ] The in-app animation toggle has the same effect as the operating-system preference
- [ ] No single rule animates every property on every element, and colour transitions are suppressed for reduced-motion users
