import { AccountStatus, ApplicationStatus } from 'types';
export interface DeveloperAccountEditState {
  developerAccountInfo?: DeveloperAccountInfor;
  isLoading?: boolean;
}

export interface DeveloperAccountInfor {
  kyc: KYC;
  email: string;
  userUuid?: string;
  status: AccountStatus;
  createdDate: any;
  company: DeveloperAccountList_company;
  fileKtpDirector?: string;
  fileSignature?: string;
  fileNpwp?: string;
  fileTdp?: string;
  fileSiup?: string;
  fileSppkp?: string;
  fileKtp?: string;
  documentQualification?: DocumentQualification;
  verificationStatus?: ApplicationStatus;
  verifyDate?: number;
}
export interface DeveloperAccountList_company {
  name: string;
  email: string;
  address: string;
  phone: string;
  sppkpNumber: string;
  npwpNumber: string;
}

export interface KYC {
  email: string;
  fullName: string;
  phone: string;
  dob: string;
  nik: string;
  filePhoto: DeveloperAccountListFile;
  fileKtp: DeveloperAccountListFile[];
  fileSignature: DeveloperAccountListFile[];
}

export interface DeveloperAccountListFile {
  originalName?: string;
  url: string;
  s3Key: string;
}

export interface DocumentQualification {
  fileKtpDirector: DeveloperAccountListFile[];
  fileNpwp: DeveloperAccountListFile[];
  fileTdp: DeveloperAccountListFile[];
  fileSiup: DeveloperAccountListFile[];
  fileSppkp: DeveloperAccountListFile[];
}
