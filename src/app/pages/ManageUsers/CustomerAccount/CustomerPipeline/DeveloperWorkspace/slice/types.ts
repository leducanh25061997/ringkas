import { ParamsUrl } from 'types';

export interface DeveloperTaskType {
  category: string;
  customCategory: string;
  planDate: any;
  actualDate: any;
  task: string;
  notes: string;
  status: string;
  id: number;
}

export interface DropdownBank {
  value: string;
  label: string;
}

export interface UploadData {
  files: ParamsUrl;
  bankName: string;
}
