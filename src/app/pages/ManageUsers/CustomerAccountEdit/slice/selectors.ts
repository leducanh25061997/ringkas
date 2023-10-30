import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

import { initialState } from '.';

const selectCustomerInformationSlice = (state: RootState) =>
  state.customerAccountUpdate || initialState;

export const selectCustomerInformation = createSelector(
  [selectCustomerInformationSlice],
  state => state,
);
