import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

import { initialState } from '.';

const selectSlice = (state: RootState) =>
  state.partnerInformationDetail || initialState;

export const selectPartnerInformationDetail = createSelector(
  [selectSlice],
  state => state,
);
