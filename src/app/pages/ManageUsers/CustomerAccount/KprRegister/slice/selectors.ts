import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

import { initialState } from '.';

const selectSlice = (state: RootState) => state.kprInformation || initialState;

export const selectKprReady = createSelector([selectSlice], state => state);
