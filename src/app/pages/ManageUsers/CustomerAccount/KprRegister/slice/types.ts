export interface KprState {
  isUpdateKprLoading: boolean;

  isGetKprLoading: boolean;
  isGetKprSuccess: boolean;
  kpr?: KprParams[];
}

export interface KprPayload {
  applicationId?: string;
  params: any;
}

export type Category = 'KYC' | 'KYB' | 'KYB_DOCUMENT' | 'KPR';
export type KprCategory =
  | 'PERSONAL_DATA'
  | 'EMPLOYMENT_DATA'
  | 'GUARANTOR'
  | 'INCOME_DATA'
  | 'BANK_RELATION';
export type ValueType = 'TEXT' | 'FILE';
export type TextValueFormat =
  | 'FREE_TEXT'
  | 'PHONE_NUMBER'
  | 'EMAIL'
  | 'DATE'
  | 'ENUM';
export type Action =
  | 'SUBMITTED'
  | 'EDITED_BY_ADMIN'
  | 'REQUEST_REVISION'
  | 'NO_ACTION_NEEDED'
  | 'UPDATED_BY_SYSTEM';

export type Status = 'SUBMITTED' | 'VERIFIED' | 'REQUEST_UPDATE';

export interface KprParams {
  category: Category;
  kprCategory: KprCategory;
  key: string;
  values: any;
  valueType: ValueType;
  textValueFormat: TextValueFormat;
  action: Action;
  actionNote?: string;
  status?: string;
}

export interface KprFilter {
  id?: string;
  size?: number;
  page?: number;
  orders?: string;
  categories?: Category;
  kprCategories?: KprCategory;
  status?: Status;
  valueType?: ValueType;
}

export interface KprResponse {
  total: number;
  data: KprParams[];
}

// enum

export enum KprTab {
  'PERSONAL_DATA' = 'personalData',
  'EMPLOYMENT_DATA' = 'employmentData',
  'GUARANTOR' = 'warrantor',
  'INCOME_DATA' = 'totalIncome',
  'BANK_RELATION' = 'bankRelation',
}

export enum EmploymentType {
  'EMPLOYEE' = 'Employee',
  'ENTREPRENEUR' = 'Entrepreneur',
  'PROFESSIONAL' = 'Professional',
}
