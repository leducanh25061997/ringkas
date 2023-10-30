import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';

import { ManageUserService } from 'services';

import { BankAccountListResponse, FilterParams } from './types';

import { manageCustomerActions as actions } from '.';

function* getBankAccountList(
  action: PayloadAction<FilterParams, string, (loading: boolean) => void>,
) {
  try {
    const params: any = action.payload;
    if (params.searchKeyType[0]) {
      params.searchKeyType = params.searchKeyType[0].value;
    } else {
      delete params.searchKeyType;
    }
    action.meta(true);
    const response: BankAccountListResponse = yield call(
      ManageUserService.getListBank,
      params,
    );
    yield put(actions.getBankAccountListSuccess(response));
  } catch (error) {
  } finally {
    action.meta(false);
  }
}

export function* manageBankSaga() {
  yield takeLatest(actions.getBankAccountList.type, getBankAccountList);
}
