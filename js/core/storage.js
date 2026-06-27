const PLAYERS_KEY = 'freakquencyPlayers';

export function loadPlayers() {
  return JSON.parse(localStorage.getItem(PLAYERS_KEY) || '[]');
}

export function savePlayers(players) {
  localStorage.setItem(PLAYERS_KEY, JSON.stringify(players));
}

export function clearPlayers() {
  localStorage.removeItem(PLAYERS_KEY);
}
