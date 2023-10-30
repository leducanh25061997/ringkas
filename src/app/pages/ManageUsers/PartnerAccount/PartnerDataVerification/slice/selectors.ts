import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

import { initialState } from '.';

const selectSlice = (state: RootState) =>
  state.partnerDataVerification || initialState;

export const selectPartnerVerificationDetail = createSelector(
  [selectSlice],
  state => state,
);
