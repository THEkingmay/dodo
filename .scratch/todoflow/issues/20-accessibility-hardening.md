# 20: Accessibility hardening

**What to build:** The cross-cutting accessibility work from TOR section 25 that no single feature ticket can own — the pieces that need whole-app knowledge to get right.

**Blocked by:** 12 — Keyboard shortcuts and the help dialog; 14 — Drag to reorder, plus keyboard reorder; 15 — Bulk actions; 19 — Responsive layout

**Status:** ready-for-agent

- [ ] Every interactive element is reachable and operable by keyboard, with a visible focus indicator
- [ ] Dialogs trap focus and restore it to the control that opened them
- [ ] Focus moves to the main content on view change
- [ ] The todo list is a single tab stop rather than one tab stop per row
- [ ] Status is never conveyed by colour alone — priority, completion and overdue each carry a second, non-colour signal
- [ ] Body text meets contrast requirements in both themes, including muted text and destructive-action text
- [ ] A skip link jumps past the navigation
- [ ] Every control has an accessible name, including the icon-only ones
- [ ] A screen reader announces toast messages, reorder results, changes to the progress value, and how many todos are currently shown
