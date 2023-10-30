import { PayloadAction } from '@reduxjs/toolkit';
import { AuthParams, UserInformation } from 'types';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import { authSaga } from './saga';
import { AuthState, AuthStatus } from './types';

export const initialState: AuthState = {
  authStatus: 'CHECKING',
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<any>) {},
    login: {
      reducer(state) {
        return state;
      },
      prepare(params: AuthParams, meta?: (error?: any) => void) {
        return { payload: params, meta };
      },
    },

    changePasswordSuccess(state, action: PayloadAction<any>) {},
    changePassword: {
      reducer(state) {
        return state;
      },
      prepare(params: AuthParams, meta?: (error?: any) => void) {
        return { payload: params, meta };
      },
    },

    resendOTPSuccess(state, action: PayloadAction<any>) {
      state.simulation = action?.payload?.data?.simulation;
      state.username = action?.payload?.username;
    },
    resendOTP: {
      reducer(state) {
        return state;
      },
      prepare(
        params: AuthParams,
        meta: (e?: any) => void,
        error: (message: string) => void,
      ) {
        return { payload: params, meta, error };
      },
    },
    checkOTP: {
      reducer(state) {
        return state;
      },
      prepare(
        params: AuthParams,
        meta: (error?: any) => void,
        error: (message: string) => void,
      ) {
        return { payload: params, meta, error };
      },
    },
    loginWithResetPassword: {
      reducer(state) {
        return state;
      },
      prepare(
        params: AuthParams,
        meta: (error?: any) => void,
        error: (message: string) => void,
      ) {
        return { payload: params, meta, error };
      },
    },
    updatePassword: {
      reducer(state) {
        return state;
      },
      prepare(params: AuthParams, meta?: (error?: any) => void) {
        return { payload: params, meta };
      },
    },
    logoutSuccess() {},
    logout: {
      reducer(state) {
        return state;
      },
      prepare(params, meta: (error?: any) => void) {
        return { payload: params, meta };
      },
    },

    getUserInformation: () => {},
    getUserInformationSuccess: (
      state,
      action: PayloadAction<UserInformation>,
    ) => {
      state.userInformation = action.payload;
    },

    setStatus: (state, action: PayloadAction<AuthStatus>) => {
      state.authStatus = action.payload;
    },
  },
});

export const { actions: authActions } = slice;

export const useAuthSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: authSaga });
  return { actions: slice.actions };
};
