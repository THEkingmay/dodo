# 07: Sort and search the list

**What to build:** The two list modifiers — ordering and narrowing — both driven from the URL so a view can be shared and restored.

**Blocked by:** 04 — Edit, complete, and delete a todo

**Status:** ready-for-agent

- [ ] Sorting by newest, oldest, priority, due date and alphabetical all work
- [ ] A custom manual order option appears only once a todo has been reordered
- [ ] Todos with no due date sort last, in both ascending and descending order
- [ ] Two todos sharing a due date keep a stable, predictable order and do not shuffle between renders
- [ ] Searching matches titles, descriptions and tags, updating as the user types
- [ ] Search is case-insensitive
- [ ] The search text and the chosen sort live in the URL, so the view can be shared and survives a reload
- [ ] Typing in the search box does not fill the browser history; explicitly changing the sort does
- [ ] URLs carry no search or sort parameters when both are at their default
