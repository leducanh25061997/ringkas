import { AccountStatus } from 'types';

export interface BankLoanForm {
  id?: number;
  status: AccountStatus;
  programName: string;
  maxAmount: number;
  fixedYear: number;
  fixedRate: number;
  tenor: number;
  floatRate: number;
  programDuration: ProgramDuration;
  bankLoanDeveloper?: string[];
  developerList?: Developer[];
  priority?: number;
  uuid?: string;
  adminFee?: number;
  provisionFee?: number;
}

interface Developer {
  name: string;
  id: string;
}

export interface ProgramDuration {
  startDate: number;
  endDate: number;
}

export interface FilterKprProgramParams {
  searchKey: string;
  searchKeyTypes: string;
  size: number;
  page: number;
  orders: string[];
  statusList: AccountStatus;
  uuid?: string;
}

export interface ChangeKprProgramStatus {
  kprProgramId?: string;
  status: string;
}
