import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  limit,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";


// ======================================================
// FIREBASE
// ======================================================

const firebaseConfig = {
  apiKey: "AIzaSyC8XupQpKTtgQcz6pnCReJiZutlgw62yvk",
  authDomain: "joel-libina-wedding-52cf7.firebaseapp.com",
  projectId: "joel-libina-wedding-52cf7",
  storageBucket: "joel-libina-wedding-52cf7.firebasestorage.app",
  messagingSenderId: "630651037453",
  appId: "1:630651037453:web:0fb82dd7317e52af05f244"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// ======================================================
// COUNTDOWN
// ======================================================

const weddingDate =
  new Date("2027-01-03T11:00:00+05:30").getTime();

function updateCountdown() {

  const daysEl =
    document.getElementById("days");

  const hoursEl =
    document.getElementById("hours");

  const minutesEl =
    document.getElementById("minutes");

  const secondsEl =
    document.getElementById("seconds");

  if (
    !daysEl ||
    !hoursEl ||
    !minutesEl ||
    !secondsEl
  ) {
    return;
  }


  let distance =
    weddingDate - Date.now();


  if (distance < 0) {
    distance = 0;
  }


  const days =
    Math.floor(
      distance / 86400000
    );

  const hours =
    Math.floor(
      (distance / 3600000) % 24
    );

  const minutes =
    Math.floor(
      (distance / 60000) % 60
    );

  const seconds =
    Math.floor(
      (distance / 1000) % 60
    );


  daysEl.textContent =
    days;

  hoursEl.textContent =
    String(hours).padStart(2, "0");

  minutesEl.textContent =
    String(minutes).padStart(2, "0");

  secondsEl.textContent =
    String(seconds).padStart(2, "0");
}


updateCountdown();

setInterval(
  updateCountdown,
  1000
);


// ======================================================
// HERO SLIDESHOW
// ======================================================

const heroSlides = [
  ...document.querySelectorAll(
    ".hero-slide"
  )
];

const heroPrev =
  document.getElementById(
    "heroPrev"
  );

const heroNext =
  document.getElementById(
    "heroNext"
  );

let heroIndex = 0;
let heroTimer;


// Load every image from data-src
heroSlides.forEach(
  (slide) => {

    const src =
      slide.dataset.src;

    if (!src) {
      return;
    }


    const preloader =
      new Image();


    preloader.onload =
      () => {

        slide.style.backgroundImage =
          `url("${src}")`;

      };


    preloader.onerror =
      () => {

        console.error(
          "Unable to load hero image:",
          src
        );

        slide.style.backgroundImage =
          'url("assets/images/couple.jpg")';

      };


    preloader.src =
      src;

  }
);


function showHeroSlide(index) {

  if (!heroSlides.length) {
    return;
  }


  heroIndex =
    (
      index +
      heroSlides.length
    ) %
    heroSlides.length;


  heroSlides.forEach(
    (
      slide,
      slideIndex
    ) => {

      slide.classList.toggle(
        "active",
        slideIndex === heroIndex
      );

    }
  );

}


function nextHeroSlide() {

  showHeroSlide(
    heroIndex + 1
  );

}


function previousHeroSlide() {

  showHeroSlide(
    heroIndex - 1
  );

}


function resetHeroTimer() {

  clearInterval(
    heroTimer
  );


  heroTimer =
    setInterval(
      nextHeroSlide,
      6000
    );

}


// Force first image active
showHeroSlide(0);


// Previous button
heroPrev?.addEventListener(
  "click",
  () => {

    previousHeroSlide();

    resetHeroTimer();

  }
);


// Next button
heroNext?.addEventListener(
  "click",
  () => {

    nextHeroSlide();

    resetHeroTimer();

  }
);


// Start automatic slideshow
resetHeroTimer();


// ======================================================
// WEDDING MUSIC
// ======================================================

const weddingAudio =
  document.getElementById(
    "weddingAudio"
  );

const musicToggle =
  document.getElementById(
    "musicToggle"
  );


function setMusicButton(
  isPlaying
) {

  if (!musicToggle) {
    return;
  }


  musicToggle.textContent =
    isPlaying
      ? "❚❚"
      : "♪";


  musicToggle.setAttribute(
    "aria-label",
    isPlaying
      ? "Pause wedding music"
      : "Play wedding music"
  );


  musicToggle.classList.toggle(
    "playing",
    isPlaying
  );

}


async function tryPlayMusic() {

  if (!weddingAudio) {
    return;
  }


  try {

    await weddingAudio.play();

    setMusicButton(
      true
    );

  } catch {

    // Most mobile browsers block autoplay.
    // The music button remains available.
    setMusicButton(
      false
    );

  }

}


// Try autoplay
window.addEventListener(
  "load",
  tryPlayMusic,
  {
    once: true
  }
);


// Play / pause
musicToggle?.addEventListener(
  "click",
  async () => {

    if (!weddingAudio) {
      return;
    }


    if (
      weddingAudio.paused
    ) {

      try {

        await weddingAudio.play();

        setMusicButton(
          true
        );

      } catch (
        error
      ) {

        console.error(
          "Music playback failed:",
          error
        );

        showToast(
          "Tap again to start the music."
        );

      }

    } else {

      weddingAudio.pause();

      setMusicButton(
        false
      );

    }

  }
);


weddingAudio?.addEventListener(
  "play",
  () => {

    setMusicButton(
      true
    );

  }
);


weddingAudio?.addEventListener(
  "pause",
  () => {

    setMusicButton(
      false
    );

  }
);


// ======================================================
// OUR STORY - READ MORE
// ======================================================

const storyReadMore =
  document.getElementById(
    "storyReadMore"
  );

const storyMore =
  document.getElementById(
    "storyMore"
  );


storyReadMore?.addEventListener(
  "click",
  () => {

    if (!storyMore) {
      return;
    }


    const isOpen =
      storyReadMore.getAttribute(
        "aria-expanded"
      ) === "true";


    storyReadMore.setAttribute(
      "aria-expanded",
      String(
        !isOpen
      )
    );


    storyMore.hidden =
      isOpen;


    storyReadMore.textContent =
      isOpen
        ? "Read More"
        : "Read Less";

  }
);


// ======================================================
// TOAST
// ======================================================

const toast =
  document.getElementById(
    "toast"
  );


function showToast(
  message
) {

  if (!toast) {
    return;
  }


  toast.textContent =
    message;


  toast.classList.add(
    "show"
  );


  clearTimeout(
    showToast.timer
  );


  showToast.timer =
    setTimeout(
      () => {

        toast.classList.remove(
          "show"
        );

      },
      3000
    );

}


// ======================================================
// MODAL HELPERS
// ======================================================

function openModal(
  modal
) {

  if (!modal) {
    return;
  }


  modal.classList.add(
    "open"
  );


  modal.setAttribute(
    "aria-hidden",
    "false"
  );


  document.body.classList.add(
    "modal-open"
  );

}


function closeModal(
  modal
) {

  if (!modal) {
    return;
  }


  modal.classList.remove(
    "open"
  );


  modal.setAttribute(
    "aria-hidden",
    "true"
  );


  if (
    !document.querySelector(
      ".modal.open"
    )
  ) {

    document.body.classList.remove(
      "modal-open"
    );

  }

}


// ======================================================
// INVITATION CARD
// ======================================================

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


if (
  invitationCardImage
) {

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
  .forEach(
    (element) => {

      element.addEventListener(
        "click",
        () => {

          closeModal(
            invitationModal
          );

        }
      );

    }
  );


// ======================================================
// FIREBASE GREETINGS
// ======================================================

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

const greetingSubmit =
  document.getElementById(
    "greetingSubmit"
  );


function renderGreetingDocs(
  docs
) {

  if (!guestMessages) {
    return;
  }


  guestMessages.innerHTML =
    "";


  if (!docs.length) {

    guestMessages.innerHTML =
      '<p class="empty-greetings">Be the first to leave Joel & Libina a message.</p>';

    return;

  }


  docs.forEach(
    (docSnap) => {

      const item =
        docSnap.data();


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
        item.message || "";


      const name =
        document.createElement(
          "strong"
        );

      name.textContent =
        `— ${item.name || "Guest"}`;


      card.append(
        message,
        name
      );


      guestMessages.appendChild(
        card
      );

    }
  );

}


if (
  guestMessages
) {

  try {

    const greetingsQuery =
      query(
        collection(
          db,
          "greetings"
        ),
        orderBy(
          "createdAt",
          "desc"
        ),
        limit(
          50
        )
      );


    onSnapshot(
      greetingsQuery,
      (
        snapshot
      ) => {

        renderGreetingDocs(
          snapshot.docs
        );

      },
      (
        error
      ) => {

        console.error(
          "Greeting feed error:",
          error
        );


        guestMessages.innerHTML =
          '<p class="empty-greetings">Greetings are temporarily unavailable.</p>';

      }
    );

  } catch (
    error
  ) {

    console.error(
      "Firebase greeting setup error:",
      error
    );

  }

}


openGreetings?.addEventListener(
  "click",
  () => {

    openModal(
      greetingsModal
    );


    setTimeout(
      () => {

        document
          .getElementById(
            "guestName"
          )
          ?.focus();

      },
      50
    );

  }
);


document
  .querySelectorAll(
    "[data-close-modal]"
  )
  .forEach(
    (element) => {

      element.addEventListener(
        "click",
        () => {

          closeModal(
            greetingsModal
          );

        }
      );

    }
  );


greetingForm?.addEventListener(
  "submit",
  async (
    event
  ) => {

    event.preventDefault();


    const guestNameInput =
      document.getElementById(
        "guestName"
      );

    const guestMessageInput =
      document.getElementById(
        "guestMessage"
      );


    const name =
      guestNameInput?.value.trim();

    const message =
      guestMessageInput?.value.trim();


    if (
      !name ||
      !message
    ) {

      showToast(
        "Please enter your name and message."
      );

      return;

    }


    if (
      greetingSubmit
    ) {

      greetingSubmit.disabled =
        true;

      greetingSubmit.textContent =
        "Posting…";

    }


    try {

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


      document
        .getElementById(
          "blessings"
        )
        ?.scrollIntoView(
          {
            behavior:
              "smooth",
            block:
              "start"
          }
        );


      showToast(
        "Your greeting has been added."
      );

    } catch (
      error
    ) {

      console.error(
        "Greeting submit error:",
        error
      );


      showToast(
        "Could not post your greeting. Please try again."
      );

    } finally {

      if (
        greetingSubmit
      ) {

        greetingSubmit.disabled =
          false;

        greetingSubmit.textContent =
          "Post Greeting";

      }

    }

  }
);


// ======================================================
// FIREBASE RSVP
// ======================================================

const rsvpModal =
  document.getElementById(
    "rsvpModal"
  );

const rsvpForm =
  document.getElementById(
    "rsvpForm"
  );

const rsvpAttendance =
  document.getElementById(
    "rsvpAttendance"
  );

const rsvpGuestCount =
  document.getElementById(
    "rsvpGuestCount"
  );

const rsvpSubmit =
  document.getElementById(
    "rsvpSubmit"
  );


function openRsvpModal() {

  openModal(
    rsvpModal
  );


  setTimeout(
    () => {

      document
        .getElementById(
          "rsvpName"
        )
        ?.focus();

    },
    50
  );

}


document
  .querySelectorAll(
    "[data-close-rsvp]"
  )
  .forEach(
    (element) => {

      element.addEventListener(
        "click",
        () => {

          closeModal(
            rsvpModal
          );

        }
      );

    }
  );


rsvpAttendance?.addEventListener(
  "change",
  () => {

    if (
      !rsvpGuestCount
    ) {
      return;
    }


    const attending =
      rsvpAttendance.value ===
      "yes";


    if (
      attending
    ) {

      rsvpGuestCount.disabled =
        false;

      rsvpGuestCount.value =
        Math.max(
          1,
          Number(
            rsvpGuestCount.value
          ) || 1
        );

    } else {

      rsvpGuestCount.value =
        0;

      rsvpGuestCount.disabled =
        true;

    }

  }
);


rsvpForm?.addEventListener(
  "submit",
  async (
    event
  ) => {

    event.preventDefault();


    const rsvpNameInput =
      document.getElementById(
        "rsvpName"
      );

    const rsvpMessageInput =
      document.getElementById(
        "rsvpMessage"
      );


    const name =
      rsvpNameInput?.value.trim();


    const attendance =
      rsvpAttendance?.value;


    const guestCount =
      attendance === "yes"
        ? Number(
            rsvpGuestCount?.value
          )
        : 0;


    const message =
      rsvpMessageInput?.value.trim() ||
      "";


    if (
      !name ||
      !attendance ||
      !Number.isInteger(
        guestCount
      ) ||
      guestCount < 0 ||
      guestCount > 10
    ) {

      showToast(
        "Please complete the RSVP form."
      );

      return;

    }


    if (
      rsvpSubmit
    ) {

      rsvpSubmit.disabled =
        true;

      rsvpSubmit.textContent =
        "Submitting…";

    }


    try {

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


      if (
        rsvpGuestCount
      ) {

        rsvpGuestCount.disabled =
          false;

        rsvpGuestCount.value =
          1;

      }


      closeModal(
        rsvpModal
      );


      showToast(
        "Thank you — your RSVP was received."
      );

    } catch (
      error
    ) {

      console.error(
        "RSVP submit error:",
        error
      );


      showToast(
        "Could not submit your RSVP. Please try again."
      );

    } finally {

      if (
        rsvpSubmit
      ) {

        rsvpSubmit.disabled =
          false;

        rsvpSubmit.textContent =
          "Submit RSVP";

      }

    }

  }
);


// ======================================================
// ACTION BUTTONS
// ======================================================

document
  .querySelectorAll(
    ".action-tile"
  )
  .forEach(
    (
      button
    ) => {

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


            setTimeout(
              () => {

                document
                  .getElementById(
                    "guestName"
                  )
                  ?.focus();

              },
              50
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
            action ===
            "rsvp"
          ) {

            openRsvpModal();

          }

        }
      );

    }
  );


// ======================================================
// GALLERY + LIGHTBOX
// ======================================================

const galleryItems = [
  ...document.querySelectorAll(
    ".gallery-item"
  )
];

const lightbox =
  document.getElementById(
    "galleryLightbox"
  );

const lightboxImage =
  document.getElementById(
    "lightboxImage"
  );

const lightboxCounter =
  document.getElementById(
    "lightboxCounter"
  );

const galleryPrev =
  document.getElementById(
    "galleryPrev"
  );

const galleryNext =
  document.getElementById(
    "galleryNext"
  );

let availableGalleryImages =
  [];

let galleryIndex = 0;
let touchStartX = 0;


function refreshGalleryImages() {

  availableGalleryImages =
    galleryItems
      .filter(
        (
          item
        ) =>
          item.classList.contains(
            "has-image"
          )
      )
      .map(
        (
          item
        ) =>
          item.querySelector(
            "img"
          )
      )
      .filter(
        Boolean
      );

}


function showGalleryImage(
  index
) {

  refreshGalleryImages();


  if (
    !availableGalleryImages.length ||
    !lightboxImage
  ) {
    return;
  }


  galleryIndex =
    (
      index +
      availableGalleryImages.length
    ) %
    availableGalleryImages.length;


  const source =
    availableGalleryImages[
      galleryIndex
    ];


  lightboxImage.src =
    source.src;


  lightboxImage.alt =
    source.alt;


  if (
    lightboxCounter
  ) {

    lightboxCounter.textContent =
      `${galleryIndex + 1} / ${availableGalleryImages.length}`;

  }

}


galleryItems.forEach(
  (
    item
  ) => {

    const img =
      item.querySelector(
        "img"
      );


    if (!img) {
      return;
    }


    const markLoaded =
      () => {

        item.classList.add(
          "has-image"
        );

        refreshGalleryImages();

      };


    if (
      img.complete &&
      img.naturalWidth > 0
    ) {

      markLoaded();

    } else {

      img.addEventListener(
        "load",
        markLoaded
      );

    }


    img.addEventListener(
      "error",
      () => {

        img.style.display =
          "none";


        item.classList.remove(
          "has-image"
        );


        refreshGalleryImages();

      }
    );


    item.addEventListener(
      "click",
      () => {

        if (
          !item.classList.contains(
            "has-image"
          )
        ) {
          return;
        }


        refreshGalleryImages();


        const index =
          availableGalleryImages.indexOf(
            img
          );


        showGalleryImage(
          index
        );


        openModal(
          lightbox
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
  .forEach(
    (
      element
    ) => {

      element.addEventListener(
        "click",
        () => {

          closeModal(
            lightbox
          );

        }
      );

    }
  );


lightboxImage?.addEventListener(
  "touchstart",
  (
    event
  ) => {

    touchStartX =
      event.changedTouches[0]
        .screenX;

  },
  {
    passive: true
  }
);


lightboxImage?.addEventListener(
  "touchend",
  (
    event
  ) => {

    const delta =
      event.changedTouches[0]
        .screenX -
      touchStartX;


    if (
      Math.abs(
        delta
      ) < 45
    ) {
      return;
    }


    if (
      delta > 0
    ) {

      showGalleryImage(
        galleryIndex - 1
      );

    } else {

      showGalleryImage(
        galleryIndex + 1
      );

    }

  },
  {
    passive: true
  }
);


// ======================================================
// ADD EVENTS TO CALENDAR
// ======================================================

const addCalendar =
  document.getElementById(
    "addCalendar"
  );


function downloadCalendarFile() {

  const ics =
`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Joel and Libina Wedding//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
UID:engagement-20261231@joel-libina-wedding
DTSTART:20261231T060000Z
DTEND:20261231T080000Z
SUMMARY:Joel & Libina - Engagement
LOCATION:St. Thomas Marthoma Church Auditorium, Kavungumprayar, Puramattom, Kerala, India
END:VEVENT
BEGIN:VEVENT
UID:wedding-20270103@joel-libina-wedding
DTSTART:20270103T053000Z
DTEND:20270103T073000Z
SUMMARY:Joel & Libina - Wedding Ceremony
LOCATION:Mar Lazarus Orthodox Valiyapally, Pathanapuram, Kerala, India
END:VEVENT
BEGIN:VEVENT
UID:reception-20270103@joel-libina-wedding
DTSTART:20270103T093000Z
DTEND:20270103T123000Z
SUMMARY:Joel & Libina - Wedding Reception
LOCATION:Morning Star Convention Center, Elamanoor, Kerala, India
END:VEVENT
END:VCALENDAR`;


  const blob =
    new Blob(
      [
        ics.replace(
          /\n/g,
          "\r\n"
        )
      ],
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


  link.href =
    url;


  link.download =
    "joel-libina-wedding-events.ics";


  document.body.appendChild(
    link
  );


  link.click();


  link.remove();


  URL.revokeObjectURL(
    url
  );

}


addCalendar?.addEventListener(
  "click",
  downloadCalendarFile
);


// ======================================================
// KEYBOARD CONTROLS
// ======================================================

document.addEventListener(
  "keydown",
  (
    event
  ) => {

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
        lightbox
      );

    }


    if (
      lightbox?.classList.contains(
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
