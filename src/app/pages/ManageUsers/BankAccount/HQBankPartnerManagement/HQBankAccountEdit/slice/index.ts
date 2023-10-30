import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { Pageable } from 'types';
import { BankAccountInfo } from 'types/BankAccountManagement';
import { ChangeStatus } from 'types/DeveloperAccountManagement';

import { bankAccountInfoSaga } from './saga';
import { HQBankAccountInfoState } from './types';

export const initialState: HQBankAccountInfoState = {};

const slice = createSlice({
  name: 'hqBankAccount',
  initialState,
  reducers: {
    fetchBankAccountInfo(state, action) {},
    fetchBankAccountInfoSuccess(state, action: PayloadAction<BankAccountInfo>) {
      state.hqBankAccountInfo = action.payload;
    },

    updateStatusAccount: {
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
    updateStatusAccountSuccess(state, action: PayloadAction<ChangeStatus>) {},
    updateStatusAccountFailed() {},

    updateHQBankRequest(state, action) {
      state.isLoading = true;
    },
    updateHQBankRequestSuccess(state, action: PayloadAction<BankAccountInfo>) {
      state.isLoading = false;
    },
    updateHQBankRequestFailed(state) {
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
