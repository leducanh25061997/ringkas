import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

import { initialState } from '.';

const selectSlice = (state: RootState) =>
  state.registerNewClient || initialState;

export const selectRegisterNewClient = createSelector(
  [selectSlice],
  state => state,
);
