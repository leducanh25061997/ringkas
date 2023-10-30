import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { Pageable } from 'types';
import {
  ChangeStatus,
  DeveloperAccountList,
} from 'types/DeveloperAccountManagement';

import { developerAccountInfoSaga } from './saga';
import { DeveloperAccountInfoState } from './types';

export const initialState: DeveloperAccountInfoState = {};

const slice = createSlice({
  name: 'developerAccountInfo',
  initialState,
  reducers: {
    fetchDeveloperAccountInfo(state, action) {},
    fetchDeveloperAccountInfoSuccess(
      state,
      action: PayloadAction<DeveloperAccountList>,
    ) {
      state.developerAccountInfo = action.payload;
    },

    updateStatusAcount: {
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

    verifyAccount: {
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
    verifyAccountSuccess(state, action: PayloadAction<ChangeStatus>) {},
    verifyAccountFailed() {},
  },
});

export const { actions: developerAccountInfoActions } = slice;

export const useDeveloperAccountInfoSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: developerAccountInfoSaga });
  return { actions: slice.actions };
};
