import { FavoriteService } from "./favoriteService";

/**
 * FavoriteUI — Handles the visual heart icons and toggling
 */

export class FavoriteUI {
  private static HEART_SVG = `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  `;

  /**
   * Initialize favorites UI: inject hearts on all pet cards
   */
  static init(): void {
    FavoriteService.init();
    this.injectHearts();

    // Watch for updates
    window.addEventListener("favoritesUpdated", () => {
      this.updateHeartsState();
    });
  }

  /**
   * Inject heart buttons on all pet cards
   */
  static injectHearts(): void {
    const cards = document.querySelectorAll(".pet-card");

    cards.forEach((card) => {
      // Find a unique ID for this pet
      let petId = card.getAttribute("data-pet-id");

      // Fallback: look at the data-i18n attribute of the name tag
      if (!petId) {
        const nameTag = card.querySelector("[data-i18n^='pet.name.']");
        if (nameTag) {
          const i18nKey = nameTag.getAttribute("data-i18n")!;
          // Map name tag key to species ID if needed (for legacy static HTML)
          const legacyMap: Record<string, string> = {
            "pet.name.lucas": "panda",
            "pet.name.andy": "lemur",
            "pet.name.glen": "gorilla",
            "pet.name.sam_lora": "eagle",
          };
          petId = legacyMap[i18nKey] || i18nKey.replace("pet.name.", "");
        }
      }

      if (!petId) return;

      // Store ID on the card itself for reference
      card.setAttribute("data-pet-id", petId);

      // Create button
      if (card.querySelector(".favorite-btn")) return;

      const btn = document.createElement("button");
      btn.className = "favorite-btn";
      btn.setAttribute("aria-label", "Favorite");
      btn.innerHTML = this.HEART_SVG;

      if (FavoriteService.isFavorite(petId)) {
        btn.classList.add("active");
      }

      // Handle Click
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        const isAdded = FavoriteService.toggleFavorite(petId);
        btn.classList.toggle("active", isAdded);
      });

      // Add to card
      const imgContainer = card.querySelector(".pet-image-container");
      if (imgContainer) {
        imgContainer.appendChild(btn);
      } else {
        card.appendChild(btn);
      }
    });
  }

  /**
   * Update active state of all hearts based on Service state
   */
  private static updateHeartsState(): void {
    const btns = document.querySelectorAll(".favorite-btn");
    btns.forEach((btn) => {
      const card = btn.closest(".pet-card");
      if (!card) return;

      const petId = card.getAttribute("data-pet-id");
      if (petId) {
        btn.classList.toggle("active", FavoriteService.isFavorite(petId));
      }
    });
  }
}
