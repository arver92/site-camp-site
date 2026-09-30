# site-camp-site

Static, mobile-first camping checklist for the Killbear trip. It uses plain HTML, CSS, and JavaScript and stores packed state, user-added items, and Everything else notes in the browser's local storage.

## Files

- `index.html` — page structure and three checklist tabs.
- `styles.css` — responsive layout, cards, controls, and accessibility states.
- `app.js` — tabs, search, filters, progress, and local persistence.
- `checklist.js` — editable checklist data grouped by tab and category.
- `Data/` — source CSV files used to prepare the checklist data.

The Camping supplies and Meals tabs include add-item and delete-item controls. Added items and device-local deletions are saved on the current device and reflected in categories, filters, and progress. The Everything else tab is only a free-form notes area for reservations, contacts, reminders, directions, and other trip details; it does not use checkboxes or checklist controls.

## Edit the checklist

Open `checklist.js` in VS Code. Each item has an `id`, `tab`, `category`, and `name`, with an optional `note`. Use these tab values:

- `camping`
- `meals`
- `everything`

Keep each `id` unique so saved packed state remains stable on a user's device.

## Preview locally

Open `index.html` in a browser, or use VS Code's Live Server extension if you prefer automatic reloads while editing.

## Publish with GitHub Pages

1. Create a GitHub repository and copy the contents of this folder into its repository root.
2. Commit and push the files.
3. In GitHub, open **Settings → Pages**.
4. Choose **Deploy from a branch**, select the default branch and `/ (root)`, then save.
5. Open the Pages URL shown by GitHub.

No build step is required.
