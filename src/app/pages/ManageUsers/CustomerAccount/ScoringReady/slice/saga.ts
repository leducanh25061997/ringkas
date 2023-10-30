import { VerificationStatusResponse } from './../../PreKprVerification/types';
import { AssessmentDataResponse, HousePriceResponse } from './types';
import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import scoringReadyServices from 'services/api/scoringReady';

import { scoringReadyActions as actions } from '.';
import { ManageUserService } from 'services';

function* getScoringData(action: PayloadAction<string>) {
  try {
    const data: [
      AssessmentDataResponse,
      HousePriceResponse,
      VerificationStatusResponse,
    ] = yield all([
      call(scoringReadyServices.getAssessmentData, action.payload),
      call(scoringReadyServices.getHouseData, action.payload),
      call(ManageUserService.getKycDataSummary, action.payload),
    ]);
    yield put(actions.getScoringDataSuccess(data));
  } catch (err: any) {
    yield put(actions.getScoringDataError());
  }
}

function* updateAssessment(
  action: PayloadAction<any, string, () => void, (error: any) => void>,
) {
  try {
    yield call(scoringReadyServices.postAssessment, action.payload);

    action.meta();
  } catch (err: any) {
    action.error(err);
  }
}

export function* scoringReadySaga() {
  yield takeLatest(actions.getScoringData.type, getScoringData);
  yield takeLatest(actions.updateAssessment.type, updateAssessment);
}
