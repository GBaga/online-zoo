/* =============================================
   Online Zoo — Zoos Page JavaScript
   Features: Side panel toggle, animal switching,
   More views carousel, Popup system
   ============================================= */

document.addEventListener("DOMContentLoaded", function () {
  /* ----- ANIMAL DATA ----- */
  var animals = {
    panda: {
      name: "Giant Panda — Lucas",
      fact: "Giant pandas have an insatiable appetite for bamboo. A typical animal eats half the day — a full 12 out of every 24 hours — and relieves itself dozens of times a day. It takes 28 pounds of bamboo to satisfy a giant panda's daily dietary needs.",
      species: "Giant Panda",
    },
    lemur: {
      name: "Madagascarian Lemur — Andy",
      fact: "Ring-tailed lemurs spend a lot of time on the ground, which is unusual among lemur species. They can be found in large social groups of up to 30 individuals, called troops, which are led by dominant females.",
      species: "Madagascarian Lemur",
    },
    gorilla: {
      name: "Gorilla in Congo — Glen",
      fact: "Gorillas are the largest living primates, reaching heights between 1.25 and 1.8 meters. They share 98.3% of their genetic code with humans, making them our closest cousins after chimpanzees and bonobos.",
      species: "Gorilla in Congo",
    },
    eagle: {
      name: "West End Bald Eagles — Sam & Lora",
      fact: "Bald eagles can fly at speeds of 35-43 mph, and can reach diving speeds up to 100 mph. Their nests, called aeries, can weigh up to 2 tons — the largest nests of any North American bird.",
      species: "West End Bald Eagles",
    },
    koala: {
      name: "Australian Koala — Liz",
      fact: "Koalas sleep for up to 22 hours a day! Their diet consists almost entirely of eucalyptus leaves, which are tough to digest and low in nutrition. This is why koalas conserve energy by sleeping most of the day.",
      species: "Australian Koala",
    },
    lion: {
      name: "African Lion — Shake",
      fact: "Lions are the only cats that live in groups, called prides. A pride usually consists of related females and their cubs, plus a small number of adult males. Male lions' manes can grow up to 16 cm in length.",
      species: "African Lion",
    },
  };

  /* ----- SIDE PANEL TOGGLE ----- */
  var sidePanel = document.getElementById("sidePanel");
  var panelToggle = document.getElementById("panelToggle");

  if (sidePanel && panelToggle) {
    panelToggle.addEventListener("click", function () {
      sidePanel.classList.toggle("expanded");
    });
  }

  /* ----- ANIMAL SWITCHING ----- */
  var animalNavItems = document.querySelectorAll(".animal-nav-item");
  var animalTitle = document.getElementById("animalName");
  var didYouKnowAnimal = document.getElementById("didYouKnowAnimal");
  var didYouKnowText = document.getElementById("didYouKnowText");

  animalNavItems.forEach(function (item) {
    item.addEventListener("click", function () {
      var animalKey = this.getAttribute("data-animal");
      var data = animals[animalKey];

      // Update active state
      animalNavItems.forEach(function (navItem) {
        navItem.classList.remove("active");
      });
      this.classList.add("active");

      // Update content
      if (data && animalTitle) {
        animalTitle.textContent = data.name;
      }
      if (data && didYouKnowAnimal) {
        didYouKnowAnimal.textContent = data.species;
      }
      if (data && didYouKnowText) {
        didYouKnowText.textContent = data.fact;
      }
    });
  });

  /* ----- MORE VIEWS CAROUSEL ----- */
  var moreViewsTrack = document.getElementById("moreViewsTrack");
  var moreViewsPrev = document.querySelector(".more-views-prev");
  var moreViewsNext = document.querySelector(".more-views-next");

  if (moreViewsTrack && moreViewsPrev && moreViewsNext) {
    var viewItems = moreViewsTrack.querySelectorAll(".more-view-item");
    var viewIndex = 0;

    function getVisibleViews() {
      var width = window.innerWidth;
      if (width >= 1200) return 4;
      if (width >= 640) return 3;
      return 2;
    }

    function updateViewsCarousel() {
      var visible = getVisibleViews();
      var maxIndex = Math.max(0, viewItems.length - visible);
      if (viewIndex > maxIndex) viewIndex = maxIndex;

      var gap = 16;
      var wrapperWidth = moreViewsTrack.parentElement.offsetWidth;
      var cardWidth = (wrapperWidth - gap * (visible - 1)) / visible;

      viewItems.forEach(function (item) {
        item.style.width = cardWidth + "px";
      });

      var offset = viewIndex * (cardWidth + gap);
      moreViewsTrack.style.transform = "translateX(-" + offset + "px)";
    }

    // Highlight active preview
    viewItems.forEach(function (item, index) {
      item.addEventListener("click", function (e) {
        viewItems.forEach(function (v) {
          v.classList.remove("active");
        });
        this.classList.add("active");
      });
    });

    moreViewsNext.addEventListener("click", function () {
      var visible = getVisibleViews();
      var maxIndex = Math.max(0, viewItems.length - visible);
      if (viewIndex < maxIndex) {
        viewIndex++;
        updateViewsCarousel();
      }
    });

    moreViewsPrev.addEventListener("click", function () {
      if (viewIndex > 0) {
        viewIndex--;
        updateViewsCarousel();
      }
    });

    window.addEventListener("resize", updateViewsCarousel);
    updateViewsCarousel();
  }

  /* ----- POPUP SYSTEM ----- */
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
    var dots = popup.querySelectorAll(".popup-dot");
    dots.forEach(function (dot, i) {
      dot.classList.toggle("popup-dot--active", i === 0);
    });
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
        var backBtn = popup.querySelector(".popup-back-btn");
        if (backBtn) backBtn.style.display = "inline";
        var allSteps = popup.querySelectorAll(".popup-step");
        if (newIndex === allSteps.length - 1) {
          this.innerHTML =
            'COMPLETE DONATION <img src="../../assets/icons/right-arrow-white.svg" alt="" class="btn-icon">';
        }
      } else {
        var overlay = this.closest(".popup-overlay");
        if (overlay) closePopup(overlay);
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
        if (newIndex === 0) this.style.display = "none";
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
});
