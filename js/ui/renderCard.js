const cardEl    = document.querySelector('#card');
const levelEl   = document.querySelector('#cardLevel');
const typeEl    = document.querySelector('#cardType');
const iconEl    = document.querySelector('#cardIcon');
const textEl    = document.querySelector('#cardText');
const footerEl  = document.querySelector('#cardFooter');
const turnName  = document.querySelector('#turnName');

export function renderCard({ card, text, current }) {
  turnName.textContent  = current.name;
  levelEl.textContent   = `L${card.level}`;
  typeEl.textContent    = card.type;
  iconEl.textContent    = card.icon;
  textEl.textContent    = text;
  footerEl.textContent  = 'Do it, answer honestly, or drink/pass.';

  cardEl.className = `card level-${card.level}`;
  cardEl.classList.remove('animate-in');
  void cardEl.offsetWidth;
  cardEl.classList.add('animate-in');
}
