import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  BankAccountService,
  fileService,
  KeycloakService,
  LocalStorageService,
} from 'services';
import { FileUpload } from 'types';
import { BankAccountInfo, FilePhoto } from 'types/BankAccountManagement';
import { FileUrlData, ParamsUrl } from 'types/FileUpload';

import { bankAccountInfoActions as actions } from '.';
import { FilterParams } from './types';
import Notifier from 'app/pages/Notifier';
import { ChangeStatus } from 'types/DeveloperAccountManagement';

function* fetchBankAccountInfo(action: PayloadAction<string>) {
  try {
    const result: BankAccountInfo = yield call(
      BankAccountService.fetchBankAccountInfo,
      action.payload,
    );
    yield put(actions.fetchBankAccountInfoSuccess(result));
  } catch (error: any) {
    console.log(error);
  }
}

function* updateHQBank(action: PayloadAction<FilterParams>) {
  try {
    if (action.payload.files.fileName.length > 0) {
      const result: FileUpload[] = yield call(
        fileService.fetchUrlImages,
        action.payload.files,
      );

      if (result.length > 0) {
        const fileUrlData: FileUrlData[] = [];
        if (action.payload.images?.fileNik?.file != null) {
          fileUrlData.push({
            name: action.payload.images?.fileNik?.name,
            files: action.payload.images?.fileNik?.file,
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
        if (action.payload.images?.fileMou?.file != null) {
          fileUrlData.push({
            name: action.payload.images?.fileMou?.name,
            files: action.payload.images?.fileMou?.file,
          });
        }
        if (action.payload.images?.fileNda?.file != null) {
          fileUrlData.push({
            name: action.payload.images?.fileNda?.name,
            files: action.payload.images?.fileNda?.file,
          });
        }
        const urldata: ParamsUrl[] = [];
        let k = 0;
        fileUrlData?.map((value, index) => {
          if (value.files) {
            urldata.push({
              url: result[k].url,
              key: result[k].s3Key,
              originalName: result[k].originalName,
              name: value.name,
              files: value.files,
            });
            k = k + 1;
          }
        });

        const resultUrlData: FilePhoto[] = yield call(
          fileService.getUrlImageData,
          urldata,
        );
        if (resultUrlData.length > 0) {
          const formData = { ...action.payload.formData };
          if (resultUrlData?.find(a => a.name === 'fileNik')) {
            formData.kyc.fileNik = resultUrlData.filter(
              value => value.name === 'fileNik',
            )[0];
          } else {
            formData.kyc.fileNik = {
              url: action.payload.images?.fileNik?.url || '',
              originalName: action.payload?.images?.fileNik?.originalName || '',
              s3Key: action.payload?.images?.fileNik?.s3Key || '',
            };
          }

          const filesKtpDirector: FilePhoto[] = [];
          if (resultUrlData?.find(a => a.name === 'fileKtpDirector')) {
            filesKtpDirector.push(
              resultUrlData.filter(
                (value, index) => value.name === 'fileKtpDirector',
              )[0],
            );
          } else {
            filesKtpDirector.push({
              url: action.payload.images?.fileKtpDirector?.url || '',
              originalName:
                action.payload?.images?.fileKtpDirector?.originalName || '',
              s3Key: action.payload?.images?.fileKtpDirector?.s3Key || '',
            });
          }

          const filesNpwp: FilePhoto[] = [];
          if (resultUrlData?.find(a => a.name === 'fileNpwp')) {
            filesNpwp.push(
              resultUrlData.filter(
                (value, index) => value.name === 'fileNpwp',
              )[0],
            );
          } else {
            filesNpwp.push({
              url: action.payload.images?.fileNpwp?.url || '',
              originalName:
                action.payload?.images?.fileNpwp?.originalName || '',
              s3Key: action.payload?.images?.fileNpwp?.s3Key || '',
            });
          }

          const filesTdp: FilePhoto[] = [];
          if (resultUrlData?.find(a => a.name === 'fileTdp')) {
            filesTdp.push(
              resultUrlData.filter(
                (value, index) => value.name === 'fileTdp',
              )[0],
            );
          } else {
            filesTdp.push({
              url: action.payload.images?.fileNpwp?.url || '',
              originalName:
                action.payload?.images?.fileNpwp?.originalName || '',
              s3Key: action.payload?.images?.fileNpwp?.s3Key || '',
            });
          }

          const filesSiup: FilePhoto[] = [];
          if (resultUrlData?.find(a => a.name === 'fileSiup')) {
            filesSiup.push(
              resultUrlData.filter(
                (value, index) => value.name === 'fileSiup',
              )[0],
            );
          } else {
            filesSiup.push({
              url: action.payload.images?.fileSiup?.url || '',
              originalName:
                action.payload?.images?.fileSiup?.originalName || '',
              s3Key: action.payload?.images?.fileSiup?.s3Key || '',
            });
          }

          const filesSppkp: FilePhoto[] = [];
          if (resultUrlData?.find(a => a.name === 'fileSppkp')) {
            filesSppkp.push(
              resultUrlData.filter(
                (value, index) => value.name === 'fileSppkp',
              )[0],
            );
          } else {
            filesSppkp.push({
              url: action.payload.images?.fileSppkp?.url || '',
              originalName:
                action.payload?.images?.fileSppkp?.originalName || '',
              s3Key: action.payload?.images?.fileSppkp?.s3Key || '',
            });
          }

          const filesMou: FilePhoto[] = [];
          if (resultUrlData?.find(a => a.name === 'fileMou')) {
            filesMou.push(
              resultUrlData.filter(
                (value, index) => value.name === 'fileMou',
              )[0],
            );
          } else {
            filesMou.push({
              url: action.payload.images?.fileMou?.url || '',
              originalName: action.payload?.images?.fileMou?.originalName || '',
              s3Key: action.payload?.images?.fileMou?.s3Key || '',
            });
          }

          const filesNda: FilePhoto[] = [];
          if (resultUrlData?.find(a => a.name === 'fileNda')) {
            filesNda.push(
              resultUrlData.filter(
                (value, index) => value.name === 'fileNda',
              )[0],
            );
          } else {
            filesNda.push({
              url: action.payload.images?.fileNda?.url || '',
              originalName: action.payload?.images?.fileNda?.originalName || '',
              s3Key: action.payload?.images?.fileNda?.s3Key || '',
            });
          }

          formData.documentQualification = {
            ...formData.documentQualification,
            fileKtpDirector: filesKtpDirector,
            fileNpwp: filesNpwp,
            fileTdp: filesTdp,
            fileSiup: filesSiup,
            fileSppkp: filesSppkp,
            fileNda: filesNda,
            fileMou: filesMou,
          };

          delete formData.fileKtpDirector;
          delete formData.fileNpwp;
          delete formData.fileTdp;
          delete formData.fileSiup;
          delete formData.fileSppkp;
          delete formData.fileNik;
          delete formData.fileMou;
          delete formData.fileNda;

          const { navigate } = action.payload;

          const resultUpdate: BankAccountInfo = yield call(
            BankAccountService.updateBankAccountInfo,
            formData,
          );

          yield put(actions.updateHQBankRequestSuccess(resultUpdate));
          navigate(`/manage-users/bank`);
        }
      }
    } else {
      const formData = { ...action.payload.formData };
      formData.kyc.fileNik = {
        originalName: action.payload.images?.fileNik?.originalName || '',
        url: action.payload?.images?.fileNik?.url || '',
        s3Key: action.payload?.images?.fileNik?.s3Key || '',
      };

      const filesKtpDirector: FilePhoto[] = [];
      filesKtpDirector.push({
        url: action.payload.images?.fileKtpDirector?.url || '',
        originalName:
          action.payload?.images?.fileKtpDirector?.originalName || '',
        s3Key: action.payload.images?.fileKtpDirector?.s3Key || '',
      });

      const filesNpwp: FilePhoto[] = [];
      filesNpwp.push({
        url: action.payload?.images?.fileNpwp?.url || '',
        originalName: action.payload?.images?.fileNpwp?.originalName || '',
        s3Key: action.payload?.images?.fileNpwp?.s3Key || '',
      });

      const filesTdp: FilePhoto[] = [];
      filesTdp.push({
        url: action.payload?.images?.fileTdp?.url || '',
        originalName: action.payload.images?.fileTdp?.originalName || '',
        s3Key: action.payload.images?.fileTdp?.s3Key || '',
      });

      const filesSiup: FilePhoto[] = [];
      filesSiup.push({
        url: action.payload?.images?.fileSiup?.url || '',
        originalName: action.payload?.images?.fileSiup?.originalName || '',
        s3Key: action.payload.images?.fileSiup?.s3Key || '',
      });

      const filesSppkp: FilePhoto[] = [];
      filesSppkp.push({
        url: action.payload.images?.fileSppkp?.url || '',
        originalName: action.payload.images?.fileSppkp?.originalName || '',
        s3Key: action.payload.images?.fileSppkp?.s3Key || '',
      });

      const filesMou: FilePhoto[] = [];
      filesMou.push({
        url: action.payload.images?.fileMou?.url || '',
        originalName: action.payload.images?.fileMou?.originalName || '',
        s3Key: action.payload.images?.fileMou?.s3Key || '',
      });

      const filesNda: FilePhoto[] = [];
      filesNda.push({
        url: action.payload.images?.fileNda?.url || '',
        originalName: action.payload.images?.fileNda?.originalName || '',
        s3Key: action.payload.images?.fileNda?.s3Key || '',
      });

      if (formData.documentQualification.mouExpiredDate) {
        formData.documentQualification.mouExpiredDate = new Date(
          formData.documentQualification.mouExpiredDate,
        ).getTime();
      } else {
        delete formData.documentQualification.mouExpiredDate;
      }

      if (formData.documentQualification.ndaExpiredDate) {
        formData.documentQualification.ndaExpiredDate = new Date(
          formData.documentQualification.ndaExpiredDate,
        ).getTime();
      } else {
        delete formData.documentQualification.ndaExpiredDate;
      }

      formData.documentQualification = {
        ...formData.documentQualification,
        fileKtpDirector: filesKtpDirector,
        fileNpwp: filesNpwp,
        fileTdp: filesTdp,
        fileSiup: filesSiup,
        fileSppkp: filesSppkp,
        fileNda: filesNda,
        fileMou: filesMou,
      };

      delete formData.fileKtpDirector;
      delete formData.fileNpwp;
      delete formData.fileTdp;
      delete formData.fileSiup;
      delete formData.fileSppkp;
      delete formData.fileNik;
      delete formData.fileMou;
      delete formData.fileNda;

      const { navigate } = action.payload;
      const resultUpdate: BankAccountInfo = yield call(
        BankAccountService.updateBankAccountInfo,
        formData,
      );
      yield put(actions.updateHQBankRequestSuccess(resultUpdate));

      navigate(`/manage-users/bank`);
    }
  } catch (error) {
    Notifier.addNotifyError({
      messageId: 'error.anErrorOccurred',
    });
    yield put(actions.updateHQBankRequestFailed());
  }
}

function* updateStatusBankAccount(
  action: PayloadAction<
    ChangeStatus,
    string,
    (changeStatus?: ChangeStatus) => void | undefined
  >,
) {
  const { meta } = action;
  try {
    const result: ChangeStatus = yield call(
      BankAccountService.updateStatusBankAccount,
      action.payload,
    );
    yield put(actions.updateStatusAccountSuccess(result));
    if (meta) {
      meta(result);
    }
  } catch (error) {
    if (meta) {
      meta(undefined);
    }
  }
}

export function* bankAccountInfoSaga() {
  yield takeLatest(actions.fetchBankAccountInfo.type, fetchBankAccountInfo);
  yield takeLatest(actions.updateHQBankRequest.type, updateHQBank);
  yield takeLatest(actions.updateStatusAccount.type, updateStatusBankAccount);
}
