import { ProjectInformation, ProjectManagement } from 'types/ProjectManagement';
import { Product } from 'types/ProductManagements';
import { AccountStatus, FileUpload } from 'types';

export interface ProductState {
  projects?: ProjectManagement[];
  productDetail?: ProductInformation;
  isLoading?: boolean;
}

export interface Images {
  uploadPhoto: ImageFiles[];
  uploadVideo: ImageFiles;
}

export interface EditProductFormRequest {
  productId?: string;
  formData?: Product;
}

export interface ImageFiles {
  file: string | null;
  url: string | '';
  name: string;
  nameFile: string;
  s3Key?: string;
}
export interface Images {
  uploadPhoto: ImageFiles[];
  uploadVideo: ImageFiles;
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
  housePrice?: number;
  discount?: number;
  downPayment?: number;
}

export interface Commission {
  maxAgentCommissionRate?: number;
  maxBankInterestRate?: number;
  buybackGuaranteePolicy?: number;
}

export interface Promotions {
  promotionName?: string;
  startDate?: any;
  endDate?: any;
}

export interface EditProductFormRequest {
  productId?: string;
  formData?: Product;
}

export interface ChangeStatus {
  productId?: string;
  status: string;
}

export interface ProductInformationResponse {
  projectId?: number;
  projectName?: string | '';
  type: string;
  unit: string;
  lot: string;
  images: FileUpload[];
  videos?: FileUpload[];
  landArea: number;
  buildingArea: number;
  facility?: Facility;
  pricing?: Pricing;
  promotions?: Promotions[];
  commission?: Commission;
  propertyId: string;
  status?: AccountStatus;
  createdDate?: number;
  id?: number;
  purchaseStatus?: string;
  cluster?: string;
  propertyCustomerStatus?: string;
  project?: ProjectInformation;
}

export interface ProductInformation {
  projectId?: number;
  projectName?: string | '';
  type?: string;
  unit?: string;
  lot?: string;
  images?: string[] | undefined;
  videos?: string[] | undefined;
  landArea?: number;
  buildingArea?: number;
  facility?: Facility;
  pricing?: Pricing;
  promotions?: Promotions[];
  commission?: Commission;
  propertyId?: string;
  status?: AccountStatus;
  createdDate?: number;
  id?: number | string;
  purchaseStatus?: string;
  cluster?: string;
  propertyCustomerStatus?: string;
  clusterData?: clusterDataType;
  projectData?: ProjectDataType;
  typeData?: clusterDataType;
}

interface clusterDataType {
  label: string;
  value: string;
}
interface ProjectDataType {
  label: string;
  value: number;
}
export interface PropertyDetailForm {
  discount: number;
  bookingFee: number;
  downPayment: number;
  housePrice: number;
  id?: number;
  applicationId: number;
  interestRate?: number;
  property: ProductInformationResponse;
  project: ProjectInformation;
}

export interface PropertyForm {
  id?: number | string;
  propertyId?: number;
}
