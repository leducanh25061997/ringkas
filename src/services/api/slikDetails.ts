import { VerificationResponse } from 'app/pages/ManageUsers/CustomerAccount/PreKprVerification/types';
import { axiosClient } from './axios';

const getSlikData = async (applicationId: string): Promise<any> => {
  const response = await axiosClient.get(
    `/verification/user-score/${applicationId}/slik`,
  );
  return response.data;
};

const getKycData = async (
  params: string | number,
): Promise<VerificationResponse> => {
  const response = await axiosClient.get(
    `/customer/application/${params}/verifications`,
  );
  return response.data;
};

export default {
  getSlikData,
  getKycData,
};
