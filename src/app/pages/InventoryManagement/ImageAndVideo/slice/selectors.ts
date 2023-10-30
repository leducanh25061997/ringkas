import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

import { initialState } from '.';

const selectMediaSlice = (state: RootState) =>
  state.uploadMedia || initialState;

export const selectMediaCreate = createSelector(
  [selectMediaSlice],
  state => state,
);
