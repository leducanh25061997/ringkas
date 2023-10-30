import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';

import { PartnerAccountService } from 'services';

import { partnerInformation as actions } from '.';
import {
  PartnerInformation,
  ProcessVerificationParams,
  VerificationResponse,
} from './types';

function* getPartnerInformation(
  action: PayloadAction<string, string, () => void>,
) {
  try {
    const result: PartnerInformation = yield call(
      PartnerAccountService.getPartnerInformation,
      action.payload,
    );
    yield put(actions.getPartnerInformationSuccess(result));
    action.meta();
  } catch (error) {}
}

function* getKycVerificationData(
  action: PayloadAction<string | number, string, (loading: boolean) => void>,
) {
  try {
    action.meta(true);
    const response: VerificationResponse = yield call(
      PartnerAccountService.getKycPartnerVerificationData,
      action.payload,
    );
    yield put(actions.getKycVerificationDataSuccess(response));
  } catch (error) {
  } finally {
    action.meta(false);
  }
}

function* processVerification(
  action: PayloadAction<
    ProcessVerificationParams,
    string,
    () => void,
    (message: string) => void
  >,
) {
  try {
    yield call(PartnerAccountService.processVerification, action.payload);
    action.meta();
  } catch (error: any) {
    action.error(error?.response?.data?.message);
  }
}

export function* PartnerInformationManagement() {
  yield takeLatest(actions.getPartnerInformation.type, getPartnerInformation);
  yield takeLatest(actions.getKycVerificationData.type, getKycVerificationData);
  yield takeLatest(actions.processVerification.type, processVerification);
}
