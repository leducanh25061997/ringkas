import {
  ApplicationState,
  ApplicationStatus,
  FileS3,
} from '../ListCustomer/types';

export interface VerificationData {
  verificationId: number;
  category: 'KYC' | 'KYB';
  key: InputKey;
  values: [string];
  valueType: ValueType;
  status: DataStatus;
  systemVerifiedStatus: SystemVerifiedStatus;
  lastAction: keyof typeof VerificationLastAction;
  actionNote?: string;
}

export interface VerificationResponse {
  total: number;
  data: VerificationsData;
}

export interface ApplicationDataSummary {
  applicationId: number;
  applicationState: string;
  applicationStatus: string;
  slaDate: number;
  ringkasRecommendation: string;
  kycVerificationId: number;
  slikVerificationId: number;
  bankAction: string;
  developerAction: string;
  account: {
    email: string;
    userUuid: string;
    status: string;
    fullName: string;
    photo: FileS3;
    createdDate: number;
  };
  leads: Record<string, any>;
}

export type VerificationsData = VerificationData[];

export type InputKey = keyof typeof FieldInput;

export type DropdownItem = {
  label: string;
  value: keyof typeof VerificationLastAction;
};

export type SystemVerifiedStatus = 'MATCHED' | 'NOT_MATCHED' | 'NOT_CHECKED';

export type DataStatus = 'SUBMITTED' | 'VERIFIED' | 'REQUEST_UPDATE';

export type ValueType = 'TEXT' | 'FILE';

export enum VerificationLastAction {
  'NO_ACTION_NEEDED' = 'dataVerification.noActionNeeded',
  'EDITED_BY_ADMIN' = 'dataVerification.editByAdmin',
  'REQUEST_REVISION' = 'dataVerification.requestRevision',
}

export enum FieldInput {
  'subDistrict' = 'dataVerification.subDistrict',
  'postalCode' = 'dataVerification.postalCode',
  'phone' = 'dataVerification.phone',
  'fileNpwp' = 'dataVerification.fileNpwp',
  'district' = 'dataVerification.district',
  'nik' = 'dataVerification.nik',
  'fullName' = 'dataVerification.fullName',
  'fileKtp' = 'dataVerification.fileKtp',
  'dob' = 'dataVerification.dob',
  'province' = 'dataVerification.province',
  'filePhoto' = 'dataVerification.filePhoto',
  'city' = 'dataVerification.city',
  'birthPlace' = 'dataVerification.birthPlace',
  'address' = 'dataVerification.address',
  'npwp' = 'dataVerification.npwp',
  'fileSignature' = 'dataVerification.fileSignature',
}

export interface UpdateVerificationParams {
  applicationId: number | string;
  data: UpdateVerificationData;
}

export interface UpdateVerificationData {
  category: 'KYC' | 'KYB';
  key: InputKey;
  action: keyof typeof VerificationLastAction;
  actionNote?: string;
  values?: string[];
}

interface Image {
  s3Key: string;
  url: string;
}

export interface LeadInformation {
  userUuid?: string;
  groupPath?: string;
  status?: 'INACTIVE' | 'ACTIVE';
  kyc?: {
    fullName?: string;
    gender?: 'MALE' | 'FEMALE';
    dob?: string;
    birthPlace?: string;
    nik?: string;
    phone?: string;
    npwp?: string;
    email?: string;
  };
  company?: {
    name?: string;
    email?: string;
    address?: string;
    phone?: string;
    sppkpNumber?: string;
    npwpNumber?: string;
    fileLogo?: [
      {
        s3Key: string;
        url: string;
      },
    ];
  };
}

export interface VerificationStatusResponse {
  account?: {
    createdDate?: number;
    email?: string;
    fullName?: string;
    phone?: string;
    photo?: Image;
    status: string;
    leads?: string;
    userUuid?: string;
  };
  leads: LeadInformation;
  applicationId: number | string;
  applicationState: keyof typeof ApplicationState;
  applicationStatus: keyof typeof ApplicationStatus;
  slaDate: number;
  ringkasRecommendation?: string;
  kycVerificationId?: number;
  slikVerificationId?: number;
  bankAction?: string;
  developerAction?: string;
}
