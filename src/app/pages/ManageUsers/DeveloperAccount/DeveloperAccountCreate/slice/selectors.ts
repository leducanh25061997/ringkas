import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

import { initialState } from '.';

const selectSlice = (state: RootState) =>
  state.developerAccountCreate || initialState;

export const selectDeveloperAccountCreate = createSelector(
  [selectSlice],
  state => state,
);
