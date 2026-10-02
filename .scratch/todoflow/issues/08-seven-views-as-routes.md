# 08: Seven views as routes, with navigation and empty states

**What to build:** Every filter the TOR lists becomes an addressable view, and the navigation list and the filter list become the same single element so they can never drift apart.

**Blocked by:** 07 — Sort and search the list

**Status:** ready-for-agent

- [ ] Seven views exist — all, active, completed, today, upcoming, overdue, archived — each with its own addressable URL
- [ ] Each view shows exactly the todos its definition calls for
- [ ] The archived view shows archived todos whether or not they are completed
- [ ] The navigation list is the filter list — one list, no duplication — and it highlights the current view
- [ ] Direct links and page refreshes land on the correct view rather than a 404
- [ ] Back and forward move between views
- [ ] Every view has its own empty state explaining what would appear there, and none of them is a blank screen
- [ ] Opening an address that does not exist lands on the dashboard rather than a raw error
