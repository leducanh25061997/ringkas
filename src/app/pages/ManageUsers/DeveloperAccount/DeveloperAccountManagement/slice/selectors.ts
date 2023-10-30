import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

import { initialState } from '.';

const selectSlice = (state: RootState) =>
  state.developerAccountManagement || initialState;

export const selectDeveloperAccountList = createSelector(
  [selectSlice],
  state => state,
);
