import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

import { initialState } from '.';

const selectSlice = (state: RootState) =>
  state.projectManagement || initialState;

export const selectProjectList = createSelector([selectSlice], state => state);
