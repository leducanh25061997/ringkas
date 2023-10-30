import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

import { initialState } from '.';

const selectSlice = (state: RootState) =>
  state.developerAccountInfo || initialState;

export const selectDeveloperAccountInfo = createSelector(
  [selectSlice],
  state => state,
);
