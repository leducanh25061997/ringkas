export interface CreateBranchBankPartner {
  provinces?: string[];
  cities?: string[];
  headquarters?: BankHQAccounts[];
  isLoading?: boolean;
}

export interface BankHQAccounts {
  userUuid: string;
  company: CompanyBankAcount;
}

export interface CompanyBankAcount {
  name: string;
}
export interface CreateBranchBankAccountManagement {
  email?: string;
  kyc: KycManagement;
  company: Company;
  documentQualification: DocumentQualification;
  bankAccountType?: BankAccountType;
  bankHqUuid?: ObjectValue;
  province?: ObjectValue;
  city?: ObjectValue;
}

interface ObjectValue {
  name: string;
  value: string;
}

export interface KycManagement {
  fullName?: string;
  phone?: string;
  dob?: string;
  nik?: string;
  filePhoto?: ImageFile;
  fileNik?: ImageFile;
  fileSignature?: ImageFile;
}

export interface DocumentQualification {
  fileKtpDirector?: ImageFile[];
  fileNpwp?: ImageFile[];
  fileTdp?: ImageFile[];
  fileSiup?: ImageFile[];
  fileSppkp?: ImageFile[];
  fileNda?: ImageFile[];
  ndaExpiredDate?: number;
  fileMou?: ImageFile[];
  mouExpiredDate?: number;
}

export interface Company {
  email?: string;
  bankHqUuid?: string;
  name?: string;
  address?: string;
  branchName?: string;
  titleBranch?: string;
  nip?: string;
  province?: string;
  city?: string;
  phone?: string;
  sppkpNumber?: string;
  npwpNumber?: string;
  parentAccountUserUuid: string;
}

export interface ImageFile {
  originalName?: string;
  url?: string;
  s3Key?: string;
}

export interface Images {
  fileNik: ImageFiles;
  filePhoto: ImageFiles;
}

export interface ImageFiles {
  file: string | null;
  url: string;
  name: string;
  nameFile: string;
}

export enum BankAccountType {
  HEAD_QUARTER = 'HEAD_QUARTER',
  BRANCH = 'BRANCH',
}
