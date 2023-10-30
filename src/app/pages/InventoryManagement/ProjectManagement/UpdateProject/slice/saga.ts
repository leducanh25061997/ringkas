import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { Customer, Pageable } from 'types';
import Notifier from 'app/pages/Notifier';
import { ManageUserService, ProjectService } from 'services';
import {
  ChangeProjectStatus,
  FilterParamsOfProject,
  ProjectInformation,
  ProjectTask,
} from 'types/ProjectManagement';

import { updateProjectActions as actions } from '.';
import { BodyProjectTask } from './types';

function* fetchProvinces() {
  try {
    const result: string[] = yield call(ProjectService.fetchProvinces);
    yield put(actions.fetProvincesSuccess(result));
  } catch (error) {
    console.log(error);
  }
}

function* fetchCities(action: PayloadAction<string>) {
  try {
    const result: string[] = yield call(
      ProjectService.fetCities,
      action.payload,
    );
    yield put(actions.fetchCitiesSuccess(result));
  } catch (error) {
    console.log(error);
  }
}

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

function* updateProject(action: PayloadAction<FilterParamsOfProject>) {
  try {
    const formData = { ...action.payload.formData };
    delete formData.SHM;
    delete formData.AJB;
    delete formData.HGB;
    delete formData.SHSRS;
    delete formData.GIRIK;
    delete formData.OTHER;
    if (formData?.projectAccessibility) {
      formData.accessibilities = [formData?.projectAccessibility];
    }
    formData.facilities = [];
    formData?.projectFacility &&
      formData.facilities.push(formData?.projectFacility);
    delete formData.projectFacility;
    delete formData.projectAccessibility;
    delete formData.cluster;
    delete formData.houseType;
    delete formData.mandatory;
    delete formData.cerType;
    delete formData.location;
    const result: ProjectInformation = yield call(
      ProjectService.updateProject,
      formData,
    );
    yield put(actions.updateProjectSuccess(action.payload.formData));
    const { navigate, id } = action.payload;
    navigate(`/inventory-management/project/${id}`);
    Notifier.addNotifySuccess({
      messageId: 'success.updateProjectSuccess',
    });
  } catch (error) {
    Notifier.addNotifyError({
      messageId: 'error.anErrorOccurred',
    });
    yield put(actions.updateProjectFailed());
  }
}

function* createProjectTask(
  action: PayloadAction<ProjectTask, string, (error?: any) => void>,
) {
  try {
    const formData = { ...action.payload };
    const result: ProjectTask = yield call(
      ProjectService.createProjectTask,
      formData,
    );
    yield put(actions.createProjectTaskSuccess(result));
    action.meta && action.meta(result);
  } catch (error) {
    Notifier.addNotifyError({
      messageId: 'error.anErrorOccurred',
    });
    yield put(actions.updateProjectFailed());
  }
}

function* updateMultiProjectTask(action: PayloadAction<BodyProjectTask>) {
  try {
    const result: ProjectTask[] = yield call(
      ProjectService.createMultiProjectTask,
      action.payload.formData,
    );
    Notifier.addNotifySuccess({
      messageId: 'success.updateProjectTaskSuccess',
    });
    yield put(actions.updateMultiProjectTaskSuccess(result));
    const { navigate, id } = action.payload;
    navigate(`/inventory-management/project/${id}`);
  } catch (error) {
    Notifier.addNotifyError({
      messageId: 'error.anErrorOccurred',
    });
    yield put(actions.updateMultiProjectTaskFailed());
  }
}

function* updateProjectTask(action: PayloadAction<ProjectTask>) {
  try {
    const formData = { ...action.payload };
    yield call(ProjectService.updateProjectTask, formData);
    Notifier.addNotifySuccess({
      messageId: 'success.updateProjectTaskSuccess',
    });
    yield put(actions.fetchProjectTaskList(action.payload.projectId));
  } catch (error) {
    Notifier.addNotifyError({
      messageId: 'error.anErrorOccurred',
    });
    yield put(actions.updateProjectFailed());
  }
}

export function* updateProjectSaga() {
  yield takeLatest(actions.fetchCities.type, fetchCities);
  yield takeLatest(actions.fetchProvinces.type, fetchProvinces);
  yield takeLatest(actions.fetchProjectDetail.type, fetchProjectDetail);
  yield takeLatest(actions.updateProjectStatus.type, updateProjectStatus);
  yield takeLatest(actions.updateProject.type, updateProject);
  yield takeLatest(actions.fetchProjectTaskList.type, fetchProjectTaskList);
  yield takeLatest(actions.createProjectTask.type, createProjectTask);
  yield takeLatest(actions.updateProjectTask.type, updateProjectTask);
  yield takeLatest(actions.updateMultiProjectTask.type, updateMultiProjectTask);
}
