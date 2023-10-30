import { ProductInformation } from 'app/pages/InventoryManagement/Products/CreateProduct/slice/types';
import { AccountStatus } from 'types';
import { HousePriceForm } from './CustomerManagement';

export interface FilterDevelopAccountParams {
  searchKey: string;
  size: number;
  page: number;
  orders: string[];
  status: AccountStatus;
  searchKeyTypes?: string[];
  parentUserUuid?: string;
}

export interface DeveloperAccountList_filePhoto {
  originalName: string;
  url: string;
  s3Key: string;
}

export interface DeveloperAccountList_company {
  name: string;
  email: string;
  address: string;
  phone: string;
  sppkpNumber: string;
  npwpNumber: string;
}

export interface DeveloperAccountList_companyFiles_fileKtpDirector {
  originalName: string;
  url: string;
  s3Key: string;
}

export interface DeveloperAccountList_companyFiles {
  fileKtpDirector: DeveloperAccountList_companyFiles_fileKtpDirector[];
  fileNpwp: DeveloperAccountList_companyFiles_fileKtpDirector[];
  fileTdp: DeveloperAccountList_companyFiles_fileKtpDirector[];
  fileSiup: DeveloperAccountList_companyFiles_fileKtpDirector[];
  fileSppkp: DeveloperAccountList_companyFiles_fileKtpDirector[];
}

export interface DeveloperAccountList {
  kyc: KYC;
  kyb: KYB;
  verificationStatus: ApplicationStatus;
  verifyDate: number;
  email: string;
  fullName: string;
  phone: string;
  dob: any;
  nik: string;
  userUuid?: string;
  status: AccountStatus;
  createdDate: any;
  filePhoto: DeveloperAccountList_filePhoto;
  fileKtp: DeveloperAccountList_filePhoto[];
  company: DeveloperAccountList_company;
  companyFiles: DeveloperAccountList_companyFiles;
  companyName?: string;
  companyAddress?: string;
  companyEmail?: string;
  npwpNumber?: string;
  companyPhoneNumber?: string;
  sppkpNumber?: string;
  fileKtpDirector?: string;
  fileNpwp?: string;
  fileTdp?: string;
  fileSiup?: string;
  fileSppkp?: string;
  documentQualification?: DocumentQualification;
  roleName?: string;
  projectName?: string;
  projectId?: number;
}
export interface ChangeStatus {
  userUuid?: string;
  status?: string;
  verificationStatus?: string;
}

export interface KYB {
  status: ApplicationStatus;
}

export interface KYC {
  email: string;
  fullName: string;
  phone: string;
  dob: string;
  nik: string;
  filePhoto: DeveloperAccountList_filePhoto;
  fileKtp: DeveloperAccountList_filePhoto[];
  fileSignature: DeveloperAccountList_filePhoto[];
}

export interface DocumentQualification {
  fileKtpDirector: DeveloperAccountList_companyFiles_fileKtpDirector[];
  fileNpwp: DeveloperAccountList_companyFiles_fileKtpDirector[];
  fileTdp: DeveloperAccountList_companyFiles_fileKtpDirector[];
  fileSiup: DeveloperAccountList_companyFiles_fileKtpDirector[];
  fileSppkp: DeveloperAccountList_companyFiles_fileKtpDirector[];
}

export interface DeveloperAccountForm {
  email: string;
  kyc: KYC;
  company: DeveloperAccountList_company;
  documentQualification: DocumentQualification;
  fileSignature: DeveloperAccountList_filePhoto;
}

export enum ApplicationStatus {
  SUBMITTED = 'SUBMITTED',
  VERIFIED = 'VERIFIED',
}

export interface KPRSummaryUpdate {
  property: ProductInformation;
  pricing: HousePriceForm;
}
