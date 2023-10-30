import { PayloadAction } from '@reduxjs/toolkit';
import { call, takeLatest } from 'redux-saga/effects';
import { ManageUserService } from 'services';
import { handleServerErrors } from 'utils/helpers/Errors';

import { registerNewClientActions as actions } from '.';

function* createClient(
  action: PayloadAction<object, string, (error?: any) => void>,
) {
  try {
    yield call(ManageUserService.registerNewClient, action.payload);
    action.meta();
  } catch (error) {
    action.meta(error);
    handleServerErrors(error);
  }
}

export function* registerNewClientSaga() {
  yield takeLatest(actions.createClient.type, createClient);
}
