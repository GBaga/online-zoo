/* =============================================
   Online Zoo — Contact Us Page JavaScript
   ============================================= */

document.addEventListener("DOMContentLoaded", function () {
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
