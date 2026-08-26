// Card drawer — the orchestrator. It no longer knows the *rules*: it asks
// cardFilters which cards are allowed, cardWeights how to bias them, and
// targetResolver how to word them. Just deck plumbing + the dead pile here.

import { state } from './gameState.js';
import { cards } from '../data/cards.js';
import { customCards } from './customCards.js';
import { settings } from './settings.js';
import { soloAllowed, roomAllowed } from './cardFilters.js';
import { weightedPool } from './cardWeights.js';
import { resolveCardText } from './targetResolver.js';
import { getChaosLevel } from './chaosMeter.js';

// Sample a card id from the pool, avoiding the short anti-repeat buffer.
function pick(pool, used) {
  let card = pool[Math.floor(Math.random() * pool.length)];
  let attempts = 0;
  while (used.includes(card.id) && attempts < 30) {
    card = pool[Math.floor(Math.random() * pool.length)];
    attempts++;
  }
  return card;
}

// --- Solo / pass-the-phone ---

function cardKind(card) { return card.subcategory || card.type; }

export function drawCard({ level = null, onlyDare = false } = {}) {
  const current = state.players[state.turn % state.players.length];
  const deck = [...cards, ...customCards];
  // The dead pile is set aside permanently (until reshuffled), so exclude it.
  let allowed = deck.filter(card =>
    soloAllowed(card, settings, state.players, current) && !state.deadPile.includes(card.id));
  if (state.effects.dareOnlyTurns) {
    const dares = allowed.filter(card => card.type === 'Dare');
    if (dares.length) allowed = dares;
  }
  if (level) {
    const atLevel = allowed.filter(card => card.level === level);
    if (atLevel.length) allowed = atLevel;
  }
  if (onlyDare) {
    const dares = allowed.filter(card => card.type === 'Dare');
    if (dares.length) allowed = dares;
  }
  // Never force a dead end, but avoid a third card from the same subtype.
  const [previous, latest] = state.recentKinds.slice(-2);
  if (previous && previous === latest) {
    const varied = allowed.filter(card => cardKind(card) !== latest);
    if (varied.length) allowed = varied;
  }
  if (!allowed.length) return null;

  const pool = weightedPool(allowed, {
    playerCount: state.players.length,
    intensity: settings.intensity,
    chaos: getChaosLevel()
  });
  const card = pick(pool, state.usedCards);

  state.usedCards.push(card.id);
  if (state.usedCards.length > Math.min(allowed.length, 25)) state.usedCards.shift();

  state.currentCard = card;
  const kind = cardKind(card);
  state.recentKinds.push(kind);
  if (state.recentKinds.length > 2) state.recentKinds.shift();

  const doubled = state.effects.doubleNext;
  if (state.effects.dareOnlyTurns) state.effects.dareOnlyTurns--;
  state.effects.doubleNext = false;
  const shownCard = doubled
    ? { ...card, timer: card.timer ? card.timer * 2 : 0, drink: `${card.drink || 'Drink penalty'} ×2` }
    : card;
  return { card: shownCard, sourceCard: card, text: resolveCardText(card, current, state.players), current };
}

// Solo-only Wildcard effects. These are applied once a Wildcard has been done.
export function activateWildcardEffect(card) {
  if (!card) return null;
  if (card.id === 'fq2_wild_021') { state.effects.dareOnlyTurns = Math.max(state.effects.dareOnlyTurns, 1); return { message: 'Dare Roulette: the next draw is a dare.' }; }
  if (card.id === 'fq2_wild_026') { state.effects.dareOnlyTurns = Math.max(state.effects.dareOnlyTurns, 3); return { message: 'Category Lock: the next 3 draws are dares.' }; }
  if (card.id === 'fq2_wild_022') { state.effects.doubleNext = true; return { message: 'Double or Nothing: the next card’s timer or penalty is doubled.' }; }
  if (card.id === 'fq2_wild_024') return { type: 'heat-ladder' };
  if (card.id === 'fq2_wild_025') return { type: 'dare-swap' };
  return null;
}

// Move the just-played card out of rotation into the face-down dead pile.
export function killCard(id) {
  if (id && !state.deadPile.includes(id)) state.deadPile.push(id);
}

// Reshuffle the live deck: clear the short anti-repeat buffer so the remaining
// (non-dead) cards get a fresh random order. The dead pile is left untouched.
export function reshuffleCurrent() {
  state.usedCards = [];
}

// --- Multiplayer: draws using room data, no DOM reads ---

export function drawCardForRoom(room) {
  const { players, currentPlayerIndex, usedCardIds = [], settings: roomSettings, customCards: roomCustom = [] } = room;
  const current = players[currentPlayerIndex];
  if (!current) return null;

  const deck = [...cards, ...roomCustom];
  const allowed = deck.filter(card => roomAllowed(card, roomSettings, players));
  if (!allowed.length) return null;

  const pool = weightedPool(allowed, {
    playerCount: players.length,
    intensity: roomSettings.intensity ?? 2,
    chaos: 0
  });
  const card = pick(pool, usedCardIds);

  return {
    id: card.id,
    level: card.level,
    type: card.type,
    icon: card.icon,
    timer: card.timer || 0,
    drink: card.drink || '',
    resolvedText: resolveCardText(card, current, players),
    currentPlayerName: current.name
  };
}
