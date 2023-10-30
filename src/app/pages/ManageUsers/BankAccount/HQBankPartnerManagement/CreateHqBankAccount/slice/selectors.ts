import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

import { initialState } from '.';

const selectSlice = (state: RootState) =>
  state.createHqBankPartner || initialState;

export const selectHqBankParnerManagementCreate = createSelector(
  [selectSlice],
  state => state,
);
