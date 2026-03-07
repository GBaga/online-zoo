import {
  Pet,
  FeedbackItem,
  Camera,
  LoginPayload,
  RegisterPayload,
  DonationPayload,
  UserProfile,
  AuthResponse,
} from "./models";

const API_BASE_URL =
  "https://vsqsnqnxkh.execute-api.eu-central-1.amazonaws.com/prod";

export class ApiClient {
  private static async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    const headers = new Headers(options.headers || {});
    headers.set("Content-Type", "application/json");

    // Add auth token if we had one in localStorage
    const token = localStorage.getItem("zoo_auth_token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    const config: RequestInit = {
      ...options,
      headers,
    };

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const text = await response.text();
      if (!text) return {} as T;

      const parsed = JSON.parse(text);
      // Some endpoints wrap the response in a "data" object
      if (parsed && typeof parsed === "object" && "data" in parsed) {
        return parsed.data as T;
      }

      return parsed as T;
    } catch (error) {
      console.error(`Request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  static getPets(): Promise<Pet[]> {
    return this.request<Pet[]>("/pets");
  }

  static getPet(id: number): Promise<Pet> {
    return this.request<Pet>(`/pets/${id}`);
  }

  static getFeedback(): Promise<FeedbackItem[]> {
    return this.request<FeedbackItem[]>("/feedback");
  }

  static getCameras(): Promise<Camera[]> {
    return this.request<Camera[]>("/cameras");
  }

  static register(data: RegisterPayload): Promise<void> {
    return this.request<void>("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  static login(data: LoginPayload): Promise<AuthResponse> {
    return this.request<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  static getProfile(): Promise<UserProfile> {
    return this.request<UserProfile>("/auth/profile");
  }

  static submitDonation(data: DonationPayload): Promise<void> {
    return this.request<void>("/donations", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }
}
