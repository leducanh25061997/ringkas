import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

import { initialState } from '.';

const selectProjectInformationSlice = (state: RootState) =>
  state.projectInformation || initialState;

export const selectProjectInformation = createSelector(
  [selectProjectInformationSlice],
  state => state,
);
