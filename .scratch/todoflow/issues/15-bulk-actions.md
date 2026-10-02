# 15: Bulk actions

**What to build:** Acting on several todos at once from TOR section 12, with selection rules that make accidental mass deletion impossible.

**Blocked by:** 06 — Archive and duplicate a todo

**Status:** ready-for-agent

- [ ] Several todos can be selected individually, and all at once
- [ ] Complete, delete, archive and change-priority apply to the whole selection
- [ ] Changing the view, the search or the sort clears the selection, so a bulk action never touches todos the user cannot see
- [ ] "Select all" covers everything matching the current view, not only what fits on screen
- [ ] A visible bar reports how many todos are selected and offers a way to cancel
- [ ] The bulk-select control and the single-row complete control cannot be confused
- [ ] Bulk delete still offers undo, and bulk archive and clear-completed are undoable too
