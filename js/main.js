import { state } from './core/gameState.js';
import { addPlayer, removePlayer, resetPlayers } from './core/playerManager.js';
import { drawCard } from './core/cardDrawer.js';
import { advanceTurn, resetTurn } from './core/turnManager.js';
import { clearPlayers } from './core/storage.js';
import { showScreen } from './ui/screens.js';
import { renderCard } from './ui/renderCard.js';
import { renderPlayers, renderScores } from './ui/renderPlayers.js';

function refreshPlayers() {
  renderPlayers(state.players, index => {
    removePlayer(index);
    refreshPlayers();
    renderScores(state.players);
  });
}

function handleDrawCard() {
  if (state.players.length < 2) return alert('Add at least 2 players.');
  const result = drawCard();
  if (!result) return alert('No cards match these settings. Turn on more levels/settings or update players.');
  renderCard(result);
}

function handleNextTurn(scored) {
  if (!state.players.length) return;
  advanceTurn(scored);
  renderScores(state.players);
  handleDrawCard();
}

// --- Event bindings ---

document.querySelector('#startSetup').onclick = () => showScreen('setup');
document.querySelector('#backSetup').onclick  = () => showScreen('setup');

document.querySelector('#addPlayer').onclick = () => {
  const nameInput = document.querySelector('#playerName');
  const name = nameInput.value.trim();
  if (!name) return alert('Add a player name first.');
  addPlayer({
    name,
    gender:  document.querySelector('#playerGender').value,
    flirt:   document.querySelector('#playerFlirt').value === 'yes',
    contact: document.querySelector('#playerContact').value === 'yes'
  });
  nameInput.value = '';
  refreshPlayers();
};

document.querySelector('#playerName').addEventListener('keydown', e => {
  if (e.key === 'Enter') document.querySelector('#addPlayer').click();
});

document.querySelector('#beginGame').onclick = () => {
  if (state.players.length < 2) return alert('Add at least 2 players.');
  showScreen('game');
  renderScores(state.players);
  handleDrawCard();
};

document.querySelector('#newCard').onclick = handleDrawCard;
document.querySelector('#didIt').onclick   = () => handleNextTurn(true);
document.querySelector('#drink').onclick   = () => handleNextTurn(false);

document.querySelector('#resetAll').onclick = () => {
  if (!confirm('Reset all players and scores?')) return;
  resetPlayers();
  clearPlayers();
  resetTurn();
  refreshPlayers();
  renderScores(state.players);
};

// Init
refreshPlayers();
renderScores(state.players);
