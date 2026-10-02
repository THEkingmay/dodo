# 17: Settings

**What to build:** The settings page from TOR section 22, and — more importantly — every one of those settings actually changing behaviour rather than being a dead dropdown.

**Blocked by:** 11 — Light, dark, and system theme; 05 — Toasts and undo/redo

**Status:** ready-for-agent

- [ ] A settings view exists and is reachable both by navigation and by direct URL
- [ ] Theme, default priority, default sort, compact mode, confirm-before-delete, animations and tag data are all settable there
- [ ] A new todo picks up the chosen default priority
- [ ] Each view opens with the chosen default sort, unless that view defines its own better default
- [ ] Compact mode tightens the rows, shows single-line titles, hides descriptions, and collapses the sidebar to icons
- [ ] Confirm-before-delete is off by default; when on it asks only before deleting a single todo, and never removes the option to undo
- [ ] Bulk delete and clear-all-data always ask for confirmation regardless of that setting
- [ ] An animation toggle exists, and switching it off removes animation throughout the app
- [ ] Settings survive a reload, and are stored separately from todo data
