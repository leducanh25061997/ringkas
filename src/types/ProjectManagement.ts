import { StatusToDo } from 'app/pages/InventoryManagement/ProjectManagement/CreateProject/slice/types';
import { NavigateFunction } from 'react-router';
import { AccountStatus } from 'types';

export interface ProjectManagement {
  name: string;
  provinceName: string;
  cityName: string;
  fullAddress: string;
  longitude: number;
  latitude: number;
  buildYear: number;
  completionYear: number;
  certificateTypes: string[];
  projectId: number;
  status: AccountStatus;
  createdDate: number;
  code: string;
  id: number;
  houseTypes: string[];
}
export interface FilterProjectParams {
  searchKey: string;
  searchKeyTypes: string;
  size: number;
  page: number;
  orders: string[];
  status: AccountStatus;
  statusList: AccountStatus;
}

export interface ProjectInformationParams {
  id?: string;
  name: string;
  provinceName: string;
  cityName: string;
  fullAddress: string;
  longitude: number;
  latitude: number;
  buildYear: number;
  completionYear: number;
  certificateTypes: string[];
  accessibilities: string[];
  clusters: string[];
  houseTypes: string[];
  facilities: string[];
  SHM?: boolean;
  AJB?: boolean;
  HGB?: boolean;
  SHSRS?: boolean;
  GIRIK?: boolean;
  OTHER?: boolean;
  projectId: number;
  status: string;
  createdDate: number;
  code: string;
  tasks: Task[];
  location?: Location;
  projectAccessibility?: string;
  projectFacility?: string;
  cluster?: string;
  houseType?: string;
  mandatory?: string;
  cerType?: string;
}

export interface Location {
  province: string;
  city: string;
}

export interface Task {
  defaultCategory?: string;
  customCategory?: string;
  isMandatory?: false;
  documentType?: string;
  status?: string;
  planDate?: number;
  actualDate?: number;
  note?: string;
  document?: Document;
}

interface Document {
  originalName: string;
  url: string;
  s3Key: string;
}

export interface ProjectInformation {
  name: string;
  provinceName: string;
  cityName: string;
  fullAddress: string;
  longitude: number;
  latitude: number;
  buildYear: number;
  completionYear: number;
  certificateTypes: string[];
  projectId: number;
  status: string;
  createdDate: number;
  code: string;
  accessibilities: string[];
  facilities: string[];
  clusters: string[];
  houseTypes: string[];
}

export interface ProjectTask {
  defaultCategory: string;
  customCategory: string;
  isMandatory: boolean;
  documentType: string;
  status?: string;
  planDate?: number;
  actualDate?: number;
  note?: string;
  document?: Document;
  id?: any;
  category?: string;
  isEdit?: StatusToDo;
  projectId?: any;
}

export interface ChangeProjectStatus {
  projectId?: string;
  status: string;
}

export interface FilterParamsOfProject {
  formData: ProjectInformationParams;
  navigate: NavigateFunction;
  id?: string;
}
