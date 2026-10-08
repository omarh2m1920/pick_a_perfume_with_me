========================================================================
'use strict';

const arena = document.getElementById('answer-arena');
const yes = document.getElementById('yes-button');
const maybe = document.getElementById('no-button');
const decline = document.getElementById('decline-button');
const status = document.getElementById('response-message');
const invite = document.getElementById('invite');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const jokes = ['Nice try 😏', 'Too slow 😂', 'Catch me first 🏃‍♀️', 'Your cardio for today 💪'];
let dodges = 0;
let keyboardMode = false;
let lastDodge = 0;

function resetMaybe() {
  maybe.style.left = '';
  maybe.style.top = '';
  maybe.style.right = '';
}

function dodge(event) {
  if (event.pointerType !== 'mouse' || keyboardMode || reducedMotion.matches || arena.hidden) return;
  const button = maybe.getBoundingClientRect();
  const dx = Math.max(button.left - event.clientX, 0, event.clientX - button.right);
  const dy = Math.max(button.top - event.clientY, 0, event.clientY - button.bottom);
  if (Math.hypot(dx, dy) > 55 || performance.now() - lastDodge < 100) return;

  const bounds = arena.getBoundingClientRect();
  const yesBounds = yes.getBoundingClientRect();
  const maxX = Math.max(0, bounds.width - button.width);
  const maxY = Math.max(0, bounds.height - button.height);
  let best = null;
  for (let col = 0; col <= 8; col++) {
    for (let row = 0; row <= 5; row++) {
      const x = maxX * col / 8;
      const y = maxY * row / 5;
      const left = bounds.left + x;
      const top = bounds.top + y;
      const overlapsYes = left < yesBounds.right + 8 && left + button.width > yesBounds.left - 8 && top < yesBounds.bottom + 8 && top + button.height > yesBounds.top - 8;
      if (overlapsYes) continue;
      const distance = Math.hypot(left + button.width / 2 - event.clientX, top + button.height / 2 - event.clientY);
      const score = distance + Math.random() * 16;
      if (!best || score > best.score) best = { x, y, score };
    }
  }
  if (!best) return;
  maybe.style.right = 'auto';
  maybe.style.left = `${best.x}px`;
  maybe.style.top = `${best.y}px`;
  status.textContent = jokes[dodges++ % jokes.length];
  invite.classList.add('chasing');
  lastDodge = performance.now();
}

function pass() {
  arena.hidden = true;
  decline.hidden = true;
  status.textContent = 'All good. See you at the gym 🤝';
  invite.classList.remove('chasing');
  invite.classList.add('passed');
}

arena.addEventListener('pointermove', dodge);
maybe.addEventListener('pointerenter', dodge);
yes.addEventListener('click', () => { window.location.href = 'yes_page.html'; });
maybe.addEventListener('click', pass);
decline.addEventListener('click', pass);
document.addEventListener('keydown', event => {
  if (event.key === 'Tab') keyboardMode = true;
});
document.addEventListener('pointerdown', event => {
  if (event.pointerType === 'mouse') keyboardMode = false;
});
window.addEventListener('resize', resetMaybe);
reducedMotion.addEventListener('change', () => {
  resetMaybe();
  status.textContent = reducedMotion.matches ? 'Your call 😌' : 'Try catching “Maybe” 😏';
});
if (reducedMotion.matches || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  status.textContent = 'Your call 😌';
}

