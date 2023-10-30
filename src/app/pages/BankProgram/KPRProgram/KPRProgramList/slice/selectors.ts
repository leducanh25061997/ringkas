import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

import { initialState } from '.';

const selectSlice = (state: RootState) =>
  state.KprProgramManagement || initialState;

export const selectKprProgramList = createSelector(
  [selectSlice],
  state => state,
);
