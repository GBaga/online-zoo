import { ApiClient } from "../../api/apiClient";
import { createLoader, createErrorMessage } from "../ui/loaders";

export async function initLandingUI() {
  const isLandingPage = document.querySelector(".pets-carousel") !== null;
  if (!isLandingPage) return;

  await Promise.all([initPetsSlider(), initFeedbackSlider()]);
}

async function initPetsSlider() {
  const container = document.querySelector(".pets-grid") as HTMLElement;
  const prevBtn = document.querySelector(".pets-prev") as HTMLButtonElement;
  const nextBtn = document.querySelector(".pets-next") as HTMLButtonElement;

  if (!container || !prevBtn || !nextBtn) return;

  container.innerHTML = "";
  const loader = createLoader();
  container.appendChild(loader);

  try {
    const pets = await ApiClient.getPets();
    container.innerHTML = "";

    if (!pets || pets.length === 0) {
      container.innerHTML = "<p>No pets found.</p>";
      return;
    }

    let currentIndex = 0;

    const renderSlider = () => {
      const itemsPerPage = window.innerWidth <= 640 ? 4 : 6;
      container.innerHTML = "";

      interface PetI18n {
        id: string;
        name: string;
        species: string;
        desc: string;
      }

      // Map known API IDs to local i18n keys
      const petI18nMap: Record<number, PetI18n> = {
        1: {
          id: "panda",
          name: "pet.name.lucas",
          species: "pet.species.panda",
          desc: "pet.desc.panda",
        },
        2: {
          id: "lemur",
          name: "pet.name.andy",
          species: "pet.species.lemur",
          desc: "pet.desc.lemur",
        },
        3: {
          id: "gorilla",
          name: "pet.name.glen",
          species: "pet.species.gorilla",
          desc: "pet.desc.gorilla",
        },
        4: {
          id: "alligator",
          name: "pet.name.sam",
          species: "pet.species.alligator",
          desc: "pet.desc.alligator",
        },
        5: {
          id: "eagle",
          name: "pet.name.sam_lora",
          species: "pet.species.eagle",
          desc: "pet.desc.eagle",
        },
        6: {
          id: "koala",
          name: "pet.name.liz",
          species: "pet.species.koala",
          desc: "pet.desc.koala",
        },
        7: {
          id: "lion",
          name: "pet.name.shake",
          species: "pet.species.lion",
          desc: "pet.desc.lion",
        },
        8: {
          id: "tiger",
          name: "pet.name.sara",
          species: "pet.species.tiger",
          desc: "pet.desc.tiger",
        },
      };

      // Get a slice (or wrap around if needed)
      const currentItems = [];
      for (let i = 0; i < itemsPerPage; i++) {
        const itemIndex = (currentIndex + i) % pets.length;
        currentItems.push(pets[itemIndex]);
      }

      // Map known API IDs to local image assets
      const petImageMap: Record<number, string> = {
        1: "/assets/images/panda-eats-bamboo.png",
        2: "/assets/images/lemur.png",
        3: "/assets/images/gorilla-looking-sad.png",
        4: "/assets/images/alligator.png",
        5: "/assets/images/eagles-couple.png",
        6: "/assets/images/koala.png",
        7: "/assets/images/lion.png",
        8: "/assets/images/tiger-senja.png",
      };

      currentItems.forEach((pet) => {
        const petImage =
          pet.image || petImageMap[pet.id] || "/assets/images/welcome-zoo.png";

        const i18n = petI18nMap[pet.id] || { name: "", species: "", desc: "" };

        const card = document.createElement("a");
        card.href = "/pages/zoos/index.html";
        card.className = "pet-card";
        card.setAttribute("data-pet-id", i18n.id);
        card.innerHTML = `
          <div class="pet-image-container">
            <img src="${petImage}" alt="${pet.name}" class="pet-image">
            <div class="pet-name-tag" data-i18n="${i18n.name}">${pet.name}</div>
          </div>
          <div class="pet-info">
            <h3 class="pet-species" data-i18n="${i18n.species}">${pet.commonName || pet.name}</h3>
            <p class="pet-description" data-i18n="${i18n.desc}">${pet.description || pet.location || ""}</p>
            <span class="view-cam-btn">
              <span data-i18n="pet.view_cam">VIEW LIVE CAM</span>
              <img src="/assets/icons/right-arrow-blue.svg" alt="" class="cam-icon">
            </span>
          </div>
        `;
        container.appendChild(card);
      });

      // Inject favorites hearts
      import("../favorites/favoriteUI").then((m) =>
        m.FavoriteUI.injectHearts(),
      );
      // Re-apply translations
      window.dispatchEvent(new Event("i18nUpdate"));
    };

    renderSlider();

    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + pets.length) % pets.length;
      renderSlider();
    });

    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % pets.length;
      renderSlider();
    });

    window.addEventListener("resize", () => {
      // Simple re-render to attach logic if screen size significantly changes requiring diff layout items
      // (For strict compliance, maybe not strictly needed to recalculate itemsPerPage natively if layout is purely CSS flex-wrap,
      // but if the design is 2x3 grid, sliding 1 by 1 or completely replacing the grid is typical).
      renderSlider();
    });
  } catch (error) {
    container.innerHTML = "";
    container.appendChild(createErrorMessage());
  }
}

async function initFeedbackSlider() {
  const container = document.querySelector(".testimonials-grid") as HTMLElement;
  // Based on the given HTML, the nav buttons are below
  const navBtns = document.querySelectorAll(".testimonial-nav-btn");
  const prevBtn = navBtns[0] as HTMLButtonElement | undefined;
  const nextBtn = navBtns[1] as HTMLButtonElement | undefined;

  if (!container) return;

  container.innerHTML = "";
  container.appendChild(createLoader());

  try {
    const feedback = await ApiClient.getFeedback();
    container.innerHTML = "";

    if (!feedback || feedback.length === 0) {
      container.innerHTML = "<p>No feedback found.</p>";
      return;
    }

    let currentIndex = 0;
    const itemsPerPage = 4; // 4 in desktop based on HTML

    const renderSlider = () => {
      container.innerHTML = "";

      const currentItems = [];
      for (let i = 0; i < itemsPerPage; i++) {
        const itemIndex = (currentIndex + i) % feedback.length;
        currentItems.push(feedback[itemIndex]);
      }

      currentItems.forEach((item) => {
        const card = document.createElement("div");
        card.className = "testimonial-card";
        card.innerHTML = `
          <img src="/assets/icons/quote-mark.svg" alt="Quote" class="testimonial-quote-icon">
          <h3 class="testimonial-location">${item.location || "Unknown Location"}</h3>
          <p class="testimonial-text">${item.text}</p>
          <p class="testimonial-author">${item.name}</p>
        `;
        container.appendChild(card);
      });
    };

    renderSlider();

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + feedback.length) % feedback.length;
        renderSlider();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % feedback.length;
        renderSlider();
      });
    }
  } catch (error) {
    container.innerHTML = "";
    container.appendChild(createErrorMessage());
  }
}
