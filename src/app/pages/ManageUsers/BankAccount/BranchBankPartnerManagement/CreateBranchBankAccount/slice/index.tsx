import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import { createBranchBankPartnerSaga } from './saga';

import {
  BankHQAccounts,
  CreateBranchBankAccountManagement,
  CreateBranchBankPartner,
} from './types';

export const initialState: CreateBranchBankPartner = {};

const slice = createSlice({
  name: 'createBranchBankPartner',
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

    fetchProvinces() {},
    fetchProvinceSuccess(state, action: PayloadAction<string[]>) {
      state.provinces = action.payload;
    },

    fechCities(state, action: PayloadAction<string>) {},
    fechCitiesSuccess(state, action: PayloadAction<string[]>) {
      state.cities = action.payload;
    },

    fetchHeadQuarters() {},
    fetchHeadQuartersSuccess(state, action: PayloadAction<BankHQAccounts[]>) {
      state.headquarters = action.payload;
    },
  },
});

export const { actions: createBranchBankPartnerActions } = slice;

export const useCreateBranchBankPartnerSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: createBranchBankPartnerSaga });
  return { actions: slice.actions };
};
