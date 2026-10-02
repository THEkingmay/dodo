# 11: Light, dark, and system theme

**What to build:** The three-way theme switch from TOR section 19, with one unambiguous source of truth for which theme is active.

**Blocked by:** 08 — Seven views as routes, with navigation and empty states

**Status:** ready-for-agent

- [ ] Light, dark and system themes are selectable, and the choice survives a reload
- [ ] System follows the operating system setting and updates live when the OS setting changes
- [ ] Exactly one source of truth decides the active theme, so a manual choice and the OS setting can never disagree
- [ ] Colours transition smoothly when the theme changes
- [ ] No wrong theme is ever painted on first load
- [ ] Native browser chrome — scrollbars, form controls — matches the active theme
- [ ] The theme can also be cycled from the command palette once that exists
