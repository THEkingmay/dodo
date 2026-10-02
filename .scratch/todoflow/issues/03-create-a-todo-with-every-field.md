# 03: Create a todo with every field

**What to build:** The add-todo form takes every field the data model defines, and each field is rendered back on the row so its value is visible.

**Blocked by:** 02 — Add a todo and see it survive a refresh

**Status:** ready-for-agent

- [ ] The add-todo form accepts title, description, priority, due date and tags
- [ ] A title is required, and the form refuses to submit without one
- [ ] Priority defaults to Medium and can be changed in the form
- [ ] A due date can be set and cleared again
- [ ] Tags can be added and removed before saving
- [ ] Each todo shows its priority as coloured bars plus a written priority label, fully readable without colour perception
- [ ] Each todo shows a plain-language due status — Due today, Due tomorrow, Due in N days, or Overdue
- [ ] A todo with no due date shows no due status at all, rather than a misleading one
- [ ] Malformed input in any field is rejected with a message that names the field
- [ ] Every field survives a page reload
