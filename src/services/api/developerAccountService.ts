import { DeveloperAccountInfor } from 'app/pages/ManageUsers/DeveloperAccount/DeveloperAccountEdit/slice/types';
import { Pageable } from 'types';
import {
  ChangeStatus,
  DeveloperAccountForm,
  DeveloperAccountList,
  FilterDevelopAccountParams,
} from 'types/DeveloperAccountManagement';
import { RegisterPartnerParams } from 'types/RegisterPartnerParams';

import { createService } from './axios';

const baseURL = process.env.REACT_APP_API_URL;
const instance = createService(baseURL);

export const serialize = (params: any) => {
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

const fetchDeveloperAccountList = async (
  params: FilterDevelopAccountParams,
): Promise<Pageable<DeveloperAccountList>> => {
  const newParams = { ...params };
  const response = await instance.get(
    `/console/developer-accounts?${serialize(newParams)}`,
  );
  return response.data;
};

const fetchDeveloperAccountInfo = async (
  params: string,
): Promise<DeveloperAccountInfor> => {
  const response = await instance.get(`/console/developer-account/${params}`);
  return response.data;
};

const updateStatusAcount = async (
  params: ChangeStatus,
): Promise<ChangeStatus> => {
  const newParams = { ...params };
  delete newParams.userUuid;
  const response = await instance.put(
    `/console/developer-account/${params.userUuid}/status`,
    newParams,
  );
  return response.data;
};

const verifyAccount = async (params: ChangeStatus): Promise<ChangeStatus> => {
  const newParams = { ...params };
  delete newParams.userUuid;
  const response = await instance.put(
    `/console/developer-account/${params.userUuid}/verification`,
    newParams,
  );
  return response.data;
};

const createDeveloperAccount = async (
  body: DeveloperAccountForm | RegisterPartnerParams,
): Promise<DeveloperAccountList> => {
  const response = await instance.post(`/console/developer-account`, body);
  return response.data;
};

const editDeveloperAccountInfo = async (
  params: DeveloperAccountList,
): Promise<DeveloperAccountList> => {
  const newParams = { ...params };
  delete newParams.userUuid;
  const response = await instance.put(
    `/console/developer-account/${params?.userUuid}`,
    newParams,
  );
  return response.data;
};

export default {
  fetchDeveloperAccountList,
  fetchDeveloperAccountInfo,
  updateStatusAcount,
  verifyAccount,
  createDeveloperAccount,
  editDeveloperAccountInfo,
};
