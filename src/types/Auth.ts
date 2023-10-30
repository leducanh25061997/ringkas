import { ParamsUrl, AccountStatus } from 'types';
export interface AuthParams {
  username?: string;
  password?: string;
  otp?: string;
  refresh_token?: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  scope: string;
  token_type: string;
  session_state: string;
}

export interface UserInformation {
  createdDate: number;
  dob: string;
  email: string;
  fileKtp: {
    originalName: string;
    s3Key: string;
    url: string;
  }[];
  filePhoto: {
    originalName: string;
    s3Key: string;
    url: string;
  }[];
  fullName: string;
  nik: string;
  permissions: string[];
  phone: string;
  roles: string[];
  status: AccountStatus;
  userUuid: string;
  verificationStatus: string;
}

export interface RegistrationRequest {
  fullName?: string;
  email?: string;
  phone?: string;
  company?: Company;
  kyc?: KYC;
  password?: string;
  files?: any[];
  dob?: string;
  fileKtp?: DeveloperAccountList_companyFiles_fileKtpDirector;
  photoKtp?: DeveloperAccountList_companyFiles_fileKtpDirector;
  nik?: string;
  companyName?: string;
  companyAddress?: string;
  companyEmail?: string;
  companyPhoneNumber?: string;
  companySppkpNumber?: string;
  companyNpwppNumber?: string;
  fileKtpDirector?: DeveloperAccountList_companyFiles_fileKtpDirector;
  fileNpwp?: DeveloperAccountList_companyFiles_fileKtpDirector;
  fileTdp?: DeveloperAccountList_companyFiles_fileKtpDirector;
  fileSiup?: DeveloperAccountList_companyFiles_fileKtpDirector;
  fileSppkp?: DeveloperAccountList_companyFiles_fileKtpDirector;
  fileSignature?: DeveloperAccountList_companyFiles_fileKtpDirector;
  fileDeedOfCompany?: DeveloperAccountList_companyFiles_fileKtpDirector;
  fileNIP?: DeveloperAccountList_companyFiles_fileKtpDirector;
  fileSK?: DeveloperAccountList_companyFiles_fileKtpDirector;
  document?: any[];
}

export interface Company {
  name: string;
  email: string;
  address: string;
  phone: string;
  sppkpNumber: string;
  npwpNumber: string;
}
export interface RegistrationForm extends RegistrationRequest {
  filePhoto: ParamsUrl;
  documentQualification: DeveloperAccountList_companyFiles;
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

export interface KYC {
  email: string;
  fullName: string;
  phone: string;
  dob: string;
  nik: string;
  filePhoto: DeveloperAccountList_filePhoto;
  fileKtp: DeveloperAccountList_filePhoto[];
  fileSignature: DeveloperAccountList_filePhoto[];
  birthPlace: any;
}

export interface DeveloperAccountList_filePhoto {
  originalName: string;
  url: string;
  s3Key: string;
}

export interface UpdatePasswordForm {
  password: string;
}
