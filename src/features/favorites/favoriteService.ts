/**
 * FavoriteService — Manages the user's favorite animals
 *
 * - Persists an array of favorite animal IDs in localStorage
 * - Provides boolean check and toggle functionality
 * - Dispatches custom events when favorites are updated
 */

export class FavoriteService {
  private static STORAGE_KEY = "zoo_favorites";
  private static favorites: string[] = [];

  /**
   * Initialize: load existing favorites from storage
   */
  static init(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      try {
        this.favorites = JSON.parse(stored);
      } catch (e) {
        console.error("Error loading favorites:", e);
        this.favorites = [];
      }
    }
  }

  /**
   * Check if an animal is favorited
   */
  static isFavorite(id: string): boolean {
    return this.favorites.includes(id);
  }

  /**
   * Toggle the favorite status of an animal
   */
  static toggleFavorite(id: string): boolean {
    const index = this.favorites.indexOf(id);
    let isAdded = false;

    if (index === -1) {
      this.favorites.push(id);
      isAdded = true;
    } else {
      this.favorites.splice(index, 1);
      isAdded = false;
    }

    this.save();
    this.notify();
    return isAdded;
  }

  /**
   * Get all favorite IDs
   */
  static getAll(): string[] {
    return [...this.favorites];
  }

  /**
   * Private: Save to localStorage
   */
  private static save(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.favorites));
  }

  /**
   * Private: Notify the app of updates via custom event
   */
  private static notify(): void {
    const event = new CustomEvent("favoritesUpdated", {
      detail: { favorites: this.favorites },
    });
    window.dispatchEvent(event);
  }
}
