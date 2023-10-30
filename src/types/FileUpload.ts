import { CancelTokenSource } from 'axios';

export interface FileUpload {
  url: string;
  s3Key: string;
  originalName: string;
  key?: string;
  file?: File;
}

export interface FileUploadWithProgress {
  file?: File;
  progress?: number;
  cancelTokenSource?: CancelTokenSource;
  name?: string;
  size?: number;
  image?: string;
  mimeType?: string;
  fileS3?: FileUpload;
  url?: string;
  s3Key?: string;
  originalName?: string;
}

export interface ParamsUpload {
  fileNames: string[];
}
export interface ParamsUrl {
  name?: string;
  url: string;
  files?: any;
  key?: string;
  s3Key?: string;
  originalName?: string;
}

export interface ResponseError {
  response?: Response;
}

export interface Response {
  status: number;
  message: string;
  data: {
    messages: string[];
  };
}

export interface FileUrlData {
  name?: string;
  url?: string;
  files?: string;
  key?: string;
  s3Key?: string;
  originalName?: string;
}
