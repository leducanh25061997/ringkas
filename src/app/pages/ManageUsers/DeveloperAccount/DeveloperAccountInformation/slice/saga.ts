import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  DeveloperAccountService,
  KeycloakService,
  LocalStorageService,
} from 'services';
import { AuthParams, AuthResponse, Pageable } from 'types';
import {
  DeveloperAccountList,
  FilterDevelopAccountParams,
  ChangeStatus,
} from 'types/DeveloperAccountManagement';

import { developerAccountInfoActions as actions } from '.';

function* fetchDeveloperAccountInfo(action: PayloadAction<string>) {
  try {
    const result: DeveloperAccountList = yield call(
      DeveloperAccountService.fetchDeveloperAccountInfo,
      action.payload,
    );
    yield put(actions.fetchDeveloperAccountInfoSuccess(result));
  } catch (error: any) {
    console.log(error);
  }
}

function* updateStatusAcount(
  action: PayloadAction<
    ChangeStatus,
    string,
    (changeStatus?: ChangeStatus) => void | undefined
  >,
) {
  const { meta } = action;
  try {
    const result: ChangeStatus = yield call(
      DeveloperAccountService.updateStatusAcount,
      action.payload,
    );
    yield put(actions.updateStatusAccountSuccess(result));
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

function* verifyAccount(
  action: PayloadAction<
    ChangeStatus,
    string,
    (changeStatus?: ChangeStatus) => void | undefined
  >,
) {
  const { meta } = action;
  try {
    const result: ChangeStatus = yield call(
      DeveloperAccountService.verifyAccount,
      action.payload,
    );
    yield put(actions.updateStatusAccountSuccess(result));
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

export function* developerAccountInfoSaga() {
  yield takeLatest(
    actions.fetchDeveloperAccountInfo.type,
    fetchDeveloperAccountInfo,
  );
  yield takeLatest(actions.updateStatusAcount.type, updateStatusAcount);
  yield takeLatest(actions.verifyAccount.type, verifyAccount);
}
