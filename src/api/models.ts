export interface Pet {
  id: number;
  name: string;
  location?: string;
  breed?: string;
  image?: string;
  description?: string;
  [key: string]: unknown;
}

export interface FeedbackItem {
  id: number;
  name: string;
  location?: string;
  text: string;
  avatar?: string;
  [key: string]: unknown;
}

export interface Camera {
  id: number;
  petId: number;
  text: string;
  image?: string;
  [key: string]: unknown;
}

export interface LoginPayload {
  login: string;
  password?: string;
}

export interface RegisterPayload extends LoginPayload {
  name: string;
  email: string;
}

export interface DonationPayload {
  name: string;
  email: string;
  amount: number;
  petId: number;
}

export interface AuthResponse {
  token?: string;
  [key: string]: unknown;
}

export interface UserProfile {
  name: string;
  email: string;
  [key: string]: unknown;
}
