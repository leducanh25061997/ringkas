import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { MediaParams, MediaDataItem } from './types';
import fileService from 'services/api/fileService';
import { Pageable } from '../../../../../types';
import { mediaActions as actions } from './index';

function* fetchMediaList(action: PayloadAction<MediaParams>) {
  try {
    const result: Pageable<MediaDataItem> = yield call(
      fileService.fetchMedia,
      action.payload,
    );
    yield put(actions.fetchMediaSuccess(result));
  } catch (e) {
    throw Error(`Something wrong: ${e}`);
  }
}

export function* mediaManagementSaga() {
  yield takeLatest(actions.fetchMedia.type, fetchMediaList);
}
