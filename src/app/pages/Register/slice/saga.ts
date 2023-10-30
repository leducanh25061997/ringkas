import { PayloadAction } from '@reduxjs/toolkit';
import Notifier from 'app/pages/Notifier';
import { call, takeLatest } from 'redux-saga/effects';
import { PartnerAccountService } from 'services';
import authService from 'services/api/authService';
import { PartnerAccountForm } from 'types/PartnerAccountManagement';
import { signUpActions as actions } from '.';
import { signUpBranchData, SignUpHeadquarterData } from './types';

function* signUpHeadquarter(
  action: PayloadAction<
    SignUpHeadquarterData,
    string,
    () => void,
    (message: string) => void
  >,
) {
  try {
    yield call(authService.signUpBank, action.payload);
    action.meta();
  } catch (error: any) {
    action.error(error);
    if (error.response && error.response.status === 500) {
      Notifier.addNotifyError({
        messageId: 'Create partner account error',
      });
    } else if (error.response.data.messages.length > 0) {
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
}

function* signUpBranch(
  action: PayloadAction<
    signUpBranchData,
    string,
    () => void,
    (message: string) => void
  >,
) {
  try {
    yield call(authService.signUpBank, action.payload);
    action.meta();
  } catch (error: any) {
    action.error(error);
    if (error.response && error.response.status === 500) {
      Notifier.addNotifyError({
        messageId: 'Create partner account error',
      });
    } else if (error.response.data.messages.length > 0) {
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
}

function* signUpDeveloper(
  action: PayloadAction<any, string, () => void, (message: string) => void>,
) {
  try {
    yield call(authService.signUpDeveloper, action.payload);
    action.meta();
  } catch (error: any) {
    action.error(error);
    if (error.response && error.response.status === 500) {
      Notifier.addNotifyError({
        messageId: 'Create partner account error',
      });
    } else if (error.response.data.messages.length > 0) {
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
}

function* signUpPartner(
  action: PayloadAction<any, string, () => void, (message: string) => void>,
) {
  try {
    const formData = { ...action.payload };
    if (formData.email) {
      formData.kyc.email = formData.email;
    }
    formData.kyc.fileKtp = [formData.fileKtp];
    formData.documentQualification = {
      fileDeedOfCompany: [formData.fileDeedOfCompany],
      fileNpwp: [formData.fileNPWP],
      fileNIP: [formData.fileNIP],
      fileSK: [formData.fileSK],
    };
    delete formData.fileDeedOfCompany;
    delete formData.fileNPWP;
    delete formData.fileNIP;
    delete formData.fileSK;
    delete formData.fileKtp;
    const response: PartnerAccountForm = yield call(
      PartnerAccountService.registerPartnerAccount,
      formData,
    );
    action.meta();
    Notifier.addNotifySuccess({
      messageId: 'success.partnerRegisterSuccess',
    });
  } catch (error: any) {
    action.error(error);
    if (error.response && error.response.status === 500) {
      Notifier.addNotifyError({
        messageId: 'Create partner account error',
      });
    } else if (error.response.data.messages.length > 0) {
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
}

function* signUp(
  action: PayloadAction<any, string, () => void, (message: string) => void>,
) {
  try {
    const formData = { ...action.payload.formRequest };
    formData.documentQualification = {
      fileKtpDirector: [formData.fileKtpDirector],
      fileNpwp: [formData.fileNpwp],
      fileTdp: [formData.fileTdp],
      fileSiup: [formData.fileSiup],
      fileSppkp: [formData.fileSppkp],
    };
    formData.company = {
      name: formData.companyName,
      email: formData.companyEmail,
      address: formData.companyAddress,
      phone: formData.companyPhoneNumber,
      sppkpNumber: formData.sppkpNumber,
      npwpNumber: formData.npwpNumber,
    };
    formData.kyc = {
      fullName: formData.fullName,
      dob: formData.dob,
      nik: formData.nik,
      email: formData.email,
      phone: formData.phone,
      fileKtp: [formData.photoKtp],
      fileSignature: [formData.fileSignature],
    };

    delete formData.fileKtpDirector;
    delete formData.fileNpwp;
    delete formData.fileTdp;
    delete formData.fileTdp;
    delete formData.fileSiup;
    delete formData.fileSppkp;
    delete formData.companyName;
    delete formData.companyEmail;
    delete formData.companyAddress;
    delete formData.companyPhoneNumber;
    delete formData.sppkpNumber;
    delete formData.fullName;
    delete formData.dob;
    delete formData.phone;
    delete formData.photoKtp;
    delete formData.fileSignature;

    yield call(authService.signUpDeveloper, formData);

    action.meta();
    // yield put(actions.signUpSuccess());
    Notifier.addNotifySuccess({
      messageId: 'success.developerCreateSuccess',
    });
    //  navigate(path.login);
  } catch (error: any) {
    if (error.response && error.response.status === 500) {
      Notifier.addNotifyError({
        messageId: 'error.anErrorOccurred',
      });
    } else if (error.response.data.messages.length > 0) {
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
}

export function* signUpSaga() {
  yield takeLatest(actions.signUp.type, signUp);
  yield takeLatest(actions.signUpHeadquarter.type, signUpHeadquarter);
  yield takeLatest(actions.signUpBranch.type, signUpBranch);
  yield takeLatest(actions.signUpPartner.type, signUpPartner);
  yield takeLatest(actions.signUpDeveloper.type, signUpDeveloper);
}
