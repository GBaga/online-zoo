/* =============================================
   Online Zoo — Landing Page JavaScript
   Features: Popup system, Sliders, Interactions
   ============================================= */

document.addEventListener("DOMContentLoaded", function () {
  /* =============================================
     HAMBURGER MENU TOGGLE
     ============================================= */
  var hamburgerBtn = document.querySelector(".hamburger-btn");
  var mobileNavOverlay = document.querySelector(".mobile-nav-overlay");
  if (hamburgerBtn && mobileNavOverlay) {
    hamburgerBtn.addEventListener("click", function () {
      hamburgerBtn.classList.toggle("open");
      mobileNavOverlay.classList.toggle("open");
      document.body.style.overflow = mobileNavOverlay.classList.contains("open")
        ? "hidden"
        : "";
    });
  }

  /* =============================================
     POPUP SYSTEM
     ============================================= */
  var popupTriggers = document.querySelectorAll("[data-popup]");
  var popupOverlays = document.querySelectorAll(".popup-overlay");
  var popupCloseButtons = document.querySelectorAll(".popup-close");

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
    var steps = popup.querySelectorAll(".popup-step");
    if (steps.length > 0) {
      steps.forEach(function (step) {
        step.classList.remove("popup-step--active");
      });
      steps[0].classList.add("popup-step--active");
    }
    // Reset dots
    updateDots(popup, 0);
    // Reset back button
    var backBtn = popup.querySelector(".popup-back-btn");
    if (backBtn) backBtn.style.display = "none";
    // Reset next button text
    var nextBtn = popup.querySelector(".popup-next-btn");
    if (nextBtn) {
      nextBtn.innerHTML =
        'NEXT <img src="../../assets/icons/right-arrow-white.svg" alt="" class="btn-icon">';
    }
  }

  function updateDots(popup, activeIndex) {
    var dots = popup.querySelectorAll(".popup-dot");
    dots.forEach(function (dot, i) {
      dot.classList.toggle("popup-dot--active", i <= activeIndex);
    });
  }

  function getCurrentStepIndex(popup) {
    var steps = popup.querySelectorAll(".popup-step");
    for (var i = 0; i < steps.length; i++) {
      if (steps[i].classList.contains("popup-step--active")) return i;
    }
    return 0;
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
      if (e.target === overlay) closePopup(overlay);
    });
  });

  /* Multi-step navigation */
  var nextButtons = document.querySelectorAll(".popup-next-btn");
  nextButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var popup = this.closest(".popup-overlay");
      var currentStep = popup.querySelector(".popup-step--active");
      var nextStep = currentStep.nextElementSibling;

      if (nextStep && nextStep.classList.contains("popup-step")) {
        currentStep.classList.remove("popup-step--active");
        nextStep.classList.add("popup-step--active");

        var newIndex = getCurrentStepIndex(popup);
        updateDots(popup, newIndex);

        // Show/hide back button
        var backBtn = popup.querySelector(".popup-back-btn");
        if (backBtn) backBtn.style.display = "inline";

        // Check if last step → change button text
        var allSteps = popup.querySelectorAll(".popup-step");
        if (newIndex === allSteps.length - 1) {
          this.innerHTML =
            'COMPLETE DONATION <img src="../../assets/icons/right-arrow-white.svg" alt="" class="btn-icon">';
        }
      } else {
        // Last step completed
        closePopup(popup);
      }
    });
  });

  /* Back buttons */
  var backButtons = document.querySelectorAll(".popup-back-btn");
  backButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var popup = this.closest(".popup-overlay");
      var currentStep = popup.querySelector(".popup-step--active");
      var prevStep = currentStep.previousElementSibling;

      if (prevStep && prevStep.classList.contains("popup-step")) {
        currentStep.classList.remove("popup-step--active");
        prevStep.classList.add("popup-step--active");

        var newIndex = getCurrentStepIndex(popup);
        updateDots(popup, newIndex);

        // Hide back button on first step
        if (newIndex === 0) {
          this.style.display = "none";
        }

        // Reset next button text
        var nextBtn = popup.querySelector(".popup-next-btn");
        if (nextBtn) {
          nextBtn.innerHTML =
            'NEXT <img src="../../assets/icons/right-arrow-white.svg" alt="" class="btn-icon">';
        }
      }
    });
  });

  /* Amount buttons */
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

  /* Pet dropdown */
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

  /* =============================================
     PET CARD NAVIGATION
     ============================================= */
  var petCards = document.querySelectorAll(".pet-card");
  petCards.forEach(function (card) {
    card.addEventListener("click", function () {
      window.location.href = "../zoos/index.html";
    });
  });
});
