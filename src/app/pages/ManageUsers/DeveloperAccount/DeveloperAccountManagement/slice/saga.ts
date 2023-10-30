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
} from 'types/DeveloperAccountManagement';

import { developerAccountManagementActions as actions } from '.';

function* fetchDeveloperAccountList(
  action: PayloadAction<FilterDevelopAccountParams>,
) {
  try {
    const result: Pageable<DeveloperAccountList> = yield call(
      DeveloperAccountService.fetchDeveloperAccountList,
      action.payload,
    );
    yield put(actions.fetchDeveloperAccountListSuccess(result));
  } catch (error: any) {
    yield put(actions.fetchDeveloperAccountListFailed());
    // if (error.response.status === 401) {
    //   const refresh_token: string =
    //     LocalStorageService.get(LocalStorageService.REFRESH_TOKEN) || '';
    //   const response: AuthResponse = yield call(
    //     KeycloakService.refetchAccessToken,
    //     refresh_token,
    //   );
    //   LocalStorageService.set(
    //     LocalStorageService.OAUTH_TOKEN,
    //     response.access_token,
    //   );
    //   LocalStorageService.set(
    //     LocalStorageService.REFRESH_TOKEN,
    //     response.refresh_token,
    //   );
    // }
    console.log(error);
  }
}

export function* developerAccountManagementSaga() {
  yield takeLatest(
    actions.fetchDeveloperAccountList.type,
    fetchDeveloperAccountList,
  );
}
