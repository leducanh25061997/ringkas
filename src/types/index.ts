import { RootState } from './RootState';
export type {
  AuthParams,
  AuthResponse,
  UserInformation,
  RegistrationRequest,
  Company,
} from './Auth';

export type {
  FileUpload,
  ParamsUrl,
  ParamsUpload,
  ResponseError,
} from './FileUpload';

export type { Customer, CustomerKyc } from './CustomerManagement';

export type { Product } from './ProductManagement';

export type { RootState };

export type { KeycloakError } from './Keycloak';

export interface Pageable<T> {
  data: T[];
  total: number;
  count?: number;
}

export enum AccountStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum ApplicationStatus {
  VERIFIED = 'VERIFIED',
  REJECTED = 'REJECTED',
}
