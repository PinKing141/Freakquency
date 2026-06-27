import { state } from './gameState.js';
import { savePlayers } from './storage.js';

export function addPlayer({ name, gender, flirt, contact }) {
  state.players.push({
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random()),
    name,
    gender,
    flirt,
    contact,
    score: 0
  });
  savePlayers(state.players);
}

export function removePlayer(index) {
  state.players.splice(index, 1);
  savePlayers(state.players);
}

export function resetPlayers() {
  state.players = [];
  savePlayers(state.players);
}
