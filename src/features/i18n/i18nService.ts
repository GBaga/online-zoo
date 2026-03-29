/**
 * I18nService — Client-side translation manager
 *
 * - Loads translations from JSON files in /locales
 * - Persists language choice in localStorage
 * - Updates DOM elements with data-i18n attributes
 * - Injects a language switcher into the header
 */

export class I18nService {
  private static STORAGE_KEY = "zoo_lang";
  private static translations: Record<string, string> = {};
  private static currentLocale = "en";

  /**
   * Initialize: load preferred language, load translations, apply to DOM, inject switcher
   */
  static async init(): Promise<void> {
    this.currentLocale = localStorage.getItem(this.STORAGE_KEY) || "en";
    await this.loadTranslations(this.currentLocale);
    this.applyToDOM();
    this.injectSwitcher();

    // Re-apply translations if dynamic content is added
    window.addEventListener("i18nUpdate", () => {
      this.applyToDOM();
    });
  }

  /**
   * Switch to a new language
   */
  static async switchTo(locale: string): Promise<void> {
    if (locale === this.currentLocale) return;

    this.currentLocale = locale;
    localStorage.setItem(this.STORAGE_KEY, locale);
    await this.loadTranslations(locale);
    this.applyToDOM();
    this.updateSwitcherUI();
  }

  /**
   * Main translation function
   */
  static t(key: string): string {
    return this.translations[key] || key;
  }

  /**
   * Private: Load JSON translation file
   */
  private static async loadTranslations(locale: string): Promise<void> {
    try {
      // Handle the path carefully for multi-page structure
      // Locales are in /public/locales/ which are served relative to root
      const response = await fetch(`/locales/${locale}.json`);
      if (!response.ok) throw new Error(`Could not load locales for ${locale}`);
      this.translations = await response.json();
    } catch (error) {
      console.error("I18n Load Error:", error);
      // Fallback to empty if fails
      this.translations = {};
    }
  }

  /**
   * Private: Scan DOM for data-i18n attributes and apply translations
   */
  private static applyToDOM(): void {
    // Standard text content
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n")!;
      const translated = this.t(key);
      if (translated !== key) {
        el.textContent = translated;
      }
    });

    // Placeholders
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder")!;
      (el as HTMLInputElement).placeholder = this.t(key);
    });

    // Update HTML lang attribute
    document.documentElement.lang = this.currentLocale;
  }

  /**
   * Private: Inject language switcher into header
   */
  private static injectSwitcher(): void {
    const parent =
      document.querySelector(".header-content") ||
      (document.querySelector(".header .container") as HTMLElement);
    if (!parent) return;

    // Check if it already exists
    if (document.getElementById("lang-switcher")) return;

    const switcher = document.createElement("div");
    switcher.id = "lang-switcher";
    switcher.className = "lang-switcher";

    switcher.innerHTML = `
      <button class="lang-btn ${this.currentLocale === "en" ? "active" : ""}" data-lang="en" aria-label="English">
        EN
      </button>
      <button class="lang-btn ${this.currentLocale === "fr" ? "active" : ""}" data-lang="fr" aria-label="Français">
        FR
      </button>
    `;

    switcher.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      const btn = target.closest(".lang-btn") as HTMLElement;
      if (btn) {
        const lang = btn.dataset.lang;
        if (lang) this.switchTo(lang);
      }
    });

    // In desktop, place it before social links or after logo
    const socialLinks = parent.querySelector(".social-links");
    if (socialLinks) {
      socialLinks.insertAdjacentElement("beforebegin", switcher);
    } else {
      parent.appendChild(switcher);
    }
  }

  /**
   * Private: Update active state of switcher buttons
   */
  private static updateSwitcherUI(): void {
    document.querySelectorAll("#lang-switcher .lang-btn").forEach((btn) => {
      const b = btn as HTMLElement;
      if (b.dataset.lang === this.currentLocale) {
        b.classList.add("active");
      } else {
        b.classList.remove("active");
      }
    });
  }
}
