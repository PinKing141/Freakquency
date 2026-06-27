import { escapeHtml } from '../utils/helpers.js';

export function renderPlayers(players, onRemove) {
  const list = document.querySelector('#playerList');
  list.innerHTML = '';
  players.forEach((p, index) => {
    const li  = document.createElement('li');
    const info = document.createElement('span');
    info.innerHTML = `<strong>${escapeHtml(p.name)}</strong> · ${p.gender} · flirt ${p.flirt ? 'yes' : 'no'} · contact ${p.contact ? 'yes' : 'no'}`;

    const btn = document.createElement('button');
    btn.className   = 'remove-player';
    btn.textContent = 'Remove';
    btn.onclick     = () => onRemove(index);

    li.appendChild(info);
    li.appendChild(btn);
    list.appendChild(li);
  });
}

export function renderScores(players) {
  const scoreList = document.querySelector('#scoreList');
  scoreList.innerHTML = '';
  players.forEach(p => {
    const li = document.createElement('li');
    li.innerHTML = `<span>${escapeHtml(p.name)}</span><strong>${p.score || 0}</strong>`;
    scoreList.appendChild(li);
  });
}
