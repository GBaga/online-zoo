import { ApiClient } from "../../api/apiClient";
import { createLoader, createErrorMessage } from "../ui/loaders";

export async function initZoosUI() {
  const isZoosPage = document.querySelector(".zoo-sidebar") !== null;
  if (!isZoosPage) return;

  await initSidebarAndPets();
}

async function initSidebarAndPets() {
  const sidebarNav = document.querySelector(".sidebar-nav") as HTMLElement;
  if (!sidebarNav) return;

  sidebarNav.innerHTML = "";
  sidebarNav.appendChild(createLoader());

  try {
    // 1. Fetch Cameras
    const cameras = await ApiClient.getCameras();
    sidebarNav.innerHTML = "";

    if (!cameras || cameras.length === 0) {
      sidebarNav.innerHTML =
        '<p style="color:white; padding: 20px;">No cameras available.</p>';
      return;
    }

    // Expansion State
    let isSidebarExpanded = false;
    const downArrow = document.querySelector(
      ".sidebar-down-arrow",
    ) as HTMLElement;

    // Determine active camera (default to first one)
    let activeCameraId = cameras[0].id;
    let activePetId = cameras[0].petId;

    // Map camera's petId to local icons
    const cameraIconMap: Record<number, string> = {
      1: "/assets/icons/Panda.png",
      5: "/assets/icons/Eagle.png",
      3: "/assets/icons/Gorilla.png",
      2: "/assets/icons/Lemur.png",
      4: "/assets/icons/map-alligator.png",
      6: "/assets/icons/map-Coala.png",
      7: "/assets/icons/map-lion.png",
      8: "/assets/icons/map-tiger.png",
    };

    const renderSidebar = () => {
      sidebarNav.innerHTML = "";

      // Limit based on expansion state (4 -> All)
      const displayLimit = isSidebarExpanded ? cameras.length : 4;
      const displayCameras = cameras.slice(0, displayLimit);

      displayCameras.forEach((cam) => {
        const isActive = cam.id === activeCameraId;
        const iconSrc =
          cam.image || cameraIconMap[cam.petId] || "/assets/icons/Panda.png"; // fallback

        const item = document.createElement("div");
        item.className = "animal-nav-item " + (isActive ? "active" : "");
        item.dataset.id = cam.id.toString();
        item.style.cursor = "pointer";

        item.innerHTML = `
          <div class="sidebar-circle ${isActive ? "sidebar-circle--active" : "sidebar-circle--orange"}">
              <img src="${iconSrc}" alt="Camera ${cam.id}" class="sidebar-icon">
          </div>
          <span class="sidebar-animal-text" data-i18n="camera.${cam.id}">${cam.text}</span>
        `;

        item.addEventListener("click", () => {
          activeCameraId = cam.id;
          activePetId = cam.petId;
          renderSidebar();
          updateDidYouKnow(activePetId);
        });

        sidebarNav.appendChild(item);
      });
    };

    renderSidebar();

    // Configure Down Arrow logic
    if (downArrow) {
      if (cameras.length <= 4) {
        downArrow.style.display = "none";
      } else {
        downArrow.addEventListener("click", () => {
          isSidebarExpanded = !isSidebarExpanded;
          renderSidebar();
          downArrow.style.transform = isSidebarExpanded
            ? "rotate(180deg)"
            : "rotate(0deg)";
        });
      }
    }

    // 2. Initial Pet Data Fetch
    await updateDidYouKnow(activePetId);
  } catch (err) {
    sidebarNav.innerHTML = "";
    sidebarNav.appendChild(createErrorMessage());
  }
}

async function updateDidYouKnow(petId: number) {
  const factSection = document.querySelector(
    ".zoo-fact-section",
  ) as HTMLElement;
  const infoSection = document.querySelector(
    ".zoo-info-section .zoo-info-layout",
  ) as HTMLElement;

  if (!factSection || !infoSection) return;

  // Render overlay loader
  const loaderOverlay = document.createElement("div");
  loaderOverlay.style.position = "absolute";
  loaderOverlay.style.top = "0";
  loaderOverlay.style.left = "0";
  loaderOverlay.style.width = "100%";
  loaderOverlay.style.height = "100%";
  loaderOverlay.style.backgroundColor = "rgba(255,255,255,0.7)";
  loaderOverlay.style.zIndex = "10";
  loaderOverlay.style.display = "flex";
  loaderOverlay.style.justifyContent = "center";
  loaderOverlay.style.alignItems = "center";
  loaderOverlay.appendChild(createLoader());

  infoSection.style.position = "relative";
  infoSection.appendChild(loaderOverlay);

  try {
    const pet = await ApiClient.getPet(petId);
    loaderOverlay.remove();

    // Fully programmatically generate the Fact Section
    factSection.innerHTML = `
      <div class="container">
          <div class="zoo-fact-card">
              <h2 class="zoo-fact-title" data-i18n="zoos.info.did_you_know">Did you know?</h2>
              <p class="zoo-fact-text" id="didYouKnowText">
                ${pet.detailedDescription || pet.description || "Information not available."}
              </p>
          </div>
      </div>
    `;

    // Map pet image
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
    const imageUrl =
      pet.image || petImageMap[pet.id] || "/assets/images/welcome-zoo.png";

    infoSection.innerHTML = `
      <div class="zoo-info-details">
          <dl class="zoo-info-list">
              <div class="zoo-info-row">
                  <dt class="zoo-info-label" data-i18n="zoos.info.common_name">Common name:</dt>
                  <dd class="zoo-info-value" id="animalName">${pet.commonName || pet.name || "Unknown Pet"}</dd>
              </div>
              <div class="zoo-info-row">
                  <dt class="zoo-info-label" data-i18n="zoos.info.scientific_name">Scientific name:</dt>
                  <dd class="zoo-info-value zoo-info-italic" id="didYouKnowAnimal">${pet.scientificName || "Unknown Breed"}</dd>
              </div>
              <div class="zoo-info-row">
                  <dt class="zoo-info-label" data-i18n="zoos.info.type">Type:</dt>
                  <dd class="zoo-info-value">${pet.type || "Mammal"}</dd>
              </div>
              <div class="zoo-info-row">
                  <dt class="zoo-info-label" data-i18n="zoos.info.size">Size:</dt>
                  <dd class="zoo-info-value">${pet.size || "4 to 6 feet"}</dd>
              </div>
              <div class="zoo-info-row">
                  <dt class="zoo-info-label" data-i18n="zoos.info.diet">Diet:</dt>
                  <dd class="zoo-info-value">${pet.diet || "Omnivore"}</dd>
              </div>
              <div class="zoo-info-row">
                  <dt class="zoo-info-label" data-i18n="zoos.info.habitat">Habitat:</dt>
                  <dd class="zoo-info-value">${pet.habitat || "Forest"}</dd>
              </div>
              <div class="zoo-info-row">
                  <dt class="zoo-info-label" data-i18n="zoos.info.range">Range:</dt>
                  <dd class="zoo-info-value">
                      ${pet.range || "Unknown Location"}
                      <a href="#" class="zoo-map-link" style="cursor: pointer;">
                          <span data-i18n="zoos.info.view_map">VIEW MAP</span>
                          <img src="/assets/icons/right-arrow-dark.svg" alt="" class="zoo-map-arrow">
                      </a>
                  </dd>
              </div>
          </dl>
          <p class="zoo-info-description">
            ${pet.detailedDescription || pet.description || "Information not available."}
          </p>
      </div>
      <div class="zoo-info-image-wrap">
          <img src="${imageUrl}" alt="${pet.commonName || pet.name || "Animal"}" class="zoo-info-image">
      </div>
    `;

    // If map link exists, attach event listener
    const mapLink = infoSection.querySelector(".zoo-map-link") as HTMLElement;
    if (mapLink) {
      mapLink.addEventListener("click", (e) => {
        e.preventDefault();
        openMapModal((pet.location || pet.range || "Africa") as string); // Fallback location
      });
    }

    // Dispatch event to strictly translate new dynamic DOM insertions
    window.dispatchEvent(new Event("i18nUpdate"));
  } catch (err) {
    loaderOverlay.innerHTML = "";
    loaderOverlay.appendChild(createErrorMessage());
  }
}

function openMapModal(location: string) {
  // Check if map modal already exists
  let modal = document.getElementById("mapOverlayModal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "mapOverlayModal";
    modal.className = "popup-overlay"; // Re-using existing CSS classes
    modal.style.display = "flex"; // override default CSS behavior to show immediately

    modal.innerHTML = `
      <div class="popup-modal" style="width: 80%; height: 80%; padding: 40px; display: flex; flex-direction: column;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
           <h2 class="popup-title">View Map Location</h2>
           <span id="closeMapModal" style="cursor: pointer; font-size: 30px; line-height: 1;">&times;</span>
        </div>
        <div id="mapIframeContainer" style="flex: 1; border: 1px solid #ccc; border-radius: 8px; overflow: hidden;"></div>
      </div>
    `;

    document.body.appendChild(modal);

    const closeBtn = document.getElementById("closeMapModal");
    if (closeBtn)
      closeBtn.addEventListener("click", () => (modal!.style.display = "none"));

    // Close on esc
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal!.style.display === "flex") {
        modal!.style.display = "none";
      }
    });

    // Close on click outside (click on overlay)
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal!.style.display = "none";
      }
    });
  } else {
    modal.style.display = "flex";
  }

  const container = document.getElementById(
    "mapIframeContainer",
  ) as HTMLElement;
  const encodedLocation = encodeURIComponent(location);
  container.innerHTML = `
    <iframe 
      width="100%" 
      height="100%" 
      frameborder="0" 
      scrolling="no" 
      marginheight="0" 
      marginwidth="0" 
      src="https://maps.google.com/maps?q=${encodedLocation}&output=embed">
    </iframe>
  `;
}
