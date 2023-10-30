import { PayloadAction } from '@reduxjs/toolkit';
import Notifier from 'app/pages/Notifier';
import { call, put, takeLatest } from 'redux-saga/effects';
import { KeycloakService, LocalStorageService } from 'services';
import { AuthParams, AuthResponse, UserInformation } from 'types';
import { UpdatePasswordForm } from 'types/Auth';

import { authActions as actions } from '.';

function* login(
  action: PayloadAction<AuthParams, string, (error?: any) => void>,
) {
  try {
    const response: AuthResponse = yield call(
      KeycloakService.login,
      action.payload,
    );
    const responseData: any = response;
    responseData.username = action.payload?.username;
    yield put(actions.loginSuccess(responseData));
    action.meta && action.meta(response);
  } catch (error: any) {
    action.meta && action.meta(error.response?.data);
  }
}

function* resendOTP(
  action: PayloadAction<
    AuthParams,
    string,
    (error?: any) => void,
    (message: string) => void
  >,
) {
  try {
    const data: AuthParams = action.payload;
    const response: AuthResponse = yield call(KeycloakService.login, data);
    const responseData: any = response;
    responseData.username = action.payload?.username;
    yield put(actions.resendOTPSuccess(responseData));
    action.meta(response);
  } catch (error: any) {
    action.error(error.response.data.messages[0]);
  }
}

function* checkOTP(
  action: PayloadAction<
    AuthParams,
    string,
    () => void,
    (message: string) => void
  >,
) {
  try {
    const data: AuthParams = action.payload;
    const response: AuthResponse = yield call(KeycloakService.login, data);
    LocalStorageService.set(
      LocalStorageService.OAUTH_TOKEN,
      response.access_token,
    );
    LocalStorageService.set(
      LocalStorageService.REFRESH_TOKEN,
      response.refresh_token,
    );
    yield put(actions.getUserInformation());
    action.meta();
  } catch (error: any) {
    action.error(error.response.data.error);
  }
}

function* loginWithResetPassword(
  action: PayloadAction<
    AuthParams,
    string,
    () => void,
    (message: string) => void
  >,
) {
  try {
    const data: AuthParams = action.payload;
    const response: AuthResponse = yield call(KeycloakService.getToken, data);
    LocalStorageService.set(
      LocalStorageService.OAUTH_TOKEN,
      response.access_token,
    );
    LocalStorageService.set(
      LocalStorageService.REFRESH_TOKEN,
      response.refresh_token,
    );
    action.meta();
  } catch (error: any) {
    action.error(error.response.data.messages[0]);
  }
}

function* getUserInformation() {
  try {
    const accessToken = LocalStorageService.get<string>(
      LocalStorageService.OAUTH_TOKEN,
    );
    if (!accessToken) throw new Error();
    const response: UserInformation = yield call(KeycloakService.getProfile);
    LocalStorageService.set('userInfo', response);
    yield put(actions.getUserInformationSuccess(response));
    yield put(actions.setStatus('AUTH'));
  } catch (err: any) {
    const userInfo = LocalStorageService.get<UserInformation>('userInfo');
    if (err.response?.status >= 500 && userInfo) {
      yield put(actions.setStatus('AUTH'));
      yield put(actions.getUserInformationSuccess(userInfo));
    } else {
      LocalStorageService.removeAllItem();
      yield put(actions.setStatus('UN_AUTH'));
    }
  }
}

function* logout(action: PayloadAction<any, string, (error?: any) => void>) {
  try {
    // yield call(KeycloakService.logout);
    LocalStorageService.removeItem(LocalStorageService.OAUTH_TOKEN);
    LocalStorageService.removeAllItem();
    yield put(actions.logoutSuccess());
    action.meta();
  } catch (error: any) {
    action.meta(error.response?.data);
  }
}

function* changePassword(
  action: PayloadAction<AuthParams, string, (error?: any) => void>,
) {
  try {
    const response: AuthResponse = yield call(
      KeycloakService.changePassword,
      action.payload,
    );
    const responseData: any = response;
    responseData.username = action.payload?.username;
    LocalStorageService.removeItem(LocalStorageService.OAUTH_TOKEN);
    LocalStorageService.removeAllItem();
    yield put(actions.getUserInformation());
    yield put(actions.changePasswordSuccess(responseData));
    action.meta && action.meta(response);
  } catch (error: any) {
    action.meta && action.meta(error.response?.data);
  }
}

function* updatePassword(
  action: PayloadAction<UpdatePasswordForm, string, (error?: any) => void>,
) {
  try {
    const response: UpdatePasswordForm = yield call(
      KeycloakService.updatePassword,
      action.payload,
    );
    Notifier.addNotifySuccess({
      messageId: 'success.updatePasswordSuccess',
    });
    yield put(actions.getUserInformation());
    yield put(actions.changePasswordSuccess(response));
    action.meta && action.meta(response);
  } catch (error: any) {
    Notifier.addNotifyError({ messageId: 'error.signInFailed' });
    action.meta && action.meta(error.response?.data);
  }
}

export function* authSaga() {
  yield takeLatest(actions.login.type, login);
  yield takeLatest(actions.resendOTP.type, resendOTP);
  yield takeLatest(actions.checkOTP.type, checkOTP);
  yield takeLatest(actions.loginWithResetPassword.type, loginWithResetPassword);
  yield takeLatest(actions.logout.type, logout);
  yield takeLatest(actions.getUserInformation.type, getUserInformation);
  yield takeLatest(actions.changePassword.type, changePassword);
  yield takeLatest(actions.updatePassword.type, updatePassword);
}
