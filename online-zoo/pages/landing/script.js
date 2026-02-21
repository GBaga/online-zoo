// Basic interactions for the Landing Page

document.addEventListener("DOMContentLoaded", () => {
  // Simulate simple alert/popup for donate button interaction
  const donatePopupBtn = document.getElementById("open-donate-popup");

  if (donatePopupBtn) {
    donatePopupBtn.addEventListener("click", () => {
      // For now, since popups are a separate task, we just log/alert
      alert("Donate popup will open here.");
    });
  }

  // Pet card interaction (just an example of adding JS logic as per requirements)
  const petCards = document.querySelectorAll(".pet-card");

  petCards.forEach((card) => {
    card.addEventListener("click", () => {
      // In a real scenario, this might navigate or open a modal
      console.log("Navigating to " + card.querySelector("h4").innerText);
      window.location.href = "../zoos/index.html";
    });
  });

  // Example: Form submission prevent default
  const emailForm = document.querySelector(".email-form");
  if (emailForm) {
    emailForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Subscribed successfully!");
      emailForm.reset();
    });
  }
});
