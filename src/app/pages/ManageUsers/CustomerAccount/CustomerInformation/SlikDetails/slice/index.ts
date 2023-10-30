import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { VerificationResponse } from '../../../PreKprVerification/types';

import { Saga } from './saga';
import { SlikDetailsState } from './types';

export const initialState: SlikDetailsState = {};

const slice = createSlice({
  name: 'slikDetails',
  initialState,
  reducers: {
    getSlikDetails(state, action: PayloadAction<string | number>) {
      state.data = undefined;
    },
    getSlikDetailsSuccess(state, action: PayloadAction<any>) {
      state.data = action.payload;
    },
    getKycVerificationData(state, action: PayloadAction<string | number>) {
      state.kycData = undefined;
    },
    getKycVerificationDataSuccess(
      state,
      action: PayloadAction<VerificationResponse>,
    ) {
      state.kycData = action.payload;
    },
  },
});

export const { actions: Actions } = slice;

export const useSlikDetailsSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: Saga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
