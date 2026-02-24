// Map page script
document.addEventListener("DOMContentLoaded", function () {
  /* ----- HAMBURGER MENU TOGGLE ----- */
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
});
