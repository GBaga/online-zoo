import { ApiClient } from "../../api/apiClient";
import {
  UserProfile,
  LoginPayload,
  RegisterPayload,
  LocalUser,
} from "../../api/types";

export class AuthService {
  private static readonly TOKEN_KEY = "zoo_auth_token";
  private static cachedProfile: UserProfile | null = null;
  private static profileFetched = false;

  static getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  static setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    this.profileFetched = false;
  }

  static isLoggedIn(): boolean {
    return !!this.getToken() || !!localStorage.getItem("current_user");
  }

  static async getCurrentUser(): Promise<UserProfile | null> {
    if (!this.isLoggedIn()) return null;
    if (this.profileFetched && this.cachedProfile) return this.cachedProfile;

    // First try via remote API if we have a token
    if (this.getToken()) {
      try {
        const profile = await ApiClient.getProfile();
        this.cachedProfile = profile;
        this.profileFetched = true;
        return profile;
      } catch (e) {
        console.warn(
          "Failed to fetch remote profile, trying local fallback",
          e,
        );
      }
    }

    // Fallback: Check for existing 'current_user' in localStorage (for local/testing environments)
    const localUser = localStorage.getItem("current_user");
    if (localUser) {
      try {
        const parsed = JSON.parse(localUser) as LocalUser;
        const profile: UserProfile = {
          name: parsed.username || parsed.name || "User",
          email: parsed.email || `${parsed.username}@onlinezoo.org`,
        };
        this.cachedProfile = profile;
        this.profileFetched = true;
        return profile;
      } catch (e) {
        console.error("Malformed local user data", e);
        return null;
      }
    }

    return null;
  }

  static async login(data: LoginPayload): Promise<void> {
    // Attempt real login
    try {
      const res = await ApiClient.login(data);
      if (res.token) {
        this.setToken(res.token);
      }
    } catch (e) {
      // Local fallback for testing (like the 'admin/password' case provided)
      const localUsersStr = localStorage.getItem("app_users");
      if (localUsersStr) {
        const users: LocalUser[] = JSON.parse(localUsersStr);
        const matched = users.find(
          (u: LocalUser) =>
            u.username === data.login && u.password === data.password,
        );
        if (matched) {
          localStorage.setItem("current_user", JSON.stringify(matched));
          this.profileFetched = false;
          return;
        }
      }
      throw e;
    }
  }

  static async register(data: RegisterPayload): Promise<void> {
    await ApiClient.register(data);
  }

  static logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem("current_user");
    this.cachedProfile = null;
    this.profileFetched = false;
  }
}
