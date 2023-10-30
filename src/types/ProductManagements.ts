import { AccountStatus } from 'types';
import { Promotions } from '../app/pages/InventoryManagement/Products/CreateProduct/slice/types';

export interface Product {
  projectId: number;
  projectName?: string;
  type: string;
  unit: string;
  lot: string;
  images: string[];
  videos?: string[];
  landArea: number;
  buildingArea: number;
  facility?: Facility;
  pricing?: Pricing;
  promotions?: Promotions;
  commission?: Commission;
  propertyId: number;
  status?: AccountStatus;
  createdDate?: number;
  others?: string[];
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

export interface Commission {
  maxAgentCommissionRate?: number;
  maxBankInterestRate?: number;
  buybackGuaranteePolicy?: number;
}
