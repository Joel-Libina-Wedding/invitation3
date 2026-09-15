const weddingDate = new Date('2027-01-03T11:00:00+05:30').getTime();

function updateCountdown() {
  const now = Date.now();
  let distance = weddingDate - now;

  if (distance < 0) distance = 0;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  document.getElementById('days').textContent = days;
  document.getElementById('hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
  document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

const musicToggle = document.getElementById('musicToggle');
if (musicToggle) {
  let muted = false;
  musicToggle.addEventListener('click', () => {
    muted = !muted;
    musicToggle.textContent = muted ? '♪̸' : '♪';
    musicToggle.setAttribute('aria-label', muted ? 'Music muted' : 'Music on');
  });
}
