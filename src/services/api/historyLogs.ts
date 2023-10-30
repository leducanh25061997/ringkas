import { axiosClient } from './axios';
import {
  HistoryLogsParams,
  HistoryLogsResponse,
} from '../../app/pages/ManageUsers/CustomerAccount/CustomerInformation/CustomerDetails/HistoryLog/slice/types';

const getHistoryLogs = async (
  params: HistoryLogsParams,
): Promise<HistoryLogsResponse[]> => {
  const response = await axiosClient.get(`/audit-log/logs`, { params });
  return response.data;
};

const downloadCsv = async (params: HistoryLogsParams): Promise<any> => {
  const response = await axiosClient.get(`/audit-log/logs/report`, { params });
  return response.data;
};

export default {
  getHistoryLogs,
  downloadCsv,
};
