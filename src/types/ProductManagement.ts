export interface Product {
  id?: number;
  projectId?: number;
  type?: string;
  unit?: string;
  lot?: string;
  images?: string[];
  videos?: string[];
  landArea?: number;
  buildingArea?: number;
  facility?: Facility;
  pricing?: Pricing;
  promotions?: Promotions;
  commission?: Commission;
}

export interface Commission {
  maxAgentCommissionRate?: number;
  maxBankInterestRate?: number;
  buybackGuaranteePolicy?: number;
}
export interface Facility {
  numberOfFloor?: number;
  numberOfRoom?: number;
  numberOfBathroom?: number;
  others?: string[];
}

export interface Pricing {
  totalPrice?: number;
  bookingFee?: number;
  downPaymentPercentage?: number;
}

export interface Promotions {
  startDate?: number | null;
  endDate?: number | null;
  type?: string;
  source?: string;
}
