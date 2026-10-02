# 12: Keyboard shortcuts and the help dialog

**What to build:** The shortcut table from TOR section 13, made safe — global shortcuts that never fire while typing, and row shortcuts that act only on the row the keyboard is actually on.

**Blocked by:** 05 — Toasts and undo/redo

**Status:** ready-for-agent

- [ ] The documented shortcuts all work: N, slash, Ctrl+K, question mark, Escape, Enter, Delete, Space, and Alt with the arrow keys
- [ ] Typing in any text field never triggers a shortcut
- [ ] Space and Delete affect only the todo row that has keyboard focus, and never scroll the page
- [ ] Shortcuts are disabled while a todo is being edited inline
- [ ] Enter saves in a single-line field but inserts a newline in the description, and a documented modifier saves from the description
- [ ] A help dialog lists every shortcut, and can be opened, read and closed using the keyboard alone
- [ ] Every shortcut is discoverable from that help dialog without prior knowledge
