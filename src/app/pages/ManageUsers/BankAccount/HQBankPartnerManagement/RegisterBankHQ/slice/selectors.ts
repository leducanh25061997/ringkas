import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

import { initialState } from '.';

const selectSlice = (state: RootState) => state.registerBankHQ || initialState;

export const selectRegisterBankHq = createSelector(
  [selectSlice],
  state => state,
);
