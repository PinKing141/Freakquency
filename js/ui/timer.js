// Optional per-turn countdown ring. startTimer(seconds, onExpire) shows the
// ring over the card and depletes it; at 0 it pulses red and calls onExpire.
// seconds = 0 (or falsy) means "off".

const wrap  = document.querySelector('#turnTimer');
const ring  = document.querySelector('#turnTimer .tt-ring');
const label = document.querySelector('#turnTimerLabel');

const R = 24;
const C = 2 * Math.PI * R;

let rafId = null;
let runId = 0;

export function stopTimer() {
  runId++;
  if (rafId) cancelAnimationFrame(rafId);
  rafId = null;
  if (wrap) {
    wrap.hidden = true;
    wrap.classList.remove('expired');
    wrap.classList.remove('preparing');
  }
}

export function startTimer(seconds, onExpire, { prepareSeconds = 0 } = {}) {
  stopTimer();
  if (!wrap || !seconds) return;

  const thisRun = runId;
  wrap.hidden = false;
  ring.style.strokeDasharray = String(C);

  function runClock(totalSeconds, onDone, preparing = false) {
    const total = totalSeconds * 1000;
    const start = performance.now();
    function frame(now) {
      if (thisRun !== runId) return;
      const remaining = Math.max(0, total - (now - start));
      const frac = remaining / total;
      ring.style.strokeDashoffset = String(C * (1 - frac));
      label.textContent = preparing ? `READY ${Math.ceil(remaining / 1000)}` : String(Math.ceil(remaining / 1000));
      if (remaining <= 0) return onDone();
      rafId = requestAnimationFrame(frame);
    }
    rafId = requestAnimationFrame(frame);
  }

  if (prepareSeconds) {
    wrap.classList.add('preparing');
    runClock(prepareSeconds, () => {
      if (thisRun !== runId) return;
      wrap.classList.remove('preparing');
      label.textContent = 'GO!';
      runClock(seconds, expire);
    }, true);
    return;
  }
  runClock(seconds, expire);

  function expire() {
    if (thisRun !== runId) return;
    if (wrap) wrap.classList.add('expired');
    label.textContent = '0';
    if (onExpire) onExpire();
  }
}
