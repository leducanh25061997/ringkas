import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';

import { PartnerAccountService } from 'services';

import { FilterParams } from './types';

import { manageCustomerActions as actions } from '.';
import { PartnerAccountForm } from 'types/PartnerAccountManagement';
import { Pageable } from 'types';

function* getPartnerAccountList(
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
    const response: Pageable<PartnerAccountForm> = yield call(
      PartnerAccountService.getListPartner,
      params,
    );
    yield put(actions.getPartnerAccountListSuccess(response));
  } catch (error) {
  } finally {
    action.meta(false);
  }
}

export function* manageBankSaga() {
  yield takeLatest(actions.getPartnerAccountList.type, getPartnerAccountList);
}
