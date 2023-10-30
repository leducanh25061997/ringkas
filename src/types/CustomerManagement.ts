import { AccountStatus } from 'types';
import { FilePhoto } from './BankAccountManagement';

export interface Customer {
  email: string;
  fullName: string;
  phone: string;
  dob: string;
  userUuid: string;
  status: AccountStatus;
  createdDate: number;
  filePhoto?: FileType;
}

export interface CustomerKyc extends Customer {
  fileNik?: FileType;
  fileSignature?: FileType;
  nik?: string;
}

export interface CustomerApplicationKycDetail {
  phone?: string;
  email?: string;
  gender?: 'MALE' | 'FEMALE';
  nik?: string;
  fullName?: string;
  dob?: string;
  birthPlace?: string;
  address?: string;
  location?: {
    province?: string;
    city?: string;
    district?: string;
    subDistrict?: string;
    postalCode?: string;
  };
  npwp?: string;
  fileKtp?: FileType[];
  filePhoto?: FileType[];
  fileNpwp?: FileType[];
  fileSignature?: FileType[];
}

export interface FileType {
  originalName?: string;
  url?: string;
  s3Key?: string;
}

export interface CustomerProfileParams_formData {
  fullName: string;
  email: string;
  referralCode: string;
  name?: string;
}

export interface CustomerProfile {
  fullName: string;
  phone: string;
  dob: string;
  nik: string;
  userUuid: string;
  email: string;
  status: string;
  createdDate: number;
}

export interface CustomerKYCParams {
  userUuid?: string;
  fullName: string;
  phone: string;
  dob: string;
  nik: string;
  fileNik?: FileType | [];
  fileSignature?: FileType | [];
}

export interface CustomerKYC {
  fullName: string;
  phone: string;
  dob: string;
  nik: string;
  fileNik: FileType;
  fileSignature: FileType;
  userUuid: string;
  status: string;
  createdDate: number;
}

export interface CustomerAccountForm {
  email?: string;
  referralCode?: string;
  name?: string;
  fullName?: string;
  phone?: string;
  dob?: string;
  nik?: string;
  fileNik?: FileType;
  fileSignature?: FileType;
  userUuid?: string;
  status?: string;
  createdDate?: number;
}

export interface CustomerKpr {
  userUuid: string;
  status: string;
  createdDate: string;
  dataSet: CustomerKPRDataset;
}

export interface CustomerKprParams {
  userUuid?: string;
  dataSet: CustomerKPRDataset;
}

export interface CustomerKPRDataset {
  personal: CustomerKPR_dataset_personal;
  employee: CustomerKPR_dataset_employee;
  insurer: CustomerKPR_dataset_insurer;
  assetIncome: CustomerKPR_dataset_assetIncome;
  bank: CustomerKPR_dataset_bank;
  others: CustomerKPR_dataset_other;
}

export interface CustomerKPR_dataset_personal {
  status: string;
  type: string;
  fullName: string;
  dob: string;
  gender: string;
  maritalStatus: string;
  education: string;
  idCardType: string;
  idCardNumber: string;
  familyCardNumber: string;
  fileIdCard: FileType;
  address: string;
  phoneNumber: string;
  homeOwnershipStatus: string;
  npwpNumber: string;
}

export interface CustomerKPR_dataset_employee {
  status: string;
  employment: CustomerKPR_dataset_employee_employment;
  previousEmployment: CustomerKPR_dataset_employee_employment;
  businessOwnershipType: string;
}

export interface CustomerKPR_dataset_employee_employment {
  employmentType: string;
  employmentTypeOthers: string;
  companyName: string;
  businessSector: string;
  businessSectorOthers: string;
  officeAddress: string;
  officePhoneNumber: string;
  officeEmailAddress: string;
  positionOrGrade: string;
  takeHomePay: string;
  employeeId: string;
  duration: string;
}

export interface CustomerKPR_dataset_insurer {
  status: string;
  fullName: string;
  dob: string;
  idCardType: string;
  idCardNumber: string;
  insurerEmployment: CustomerKPR_dataset_insurer_insurerEmployment;
}

export interface CustomerKPR_dataset_insurer_insurerEmployment {
  employmentType: string;
  employmentTypeOthers: string;
  companyName: string;
  businessSector: string;
  businessSectorOthers: string;
  officeAddress: string;
  officePhoneNumber: string;
  officeEmailAddress: string;
  positionOrGrade: string;
  employeeId: string;
  duration: string;
  businessOwnershipType: string;
}

export interface CustomerKPR_dataset_assetIncome {
  status: string;
  landOrHouseAssets: CustomerKPR_dataset_assetIncome_landOrHouseAssets[];
  privateVehicleAssets: CustomerKPR_dataset_assetIncome_landOrHouseAssets[];
  depositAssets: CustomerKPR_dataset_assetIncome_depositAssets[];
  requesterIncome: CustomerKPR_dataset_assetIncome_requesterIncome;
  warrantorIncome: CustomerKPR_dataset_assetIncome_requesterIncome;
  totalIncome: string;
}

export interface CustomerKPR_dataset_assetIncome_landOrHouseAssets {
  area: string;
  marketValue: string;
  address: string;
}

export interface CustomerKPR_dataset_assetIncome_landOrHouseAssets {
  typeOrSeries: string;
  marketValue: string;
}

export interface CustomerKPR_dataset_assetIncome_requesterIncome {
  bankName: string;
  amount: string;
  period: string;
}

export interface CustomerKPR_dataset_assetIncome_depositAssets {
  bankName: string;
  amount: string;
  period: string;
}

export interface CustomerKPR_dataset_assetIncome_requesterIncome {
  netPerMonth: string;
  otherPerMonth: string;
  subTotal: string;
  fileAttachments: FileType[];
}

export interface CustomerKPR_dataset_bank {
  status: string;
  savingAccountRelations: CustomerKPR_dataset_bank_savingAccountRelations;
  creditOrLoanRelations: CustomerKPR_dataset_bank_creditOrLoanRelations;
  registeredCreditCardRelations: CustomerKPR_dataset_bank_registeredCreditCardRelations[];
}

export interface CustomerKPR_dataset_bank_savingAccountRelations {
  bankName: string;
  bankAccountNumber: string;
  fileAttachments: FileType[];
}

export interface CustomerKPR_dataset_bank_creditOrLoanRelations {
  bankOrCompanyName: string;
  type: string;
  amount: string;
  dueDate: string;
  remaining: string;
  installmentPerMonth: string;
}

export interface CustomerKPR_dataset_bank_registeredCreditCardRelations {
  onBehalf: string;
  cardNumber: string;
  cardType: string;
  issuingBankName: string;
  issuedMonthAndYear: string;
  averageUsageAmountPerMonth: string;
  limitAmount: string;
}

export interface CustomerKPR_dataset_other {
  status: string;
  biologicalMotherName: string;
  agentName: string;
  agentUuid: string;
  fileSignatureDigital: FileType;
  termsAndConditionsAgreement: false;
}

export interface CustomerAccountFormInfo {
  email?: string;
  referralCode?: string;
  fullNameOfKyc?: string;
  phoneOfKyc?: string;
  dobOfKyc?: string;
  nikOfKyc?: string;
  fileNik?: FileType;
  fileSignature?: FileType;
  userUuid?: string;
  status?: string;
  createdDate?: number;
  dataSet: CustomerKPRDataset;
}

export interface AccountKycParams {
  userUuid?: string;
  dataSet: CustomerKPRDataset;
  submit: boolean;
}

export interface AccountKycParams_data {
  fullName: string;
  phone: string;
  dob: string;
  nik: string;
  fileNik: FileType;
  fileSignature: FileType;
}

export interface HousePriceForm {
  housePrice?: number;
  discount?: number;
  bookingFee?: number;
  downPayment?: number;
  interestRate?: number;
  id?: number | string;
}

export interface DeveloperTaskForm {
  id?: number;
  category: string;
  customCategory: string;
  planDate: string;
  actualDate: string;
  fileDocuments: FileType[];
  note: string;
  status: string;
}

export interface DeveloperTaskBody {
  id?: number;
  fileDocuments: string[];
  note: string;
  status: string;
}

export interface DeveloperTaskUpdateForm {
  id?: number;
  formData: DeveloperTaskBody[];
  isNotification?: boolean;
}

export interface BankPreferenceForm {
  id?: number;
  file?: FilePhoto;
  branch: BankPreferenceForm_branch;
}

export interface BankPreferenceForm_branch {
  bank?: LabelField;
  city?: LabelField;
  loanProgram?: LabelField;
}

interface LabelField {
  label?: string;
  value?: string | number;
  file?: string;
}

export interface BankPreferenceFormType {
  applicationId?: number;
  banks: BanksForm[];
  id?: string;
}

export interface BanksForm {
  id?: number;
  bankInfo?: LabelField;
  bankName?: string;
  userUuid?: string;
  bankUuid?: string;
  fileLogo?: FilePhoto[];
  bankDocument?: BankDocument;
  file?: FilePhoto;
  priority?: number;
}

interface BankDocument {
  fileKtpDirector?: FilePhoto[];
  fileDeedOfCompany?: FilePhoto[];
  fileCompanyNpwp?: FilePhoto[];
  fileNib?: FilePhoto[];
  fileCompanyDecree?: FilePhoto[];
  fileSupportingDocument?: FilePhoto[];
}
