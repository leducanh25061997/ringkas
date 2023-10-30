import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

import { initialState } from '.';

const selectSlice = (state: RootState) =>
  state.createBranchBankPartner || initialState;

export const selectBranchBankParnerManagementCreate = createSelector(
  [selectSlice],
  state => state,
);
