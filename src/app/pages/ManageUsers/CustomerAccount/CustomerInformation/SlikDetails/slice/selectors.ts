import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

import { initialState } from '.';

const selectSlice = (state: RootState) => state.slikDetails || initialState;

export const slikDetailsSlice = createSelector([selectSlice], state => state);
