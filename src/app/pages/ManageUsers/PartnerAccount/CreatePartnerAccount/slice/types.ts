export interface CreatePartnerAccountState {
  isLoading?: boolean;
}

export interface CreateBankAccountManagement {
  email?: string;
  kyc: KycManagement;
  company: Company;
  documentQualification: DocumentQualification;
  bankAccountType?: string;
  isLoading?: boolean;
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
}

export interface ImageFile {
  originalName?: string;
  url?: string;
  s3Key?: string;
}

export interface Images {
  fileKtp: ImageFiles;
  fileDeedOfCompany: ImageFiles;
  fileNPWP: ImageFiles;
  fileNIP: ImageFiles;
  fileSK: ImageFiles;
}

export interface ImageFiles {
  file: string | null;
  url: string;
  name: string;
  nameFile: string;
}
