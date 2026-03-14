// Base Entrypoint
import { initHeader } from "./features/header/header";
import { initDonationUI } from "./features/donation/donationUI";

document.addEventListener("DOMContentLoaded", () => {
  console.log("Zoo UI Framework initialized");

  const page = document.body.dataset.page;
  const loaders: Record<string, () => Promise<void>> = {
    landing: () =>
      import("./features/landing/landingUI").then((m) => m.initLandingUI()),
    zoos: () => import("./features/zoos/zoosUI").then((m) => m.initZoosUI()),
    login: () => import("./features/auth/authUI").then((m) => m.initAuthUI()),
    register: () => import("./features/auth/authUI").then((m) => m.initAuthUI()),
  };

  // Initialize Global Features
  initHeader();
  initDonationUI();

  // Initialize Page-Specific Features
  loaders[page ?? ""]?.();
});

