import { PayloadAction } from '@reduxjs/toolkit';
import { RegisterPartnerParams } from 'types/RegisterPartnerParams';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import { registerBankHQSaga } from './saga';
import { RegisterBankHQState } from './types';

export const initialState: RegisterBankHQState = {};

const slice = createSlice({
  name: 'registerBankHQ',
  initialState,
  reducers: {
    createBankHq: {
      reducer(state, action: PayloadAction<RegisterPartnerParams>) {},
      prepare(payload: RegisterPartnerParams, meta: (error?: any) => void) {
        return { payload, meta };
      },
    },
  },
});

export const { actions: registerBankHqActions } = slice;

export const useRegisterBankHQSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: registerBankHQSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useRegisterNewClientSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
