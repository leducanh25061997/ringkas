import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

import { initialState } from '.';

const selectSlice = (state: RootState) =>
  state.partnerAccountManagement || initialState;

export const selectPartnerManagement = createSelector(
  [selectSlice],
  state => state,
);
