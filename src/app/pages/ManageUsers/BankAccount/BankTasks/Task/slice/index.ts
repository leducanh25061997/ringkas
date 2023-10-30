import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import { bankTaskSaga } from './saga';
import {
  BankTaskItem,
  BankTaskState,
  BankTaskUpdateStatus,
  DocsParams,
} from './type';
import {
  KprFilter,
  KprParams,
} from '../../../../CustomerAccount/KprRegister/slice/types';

export const initialState: BankTaskState = {};

const slice = createSlice({
  name: 'bankTask',
  initialState,
  reducers: {
    getBankTasks: {
      reducer(state) {
        return {
          ...state,
          isLoading: true,
        };
      },
      prepare(params: string, meta?: () => void) {
        return { payload: params, meta };
      },
    },
    getBankTasksSuccess(state, action: PayloadAction<BankTaskItem[]>) {
      state.bankTaskList = action.payload;
      state.isLoading = false;
    },
    getBankTasksFailed(state) {
      state.isLoading = false;
    },
    updateStatusBankTask: {
      reducer(state) {
        return {
          ...state,
          isLoading: true,
        };
      },
      prepare(
        params: BankTaskUpdateStatus,
        meta?: () => void,
        error?: () => void,
      ) {
        return { payload: params, meta, error };
      },
    },
    updateStatusBankTaskSuccess(state) {
      state.isLoading = false;
    },
    updateStatusBankTaskFailed(state) {
      state.isLoading = false;
    },

    // get documents
    downloadDocsByType: {
      reducer(state) {
        return {
          ...state,
          // isLoading: true,
        };
      },
      prepare(params: DocsParams, meta?: () => void, error?: () => void) {
        return { payload: params, meta, error };
      },
    },

    getCustomerDocs: {
      reducer(state) {
        return {
          ...state,
          isCustomerDocsLoading: true,
          isGetKprSuccess: false,
        };
      },
      prepare(payload: KprFilter, meta?: () => void, error?: () => void) {
        return { payload, meta, error };
      },
    },
    getCustomerDocsSuccess(state, action: PayloadAction<KprParams[]>) {
      state.isCustomerDocsLoading = false;
      state.isCustomerDocsSuccess = true;
      state.customerDocuments = action.payload;
    },
    getCustomerDocsFailed(state) {
      state.isCustomerDocsLoading = false;
      state.isCustomerDocsSuccess = false;
    },
  },
});

export const { actions: bankTaskActions } = slice;

export const useBankTaskSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: bankTaskSaga });
  return { actions: slice.actions };
};
