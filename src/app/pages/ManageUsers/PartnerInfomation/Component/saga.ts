import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';

import { PartnerAccountService } from 'services';

import { partnerInformation as actions } from '.';
import { PartnerInformation } from './types';
import { ChangeStatus } from 'types/DeveloperAccountManagement';

function* getPartnerInformation(
  action: PayloadAction<string, string, () => void>,
) {
  try {
    const result: PartnerInformation = yield call(
      PartnerAccountService.getPartnerInformation,
      action.payload,
    );
    yield put(actions.getPartnerInformationSuccess(result));
  } catch (error) {
    action.meta();
  }
}

function* updateStatusPartnerAccount(
  action: PayloadAction<ChangeStatus, string, () => void | undefined>,
) {
  const { meta } = action;
  try {
    const result: PartnerInformation = yield call(
      PartnerAccountService.updatePartnerAccountStatus,
      action.payload,
    );
    yield put(actions.updateStatusPartnerAccountSuccess(result));
    if (meta) {
      meta();
    }
  } catch (error) {
    if (meta) {
      meta();
    }
  }
}

function* updatePartnerAccountInformation(
  action: PayloadAction<
    PartnerInformation,
    string,
    () => void | undefined,
    () => void
  >,
) {
  try {
    const result: PartnerInformation = yield call(
      PartnerAccountService.updatePartnerAccountInformation,
      action.payload,
    );
    yield put(actions.updatePartnerAccountInformationSuccess(result));
    action.meta();
  } catch (e) {
    yield put(actions.updatePartnerAccountInformationFailed(undefined));
    action.error();
  }
}

function* updateVerificationStatusPartnerAccount(
  action: PayloadAction<ChangeStatus, string, () => void | undefined>,
) {
  const { meta } = action;
  try {
    const result: PartnerInformation = yield call(
      PartnerAccountService.verifyPartnerAccount,
      action.payload,
    );
    yield put(actions.updateVerificationStatusPartnerAccountSuccess(result));
    if (meta) {
      meta();
    }
  } catch (error) {
    if (meta) {
      meta();
    }
  }
}

export function* PartnerInformationManagement() {
  yield takeLatest(actions.getPartnerInformation.type, getPartnerInformation);
  yield takeLatest(
    actions.updateStatusPartnerAccount.type,
    updateStatusPartnerAccount,
  );
  yield takeLatest(
    actions.updateVerificationStatusPartnerAccount.type,
    updateVerificationStatusPartnerAccount,
  );
  yield takeLatest(
    actions.updatePartnerAccountInformation.type,
    updatePartnerAccountInformation,
  );
}
