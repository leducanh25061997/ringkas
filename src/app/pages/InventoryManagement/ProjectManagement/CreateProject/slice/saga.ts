import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { Customer } from 'types';
import Notifier from 'app/pages/Notifier';
import { ManageUserService, ProjectService } from 'services';
import {
  FilterParamsOfProject,
  ProjectInformation,
  ProjectInformationParams,
} from 'types/ProjectManagement';

import { createProjectActions as actions } from '.';

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

function* createProject(action: PayloadAction<FilterParamsOfProject>) {
  try {
    delete action.payload.formData.SHM;
    delete action.payload.formData.AJB;
    delete action.payload.formData.HGB;
    delete action.payload.formData.SHSRS;
    delete action.payload.formData.GIRIK;
    delete action.payload.formData.OTHER;
    const formData = { ...action.payload.formData };
    if (formData?.projectAccessibility) {
      formData.accessibilities = [formData?.projectAccessibility];
    }
    formData.facilities = [];
    formData?.projectFacility &&
      formData.facilities.push(formData?.projectFacility);
    if (formData?.location) {
      formData.provinceName = formData?.location.province;
      formData.cityName = formData?.location.city;
    }
    delete formData.projectAccessibility;
    delete formData.projectFacility;
    delete formData.cluster;
    delete formData.houseType;
    delete formData.mandatory;
    delete formData.cerType;
    delete formData.location;
    const result: ProjectInformation = yield call(
      ProjectService.createProject,
      formData,
    );
    yield put(actions.createProjectSuccess(result));
    Notifier.addNotifySuccess({
      messageId: 'success.projectCreateSuccess',
    });
    const { navigate } = action.payload;
    navigate(`/inventory-management/project`);
  } catch (error) {
    Notifier.addNotifyError({
      messageId: 'error.anErrorOccurred',
    });
    yield put(actions.createProjectFailed());
  }
}

export function* createProjectSaga() {
  yield takeLatest(actions.fetchCities.type, fetchCities);
  yield takeLatest(actions.fetchProvinces.type, fetchProvinces);
  yield takeLatest(actions.createProject.type, createProject);
}
