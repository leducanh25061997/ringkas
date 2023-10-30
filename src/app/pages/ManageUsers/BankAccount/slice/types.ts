import { BankAccountType } from 'types/BankAccountManagement';

/* --- STATE --- */
export interface ManageBankState {
  data: BankAccountList[];
  total?: number;
}

export interface DropItem {
  label: string;
  value: string;
}

export interface BankAccountList {
  email: string;
  fullName: string;
  phone: string;
  dob: string;
  nik: string;
  userUuid: string;
  status: 'ACTIVE' | 'INACTIVE';
  createdDate: number;
  bankAccountType?: BankAccountType;
}

export interface BankAccountListResponse {
  data: BankAccountList[];
  total: number;
}

export interface FilterParams {
  page: number;
  size: number;
}

export type SearchKeyType = 'FULL_NAME' | 'NIK' | 'PHONE' | 'EMAIL';
