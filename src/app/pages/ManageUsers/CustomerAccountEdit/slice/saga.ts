import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { Customer, FileUpload, ParamsUrl } from 'types';
import Notifier from 'app/pages/Notifier';
import { fileService, ManageUserService } from 'services';
import {
  AccountKycParams,
  CustomerApplicationKycDetail,
  CustomerKpr,
  CustomerKyc,
  CustomerKYC,
} from 'types/CustomerManagement';
import { ChangeStatus } from 'types/DeveloperAccountManagement';

import { FileUrlData } from 'types/FileUpload';

import { FilterParams, FilterParamsOfKPR } from './types';

import { customerInformationActions as actions } from '.';

function* fetchCustomerInformation(action: PayloadAction<string>) {
  try {
    const result: Customer = yield call(
      ManageUserService.fetchCustomerInformation,
      action.payload,
    );
    yield put(actions.fetchCustomerInformationSuccess(result));
  } catch (error) {
    console.log(error);
  }
}

function* fetchCustomerKycInformation(action: PayloadAction<string>) {
  try {
    const result: Customer = yield call(
      ManageUserService.fetchCustometKycInfomation,
      action.payload,
    );
    yield put(actions.fetchCustomerKycInformationSuccess(result));
  } catch (error) {
    console.log(error);
  }
}

function* fetchCustomerApplicationKycDetail(action: PayloadAction<string>) {
  try {
    const result: CustomerApplicationKycDetail = yield call(
      ManageUserService.fetchCustomerApplicationKycDetail,
      action.payload,
    );
    yield put(actions.fetchCustomerApplicationKycDetailSuccess(result));
  } catch (error) {
    console.log(error);
  }
}

function* fetchCustomerApplicationKycDetailOfGuanrator(
  action: PayloadAction<string>,
) {
  try {
    const result: CustomerApplicationKycDetail = yield call(
      ManageUserService.fetchCustomerApplicationKycDetailOfGuarantor,
      action.payload,
    );
    yield put(
      actions.fetchCustomerApplicationKycDetailOfGuarantorSuccess(result),
    );
  } catch (error) {
    console.log(error);
  }
}

function* editCustomerKycInfo(action: PayloadAction<FilterParams>) {
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
        if (action.payload.images?.fileSignature?.file != null) {
          fileUrlData.push({
            name: action.payload.images?.fileSignature?.name,
            files: action.payload.images?.fileSignature?.file,
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
          const formData = { ...action.payload.formData };

          if (resultUrlData?.find(a => a.name === 'fileNik')) {
            formData.fileNik = resultUrlData.filter(
              value => value.name === 'fileNik',
            )[0];
          } else {
            formData.fileNik = {
              originalName: action.payload.images.fileNik.originalName || '',
              s3Key: action.payload.images.fileNik.s3Key || '',
            };
          }

          if (resultUrlData?.find(a => a.name === 'fileSignature')) {
            formData.fileSignature = resultUrlData.filter(
              value => value.name === 'fileSignature',
            )[0];
          } else {
            formData.fileSignature = {
              originalName:
                action.payload.images.fileSignature.originalName || '',
              s3Key: action.payload.images.fileSignature.s3Key || '',
            };
          }

          const { navigate } = action.payload;

          const resultUpdate: CustomerKyc = yield call(
            ManageUserService.updateAccountKycInfo,
            formData,
          );

          yield put(actions.updateCustomerKYCRequestSuccess(resultUpdate));

          Notifier.addNotifySuccess({
            messageId: 'User has been updated successfully',
          });
          navigate(`/manage-users/customer`);
        }
      }
    } else {
      const formData = { ...action.payload.formData };
      formData.fileSignature = {
        originalName: '',
        s3Key: action.payload.images.fileSignature.s3Key || '',
      };
      formData.fileNik = {
        originalName: '',
        s3Key: action.payload.images.fileNik.s3Key || '',
      };
      const { navigate } = action.payload;
      const resultUpdate: CustomerKyc = yield call(
        ManageUserService.updateAccountKycInfo,
        formData,
      );
      yield put(actions.updateCustomerKYCRequestSuccess(resultUpdate));

      Notifier.addNotifySuccess({
        messageId: 'User has been updated successfully',
      });
      navigate(`/manage-users/customer`);
    }
  } catch (error) {
    Notifier.addNotifyError({
      messageId: 'error.anErrorOccurred',
    });
    yield put(actions.updateCustomerKYCRequestFailed());
  }
}

function* editCustomerKprInfo(action: PayloadAction<FilterParamsOfKPR>) {
  try {
    if (action.payload.files.fileName.length > 0) {
      const result: FileUpload[] = yield call(
        fileService.fetchUrlImages,
        action.payload.files,
      );

      if (result.length > 0) {
        const fileUrlData: FileUrlData[] = [];
        if (action.payload.images?.fileIdCard?.file != null) {
          fileUrlData.push({
            name: action.payload.images?.fileIdCard?.name,
            files: action.payload.images?.fileIdCard?.file,
          });
        }
        if (action.payload.images?.fileAttachments?.file != null) {
          fileUrlData.push({
            name: action.payload.images?.fileAttachments?.name,
            files: action.payload.images?.fileAttachments?.file,
          });
        }
        if (action.payload.images?.fileSignatureDigital?.file != null) {
          fileUrlData.push({
            name: action.payload.images?.fileSignatureDigital?.name,
            files: action.payload.images?.fileSignatureDigital?.file,
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
          const formData = { ...action.payload.formData };

          if (resultUrlData?.find(a => a.name === 'fileIdCard')) {
            formData.dataSet.personal.fileIdCard = resultUrlData.filter(
              value => value.name === 'fileIdCard',
            )[0];
          } else {
            formData.dataSet.personal.fileIdCard = {
              originalName: action.payload.images.fileIdCard.originalName || '',
              s3Key: action.payload.images.fileIdCard.s3Key || '',
            };
          }

          const fileAttachments: FileUrlData[] = [];
          if (resultUrlData?.find(a => a.name === 'fileAttachments')) {
            fileAttachments.push(
              resultUrlData.filter(
                (value, index) => value.name === 'fileAttachments',
              )[0],
            );
          } else {
            fileAttachments.push({
              name: '',
              originalName: action.payload.images.fileAttachments.originalName,
              s3Key: action.payload.images.fileAttachments.s3Key,
            });
          }
          formData.dataSet.assetIncome.warrantorIncome.fileAttachments =
            fileAttachments;
          if (resultUrlData?.find(a => a.name === 'fileSignatureDigital')) {
            formData.dataSet.others.fileSignatureDigital = resultUrlData.filter(
              value => value.name === 'fileSignatureDigital',
            )[0];
          } else {
            formData.dataSet.others.fileSignatureDigital = {
              originalName:
                action.payload.images.fileSignatureDigital.originalName || '',
              s3Key: action.payload.images.fileSignatureDigital.s3Key || '',
            };
          }

          const { navigate } = action.payload;

          const newData: AccountKycParams = {
            ...formData,
            submit: false,
          };

          const resultUpdate: CustomerKpr = yield call(
            ManageUserService.updateAccountKprInfo,
            newData,
          );

          yield put(actions.updateCustomerKPRRequestSuccess(resultUpdate));

          Notifier.addNotifySuccess({
            messageId: 'User has been updated successfully',
          });
          navigate(`/manage-users/customer`);
        }
      }
    } else {
      const formData = { ...action.payload.formData };

      if (action.payload.images.fileIdCard.url) {
        formData.dataSet.personal.fileIdCard = {
          originalName: '',
          s3Key: action.payload.images.fileIdCard.s3Key || '',
          url: action.payload.images.fileIdCard.url || '',
        };
      }

      if (action.payload.images.fileAttachments.url) {
        formData.dataSet.assetIncome.warrantorIncome.fileAttachments = [
          {
            originalName: '',
            s3Key: action.payload.images.fileAttachments.s3Key || '',
            url: action.payload.images.fileAttachments.url || '',
          },
        ];
      }

      if (action.payload.images.fileSignatureDigital.url) {
        formData.dataSet.others.fileSignatureDigital = {
          originalName: '',
          s3Key: action.payload.images.fileSignatureDigital.s3Key || '',
          url: action.payload.images.fileSignatureDigital.url || '',
        };
      }
      const { navigate } = action.payload;
      const newData: AccountKycParams = {
        ...formData,
        submit: false,
      };

      const resultUpdate: CustomerKpr = yield call(
        ManageUserService.updateAccountKprInfo,
        newData,
      );

      yield put(actions.updateCustomerKPRRequestSuccess(resultUpdate));

      Notifier.addNotifySuccess({
        messageId: 'User has been updated successfully',
      });
      navigate(`/manage-users/customer`);
    }
  } catch (error) {
    Notifier.addNotifyError({
      messageId: 'error.anErrorOccurred',
    });
    yield put(actions.updateCustomerKPRRequestFailed());
  }
}

function* updateAccountStatus(
  action: PayloadAction<
    ChangeStatus,
    string,
    (changeStatus?: ChangeStatus) => void | undefined
  >,
) {
  const { meta } = action;
  try {
    const result: ChangeStatus = yield call(
      ManageUserService.updateAccountStatus,
      action.payload,
    );
    yield put(actions.updateAccountStatusSuccess(result));
    if (meta) {
      meta(result);
    }
  } catch (error) {
    if (meta) {
      meta(undefined);
    }
    console.log(error);
  }
}

export function* customerInformationSaga() {
  yield takeLatest(
    actions.fetchCustomerInformation.type,
    fetchCustomerInformation,
  );
  yield takeLatest(
    actions.fetchCustomerKycInformation.type,
    fetchCustomerKycInformation,
  );

  yield takeLatest(actions.updateCustomerKYCRequest.type, editCustomerKycInfo);
  yield takeLatest(actions.updateAccountStatus.type, updateAccountStatus);
  yield takeLatest(actions.updateCustomerKPRRequest.type, editCustomerKprInfo);
  yield takeLatest(
    actions.fetchCustomerApplicationKycDetail.type,
    fetchCustomerApplicationKycDetail,
  );
  yield takeLatest(
    actions.fetchCustomerApplicationKycDetailOfGuarantor.type,
    fetchCustomerApplicationKycDetailOfGuanrator,
  );
}
