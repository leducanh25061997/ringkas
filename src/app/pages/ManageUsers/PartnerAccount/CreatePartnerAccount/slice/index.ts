import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import { createHqBankPartnerSaga } from './saga';

import { CreatePartnerAccountState } from './types';

export const initialState: CreatePartnerAccountState = {};

const slice = createSlice({
  name: 'createPartnerAccount',
  initialState,
  reducers: {
    createPartnerAccount(state, action: PayloadAction<any>) {
      state.isLoading = true;
    },
    createPartnerAccountSuccess(state, action: PayloadAction<any>) {
      state.isLoading = false;
    },
    createPartnerAccountFailed(state) {
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
