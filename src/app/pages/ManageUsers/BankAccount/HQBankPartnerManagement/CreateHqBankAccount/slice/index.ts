import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import { createHqBankPartnerSaga } from './saga';

import { CreateBankAccountManagement, CreateHqBankPartner } from './types';

export const initialState: CreateHqBankPartner = {};

const slice = createSlice({
  name: 'createHqBankPartner',
  initialState,
  reducers: {
    createBankAccount(state, action: PayloadAction<any>) {
      state.isLoading = true;
    },
    createBankAccountSuccess(state, action: PayloadAction<any>) {
      state.isLoading = false;
    },
    createBankAccountFailed(state) {
      state.isLoading = false;
    },
  },
});

export const { actions: createHqBankPartnerActions } = slice;

export const useCreateHqBankPartnerSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: createHqBankPartnerSaga });
  return { actions: slice.actions };
};
