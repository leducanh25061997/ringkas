import { PayloadAction } from '@reduxjs/toolkit';
import Notifier from 'app/pages/Notifier';
import path from 'app/routes/path';
import { call, put, takeLatest } from 'redux-saga/effects';
import EmployAccountService from 'services/api/employAccountService';
import { Pageable } from 'types';
import {
  ChangeStatus,
  FilterDevelopAccountParams,
} from 'types/DeveloperAccountManagement';
import {
  EmployeeAccountData,
  EmployeeAccountDataForm,
} from 'types/EmployeeAccountManagement';

import { developerAccountManagementActions as actions } from '.';
import { FilterParamsOfEmployee } from './types';

function* fetchEmployeeAccountList(
  action: PayloadAction<FilterDevelopAccountParams>,
) {
  try {
    const result: Pageable<EmployeeAccountData> = yield call(
      EmployAccountService.fetchEmployeeAccountList,
      action.payload,
    );
    yield put(actions.fetchEmployeeAccountListSuccess(result));
  } catch (error: any) {
    yield put(actions.fetchEmployeeAccountListFailed());
  }
}

function* fetchEmployeeAccountInfo(action: PayloadAction<string>) {
  try {
    const result: EmployeeAccountData = yield call(
      EmployAccountService.fetchEmployeeAccountInfo,
      action.payload,
    );
    yield put(actions.fetchEmployeeAccountInfoSuccess(result));
  } catch (error: any) {
    console.log(error);
  }
}

function* createEmployeeAccount(action: PayloadAction<FilterParamsOfEmployee>) {
  try {
    const result: EmployeeAccountDataForm = yield call(
      EmployAccountService.CreateEmployeeAccount,
      action.payload.formData,
    );
    yield put(actions.createEmployeeAccountSuccess(result));
    Notifier.addNotifySuccess({
      messageId: 'success.createEmployeeSuccess',
    });
    const { navigate } = action.payload;
    navigate(path.employeeAccountList);
  } catch (error: any) {
    yield put(actions.createEmployeeAccountFailed());
    if (error?.response?.data?.code) {
      switch (error?.response?.data?.code) {
        case 'KEYCLOAK_USER_CONFLICT':
          Notifier.addNotifyError({
            messageId: 'error.emailExisted',
          });
          break;
        case 'INVALID_REFERRAL_CODE':
          Notifier.addNotifyError({
            messageId: 'error.invalidReferralCode',
          });
          break;
        case 'INVALID_EMAIL':
          Notifier.addNotifyError({
            messageId: 'error.invalidEmail',
          });
          break;
        default:
          Notifier.addNotifyError({
            messageId: 'error.anErrorOccurred',
          });
          break;
      }
    }
  }
}

function* updateEmployeeAccount(action: PayloadAction<FilterParamsOfEmployee>) {
  try {
    const result: EmployeeAccountDataForm = yield call(
      EmployAccountService.updateEmployeeAccount,
      action.payload.formData,
    );
    yield put(actions.createEmployeeAccountSuccess(result));
    Notifier.addNotifySuccess({
      messageId: 'success.updateEmployeeSuccess',
    });
    const { navigate } = action.payload;
    navigate(`${path.employeeAccountList}/${action.payload.formData?.id}`);
  } catch (error: any) {
    yield put(actions.createEmployeeAccountFailed());
    Notifier.addNotifyError({
      messageId: 'error.anErrorOccurred',
    });
  }
}

function* updateStatusAccount(
  action: PayloadAction<
    ChangeStatus,
    string,
    (changeStatus?: ChangeStatus) => void | undefined
  >,
) {
  const { meta } = action;
  try {
    const result: ChangeStatus = yield call(
      EmployAccountService.updateStatusAccount,
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

export function* employeeAccountManagementSaga() {
  yield takeLatest(
    actions.fetchEmployeeAccountList.type,
    fetchEmployeeAccountList,
  );
  yield takeLatest(actions.createEmployeeAccount.type, createEmployeeAccount);
  yield takeLatest(
    actions.fetchEmployeeAccountInfo.type,
    fetchEmployeeAccountInfo,
  );
  yield takeLatest(actions.updateEmployeeAccount.type, updateEmployeeAccount);
  yield takeLatest(actions.updateStatusAccount.type, updateStatusAccount);
}
