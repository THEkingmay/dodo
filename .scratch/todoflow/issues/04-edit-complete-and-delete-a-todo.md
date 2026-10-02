# 04: Edit, complete, and delete a todo

**What to build:** The rest of the core lifecycle. A todo can be changed, marked done, and removed, and the row reflects its state.

**Blocked by:** 03 — Create a todo with every field

**Status:** ready-for-agent

- [ ] A todo's title, description, priority, due date and tags can all be edited
- [ ] Editing is possible both inline from the row and in a dialog
- [ ] Pressing Escape leaves inline editing without saving
- [ ] Completing a todo marks it done; completing it again un-marks it
- [ ] Completing records when it happened, and un-completing clears that record
- [ ] Deleting a todo removes it from the list
- [ ] A completed todo is visually distinct by more than one signal — checkbox state and strikethrough together
- [ ] Every one of these actions immediately updates the due status and the counts the dashboard will show
- [ ] Unit tests cover each action's effect on the stored todos
