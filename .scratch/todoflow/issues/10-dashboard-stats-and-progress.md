# 10: Dashboard stats and today's progress

**What to build:** The home screen from TOR section 4 — four stat cards and a progress bar, with a definition for each that cannot contradict itself.

**Blocked by:** 08 — Seven views as routes, with navigation and empty states

**Status:** ready-for-agent

- [ ] Four cards show todos due today, overdue, completed today, and still remaining
- [ ] Completed-today counts work finished today even when that work was due on another day
- [ ] Archived todos are counted in none of the four cards
- [ ] A progress bar shows the share of the due-today-or-earlier docket that is complete
- [ ] The progress bar can never exceed 100%, and shows no value when nothing is due
- [ ] Clearing a backlog visibly moves the bar
- [ ] Each card links to the matching view
- [ ] Cards and progress update immediately when a todo is completed or undone
- [ ] The card counts and the progress fraction are covered by unit tests
