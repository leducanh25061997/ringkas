import { PayloadAction } from '@reduxjs/toolkit';
import { Pageable } from 'types';
import { PartnerAccountForm } from 'types/PartnerAccountManagement';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import { manageBankSaga } from './saga';
import { ManagePartnerState } from './types';

export const initialState: ManagePartnerState = {
  data: [],
};

const slice = createSlice({
  name: 'partnerAccountManagement',
  initialState,
  reducers: {
    getPartnerAccountList: {
      reducer(state) {
        return state;
      },
      prepare(params: any, meta: (loading: boolean) => void) {
        return { payload: params, meta };
      },
    },
    getPartnerAccountListSuccess(
      state,
      action: PayloadAction<Pageable<PartnerAccountForm>>,
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
