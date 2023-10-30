import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

import { initialState } from '.';

const selectSlice = (state: RootState) => state.manageCustomer || initialState;

export const selectManageCustomer = createSelector(
  [selectSlice],
  state => state,
);
