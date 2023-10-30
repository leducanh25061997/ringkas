import { NavigateFunction } from 'react-router';
import { BankAccountForm, BankAccountInfo } from 'types/BankAccountManagement';

export interface HQBankAccountInfoState {
  hqBankAccountInfo?: BankAccountInfo;
  isLoading?: boolean;
}

export interface FilterParams {
  files: any;
  formData: BankAccountForm;
  images: ImagesOfHQBank;
  navigate: NavigateFunction;
}

export interface ImagesOfHQBank {
  fileNik?: ImageFiles;
  fileKtpDirector?: ImageFiles;
  fileNpwp?: ImageFiles;
  fileTdp?: ImageFiles;
  fileSiup?: ImageFiles;
  fileSppkp?: ImageFiles;
  fileNda?: ImageFiles;
  fileMou?: ImageFiles;
}

export interface ImageFiles {
  file: string;
  url?: string;
  name: string;
  nameFile: string;
  s3Key?: string;
  originalName?: string;
}
