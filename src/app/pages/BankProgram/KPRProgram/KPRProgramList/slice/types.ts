import { NavigateFunction } from 'react-router';
import { Pageable } from 'types';
import { BankLoanForm } from 'types/BankLoanManagement';

export interface KprProgramState {
  kprProgramManagement?: Pageable<BankLoanForm> | null;
  isLoading?: boolean;
}

export interface FilterParamsOfKprProgram {
  formData: BankLoanForm;
  navigate: NavigateFunction;
  id?: string;
}
