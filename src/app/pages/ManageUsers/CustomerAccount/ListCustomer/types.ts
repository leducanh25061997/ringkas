/* --- STATE --- */

export type CustomerList = {
  applicationId: number;
  applicationState: keyof typeof ApplicationState;
  applicationStatus: keyof typeof ApplicationStatus;
  slaDate: number;
  ringkasRecommendation?: string;
  customerContact: UserInformation;
  pic: PicInformation;
  leads: LeadInformation;
  developerAssignee: DeveloperAssigneeInformation;
  property?: PropertyInformation;
};

export interface PropertyInformation {
  applicationId: number | string;
  id: number;
  projectName: string;
  purchaseStatus: string;
  createdDate: number;
  projectId: number;
  type: string;
  unit: string;
  images: [
    {
      s3Key: string;
      url: string;
    },
  ];
  landArea: number;
  buildingArea: number;
  facility: {
    others: any[];
  };
  pricing: {
    bookingFee: number;
    downPaymentPercentage: number;
    housePrice: number;
    discount: number;
  };
  promotions: any[];
  commission: {
    maxBankInterestRate: number;
    buybackGuaranteePolicy: number;
  };
}

export interface DeveloperAssigneeInformation {
  userUuid: string;
  kyc: {
    fullName: string;
    gender: string;
    dob: string;
    birthPlace: string;
    nik: string;
    email: string;
    phone: string;
    npwp: string;
  };
  company: {
    name: string;
    email: string;
    address: string;
    phone: string;
    sppkpNumber: string;
    npwpNumber: string;
    fileLogo: [
      {
        s3Key: string;
        url: string;
      },
    ];
  };
}

export interface PicInformation {
  phone: string;
  userUuid: string;
  fullName: string;
  email: string;
}

export interface UserInformation {
  userUuid: string;
  fullName: string;
  email: string;
  phone: string;
}

export interface LeadInformation {
  userUuid: string;
  groupPath: string;
  status: 'INACTIVE' | 'ACTIVE';
  kyc: {
    fullName: string;
    gender: 'MALE' | 'FEMALE';
    dob: string;
    birthPlace: string;
    nik: string;
    phone: string;
    npwp: string;
    email: string;
  };
  company: {
    name: string;
    email: string;
    address: string;
    phone: string;
    sppkpNumber: string;
    npwpNumber: string;
    fileLogo: [
      {
        s3Key: string;
        url: string;
      },
    ];
  };
}

export type UserRole = 'admin' | 'developer' | 'bank' | 'client';

export enum ApplicationStatus {
  'ONBOARDING' = 'customerList.onBoarding',
  'SYSTEM_WIP' = 'customerList.systemWip',
  'DATA_READY' = 'customerList.dataReady',
  'KYC_RETURNED' = 'customerList.kycReturned',
  'PRE_SCORING_READY' = 'customerList.preScoringReady',
  'SCORING_READY' = 'customerList.scoringReady', // not used
  'DECLINED' = 'customerList.declined',
  'APPROVED' = 'customerList.approved',
}

export enum ApplicationState {
  'ONBOARDING' = 'customerList.onBoarding',
  'PRE_KPR' = 'customerList.preKrp',
  'KPR' = 'customerList.kpr',
  'POST_KPR' = 'customerList.postKpr',
}

export interface CustomerListResponse {
  data: CustomerList[];
  total: number;
}

export interface FilterCustomerParams {
  page: number;
  size: number;
  searchKey?: string;
  searchKeyType?: string;
  orders?: string;
  applicationStatus?: (keyof typeof ApplicationStatus)[];
}

export interface CreateCustomerData {
  email: string;
  kyc: {
    phone: string;
    nik: string;
    fullName: string;
    dob: string;
    birthPlace: string;
    npwp: string;
    fileKtp: [FileS3];
    fileNpwp: [FileS3];
    filePhoto: [FileS3];
    gender: string;
    location: {
      province: string;
      city: string;
      district: string;
      subDistrict: string;
      postalCode: string;
    };
  };
  preferences: {
    property: {
      housePriceProduct?: number;
      location: {
        city: string;
      };
      propertyId?: number;
      developerUuid?: string;
    };
    credit: {
      takeHomePayMonthly: number;
      totalObligationMonthly: number;
      downPaymentPreference: number;
      installmentPreferenceMonthly: number;
      employeeType: 'EMPLOYEE' | 'ENTREPRENEUR' | 'PROFERSSIONAL';
      typeOfLoan: 'SHARIA' | 'CONVENTIONAL';
      jointIncome: boolean;
      tenorPreference: number;
    };
  };
  guarantor: {
    phone: string;
    nik: string;
    fullName: string;
    dob: string;
    birthPlace: string;
    npwp: string;
    fileKtp: [FileS3];
    fileNpwp: [FileS3];
    filePhoto: [FileS3];
    gender: string;
    location: {
      province: string;
      city: string;
      district: string;
      subDistrict: string;
      postalCode: string;
    };
  };
  bank?: BankType[];
  consentApproval: 'VIA_EMAIL';
}

interface BankType {
  bankUuid?: string;
  loanProgramId?: number;
}

export type SearchKeyType = 'FULL_NAME' | 'NIK' | 'PHONE' | 'EMAIL';

export interface FileS3 {
  originalName: string;
  url: string;
  s3Key: string;
}
