import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { Pageable } from 'types';
import { DeveloperAccountList } from 'types/DeveloperAccountManagement';

import { developerAccountManagementSaga } from './saga';
import { DeveloperAccountState } from './types';

export const initialState: DeveloperAccountState = {};

const slice = createSlice({
  name: 'developerAccountManagement',
  initialState,
  reducers: {
    fetchDeveloperAccountList(state, action) {
      state.isLoading = true;
    },
    fetchDeveloperAccountListSuccess(
      state,
      action: PayloadAction<Pageable<DeveloperAccountList>>,
    ) {
      state.developerAccountManagement = action.payload;
      state.isLoading = false;
    },
    fetchDeveloperAccountListFailed(state) {
      state.isLoading = false;
    },
  },
});

export const { actions: developerAccountManagementActions } = slice;

export const useDeveloperAccountManagementSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: developerAccountManagementSaga });
  return { actions: slice.actions };
};
