// Partner info detail
import { FileUpload } from 'types';

export interface Partner_kyc {
  fullName?: string;
  dob?: string;
  nik?: string;
  email?: string;
  phone?: string;
  fileKtp?: FileUpload[];
  status?: string;
}

export interface Partner_company {
  name?: string;
  email?: string;
  address?: string;
  phone?: string;
  sppkpNumber?: string;
  npwpNumber?: string;
}

export interface Partner_documentQualification {
  fileDeedOfCompany?: FileUpload[];
  fileNpwp?: FileUpload[];
  fileNIP?: FileUpload[];
  fileSK?: FileUpload[];
  fileNda?: FileUpload[];
  ndaExpiredDate?: number;
  fileMou?: FileUpload[];
  mouExpiredDate?: number;
}

export interface Partner_kyb {
  status: string;
}

export interface PartnerInformation {
  email?: string;
  userUuid?: string;
  status?: string;
  verificationStatus?: string;
  createdDate?: number;
  kyc?: Partner_kyc;
  company?: Partner_company;
  documentQualification?: Partner_documentQualification;
  kyb?: Partner_kyb;
  verifyDate?: number;
}

export interface PartnerInformationDetailState {
  partnerInformation?: PartnerInformation;
  isLoading?: boolean;
}
