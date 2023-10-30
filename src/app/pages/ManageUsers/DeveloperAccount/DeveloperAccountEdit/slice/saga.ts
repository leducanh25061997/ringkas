import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { DeveloperAccountService, fileService } from 'services';
import { FileUpload, ParamsUrl } from 'types';

import Notifier from 'app/pages/Notifier';

import { developerAccountEditActions as actions } from '.';
import { DeveloperAccountInfor } from './types';

function* fetchDeveloperAccountInfo(action: PayloadAction<string>) {
  try {
    const result: DeveloperAccountInfor = yield call(
      DeveloperAccountService.fetchDeveloperAccountInfo,
      action.payload,
    );
    yield put(actions.fetchDeveloperAccountInfoSuccess(result));
  } catch (error: any) {
    console.log(error);
  }
}

function* editDeveloperAccountInfo(action: PayloadAction<any>) {
  try {
    if (action.payload.files.fileName.length > 0) {
      const result: FileUpload[] = yield call(
        fileService.fetchUrlImages,
        action.payload.files,
      );
      // yield put(actions.fetchUrlFileRequestsSuccess(result));

      if (result.length > 0) {
        const fileUrlData: any[] = [];

        if (action.payload.images?.fileKtp?.file != null) {
          fileUrlData.push({
            name: action.payload.images?.fileKtp?.name,
            files: action.payload.images?.fileKtp?.file,
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

        if (action.payload.images?.fileTdp?.file != null) {
          fileUrlData.push({
            name: action.payload.images?.fileTdp?.name,
            files: action.payload.images?.fileTdp?.file,
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

          formData.kyc.fileKtp = [];
          if (resultUrlData?.find(a => a.name === 'fileKtp')) {
            formData.kyc.fileKtp.push(
              resultUrlData.filter(
                (value, index) => value.name === 'fileKtp',
              )[0],
            );
          } else {
            formData.kyc.fileKtp.push({
              name: '',
              originalName: action.payload.images.fileKtp.originalName,
              s3Key: action.payload.images.fileKtp.s3Key,
            });
          }

          formData.kyc.fileSignature = [
            {
              name: '',
              originalName: action.payload.images.fileSignature.originalName,
              s3Key: action.payload.images.fileSignature.s3Key,
            },
          ];

          const filesKtpDirector: any[] = [];
          if (resultUrlData?.find(a => a.name === 'fileKtpDirector')) {
            filesKtpDirector.push(
              resultUrlData.filter(
                (value, index) => value.name === 'fileKtpDirector',
              )[0],
            );
          } else {
            filesKtpDirector.push({
              name: '',
              originalName: action.payload.images.fileKtpDirector.originalName,
              s3Key: action.payload.images.fileKtpDirector.s3Key,
            });
          }

          const filesNpwp: any[] = [];
          if (resultUrlData?.find(a => a.name === 'fileNpwp')) {
            filesNpwp.push(
              resultUrlData.filter(
                (value, index) => value.name === 'fileNpwp',
              )[0],
            );
          } else {
            filesNpwp.push({
              name: '',
              originalName: action.payload.images.fileNpwp.originalName,
              s3Key: action.payload.images.fileNpwp.s3Key,
            });
          }

          const filesTdp: any[] = [];
          if (resultUrlData?.find(a => a.name === 'fileTdp')) {
            filesTdp.push(
              resultUrlData.filter(
                (value, index) => value.name === 'fileTdp',
              )[0],
            );
          } else {
            filesTdp.push({
              name: '',
              originalName: action.payload.images.fileTdp.originalName,
              s3Key: action.payload.images.fileTdp.s3Key,
            });
          }

          const filesSiup: any[] = [];
          if (resultUrlData?.find(a => a.name === 'fileSiup')) {
            filesSiup.push(
              resultUrlData.filter(
                (value, index) => value.name === 'fileSiup',
              )[0],
            );
          } else {
            filesSiup.push({
              name: '',
              originalName: action.payload.images.fileSiup.originalName,
              s3Key: action.payload.images.fileSiup.s3Key,
            });
          }

          const filesSppkp: any[] = [];
          if (resultUrlData?.find(a => a.name === 'fileSppkp')) {
            filesSppkp.push(
              resultUrlData.filter(
                (value, index) => value.name === 'fileSppkp',
              )[0],
            );
          } else {
            filesSppkp.push({
              name: '',
              originalName: action.payload.images.fileSppkp.originalName,
              s3Key: action.payload.images.fileSppkp.s3Key,
            });
          }

          formData.documentQualification = {
            fileKtpDirector: filesKtpDirector,
            fileNpwp: filesNpwp,
            fileTdp: filesTdp,
            fileSiup: filesSiup,
            fileSppkp: filesSppkp,
          };

          const { navigate } = action.payload;

          const resultUpdate: DeveloperAccountInfor = yield call(
            DeveloperAccountService.editDeveloperAccountInfo,
            formData,
          );

          yield put(actions.editDeveloperAccountInfoSuccess(undefined));

          Notifier.addNotifySuccess({
            messageId: 'User has been updated successfully',
          });
          navigate(`/manage-users/developer`);
        }
      }
    } else {
      const formData = { ...action.payload.formRequest };
      formData.kyc.fileSignature = [
        {
          name: '',
          originalName: action.payload.images.fileSignature.originalName,
          s3Key: action.payload.images.fileSignature.s3Key,
        },
      ];
      formData.kyc.fileKtp = [];
      formData.kyc.fileKtp.push({
        name: '',
        originalName: '',
        s3Key: action.payload.images.fileKtp.s3Key,
      });

      const filesKtpDirector: any[] = [];
      filesKtpDirector.push({
        name: '',
        originalName: '',
        s3Key: action.payload.images.fileKtpDirector.s3Key,
      });

      const filesNpwp: any[] = [];
      filesNpwp.push({
        name: '',
        originalName: '',
        s3Key: action.payload.images.fileNpwp.s3Key,
      });

      const filesTdp: any[] = [];
      filesTdp.push({
        name: '',
        originalName: '',
        s3Key: action.payload.images.fileTdp.s3Key,
      });

      const filesSiup: any[] = [];
      filesSiup.push({
        name: '',
        originalName: '',
        s3Key: action.payload.images.fileSiup.s3Key,
      });

      const filesSppkp: any[] = [];
      filesSppkp.push({
        name: '',
        originalName: '',
        s3Key: action.payload.images.fileSppkp.s3Key,
      });

      formData.documentQualification = {
        fileKtpDirector: filesKtpDirector,
        fileNpwp: filesNpwp,
        fileTdp: filesTdp,
        fileSiup: filesSiup,
        fileSppkp: filesSppkp,
      };

      const { navigate } = action.payload;

      const resultUpdate: DeveloperAccountInfor = yield call(
        DeveloperAccountService.editDeveloperAccountInfo,
        formData,
      );

      yield put(actions.editDeveloperAccountInfoSuccess(undefined));

      Notifier.addNotifySuccess({
        messageId: 'User has been updated successfully',
      });
      navigate(`/manage-users/developer`);
    }
  } catch (error) {
    console.log(error);
  }
}

export function* developerAccountEditSaga() {
  yield takeLatest(
    actions.fetchDeveloperAccountInfo.type,
    fetchDeveloperAccountInfo,
  );
  yield takeLatest(
    actions.editDeveloperAccountInfo.type,
    editDeveloperAccountInfo,
  );
}
