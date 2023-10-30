import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

import { initialState } from '.';

const selectSlice = (state: RootState) =>
  state.productManagement || initialState;

export const selectProductManagement = createSelector(
  [selectSlice],
  state => state,
);
