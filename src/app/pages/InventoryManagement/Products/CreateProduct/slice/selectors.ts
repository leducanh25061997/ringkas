import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

import { initialState } from './index';

const selectSlice = (state: RootState) => state.productState || initialState;

export const selectProductManagementCreate = createSelector(
  [selectSlice],
  state => state,
);
