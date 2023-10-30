import { PayloadAction } from '@reduxjs/toolkit';
import { RegisterPartnerParams } from 'types/RegisterPartnerParams';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import { registerNewDeveloperSaga } from './saga';
import { RegisterNewDeveloperState } from './types';

export const initialState: RegisterNewDeveloperState = {};

const slice = createSlice({
  name: 'registerNewClient',
  initialState,
  reducers: {
    createDeveloper: {
      reducer(state, action: PayloadAction<RegisterPartnerParams>) {},
      prepare(payload: RegisterPartnerParams, meta: (error?: any) => void) {
        return { payload, meta };
      },
    },
  },
});

export const { actions: registerNewDeveloperActions } = slice;

export const useRegisterNewClientSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: registerNewDeveloperSaga });
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
