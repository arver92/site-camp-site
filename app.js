const STORAGE_KEY = "site-camp-site-packed-v1";
const CUSTOM_ITEMS_KEY = "site-camp-site-custom-items-v1";
const DELETED_ITEMS_KEY = "site-camp-site-deleted-items-v1";
const DETAILS_KEY = "site-camp-site-details-v1";
const DATA_FILES = { camping: "Data/camping_supplies.json", meals: "Data/meals.json", everything: "Data/everything_else.json" };
const tabLabels = { camping: "Camping supplies", meals: "Meals", everything: "Everything else" };
let checklistItems = [];
const state = { tab: "camping", status: "all", category: "all", search: "", packed: loadPacked(), customItems: loadCustomItems(), deleted: loadDeletedItems() };

const panel = document.querySelector("#checklist-panel");
const emptyState = document.querySelector("#empty-state");
const searchInput = document.querySelector("#search-input");
const categoryFilter = document.querySelector("#category-filter");
const progressCount = document.querySelector("#progress-count");
const progressLabel = document.querySelector("#progress-label");
const progressBar = document.querySelector("#progress-bar");
const addItemPanel = document.querySelector("#add-item-panel");
const addItemForm = document.querySelector("#add-item-form");
const newItemInput = document.querySelector("#new-item-input");
const newItemCategory = document.querySelector("#new-item-category");
const detailsPanel = document.querySelector("#details-panel");
const detailsInput = document.querySelector("#details-input");

function loadPacked() { try { return new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")); } catch { return new Set(); } }
function loadCustomItems() { try { return JSON.parse(localStorage.getItem(CUSTOM_ITEMS_KEY) || "[]"); } catch { return []; } }
function loadDeletedItems() { try { return new Set(JSON.parse(localStorage.getItem(DELETED_ITEMS_KEY) || "[]")); } catch { return new Set(); } }
function savePacked() { localStorage.setItem(STORAGE_KEY, JSON.stringify([...state.packed])); }
function saveCustomItems() { localStorage.setItem(CUSTOM_ITEMS_KEY, JSON.stringify(state.customItems)); }
function saveDeletedItems() { localStorage.setItem(DELETED_ITEMS_KEY, JSON.stringify([...state.deleted])); }
function allItems() { return checklistItems.concat(state.customItems); }
function itemsForTab() { return allItems().filter(item => item.tab === state.tab && !state.deleted.has(item.id)); }

function populateCategoryFilter() {
  const categories = [...new Set(itemsForTab().map(item => item.category))];
  categoryFilter.innerHTML = '<option value="all">All categories</option>' + categories.map(category => `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`).join("");
  if (categories.includes(state.category)) categoryFilter.value = state.category;
  else { state.category = "all"; categoryFilter.value = "all"; }
  newItemCategory.innerHTML = categories.map(category => `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`).join("");
}

function visibleItems() {
  const query = state.search.trim().toLowerCase();
  return itemsForTab().filter(item => {
    const matchesStatus = state.status === "all" || (state.status === "packed" ? state.packed.has(item.id) : !state.packed.has(item.id));
    const matchesCategory = state.category === "all" || item.category === state.category;
    const text = `${item.name} ${item.category} ${item.note || ""}`.toLowerCase();
    return matchesStatus && matchesCategory && (!query || text.includes(query));
  });
}

function render() {
  const isDetailsTab = state.tab === "everything";
  addItemPanel.hidden = isDetailsTab;
  detailsPanel.hidden = !isDetailsTab;
  document.querySelector(".controls").hidden = isDetailsTab;
  panel.hidden = isDetailsTab;
  emptyState.hidden = isDetailsTab;
  document.querySelector("#clear-packed").hidden = isDetailsTab;
  if (isDetailsTab) { updateProgress(); return; }
  const items = visibleItems();
  const grouped = new Map();
  items.forEach(item => { if (!grouped.has(item.category)) grouped.set(item.category, []); grouped.get(item.category).push(item); });
  panel.innerHTML = [...grouped.entries()].map(([category, categoryItems]) => `<article class="category-card"><header class="category-heading"><h2>${escapeHtml(category)}</h2><span class="category-count">${categoryItems.length} ${categoryItems.length === 1 ? "item" : "items"}</span></header><ul class="item-list">${categoryItems.map(renderItem).join("")}</ul></article>`).join("");
  emptyState.hidden = items.length !== 0;
  updateProgress();
}

function renderItem(item) {
  const packed = state.packed.has(item.id);
  return `<li class="check-item${packed ? " is-packed" : ""}"><label class="check-label"><input type="checkbox" data-item-id="${item.id}"${packed ? " checked" : ""}><span class="item-copy"><span class="item-name">${escapeHtml(item.name)}</span>${item.note ? `<span class="item-note">${escapeHtml(item.note)}</span>` : ""}</span></label><button class="delete-item" type="button" data-delete-id="${item.id}" aria-label="Delete ${escapeHtml(item.name)}">Delete</button></li>`;
}

function updateProgress() {
  const items = itemsForTab();
  if (state.tab === "everything") { progressCount.textContent = "Details only"; progressLabel.textContent = tabLabels[state.tab]; progressBar.style.width = "0%"; progressBar.parentElement.setAttribute("aria-label", "Details only"); return; }
  const packedCount = items.filter(item => state.packed.has(item.id)).length;
  const percent = items.length ? Math.round((packedCount / items.length) * 100) : 0;
  progressCount.textContent = `${packedCount} / ${items.length} packed`;
  progressLabel.textContent = tabLabels[state.tab];
  progressBar.style.width = `${percent}%`;
  progressBar.parentElement.setAttribute("aria-label", `${percent}% packed`);
}

function setTab(tab) {
  state.tab = tab;
  document.querySelectorAll(".tab").forEach(button => { const active = button.dataset.tab === tab; button.classList.toggle("is-active", active); button.setAttribute("aria-selected", active); });
  populateCategoryFilter();
  render();
}

function escapeHtml(value) { return String(value).replace(/[&<>'"]/g, character => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", "'":"&#39;", '"':"&quot;" }[character])); }

document.querySelectorAll(".tab").forEach(button => button.addEventListener("click", () => setTab(button.dataset.tab)));
document.querySelectorAll(".filter-button").forEach(button => button.addEventListener("click", () => { state.status = button.dataset.status; document.querySelectorAll(".filter-button").forEach(filter => filter.classList.toggle("is-active", filter === button)); render(); }));
searchInput.addEventListener("input", event => { state.search = event.target.value; render(); });
categoryFilter.addEventListener("change", event => { state.category = event.target.value; render(); });
panel.addEventListener("change", event => { if (!event.target.matches("input[data-item-id]")) return; const id = event.target.dataset.itemId; event.target.checked ? state.packed.add(id) : state.packed.delete(id); savePacked(); render(); });
panel.addEventListener("click", event => {
  const button = event.target.closest("button[data-delete-id]");
  if (!button) return;
  const id = button.dataset.deleteId;
  if (!window.confirm("Delete this item from the checklist on this device?")) return;
  state.deleted.add(id);
  state.packed.delete(id);
  saveDeletedItems();
  savePacked();
  populateCategoryFilter();
  render();
});
addItemForm.addEventListener("submit", event => {
  event.preventDefault();
  const name = newItemInput.value.trim();
  if (!name || state.tab === "everything") return;
  const item = { id: `custom-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, tab: state.tab, category: newItemCategory.value || "Other", name, custom: true };
  state.customItems.push(item);
  saveCustomItems();
  newItemInput.value = "";
  state.category = "all";
  populateCategoryFilter();
  render();
  newItemInput.focus();
});
detailsInput.addEventListener("input", event => localStorage.setItem(DETAILS_KEY, event.target.value));
document.querySelector("#clear-packed").addEventListener("click", () => { if (!state.packed.size || window.confirm("Clear all packed items on this device?")) { state.packed.clear(); savePacked(); render(); } });

async function loadData() {
  const [campingResponse, mealsResponse, detailsResponse] = await Promise.all([
    fetch(DATA_FILES.camping),
    fetch(DATA_FILES.meals),
    fetch(DATA_FILES.everything)
  ]);
  if (!campingResponse.ok || !mealsResponse.ok || !detailsResponse.ok) throw new Error("Unable to load checklist data.");
  const [campingItems, mealItems, details] = await Promise.all([campingResponse.json(), mealsResponse.json(), detailsResponse.json()]);
  checklistItems = campingItems.concat(mealItems);
  const savedDetails = localStorage.getItem(DETAILS_KEY);
  detailsInput.value = savedDetails !== null ? savedDetails : (details.details || "");
}

async function init() {
  try {
    await loadData();
    populateCategoryFilter();
    render();
  } catch (error) {
    panel.innerHTML = `<p class="empty-state">Checklist data could not be loaded. Please refresh the page.</p>`;
    detailsInput.value = localStorage.getItem(DETAILS_KEY) || "";
    console.error(error);
  }
}

init();
