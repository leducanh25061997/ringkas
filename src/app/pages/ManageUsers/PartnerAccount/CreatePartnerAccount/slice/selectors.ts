import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

import { initialState } from '.';

const selectSlice = (state: RootState) =>
  state.createPartnerAccount || initialState;

export const selectCreatePartner = createSelector(
  [selectSlice],
  state => state,
);
