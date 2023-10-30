import {
  BankTaskItem,
  BankTaskUpdateStatus,
  DocsParams,
} from 'app/pages/ManageUsers/BankAccount/BankTasks/Task/slice/type';
import { axiosClient, createService } from './axios';
import {
  KprFilter,
  KprPayload,
  KprResponse,
} from '../../app/pages/ManageUsers/CustomerAccount/KprRegister/slice/types';
import { serialize } from './developerAccountService';

const baseURL = process.env.REACT_APP_API_URL;
const instance = createService(baseURL);

const getBankTasks = async (applicationId: string): Promise<BankTaskItem[]> => {
  const response = await instance.get(
    `/customer/application/${applicationId}/bank-tasks`,
  );
  return response.data;
};

const updateStatusBankTask = async (
  body: BankTaskUpdateStatus,
): Promise<BankTaskItem[]> => {
  const response = await instance.post(
    `/customer/application/${body.applicationId}/bank-verification`,
    body,
  );
  return response.data;
};

const downloadDocsByType = async (
  params: DocsParams,
): Promise<BankTaskItem[]> => {
  const _applicationId = params.applicationId;
  // @ts-ignore
  delete params.applicationId;
  const response = await instance.get(
    `/customer/application/${_applicationId}/document/download`,
    { params },
  );
  return response.data;
};

const getCustomerDocs = async (params: KprFilter): Promise<KprResponse> => {
  const { id } = params;
  delete params.id;
  const response = await axiosClient.get(
    `/customer/application/${id}/verifications?${serialize(params)}`,
  );
  return response.data;
};

export default {
  getBankTasks,
  updateStatusBankTask,
  downloadDocsByType,
  getCustomerDocs,
};
