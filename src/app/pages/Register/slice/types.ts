export interface signUpState {}

export interface FileProps {
  originalName: string;
  url: string;
  s3Key: string;
}

export interface SignUpHeadquarterData {
  email: string;
  password: string;
  kyc: {
    fullName: string;
    phone: string;
    email: string;
    dob: string;
    nik: string;
    filePhoto: FileProps;
    fileSignature: FileProps;
  };
  company: {
    email: string;
    name: string;
    address: string;
    phone: string;
    sppkpNumber: string;
    npwpNumber: string;
    fileLogo: FileProps;
  };
  documentQualification: {
    fileKtpDirector: [FileProps];
    fileNpwp: [FileProps];
    fileTdp: [FileProps];
    fileSiup: [FileProps];
    fileSppkp: [FileProps];
  };
  bankAccountType: 'HEAD_QUARTER';
}

export interface signUpBranchData {
  email: string;
  password: string;
  kyc: {
    fullName: string;
    phone: string;
    email: string;
    dob: string;
    nik: string;
    fileNik: FileProps;
    fileSignature: FileProps;
    birthPlace: string;
  };
  company: {
    email: string;
    name: string;
    address: string;
    parentAccountUserUuid: string;
    branchName: string;
    titleBranch: string;
    nip: string;
    province: string;
    city: string;
    phone: string;
  };

  bankAccountType: 'BRANCH';
}
