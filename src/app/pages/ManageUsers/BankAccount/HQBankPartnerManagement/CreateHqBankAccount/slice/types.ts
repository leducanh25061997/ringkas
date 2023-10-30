export interface CreateHqBankPartner {
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
  filePhoto?: ImageFile;
}

export interface ImageFile {
  originalName?: string;
  url?: string;
  s3Key?: string;
}

export interface Images {
  fileNik: ImageFiles;
  fileLogo: ImageFiles;
  fileKtpDirector: ImageFiles;
  fileNpwp: ImageFiles;
  fileTdp: ImageFiles;
  fileSiup: ImageFiles;
  fileSppkp: ImageFiles;
  filePhoto: ImageFiles;
  fileSignature: ImageFiles;
}

export interface ImageFiles {
  file: string | null;
  url: string;
  name: string;
  nameFile: string;
}
