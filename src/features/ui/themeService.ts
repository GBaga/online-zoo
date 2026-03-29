/**
 * ThemeService — Dark/Light mode manager
 *
 * - Persists user preference in localStorage
 * - Falls back to OS prefers-color-scheme
 * - Sets `data-theme` attribute on <html> for CSS variable switching
 * - Injects a toggle button into the header
 */

type Theme = "light" | "dark";

const STORAGE_KEY = "zoo_theme";

const SUN_SVG = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;

const MOON_SVG = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;

export class ThemeService {
  /**
   * Determine preferred theme: stored > OS preference > light
   */
  static getPreferred(): Theme {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (stored === "light" || stored === "dark") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  /**
   * Apply theme to DOM and persist
   */
  static apply(theme: Theme): void {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEY, theme);
    this.updateToggleIcon(theme);
  }

  /**
   * Toggle between light and dark
   */
  static toggle(): Theme {
    const current =
      (document.documentElement.getAttribute("data-theme") as Theme) || "light";
    const next: Theme = current === "light" ? "dark" : "light";
    this.apply(next);
    return next;
  }

  /**
   * Update the toggle button icon to reflect current state
   */
  private static updateToggleIcon(theme: Theme): void {
    const btn = document.getElementById("theme-toggle");
    if (!btn) return;
    // Show sun in dark mode (click to go light), moon in light mode (click to go dark)
    btn.innerHTML = theme === "dark" ? SUN_SVG : MOON_SVG;
    btn.setAttribute(
      "aria-label",
      theme === "dark" ? "Switch to light mode" : "Switch to dark mode",
    );
  }

  /**
   * Initialize: apply theme immediately, inject toggle, listen for OS changes
   */
  static init(): void {
    // Apply before paint to prevent FOUC
    const theme = this.getPreferred();
    this.apply(theme);

    // Inject toggle button into header
    this.injectToggle();

    // Listen for OS theme changes (only if user hasn't explicitly chosen)
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        if (!localStorage.getItem(STORAGE_KEY)) {
          this.apply(e.matches ? "dark" : "light");
        }
      });
  }

  /**
   * Inject the theme toggle button into the header
   */
  private static injectToggle(): void {
    const socialLinks = document.querySelector(".social-links");
    if (!socialLinks) return;

    const btn = document.createElement("button");
    btn.id = "theme-toggle";
    btn.className = "theme-toggle-btn";
    btn.type = "button";

    const currentTheme = this.getPreferred();
    btn.innerHTML = currentTheme === "dark" ? SUN_SVG : MOON_SVG;
    btn.setAttribute(
      "aria-label",
      currentTheme === "dark" ? "Switch to light mode" : "Switch to dark mode",
    );

    btn.addEventListener("click", () => {
      this.toggle();
    });

    // Insert after social links
    socialLinks.insertAdjacentElement("afterend", btn);
  }
}
