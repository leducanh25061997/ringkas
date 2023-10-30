import { AccountStatus } from 'types';

export interface BankAccountList_kyc {
  fullName?: string;
  phone?: string;
  dob?: string;
  nik?: string;
  filePhoto?: FilePhoto;
  fileNik?: FilePhoto;
  fileSignature?: FilePhoto;
}

export interface BankAccountList_kyb {
  status?: string;
}

export interface BankAccountList_company {
  email?: string;
  bankHqUuid?: string;
  name?: string;
}

export interface BankAccountList_company {
  email?: string;
  bankHqUuid?: string;
  name?: string;
  address?: string;
  branchName?: string;
  titleBranch?: string;
  nip?: string;
  province?: string;
  city?: string;
  phone?: string;
  sppkpNumber?: string;
  npwpNumber?: string;
  parentAccountUserUuid?: string;
}

export interface BankAccountList_documentQualification {
  fileKtpDirector?: FilePhoto[];
  fileNpwp?: FilePhoto[];
  fileTdp?: FilePhoto[];
  fileSiup?: FilePhoto[];
  fileSppkp?: FilePhoto[];
  fileNda?: FilePhoto[];
  ndaExpiredDate?: number | string;
  fileMou?: FilePhoto[];
  mouExpiredDate?: number | string;
}

export interface BankAccountForm {
  userUuid?: string;
  email?: string;
  status?: AccountStatus;
  kyc: BankAccountList_kyc;
  company: BankAccountList_company;
  documentQualification: BankAccountList_documentQualification;
  bankAccountType?: BankAccountType;
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

export interface BankAccountInfo {
  userUuid?: string;
  email?: string;
  status?: AccountStatus;
  password?: string;
  createdDate?: number;
  verifyDate?: number;
  kyc: BankAccountList_kyc;
  kyb?: BankAccountList_kyb;
  company: BankAccountList_company;
  documentQualification: BankAccountList_documentQualification;
  bankAccountType?: BankAccountType;
  verificationStatus?: string;
}

export interface BankAccountListItem {
  bankName?: string;
  userUuid?: string;
  fileLogo?: {
    originalName?: string;
    url?: string;
    s3Key?: string;
  };
}
export enum BankAccountType {
  HEAD_QUARTER = 'HEAD_QUARTER',
  BRANCH = 'BRANCH ',
}

export enum BankAccountText {
  HEAD_QUARTER = 'Head Quarter',
  BRANCH = 'BRANCH ',
}

export enum BankAccountLowerCase {
  HEAD_QUARTER = 'Headquarter',
  BRANCH = 'Branch',
}

export interface BankAccountList_company {
  name?: string;
  email?: string;
  address?: string;
  phone?: string;
  sppkpNumber?: string;
  npwpNumber?: string;
}

export interface FilePhoto {
  originalName?: string;
  url?: string;
  s3Key?: string;
  name?: string;
  files?: any;
  key?: string;
}

export interface BankAccountList_companyFiles {
  fileKtpDirector: FilePhoto[];
  fileNpwp: FilePhoto[];
  fileTdp: FilePhoto[];
  fileSiup: FilePhoto[];
  fileSppkp: FilePhoto[];
}

export interface BankAccountData {
  userUuid?: string;
  bankName?: string;
  fileLogo?: FilePhoto[];
}

export interface BankAccountList {
  name?: string;
  logo?: string;
  uuid?: string;
}
