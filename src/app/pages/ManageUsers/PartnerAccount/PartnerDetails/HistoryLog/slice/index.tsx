import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import { historyLogsSaga } from './saga';
import {
  HistoryLogsResponse,
  HistoryLogsState,
  HistoryLogsParams,
} from './types';
import { PayloadAction } from '@reduxjs/toolkit';

export const initialState: HistoryLogsState = {};

const slice = createSlice({
  name: 'historyLogs',
  initialState,
  reducers: {
    getHistoryLogs: {
      reducer(state) {
        return {
          ...state,
          isLoading: true,
        };
      },
      prepare(
        params: HistoryLogsParams,
        meta?: () => void,
        error?: () => void,
      ) {
        return { payload: params, meta, error };
      },
    },
    getHistoryLogsSuccess(state, action: PayloadAction<HistoryLogsResponse[]>) {
      state.isLoading = false;
      state.historyLogs = action.payload;
    },
    getHistoryLogsFailed(state) {
      state.isLoading = false;
      state.historyLogs = undefined;
    },

    getHistoryLogsByTime: {
      reducer(state) {
        return {
          ...state,
          isLoading: true,
        };
      },
      prepare(
        params: HistoryLogsParams,
        meta?: () => void,
        error?: () => void,
      ) {
        return { payload: params, meta, error };
      },
    },
    getHistoryLogsByTimeSuccess(
      state,
      action: PayloadAction<HistoryLogsResponse[]>,
    ) {
      state.isLoading = false;
      state.historyLogsByTime = action.payload;
    },
    getHistoryLogsByTimeFailed(state) {
      state.isLoading = false;
      state.historyLogsByTime = undefined;
    },

    // download csv
    downloadCsv: {
      reducer(state) {
        return state;
      },
      prepare(
        params: HistoryLogsParams,
        meta?: (response: any) => void,
        error?: () => void,
      ) {
        return { payload: params, meta, error };
      },
    },
  },
});

export const { actions: Actions } = slice;

export const useHistoryLogsSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: historyLogsSaga });
  return { actions: slice.actions };
};
