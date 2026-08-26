// Card filtering — decides *whether* a card may appear. Pure functions, no DOM:
// give them a card + the current context and they return true/false. Kept apart
// from drawing and weighting so each concern can grow on its own.

import { isCategoryEnabled } from './settings.js';

// Older card packs used descriptive physical tags (kiss, lap, grind, etc.)
// before `contact` was standardised. Treat them as contact cards too, so the
// physical-card preference remains a hard gate while metadata is cleaned up.
const PHYSICAL_TAGS = new Set([
  'contact', 'kiss', 'makeout', 'lap', 'lapdance', 'grind', 'touch',
  'body-shot', 'strip', 'twerk', 'heaven'
]);

function isPhysical(card) {
  return card.tags.some(tag => PHYSICAL_TAGS.has(tag));
}

function packAllows(card, settings) {
  switch (settings.deckPack) {
    case 'couples': return card.tags.includes('2p');
    case 'first-date': return card.level <= 2 && !isPhysical(card);
    case 'no-contact': return !isPhysical(card);
    case 'extreme': return card.level >= 3 && (card.type === 'Dare' || card.level === 5);
    default: return true;
  }
}

// Solo / pass-the-phone. `settings` is the persisted solo settings object,
// `current` is the player whose turn it is (for per-player comfort opt-ins).
export function soloAllowed(card, settings, players, current) {
  if (!settings.levels[card.level]) return false;
  if (!packAllows(card, settings)) return false;
  if (players.length < (card.minPlayers || 2)) return false;
  if (isPhysical(card) && !settings.allowContact) return false;
  if (isPhysical(card) && !current.contact) return false;
  if (card.tags.includes('flirt')   && !current.flirt)   return false;
  if (!settings.allowNever && card.type === 'Never Have I Ever') return false;
  if (!settings.allowWould && card.type === 'Would You Rather') return false;
  if (card.tags.includes('target')  && !settings.allowTarget) return false;
  if (card.categoryId && !isCategoryEnabled(card.categoryId)) return false;
  return true;
}

// Multiplayer. `settings` is the room's settings document.
export function roomAllowed(card, settings, players) {
  const maxLevel = settings.maxLevel || 4;
  if (card.level > maxLevel) return false;
  if (players.length < (card.minPlayers || 2)) return false;
  if (!settings.allowPhysicalCards && isPhysical(card)) return false;
  if (!settings.allowTargetedCards && card.tags.includes('target')) return false;
  return true;
}
