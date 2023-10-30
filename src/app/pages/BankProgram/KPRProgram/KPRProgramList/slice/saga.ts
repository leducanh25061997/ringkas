import { PayloadAction } from '@reduxjs/toolkit';
import Notifier from 'app/pages/Notifier';
import path from 'app/routes/path';
import moment from 'moment';
import { call, put, takeLatest } from 'redux-saga/effects';
import { BankLoanService } from 'services';
import { Pageable } from 'types';
import {
  BankLoanForm,
  ChangeKprProgramStatus,
  FilterKprProgramParams,
} from 'types/BankLoanManagement';
import { ChangeProjectStatus } from 'types/ProjectManagement';

import { kprProgramManagementActions as actions } from '.';
import { FilterParamsOfKprProgram } from './types';

function* fetchKprProgramList(action: PayloadAction<FilterKprProgramParams>) {
  try {
    const result: Pageable<BankLoanForm> = yield call(
      BankLoanService.fetchKprProgramList,
      action.payload,
    );
    yield put(actions.fetchKprProgramListSuccess(result));
  } catch (error) {
    yield put(actions.fetchKprProgramListFailed());
    console.log(error);
  }
}

function* createKprProgram(action: PayloadAction<FilterParamsOfKprProgram>) {
  try {
    const formData = { ...action.payload.formData };
    const newDeveloperData: string[] = [];
    formData.developerList?.map(item => {
      newDeveloperData.push(item.id);
    });
    formData.bankLoanDeveloper = newDeveloperData;
    formData.programDuration.endDate = Number(
      moment(formData.programDuration.endDate).format('X'),
    );
    formData.programDuration.startDate = Number(
      moment(formData.programDuration.startDate).format('X'),
    );
    delete formData.developerList;
    const result: BankLoanForm = yield call(
      BankLoanService.createKprProgram,
      formData,
    );
    yield put(actions.createKprProgramSuccess(result));
    Notifier.addNotifySuccess({
      messageId: 'success.createKprProgramSuccess',
    });
    const { navigate } = action.payload;
    navigate(path.kprProgram);
  } catch (error) {
    yield put(actions.fetchKprProgramListFailed());
    Notifier.addNotifyError({
      messageId: 'error.anErrorOccurred',
    });
  }
}

function* updateKprProgramStatus(
  action: PayloadAction<
    ChangeKprProgramStatus,
    string,
    (changeStatus?: ChangeKprProgramStatus) => void | undefined
  >,
) {
  const { meta } = action;
  try {
    const result: ChangeKprProgramStatus = yield call(
      BankLoanService.updateKprProgramStatus,
      action.payload,
    );
    yield put(actions.updateKprProgramStatusSuccess(result));
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

export function* kprProgramManagementSaga() {
  yield takeLatest(actions.fetchKprProgramList.type, fetchKprProgramList);
  yield takeLatest(actions.updateKprProgramStatus.type, updateKprProgramStatus);
  yield takeLatest(actions.createKprProgram.type, createKprProgram);
}
