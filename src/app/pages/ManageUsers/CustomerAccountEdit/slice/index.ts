import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';

import { Customer } from 'types';
import {
  CustomerApplicationKycDetail,
  CustomerKpr,
  CustomerKyc,
  CustomerKYC,
} from 'types/CustomerManagement';
import { ChangeStatus } from 'types/DeveloperAccountManagement';

import { customerInformationSaga } from './saga';

import { CustomerUpdateState } from './types';

export const initialState: CustomerUpdateState = {};

const slice = createSlice({
  name: 'customerAccountUpdate',
  initialState,
  reducers: {
    fetchCustomerInformation: (state, action: PayloadAction<string>) => {},
    fetchCustomerInformationSuccess: (
      state,
      action: PayloadAction<Customer>,
    ) => {
      state.customerInformation = action.payload;
    },
    fetchCustomerKycInformation: (state, action: PayloadAction<string>) => {},
    fetchCustomerKycInformationSuccess: (
      state,
      action: PayloadAction<Customer>,
    ) => {
      state.customerKycInformation = action.payload;
    },
    fetchCustomerKprInformation: (state, action: PayloadAction<string>) => {},
    fetchCustomerKprInformationSuccess: (
      state,
      action: PayloadAction<CustomerKpr>,
    ) => {
      state.customerKprInformation = action.payload;
    },
    updateAccountStatus: {
      reducer(state) {
        return state;
      },
      prepare(
        params: ChangeStatus,
        meta?: (ChangeStatus?: ChangeStatus) => void,
      ) {
        return { payload: params, meta };
      },
    },
    updateAccountStatusSuccess(state, action: PayloadAction<ChangeStatus>) {},
    updateAccountStatusFailed() {},

    updateCustomerKYCRequest(state, action) {
      state.isLoading = true;
    },
    updateCustomerKYCRequestSuccess(state, action: PayloadAction<CustomerKyc>) {
      state.isLoading = false;
      state.customerKycInformation = action.payload;
    },
    updateCustomerKYCRequestFailed(state) {
      state.isLoading = false;
    },

    updateCustomerKPRRequest(state, action) {
      state.isLoading = true;
    },
    updateCustomerKPRRequestSuccess(state, action: PayloadAction<CustomerKpr>) {
      state.isLoading = false;
      state.customerKprInformation = action.payload;
    },
    updateCustomerKPRRequestFailed(state) {
      state.isLoading = false;
    },

    fetchCustomerApplicationKycDetail: (
      state,
      action: PayloadAction<string>,
    ) => {},
    fetchCustomerApplicationKycDetailOfGuarantor: (
      state,
      action: PayloadAction<string>,
    ) => {},
    fetchCustomerApplicationKycDetailSuccess: (
      state,
      action: PayloadAction<CustomerApplicationKycDetail>,
    ) => {
      state.customerApplicationDetail = action.payload;
    },
    fetchCustomerApplicationKycDetailOfGuarantorSuccess: (
      state,
      action: PayloadAction<CustomerApplicationKycDetail>,
    ) => {
      state.customerApplicationDetailOfGuarantor = action.payload;
    },
  },
});

export const { actions: customerInformationActions } = slice;

export const useCustomerInformationSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: customerInformationSaga });
  return { actions: slice.actions };
};
