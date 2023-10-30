import { ProjectManagement } from './ProjectManagement';

export interface EmployeeAccountDataForm {
  id?: string;
  fullName?: string;
  email: string;
  phone?: string;
  roleName?: RoleName;
  role?: RoleName;
  projectId?: number | string;
  projectName?: Employee_projectName;
  roleNameData?: Employee_roleNameData;
  type?: EmployeeType;
}

export interface EmployeeAccountData {
  userUuid: string;
  groupPath: string;
  status: string;
  createdDate: number;
  fullName: string;
  phone: string;
  email: string;
  roleName: RoleName;
  role: RoleName;
  type: EmployeeType;
  project?: ProjectManagement;
}

export enum EmployeeType {
  HEAD_QUARTER_LEVEL = 'HEAD_QUARTER_LEVEL',
  PROJECT_LEVEL = 'PROJECT_LEVEL',
}

export enum RoleName {
  PIC_PROJECT = 'PIC_PROJECT',
  ADMIN_PROJECT = 'ADMIN_PROJECT',
  ADMIN = 'ADMIN',
  PIC_MAIN = 'PIC_MAIN',
  CREDIT_OFFICER_RINGKAS = 'CREDIT_OFFICER_RINGKAS',
  ADMIN_RINGKAS = 'ADMIN_RINGKAS',
}

export enum RoleNameText {
  'PIC_PROJECT' = 'roles.picProject',
  'ADMIN_PROJECT' = 'roles.adminProject',
  'ADMIN' = 'roles.admin',
  'PIC_MAIN' = 'roles.picMain',
  'ADMIN_RINGKAS' = 'roles.adminRingkas',
  'CREDIT_OFFICER_RINGKAS' = 'roles.creditOfficerRi',
}

interface Employee_projectName {
  label: string;
  value: number;
}

interface Employee_roleNameData {
  label: string;
  value: RoleName;
}
