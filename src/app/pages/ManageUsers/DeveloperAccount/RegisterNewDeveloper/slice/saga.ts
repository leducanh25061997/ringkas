import { PayloadAction } from '@reduxjs/toolkit';
import { call, takeLatest } from 'redux-saga/effects';
import { DeveloperAccountService } from 'services';
import { RegisterPartnerParams } from 'types/RegisterPartnerParams';
import { handleServerErrors } from 'utils/helpers/Errors';

import { registerNewDeveloperActions as actions } from '.';

function* createDeveloper(
  action: PayloadAction<RegisterPartnerParams, string, (error?: any) => void>,
) {
  try {
    yield call(DeveloperAccountService.createDeveloperAccount, action.payload);
    action.meta();
  } catch (error) {
    action.meta(error);
    handleServerErrors(error);
  }
}

export function* registerNewDeveloperSaga() {
  yield takeLatest(actions.createDeveloper.type, createDeveloper);
}
