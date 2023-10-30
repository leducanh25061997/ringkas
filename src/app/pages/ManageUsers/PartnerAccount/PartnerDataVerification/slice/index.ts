import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import { PartnerInformationManagement } from './saga';
import {
  PartnerDataVerifyState,
  PartnerInformation,
  ProcessVerificationParams,
  VerificationResponse,
} from './types';

export const initialState: PartnerDataVerifyState = {
  kycVerificationData: {
    data: [],
    total: 0,
  },
};

const slice = createSlice({
  name: 'partnerDataVerification',
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

    getKycVerificationData: {
      reducer(state) {
        return {
          ...state,
          kycVerificationData: {
            data: [],
            total: 0,
          },
        };
      },
      prepare(params: string | number, meta?: (loading: boolean) => void) {
        return { payload: params, meta };
      },
    },
    getKycVerificationDataSuccess(
      state,
      action: PayloadAction<VerificationResponse>,
    ) {
      state.kycVerificationData = action.payload;
    },

    processVerification: {
      reducer(state) {
        return state;
      },
      prepare(
        params: ProcessVerificationParams,
        meta: () => void,
        error: (message: string) => void,
      ) {
        return { payload: params, meta, error };
      },
    },
  },
});

export const { actions: partnerInformation } = slice;

export const usePartnerInformationSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: PartnerInformationManagement });
  return { actions: slice.actions };
};
