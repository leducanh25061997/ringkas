import { axiosClient } from './axios';
import {
  KprFilter,
  KprPayload,
  KprResponse,
} from '../../app/pages/ManageUsers/CustomerAccount/KprRegister/slice/types';
import { serialize } from './developerAccountService';

const updateKpr = async (params: KprPayload): Promise<KprResponse> => {
  const _params = params.params;
  const response = await axiosClient.post(
    `/customer/application/${params.applicationId}/verifications`,
    _params,
  );
  return response.data;
};

const getKpr = async (params: KprFilter): Promise<KprResponse> => {
  const { id } = params;
  delete params.id;
  const response = await axiosClient.get(
    `/customer/application/${id}/verifications?${serialize(params)}`,
  );
  return response.data;
};

export default {
  updateKpr,
  getKpr,
};
