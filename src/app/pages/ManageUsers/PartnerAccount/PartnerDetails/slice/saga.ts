import { PayloadAction } from '@reduxjs/toolkit';
import Notifier from 'app/pages/Notifier';
import { translations } from 'locales/translations';
import { call, put, takeLatest } from 'redux-saga/effects';
import { PartnerAccountService } from 'services';
import { PartnerDetails } from 'types/PartnerAccountManagement';

import { partnerDetailsActions as actions } from '.';

function* getPartnerDetails(
  action: PayloadAction<{ userUuid: string }, string, (error?: any) => void>,
) {
  try {
    const result: PartnerDetails = yield call(
      PartnerAccountService.getPartnerInformation,
      action.payload.userUuid,
    );
    yield put(actions.getPartnerDetailsSuccess(result));
    action.meta();
  } catch (error) {
    action.meta(error);
    Notifier.addNotifyError({
      messageId: translations.error.getPartnerDetailsFailed,
    });
  }
}

export function* partnerDetailsSaga() {
  yield takeLatest(actions.getPartnerDetails.type, getPartnerDetails);
}
