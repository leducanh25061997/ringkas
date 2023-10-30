import { BankAccountInfo } from 'types/BankAccountManagement';

export interface HQBankAccountInfoState {
  hqBankAccountInfo?: BankAccountInfo;
  isLoading?: boolean;
}
