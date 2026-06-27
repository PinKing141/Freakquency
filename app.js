const screens = {
  start: document.querySelector('#screen-start'),
  setup: document.querySelector('#screen-setup'),
  game: document.querySelector('#screen-game')
};

const state = {
  players: JSON.parse(localStorage.getItem('freakquencyPlayers') || '[]'),
  turn: 0,
  usedCards: [],
  currentCard: null
};

const cards = [
  // L1 Icebreaker
  { level: 1, type: 'Icebreaker', icon: '🧊', tags: [], text: '{player}, pick the player you think gives the best advice. They drink if they disagree.' },
  { level: 1, type: 'Icebreaker', icon: '🧊', tags: [], text: 'Never have I ever lied about being “on my way”. Drink if you have.' },
  { level: 1, type: 'Icebreaker', icon: '🧊', tags: [], text: 'Would you rather expose your search history or your camera roll for 30 seconds?' },
  { level: 1, type: 'Icebreaker', icon: '🧊', tags: [], text: '{player}, stare down {target}. First person to laugh drinks.' },
  { level: 1, type: 'Icebreaker', icon: '🧊', tags: [], text: 'Everyone who has ever gone back to someone they swore they were done with drinks.' },
  { level: 1, type: 'Icebreaker', icon: '🧊', tags: [], text: '{player}, tell the group your most harmless red flag or drink twice.' },
  { level: 1, type: 'Shot Card', icon: '🥃', tags: [], text: '{player}, take 1 sip. If you refuse, answer: who here would survive best in a scandal?' },
  { level: 1, type: 'Shot Card', icon: '🥃', tags: [], text: 'Last person to touch the floor drinks. No arguing.' },
  { level: 1, type: 'Question', icon: '🎲', tags: [], text: 'Who in the room has the most “innocent face, dangerous mind” energy?' },
  { level: 1, type: 'Vote', icon: '👀', tags: [], text: 'Group vote: who is most likely to flirt accidentally without noticing?' },

  // L2 Spicy but not explicit
  { level: 2, type: 'Spicy', icon: '🌶️', tags: ['target'], text: '{player}, choose one player you think has the most attractive aura. They decide whether you drink or compliment them.' },
  { level: 2, type: 'Spicy', icon: '🌶️', tags: ['flirt'], text: 'Never have I ever had a crush on someone in a friend group. Drink if you have.' },
  { level: 2, type: 'Spicy', icon: '🌶️', tags: ['flirt'], text: 'Would you rather date someone clingy but loyal or mysterious but inconsistent?' },
  { level: 2, type: 'Spicy', icon: '🌶️', tags: ['target','flirt'], text: '{player}, pick someone and give them your smoothest one-line flirt. Group votes if it landed.' },
  { level: 2, type: 'Spicy', icon: '🌶️', tags: ['target','contact'], text: '{player}, ask {target} for permission to kiss them on the cheek. If they say no, both can drink/pass.' },
  { level: 2, type: 'Spicy', icon: '🌶️', tags: ['flirt'], text: '{player}, describe your type without naming anyone. The group gets one guess.' },
  { level: 2, type: 'Spicy', icon: '🌶️', tags: ['target','flirt'], text: 'Who here would have the most dangerous talking stage? Explain or drink.' },
  { level: 2, type: 'Spicy', icon: '🌶️', tags: ['flirt'], text: 'Never have I ever sent a message, deleted it, then acted normal. Drink if you have.' },
  { level: 2, type: 'Spicy', icon: '🌶️', tags: ['flirt'], text: '{player}, rank these: loyalty, looks, confidence, money, humour. Lowest-ranked one makes you drink.' },
  { level: 2, type: 'Spicy', icon: '🌶️', tags: ['target'], text: '{player}, choose someone to ask you one spicy-but-respectful question. Answer or drink.' },

  // L3 Freaky, consent-safe adult party dares
  { level: 3, type: 'Freaky', icon: '🫦', tags: ['target','flirt'], text: '{player}, choose a player. You have 30 seconds to convince them you are the best date here. They judge.' },
  { level: 3, type: 'Freaky', icon: '🫦', tags: ['contact','target'], text: '{player}, ask {target} if you can sit beside them for the next round like you are in a fake couple photoshoot. If no, drink/pass.' },
  { level: 3, type: 'Freaky', icon: '🫦', tags: ['flirt'], text: 'Never have I ever had a dream about someone I know and acted normal after. Drink if you have.' },
  { level: 3, type: 'Freaky', icon: '🫦', tags: ['flirt'], text: 'Would you rather be with someone who is amazing at texting or amazing in person?' },
  { level: 3, type: 'Freaky', icon: '🫦', tags: ['target','contact'], text: '{player}, ask {target} for a 10-second hand-hold. If either person says no, drink/pass.' },
  { level: 3, type: 'Freaky', icon: '🫦', tags: ['flirt'], text: '{player}, act out your “trying not to fold” face. Group votes pass or drink.' },
  { level: 3, type: 'Freaky', icon: '🫦', tags: ['target'], text: '{player}, let {target} choose: answer a freaky question from the group or drink twice.' },
  { level: 3, type: 'Freaky', icon: '🫦', tags: ['flirt'], text: 'Group vote: who here is most likely to be calm in public and chaotic in private?' },
  { level: 3, type: 'Freaky', icon: '🫦', tags: ['flirt'], text: '{player}, describe the difference between flirting and leading someone on. If the group disagrees, drink.' },
  { level: 3, type: 'Freaky', icon: '🫦', tags: ['target','contact'], text: '{player}, ask someone for a 5-second slow dance. If they say no, both laugh and you drink/pass.' },

  // L4 OMG, high-chaos but not coercive/graphic
  { level: 4, type: 'OMG', icon: '😱', tags: ['flirt'], text: '{player}, reveal the most dangerous compliment someone could give you, or drink twice.' },
  { level: 4, type: 'OMG', icon: '😱', tags: ['target'], text: '{player}, choose someone. They ask you the boldest respectful question they can think of. Answer honestly or drink twice.' },
  { level: 4, type: 'OMG', icon: '😱', tags: ['contact','target'], text: '{player}, ask {target} for a shoulder massage for 20 seconds. If either person says no, drink/pass.' },
  { level: 4, type: 'OMG', icon: '😱', tags: ['flirt'], text: 'Never have I ever nearly folded because of eye contact. Drink if you have.' },
  { level: 4, type: 'OMG', icon: '😱', tags: ['flirt'], text: 'Would you rather have everyone know your crush history or your worst talking-stage messages?' },
  { level: 4, type: 'OMG', icon: '😱', tags: ['target','flirt'], text: '{player}, pick someone and give them a dramatic “we should not be left alone” movie line. Group votes.' },
  { level: 4, type: 'OMG', icon: '😱', tags: ['flirt'], text: '{player}, confess one thing that instantly makes you fold, or drink twice.' },
  { level: 4, type: 'OMG', icon: '😱', tags: ['target'], text: '{player}, let {target} make a dare. You can reject it for any reason and drink/pass instead.' },
  { level: 4, type: 'OMG', icon: '😱', tags: ['flirt'], text: 'Group vote: who here has the most “I know exactly what I’m doing” energy?' },
  { level: 4, type: 'OMG', icon: '😱', tags: ['contact','target'], text: '{player}, ask {target} for a dramatic fake prom pose photo. If no, drink/pass.' }
];

function savePlayers() {
  localStorage.setItem('freakquencyPlayers', JSON.stringify(state.players));
}

function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove('active'));
  screens[name].classList.add('active');
}

function renderPlayers() {
  const list = document.querySelector('#playerList');
  list.innerHTML = '';
  state.players.forEach((p, index) => {
    const li = document.createElement('li');
    li.innerHTML = `<span><strong>${escapeHtml(p.name)}</strong> · ${p.gender} · flirt ${p.flirt ? 'yes' : 'no'} · contact ${p.contact ? 'yes' : 'no'}</span>`;
    const btn = document.createElement('button');
    btn.className = 'remove-player';
    btn.textContent = 'Remove';
    btn.onclick = () => {
      state.players.splice(index, 1);
      savePlayers();
      renderPlayers();
      renderScores();
    };
    li.appendChild(btn);
    list.appendChild(li);
  });
}

function renderScores() {
  const scoreList = document.querySelector('#scoreList');
  scoreList.innerHTML = '';
  state.players.forEach(p => {
    const li = document.createElement('li');
    li.innerHTML = `<span>${escapeHtml(p.name)}</span><strong>${p.score || 0}</strong>`;
    scoreList.appendChild(li);
  });
}

function addPlayer() {
  const nameInput = document.querySelector('#playerName');
  const name = nameInput.value.trim();
  if (!name) return alert('Add a player name first.');
  state.players.push({
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random()),
    name,
    gender: document.querySelector('#playerGender').value,
    flirt: document.querySelector('#playerFlirt').value === 'yes',
    contact: document.querySelector('#playerContact').value === 'yes',
    score: 0
  });
  nameInput.value = '';
  savePlayers();
  renderPlayers();
}

function selectedLevels() {
  return [...document.querySelectorAll('.levelCheck:checked')].map(c => Number(c.value));
}

function getCurrentPlayer() {
  return state.players[state.turn % state.players.length];
}

function getTarget(current, card) {
  if (!card.tags.includes('target') || !document.querySelector('#allowTarget').checked) return null;
  let pool = state.players.filter(p => p.id !== current.id);
  if (card.tags.includes('flirt')) pool = pool.filter(p => p.flirt);
  if (card.tags.includes('contact')) pool = pool.filter(p => p.contact);
  if (pool.length === 0) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}

function cardAllowed(card, current) {
  if (!selectedLevels().includes(card.level)) return false;
  if (card.tags.includes('contact') && !document.querySelector('#allowContact').checked) return false;
  if (card.tags.includes('contact') && !current.contact) return false;
  if (card.tags.includes('flirt') && !current.flirt) return false;
  if (!document.querySelector('#allowNever').checked && card.text.toLowerCase().includes('never have i ever')) return false;
  if (!document.querySelector('#allowWould').checked && card.text.toLowerCase().includes('would you rather')) return false;
  if (card.tags.includes('target') && !document.querySelector('#allowTarget').checked) return false;
  return true;
}

function drawCard() {
  if (state.players.length < 2) return alert('Add at least 2 players.');
  const current = getCurrentPlayer();
  const allowed = cards.filter(card => cardAllowed(card, current));
  if (!allowed.length) return alert('No cards match these settings. Turn on more levels/settings or update players.');

  let card = allowed[Math.floor(Math.random() * allowed.length)];
  let attempts = 0;
  while (state.usedCards.includes(cards.indexOf(card)) && attempts < 30) {
    card = allowed[Math.floor(Math.random() * allowed.length)];
    attempts++;
  }

  const cardIndex = cards.indexOf(card);
  state.usedCards.push(cardIndex);
  if (state.usedCards.length > Math.min(cards.length, 25)) state.usedCards.shift();

  const target = getTarget(current, card);
  let text = card.text
    .replaceAll('{player}', current.name)
    .replaceAll('{target}', target ? target.name : 'another opted-in player');

  state.currentCard = card;
  document.querySelector('#turnName').textContent = current.name;
  document.querySelector('#cardLevel').textContent = `L${card.level}`;
  document.querySelector('#cardType').textContent = card.type;
  document.querySelector('#cardIcon').textContent = card.icon;
  document.querySelector('#cardText').textContent = text;
  const cardEl = document.querySelector('#card');
  cardEl.className = `card level-${card.level}`;
}

function nextTurn(scored) {
  if (!state.players.length) return;
  const current = getCurrentPlayer();
  if (scored) current.score = (current.score || 0) + 1;
  state.turn++;
  savePlayers();
  renderScores();
  drawCard();
}

function escapeHtml(str) {
  return str.replace(/[&<>'"]/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  }[char]));
}

// Events
document.querySelector('#startSetup').onclick = () => showScreen('setup');
document.querySelector('#backSetup').onclick = () => showScreen('setup');
document.querySelector('#addPlayer').onclick = addPlayer;
document.querySelector('#playerName').addEventListener('keydown', e => { if (e.key === 'Enter') addPlayer(); });

document.querySelector('#beginGame').onclick = () => {
  if (state.players.length < 2) return alert('Add at least 2 players.');
  showScreen('game');
  renderScores();
  drawCard();
};

document.querySelector('#newCard').onclick = drawCard;
document.querySelector('#didIt').onclick = () => nextTurn(true);
document.querySelector('#drink').onclick = () => nextTurn(false);

document.querySelector('#resetAll').onclick = () => {
  if (!confirm('Reset all players and scores?')) return;
  state.players = [];
  state.turn = 0;
  state.usedCards = [];
  localStorage.removeItem('freakquencyPlayers');
  renderPlayers();
  renderScores();
};

renderPlayers();
renderScores();
