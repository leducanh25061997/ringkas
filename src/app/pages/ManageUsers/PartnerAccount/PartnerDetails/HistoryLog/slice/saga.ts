import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import historyLogs from 'services/api/historyLogs';
import { Actions as actions } from '.';
import { HistoryLogsParams } from './types';

function* getHistoryLogs(
  action: PayloadAction<HistoryLogsParams, string, () => void, () => void>,
): any {
  try {
    const response = yield call(historyLogs.getHistoryLogs, action.payload);
    yield put(actions.getHistoryLogsSuccess(response.data));
  } catch (err: any) {
    yield put(actions.getHistoryLogsFailed());
  }
}

function* getHistoryLogsByTime(
  action: PayloadAction<HistoryLogsParams, string, () => void, () => void>,
): any {
  try {
    const response = yield call(historyLogs.getHistoryLogs, action.payload);
    yield put(actions.getHistoryLogsByTimeSuccess(response.data));
  } catch (err: any) {
    yield put(actions.getHistoryLogsByTimeFailed());
  }
}

function* downloadCsv(
  action: PayloadAction<
    HistoryLogsParams,
    string,
    (response: any) => void,
    () => void
  >,
): any {
  const { meta, error } = action;
  try {
    const response = yield call(historyLogs.downloadCsv, action.payload);
    if (meta) meta(response);
  } catch (err: any) {
    if (error) error();
  }
}

export function* historyLogsSaga() {
  yield takeLatest(actions.getHistoryLogs.type, getHistoryLogs);
  yield takeLatest(actions.getHistoryLogsByTime.type, getHistoryLogsByTime);
  yield takeLatest(actions.downloadCsv.type, downloadCsv);
}
