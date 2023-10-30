import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { Pageable } from 'types';
import { ChangeStatus } from 'types/DeveloperAccountManagement';
import {
  EmployeeAccountData,
  EmployeeAccountDataForm,
} from 'types/EmployeeAccountManagement';

import { employeeAccountManagementSaga } from './saga';
import { EmployeeAccountState } from './types';

export const initialState: EmployeeAccountState = {};

const slice = createSlice({
  name: 'employeeAccountManagement',
  initialState,
  reducers: {
    fetchEmployeeAccountList(state, action) {
      state.isLoading = true;
    },
    fetchEmployeeAccountListSuccess(
      state,
      action: PayloadAction<Pageable<EmployeeAccountData>>,
    ) {
      state.employeeAccountManagement = action.payload;
      state.isLoading = false;
    },
    fetchEmployeeAccountListFailed(state) {
      state.isLoading = false;
    },
    createEmployeeAccount(state, action) {
      state.isLoading = true;
    },
    createEmployeeAccountSuccess(
      state,
      action: PayloadAction<EmployeeAccountDataForm>,
    ) {
      state.isLoading = false;
    },
    createEmployeeAccountFailed(state) {
      state.isLoading = false;
    },
    fetchEmployeeAccountInfo(state, action) {},
    fetchEmployeeAccountInfoSuccess(
      state,
      action: PayloadAction<EmployeeAccountData>,
    ) {
      state.employeeAccountInfo = action.payload;
    },
    updateEmployeeAccount(state, action) {
      state.isLoading = true;
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
  },
});

export const { actions: developerAccountManagementActions } = slice;

export const useEmployeeAccountManagementSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: employeeAccountManagementSaga });
  return { actions: slice.actions };
};
