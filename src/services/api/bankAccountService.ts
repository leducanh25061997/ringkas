import {
  BankAccountForm,
  BankAccountInfo,
  BankAccountListItem,
} from 'types/BankAccountManagement';
import { CreateBankAccountManagement } from 'app/pages/ManageUsers/BankAccount/HQBankPartnerManagement/CreateHqBankAccount/slice/types';
import { BankHQAccounts } from 'app/pages/ManageUsers/BankAccount/BranchBankPartnerManagement/CreateBranchBankAccount/slice/types';

import { axiosClient, createService } from './axios';
import Notifier from '../../app/pages/Notifier';
import { ChangeStatus } from '../../types/DeveloperAccountManagement';
import { RegisterPartnerParams } from 'types/RegisterPartnerParams';
import { Pageable } from 'types';
import { FilterPartnerParams } from 'types/PartnerAccountManagement';

const baseURL = process.env.REACT_APP_API_URL;
const instance = createService(baseURL);

const createBankAccount = async (
  params: CreateBankAccountManagement | RegisterPartnerParams,
): Promise<CreateBankAccountManagement> => {
  const response = await axiosClient.post('/console/bank-account', params);
  return response.data;
};

const fetchBankAccountInfo = async (
  params: string,
): Promise<BankAccountInfo> => {
  const response = await instance.get(`console/bank-account/${params}`);
  return response.data;
};

const getListBanks = async (
  params: FilterPartnerParams,
): Promise<Pageable<BankAccountListItem>> => {
  const response = await axiosClient.get('/console/banks', {
    params,
  });
  return response.data;
};

const updateBankAccountInfo = async (
  params: BankAccountForm,
): Promise<BankAccountInfo> => {
  try {
    const newParams = { ...params };
    delete newParams.userUuid;
    const response = await instance.put(
      `/console/bank-account/${params?.userUuid}`,
      newParams,
    );
    Notifier.addNotifySuccess({
      messageId: 'success.updatedBankBranchSuccess',
    });
    return response.data;
  } catch (e) {
    Notifier.addNotifyError({ messageId: 'error.updatedBankBranchFailed' });
    throw new Error(`Something wrong: ${e}`);
  }
};

const fetchProvinces = async (): Promise<string[]> => {
  const response = await instance.get(`/provinces`);
  return response.data;
};

const fechCities = async (provinceName: string): Promise<string[]> => {
  const response = await instance.get(`/province/${provinceName}/cities`);
  return response.data;
};

const fetchHeadQuarters = async (): Promise<BankHQAccounts[]> => {
  const response = await instance.get(`/console/bank-hq-accounts`);
  return response.data.data;
};

const updateStatusBankAccount = async (
  params: ChangeStatus,
): Promise<ChangeStatus> => {
  const newParams = { ...params };
  delete newParams.userUuid;
  const response = await instance.put(
    `/console/bank-account/${params.userUuid}/status`,
    newParams,
  );
  return response.data;
};

const verifyAccount = async (params: ChangeStatus): Promise<ChangeStatus> => {
  const newParams = { ...params };
  delete newParams.userUuid;
  const response = await axiosClient.put(
    `/console/bank-account/${params.userUuid}/verification`,
    newParams,
  );
  return response.data;
};

export default {
  createBankAccount,
  fetchBankAccountInfo,
  updateBankAccountInfo,
  fetchProvinces,
  fechCities,
  fetchHeadQuarters,
  updateStatusBankAccount,
  verifyAccount,
  getListBanks,
};
