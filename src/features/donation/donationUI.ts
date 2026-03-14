import { AuthService } from "../auth/authService";
import { ApiClient, ApiError } from "../../api/apiClient";

interface SavedCard {
  number: string; // just last 4 in reality, but task says store it.
  maskedName: string; // e.g. 1234 **** **** 5678
  month: string;
  year: string;
}

const CARDS_STORAGE_KEY = "zoo_saved_cards";

// Extract pet options properly since IDs are needed for API payload
// API endpoint expects petId as number. So we map names to mock IDs or we map from API
const PET_NAME_TO_ID: Record<string, number> = {
  "Lucas the Panda": 1,
  "Andy the Lemur": 2,
  "Glen the Gorilla": 3,
  "Sam the Alligator": 4,
  "Sam & Lora the eagles family": 5,
  "Liz the Koala": 6,
  "Shake the Lion": 7,
  "Sara the Tiger": 8,
};

function getSavedCards(): SavedCard[] {
  try {
    const raw = localStorage.getItem(CARDS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveCard(card: SavedCard) {
  const cards = getSavedCards();
  // Prevent exact duplicates
  if (!cards.find((c) => c.number === card.number)) {
    cards.push(card);
    localStorage.setItem(CARDS_STORAGE_KEY, JSON.stringify(cards));
  }
}

export function initDonationUI() {
  const modal = document.getElementById("donationPopup") as HTMLElement;
  if (!modal) return;

  const toggle = document.getElementById(
    "donate-popup-toggle",
  ) as HTMLInputElement;

  // STEP 1 Elements
  const step1Next = modal.querySelector(
    ".controls-1 .popup-next-btn",
  ) as HTMLElement;
  const radioAmounts = Array.from(
    modal.querySelectorAll('input[name="donate_amount1"]'),
  ) as HTMLInputElement[];
  const otherInput = modal.querySelector(
    ".popup-other-input",
  ) as HTMLInputElement;
  const petSelect = modal.querySelector(
    ".step-1-content .popup-select",
  ) as HTMLSelectElement;

  // STEP 2 Elements
  const step2Next = modal.querySelector(
    ".controls-2 .popup-next-btn",
  ) as HTMLElement;
  const step2Inputs = modal.querySelectorAll(
    ".step-2-content .popup-input",
  ) as NodeListOf<HTMLInputElement>;
  const nameInput = step2Inputs[0];
  const emailInput = step2Inputs[1];

  // STEP 3 Elements
  const step3Next = modal.querySelector(
    ".controls-3 .popup-next-btn",
  ) as HTMLElement; // Actually label for toggle
  const step3Inputs = modal.querySelectorAll(
    ".step-3-content .popup-input",
  ) as NodeListOf<HTMLInputElement>;
  const cardInput = step3Inputs[0];
  const cvvInput = step3Inputs[1];
  const step3Selects = modal.querySelectorAll(
    ".step-3-content .popup-select",
  ) as NodeListOf<HTMLSelectElement>;
  const monthSelect = step3Selects[0];
  const yearSelect = step3Selects[1];

  // Dynamically inject Save Card checkbox and Saved Cards dropdown if logged in
  let saveCardCheckbox: HTMLInputElement | null = null;
  let savedCardsSelect: HTMLSelectElement | null = null;

  const initStep3AuthFeatures = async () => {
    const user = await AuthService.getCurrentUser();
    if (user) {
      // Create Save Card UI
      const saveRow = document.createElement("div");
      saveRow.style.marginTop = "15px";
      saveRow.style.display = "flex";
      saveRow.style.alignItems = "center";
      saveRow.style.gap = "10px";
      saveRow.innerHTML = `
        <input type="checkbox" id="saveCardCheck" style="transform: scale(1.2);">
        <label for="saveCardCheck" style="font-size: 14px; color: #333;">Save card info for future donations</label>
      `;
      step3Next.parentElement?.parentElement?.insertBefore(
        saveRow,
        step3Next.parentElement,
      );
      saveCardCheckbox = document.getElementById(
        "saveCardCheck",
      ) as HTMLInputElement;

      // Create Saved Cards dropdown if exists
      const saved = getSavedCards();
      if (saved.length > 0) {
        const dropRow = document.createElement("div");
        dropRow.style.marginBottom = "15px";
        dropRow.innerHTML = `
          <label class="popup-label" style="display:block; margin-bottom: 5px;">Use saved card:</label>
          <select id="savedCardsSelect" class="popup-select" style="width: 100%;">
            <option value="" disabled selected>Select a saved card</option>
            ${saved.map((c) => `<option value="${c.number}">${c.maskedName}</option>`).join("")}
          </select>
        `;
        const step3Content = modal.querySelector(".step-3-content");
        step3Content?.insertBefore(dropRow, step3Content.children[1]);

        savedCardsSelect = document.getElementById(
          "savedCardsSelect",
        ) as HTMLSelectElement;
        savedCardsSelect.addEventListener("change", () => {
          const selected = saved.find(
            (c) => c.number === savedCardsSelect!.value,
          );
          if (selected) {
            cardInput.value = selected.number;
            monthSelect.value = selected.month;
            yearSelect.value = selected.year;
            cvvInput.value = ""; // User must re-enter CVV for security
            validateStep3();
          }
        });
      }
    }
  };
  initStep3AuthFeatures();

  // STATE VARIABLES
  let selectedAmount = 10;

  // -- STEP 1 VALIDATION --
  const validateStep1 = () => {
    let isValidAmount = false;

    // Check radios
    radioAmounts.forEach((r) => {
      if (r.checked) {
        isValidAmount = true;
        const val = parseInt(
          r.nextElementSibling?.textContent?.replace("$", "") || "0",
        );
        if (val) selectedAmount = val;
      }
    });

    // Check Other
    if (otherInput.value) {
      const val = otherInput.value;
      // scientific notation forbidden: e.g. 1e5
      if (/^[0-9]+(\.[0-9]+)?$/.test(val) && parseFloat(val) > 0) {
        isValidAmount = true;
        selectedAmount = parseFloat(val);
        radioAmounts.forEach((r) => (r.checked = false));
      } else {
        isValidAmount = false;
      }
    }

    const hasPet = petSelect.value !== "";
    const isValid = isValidAmount && hasPet;

    step1Next.style.pointerEvents = isValid ? "auto" : "none";
    step1Next.style.opacity = isValid ? "1" : "0.5";
  };

  radioAmounts.forEach((r) =>
    r.addEventListener("change", () => {
      otherInput.value = "";
      validateStep1();
    }),
  );

  otherInput.addEventListener("input", validateStep1);
  petSelect.addEventListener("change", validateStep1);
  validateStep1(); // Init state

  // -- STEP 2 VALIDATION --
  const validateStep2 = () => {
    const nameVal = nameInput.value.trim();
    const emailVal = emailInput.value.trim();

    const isNameValid = /^[a-zA-Z\s]+$/.test(nameVal);
    const isEmailValid = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(emailVal);

    const isValid = isNameValid && isEmailValid;
    step2Next.style.pointerEvents = isValid ? "auto" : "none";
    step2Next.style.opacity = isValid ? "1" : "0.5";

    // Apply visual feedback
    nameInput.style.borderColor = nameVal && !isNameValid ? "red" : "";
    emailInput.style.borderColor = emailVal && !isEmailValid ? "red" : "";
  };

  nameInput.addEventListener("input", validateStep2);
  emailInput.addEventListener("input", validateStep2);

  // Blur/Focus validation effects for Step 2
  nameInput.addEventListener("blur", () => {
    const val = nameInput.value.trim();
    if (val && !/^[a-zA-Z\s]+$/.test(val)) {
      nameInput.style.borderColor = "red";
    }
    validateStep2();
  });
  nameInput.addEventListener("focus", () => {
    nameInput.style.borderColor = "";
  });
  emailInput.addEventListener("blur", () => {
    const val = emailInput.value.trim();
    if (val && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(val)) {
      emailInput.style.borderColor = "red";
    }
    validateStep2();
  });
  emailInput.addEventListener("focus", () => {
    emailInput.style.borderColor = "";
  });

  validateStep2();

  // Prefill step 2 if logged in
  toggle.addEventListener("change", async () => {
    if (toggle.checked) {
      const user = await AuthService.getCurrentUser();
      if (user) {
        nameInput.value = user.name || "";
        emailInput.value = user.email || "";
        validateStep2();
      }
    } else {
      // Re-trigger standard init for freshness? Not necessary.
    }
  });

  // -- STEP 3 VALIDATION --
  const validateStep3 = () => {
    const cardVal = cardInput.value.trim().replace(/\s/g, "");
    const cvvVal = cvvInput.value.trim();
    const month = monthSelect.value;
    const year = yearSelect.value;

    const isCardValid = /^\d{16}$/.test(cardVal);
    const isCvvValid = /^\d{3}$/.test(cvvVal);

    let isDateValid = false;
    if (month && year) {
      const today = new Date();
      const expDate = new Date(parseInt(year), parseInt(month) - 1, 1);
      isDateValid =
        expDate >= new Date(today.getFullYear(), today.getMonth(), 1);
    }

    const isValid = isCardValid && isCvvValid && isDateValid;
    step3Next.style.pointerEvents = isValid ? "auto" : "none";
    step3Next.style.opacity = isValid ? "1" : "0.5";

    cardInput.style.borderColor = cardVal && !isCardValid ? "red" : "";
    cvvInput.style.borderColor = cvvVal && !isCvvValid ? "red" : "";
  };

  cardInput.addEventListener("input", validateStep3);
  cvvInput.addEventListener("input", validateStep3);
  monthSelect.addEventListener("change", validateStep3);
  yearSelect.addEventListener("change", validateStep3);

  // Blur/Focus validation effects for Step 3
  cardInput.addEventListener("blur", () => {
    const val = cardInput.value.trim().replace(/\s/g, "");
    if (val && !/^\d{16}$/.test(val)) {
      cardInput.style.borderColor = "red";
    }
    validateStep3();
  });
  cardInput.addEventListener("focus", () => {
    cardInput.style.borderColor = "";
  });
  cvvInput.addEventListener("blur", () => {
    const val = cvvInput.value.trim();
    if (val && !/^\d{3}$/.test(val)) {
      cvvInput.style.borderColor = "red";
    }
    validateStep3();
  });
  cvvInput.addEventListener("focus", () => {
    cvvInput.style.borderColor = "";
  });

  validateStep3();

  // SUBMIT HANDLER
  // We use standard click event on the final Next label
  step3Next.addEventListener("click", async (e) => {
    e.preventDefault(); // Stop it from toggling checkbox just yet if we want async logic

    if (step3Next.style.pointerEvents === "none") return;

    const petId = PET_NAME_TO_ID[petSelect.value] || 1;

    // Check if user checked "Save Card"
    if (saveCardCheckbox && saveCardCheckbox.checked) {
      const cardStr = cardInput.value.trim().replace(/\s/g, "");
      const masked = `${cardStr.substring(0, 4)} **** **** ${cardStr.substring(12)}`;
      saveCard({
        number: cardStr,
        maskedName: masked,
        month: monthSelect.value,
        year: yearSelect.value,
      });
    }

    // Attempt Submit
    step3Next.innerHTML = "PROCESSING...";
    try {
      await ApiClient.submitDonation({
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        amount: selectedAmount,
        petId: petId,
      });
      // Close modal
      toggle.checked = false;
      showNotification(
        `Thank you for your donation of $${selectedAmount} to ${petSelect.value}!`,
        false,
      );
    } catch (err: unknown) {
      if (err instanceof ApiError) {
        if (err.status === 400) {
          showNotification("Validation error: Invalid donation data.", true);
        } else if (err.status === 500) {
          showNotification("Server error. Please, try again later.", true);
        } else {
          showNotification(`Error: ${err.message}`, true);
        }
      } else {
        showNotification(
          "Something went wrong. Please, try again later.",
          true,
        );
      }
    } finally {
      step3Next.innerHTML =
        'COMPLETE DONATION <img src="/assets/icons/right-arrow-white.svg" class="btn-icon">';
    }
  });
}

function showNotification(message: string, isError: boolean) {
  const wrapper = document.createElement("div");
  wrapper.style.position = "fixed";
  wrapper.style.top = "20px";
  wrapper.style.right = "20px";
  wrapper.style.padding = "15px 25px";
  wrapper.style.backgroundColor = isError ? "#D31414" : "#4BB34B";
  wrapper.style.color = "#fff";
  wrapper.style.borderRadius = "4px";
  wrapper.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
  wrapper.style.zIndex = "9999";
  wrapper.style.fontWeight = "500";
  wrapper.style.opacity = "0";
  wrapper.style.transition = "opacity 0.3s";

  wrapper.textContent = message;
  document.body.appendChild(wrapper);

  // Animate in
  setTimeout(() => (wrapper.style.opacity = "1"), 10);

  // Remove after 5s
  setTimeout(() => {
    wrapper.style.opacity = "0";
    setTimeout(() => wrapper.remove(), 300);
  }, 5000);
}
