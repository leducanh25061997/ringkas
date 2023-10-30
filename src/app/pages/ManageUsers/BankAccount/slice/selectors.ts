import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

import { initialState } from '.';

const selectSlice = (state: RootState) => state.manageBank || initialState;

export const selectManageBank = createSelector([selectSlice], state => state);
