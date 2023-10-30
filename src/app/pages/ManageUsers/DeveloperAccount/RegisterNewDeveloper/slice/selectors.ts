import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

import { initialState } from '.';

const selectSlice = (state: RootState) =>
  state.registerNewDeveloper || initialState;

export const selectRegisterNewDeveloper = createSelector(
  [selectSlice],
  state => state,
);
