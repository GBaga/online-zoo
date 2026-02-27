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
  var zooCamTrack = document.querySelector(".zoo-cam-track");
  var zooCamPrev = document.querySelector(".zoo-cam-prev");
  var zooCamNext = document.querySelector(".zoo-cam-next");

  if (zooCamTrack && zooCamPrev && zooCamNext) {
    var scrollAmount = 300;

    zooCamNext.addEventListener("click", function () {
      zooCamTrack.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });

    zooCamPrev.addEventListener("click", function () {
      zooCamTrack.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });

    // Highlight active preview
    var viewThumbs = zooCamTrack.querySelectorAll(".zoo-cam-thumb");
    viewThumbs.forEach(function (thumb) {
      thumb.addEventListener("click", function (e) {
        viewThumbs.forEach(function (v) {
          v.classList.remove("active");
        });
        this.classList.add("active");
      });
    });
  }
});
