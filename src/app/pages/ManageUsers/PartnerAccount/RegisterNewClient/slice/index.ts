import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import { registerNewClientSaga } from './saga';
import { RegisterNewClientState } from './types';

export const initialState: RegisterNewClientState = {};

const slice = createSlice({
  name: 'registerNewClient',
  initialState,
  reducers: {
    createClient: {
      reducer(state, action: PayloadAction<object>) {},
      prepare(payload: object, meta: (error?: any) => void) {
        return { payload, meta };
      },
    },
  },
});

export const { actions: registerNewClientActions } = slice;

export const useRegisterNewClientSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: registerNewClientSaga });
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
