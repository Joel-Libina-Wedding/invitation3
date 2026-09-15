const firebaseConfig = {
  apiKey: "AIzaSyC8XupQpKTtgQcz6pnCReJiZutlgw62yvk",
  authDomain: "joel-libina-wedding-52cf7.firebaseapp.com",
  projectId: "joel-libina-wedding-52cf7",
  storageBucket: "joel-libina-wedding-52cf7.firebasestorage.app",
  messagingSenderId: "630651037453",
  appId: "1:630651037453:web:0fb82dd7317e52af05f244"
};

import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// ===============================
// COUNTDOWN
// ===============================

const weddingDate =
  new Date("2027-01-03T11:00:00+05:30").getTime();

function updateCountdown() {
  const daysEl = document.getElementById("days");

  if (!daysEl) return;

  let distance = weddingDate - Date.now();

  if (distance < 0) distance = 0;

  const days =
    Math.floor(distance / (1000 * 60 * 60 * 24));

  const hours =
    Math.floor(
      (distance / (1000 * 60 * 60)) % 24
    );

  const minutes =
    Math.floor(
      (distance / (1000 * 60)) % 60
    );

  const seconds =
    Math.floor(
      (distance / 1000) % 60
    );

  daysEl.textContent = days;

  document.getElementById("hours").textContent =
    String(hours).padStart(2, "0");

  document.getElementById("minutes").textContent =
    String(minutes).padStart(2, "0");

  document.getElementById("seconds").textContent =
    String(seconds).padStart(2, "0");
}

updateCountdown();

setInterval(updateCountdown, 1000);


// ===============================
// HERO SLIDESHOW
// ===============================

const heroSlides = [
  "assets/images/hero-1.jpg",
  "assets/images/hero-2.jpg",
  "assets/images/hero-3.jpg"
];

let heroIndex = 0;
let heroTimer = null;

const heroImage =
  document.getElementById("heroSlideshowImage");

const heroPrev =
  document.getElementById("heroPrev");

const heroNext =
  document.getElementById("heroNext");

function showHeroSlide(index) {
  if (!heroImage) return;

  heroIndex =
    (index + heroSlides.length) %
    heroSlides.length;

  heroImage.classList.add("hero-fade-out");

  setTimeout(() => {
    heroImage.src =
      heroSlides[heroIndex];

    heroImage.classList.remove(
      "hero-fade-out"
    );
  }, 250);
}

function nextHero() {
  showHeroSlide(heroIndex + 1);
}

function previousHero() {
  showHeroSlide(heroIndex - 1);
}

function resetHeroTimer() {
  clearInterval(heroTimer);

  heroTimer =
    setInterval(nextHero, 6000);
}

heroPrev?.addEventListener(
  "click",
  () => {
    previousHero();
    resetHeroTimer();
  }
);

heroNext?.addEventListener(
  "click",
  () => {
    nextHero();
    resetHeroTimer();
  }
);

if (heroImage) {
  heroImage.onerror = () => {
    heroImage.onerror = null;

    heroImage.src =
      "assets/images/couple.jpg";
  };

  showHeroSlide(0);

  resetHeroTimer();
}


// ===============================
// MUSIC
// ===============================

const weddingMusic =
  document.getElementById("weddingMusic");

const musicToggle =
  document.getElementById("musicToggle");

let musicPlaying = false;

function updateMusicButton() {
  if (!musicToggle) return;

  musicToggle.textContent =
    musicPlaying ? "❚❚" : "♪";

  musicToggle.setAttribute(
    "aria-label",
    musicPlaying
      ? "Pause music"
      : "Play music"
  );
}

async function startMusic() {
  if (!weddingMusic) return;

  try {
    await weddingMusic.play();

    musicPlaying = true;

    updateMusicButton();
  } catch {
    musicPlaying = false;

    updateMusicButton();
  }
}

function pauseMusic() {
  if (!weddingMusic) return;

  weddingMusic.pause();

  musicPlaying = false;

  updateMusicButton();
}

musicToggle?.addEventListener(
  "click",
  async () => {
    if (!weddingMusic) return;

    if (weddingMusic.paused) {
      await startMusic();
    } else {
      pauseMusic();
    }
  }
);

weddingMusic?.addEventListener(
  "play",
  () => {
    musicPlaying = true;
    updateMusicButton();
  }
);

weddingMusic?.addEventListener(
  "pause",
  () => {
    musicPlaying = false;
    updateMusicButton();
  }
);

window.addEventListener(
  "load",
  async () => {
    await startMusic();
  }
);


// ===============================
// OUR STORY READ MORE
// ===============================

const storyReadMore =
  document.getElementById("storyReadMore");

const storyMore =
  document.getElementById("storyMore");

storyReadMore?.addEventListener(
  "click",
  () => {
    const isOpen =
      storyReadMore.getAttribute(
        "aria-expanded"
      ) === "true";

    storyReadMore.setAttribute(
      "aria-expanded",
      String(!isOpen)
    );

    if (storyMore) {
      storyMore.hidden =
        isOpen;
    }

    storyReadMore.textContent =
      isOpen
        ? "Read More"
        : "Read Less";
  }
);


// ===============================
// GENERAL MODALS
// ===============================

function openModal(element) {
  if (!element) return;

  element.classList.add("open");

  element.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.classList.add(
    "modal-open"
  );
}

function closeModal(element) {
  if (!element) return;

  element.classList.remove("open");

  element.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.classList.remove(
    "modal-open"
  );
}


// ===============================
// TOAST
// ===============================

const toast =
  document.getElementById("toast");

function showToast(message) {
  if (!toast) return;

  toast.textContent = message;

  toast.classList.add("show");

  clearTimeout(
    showToast.timer
  );

  showToast.timer =
    setTimeout(() => {
      toast.classList.remove("show");
    }, 2800);
}


// ===============================
// INVITATION CARD POPUP
// ===============================

const invitationModal =
  document.getElementById(
    "invitationCardModal"
  );

const invitationCardImage =
  document.getElementById(
    "invitationCardImage"
  );

const invitationCardPlaceholder =
  document.getElementById(
    "invitationCardPlaceholder"
  );

if (invitationCardImage) {
  invitationCardImage.addEventListener(
    "load",
    () => {
      invitationCardImage.style.display =
        "block";

      if (
        invitationCardPlaceholder
      ) {
        invitationCardPlaceholder.style.display =
          "none";
      }
    }
  );

  invitationCardImage.addEventListener(
    "error",
    () => {
      invitationCardImage.style.display =
        "none";

      if (
        invitationCardPlaceholder
      ) {
        invitationCardPlaceholder.style.display =
          "flex";
      }
    }
  );
}

document
  .querySelectorAll(
    "[data-close-invitation]"
  )
  .forEach((element) => {
    element.addEventListener(
      "click",
      () => {
        closeModal(
          invitationModal
        );
      }
    );
  });


// ===============================
// FIREBASE GREETINGS
// ===============================

const greetingsModal =
  document.getElementById(
    "greetingsModal"
  );

const greetingForm =
  document.getElementById(
    "greetingForm"
  );

const guestMessages =
  document.getElementById(
    "guestMessages"
  );

const openGreetings =
  document.getElementById(
    "openGreetings"
  );

openGreetings?.addEventListener(
  "click",
  () => {
    openModal(
      greetingsModal
    );

    setTimeout(() => {
      document
        .getElementById(
          "guestName"
        )
        ?.focus();
    }, 100);
  }
);

document
  .querySelectorAll(
    "[data-close-modal]"
  )
  .forEach((element) => {
    element.addEventListener(
      "click",
      () => {
        closeModal(
          greetingsModal
        );
      }
    );
  });

greetingForm?.addEventListener(
  "submit",
  async (event) => {
    event.preventDefault();

    const submitButton =
      greetingForm.querySelector(
        'button[type="submit"]'
      );

    const name =
      document
        .getElementById(
          "guestName"
        )
        ?.value
        .trim();

    const message =
      document
        .getElementById(
          "guestMessage"
        )
        ?.value
        .trim();

    if (!name || !message) {
      showToast(
        "Please enter your name and message."
      );

      return;
    }

    try {
      if (submitButton) {
        submitButton.disabled =
          true;

        submitButton.textContent =
          "Sending...";
      }

      await addDoc(
        collection(
          db,
          "greetings"
        ),
        {
          name,
          message,
          createdAt:
            serverTimestamp()
        }
      );

      greetingForm.reset();

      closeModal(
        greetingsModal
      );

      showToast(
        "Your greeting has been added."
      );

      document
        .getElementById(
          "blessings"
        )
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
    } catch (error) {
      console.error(
        "Greeting error:",
        error
      );

      showToast(
        "Could not send your greeting. Please try again."
      );
    } finally {
      if (submitButton) {
        submitButton.disabled =
          false;

        submitButton.textContent =
          "Send Greeting";
      }
    }
  }
);

function renderGreetingCard(data) {
  const card =
    document.createElement(
      "article"
    );

  card.className =
    "guest-message-card";

  const message =
    document.createElement(
      "p"
    );

  message.textContent =
    data.message;

  const name =
    document.createElement(
      "strong"
    );

  name.textContent =
    `— ${data.name}`;

  card.append(
    message,
    name
  );

  return card;
}

if (guestMessages) {
  const greetingsQuery =
    query(
      collection(
        db,
        "greetings"
      ),
      orderBy(
        "createdAt",
        "desc"
      )
    );

  onSnapshot(
    greetingsQuery,
    (snapshot) => {
      guestMessages.innerHTML =
        "";

      if (snapshot.empty) {
        guestMessages.innerHTML =
          '<p class="empty-greetings">Be the first to leave Joel & Libina a message.</p>';

        return;
      }

      snapshot.forEach(
        (documentSnapshot) => {
          guestMessages.appendChild(
            renderGreetingCard(
              documentSnapshot.data()
            )
          );
        }
      );
    },
    (error) => {
      console.error(
        "Greeting loading error:",
        error
      );

      guestMessages.innerHTML =
        '<p class="empty-greetings">Greetings could not be loaded right now.</p>';
    }
  );
}


// ===============================
// FIREBASE RSVP
// ===============================

const rsvpModal =
  document.getElementById(
    "rsvpModal"
  );

const rsvpForm =
  document.getElementById(
    "rsvpForm"
  );

document
  .querySelectorAll(
    "[data-close-rsvp]"
  )
  .forEach((element) => {
    element.addEventListener(
      "click",
      () => {
        closeModal(
          rsvpModal
        );
      }
    );
  });

rsvpForm?.addEventListener(
  "submit",
  async (event) => {
    event.preventDefault();

    const submitButton =
      rsvpForm.querySelector(
        'button[type="submit"]'
      );

    const name =
      document
        .getElementById(
          "rsvpName"
        )
        ?.value
        .trim();

    const attendance =
      document
        .getElementById(
          "rsvpAttendance"
        )
        ?.value;

    const guestCount =
      Number(
        document
          .getElementById(
            "rsvpGuestCount"
          )
          ?.value || 0
      );

    const message =
      document
        .getElementById(
          "rsvpMessage"
        )
        ?.value
        .trim() || "";

    if (
      !name ||
      !attendance
    ) {
      showToast(
        "Please complete the required RSVP details."
      );

      return;
    }

    try {
      if (submitButton) {
        submitButton.disabled =
          true;

        submitButton.textContent =
          "Submitting...";
      }

      await addDoc(
        collection(
          db,
          "rsvps"
        ),
        {
          name,
          attendance,
          guestCount,
          message,
          createdAt:
            serverTimestamp()
        }
      );

      rsvpForm.reset();

      closeModal(
        rsvpModal
      );

      showToast(
        "Thank you. Your RSVP has been submitted."
      );
    } catch (error) {
      console.error(
        "RSVP error:",
        error
      );

      showToast(
        "Could not submit your RSVP. Please try again."
      );
    } finally {
      if (submitButton) {
        submitButton.disabled =
          false;

        submitButton.textContent =
          "Submit RSVP";
      }
    }
  }
);


// ===============================
// ACTION TILES
// ===============================

document
  .querySelectorAll(
    ".action-tile"
  )
  .forEach((button) => {
    button.addEventListener(
      "click",
      () => {
        const action =
          button.dataset.action;

        if (
          action ===
          "invitation"
        ) {
          openModal(
            invitationModal
          );

          return;
        }

        if (
          action ===
          "greetings"
        ) {
          openModal(
            greetingsModal
          );

          return;
        }

        if (
          action ===
          "livestream"
        ) {
          showToast(
            "Live streaming details will be added soon."
          );

          return;
        }

        if (
          action === "rsvp"
        ) {
          openModal(
            rsvpModal
          );
        }
      }
    );
  });


// ===============================
// GALLERY LIGHTBOX
// ===============================

const galleryImages = [
  "assets/images/gallery-1.jpg",
  "assets/images/gallery-2.jpg",
  "assets/images/gallery-3.jpg",
  "assets/images/gallery-4.jpg",
  "assets/images/gallery-5.jpg",
  "assets/images/gallery-6.jpg",
  "assets/images/gallery-7.jpg",
  "assets/images/gallery-8.jpg"
];

let galleryIndex = 0;

const galleryModal =
  document.getElementById(
    "galleryModal"
  );

const galleryLightboxImage =
  document.getElementById(
    "galleryLightboxImage"
  );

const galleryPrev =
  document.getElementById(
    "galleryPrev"
  );

const galleryNext =
  document.getElementById(
    "galleryNext"
  );

function showGalleryImage(index) {
  if (
    !galleryLightboxImage
  ) {
    return;
  }

  galleryIndex =
    (index +
      galleryImages.length) %
    galleryImages.length;

  galleryLightboxImage.src =
    galleryImages[
      galleryIndex
    ];
}

document
  .querySelectorAll(
    ".gallery-item"
  )
  .forEach(
    (item, index) => {
      const image =
        item.querySelector(
          "img"
        );

      image?.addEventListener(
        "load",
        () => {
          item.classList.add(
            "has-image"
          );
        }
      );

      image?.addEventListener(
        "error",
        () => {
          image.style.display =
            "none";
        }
      );

      item.addEventListener(
        "click",
        () => {
          galleryIndex =
            index;

          showGalleryImage(
            galleryIndex
          );

          openModal(
            galleryModal
          );
        }
      );
    }
  );

galleryPrev?.addEventListener(
  "click",
  () => {
    showGalleryImage(
      galleryIndex - 1
    );
  }
);

galleryNext?.addEventListener(
  "click",
  () => {
    showGalleryImage(
      galleryIndex + 1
    );
  }
);

document
  .querySelectorAll(
    "[data-close-gallery]"
  )
  .forEach((element) => {
    element.addEventListener(
      "click",
      () => {
        closeModal(
          galleryModal
        );
      }
    );
  });

let touchStartX = 0;

galleryModal?.addEventListener(
  "touchstart",
  (event) => {
    touchStartX =
      event.changedTouches[0]
        .screenX;
  }
);

galleryModal?.addEventListener(
  "touchend",
  (event) => {
    const touchEndX =
      event.changedTouches[0]
        .screenX;

    const difference =
      touchEndX -
      touchStartX;

    if (
      Math.abs(
        difference
      ) < 50
    ) {
      return;
    }

    if (
      difference > 0
    ) {
      showGalleryImage(
        galleryIndex - 1
      );
    } else {
      showGalleryImage(
        galleryIndex + 1
      );
    }
  }
);


// ===============================
// ADD TO CALENDAR
// ===============================

const addToCalendar =
  document.getElementById(
    "addToCalendar"
  );

addToCalendar?.addEventListener(
  "click",
  () => {
    const calendarData = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Joel & Libina Wedding//EN",
      "BEGIN:VEVENT",
      "UID:joel-libina-wedding-2027",
      "DTSTAMP:20260915T000000Z",
      "DTSTART:20270103T053000Z",
      "DTEND:20270103T073000Z",
      "SUMMARY:Joel & Libina Wedding",
      "LOCATION:Mar Lazarus Orthodox Valiyapally, Pathanapuram, Kerala",
      "DESCRIPTION:Wedding of Joel Mathew Philip and Libina Mary Lalu.",
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");

    const blob =
      new Blob(
        [calendarData],
        {
          type:
            "text/calendar;charset=utf-8"
        }
      );

    const url =
      URL.createObjectURL(
        blob
      );

    const link =
      document.createElement(
        "a"
      );

    link.href = url;

    link.download =
      "joel-libina-wedding.ics";

    document.body.appendChild(
      link
    );

    link.click();

    link.remove();

    URL.revokeObjectURL(
      url
    );
  }
);


// ===============================
// KEYBOARD CONTROLS
// ===============================

document.addEventListener(
  "keydown",
  (event) => {
    if (
      event.key ===
      "Escape"
    ) {
      closeModal(
        greetingsModal
      );

      closeModal(
        invitationModal
      );

      closeModal(
        rsvpModal
      );

      closeModal(
        galleryModal
      );
    }

    if (
      galleryModal?.classList.contains(
        "open"
      )
    ) {
      if (
        event.key ===
        "ArrowLeft"
      ) {
        showGalleryImage(
          galleryIndex - 1
        );
      }

      if (
        event.key ===
        "ArrowRight"
      ) {
        showGalleryImage(
          galleryIndex + 1
        );
      }
    }
  }
);
