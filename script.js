const weddingDate = new Date('2027-01-03T11:00:00+05:30').getTime();

function updateCountdown() {
  const daysEl = document.getElementById('days');
  if (!daysEl) return;

  const now = Date.now();
  let distance = weddingDate - now;

  if (distance < 0) distance = 0;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  daysEl.textContent = days;
  document.getElementById('hours').textContent =
    String(hours).padStart(2, '0');

  document.getElementById('minutes').textContent =
    String(minutes).padStart(2, '0');

  document.getElementById('seconds').textContent =
    String(seconds).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);


// MUSIC BUTTON

const musicToggle = document.getElementById('musicToggle');

if (musicToggle) {
  let muted = false;

  musicToggle.addEventListener('click', () => {
    muted = !muted;

    musicToggle.textContent = muted ? '♪̸' : '♪';

    musicToggle.setAttribute(
      'aria-label',
      muted ? 'Music muted' : 'Music on'
    );
  });
}


// GALLERY
// If a gallery photo does not exist yet,
// it will hide instead of showing a broken image icon.

document.querySelectorAll('.gallery-item img').forEach((img) => {

  img.addEventListener('load', () => {
    img.closest('.gallery-item')?.classList.add('has-image');
  });

  img.addEventListener('error', () => {
    img.style.display = 'none';
  });

});


// GREETINGS / BLESSINGS

const modal = document.getElementById('greetingsModal');

const greetingForm = document.getElementById('greetingForm');

const guestMessages = document.getElementById('guestMessages');

const openGreetings = document.getElementById('openGreetings');

const toast = document.getElementById('toast');

const storageKey = 'joel-libina-wedding-greetings';


function openGreetingModal() {

  if (!modal) return;

  modal.classList.add('open');

  modal.setAttribute('aria-hidden', 'false');

  document.body.classList.add('modal-open');

  setTimeout(() => {
    document.getElementById('guestName')?.focus();
  }, 50);

}


function closeGreetingModal() {

  if (!modal) return;

  modal.classList.remove('open');

  modal.setAttribute('aria-hidden', 'true');

  document.body.classList.remove('modal-open');

}


function showToast(message) {

  if (!toast) return;

  toast.textContent = message;

  toast.classList.add('show');

  clearTimeout(showToast.timer);

  showToast.timer = setTimeout(() => {
    toast.classList.remove('show');
  }, 2600);

}


// GET SAVED GREETINGS

function getGreetings() {

  try {

    return JSON.parse(
      localStorage.getItem(storageKey)
    ) || [];

  } catch {

    return [];

  }

}


// SAVE GREETINGS

function saveGreetings(items) {

  localStorage.setItem(
    storageKey,
    JSON.stringify(items)
  );

}


// SHOW GREETINGS

function renderGreetings() {

  if (!guestMessages) return;

  const items = getGreetings();

  guestMessages.innerHTML = '';

  if (!items.length) {

    guestMessages.innerHTML =
      '<p class="empty-greetings">Be the first to leave Joel & Libina a message.</p>';

    return;

  }


  items
    .slice()
    .reverse()
    .forEach((item) => {

      const card =
        document.createElement('article');

      card.className =
        'guest-message-card';


      const message =
        document.createElement('p');

      message.textContent =
        item.message;


      const name =
        document.createElement('strong');

      name.textContent =
        `— ${item.name}`;


      card.append(
        message,
        name
      );


      guestMessages.appendChild(card);

    });

}


// OPEN GREETINGS BUTTON

openGreetings?.addEventListener(
  'click',
  openGreetingModal
);


// CLOSE MODAL

document
  .querySelectorAll('[data-close-modal]')
  .forEach((el) => {

    el.addEventListener(
      'click',
      closeGreetingModal
    );

  });


// ESCAPE KEY CLOSES MODAL

document.addEventListener(
  'keydown',
  (event) => {

    if (event.key === 'Escape') {

      closeGreetingModal();

    }

  }
);


// SUBMIT GREETING

greetingForm?.addEventListener(
  'submit',
  (event) => {

    event.preventDefault();


    const name =
      document
        .getElementById('guestName')
        .value
        .trim();


    const message =
      document
        .getElementById('guestMessage')
        .value
        .trim();


    if (!name || !message) return;


    const items =
      getGreetings();


    items.push({

      name: name,

      message: message,

      createdAt: Date.now()

    });


    saveGreetings(
      items.slice(-50)
    );


    renderGreetings();


    greetingForm.reset();


    closeGreetingModal();


    document
      .getElementById('blessings')
      ?.scrollIntoView({

        behavior: 'smooth',

        block: 'start'

      });


    showToast(
      'Your greeting has been added.'
    );

  });


// ACTION BUTTONS

document
  .querySelectorAll('.action-tile')
  .forEach((button) => {

    button.addEventListener(
      'click',
      () => {

        const action =
          button.dataset.action;


        // SEND GREETINGS

        if (action === 'greetings') {

          openGreetingModal();

          return;

        }


        // INVITATION CARD

        if (action === 'invitation') {

          window.location.href =
            'index.html';

          return;

        }


        // LIVE STREAM

        if (action === 'livestream') {

          showToast(
            'Live streaming details will be added soon.'
          );

          return;

        }


        // RSVP

        if (action === 'rsvp') {

          showToast(
            'RSVP will be available soon.'
          );

        }

      });

  });


renderGreetings();
