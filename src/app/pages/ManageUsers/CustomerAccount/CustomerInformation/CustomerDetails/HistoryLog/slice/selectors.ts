import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

import { initialState } from '.';

const selectSlice = (state: RootState) => state.historyLogs || initialState;

export const historyLogsSlice = createSelector([selectSlice], state => state);
