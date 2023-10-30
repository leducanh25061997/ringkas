import {
  CustomerDetails,
  CustomerPreference,
  GetProjectsParams,
  ProjectsResponse,
} from './../../app/pages/ManageUsers/CustomerAccount/slice/types';
import {
  CreateCustomerData,
  CustomerListResponse,
  FilterCustomerParams,
} from 'app/pages/ManageUsers/CustomerAccount/ListCustomer/types';
import {
  ApplicationDataSummary,
  VerificationResponse,
  VerificationStatusResponse,
} from 'app/pages/ManageUsers/CustomerAccount/PreKprVerification/types';
import { Customer } from 'types';
import {
  AccountKycParams,
  BankPreferenceForm,
  BankPreferenceFormType,
  CustomerAccountForm,
  CustomerKpr,
  CustomerKyc,
  CustomerKYC,
  CustomerKYCParams,
  CustomerProfile,
  CustomerProfileParams_formData,
  DeveloperTaskForm,
  DeveloperTaskUpdateForm,
  HousePriceForm,
} from 'types/CustomerManagement';
import { ChangeStatus } from 'types/DeveloperAccountManagement';
import { UpdateVerificationParams } from './../../app/pages/ManageUsers/CustomerAccount/PreKprVerification/types';

import { axiosClient } from './axios';
import {
  PropertyDetailForm,
  PropertyForm,
} from 'app/pages/InventoryManagement/Products/CreateProduct/slice/types';
import { FilterListParams } from '../../types/FilterParams';

const getListCustomer = async (
  params: FilterCustomerParams,
): Promise<CustomerListResponse> => {
  const response = await axiosClient.get('/customer/applications', { params });
  return response.data;
};

const createNewCustomer = async (data: CreateCustomerData): Promise<any> => {
  const response = await axiosClient.post('/customer/application', data);
  return response.data;
};

const getKycVerificationData = async (
  params: string | number,
): Promise<VerificationResponse> => {
  const response = await axiosClient.get(
    `/customer/application/${params}/verifications?status=SUBMITTED&status=REQUEST_UPDATE&size=999&categories=KYC`,
  );
  return response.data;
};

const getKycDataSummary = async (
  params: string | number,
): Promise<ApplicationDataSummary> => {
  const response = await axiosClient.get(`/customer/application/${params}`);
  return response.data;
};

const updateVerificationData = async (params: UpdateVerificationParams) => {
  await axiosClient.post(
    `/customer/application/${params.applicationId}/verifications`,
    params.data,
  );
};

const fetchCustomerInformation = async (params: string): Promise<Customer> => {
  const response = await axiosClient.get(`/customer/${params}`);
  return response.data;
};

const fetchCustometKycInfomation = async (
  params: string,
): Promise<Customer> => {
  const response = await axiosClient.get(`/customer/${params}/kyc`);
  return response.data;
};

const fetchCustomerApplicationKycDetail = async (
  params: string,
): Promise<Customer> => {
  const response = await axiosClient.get(
    `/customer/application/${params}/kyc?person=REQUESTER`,
  );
  return response.data;
};

const fetchCustomerApplicationKycDetailOfGuarantor = async (
  params: string,
): Promise<Customer> => {
  const response = await axiosClient.get(
    `/customer/application/${params}/kyc?person=GUARANTOR`,
  );
  return response.data;
};

const CreateCustomerProfile = async (
  params: CustomerProfileParams_formData,
): Promise<CustomerProfile> => {
  const response = await axiosClient.post(`/customer`, params);
  return response.data;
};

const CreateCustomerKYC = async (
  params: CustomerKYCParams,
): Promise<CustomerKYC> => {
  const response = await axiosClient.post(
    `/customer/${params.userUuid}/kyc/submission`,
    params,
  );
  return response.data;
};

const updateAccountStatus = async (
  params: ChangeStatus,
): Promise<ChangeStatus> => {
  const newParams = { ...params };
  delete newParams.userUuid;
  const response = await axiosClient.put(
    `/customer/${params.userUuid}/status`,
    newParams,
  );
  return response.data;
};

const updateAccountKycInfo = async (
  params: CustomerAccountForm,
): Promise<CustomerKyc> => {
  const newParams = { ...params };
  delete newParams.userUuid;
  const response = await axiosClient.post(
    `/customer/${params.userUuid}/kyc/submission`,
    newParams,
  );
  return response.data;
};

const updateAccountKprInfo = async (
  params: AccountKycParams,
): Promise<CustomerKpr> => {
  const newParams = { ...params };
  delete newParams.userUuid;
  const response = await axiosClient.post(
    `/customer/${params.userUuid}/kpr/submission`,
    newParams,
  );
  return response.data;
};

const getListBank = async (params: any): Promise<any> => {
  const response = await axiosClient.get('/console/bank-accounts', { params });
  return response.data;
};

const getListProject = async (
  params: GetProjectsParams,
): Promise<ProjectsResponse> => {
  const response = await axiosClient.get('/console/projects', {
    params: { ...params, size: 8 },
  });
  return response.data;
};

const getListProjectByOwner = async (
  params: FilterListParams,
): Promise<ProjectsResponse> => {
  const response = await axiosClient.get('/console/projects/by-owner', {
    params,
  });
  return response.data;
};

const getHousePrice = async (params: string): Promise<HousePriceForm> => {
  const response = await axiosClient.get(
    `/customer/application/${params}/simulation/house-price`,
  );
  return response.data;
};

const updateHousePrice = async (
  params: HousePriceForm,
): Promise<HousePriceForm> => {
  const newParams = { ...params };
  delete newParams.id;
  const response = await axiosClient.put(
    `/customer/application/property/${params.id}`,
    newParams,
  );
  return response.data;
};

const getDeveloperTask = async (
  params: string,
): Promise<DeveloperTaskForm[]> => {
  const response = await axiosClient.get(
    `customer/application/${params}/developer-tasks`,
  );
  return response.data;
};

const updateDeveloperTask = async (
  params: DeveloperTaskUpdateForm,
): Promise<DeveloperTaskForm> => {
  const newParams = { ...params };
  delete newParams.id;
  const response = await axiosClient.put(
    `customer/application/${params.id}/developer-verifications`,
    newParams.formData,
  );
  return response.data;
};

const developerDeclineApplication = async (
  id: string,
): Promise<CustomerDetails> => {
  const response = await axiosClient.post(
    `customer/application/${id}/developer-verification`,
    {
      action: 'REJECTED',
    },
  );
  return response.data;
};

const getPropertyByApplicationId = async (
  params: string,
): Promise<PropertyDetailForm> => {
  const response = await axiosClient.get(
    `/customer/application/${params}/property`,
  );
  return response.data;
};

const updatePropertyByApplicationId = async (
  params: PropertyForm,
): Promise<PropertyDetailForm> => {
  const newParams = { ...params };
  delete newParams.id;
  const response = await axiosClient.put(
    `/customer/application/${params.id}/property`,
    newParams,
  );
  return response.data;
};

const getCustomerPreference = async (
  params: string,
): Promise<CustomerPreference> => {
  const response = await axiosClient.get(
    `/customer/application/${params}/preferences`,
  );
  return response.data;
};

const registerNewClient = async (data: object): Promise<any> => {
  const response = await axiosClient.post('/console/client-account', data);
  return response.data;
};

const getCustomerDetails = async (
  applicationId: string | number,
): Promise<CustomerDetails> => {
  const response = await axiosClient.get(
    `/customer/application/${applicationId}`,
  );
  return response.data;
};

const getBankPreference = async (
  params: string,
): Promise<BankPreferenceFormType> => {
  const response = await axiosClient.get(
    `/customer/application/${params}/banks`,
  );
  return response.data;
};

const updateBankPreference = async (
  params: BankPreferenceFormType,
): Promise<BankPreferenceFormType> => {
  const newParams = { ...params };
  delete newParams.id;
  const response = await axiosClient.put(
    `/customer/application/${params.id}/banks`,
    newParams,
  );
  return response.data;
};

const createBankPreference = async (
  params: BankPreferenceFormType,
): Promise<BankPreferenceFormType> => {
  const newParams = { ...params };
  delete newParams.id;
  const response = await axiosClient.post(
    `/customer/application/${params.id}/bank`,
    newParams,
  );
  return response.data;
};

export default {
  getListProjectByOwner,
  getCustomerPreference,
  getListProject,
  getListCustomer,
  createNewCustomer,
  fetchCustomerInformation,
  fetchCustometKycInfomation,
  getListBank,
  CreateCustomerProfile,
  CreateCustomerKYC,
  updateAccountStatus,
  updateAccountKycInfo,
  updateAccountKprInfo,
  getKycVerificationData,
  updateVerificationData,
  getKycDataSummary,
  getHousePrice,
  getDeveloperTask,
  updateDeveloperTask,
  developerDeclineApplication,
  getPropertyByApplicationId,
  updatePropertyByApplicationId,
  fetchCustomerApplicationKycDetail,
  fetchCustomerApplicationKycDetailOfGuarantor,
  registerNewClient,
  getCustomerDetails,
  updateHousePrice,
  getBankPreference,
  updateBankPreference,
  createBankPreference,
};
