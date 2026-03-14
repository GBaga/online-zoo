export interface Pet {
  id: number;
  name: string;
  commonName?: string;
  scientificName?: string;
  type?: string;
  size?: string;
  diet?: string;
  habitat?: string;
  range?: string;
  location?: string;
  breed?: string;
  image?: string;
  description?: string;
  detailedDescription?: string;
}

export interface FeedbackItem {
  id: number;
  name: string;
  location?: string;
  text: string;
  avatar?: string;
}

export interface Camera {
  id: number;
  petId: number;
  text: string;
  image?: string;
}

export type ReadonlyPet = Readonly<Pet>;
export type PetSummary = Pick<Pet, "id" | "name" | "description">;
