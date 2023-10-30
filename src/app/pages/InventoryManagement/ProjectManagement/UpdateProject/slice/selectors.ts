import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

import { initialState } from '.';

const selectUpdateProjectSlice = (state: RootState) =>
  state.updateProject || initialState;

export const selectUpdateProject = createSelector(
  [selectUpdateProjectSlice],
  state => state,
);
