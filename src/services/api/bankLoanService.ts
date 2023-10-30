import { Pageable } from 'types';
import {
  BankLoanForm,
  ChangeKprProgramStatus,
  FilterKprProgramParams,
} from 'types/BankLoanManagement';
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

const fetchKprProgramList = async (
  params: FilterKprProgramParams,
): Promise<Pageable<BankLoanForm>> => {
  const newParams = { ...params };
  const response = await instance.get(
    `/console/bank/${newParams.uuid}/loans?${serialize(newParams)}`,
  );
  return response.data;
};

const createKprProgram = async (
  params: BankLoanForm,
): Promise<BankLoanForm> => {
  const response = await instance.post(
    `/console/bank/${params.uuid}/loan`,
    params,
  );
  return response.data;
};

const updateKprProgram = async (
  params: BankLoanForm,
): Promise<BankLoanForm> => {
  const newParams = { ...params };
  delete newParams.id;
  const response = await instance.put(
    `/console/bank-loan/${params.id}`,
    newParams,
  );
  return response.data;
};

const updateKprProgramStatus = async (
  params: ChangeKprProgramStatus,
): Promise<ChangeKprProgramStatus> => {
  const newParams = { ...params };
  delete newParams.kprProgramId;
  const response = await instance.put(
    `/console/bank/loan/${params.kprProgramId}/status`,
    newParams,
  );
  return response.data;
};

export default {
  fetchKprProgramList,
  createKprProgram,
  updateKprProgram,
  updateKprProgramStatus,
};
