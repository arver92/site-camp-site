# site-camp-site

Static, mobile-first camping checklist for the Killbear trip. It uses plain HTML, CSS, and JavaScript and loads its published seed data from JSON files in `Data/`. Packed state, user-added items, deletions, and Everything else notes are stored in the browser's local storage.

## Files

- `index.html` — page structure and three checklist tabs.
- `styles.css` — responsive layout, cards, controls, and accessibility states.
- `app.js` — tabs, search, filters, progress, and local persistence.
- `Data/camping_supplies.json` — Camping supplies records.
- `Data/meals.json` — Meals records.
- `Data/everything_else.json` — initial Everything else details.
- `Data/` — original CSV source files are retained for reference.

The Camping supplies and Meals tabs include add-item and delete-item controls. Added items and device-local deletions are saved on the current device and reflected in categories, filters, and progress. The Everything else tab is only a free-form notes area for reservations, contacts, reminders, directions, and other trip details; it does not use checkboxes or checklist controls.

## Edit the checklist

Open the relevant JSON file in VS Code. Each checklist item has an `id`, `tab`, `category`, and `name`, with an optional `note`.

- `camping`
- `meals`
- `everything`

Keep each `id` unique so saved packed state remains stable on a user's device.

The browser reads the JSON files when the page loads. GitHub Pages cannot accept browser writes back into repository files, so changes made in the UI are kept immediately in local storage for that device. To publish shared changes for everyone, edit the JSON files and commit/push them to GitHub.

## Preview locally

Because the app fetches JSON files, preview it through a local web server such as VS Code's Live Server extension. Opening `index.html` directly with a `file://` URL may block JSON loading in the browser.

## Publish with GitHub Pages

1. Create a GitHub repository and copy the contents of this folder into its repository root.
2. Commit and push the files.
3. In GitHub, open **Settings → Pages**.
4. Choose **Deploy from a branch**, select the default branch and `/ (root)`, then save.
5. Open the Pages URL shown by GitHub.

No build step is required.
