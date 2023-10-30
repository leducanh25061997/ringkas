import { AccountStatus, FileUpload } from 'types';
import { SearchKeyType, VerificationStatus } from './enums';

export interface PartnerAccountForm {
  userUuid?: string;
  email?: string;
  password: string;
  status?: AccountStatus;
  kyc: PartnerAccountForm_kyc;
  company: PartnerAccountForm_company;
  documentQualification: PartnerAccountForm_documentQualification;
  fileKtpDirector?: FilePhoto[];
  fileNpwp?: FilePhoto[];
  fileTdp?: FilePhoto[];
  fileSiup?: FilePhoto[];
  fileSppkp?: FilePhoto[];
  fileNda?: FilePhoto[];
  filePhoto?: FilePhoto;
  fileNik?: FilePhoto | string;
  fileSignature?: FilePhoto;
  fileMou?: FilePhoto[];
}

export interface PartnerAccountForm_company {
  name: string;
  email: string;
  address: string;
  phone: string;
  sppkpNumber: string;
  npwpNumber: string;
  fileLogo: FileUpload[];
}

export interface PartnerAccountForm_documentQualification {
  fileDeedOfCompany?: FilePhoto[];
  fileNpwp?: FilePhoto[];
  fileNIP?: FilePhoto[];
  fileSK?: FilePhoto[];
  fileSppkp?: FilePhoto[];
  fileNda?: FilePhoto[];
  ndaExpiredDate?: number | string;
  fileMou?: FilePhoto[];
  mouExpiredDate?: number | string;
}

export interface PartnerAccountForm_kyc {
  fullName?: string;
  phone?: string;
  dob?: string;
  nik?: string;
  filePhoto?: FilePhoto;
  fileKtp?: FilePhoto;
  fileSignature?: FilePhoto;
}

export interface FilePhoto {
  originalName?: string;
  url?: string;
  s3Key?: string;
  name?: string;
  files?: any;
  key?: string;
}

export interface FilterPartnerParams {
  searchKey?: string;
  searchKeyType?: SearchKeyType[];
  size?: number;
  page?: number;
  orders?: string[];
  status?: AccountStatus[];
  verificationStatus?: VerificationStatus[];
}

export interface PartnerDetails {
  userUuid: string;
  email: string;
  groupPath: string;
  status: string;
  createdDate: number;
  verificationStatus: VerificationStatus;
  kyc: {
    fullName: string;
    gender: string;
    dob: string;
    birthPlace: string;
    location: {
      country: string;
      province: string;
      city: string;
      district: string;
      subDistrict: string;
      postalCode: string;
    };
    nik: string;
    email: 'user@example.com';
    phone: string;
    npwp: string;
    filePhoto: FileUpload[];
  };
  company: {
    name: string;
    email: string;
    address: string;
    phone: string;
    sppkpNumber: string;
    npwpNumber: string;
    fileLogo: FileUpload[];
  };
  document: {
    fileKtpDirector: FileUpload[];
    fileDeedOfCompany: FileUpload[];
    fileCompanyNpwp: FileUpload[];
    fileNib: FileUpload[];
    fileCompanyDecree: FileUpload[];
    fileSupportingDocument: FileUpload[];
  };
}
