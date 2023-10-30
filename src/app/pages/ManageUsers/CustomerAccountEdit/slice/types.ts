import { NavigateFunction } from 'react-router';
import { Customer, CustomerKyc } from 'types';
import {
  CustomerApplicationKycDetail,
  CustomerKpr,
  CustomerKprParams,
  FileType,
} from 'types/CustomerManagement';

export interface CustomerUpdateState {
  customerInformation?: Customer;
  customerKycInformation?: CustomerKyc;
  customerApplicationDetail?: CustomerApplicationKycDetail;
  customerApplicationDetailOfGuarantor?: CustomerApplicationKycDetail;
  customerKprInformation?: CustomerKpr;
  isLoading?: boolean;
}

export interface Files {
  fileName: string[];
}

export interface ImagesOfKyc {
  fileNik: ImageFiles;
  fileSignature: ImageFiles;
}

export interface Images {
  fileIdCard: ImageFiles;
  fileAttachments: ImageFiles;
  fileSignatureDigital: ImageFiles;
}

export interface ImagesKPR {
  fileIdCard: ImageFiles;
  fileAttachments: ImageFiles;
  fileSignatureDigital: ImageFiles;
}

export interface ImageFiles {
  file: string;
  url?: string;
  name: string;
  nameFile: string;
  s3Key?: string;
  originalName?: string;
}

export interface CustomerKYCParams {
  userUuid?: string;
  fullName: string;
  phone: string;
  dob: string;
  nik: string;
  fileNik?: FileType;
  fileSignature?: FileType;
}

export interface FilterParams {
  files: Files;
  formData: CustomerKYCParams;
  images: ImagesOfKyc;
  navigate: NavigateFunction;
}

export interface FilterParamsOfKPR {
  files: Files;
  formData: CustomerKprParams;
  images: Images;
  navigate: NavigateFunction;
}
