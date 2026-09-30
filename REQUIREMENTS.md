# site-camp-site — Development Requirements

**Document status:** Draft for review and approval  
**Application name:** site-camp-site  
**Project location:** `C:\Users\JARVIS\Documents\Personal\site-camp-site`  
**Editing environment:** Visual Studio Code  
**Purpose:** Define the requirements and proposed delivery plan before implementation begins.

> **Approval gate:** This document records the intended scope. Application development must not begin until the user has reviewed and approved these requirements.

## 1. Project summary

site-camp-site is a standalone, mobile-friendly camping checklist website. It replaces the current Google Sheets-based maintenance approach with a simple static web app built from HTML, CSS, and JavaScript. The checklist should be quick to use while preparing for a trip and practical to use on a phone at a campsite.

The app should be hostable for free as a static site, with GitHub Pages as the preferred option. It should not require a database, application server, sign-in, or Google account. Checked items are saved in the browser on the device where they were checked.

## 2. Goals

- Provide a searchable camping packing checklist organized by category.
- Make the checklist usable on small phones through desktop monitors.
- Let the user mark items packed and see packing progress.
- Keep checklist data easy to edit locally in VS Code without maintaining a spreadsheet.
- Keep the app lightweight and suitable for free static hosting.
- Consider offline and installable use for campsite conditions.

## 3. Scope and decisions

### Confirmed requirements

| Area | Requirement |
| --- | --- |
| Application | Name the project and application `site-camp-site`. |
| Product | A standalone static camping checklist web app. |
| Source format | Use plain HTML, CSS, and JavaScript. Google Sheets will not be required for ongoing maintenance. |
| Devices | Use a mobile-first responsive design that adapts to small and large phones, tablets, laptops, and desktop monitors. |
| Search | Search checklist items immediately as the user types. |
| Organization | Group items into categories such as Shelter, Cooking, Clothing, Safety, and Electronics. |
| Packing state | Provide a checkbox for each checklist item. |
| Persistence | Save checked state in browser local storage on that device. No account or server-side syncing is required. |
| Progress | Show packed count and total, for example `24 / 67 packed`. |
| View filters | Provide All, Packed, and Remaining views. |
| Hosting | Target free static hosting, with GitHub Pages as the preferred host. |
| Editing | Make checklist content straightforward to maintain in local project files using VS Code. |
| Accessibility | Use readable contrast, keyboard-operable controls, and properly labeled checkboxes. |
| Performance | Keep the app fast, with minimal external dependencies and no heavy framework unless later approved. |

### Proposed implementation choices

These choices follow the discussions and can be adjusted during requirements approval:

- Store checklist records separately from rendering and interaction code, so routine item edits do not require changing the interface logic.
- Use a data file such as `checklist.js` for item names, categories, quantities, and optional notes.
- Treat each browser/device as having its own packing progress. The same hosted list can be shared, but checked state is not synchronized between people or devices.
- Use CSS Grid or Flexbox and fluid sizing rather than fixed page widths. Avoid horizontal scrolling on phone-sized screens.

### Suggested project structure

```text
site-camp-site/
├── index.html          # Page structure and app entry point
├── styles.css          # Responsive visual design
├── app.js              # Search, filters, checklist rendering, and saved state
├── checklist.js        # Editable checklist content, separate from app behavior
├── manifest.json       # Optional PWA metadata, if PWA is approved
├── service-worker.js   # Optional offline caching, if PWA/offline is approved
└── icons/              # Optional installable-app icons
```

The structure is a proposal, not a requirement to create every listed file. Optional PWA files should only be included if that enhancement is approved.

## 4. Functional requirements

### 4.1 Checklist content

- Provide three top-level tabs: **Camping supplies**, **Meals**, and **Everything Else**.
- Within each tab, display items in category cards or sections, grouping related items together (for example, Shelter and Cooking under Camping supplies).
- Display only the selected tab's content at a time, while keeping tab navigation clear and usable on phones.
- An item may include a quantity and, if useful, a short note.
- Keep checklist content in a clearly identified, easy-to-edit data section/file.
- Adding or changing an item should not require editing the search/filter implementation.
- Provide a text box and add button in the Camping supplies and Meals tabs so users can add new checklist items on the page.
- Save user-added checklist items locally on the current device and include them in the relevant tab's categories, filters, and progress count.
- Provide a delete action for checklist items in the Camping supplies and Meals tabs. Deleting an item is saved locally on the current device and removes it from the relevant tab's categories, filters, and progress count.
- Make the Everything else tab a free-form text area for trip details. It does not require checklist items, checkboxes, packing filters, or packing progress.

### 4.2 Search and filtering

- Provide a clearly labeled search field.
- Update visible results as the user types, matching item names and, where practical, category and note text.
- Provide category selection/filtering so users can narrow the list to a category within the selected tab.
- Keep the three top-level tabs distinct from the category cards/sections nested within them.
- Provide All, Packed, and Remaining views.
- Search, category selection, and packing-status filters should work together within the selected tab.
- Switching tabs should show the corresponding items and categories; the All/Packed/Remaining views apply to the active tab.
- Provide a clear empty state when no items match.

### 4.3 Packing state and progress

- Let users toggle each item between packed and remaining.
- Restore saved checked state when the same browser/device revisits the page.
- Update the packed count and progress display when an item is toggled.
- Keep state local to the current browser/device. Cross-device or multi-person synchronization is outside the initial scope.

### 4.4 Responsive interaction

- Present checklist items in a readable, touch-friendly layout on phones.
- Use comfortable spacing and generous tap targets for checkboxes and controls.
- On wider screens, use the available space effectively; a multi-column category layout may be used where it remains clear.
- Keep text and controls usable at common screen sizes without requiring horizontal scrolling.

## 5. Quality requirements

### Accessibility

- Use semantic HTML and a logical heading structure.
- Associate each checkbox with its item label.
- Ensure controls are operable by keyboard and have visible focus indication.
- Use sufficient text/background contrast and do not convey packed status by color alone.

### Performance and reliability

- Keep page assets small and avoid unnecessary third-party services.
- The core checklist experience must not depend on a network service beyond loading the hosted static files.
- If offline/PWA support is approved, document the supported offline behavior and provide a clear update strategy for cached files.

### Privacy and data boundaries

- The initial app has no account, database, or server-side storage.
- Packing state remains in browser local storage on the device used. Clearing browser site data may clear this state.
- The public hosted checklist content should not contain private information.

## 6. Future enhancements — not in initial scope unless approved

- Installable Progressive Web App (PWA) experience.
- Offline caching for use where campsite connectivity is unavailable.
- Cross-device or shared packing progress.
- User accounts, database, server, or cloud synchronization.
- Automatic synchronization from Google Sheets.
- Multiple trip profiles, reusable trip templates, or trip-specific lists.
- Adding and editing checklist items through an in-app editor rather than editing the data file.

PWA installation and offline behavior were discussed as optional enhancements. Their exact behavior and acceptance criteria must be agreed before they are included in implementation.

## 7. Initial acceptance criteria

The first implementation will be considered aligned with this specification when:

1. The static app opens from its hosted URL without requiring a login or database.
2. Three tabs are available: Camping supplies, Meals, and Everything Else.
3. Within each tab, related items appear grouped in category cards or sections, and the source data is maintainable in the project files.
4. Search updates results as the user types within the active tab.
5. Category selection and All/Packed/Remaining filters narrow the displayed items in the active tab and can be combined with search.
6. A user can check and uncheck items, and the page shows the correct packed/total progress for the active tab.
7. Checked state remains after reloading in the same browser/device.
8. The layout is usable on phone, tablet, laptop, and desktop widths without horizontal page scrolling.
9. Controls have readable labels, sufficient contrast, visible keyboard focus, and touch-friendly targets.
10. The project can be published as static files using the agreed free hosting approach.

Offline/PWA acceptance criteria are deferred until that enhancement is approved.

## 8. Proposed development phases

1. **Requirements approval** — Review this document, resolve open choices, and approve the initial scope. No implementation before this gate.
2. **Project setup** — Create the agreed files and establish the checklist data format.
3. **Core checklist** — Build the semantic page, category grouping, search, status filters, checkboxes, progress indicator, and local persistence.
4. **Responsive and accessible refinement** — Tune layout and touch interaction across device sizes; check keyboard operation, labels, focus, and contrast.
5. **Review and release preparation** — Review the completed behavior and prepare static hosting configuration/documentation for GitHub Pages.
6. **Optional PWA phase** — Only if approved, add manifest, icons, offline caching, and installability behavior.

## 9. Open decisions for approval

The following details were not settled in the conversation and can be decided before or during implementation planning:

- Final checklist item inventory, assignment of each item to one of the three tabs, category names within each tab, quantities, and notes.
- Whether category filtering should use buttons, a dropdown, or another compact phone-friendly control.
- Whether the optional PWA/offline phase belongs in the first release.
- Whether a reset/clear-packed action is needed, and what confirmation it should require.
- Final visual style, colors, and branding.
- GitHub repository name and ownership, when preparing to publish.

## 10. Change control

This document is the baseline for the initial project scope. Changes to the confirmed requirements or inclusion of future enhancements should be reviewed and recorded before implementation of the affected work. Development begins only after the user approves the requirements.

