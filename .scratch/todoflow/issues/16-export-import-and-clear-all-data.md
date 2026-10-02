# 16: Export, import, and clear all data

**What to build:** The data management section of the TOR — getting data out of the app, putting it back, and destroying it deliberately.

**Blocked by:** 15 — Bulk actions

**Status:** ready-for-agent

- [ ] Export produces a JSON file containing every todo plus the saved settings, tagged with a format version and the time it was made
- [ ] Export also produces a CSV file for spreadsheets, covering active and archived todos
- [ ] Import validates the file and reports how many todos it found and how many local todos it would replace, before anything changes
- [ ] Import replaces existing todos only after explicit confirmation, and never merges
- [ ] A file that fails validation is rejected with a readable explanation and changes nothing
- [ ] A file from an older format version is migrated forward where possible, and refused with an explanation where not
- [ ] Clear all data deletes every todo, asks for confirmation first, and is undoable within the same session
- [ ] Clear all data leaves the theme and settings intact
- [ ] The README states plainly that CSV is export-only
