import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

import { initialState } from '.';

const selectSlice = (state: RootState) => state.scoringReady || initialState;

export const selectScoringReady = createSelector([selectSlice], state => state);
