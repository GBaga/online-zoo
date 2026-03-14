import { ApiClient } from "../../api/apiClient";
import { UserProfile, LoginPayload, RegisterPayload } from "../../api/models";

export class AuthService {
  private static readonly TOKEN_KEY = "zoo_auth_token";
  private static cachedProfile: UserProfile | null = null;
  private static profileFetched = false;

  static getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  static setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    this.profileFetched = false; // Reset profile cache on new token
  }

  static clearToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.cachedProfile = null;
    this.profileFetched = true;
  }

  static isLoggedIn(): boolean {
    return !!this.getToken();
  }

  static async getCurrentUser(): Promise<UserProfile | null> {
    if (!this.isLoggedIn()) return null;
    if (this.profileFetched) return this.cachedProfile;

    try {
      // Because API profile returns { name, email }, ApiClient.getProfile uses the stored token implicitly
      // We must mock setting the token in `apiClient.ts` if not already supported. Wait, I wroteApiClient to read from localStorage.
      const profile = await ApiClient.getProfile();
      this.cachedProfile = profile;
      this.profileFetched = true;
      return profile;
    } catch (e) {
      console.warn("Failed to fetch profile", e);
      this.clearToken();
      return null;
    }
  }

  static async login(data: LoginPayload): Promise<void> {
    const res = await ApiClient.login(data);
    if (res.token) {
      this.setToken(res.token);
    }
  }

  static async register(data: RegisterPayload): Promise<void> {
    await ApiClient.register(data);
  }

  static logout(): void {
    this.clearToken();
  }
}
