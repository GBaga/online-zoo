/* =============================================
   Online Zoo — Landing Page JavaScript
   Features: Pets slider, Testimonials slider, Popups
   ============================================= */

document.addEventListener("DOMContentLoaded", function () {
  /* ----- PETS SLIDER ----- */
  const petsTrack = document.querySelector(".pets-track");
  const petsPrev = document.querySelector(".nav-btn--prev");
  const petsNext = document.querySelector(".nav-btn--next");

  if (petsTrack && petsPrev && petsNext) {
    const petCards = petsTrack.querySelectorAll(".pet-card");
    let petsIndex = 0;

    function getVisiblePets() {
      const width = window.innerWidth;
      if (width >= 1200) return 3;
      if (width >= 640) return 2;
      return 1;
    }

    function updatePetsSlider() {
      const visible = getVisiblePets();
      const maxIndex = Math.max(0, petCards.length - visible);
      if (petsIndex > maxIndex) petsIndex = maxIndex;

      const gap = 32;
      const cardWidth =
        petsTrack.parentElement.offsetWidth / visible -
        (gap * (visible - 1)) / visible;

      petCards.forEach(function (card) {
        card.style.minWidth = cardWidth + "px";
      });

      const offset = petsIndex * (cardWidth + gap);
      petsTrack.style.transform = "translateX(-" + offset + "px)";
    }

    petsNext.addEventListener("click", function () {
      const visible = getVisiblePets();
      const maxIndex = Math.max(0, petCards.length - visible);
      if (petsIndex < maxIndex) {
        petsIndex++;
        updatePetsSlider();
      }
    });

    petsPrev.addEventListener("click", function () {
      if (petsIndex > 0) {
        petsIndex--;
        updatePetsSlider();
      }
    });

    window.addEventListener("resize", updatePetsSlider);
    updatePetsSlider();
  }

  /* ----- TESTIMONIALS SLIDER ----- */
  const testimonialsTrack = document.querySelector(".testimonials-track");
  const testimonialPrev = document.querySelector(".nav-btn--testimonial-prev");
  const testimonialNext = document.querySelector(".nav-btn--testimonial-next");

  if (testimonialsTrack && testimonialPrev && testimonialNext) {
    const testimonialCards =
      testimonialsTrack.querySelectorAll(".testimonial-card");
    let testimonialIndex = 0;

    function getVisibleTestimonials() {
      const width = window.innerWidth;
      if (width >= 1200) return 2;
      return 1;
    }

    function updateTestimonialsSlider() {
      const visible = getVisibleTestimonials();
      const maxIndex = Math.max(0, testimonialCards.length - visible);
      if (testimonialIndex > maxIndex) testimonialIndex = maxIndex;

      const gap = 32;
      const cardWidth =
        testimonialsTrack.parentElement.offsetWidth / visible -
        (gap * (visible - 1)) / visible;

      testimonialCards.forEach(function (card) {
        card.style.minWidth = cardWidth + "px";
      });

      const offset = testimonialIndex * (cardWidth + gap);
      testimonialsTrack.style.transform = "translateX(-" + offset + "px)";
    }

    testimonialNext.addEventListener("click", function () {
      const visible = getVisibleTestimonials();
      const maxIndex = Math.max(0, testimonialCards.length - visible);
      if (testimonialIndex < maxIndex) {
        testimonialIndex++;
        updateTestimonialsSlider();
      }
    });

    testimonialPrev.addEventListener("click", function () {
      if (testimonialIndex > 0) {
        testimonialIndex--;
        updateTestimonialsSlider();
      }
    });

    window.addEventListener("resize", updateTestimonialsSlider);
    updateTestimonialsSlider();
  }

  /* ----- POPUPS ----- */
  const popupTriggers = document.querySelectorAll("[data-popup]");
  const popupOverlays = document.querySelectorAll(".popup-overlay");
  const popupCloseButtons = document.querySelectorAll(".popup-close");

  function openPopup(popupId) {
    var popup = document.getElementById(popupId);
    if (popup) {
      popup.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  }

  function closePopup(popup) {
    popup.classList.remove("active");
    document.body.style.overflow = "";
    // Reset steps if it's a multi-step popup
    var steps = popup.querySelectorAll(".popup-step");
    if (steps.length > 0) {
      steps.forEach(function (step) {
        step.classList.remove("popup-step--active");
      });
      steps[0].classList.add("popup-step--active");
    }
  }

  popupTriggers.forEach(function (trigger) {
    trigger.addEventListener("click", function (e) {
      e.preventDefault();
      var popupId = this.getAttribute("data-popup");
      openPopup(popupId);
    });
  });

  popupCloseButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var overlay = this.closest(".popup-overlay");
      if (overlay) closePopup(overlay);
    });
  });

  popupOverlays.forEach(function (overlay) {
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) {
        closePopup(overlay);
      }
    });
  });

  /* ----- MULTI-STEP POPUP (Donate) ----- */
  var nextButtons = document.querySelectorAll(".popup-next-btn");
  nextButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var currentStep = this.closest(".popup-step");
      var nextStep = currentStep.nextElementSibling;
      if (nextStep && nextStep.classList.contains("popup-step")) {
        currentStep.classList.remove("popup-step--active");
        nextStep.classList.add("popup-step--active");
      } else {
        // Last step -> close popup
        var overlay = this.closest(".popup-overlay");
        if (overlay) closePopup(overlay);
      }
    });
  });

  /* ----- POPUP AMOUNT BUTTONS ----- */
  var amountButtons = document.querySelectorAll(".popup-amount-btn");
  amountButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var container = this.closest(".popup-amounts");
      if (container) {
        container.querySelectorAll(".popup-amount-btn").forEach(function (b) {
          b.classList.remove("popup-amount-btn--active");
        });
      }
      this.classList.add("popup-amount-btn--active");
    });
  });

  /* ----- PET DROPDOWN ----- */
  var dropdown = document.getElementById("pet-dropdown");
  if (dropdown) {
    var toggle = dropdown.querySelector(".popup-dropdown-toggle");
    var items = dropdown.querySelectorAll(".popup-dropdown-item");

    toggle.addEventListener("click", function () {
      dropdown.classList.toggle("open");
    });

    items.forEach(function (item) {
      item.addEventListener("click", function () {
        items.forEach(function (i) {
          i.classList.remove("selected");
        });
        this.classList.add("selected");
        toggle.textContent = this.textContent;
        toggle.style.color = "#000";
        dropdown.classList.remove("open");
      });
    });

    document.addEventListener("click", function (e) {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove("open");
      }
    });
  }
});
