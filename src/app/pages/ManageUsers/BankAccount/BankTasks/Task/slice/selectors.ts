import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

import { initialState } from './index';

const selectSlice = (state: RootState) => state.bankTask || initialState;

export const selectBankTask = createSelector([selectSlice], state => state);
