import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import { manageBankSaga } from './saga';
import { ManageBankState, BankAccountListResponse } from './types';

export const initialState: ManageBankState = {
  data: [],
};

const slice = createSlice({
  name: 'manageBank',
  initialState,
  reducers: {
    getBankAccountList: {
      reducer(state) {
        return state;
      },
      prepare(params: any, meta: (loading: boolean) => void) {
        return { payload: params, meta };
      },
    },
    getBankAccountListSuccess(
      state,
      action: PayloadAction<BankAccountListResponse>,
    ) {
      state.data = action.payload.data;
      state.total = action.payload.total;
    },
  },
});

export const { actions: manageCustomerActions } = slice;

export const useManageBankSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: manageBankSaga });
  return { actions: slice.actions };
};
