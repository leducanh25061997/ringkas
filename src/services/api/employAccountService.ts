import { Pageable } from 'types';
import {
  ChangeStatus,
  FilterDevelopAccountParams,
} from 'types/DeveloperAccountManagement';
import {
  EmployeeAccountData,
  EmployeeAccountDataForm,
} from 'types/EmployeeAccountManagement';

import { createService } from './axios';

const baseURL = process.env.REACT_APP_API_URL;
const instance = createService(baseURL);

const serialize = (params: any) => {
  const str = [];
  for (const p in params)
    if (params.hasOwnProperty(p)) {
      if (params[p] !== '' && !Array.isArray(params[p])) {
        str.push(encodeURIComponent(p) + '=' + params[p]);
      } else if (Array.isArray(params[p]) && params[p].length) {
        params[p].map((item: any) => {
          str.push(encodeURIComponent(p) + '=' + item);
        });
      }
    }
  return str.join('&');
};

const CreateEmployeeAccount = async (
  params: EmployeeAccountDataForm,
): Promise<EmployeeAccountDataForm> => {
  const response = await instance.post(`/console/developer-employee`, params);
  return response.data;
};

const updateEmployeeAccount = async (
  params: EmployeeAccountDataForm,
): Promise<EmployeeAccountDataForm> => {
  const newParams = { ...params };
  delete newParams.id;
  const response = await instance.put(
    `/console/developer-employee/${params.id}`,
    newParams,
  );
  return response.data;
};

const fetchEmployeeAccountList = async (
  params: FilterDevelopAccountParams,
): Promise<Pageable<EmployeeAccountData>> => {
  const newParams = { ...params };
  const response = await instance.get(
    `/console/developer-employees?${serialize(newParams)}`,
  );
  return response.data;
};

const fetchEmployeeAccountInfo = async (
  params: string,
): Promise<EmployeeAccountData> => {
  const response = await instance.get(`/console/developer-employee/${params}`);
  return response.data;
};

const updateStatusAccount = async (
  params: ChangeStatus,
): Promise<ChangeStatus> => {
  const newParams = { ...params };
  delete newParams.userUuid;
  const response = await instance.put(
    `/console/developer-employee/${params.userUuid}/status`,
    newParams,
  );
  return response.data;
};

const CreateEmployeeAccountByAdmin = async (
  params: EmployeeAccountDataForm,
): Promise<EmployeeAccountDataForm> => {
  const response = await instance.post(`/console/admin-employee`, params);
  return response.data;
};

const updateEmployeeAccountByAdmin = async (
  params: EmployeeAccountDataForm,
): Promise<EmployeeAccountDataForm> => {
  const newParams = { ...params };
  delete newParams.id;
  const response = await instance.put(
    `/console/admin-employee/${params.id}`,
    newParams,
  );
  return response.data;
};

const fetchEmployeeAccountListByAdmin = async (
  params: FilterDevelopAccountParams,
): Promise<Pageable<EmployeeAccountData>> => {
  const newParams = { ...params };
  const response = await instance.get(
    `/console/admin-employees?${serialize(newParams)}`,
  );
  return response.data;
};

const fetchEmployeeAccountInfoByAdmin = async (
  params: string,
): Promise<EmployeeAccountData> => {
  const response = await instance.get(`/console/admin-employee/${params}`);
  return response.data;
};

const updateStatusAccountByAdmin = async (
  params: ChangeStatus,
): Promise<ChangeStatus> => {
  const newParams = { ...params };
  delete newParams.userUuid;
  const response = await instance.put(
    `/console/admin-employee/${params.userUuid}/status`,
    newParams,
  );
  return response.data;
};

export default {
  CreateEmployeeAccount,
  updateEmployeeAccount,
  fetchEmployeeAccountList,
  fetchEmployeeAccountInfo,
  updateStatusAccount,
  CreateEmployeeAccountByAdmin,
  updateEmployeeAccountByAdmin,
  fetchEmployeeAccountListByAdmin,
  fetchEmployeeAccountInfoByAdmin,
  updateStatusAccountByAdmin,
};
