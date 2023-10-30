import {
  AssessmentDataResponse,
  HousePriceResponse,
} from 'app/pages/ManageUsers/CustomerAccount/ScoringReady/slice/types';
import { axiosClient } from './axios';

const getAssessmentData = async (
  applicationId: string,
): Promise<AssessmentDataResponse> => {
  const response = await axiosClient.get(
    `/customer/application/${applicationId}/assessments`,
  );
  return response.data;
};

const postAssessment = async (payload: {
  applicationId: string;
  data: any;
}): Promise<any> => {
  const response = await axiosClient.post(
    `/customer/application/${payload.applicationId}/assessment-recommendation`,
    payload.data,
  );
  return response.data;
};

const getHouseData = async (
  applicationId: string,
): Promise<HousePriceResponse> => {
  const response = await axiosClient.get(
    `/customer/application/${applicationId}/preferences`,
  );
  return response.data;
};

export default {
  getAssessmentData,
  getHouseData,
  postAssessment,
};
