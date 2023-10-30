import { PayloadAction } from '@reduxjs/toolkit';
import { call, takeLatest, put } from 'redux-saga/effects';
import KprService from 'services/api/kprService';
import { KprFilter, KprPayload, KprResponse } from './types';

import { kprActions as actions } from '.';

function* updateKpr(
  action: PayloadAction<KprPayload, string, () => void, () => void>,
) {
  const { meta, error } = action;
  try {
    yield call(KprService.updateKpr, action.payload);
    yield put(actions.updateKprSuccess());
    if (meta) meta();
  } catch (err: any) {
    yield put(actions.updateKprFailed());
    if (error) error();
  }
}

function* getKpr(
  action: PayloadAction<KprFilter, string, () => void, () => void>,
) {
  const { meta, error } = action;
  try {
    const res: KprResponse = yield call(KprService.getKpr, action.payload);
    yield put(actions.getKprSuccess(res.data));
    if (meta) meta();
  } catch (err: any) {
    yield put(actions.getKprFailed());
    if (error) error();
  }
}

export function* kprSaga() {
  yield takeLatest(actions.updateKpr.type, updateKpr);
  yield takeLatest(actions.getKpr.type, getKpr);
}
