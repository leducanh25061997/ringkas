import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { BankAccountInfo } from 'types/BankAccountManagement';
import { ChangeStatus } from 'types/DeveloperAccountManagement';

import { bankAccountInfoSaga } from './saga';
import { HQBankAccountInfoState } from './types';

export const initialState: HQBankAccountInfoState = {};

const slice = createSlice({
  name: 'hqBankAccount',
  initialState,
  reducers: {
    fetchBankAccountInfo: {
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
    fetchBankAccountInfoSuccess(state, action: PayloadAction<BankAccountInfo>) {
      state.isLoading = false;
      state.hqBankAccountInfo = action.payload;
    },

    updateStatusAcount: {
      reducer(state) {
        return state;
      },
      prepare(params: ChangeStatus, meta?: () => void) {
        return { payload: params, meta };
      },
    },
    updateStatusAccountSuccess(state, action: PayloadAction<ChangeStatus>) {},
    updateStatusAccountFailed() {},

    // update bank acc
    updateBankAccountInfo(state, action) {
      state.isLoading = true;
    },
    updateBankAccountInfoSuccess(state, action) {
      state.isLoading = false;
    },
    updateBankAccountInfoFailed(state, action) {
      state.isLoading = false;
    },

    // verification bank account
    verifyBankAccount: {
      reducer(state) {
        return {
          ...state,
          isLoading: true,
        };
      },
      prepare(params: ChangeStatus, meta?: () => void) {
        return { payload: params, meta };
      },
    },
    verifyBankAccountSuccess(state, action) {
      state.isLoading = false;
    },
    verifyBankAccountFailed(state) {
      state.isLoading = false;
    },
  },
});

export const { actions: bankAccountInfoActions } = slice;

export const useBankAccountInfoSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: bankAccountInfoSaga });
  return { actions: slice.actions };
};
