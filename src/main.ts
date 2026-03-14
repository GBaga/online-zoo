// Base Entrypoint
import { initHeader } from "./features/header/header";
import { initAuthUI } from "./features/auth/authUI";
import { initLandingUI } from "./features/landing/landingUI";
import { initZoosUI } from "./features/zoos/zoosUI";
import { initDonationUI } from "./features/donation/donationUI";

document.addEventListener("DOMContentLoaded", () => {
  console.log("Zoo UI Framework initialized");

  // Initialize Global Features
  initHeader();

  // Initialize Page-Specific Features based on DOM nodes
  initAuthUI();
  initLandingUI();
  initZoosUI();
  initDonationUI();
});
