import { call, takeLatest, put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import Notifier from 'app/pages/Notifier';
import { FileUpload, ParamsUrl } from 'types';
import { BankAccountService, fileService } from 'services';

import { BankHQAccounts, CreateBranchBankAccountManagement } from './types';

import { createBranchBankPartnerActions as actions } from '.';

function* createBankAccount(action: PayloadAction<any>) {
  try {
    const result: FileUpload[] = yield call(
      fileService.fetchUrlImages,
      action.payload.files,
    );
    if (result.length > 0) {
      const fileUrlData: any[] = [];
      if (action.payload.images?.fileNik?.file != null) {
        fileUrlData.push({
          name: action.payload.images?.fileNik?.name,
          files: action.payload.images?.fileNik?.file,
        });
      }
      if (action.payload.images?.filePhoto?.file != null) {
        fileUrlData.push({
          name: action.payload.images?.filePhoto?.name,
          files: action.payload.images?.filePhoto?.file,
        });
      }
      const urldata: ParamsUrl[] = [];
      result?.map((value, index) => {
        urldata.push({
          url: value.url,
          key: value.s3Key,
          originalName: value.originalName,
          name: fileUrlData[index].name,
          files: fileUrlData[index].files,
        });
      });
      const resultUrlData: ParamsUrl[] = yield call(
        fileService.getUrlImageData,
        urldata,
      );
      if (resultUrlData.length > 0) {
        const formData = { ...action.payload.formRequest };
        formData.bankAccountType = 'BRANCH';
        if (resultUrlData?.find(a => a.name === 'fileNik')) {
          formData.kyc.fileNik = resultUrlData.filter(
            (value, index) => value.name === 'fileNik',
          )[0];
        }
        if (resultUrlData?.find(a => a.name === 'filePhoto')) {
          formData.kyc.filePhoto = resultUrlData.filter(
            (value, index) => value.name === 'filePhoto',
          )[0];
        }
        const resultRequest: CreateBranchBankAccountManagement = yield call(
          BankAccountService.createBankAccount,
          formData,
        );
        yield put(actions.createBankAccountSuccess(resultRequest));
        const { navigate } = action.payload;
        navigate(`/manage-users/bank`);
        Notifier.addNotifySuccess({
          messageId: 'Bank account added successfully',
        });
      }
    }
  } catch (error: any) {
    yield put(actions.createBankAccountFailed());
    switch (error.response.data.code) {
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

function* fetchProvinces() {
  try {
    const rerultData: string[] = yield call(BankAccountService.fetchProvinces);
    yield put(actions.fetchProvinceSuccess(rerultData));
  } catch (error) {
    console.log(error);
  }
}

function* fechCities(action: PayloadAction<string>) {
  try {
    const rerultData: string[] = yield call(
      BankAccountService.fechCities,
      action.payload,
    );
    yield put(actions.fechCitiesSuccess(rerultData));
  } catch (error) {
    console.log(error);
  }
}

function* fetchHeadQuarters() {
  try {
    const rerultData: BankHQAccounts[] = yield call(
      BankAccountService.fetchHeadQuarters,
    );
    yield put(actions.fetchHeadQuartersSuccess(rerultData));
  } catch (error) {
    console.log(error);
  }
}

export function* createBranchBankPartnerSaga() {
  yield takeLatest(actions.createBankAccount.type, createBankAccount);
  yield takeLatest(actions.fetchProvinces.type, fetchProvinces);
  yield takeLatest(actions.fechCities.type, fechCities);
  yield takeLatest(actions.fetchHeadQuarters.type, fetchHeadQuarters);
}
