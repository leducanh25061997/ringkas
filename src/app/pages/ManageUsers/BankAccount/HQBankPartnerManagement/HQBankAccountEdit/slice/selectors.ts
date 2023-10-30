import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

import { initialState } from '.';

const selectSlice = (state: RootState) => state.hqBankAccount || initialState;

export const selectBankAccountInfo = createSelector(
  [selectSlice],
  state => state,
);
