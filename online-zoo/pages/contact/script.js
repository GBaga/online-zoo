/* =============================================
   Online Zoo — Contact Us Page JavaScript
   ============================================= */

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

  var contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      // Visual feedback — no real submission
      var btn = contactForm.querySelector(".btn-submit");
      if (btn) {
        var originalText = btn.innerHTML;
        btn.innerHTML = "Message sent! ✓";
        btn.style.backgroundColor = "#00a092";
        setTimeout(function () {
          btn.innerHTML = originalText;
          btn.style.backgroundColor = "";
          contactForm.reset();
        }, 2000);
      }
    });
  }
});
