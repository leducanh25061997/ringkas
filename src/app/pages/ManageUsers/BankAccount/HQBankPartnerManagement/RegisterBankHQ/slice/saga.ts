import { PayloadAction } from '@reduxjs/toolkit';
import { call, takeLatest } from 'redux-saga/effects';
import { BankAccountService } from 'services';
import { RegisterPartnerParams } from 'types/RegisterPartnerParams';
import { handleServerErrors } from 'utils/helpers/Errors';

import { registerBankHqActions as actions } from '.';

function* createBankHQ(
  action: PayloadAction<RegisterPartnerParams, string, (error?: any) => void>,
) {
  try {
    yield call(BankAccountService.createBankAccount, action.payload);
    action.meta();
  } catch (error) {
    action.meta(error);
    handleServerErrors(error);
  }
}

export function* registerBankHQSaga() {
  yield takeLatest(actions.createBankHq.type, createBankHQ);
}
