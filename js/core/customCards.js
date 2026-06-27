// Player-authored cards. Solo cards live in localStorage; multiplayer cards
// live on the room document (see roomService). Both use buildCustomCard so the
// objects share the exact shape of the built-in cards and flow through the same
// draw/render pipeline.

const KEY = 'freakquencyCustomCards';
const LEVEL_ICON = { 1: '🧊', 2: '🌶️', 3: '🫦', 4: '😱' };

function load() {
  try { return JSON.parse(localStorage.getItem(KEY) || '[]'); }
  catch { return []; }
}

// Live array — imported directly by the draw logic and the setup UI.
export const customCards = load();

function persist() {
  localStorage.setItem(KEY, JSON.stringify(customCards));
}

function newId() {
  const rand = crypto.randomUUID
    ? crypto.randomUUID()
    : Date.now() + '_' + Math.random().toString(16).slice(2);
  return 'custom_' + rand;
}

// Returns a card object in the same shape as the built-in cards.
export function buildCustomCard({ text, level }) {
  const lvl = Number(level);
  return {
    id: newId(),
    level: lvl,
    type: 'Custom',
    icon: LEVEL_ICON[lvl] || '✍️',
    tags: [],
    text: text.trim(),
    custom: true
  };
}

// --- Solo (localStorage) ---

export function addCustomCard({ text, level }) {
  const card = buildCustomCard({ text, level });
  customCards.push(card);
  persist();
  return card;
}

export function removeCustomCard(id) {
  const i = customCards.findIndex(c => c.id === id);
  if (i > -1) { customCards.splice(i, 1); persist(); }
}
