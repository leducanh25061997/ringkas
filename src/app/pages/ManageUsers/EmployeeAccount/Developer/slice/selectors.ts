import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

import { initialState } from '.';

const selectSlice = (state: RootState) =>
  state.employeeAccountManagement || initialState;

export const selectEmployeeAccountList = createSelector(
  [selectSlice],
  state => state,
);
