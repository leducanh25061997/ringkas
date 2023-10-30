import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import { PartnerInformationManagement } from './saga';
import { PartnerInformation, PartnerInformationDetailState } from './types';
import { ChangeStatus } from '../../../../../types/DeveloperAccountManagement';

export const initialState: PartnerInformationDetailState = {};

const slice = createSlice({
  name: 'partnerInformationDetail',
  initialState,
  reducers: {
    getPartnerInformation: {
      reducer(state) {
        return state;
      },
      prepare(params: string, meta?: () => void) {
        return { payload: params, meta };
      },
    },
    getPartnerInformationSuccess(
      state,
      action: PayloadAction<PartnerInformation>,
    ) {
      state.partnerInformation = action.payload;
    },

    // update account status
    updateStatusPartnerAccount: {
      reducer(state) {
        return state;
      },
      prepare(params: ChangeStatus, meta?: () => void) {
        return { payload: params, meta };
      },
    },
    updateStatusPartnerAccountSuccess(
      state,
      action: PayloadAction<PartnerInformation>,
    ) {
      state.partnerInformation = action.payload;
    },

    // update verification status
    updateVerificationStatusPartnerAccount: {
      reducer(state) {
        return state;
      },
      prepare(params: ChangeStatus, meta?: () => void) {
        return { payload: params, meta };
      },
    },
    updateVerificationStatusPartnerAccountSuccess(
      state,
      action: PayloadAction<PartnerInformation>,
    ) {
      state.partnerInformation = action.payload;
    },

    // update partner information
    updatePartnerAccountInformation: {
      reducer(state) {
        return {
          ...state,
          isLoading: true,
        };
      },
      prepare(
        params: PartnerInformation,
        meta?: () => void,
        error?: () => void,
      ) {
        return { payload: params, meta, error };
      },
    },
    updatePartnerAccountInformationSuccess(state, action) {
      state.isLoading = false;
    },
    updatePartnerAccountInformationFailed(state, action) {
      state.isLoading = false;
    },
  },
});

export const { actions: partnerInformation } = slice;

export const usePartnerInformationSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: PartnerInformationManagement });
  return { actions: slice.actions };
};
