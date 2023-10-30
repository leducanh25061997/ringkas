import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

import { initialState } from '.';

const selectSlice = (state: RootState) =>
  state.editDevelopAccount || initialState;

export const selectDeveloperAccountEdit = createSelector(
  [selectSlice],
  state => state,
);
