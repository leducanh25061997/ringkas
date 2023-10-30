import { ProjectInformation } from 'types/ProjectManagement';

export interface CreateProjectState {
  provinces?: string[];
  cities?: string[];
  projectInformation?: ProjectInformation;
  isLoading?: boolean;
}

export enum StatusToDo {
  TODO = 'TODO',
  DONE = 'DONE',
  DOING = 'DOING',
}

export interface Task {
  id: number;
  category: string;
  defaultCategory: string;
  customCategory: string;
  documentType: string;
  isMandatory: boolean;
  isEdit: StatusToDo;
}
