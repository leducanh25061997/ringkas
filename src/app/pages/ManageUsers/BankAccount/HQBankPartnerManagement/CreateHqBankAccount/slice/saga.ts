import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import Notifier from 'app/pages/Notifier';
import { FileUpload, ParamsUrl } from 'types';
import { BankAccountService, fileService } from 'services';

import { CreateBankAccountManagement } from './types';

import { createHqBankPartnerActions as actions } from '.';

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
      if (action.payload.images?.fileLogo?.file != null) {
        fileUrlData.push({
          name: action.payload.images?.fileLogo?.name,
          files: action.payload.images?.fileLogo?.file,
        });
      }
      if (action.payload.images?.filePhoto?.file != null) {
        fileUrlData.push({
          name: action.payload.images?.filePhoto?.name,
          files: action.payload.images?.filePhoto?.file,
        });
      }
      if (action.payload.images?.fileKtpDirector?.file != null) {
        fileUrlData.push({
          name: action.payload.images?.fileKtpDirector?.name,
          files: action.payload.images?.fileKtpDirector?.file,
        });
      }
      if (action.payload.images?.fileNpwp?.file != null) {
        fileUrlData.push({
          name: action.payload.images?.fileNpwp?.name,
          files: action.payload.images?.fileNpwp?.file,
        });
      }
      if (action.payload.images?.fileTdp?.file != null) {
        fileUrlData.push({
          name: action.payload.images?.fileTdp?.name,
          files: action.payload.images?.fileTdp?.file,
        });
      }
      if (action.payload.images?.fileSiup?.file != null) {
        fileUrlData.push({
          name: action.payload.images?.fileSiup?.name,
          files: action.payload.images?.fileSiup?.file,
        });
      }
      if (action.payload.images?.fileSppkp?.file != null) {
        fileUrlData.push({
          name: action.payload.images?.fileSppkp?.name,
          files: action.payload.images?.fileSppkp?.file,
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
        formData.bankAccountType = 'HEAD_QUARTER';
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
        formData.documentQualification = {
          fileKtpDirector: resultUrlData.filter(
            (value, index) => value.name === 'fileKtpDirector',
          ),
          fileNpwp: resultUrlData.filter(
            (value, index) => value.name === 'fileNpwp',
          ),
          fileTdp: resultUrlData.filter(
            (value, index) => value.name === 'fileTdp',
          ),
          fileSiup: resultUrlData.filter(
            (value, index) => value.name === 'fileSiup',
          ),
          fileSppkp: resultUrlData.filter(
            (value, index) => value.name === 'fileSppkp',
          ),
        };
        formData.company = {
          ...formData.company,
          fileLogo: resultUrlData.filter(
            (value, index) => value.name === 'fileLogo',
          ),
        };
        delete formData.fileKtpDirector;
        delete formData.fileNik;
        delete formData.fileLogo;
        delete formData.fileNpwp;
        delete formData.filePhoto;
        delete formData.fileSiup;
        delete formData.fileSppkp;
        delete formData.fileTdp;

        const resultRequest: CreateBankAccountManagement = yield call(
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
    yield put(actions.createBankAccountFailed());
  }
}

export function* createHqBankPartnerSaga() {
  yield takeLatest(actions.createBankAccount.type, createBankAccount);
}
