export interface DonationPayload {
  name: string;
  email: string;
  amount: number;
  petId: number;
}

export enum DonationStep {
  DONATION_INFO = 1,
  BILLING_INFO = 2,
  PAYMENT_INFO = 3,
}

export type PartialDonation = Partial<DonationPayload>;
