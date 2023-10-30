import { KprParams } from '../../../../CustomerAccount/KprRegister/slice/types';

export interface BankTaskUpdateStatus {
  applicationId?: string;
  action: string;
  picActor?: string;
  note?: string;
  bankTaskFormApprove?: {
    sp3k: {
      documents: string[];
      docNumber: number;
      expirationDate: number;
      releaseDate: number;
    };
    kprAmount: {
      requestedPlafond: number;
      approvedPlafond: number;
    };
    certificateContact: {
      nameOnCertificate: string;
      relationshipStatus: string;
    };
    notaryPIC: {
      notaryName: string;
      notaryPhoneNumber: string;
      notaryEmail: string;
    };
    bankLoanId: number;
    loanProgram: {
      bankLoanId: number;
      tenor: number;
      fixedRate: number;
      floatRate: number;
      adminFee: number;
      provisionFee: number;
    };
  };
}

export interface BankTaskItem {
  action: string;
  picActor?: string;
  note?: string;
  createdDate: number;
  id: number;
  bankTaskFormResponse?: {
    sp3k: {
      documents: string[];
      docNumber: number;
      expirationDate: number;
      releaseDate: number;
    };
    kprAmount: {
      requestedPlafond: number;
      approvedPlafond: number;
    };
    certificateContact: {
      nameOnCertificate: string;
      relationshipStatus: string;
    };
    notaryPIC: {
      notaryName: string;
      notaryPhoneNumber: string;
      notaryEmail: string;
    };
    loanProgram: {
      bankLoanId: number;
      adminFee: number;
      provisionFee: number;
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
    };
    bankLoanProgram: {
      aminFee: number;
      provisionFee: number;
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
    };
  };
}
export interface BankTaskState {
  bankTaskList?: BankTaskItem[];
  customerDocuments?: KprParams[];
  isLoading?: boolean;

  isCustomerDocsLoading?: boolean;
  isCustomerDocsSuccess?: boolean;
}

export interface DocsParams {
  applicationId: string;
  type?: string;
}
