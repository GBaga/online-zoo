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

export type ReadonlyPet = Readonly<Pet>;
export type PetSummary = Pick<Pet, "id" | "name" | "description">;
