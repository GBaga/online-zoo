export interface LoginPayload {
  login: string;
  password: string;
}

export interface RegisterPayload extends LoginPayload {
  name: string;
  email: string;
}

export interface AuthResponse {
  token?: string;
}

export interface UserProfile {
  name: string;
  email: string;
}

export enum ValidationState {
  PRISTINE = "pristine",
  VALID = "valid",
  INVALID = "invalid",
}

export type LoginCredentials = Omit<RegisterPayload, "name" | "email">;

export interface LocalUser {
  id: number | string;
  username: string;
  password?: string;
  role?: string;
  name?: string;
  email?: string;
}
