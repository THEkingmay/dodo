# 13: Command palette

**What to build:** The Ctrl+K palette from TOR section 14, exposing every command in one keyboard-driven list.

**Blocked by:** 12 — Keyboard shortcuts and the help dialog

**Status:** ready-for-agent

- [ ] Ctrl+K opens a command palette over a modal search field
- [ ] Typing filters the commands; arrow keys move the selection; Enter runs the highlighted command
- [ ] The palette can create a todo, search todos, jump to any view, cycle the theme, toggle compact mode, undo, redo, clear completed, and export or import data
- [ ] Every command is reachable by keyboard alone, and the current selection is announced
- [ ] The palette closes on Escape without running anything
- [ ] Focus returns to wherever it was when the palette closes
