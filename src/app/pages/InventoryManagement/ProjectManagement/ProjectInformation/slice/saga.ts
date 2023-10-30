import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { ProjectService } from 'services';
import { Pageable } from 'types';
import {
  ChangeProjectStatus,
  ProjectInformation,
  ProjectTask,
} from 'types/ProjectManagement';

import { updateProjectActions as actions } from '.';

function* fetchProjectDetail(action: PayloadAction<string>) {
  try {
    const result: ProjectInformation = yield call(
      ProjectService.getProjectDetail,
      action.payload,
    );
    yield put(actions.fetchProjectDetailSuccess(result));
  } catch (error) {
    console.log(error);
  }
}

function* fetchProjectTaskList(action: PayloadAction<string>) {
  try {
    const result: Pageable<ProjectTask> = yield call(
      ProjectService.getProjectTaskList,
      action.payload,
    );
    yield put(actions.fetchProjectTaskListSuccess(result));
  } catch (error) {
    console.log(error);
  }
}

function* updateProjectStatus(
  action: PayloadAction<
    ChangeProjectStatus,
    string,
    (changeStatus?: ChangeProjectStatus) => void | undefined
  >,
) {
  const { meta } = action;
  try {
    const result: ChangeProjectStatus = yield call(
      ProjectService.updateProjectStatus,
      action.payload,
    );
    yield put(actions.updateProjectStatusSuccess(result));
    if (meta) {
      meta(result);
    }
  } catch (error) {
    if (meta) {
      meta(undefined);
    }
    console.log(error);
  }
}

export function* projectInformationSaga() {
  yield takeLatest(actions.fetchProjectDetail.type, fetchProjectDetail);
  yield takeLatest(actions.updateProjectStatus.type, updateProjectStatus);
  yield takeLatest(actions.fetchProjectTaskList.type, fetchProjectTaskList);
}
