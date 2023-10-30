import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

import { initialState } from '.';

const selectSlice = (state: RootState) => state.signUp || initialState;
export const selectClubManagementCreate = createSelector(
  [selectSlice],
  state => state,
);

export const selectClub = createSelector([selectSlice], state => state);
