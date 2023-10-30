import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { BankAccountService, DeveloperAccountService } from 'services';
import { BankAccountForm, BankAccountInfo } from 'types/BankAccountManagement';

import { bankAccountInfoActions as actions } from '.';
import { ChangeStatus } from '../../../../../../../types/DeveloperAccountManagement';

function* fetchBankAccountInfo(
  action: PayloadAction<string, string, () => void>,
) {
  const { meta } = action;
  try {
    const result: BankAccountInfo = yield call(
      BankAccountService.fetchBankAccountInfo,
      action.payload,
    );
    yield put(actions.fetchBankAccountInfoSuccess(result));
  } catch (error: any) {
    meta();
    console.log(error);
  }
}

function* updateBankAccountInfo(action: PayloadAction<BankAccountForm>) {
  try {
    const result: BankAccountInfo = yield call(
      BankAccountService.updateBankAccountInfo,
      action.payload,
    );
    yield put(actions.updateBankAccountInfoSuccess(result));
  } catch (e) {
    yield put(actions.updateBankAccountInfoFailed(undefined));
    throw new Error(`Something wrong: ${e}`);
  }
}

function* updateStatusBankAccount(
  action: PayloadAction<ChangeStatus, string, () => void | undefined>,
) {
  const { meta } = action;
  try {
    const result: ChangeStatus = yield call(
      BankAccountService.updateStatusBankAccount,
      action.payload,
    );
    yield put(actions.updateStatusAccountSuccess(result));
    if (meta) {
      meta();
    }
  } catch (error) {
    if (meta) {
      meta();
    }
    console.log(error);
  }
}

function* verifyAccount(
  action: PayloadAction<ChangeStatus, string, () => void>,
) {
  const { meta } = action;
  try {
    const result: ChangeStatus = yield call(
      BankAccountService.verifyAccount,
      action.payload,
    );
    yield put(actions.verifyBankAccountSuccess(result));
    if (meta) {
      meta();
    }
  } catch (e) {
    yield put(actions.verifyBankAccountFailed());
    if (meta) {
      meta();
    }
    throw new Error(`Something wrong: ${e}`);
  }
}

export function* bankAccountInfoSaga() {
  yield takeLatest(actions.fetchBankAccountInfo.type, fetchBankAccountInfo);
  yield takeLatest(actions.updateBankAccountInfo.type, updateBankAccountInfo);
  yield takeLatest(actions.updateStatusAcount.type, updateStatusBankAccount);
  yield takeLatest(actions.verifyBankAccount.type, verifyAccount);
}
