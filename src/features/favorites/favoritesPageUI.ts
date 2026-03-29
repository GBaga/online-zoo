import { FavoriteService } from "./favoriteService";
import { FavoriteUI } from "./favoriteUI";

export const PETS_DATA = [
  {
    id: "panda",
    name_key: "pet.name.lucas",
    species_key: "pet.species.panda",
    desc_key: "pet.desc.panda",
    img: "/assets/images/panda-eats-bamboo.png",
    alt: "Giant Panda Lucas",
  },
  {
    id: "lemur",
    name_key: "pet.name.andy",
    species_key: "pet.species.lemur",
    desc_key: "pet.desc.lemur",
    img: "/assets/images/lemur.png",
    alt: "Madagascarian Lemur Andy",
  },
  {
    id: "gorilla",
    name_key: "pet.name.glen",
    species_key: "pet.species.gorilla",
    desc_key: "pet.desc.gorilla",
    img: "/assets/images/monkeys-baby-on-back.png",
    alt: "Gorilla in Congo Glen",
  },
  {
    id: "eagle",
    name_key: "pet.name.sam_lora",
    species_key: "pet.species.eagle",
    desc_key: "pet.desc.eagle",
    img: "/assets/images/eagles-couple.png",
    alt: "West End Bald Eagles Sam & Lora",
  },
  {
    id: "alligator",
    name_key: "pet.name.sam",
    species_key: "pet.species.alligator",
    desc_key: "pet.desc.alligator",
    img: "/assets/images/alligator.png",
    alt: "Alligator Sam",
  },
  {
    id: "koala",
    name_key: "pet.name.liz",
    species_key: "pet.species.koala",
    desc_key: "pet.desc.koala",
    img: "/assets/images/koala.png",
    alt: "Australian Koala Liz",
  },
  {
    id: "lion",
    name_key: "pet.name.shake",
    species_key: "pet.species.lion",
    desc_key: "pet.desc.lion",
    img: "/assets/images/lion.png",
    alt: "African Lion Shake",
  },
  {
    id: "tiger",
    name_key: "pet.name.sara",
    species_key: "pet.species.tiger",
    desc_key: "pet.desc.tiger",
    img: "/assets/images/tiger-senja.png",
    alt: "Sumatran Tiger Sara",
  },
];

export class FavoritesPageUI {
  static init(): void {
    this.render();

    // Listen for changes (unfavoriting from this page)
    window.addEventListener("favoritesUpdated", () => {
      this.render();
    });
  }

  static render(): void {
    const container = document.getElementById("favorites-container");
    const emptyMsg = document.getElementById("empty-favorites");
    if (!container || !emptyMsg) return;

    const favoriteIds = FavoriteService.getAll();
    const favPets = PETS_DATA.filter((p) => favoriteIds.includes(p.id));

    if (favPets.length === 0) {
      container.innerHTML = "";
      emptyMsg.classList.add("visible");
      return;
    }

    emptyMsg.classList.remove("visible");
    container.innerHTML = favPets
      .map(
        (pet) => `
      <div class="pet-card" id="pet-${pet.id}" data-pet-id="${pet.id}">
        <div class="pet-image-container">
          <img src="${pet.img}" alt="${pet.alt}" class="pet-image" />
          <div class="pet-name-tag" data-i18n="${pet.name_key}">${pet.id === "panda" ? "Lucas" : pet.id === "lemur" ? "Andy" : pet.id === "gorilla" ? "Glen" : "Sam & Lora"}</div>
        </div>
        <div class="pet-info">
          <h3 class="pet-species" data-i18n="${pet.species_key}">Species</h3>
          <p class="pet-description" data-i18n="${pet.desc_key}">Description</p>
          <a href="../zoos/index.html" class="view-cam-btn">
            <span data-i18n="pet.view_cam">VIEW LIVE CAM</span>
            <img src="/assets/icons/right-arrow-blue.svg" alt="" class="cam-icon" />
          </a>
        </div>
      </div>
    `,
      )
      .join("");

    // Re-inject hearts
    FavoriteUI.injectHearts();

    // Re-trigger i18n for the newly injected HTML
    window.dispatchEvent(new Event("i18nUpdate"));
  }
}
