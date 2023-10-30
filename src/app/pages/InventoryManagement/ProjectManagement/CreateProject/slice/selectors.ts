import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

import { initialState } from '.';

const selectCreateProjectSlice = (state: RootState) =>
  state.createProject || initialState;

export const selectCreateProject = createSelector(
  [selectCreateProjectSlice],
  state => state,
);
