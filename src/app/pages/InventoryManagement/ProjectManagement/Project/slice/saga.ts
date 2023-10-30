import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { ProjectService } from 'services';
import { Pageable } from 'types';
import {
  FilterProjectParams,
  ProjectManagement,
} from 'types/ProjectManagement';

import { projectManagementActions as actions } from '.';

function* fetchProjectList(action: PayloadAction<FilterProjectParams>) {
  try {
    const result: Pageable<ProjectManagement> = yield call(
      ProjectService.fetchProjectList,
      action.payload,
    );
    yield put(actions.fetchProjectListSuccess(result));
  } catch (error) {
    yield put(actions.fetchProjectListFailed());
    console.log(error);
  }
}

export function* projectManagementSaga() {
  yield takeLatest(actions.fetchProjectList.type, fetchProjectList);
}
