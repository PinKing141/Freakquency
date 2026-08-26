// Card schema: { id, level, category, subcategory?, type, icon, tags,
//   minPlayers, playersNeeded, mode?, timer?, drink, text }
// Levels 1-4 = Icebreaker/Spicy/Freaky/OMG; level 5 = Wildcard (chaos).
// minPlayers (default 2): 3 hides group/vote cards in a 2-player game.
// timer (seconds) runs the on-card countdown ring; drink = footer penalty.
// The deck is split per level into cards_l1..cards_wild for maintainability.

import { l1 } from './cards_l1.js';
import { l2 } from './cards_l2.js';
import { l3 } from './cards_l3.js';
import { l4 } from './cards_l4.js';
import { wild } from './cards_wild.js';

// Legacy packs predate the `contact` tag. Normalise those cards at load time
// so every physical card has the same metadata and therefore honours the
// physical-card setting everywhere the deck is used.
const PHYSICAL_TAGS = new Set([
  'kiss', 'makeout', 'lap', 'lapdance', 'grind', 'touch', 'body-shot',
  'strip', 'twerk', 'heaven'
]);
const PHYSICAL_TEXT = /\b(kiss|make out|lap dance|sit on .* lap|grind|massage|touch|feel|straddle|body shot|motorboat|slow-dance|slow dance|neck tease|waist touch|thigh touch)\b/i;

function normaliseCard(card) {
  const tags = card.tags || [];
  if (!tags.includes('contact') && (tags.some(tag => PHYSICAL_TAGS.has(tag)) || PHYSICAL_TEXT.test(card.text))) {
    return { ...card, tags: [...tags, 'contact'] };
  }
  return card;
}

export const cards = [...l1, ...l2, ...l3, ...l4, ...wild].map(normaliseCard);
