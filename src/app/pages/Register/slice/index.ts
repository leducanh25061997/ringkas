import { PayloadAction } from '@reduxjs/toolkit';
import { RegistrationRequest } from 'types';
import { PartnerAccountForm } from 'types/PartnerAccountManagement';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import { signUpSaga } from './saga';
import { signUpBranchData, SignUpHeadquarterData, signUpState } from './types';

export const initialState: signUpState = {};

const slice = createSlice({
  name: 'signUp',
  initialState: {},
  reducers: {
    signUp: {
      reducer(state) {
        return state;
      },
      prepare(params: any, meta: () => void, error: (message: string) => void) {
        return { payload: params, meta, error };
      },
    },
    signUpSuccess() {},
    signUpFailed() {},
    signUpHeadquarter: {
      reducer(state) {
        return state;
      },
      prepare(
        params: SignUpHeadquarterData,
        meta: () => void,
        error: (message: string) => void,
      ) {
        return { payload: params, meta, error };
      },
    },
    signUpBranch: {
      reducer(state) {
        return state;
      },
      prepare(
        params: signUpBranchData,
        meta: () => void,
        error: (message: string) => void,
      ) {
        return { payload: params, meta, error };
      },
    },
    signUpPartner: {
      reducer(state) {
        return state;
      },
      prepare(
        params: RegistrationRequest,
        meta: () => void,
        error: (code: string) => void,
      ) {
        return { payload: params, meta, error };
      },
    },
    signUpDeveloper: {
      reducer(state) {
        return state;
      },
      prepare(
        params: RegistrationRequest,
        meta: () => void,
        error: (code: string) => void,
      ) {
        return { payload: params, meta, error };
      },
    },
  },
});

export const { actions: signUpActions } = slice;

export const useSignUpCreateSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: signUpSaga });
  return { actions: slice.actions };
};
