import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import Notifier from 'app/pages/Notifier';
import { FileUpload, ParamsUrl } from 'types';
import {
  BankAccountService,
  fileService,
  PartnerAccountService,
} from 'services';

import { CreateBankAccountManagement } from './types';

import { createHqBankPartnerActions as actions } from '.';
import moment from 'moment';
import path from 'app/routes/path';
import { PartnerAccountForm } from 'types/PartnerAccountManagement';

function* createPartnerAccount(action: PayloadAction<any>) {
  try {
    const result: FileUpload[] = yield call(
      fileService.fetchUrlImages,
      action.payload.files,
    );
    if (result.length > 0) {
      const fileUrlData: any[] = [];
      if (action.payload.images?.fileKtp?.file != null) {
        fileUrlData.push({
          name: action.payload.images?.fileKtp?.name,
          files: action.payload.images?.fileKtp?.file,
        });
      }
      if (action.payload.images?.fileDeedOfCompany?.file != null) {
        fileUrlData.push({
          name: action.payload.images?.fileDeedOfCompany?.name,
          files: action.payload.images?.fileDeedOfCompany?.file,
        });
      }
      if (action.payload.images?.fileNPWP?.file != null) {
        fileUrlData.push({
          name: action.payload.images?.fileNPWP?.name,
          files: action.payload.images?.fileNPWP?.file,
        });
      }
      if (action.payload.images?.fileNpwp?.file != null) {
        fileUrlData.push({
          name: action.payload.images?.fileNpwp?.name,
          files: action.payload.images?.fileNpwp?.file,
        });
      }
      if (action.payload.images?.fileNIP?.file != null) {
        fileUrlData.push({
          name: action.payload.images?.fileNIP?.name,
          files: action.payload.images?.fileNIP?.file,
        });
      }
      if (action.payload.images?.fileSK?.file != null) {
        fileUrlData.push({
          name: action.payload.images?.fileSK?.name,
          files: action.payload.images?.fileSK?.file,
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
        if (resultUrlData?.find(a => a.name === 'fileKtp')) {
          formData.kyc.fileKtp = resultUrlData.filter(
            (value, index) => value.name === 'fileKtp',
          );
        }
        formData.documentQualification = {
          fileDeedOfCompany: resultUrlData.filter(
            (value, index) => value.name === 'fileDeedOfCompany',
          ),
          fileNpwp: resultUrlData.filter(
            (value, index) => value.name === 'fileNPWP',
          ),
          fileNIP: resultUrlData.filter(
            (value, index) => value.name === 'fileNIP',
          ),
          fileSK: resultUrlData.filter(
            (value, index) => value.name === 'fileSK',
          ),
        };
        delete formData.fileKtp;
        delete formData.fileDeedOfCompany;
        delete formData.fileNPWP;
        delete formData.fileNIP;
        delete formData.fileSK;

        const resultRequest: PartnerAccountForm = yield call(
          PartnerAccountService.createPartnerAccount,
          formData,
        );
        yield put(actions.createPartnerAccountSuccess(resultRequest));
        const { navigate } = action.payload;
        navigate(path.partnerAccountList);
        Notifier.addNotifySuccess({
          messageId: 'success.partnerCreateSuccess',
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
    yield put(actions.createPartnerAccountFailed());
  }
}

export function* createHqBankPartnerSaga() {
  yield takeLatest(actions.createPartnerAccount.type, createPartnerAccount);
}
