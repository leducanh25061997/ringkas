import { NavigateFunction } from 'react-router';
import { Pageable } from 'types';
import {
  EmployeeAccountData,
  EmployeeAccountDataForm,
} from 'types/EmployeeAccountManagement';

export interface EmployeeAccountState {
  employeeAccountManagement?: Pageable<EmployeeAccountData>;
  employeeAccountInfo?: EmployeeAccountData;
  isLoading?: boolean;
}
export interface DropItem {
  label: string;
  value: string;
}

export interface FilterParamsOfEmployee {
  formData: EmployeeAccountDataForm;
  navigate: NavigateFunction;
  id?: string;
}
