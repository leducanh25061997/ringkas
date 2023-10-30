import {
  BankAccountData,
  BankAccountListItem,
  FilePhoto,
} from 'types/BankAccountManagement';

import { PropertyDetailForm } from 'app/pages/InventoryManagement/Products/CreateProduct/slice/types';
import {
  BankPreferenceFormType,
  DeveloperTaskForm,
  HousePriceForm,
} from 'types/CustomerManagement';
import {
  ApplicationStatus,
  CustomerList,
  LeadInformation,
} from '../ListCustomer/types';
import { VerificationResponse } from '../PreKprVerification/types';
import { ApplicationDataSummary } from './../PreKprVerification/types';
import { FileUpload } from 'types';
import { BankLoanForm } from 'types/BankLoanManagement';

export interface ManageCustomerState {
  customersData: {
    data: CustomerList[];
    total?: number;
  };
  kycVerificationData: {
    data: VerificationResponse;
    dataSummary?: ApplicationDataSummary;
  };
  projectsData?: ProjectsResponse;
  housePriceData?: HousePriceForm;
  developerTaskData?: DeveloperTaskForm[];
  isLoading?: boolean;
  propertyDetail?: PropertyDetailForm;
  customerPreference?: CustomerPreference;
  customerDetails?: CustomerDetails;
  bankList: {
    data: BankAccountListItem[];
    total?: number;
  };
  bankPreference?: BankPreferenceFormType;
}

export interface CustomerDetails {
  applicationId: number;
  applicationStatus: keyof typeof ApplicationStatus;
  slaDate: number;
  ringkasRecommendation: 'RECOMMENDED' | 'NOT_RECOMMENDED';
  kycVerificationId: number;
  slikVerificationId: number;
  bankAction: string;
  developerAction: 'APPROVED' | 'REJECTED';
  account: {
    email: string;
    userUuid: string;
    status: string | 'INACTIVE';
    photo: FilePhoto[];
    createdDate: string;
    fullName: string;
  };
  leads: LeadInformation;
}

export interface GetProjectsParams {
  page: number;
  location?: string;
}

export interface ProjectsResponse {
  total: number;
  data: ProjectType[];
}

export interface ProjectType {
  name: string;
  provinceName: string;
  cityName: string;
  fullAddress: string;
  longitude: number;
  latitude: number;
  buildYear: number;
  completionYear: number;
  certificateTypes: keyof typeof CertificateTypes;
  projectId: number;
  status: keyof typeof ProjectStatus;
  createdDate: number;
  code: string;
  clusters: string[];
  houseTypes: string[];
  unitLeft: number;
  unitAvailable: number;
  totalUnit: number;
  developerName: string;
}

export interface CustomerPreference {
  takeHomePayMonthly?: number;
  totalObligationMonthly?: number;
  downPaymentPreference?: number;
  installmentPreferenceMonthly?: number;
  incomeVerification?: number;
  employeeType?: string;
  jointIncome?: boolean;
  typeOfLoan?: string;
  tenorPreference?: number;
  location?: {
    province?: string;
    city?: string;
    district?: string;
    subDistrict?: string;
    postalCode?: string;
  };
  project?: {
    name?: string;
    provinceName?: string;
    cityName?: string;
    fullAddress?: string;
    longitude?: number;
    latitude?: number;
    buildYear?: number;
    completionYear?: number;
    certificateTypes?: string[];
    projectId?: number;
    status?: string;
    createdDate?: number;
    code?: string;
    clusters?: string[];
    houseTypes?: string[];
    unitLeft?: number;
    developerName?: string;
  };
  type: string;
  unit: string;
  housePrice: number;
  discount: number;
  bookingFee: number;
  downPayment: number;
  applicationId: number;
  customerBankPreferences: CustomerBankPreference[];
}

export interface CustomerBankPreference {
  bank: Partial<BankPreferenceType>;
  loanProgram: Partial<LoanProgramType>;
}

export interface BankPreferenceType {
  bankName: string;
  userUuid: string;
  fileLogo: FileUpload[];
}

export interface LoanProgramType {
  id: number;
  status: string;
  programName: string;
  maxAmount: number;
  fixedYear: number;
  fixedRate: number;
  tenor: number;
  floatRate: number;
  programDuration: {
    startDate: number;
    endDate: number;
  };
  customerBankPreferences: CustomerBankPreferences[];
}

export interface CustomerBankPreferences {
  bank: BankAccountData;
  loanProgram: BankLoanForm;
}

export enum CertificateTypes {
  'SHM' = 'SHM',
  'AJB' = 'AJB',
  'HGB' = 'HGB',
  'SHSRS' = 'SHSRS',
  'GIRIK' = 'GIRIK',
  'OTHER' = 'OTHER',
}

export enum ProjectStatus {
  'ACTIVE' = 'Active',
  'INACTIVE ' = 'Inactive',
}
