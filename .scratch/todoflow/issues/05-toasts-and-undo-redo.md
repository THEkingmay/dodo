# 05: Toasts and undo/redo

**What to build:** Feedback after every action, plus a real undo history. This is the feature that makes the app feel safe to use.

**Blocked by:** 04 — Edit, complete, and delete a todo

**Status:** ready-for-agent

- [ ] Every action raises a toast describing what happened
- [ ] Deleting a todo raises a toast carrying an Undo action
- [ ] Pressing Undo restores the deleted todo in its original position
- [ ] Undo and redo cover adding, editing, completing, archiving, duplicating, bulk actions and clearing completed — not just deleting
- [ ] Undo and redo reach 50 steps back
- [ ] Undo does not survive a page reload, and nothing claims it does
- [ ] No browser alert or confirm dialog is used for feedback
- [ ] Toast messages are announced to screen readers, not merely drawn
- [ ] A toast's countdown pauses while it is hovered or keyboard-focused, so keyboard users get the same chance to act as mouse users
