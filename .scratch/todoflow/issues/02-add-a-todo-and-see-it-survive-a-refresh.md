# 02: Add a todo and see it survive a refresh

**What to build:** The tracer bullet. The thinnest possible complete path from a validated todo shape, through storage, to a rendered row — proving the whole spine works end to end before any feature is layered on.

**Blocked by:** 01 — Scaffold the project and get CI green

**Status:** done

- [x] Typing a title and submitting adds one todo that immediately appears in the list
- [x] Before anything is added, the list shows an intentional empty state rather than a blank or broken screen
- [x] Reloading the page keeps every todo, with identical identity and order
- [x] Clearing site data and reloading yields a working empty app, not a crash
- [x] If the saved data fails validation, the app starts empty and says so rather than throwing
- [x] The app waits for saved data before rendering content, so a stored theme never paints the wrong colour first
- [x] A failed write to browser storage (private browsing, quota exceeded) surfaces a visible message instead of crashing the app
- [x] A unit test proves a todo round-trips through save and validation unchanged
