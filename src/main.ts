// Base Entrypoint
import { initHeader } from "./features/header/header";
import { initDonationUI } from "./features/donation/donationUI";
import { ThemeService } from "./features/ui/themeService";
import { I18nService } from "./features/i18n/i18nService";

import { FavoriteUI } from "./features/favorites/favoriteUI";

document.addEventListener("DOMContentLoaded", async () => {
  console.log("Zoo UI Framework initialized");

  // Apply theme immediately to prevent FOUC
  ThemeService.init();

  // Initialize translations
  await I18nService.init();

  // Initialize favorites
  FavoriteUI.init();

  const page = document.body.dataset.page;
  const loaders: Record<string, () => Promise<void>> = {
    landing: () =>
      import("./features/landing/landingUI").then((m) => m.initLandingUI()),
    zoos: () => import("./features/zoos/zoosUI").then((m) => m.initZoosUI()),
    login: () => import("./features/auth/authUI").then((m) => m.initAuthUI()),
    register: () =>
      import("./features/auth/authUI").then((m) => m.initAuthUI()),
    favorites: () =>
      import("./features/favorites/favoritesPageUI").then((m) =>
        m.FavoritesPageUI.init(),
      ),
  };

  // Initialize Global Features
  initHeader();
  initDonationUI();

  // Initialize Page-Specific Features
  loaders[page ?? ""]?.();
});
