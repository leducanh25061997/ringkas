import { BankAccountType } from 'types/BankAccountManagement';
import { PartnerAccountForm } from 'types/PartnerAccountManagement';

/* --- STATE --- */
export interface ManagePartnerState {
  data: PartnerAccountForm[];
  total?: number;
}

export interface DropItem {
  label: string;
  value: string;
}

export interface PartnerAccountList {
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

export interface PartnerAccountListResponse {
  data: PartnerAccountForm[];
  total: number;
}

export interface FilterParams {
  page: number;
  size: number;
}

export type SearchKeyType = 'FULL_NAME' | 'NIK' | 'PHONE' | 'EMAIL';
