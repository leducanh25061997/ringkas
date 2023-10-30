import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { BankTaskService } from 'services';
import { BankTaskItem, BankTaskUpdateStatus, DocsParams } from './type';
import { bankTaskActions as actions } from './index';
import {
  KprFilter,
  KprResponse,
} from '../../../../CustomerAccount/KprRegister/slice/types';

function* getBankTasks(action: PayloadAction<string, string, () => void>) {
  try {
    const result: BankTaskItem[] = yield call(
      BankTaskService.getBankTasks,
      action.payload,
    );
    yield put(actions.getBankTasksSuccess(result));
  } catch (error) {
    yield put(actions.getBankTasksFailed());
  }
}

function* updateStatusBankTask(
  action: PayloadAction<BankTaskUpdateStatus, string, () => void, () => void>,
) {
  try {
    const result: BankTaskItem[] = yield call(
      BankTaskService.updateStatusBankTask,
      action.payload,
    );
    yield put(actions.updateStatusBankTaskSuccess());
    if (action.meta) {
      action.meta();
    }
  } catch (error) {
    yield put(actions.updateStatusBankTaskFailed());
    if (action.error) {
      action.error();
    }
  }
}

function* downloadDocsByType(
  action: PayloadAction<DocsParams, string, () => void, () => void>,
) {
  try {
    const result: BankTaskItem[] = yield call(
      BankTaskService.downloadDocsByType,
      action.payload,
    );
    if (action.meta) {
      action.meta();
    }
  } catch (error) {
    if (action.error) {
      action.error();
    }
  }
}

function* getCustomerDocs(
  action: PayloadAction<KprFilter, string, () => void, () => void>,
) {
  try {
    const result: KprResponse = yield call(
      BankTaskService.getCustomerDocs,
      action.payload,
    );
    yield put(actions.getCustomerDocsSuccess(result.data));
    if (action.meta) {
      action.meta();
    }
  } catch (error) {
    yield put(actions.getCustomerDocsFailed());
    if (action.error) {
      action.error();
    }
  }
}

export function* bankTaskSaga() {
  yield takeLatest(actions.getBankTasks.type, getBankTasks);
  yield takeLatest(actions.updateStatusBankTask.type, updateStatusBankTask);
  yield takeLatest(actions.downloadDocsByType.type, downloadDocsByType);
  yield takeLatest(actions.getCustomerDocs.type, getCustomerDocs);
}
