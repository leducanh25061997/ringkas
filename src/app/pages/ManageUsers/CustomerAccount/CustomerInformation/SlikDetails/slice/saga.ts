import { call, put, takeLatest } from 'redux-saga/effects';

import { PayloadAction } from '@reduxjs/toolkit';
import slikDetailsServices from 'services/api/slikDetails';
import { Actions as actions } from '.';
import { VerificationResponse } from '../../../PreKprVerification/types';

function* getSlikDetails(action: PayloadAction<string>): any {
  try {
    const response = yield call(
      slikDetailsServices.getSlikData,
      action.payload,
    );
    yield put(
      actions.getSlikDetailsSuccess(response.productResponse[0]?.any?.value),
    );
  } catch (err: any) {}
}
function* getKycVerificationData(action: PayloadAction<string>) {
  try {
    const response: VerificationResponse = yield call(
      slikDetailsServices.getKycData,
      action.payload,
    );
    yield put(actions.getKycVerificationDataSuccess(response));
  } catch (err: any) {}
}

export function* Saga() {
  yield takeLatest(actions.getSlikDetails.type, getSlikDetails);
  yield takeLatest(actions.getKycVerificationData.type, getKycVerificationData);
}
