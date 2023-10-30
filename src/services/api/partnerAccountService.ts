import {
  ProcessVerificationParams,
  VerificationResponse,
} from 'app/pages/ManageUsers/PartnerAccount/PartnerDataVerification/slice/types';
import { Pageable } from 'types';
import {
  FilterPartnerParams,
  PartnerAccountForm,
  PartnerDetails,
} from 'types/PartnerAccountManagement';
import { PartnerInformation } from '../../app/pages/ManageUsers/PartnerInfomation/Component/types';
import Notifier from '../../app/pages/Notifier';
import { ChangeStatus } from '../../types/DeveloperAccountManagement';
import { axiosClient, createService } from './axios';
import { BankAccountListItem } from 'types/BankAccountManagement';

const baseURL = process.env.REACT_APP_API_URL;
const instance = createService(baseURL);

const registerPartnerAccount = async (
  params: PartnerAccountForm,
): Promise<PartnerAccountForm> => {
  const response = await instance.post(
    '/console/client-account/registration',
    params,
  );
  return response.data;
};

const createPartnerAccount = async (
  params: PartnerAccountForm,
): Promise<PartnerAccountForm> => {
  const response = await instance.post('/console/partner-account', params);
  return response.data;
};

const getListPartner = async (
  params: FilterPartnerParams,
): Promise<Pageable<PartnerAccountForm>> => {
  const response = await axiosClient.get('/console/partners', {
    params,
  });
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

// partner information

const getPartnerInformation = async (
  userUuid: string,
): Promise<PartnerDetails> => {
  try {
    const response = await axiosClient.get(`/console/partner/${userUuid}`);
    return response.data;
  } catch (e) {
    throw new Error(`Something wrong: ${e}`);
  }
};

const updatePartnerAccountStatus = async (
  params: ChangeStatus,
): Promise<PartnerInformation> => {
  try {
    const response = await axiosClient.put(
      `/console/partner-account/${params.userUuid}/status`,
      { status: params.status },
    );
    Notifier.addNotifySuccess({
      message: 'Updated account status successfully',
    });
    return response.data;
  } catch (e: any) {
    Notifier.addNotifyError({
      message: e.response.data.messages[0],
    });
    throw new Error(`Something wrong: ${e}`);
  }
};

const updatePartnerAccountInformation = async (
  params: PartnerInformation,
): Promise<PartnerInformation> => {
  const response = await axiosClient.put(
    `/console/partner-account/${params.userUuid}`,
    params,
  );
  return response.data;
};

const verifyPartnerAccount = async (
  params: ChangeStatus,
): Promise<PartnerInformation> => {
  try {
    const response = await axiosClient.put(
      `/console/partner-account/${params.userUuid}/verification`,
      {
        verificationStatus: params.status,
      },
    );
    Notifier.addNotifySuccess({
      message: 'Verified partner account successfully',
    });
    return response.data;
  } catch (e: any) {
    Notifier.addNotifyError({
      message: e.response.data.messages[0],
    });
    throw new Error(`Something wrong: ${e}`);
  }
};

const getKycPartnerVerificationData = async (
  userUuid: string | number,
): Promise<VerificationResponse> => {
  const response = await axiosClient.get(
    `/console/partner/${userUuid}/verifications?status=SUBMITTED&status=REQUEST_UPDATE&size=999`,
  );
  return response.data;
};

const processVerification = async (
  data: ProcessVerificationParams,
): Promise<any> => {
  const response = await axiosClient.post(
    `/console/partner/${data.userUuid}/verifications`,
    data.data,
  );
  return response.data;
};

export default {
  createPartnerAccount,
  getListPartner,
  registerPartnerAccount,
  getPartnerInformation,
  updatePartnerAccountStatus,
  verifyPartnerAccount,
  updatePartnerAccountInformation,
  getKycPartnerVerificationData,
  processVerification,
};
