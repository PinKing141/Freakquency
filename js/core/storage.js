const PLAYERS_KEY = 'freakquencyPlayers';
const CARD_FEEDBACK_KEY = 'freakquencyCardFeedback';

export function loadPlayers() {
  return JSON.parse(localStorage.getItem(PLAYERS_KEY) || '[]');
}

export function savePlayers(players) {
  localStorage.setItem(PLAYERS_KEY, JSON.stringify(players));
}

export function clearPlayers() {
  localStorage.removeItem(PLAYERS_KEY);
}

// Local-only playtest notes used to curate the deck after real sessions.
export function recordCardFeedback(cardId, rating) {
  if (!cardId || !['tame', 'good', 'awkward', 'skip'].includes(rating)) return;
  let feedback = {};
  try { feedback = JSON.parse(localStorage.getItem(CARD_FEEDBACK_KEY) || '{}'); }
  catch { feedback = {}; }
  const card = feedback[cardId] || { tame: 0, good: 0, awkward: 0, skip: 0 };
  card[rating] += 1;
  feedback[cardId] = card;
  localStorage.setItem(CARD_FEEDBACK_KEY, JSON.stringify(feedback));
}

export function getCardFeedback() {
  try { return JSON.parse(localStorage.getItem(CARD_FEEDBACK_KEY) || '{}'); }
  catch { return {}; }
}

export function clearCardFeedback() {
  localStorage.removeItem(CARD_FEEDBACK_KEY);
}
