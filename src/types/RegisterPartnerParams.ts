export interface RegisterPartnerParams {
  email: string;
  kyc: {
    fullName: string;
    gender: string;
    dob: string;
    birthPlace: string;
    location: {
      country: string;
      province: string;
      city: string;
      district: string;
      subDistrict: string;
      postalCode: string;
    };
    nik: string;
    email: string;
    phone: string;
    npwp: string;
    fileKtp?: string[];
  };
  company: {
    name: string;
    email: string;
    address: string;
    phone: string;
    sppkpNumber: string;
    npwpNumber: string;
    fileLogo: string[];
  };
  document: {
    fileKtpDirector: string[];
    fileDeedOfCompany: string[];
    fileCompanyNpwp: string[];
    fileNib: string[];
    fileCompanyDecree: string[];
    fileSupportingDocument: string[];
  };
}
