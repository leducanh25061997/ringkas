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
  email: string;
  userUuid: string;
  status: string;
  verificationStatus: string;
  createdDate: number;
  kyc: Partner_kyc;
  company: Partner_company;
  document: { fileKtpDirector: { url: string }[] };
  kyb: Partner_kyb;
  verifyDate: number;
  groupPath: string;
}

export interface PartnerDataVerifyState {
  partnerInformation?: PartnerInformation;
  isLoading?: boolean;
  kycVerificationData: VerificationResponse;
}

export interface VerificationData {
  verificationId: number;
  category: 'KYC' | 'KYB' | 'KYB_DOCUMENT';
  key: string;
  values: [string];
  valueType: ValueType;
  status: DataStatus;
  systemVerifiedStatus: SystemVerifiedStatus;
  lastAction: keyof typeof VerificationLastAction;
  actionNote?: string;
  textValueFormat?: string;
}

export interface VerificationResponse {
  total: number;
  data: VerificationsData;
}

export interface ProcessVerificationParams {
  userUuid: string;
  data: UpdateVerificationData;
}

export type VerificationsData = VerificationData[];

export type DropdownItem = {
  label: string;
  value: keyof typeof VerificationLastAction;
};

export type SystemVerifiedStatus = 'MATCHED' | 'NOT_MATCHED' | 'NOT_CHECKED';

export type DataStatus = 'SUBMITTED' | 'VERIFIED' | 'REQUEST_UPDATE';

export type ValueType = 'TEXT' | 'FILE';

export enum VerificationLastAction {
  'NO_ACTION_NEEDED' = 'No Action Needed',
  'EDITED_BY_ADMIN' = 'Edit by Admin',
  'REQUEST_REVISION' = 'Request Revision',
}

export interface UpdateVerificationParams {
  applicationId: number | string;
  data: UpdateVerificationData;
}

export interface UpdateVerificationData {
  category: 'KYC' | 'KYB';
  key: string;
  action: keyof typeof VerificationLastAction;
  actionNote?: string;
  values?: string[];
}

export interface RequestDataType {
  category: string;
  dataName: string;
  dataType: string;
  id: number;
}
