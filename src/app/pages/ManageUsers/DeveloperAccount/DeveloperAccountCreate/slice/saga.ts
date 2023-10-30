import { PayloadAction } from '@reduxjs/toolkit';
import Notifier from 'app/pages/Notifier';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  DeveloperAccountService,
  fileService,
  LocalStorageService,
} from 'services';
import { FileUpload, Pageable, ParamsUrl } from 'types';
import { DeveloperAccountList } from 'types/DeveloperAccountManagement';

import { createDeveloperActions as actions, createDeveloperActions } from '.';

function* createDeveloperRequest(action: PayloadAction<any>) {
  try {
    if (
      action.payload?.files?.fileName &&
      action.payload?.files?.fileName.length > 0
    ) {
      const result: FileUpload[] = yield call(
        fileService.fetchUrlImages,
        action.payload?.files,
      );
      yield put(createDeveloperActions.fetchUrlFileRequestsSuccess(result));
      if (result.length > 0) {
        const fileUrlData: any[] = [];
        fileUrlData.push({
          name: action.payload.images?.fileKtp.name,
          files: action.payload.images?.fileKtp.file,
        });
        fileUrlData.push({
          name: action.payload.images?.fileKtpDirector.name,
          files: action.payload.images?.fileKtpDirector.file,
        });
        fileUrlData.push({
          name: action.payload.images?.fileNpwp.name,
          files: action.payload.images?.fileNpwp.file,
        });
        fileUrlData.push({
          name: action.payload.images?.fileTdp.name,
          files: action.payload.images?.fileTdp.file,
        });
        fileUrlData.push({
          name: action.payload.images?.fileSiup.name,
          files: action.payload.images?.fileSiup.file,
        });
        fileUrlData.push({
          name: action.payload.images?.fileSppkp.name,
          files: action.payload.images?.fileSppkp.file,
        });
        const urlData: ParamsUrl[] = [];
        result?.map((value, index) => {
          urlData.push({
            url: value.url,
            key: value.s3Key,
            s3Key: value.s3Key,
            originalName: value.originalName,
            name: fileUrlData[index].name,
            files: fileUrlData[index].files,
          });
        });
        const resultUrlData: ParamsUrl[] = yield call(
          fileService.getUrlImageData,
          urlData,
        );
        if (resultUrlData.length > 0) {
          const formData = { ...action.payload.formData };
          if (resultUrlData?.find(a => a.name === 'fileKtp')) {
            formData.kyc.fileKtp = [];
            formData.kyc.fileKtp.push(
              resultUrlData.filter(
                (value, index) => value.name === 'fileKtp',
              )[0],
            );
          }
          const filesKtpDirector: any[] = [];
          filesKtpDirector.push(
            resultUrlData.filter(
              (value, index) => value.name === 'fileKtpDirector',
            )[0],
          );
          const filesNpwp: any[] = [];
          filesNpwp.push(
            resultUrlData.filter(
              (value, index) => value.name === 'fileNpwp',
            )[0],
          );
          const filesTdp: any[] = [];
          filesTdp.push(
            resultUrlData.filter((value, index) => value.name === 'fileTdp')[0],
          );
          const filesSiup: any[] = [];
          filesSiup.push(
            resultUrlData.filter(
              (value, index) => value.name === 'fileSiup',
            )[0],
          );
          const filesSppkp: any[] = [];
          filesSppkp.push(
            resultUrlData.filter(
              (value, index) => value.name === 'fileSppkp',
            )[0],
          );
          formData.documentQualification = {
            fileKtpDirector: filesKtpDirector,
            fileNpwp: filesNpwp,
            fileTdp: filesTdp,
            fileSiup: filesSiup,
            fileSppkp: filesSppkp,
          };

          formData.kyc.email = formData.email;
          delete formData.fileKtpDirector;
          delete formData.fileNpwp;
          delete formData.fileTdp;
          delete formData.fileSiup;
          delete formData.fileSppkp;
          delete formData.fileKtp;
          delete formData.fileSignature;
          const { navigate } = action.payload;

          const resultCreateDeveloper: DeveloperAccountList = yield call(
            DeveloperAccountService.createDeveloperAccount,
            formData,
          );
          Notifier.addNotifySuccess({
            messageId: 'success.developerCreateSuccess',
          });
          yield put(actions.createDeveloperRequestSuccess(result));
          navigate(`/manage-users/developer`);
        }
      }
    } else {
      Notifier.addNotifyError({
        messageId: 'error.anErrorOccurred',
      });
      yield put(actions.createDeveloperRequestFailed());
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
    yield put(actions.createDeveloperRequestFailed());
  }
}

export function* createDeveloperSaga() {
  yield takeLatest(actions.createDeveloperRequest.type, createDeveloperRequest);
}
