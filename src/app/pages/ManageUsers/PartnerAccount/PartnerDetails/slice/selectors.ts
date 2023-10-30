import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

import { initialState } from '.';

const selectSlice = (state: RootState) => state.partnerDetails || initialState;

export const selectPartnerDetails = createSelector(
  [selectSlice],
  state => state,
);
