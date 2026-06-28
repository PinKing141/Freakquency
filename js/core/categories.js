// Player-authored card categories (e.g. "Inside jokes"). Custom cards can be
// filed under one of these, and each category gets its own on/off toggle in the
// Game Settings modal. Stored in localStorage alongside the custom cards.

const KEY = 'freakquencyCategories';

function load() {
  try { return JSON.parse(localStorage.getItem(KEY) || '[]'); }
  catch { return []; }
}

// Live array — imported by the custom-cards UI and the settings UI.
export const categories = load();

function persist() {
  localStorage.setItem(KEY, JSON.stringify(categories));
}

function newId() {
  const rand = crypto.randomUUID
    ? crypto.randomUUID()
    : Date.now() + '_' + Math.random().toString(16).slice(2);
  return 'cat_' + rand;
}

export function addCategory(name) {
  const clean = (name || '').trim();
  if (!clean) return null;
  // Avoid duplicates (case-insensitive).
  const existing = categories.find(c => c.name.toLowerCase() === clean.toLowerCase());
  if (existing) return existing;
  const category = { id: newId(), name: clean };
  categories.push(category);
  persist();
  return category;
}

export function removeCategory(id) {
  const i = categories.findIndex(c => c.id === id);
  if (i > -1) { categories.splice(i, 1); persist(); }
}

export function categoryName(id) {
  const c = categories.find(x => x.id === id);
  return c ? c.name : null;
}
